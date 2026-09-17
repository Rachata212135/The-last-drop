'use client'

import { Radio, Wifi } from 'lucide-react'
import { WaterMeter } from '@/components/game/water-meter'
import type { Transport } from '@/lib/realtime'
import type { GameState } from '@/lib/game/types'
import { cn } from '@/lib/utils'

/** Persistent top bar for the host: title, round tracker, water, sync status. */
export function HostHud({
  state,
  transport,
}: {
  state: GameState
  transport: Transport | null
}) {
  const showRound = state.round > 0 && state.phase !== 'game_over' && state.phase !== 'victory'

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 px-6 py-4 sm:px-10">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-xl font-bold tracking-wide sm:text-2xl">
          หยดสุดท้าย (The Last Drop)
        </h1>
        <span
          className={cn(
            'hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium sm:flex',
            transport === 'supabase'
              ? 'border-toxic/40 bg-toxic/10 text-toxic'
              : 'border-gold/40 bg-gold/10 text-gold',
          )}
        >
          {transport === 'supabase' ? <Wifi className="size-3" /> : <Radio className="size-3" />}
          {transport === 'supabase' ? 'ซิงค์ออนไลน์' : 'ซิงค์โลคอล'}
        </span>
      </div>

      <div className="flex items-center gap-6">
        {showRound && (
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">รอบที่</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: state.maxRounds }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'size-2.5 rounded-full transition-colors',
                    i < state.round ? 'bg-water shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-muted/50',
                  )}
                />
              ))}
            </div>
            <span className="font-display text-lg font-bold tabular-nums">
              {state.round}
              <span className="text-muted-foreground">/{state.maxRounds}</span>
            </span>
          </div>
        )}
        <WaterMeter value={state.waterTokens} size="sm" />
      </div>
    </header>
  )
}
