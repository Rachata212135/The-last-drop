'use client'

import { Check, Factory, HelpCircle, Users, Wheat, X } from 'lucide-react'
import { TimerRing } from '@/components/game/timer-ring'
import { ACCENT } from '@/lib/game/accent'
import { FACTIONS, ROLE_META } from '@/lib/game/content'
import { VOTE_SECONDS } from '@/lib/game/logic'
import type { GameState } from '@/lib/game/types'
import { cn } from '@/lib/utils'

const ICON = { Wheat, Factory, Users } as const

export function HostVoting({ state, offset }: { state: GameState; offset: number }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-8 px-6 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <TimerRing
          timerEnds={state.timerEnds}
          totalSeconds={VOTE_SECONDS}
          offset={offset}
          size={148}
        />
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl text-glow-water">
            ลงทุนเพื่อคุ้มกันหรือไม่?
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            แต่ละกลุ่มโหวตผ่านมือถือ หากกลุ่มใดมีเสียง{' '}
            <span className="font-semibold text-toxic">ลงทุนเกินครึ่ง</span> จะต้องจ่ายน้ำ 1 หยด
            แต่จะได้รับ <span className="font-semibold text-toxic">ความคุ้มกันจากการตัดน้ำ</span> ในรอบนี้
          </p>
          {state.factions.citizen.hasRevoted && (
             <p className="text-alert font-bold animate-pulse">ประชาชนปลุกระดมให้โหวตใหม่!</p>
          )}
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        {FACTIONS.map((faction) => {
          const meta = ROLE_META[faction]
          const accent = ACCENT[meta.accent]
          const Icon = ICON[meta.icon as keyof typeof ICON]
          const members = state.players.filter((p) => p.role === faction)
          const invested = members.filter((m) => state.votes[m.id] === 'invest').length
          const passed = members.filter((m) => state.votes[m.id] === 'pass').length
          const waiting = members.length - invested - passed
          
          const hasImmunity = state.factions[faction].immuneUntilRound >= state.round

          return (
            <div
              key={faction}
              className={cn('flex flex-col gap-4 rounded-2xl border bg-card/60 p-5 backdrop-blur shadow-xl', accent.border)}
            >
              <div className="flex items-center gap-2">
                <span className={cn('grid size-10 place-items-center rounded-xl shadow-lg', accent.bgSoft)}>
                  <Icon className={cn('size-5', accent.text)} />
                </span>
                <div>
                  <p className="font-display font-semibold flex items-center gap-2">
                     {meta.label}
                     {hasImmunity && <span className="text-[10px] bg-toxic/20 text-toxic px-2 py-0.5 rounded-full">คุ้มกันฟรี</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {members.length} {members.length === 1 ? 'คน' : 'คน'}
                  </p>
                </div>
              </div>

              {members.length === 0 ? (
                <p className="rounded-lg bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
                  ไม่มีผู้เล่น — ผ่านอัตโนมัติ
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Tally icon={<Check className="size-4" />} label="ลงทุน" value={invested} tone="text-toxic" />
                  <Tally icon={<X className="size-4" />} label="ผ่าน" value={passed} tone="text-alert" />
                  <Tally icon={<HelpCircle className="size-4" />} label="รอโหวต" value={waiting} tone="text-muted-foreground" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Tally({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: number
  tone: string
}) {
  return (
    <div className="rounded-lg bg-background/40 py-2 shadow-inner">
      <div className={cn('flex items-center justify-center gap-1', tone)}>{icon}</div>
      <p className="font-display text-xl font-bold tabular-nums">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}
