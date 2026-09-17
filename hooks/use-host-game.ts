'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { joinRoom, type Room, type Transport } from '@/lib/realtime'
import {
  advanceFromResult,
  allFactionPlayersVoted,
  beginVoting,
  createInitialState,
  makePin,
  resetToLobby,
  resolveMayor,
  resolveVoting,
  startGame as startGameLogic,
  startRound,
} from '@/lib/game/logic'
import type { GameState, PlayerAction, Player } from '@/lib/game/types'

/**
 * The host is the single source of truth. It owns the authoritative GameState,
 * runs every phase timer, applies player actions, and broadcasts the full
 * state after each change. Players are pure mirrors of what the host sends.
 */
export function useHostGame() {
  const [state, setState] = useState<GameState | null>(null)
  const [transport, setTransport] = useState<Transport | null>(null)

  const stateRef = useRef<GameState | null>(null)
  const roomRef = useRef<Room | null>(null)
  const readyRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const broadcast = useCallback((next: GameState) => {
    const stamped: GameState = { ...next, now: Date.now() }
    stateRef.current = stamped
    setState(stamped)
    if (readyRef.current) roomRef.current?.send('state', stamped)
  }, [])

  const upsertPlayer = useCallback(
    (player: Player) => {
      const s = stateRef.current
      if (!s) return
      const existing = s.players.find((p) => p.id === player.id)
      if (existing) {
        // Reconnect / role change allowed only in the lobby.
        const players =
          s.phase === 'lobby'
            ? s.players.map((p) => (p.id === player.id ? player : p))
            : s.players
        broadcast({ ...s, players })
        return
      }
      if (s.phase !== 'lobby') {
        // Game already running: don't add newcomers, just resync them.
        broadcast(s)
        return
      }
      broadcast({ ...s, players: [...s.players, player] })
    },
    [broadcast],
  )

  const handleAction = useCallback(
    (action: PlayerAction) => {
      const s = stateRef.current
      if (!s) return

      switch (action.type) {
        case 'join':
          upsertPlayer(action.player)
          return
        case 'leave':
          broadcast({ ...s, players: s.players.filter((p) => p.id !== action.playerId) })
          return
        case 'request_state':
          if (readyRef.current) roomRef.current?.send('state', { ...s, now: Date.now() })
          return
        case 'vote': {
          if (s.phase !== 'voting') return
          const voter = s.players.find((p) => p.id === action.playerId)
          if (!voter || voter.role === 'mayor') return
          if (s.votes[action.playerId]) return // votes are locked once cast
          const next: GameState = {
            ...s,
            votes: { ...s.votes, [action.playerId]: action.choice },
          }
          if (allFactionPlayersVoted(next)) broadcast(resolveVoting(next))
          else broadcast(next)
          return
        }
        case 'mayor': {
          if (s.phase !== 'mayor_action' || s.mayorTarget) return
          const mayor = s.players.find((p) => p.id === action.playerId)
          if (!mayor || mayor.role !== 'mayor') return
          broadcast(resolveMayor(s, action.target))
          return
        }
      }
    },
    [broadcast, upsertPlayer],
  )

  // Establish the room once, with a fresh PIN.
  useEffect(() => {
    const initial = createInitialState(makePin())
    stateRef.current = initial
    setState(initial)

    const room = joinRoom(
      initial.pin,
      (event, payload) => {
        if (event === 'action') handleAction(payload as PlayerAction)
      },
      () => {
        readyRef.current = true
        // Announce current state to anyone already waiting.
        roomRef.current?.send('state', { ...(stateRef.current as GameState), now: Date.now() })
      },
    )
    roomRef.current = room
    setTransport(room.transport)

    return () => {
      readyRef.current = false
      room.close()
    }
  }, [handleAction])

  // Drive phase timers off the authoritative timerEnds.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const s = state
    if (!s || !s.timerEnds) return
    if (s.phase !== 'event_reveal' && s.phase !== 'voting' && s.phase !== 'mayor_action') return

    const delay = Math.max(0, s.timerEnds - Date.now())
    timerRef.current = setTimeout(() => {
      const cur = stateRef.current
      if (!cur) return
      if (cur.phase === 'event_reveal') broadcast(beginVoting(cur))
      else if (cur.phase === 'voting') broadcast(resolveVoting(cur))
      else if (cur.phase === 'mayor_action') broadcast(resolveMayor(cur))
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [state, broadcast])

  const startGame = useCallback(() => {
    const s = stateRef.current
    if (!s || s.phase !== 'lobby') return
    broadcast(startGameLogic(s))
  }, [broadcast])

  const continueFromResult = useCallback(() => {
    const s = stateRef.current
    if (!s || s.phase !== 'round_result') return
    broadcast(advanceFromResult(s))
  }, [broadcast])

  const skipReveal = useCallback(() => {
    const s = stateRef.current
    if (!s || s.phase !== 'event_reveal') return
    broadcast(beginVoting(s))
  }, [broadcast])

  const playAgain = useCallback(() => {
    const s = stateRef.current
    if (!s) return
    broadcast(resetToLobby(s))
  }, [broadcast])

  return { state, transport, startGame, continueFromResult, skipReveal, playAgain }
}
