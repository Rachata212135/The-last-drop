import type { AccentKey } from './content'

/**
 * Static Tailwind class strings per accent. Kept as complete literals (never
 * interpolated) so Tailwind's compiler can detect every class at build time.
 */
export interface AccentStyle {
  text: string
  bg: string
  bgSoft: string
  border: string
  ring: string
  glow: string
  gradient: string
  fill: string
}

export const ACCENT: Record<AccentKey, AccentStyle> = {
  water: {
    text: 'text-water',
    bg: 'bg-water text-water-foreground',
    bgSoft: 'bg-water/10',
    border: 'border-water/50',
    ring: 'ring-water/60',
    glow: 'shadow-[0_0_40px_-6px_var(--water)]',
    gradient: 'from-water/25 to-transparent',
    fill: 'bg-water',
  },
  toxic: {
    text: 'text-toxic',
    bg: 'bg-toxic text-toxic-foreground',
    bgSoft: 'bg-toxic/10',
    border: 'border-toxic/50',
    ring: 'ring-toxic/60',
    glow: 'shadow-[0_0_40px_-6px_var(--toxic)]',
    gradient: 'from-toxic/25 to-transparent',
    fill: 'bg-toxic',
  },
  ember: {
    text: 'text-ember',
    bg: 'bg-ember text-ember-foreground',
    bgSoft: 'bg-ember/10',
    border: 'border-ember/50',
    ring: 'ring-ember/60',
    glow: 'shadow-[0_0_40px_-6px_var(--ember)]',
    gradient: 'from-ember/25 to-transparent',
    fill: 'bg-ember',
  },
  gold: {
    text: 'text-gold',
    bg: 'bg-gold text-gold-foreground',
    bgSoft: 'bg-gold/10',
    border: 'border-gold/50',
    ring: 'ring-gold/60',
    glow: 'shadow-[0_0_40px_-6px_var(--gold)]',
    gradient: 'from-gold/25 to-transparent',
    fill: 'bg-gold',
  },
  alert: {
    text: 'text-alert',
    bg: 'bg-alert text-alert-foreground',
    bgSoft: 'bg-alert/10',
    border: 'border-alert/50',
    ring: 'ring-alert/60',
    glow: 'shadow-[0_0_40px_-6px_var(--alert)]',
    gradient: 'from-alert/25 to-transparent',
    fill: 'bg-alert',
  },
}
