import { EVENT_DECK } from './events'
import { FACTIONS } from './content'
import type { Faction, GameState, RoundResultData, GameMode, GameEvent } from './types'

export const START_WATER = {
  speed: 15,
  standard: 20,
  hardcore: 18,
}
export const MAX_ROUNDS = {
  speed: 3,
  standard: 5,
  hardcore: 8,
}
export const CRISIS_LIMIT = 2
export const CRISIS_THRESHOLD = 5
export const EVENT_REVEAL_SECONDS = 6
export const VOTE_SECONDS = 15
export const MAYOR_SECONDS = 10

export function makePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function createInitialState(pin: string, mode: GameMode = 'standard'): GameState {
  return {
    pin,
    mode,
    phase: 'lobby',
    round: 0,
    maxRounds: MAX_ROUNDS[mode],
    waterTokens: START_WATER[mode],
    factions: {
      farmer: { crisis: 0, consecutiveWaterRounds: 0, immuneUntilRound: 0, hasUsedFertilizer: false, hasUsedBackup: false, hasProtested: false, hasRevoted: false },
      industry: { crisis: 0, consecutiveWaterRounds: 0, immuneUntilRound: 0, hasUsedFertilizer: false, hasUsedBackup: false, hasProtested: false, hasRevoted: false },
      citizen: { crisis: 0, consecutiveWaterRounds: 0, immuneUntilRound: 0, hasUsedFertilizer: false, hasUsedBackup: false, hasProtested: false, hasRevoted: false },
    },
    players: [],
    currentEvent: null,
    votes: {},
    immuneFactions: [],
    mayorTarget: null,
    lastResult: null,
    timerEnds: null,
    now: Date.now(),
    vetoedEvent: false,
    hasUsedVeto: false,
    hasUsedMartialLaw: false,
    martialLawActive: false,
    bonusWaterNextRound: 0,
  }
}

function drawEvent(exclude?: string | null) {
  const pool = EVENT_DECK.filter((e) => e.id !== exclude)
  const deck = pool.length > 0 ? pool : EVENT_DECK
  return deck[Math.floor(Math.random() * deck.length)]
}

export function startRound(state: GameState): GameState {
  let event = drawEvent(state.currentEvent?.id)
  
  // Hardcore mode: events are 20% harsher (rounded up)
  let cost = event.cost
  if (state.mode === 'hardcore' && cost > 0) {
    cost = Math.ceil(cost * 1.2)
  }
  
  const modifiedEvent: GameEvent = { ...event, cost }

  let newWater = state.waterTokens - modifiedEvent.cost + state.bonusWaterNextRound
  
  return {
    ...state,
    phase: 'event_reveal',
    currentEvent: modifiedEvent,
    waterTokens: Math.max(0, newWater),
    votes: {},
    immuneFactions: [],
    mayorTarget: null,
    lastResult: null,
    timerEnds: Date.now() + EVENT_REVEAL_SECONDS * 1000,
    vetoedEvent: false,
    bonusWaterNextRound: 0,
    martialLawActive: false,
    factions: {
      farmer: { ...state.factions.farmer, hasProtested: false, hasRevoted: false },
      industry: { ...state.factions.industry, hasProtested: false, hasRevoted: false },
      citizen: { ...state.factions.citizen, hasProtested: false, hasRevoted: false },
    }
  }
}

export function startGame(state: GameState, mode?: GameMode): GameState {
  const selectedMode = mode ?? state.mode
  return startRound({ ...createInitialState(state.pin, selectedMode), players: state.players, round: 1 })
}

export function beginVoting(state: GameState): GameState {
  // If martial law is active, we skip voting completely and go straight to Mayor action
  if (state.martialLawActive) {
    return {
      ...state,
      phase: 'mayor_action',
      votes: {},
      immuneFactions: [],
      timerEnds: Date.now() + MAYOR_SECONDS * 1000,
    }
  }

  return {
    ...state,
    phase: 'voting',
    votes: {},
    immuneFactions: [],
    timerEnds: Date.now() + VOTE_SECONDS * 1000,
  }
}

export function tallyImmune(state: GameState): Faction[] {
  const immune: Faction[] = []
  for (const faction of FACTIONS) {
    // If they already have immunity from a previous round's industry invest
    if (state.factions[faction].immuneUntilRound >= state.round) {
      immune.push(faction)
      continue
    }

    const members = state.players.filter((p) => p.role === faction)
    if (members.length === 0) continue
    const investVotes = members.filter((m) => state.votes[m.id] === 'invest').length
    if (investVotes > members.length / 2) {
      immune.push(faction)
    }
  }
  return immune
}

export function allFactionPlayersVoted(state: GameState): boolean {
  const voters = state.players.filter((p) => p.role !== 'mayor')
  if (voters.length === 0) return true
  return voters.every((p) => state.votes[p.id] !== undefined)
}

export function resolveVoting(state: GameState): GameState {
  const immune = tallyImmune(state)
  let waterSpent = 0
  
  // Normal immunity costs 1 token per faction
  let nextFactions = { ...state.factions }
  for (const fac of immune) {
    // Only charge for this round's investments (not persistent immunity)
    if (state.factions[fac].immuneUntilRound < state.round) {
      waterSpent += 1
      
      // Industry gets 2 rounds of immunity when they invest
      if (fac === 'industry') {
        nextFactions.industry = { ...nextFactions.industry, immuneUntilRound: state.round + 1 }
      }
    }
  }

  const waterTokens = Math.max(0, state.waterTokens - waterSpent)
  const next: GameState = { ...state, factions: nextFactions, immuneFactions: immune, waterTokens, mayorTarget: null }

  if (waterTokens < CRISIS_THRESHOLD) {
    return { ...next, phase: 'mayor_action', timerEnds: Date.now() + MAYOR_SECONDS * 1000 }
  }
  return finalizeRound(next)
}

const hasMayor = (state: GameState) => state.players.some((p) => p.role === 'mayor')

export function autoMayorTarget(state: GameState): Faction {
  const candidates = FACTIONS.filter((f) => !state.immuneFactions.includes(f) && !state.factions[f].hasProtested)
  const pool = candidates.length > 0 ? candidates : FACTIONS
  const topCrisis = Math.max(...pool.map((f) => state.factions[f].crisis))
  const tied = pool.filter((f) => state.factions[f].crisis === topCrisis)
  return tied[Math.floor(Math.random() * tied.length)]
}

export function resolveMayor(state: GameState, target?: Faction): GameState {
  let cut = target ?? state.mayorTarget ?? autoMayorTarget(state)
  
  // If citizen protested, they cannot be cut by the mayor normally
  if (cut === 'citizen' && state.factions.citizen.hasProtested) {
    cut = autoMayorTarget(state) // pick someone else
  }
  
  return finalizeRound({ ...state, mayorTarget: cut })
}

export function finalizeRound(state: GameState): GameState {
  let factions = state.factions
  let crisisIncreased: Faction | null = null
  const cut = state.mayorTarget

  if (state.martialLawActive) {
    // Under Martial Law, Mayor grants immunity to selected factions, all others get crisis
    FACTIONS.forEach(f => {
      if (!state.immuneFactions.includes(f)) {
        factions = { ...factions, [f]: { ...factions[f], crisis: factions[f].crisis + 1 } }
      }
    })
  } else {
    // Normal resolution
    if (cut && !state.immuneFactions.includes(cut)) {
      factions = { ...factions, [cut]: { ...factions[cut], crisis: factions[cut].crisis + 1 } }
      crisisIncreased = cut
    }
  }

  // Farmer's passive logic: +1 bonus water if successful for 2 rounds
  let bonusWaterNextRound = state.bonusWaterNextRound
  if (crisisIncreased !== 'farmer' && (!state.martialLawActive || state.immuneFactions.includes('farmer'))) {
    factions.farmer.consecutiveWaterRounds += 1
    if (factions.farmer.consecutiveWaterRounds >= 2) {
      bonusWaterNextRound += 1
      factions.farmer.consecutiveWaterRounds = 0
    }
  } else {
    factions.farmer.consecutiveWaterRounds = 0
  }

  const lastResult: RoundResultData = {
    event: state.currentEvent,
    investedFactions: state.immuneFactions,
    cutFaction: cut,
    crisisIncreased,
    wasCrisis: state.waterTokens < CRISIS_THRESHOLD,
  }

  return { ...state, factions, bonusWaterNextRound, lastResult, phase: 'round_result', timerEnds: null }
}

export function advanceFromResult(state: GameState): GameState {
  const collapsed = FACTIONS.some((f) => state.factions[f].crisis >= CRISIS_LIMIT)
  if (collapsed) return { ...state, phase: 'game_over', timerEnds: null }
  if (state.round >= state.maxRounds) return { ...state, phase: 'victory', timerEnds: null }
  return startRound({ ...state, round: state.round + 1 })
}

export function resetToLobby(state: GameState): GameState {
  return { ...createInitialState(state.pin, state.mode), players: state.players }
}

export function collapsedFactions(state: GameState): Faction[] {
  return FACTIONS.filter((f) => state.factions[f].crisis >= CRISIS_LIMIT)
}

export { hasMayor }
