export type Faction = 'farmer' | 'industry' | 'citizen'
export type Role = Faction | 'mayor'
export type GameMode = 'speed' | 'standard' | 'hardcore'

export type Phase =
  | 'lobby'
  | 'event_reveal'
  | 'voting'
  | 'mayor_action'
  | 'round_result'
  | 'game_over'
  | 'victory'

export type Vote = 'invest' | 'pass'

export interface Player {
  id: string
  name: string
  role: Role
}

export interface FactionState {
  crisis: number
  consecutiveWaterRounds: number // for farmers
  immuneUntilRound: number // for industry double immunity
  hasUsedFertilizer: boolean // farmer active
  hasUsedBackup: boolean // industry active
  hasProtested: boolean // citizen active 1
  hasRevoted: boolean // citizen active 2
}

import { GameEvent } from './events'
export type { GameEvent }

export interface RoundResultData {
  event: GameEvent | null
  investedFactions: Faction[]
  cutFaction: Faction | null
  crisisIncreased: Faction | null
  wasCrisis: boolean
}

export interface GameState {
  pin: string
  mode: GameMode
  phase: Phase
  round: number
  maxRounds: number
  waterTokens: number
  factions: Record<Faction, FactionState>
  players: Player[]
  currentEvent: GameEvent | null
  /** playerId -> vote for the current voting phase */
  votes: Record<string, Vote>
  /** factions that reached invest-majority this round (immune to crisis) */
  immuneFactions: Faction[]
  mayorTarget: Faction | null
  lastResult: RoundResultData | null
  /** epoch ms (host clock) when the active timer expires, or null */
  timerEnds: number | null
  /** host clock at broadcast time, used to correct player clock skew */
  now: number
  
  // New State variables for abilities
  vetoedEvent: boolean
  hasUsedVeto: boolean
  hasUsedMartialLaw: boolean
  martialLawActive: boolean
  bonusWaterNextRound: number
}

// ---- Player -> Host action messages ----
export type PlayerAction =
  | { type: 'join'; player: Player }
  | { type: 'leave'; playerId: string }
  | { type: 'request_state' }
  | { type: 'set_mode'; mode: GameMode }
  | { type: 'vote'; playerId: string; choice: Vote }
  | { type: 'mayor'; playerId: string; target: Faction }
  // Active Abilities
  | { type: 'bio_fertilizer'; playerId: string }
  | { type: 'backup_factory'; playerId: string }
  | { type: 'protest'; playerId: string }
  | { type: 'revote'; playerId: string }
  | { type: 'veto'; playerId: string }
  | { type: 'martial_law'; playerId: string; targets: Faction[] }
