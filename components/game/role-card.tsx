'use client'

import { Crown, Factory, Users, Wheat } from 'lucide-react'
import { ACCENT } from '@/lib/game/accent'
import { ROLE_META } from '@/lib/game/content'
import type { Role } from '@/lib/game/types'
import { cn } from '@/lib/utils'

const ICON = { Wheat, Factory, Users, Crown } as const

/** Polished, glowing role card used in the join flow and lobby. */
export function RoleCard({
  role,
  selected = false,
  onSelect,
  compact = false,
}: {
  role: Role
  selected?: boolean
  onSelect?: () => void
  compact?: boolean
}) {
  const meta = ROLE_META[role]
  const accent = ACCENT[meta.accent]
  const Icon = ICON[meta.icon]

  const Wrapper = onSelect ? 'button' : 'div'

  return (
    <Wrapper
      type={onSelect ? 'button' : undefined}
      onClick={onSelect}
      aria-pressed={onSelect ? selected : undefined}
      className={cn(
        'group relative overflow-hidden rounded-3xl border bg-card text-left transition-all duration-300',
        accent.border,
        onSelect && 'cursor-pointer hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2',
        onSelect && accent.ring,
        selected ? cn('ring-2 -translate-y-1', accent.ring, accent.glow) : 'shadow-xl shadow-black/40',
      )}
    >
      <div className={cn('relative w-full overflow-hidden', compact ? 'h-28' : 'h-44')}>
        <img
          src={meta.image || '/placeholder.svg'}
          alt={`${meta.label} faction illustration`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className={cn('absolute inset-0 bg-gradient-to-t opacity-60', accent.gradient)} />
        <span
          className={cn(
            'absolute left-3 top-3 grid place-items-center rounded-xl border backdrop-blur-md',
            compact ? 'size-8' : 'size-10',
            accent.border,
            accent.bgSoft,
          )}
        >
          <Icon className={cn(compact ? 'size-4' : 'size-5', accent.text)} />
        </span>
      </div>

      <div className={cn('space-y-1', compact ? 'p-3' : 'p-4')}>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className={cn('font-display font-bold', compact ? 'text-lg' : 'text-xl')}>
            {meta.label}
          </h3>
          {selected && (
            <span className={cn('text-[10px] font-bold uppercase tracking-wider', accent.text)}>
              เลือกแล้ว
            </span>
          )}
        </div>
        <p className={cn('font-medium uppercase tracking-wider', accent.text, compact ? 'text-[10px]' : 'text-xs')}>
          {meta.tagline}
        </p>
        {!compact && (
          <p className="pt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
            {meta.description}
          </p>
        )}
      </div>
    </Wrapper>
  )
}
