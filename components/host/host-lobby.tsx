'use client'

import { useState } from 'react'
import { Crown, Factory, Play, Smartphone, Users, Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ACCENT } from '@/lib/game/accent'
import { CHOOSABLE_ROLES, ROLE_META } from '@/lib/game/content'
import type { GameState, Role, GameMode } from '@/lib/game/types'
import { cn } from '@/lib/utils'

const ICON = { Wheat, Factory, Users, Crown } as const

export function HostLobby({
  state,
  onStart,
}: {
  state: GameState
  onStart: (mode: GameMode) => void
}) {
  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/join` : '/join'
  const [mode, setMode] = useState<GameMode>('standard')

  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-6 py-8 lg:grid-cols-[380px_1fr] lg:items-start">
      {/* Join panel */}
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-card/60 p-8 text-center backdrop-blur">
        <div className="space-y-1">
          <p className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <Smartphone className="size-4" /> เข้าร่วมเกมผ่านมือถือ
          </p>
          <p className="text-sm text-muted-foreground">
            เข้าเว็บไซต์ <span className="font-semibold text-foreground">{joinUrl}</span>
          </p>
        </div>

        <div className="w-full rounded-2xl border border-water/30 bg-water/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-water">รหัสผ่านเข้าเกม (PIN)</p>
          <p className="font-display text-6xl font-black tracking-[0.15em] text-water text-glow-water tabular-nums">
            {state.pin}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="w-full rounded-2xl border border-border/40 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">เลือกโหมดเกม</p>
          <div className="flex flex-col gap-2">
            {(['speed', 'standard', 'hardcore'] as GameMode[]).map((m) => {
              const labels = {
                speed: 'โหมดด่วน (3 รอบ / 15 น้ำ)',
                standard: 'โหมดปกติ (5 รอบ / 20 น้ำ)',
                hardcore: 'โหมดฮาร์ดคอร์ (8 รอบ / 18 น้ำ / ภัยรุนแรงขึ้น)',
              }
              const isActive = mode === m
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
                    isActive 
                      ? 'border-water bg-water/10 text-water shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'border-border/40 bg-card hover:bg-muted text-muted-foreground'
                  )}
                >
                  {labels[m]}
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full space-y-1">
          <p className="font-display text-4xl font-bold tabular-nums">{state.players.length}</p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            ผู้เข้าร่วม · สูงสุด 30 คน
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => onStart(mode)}
          disabled={state.players.length === 0}
          className="w-full gap-2 rounded-xl bg-water text-base font-semibold text-water-foreground hover:bg-water/90 disabled:opacity-40"
        >
          <Play className="size-5" /> เริ่มเกม
        </Button>
        {state.players.length === 0 && (
          <p className="text-xs text-muted-foreground">รอผู้เล่นคนแรกเข้าร่วม…</p>
        )}
      </div>

      {/* Roster grouped by role */}
      <div className="grid gap-4 sm:grid-cols-2">
        {CHOOSABLE_ROLES.map((role) => {
          const meta = ROLE_META[role as Role]
          const accent = ACCENT[meta.accent]
          const Icon = ICON[meta.icon]
          const members = state.players.filter((p) => p.role === role)
          return (
            <div
              key={role}
              className={cn('rounded-2xl border bg-card/60 p-4 backdrop-blur-sm shadow-xl', accent.border)}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('grid size-9 place-items-center rounded-xl shadow-lg', accent.bgSoft)}>
                    <Icon className={cn('size-5', accent.text)} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display font-semibold">{meta.label}</p>
                    <p className={cn('text-[10px] uppercase tracking-wider', accent.text)}>
                      {meta.tagline}
                    </p>
                  </div>
                </div>
                <span className="font-display text-2xl font-bold tabular-nums text-muted-foreground">
                  {members.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {members.length === 0 ? (
                  <span className="text-xs text-muted-foreground/60">ยังไม่มีผู้เล่น…</span>
                ) : (
                  members.map((p) => (
                    <span
                      key={p.id}
                      className={cn(
                        'animate-float-up rounded-lg px-2.5 py-1 text-sm font-medium shadow-md',
                        accent.bgSoft,
                        accent.text,
                      )}
                    >
                      {p.name}
                    </span>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
