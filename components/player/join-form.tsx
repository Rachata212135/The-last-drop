'use client'

import { ArrowLeft, ArrowRight, Droplets } from 'lucide-react'
import { useState } from 'react'
import { RoleCard } from '@/components/game/role-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CHOOSABLE_ROLES, ROLE_META } from '@/lib/game/content'
import type { Role } from '@/lib/game/types'
import { cn } from '@/lib/utils'

export function JoinForm({
  onJoin,
  initialPin = '',
}: {
  onJoin: (pin: string, name: string, role: Role) => void
  initialPin?: string
}) {
  const [step, setStep] = useState<'details' | 'role'>('details')
  const [name, setName] = useState('')
  const [pin, setPin] = useState(initialPin)
  const [role, setRole] = useState<Role | null>(null)

  const detailsValid = name.trim().length > 0 && /^\d{4}$/.test(pin.trim())

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-atmosphere px-5 py-8 text-foreground">
      <div className="mb-6 flex items-center gap-2 text-water">
        <Droplets className="size-5" />
        <span className="font-display text-lg font-bold tracking-wide">หยดสุดท้าย (The Last Drop)</span>
      </div>

      {step === 'details' ? (
        <form
          className="flex flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            if (detailsValid) setStep('role')
          }}
        >
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-balance text-glow-water">เข้าร่วมเมือง</h1>
              <p className="mt-1 text-muted-foreground">ใส่รหัส PIN ที่ปรากฏบนหน้าจอหลัก</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="pin" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                รหัสเข้าเกม (PIN)
              </label>
              <Input
                id="pin"
                inputMode="numeric"
                autoComplete="off"
                placeholder="0000"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="h-16 rounded-2xl border-water/30 bg-card text-center font-display text-4xl font-bold tracking-[0.4em] tabular-nums shadow-inner focus:border-water focus:ring-water"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                ชื่อของคุณ
              </label>
              <Input
                id="name"
                autoComplete="off"
                placeholder="เช่น สมชาย"
                value={name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-2xl border-border bg-card text-center text-xl font-medium shadow-inner"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!detailsValid}
            className="h-16 w-full gap-2 rounded-2xl bg-water text-lg font-semibold text-water-foreground hover:bg-water/90 disabled:opacity-40 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform active:scale-[0.98]"
          >
            เลือกกลุ่มของคุณ <ArrowRight className="size-5" />
          </Button>
        </form>
      ) : (
        <div className="flex flex-1 flex-col">
          <button
            type="button"
            onClick={() => setStep('details')}
            className="mb-4 flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> กลับ
          </button>

          <h1 className="font-display text-3xl font-bold text-balance text-glow-water">เลือกบทบาท</h1>
          <p className="mt-1 mb-5 text-muted-foreground">
            กลุ่มของคุณจะเป็นตัวกำหนดชะตาชีวิตเมื่อน้ำแห้งขอด
          </p>

          <div className="grid flex-1 grid-cols-2 gap-3 pb-4">
            {CHOOSABLE_ROLES.map((r) => (
              <RoleCard
                key={r}
                role={r as Role}
                compact
                selected={role === r}
                onSelect={() => setRole(r as Role)}
              />
            ))}
          </div>

          <Button
            size="lg"
            disabled={!role}
            onClick={() => role && onJoin(pin.trim(), name.trim(), role)}
            className={cn(
              'h-16 w-full rounded-2xl text-lg font-semibold transition-transform active:scale-[0.98]',
              'bg-water text-water-foreground hover:bg-water/90 disabled:opacity-40 shadow-[0_0_15px_rgba(34,211,238,0.5)]',
            )}
          >
            {role ? `เข้าร่วมในฐานะ ${ROLE_META[role].label}` : 'เลือกกลุ่ม'}
          </Button>
        </div>
      )}
    </div>
  )
}
