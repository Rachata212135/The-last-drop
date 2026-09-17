'use client'

import { Droplet, Droplets } from 'lucide-react'
import type { GameEvent } from '@/lib/game/types'
import { cn } from '@/lib/utils'

export function EventCard({
  event,
  animate = true,
  size = 'lg',
}: {
  event: GameEvent
  animate?: boolean
  size?: 'lg' | 'sm'
}) {
  const isMiracle = event.category === 'miracle'
  const accentColor = isMiracle ? 'var(--toxic)' : 'var(--alert)'
  const accentClass = isMiracle ? 'text-toxic' : 'text-alert'
  const borderClass = isMiracle ? 'border-toxic/40' : 'border-alert/40'
  
  const categoryLabels = {
    disaster: 'ภัยพิบัติธรรมชาติ',
    miracle: 'ปาฏิหาริย์ฟ้าฝน',
    political: 'การเมืองและกักตุน',
    dilemma: 'ทางเลือกวัดใจนายกฯ'
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border bg-card shadow-2xl shadow-black/60',
        borderClass,
        isMiracle ? 'shadow-[0_0_60px_-12px_var(--toxic)]' : 'shadow-[0_0_60px_-12px_var(--alert)]',
        size === 'lg' ? 'w-[19rem] sm:w-[22rem]' : 'w-full max-w-xs',
        animate && 'animate-draw-card',
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/5" />
      <div className={cn('relative w-full overflow-hidden', size === 'lg' ? 'h-64 sm:h-72' : 'h-40')}>
        <div className={cn("size-full flex items-center justify-center text-muted-foreground/20", isMiracle ? "bg-green-950/30" : "bg-red-950/30")}>
           <img
             src={event.image || '/placeholder.svg'}
             alt={`${event.name} event illustration`}
             className="size-full object-cover mix-blend-overlay opacity-60"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
           {!event.image && (isMiracle ? <Droplets className="size-32" /> : <Droplet className="size-32" />)}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className={cn("absolute right-3 top-3 flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1.5 backdrop-blur-md", borderClass)}>
          <Droplet className={cn("size-4", accentClass)} />
          <span className={cn("font-display text-lg font-bold tabular-nums", accentClass)}>
            {isMiracle ? `+${Math.abs(event.cost)}` : `−${event.cost}`}
          </span>
        </div>
        <span className={cn("absolute left-4 top-3 text-[10px] font-semibold uppercase tracking-[0.2em]", accentClass)}>
          {categoryLabels[event.category] || 'เหตุการณ์'}
        </span>
      </div>

      <div className={cn('space-y-2', size === 'lg' ? 'p-6' : 'p-4')}>
        <h3 className={cn('font-display font-bold text-balance', size === 'lg' ? 'text-3xl' : 'text-xl', isMiracle && 'text-glow-toxic text-toxic')}>
          {event.name}
        </h3>
        <p className={cn('leading-relaxed text-muted-foreground text-pretty', size === 'lg' ? 'text-base' : 'text-sm')}>
          {event.description}
        </p>
      </div>
    </div>
  )
}
