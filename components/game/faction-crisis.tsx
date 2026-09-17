'use client'

import { Factory, Users, Wheat } from 'lucide-react'
import { CRISIS_LIMIT } from '@/lib/game/logic'
import { ACCENT } from '@/lib/game/accent'
import { ROLE_META } from '@/lib/game/content'
import type { Faction } from '@/lib/game/types'
import { cn } from '@/lib/utils'

const ICON = { Wheat, Factory, Users } as const

/** A faction's identity plus its crisis meter (pips filling toward collapse). */
export function FactionCrisis({
  faction,
  crisis,
  count,
  highlight,
}: {
  faction: Faction
  crisis: number
  count?: number
  highlight?: 'immune' | 'cut' | null
}) {
  const meta = ROLE_META[faction]
  const accent = ACCENT[meta.accent]
  const Icon = ICON[meta.icon as keyof typeof ICON]
  const collapsed = crisis >= CRISIS_LIMIT

  return (
    <div
      className={cn(
        'relative flex flex-col gap-3 rounded-2xl border bg-card/70 p-4 backdrop-blur-sm transition-colors shadow-lg',
        collapsed ? 'border-alert/60 bg-alert/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : accent.border,
        highlight === 'cut' && 'ring-2 ring-alert/70',
        highlight === 'immune' && cn('ring-2', accent.ring),
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn('grid size-9 place-items-center rounded-xl shadow-md', accent.bgSoft)}>
            <Icon className={cn('size-5', accent.text)} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold">{meta.label}</p>
            {count !== undefined && (
              <p className="text-xs text-muted-foreground">
                {count} {count === 1 ? 'คน' : 'คน'}
              </p>
            )}
          </div>
        </div>
        {highlight === 'immune' && (
          <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-inner', accent.bgSoft, accent.text)}>
            คุ้มกัน
          </span>
        )}
        {highlight === 'cut' && (
          <span className="rounded-full bg-alert/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-alert shadow-inner">
            ถูกตัดน้ำ
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: CRISIS_LIMIT }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full transition-colors shadow-inner',
              i < crisis ? 'bg-alert shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-muted/50',
            )}
          />
        ))}
        <span
          className={cn(
            'ml-1 w-16 text-right text-[10px] font-semibold uppercase tracking-wider',
            collapsed ? 'text-alert font-bold' : 'text-muted-foreground',
          )}
        >
          {collapsed ? 'ล่มสลาย' : `วิกฤต ${crisis}/${CRISIS_LIMIT}`}
        </span>
      </div>
    </div>
  )
}
