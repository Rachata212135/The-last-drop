'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { joinRoom, type Room } from '@/lib/realtime'
import { makeId } from '@/lib/game/logic'
import type { Faction, GameState, Player, Role, Vote } from '@/lib/game/types'

const STORAGE_KEY = 'lastdrop:me'

export interface Me extends Player {
  pin: string
}

interface StoredMe extends Me {}

function loadMe(): StoredMe | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredMe) : null
  } catch {
    return null
  }
}

/**
 * The player client. It only sends actions and mirrors the host's broadcast
 * state. Identity is persisted so a phone refresh silently reconnects.
 */
export function usePlayerGame() {
  const [me, setMe] = useState<Me | null>(null)
  const [state, setState] = useState<GameState | null>(null)
  const [connected, setConnected] = useState(false)

  const roomRef = useRef<Room | null>(null)
  const meRef = useRef<Me | null>(null)
  const offsetRef = useRef(0)

  const teardown = useCallback(() => {
    roomRef.current?.close()
    roomRef.current = null
    setConnected(false)
  }, [])

  const connect = useCallback((identity: Me) => {
    teardown()
    meRef.current = identity
    const player: Player = { id: identity.id, name: identity.name, role: identity.role }

    const room = joinRoom(
      identity.pin,
      (event, payload) => {
        if (event !== 'state') return
        const next = payload as GameState
        offsetRef.current = next.now - Date.now()
        setState(next)
      },
      () => {
        setConnected(true)
        room.send('action', { type: 'join', player })
        room.send('action', { type: 'request_state' })
      },
    )
    roomRef.current = room
  }, [teardown])

  // Auto-reconnect a returning player.
  useEffect(() => {
    const stored = loadMe()
    if (stored) {
      setMe(stored)
      connect(stored)
    }
    return () => teardown()
  }, [connect, teardown])

  const join = useCallback(
    (pin: string, name: string, role: Role) => {
      const identity: Me = { id: makeId(), name: name.trim(), role, pin: pin.trim() }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
      setMe(identity)
      connect(identity)
    },
    [connect],
  )

  const leave = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'leave', playerId: current.id })
    window.localStorage.removeItem(STORAGE_KEY)
    meRef.current = null
    setMe(null)
    setState(null)
    teardown()
  }, [teardown])

  const vote = useCallback((choice: Vote) => {
    const current = meRef.current
    if (!current) return
    roomRef.current?.send('action', { type: 'vote', playerId: current.id, choice })
  }, [])

  const chooseCut = useCallback((target: Faction) => {
    const current = meRef.current
    if (!current) return
    roomRef.current?.send('action', { type: 'mayor', playerId: current.id, target })
  }, [])

  const bioFertilizer = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'bio_fertilizer', playerId: current.id })
  }, [])

  const backupFactory = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'backup_factory', playerId: current.id })
  }, [])

  const protest = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'protest', playerId: current.id })
  }, [])

  const revote = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'revote', playerId: current.id })
  }, [])

  const veto = useCallback(() => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'veto', playerId: current.id })
  }, [])

  const martialLaw = useCallback((targets: Faction[]) => {
    const current = meRef.current
    if (current) roomRef.current?.send('action', { type: 'martial_law', playerId: current.id, targets })
  }, [])

  return { me, state, connected, offset: offsetRef.current, join, leave, vote, chooseCut, bioFertilizer, backupFactory, protest, revote, veto, martialLaw }
}

