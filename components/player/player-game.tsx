'use client'

import {
  ArrowUpCircle,
  Check,
  Crown,
  Eye,
  Factory,
  Loader2,
  LogOut,
  Users,
  Wheat,
  X,
  Zap,
  ShieldX,
  Gavel,
  RefreshCw,
  Megaphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TimerRing } from '@/components/game/timer-ring'
import { ACCENT } from '@/lib/game/accent'
import { FACTIONS, ROLE_META } from '@/lib/game/content'
import { MAYOR_SECONDS, VOTE_SECONDS } from '@/lib/game/logic'
import { usePlayerGame } from '@/hooks/use-player-game'
import type { Faction, GameState } from '@/lib/game/types'
import { JoinForm } from './join-form'
import { cn } from '@/lib/utils'

const ICON = { Wheat, Factory, Users, Crown } as const

export function PlayerGame({ initialPin = '' }: { initialPin?: string }) {
  const { me, state, connected, offset, join, leave, vote, chooseCut, bioFertilizer, backupFactory, protest, revote, veto, martialLaw } = usePlayerGame()

  if (!me) return <JoinForm onJoin={join} initialPin={initialPin} />

  const meta = ROLE_META[me.role]
  const accent = ACCENT[meta.accent]
  const Icon = ICON[meta.icon]

  return (
    <main className="flex min-h-dvh flex-col bg-atmosphere px-5 py-6 text-foreground">
      {/* Identity bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={cn('grid size-11 place-items-center rounded-xl border shadow-lg', accent.border, accent.bgSoft)}>
            <Icon className={cn('size-5', accent.text)} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold">{me.name}</p>
            <p className={cn('text-xs font-medium uppercase tracking-wider', accent.text)}>
              {meta.label}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={leave}
          aria-label="Leave game"
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-alert"
        >
          <LogOut className="size-4" /> ออก
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        {!state || !connected ? (
          <Waiting icon={<Loader2 className="size-10 animate-spin text-water" />} title="กำลังเชื่อมต่อ…" subtitle="เดินทางสู่อ่างเก็บน้ำ" />
        ) : (
          <PlayerPhase 
             state={state} 
             me={me} 
             accent={accent} 
             offset={offset} 
             vote={vote} 
             chooseCut={chooseCut} 
             bioFertilizer={bioFertilizer}
             backupFactory={backupFactory}
             protest={protest}
             revote={revote}
             veto={veto}
             martialLaw={martialLaw}
          />
        )}
      </div>
    </main>
  )
}

function PlayerPhase({
  state,
  me,
  accent,
  offset,
  vote,
  chooseCut,
  bioFertilizer,
  backupFactory,
  protest,
  revote,
  veto,
  martialLaw,
}: {
  state: GameState
  me: { id: string; role: GameState['players'][number]['role'] }
  accent: (typeof ACCENT)[keyof typeof ACCENT]
  offset: number
  vote: (choice: 'invest' | 'pass') => void
  chooseCut: (target: Faction) => void
  bioFertilizer: () => void
  backupFactory: () => void
  protest: () => void
  revote: () => void
  veto: () => void
  martialLaw: (targets: Faction[]) => void
}) {
  const isMayor = me.role === 'mayor'

  switch (state.phase) {
    case 'lobby':
      return (
        <Waiting
          icon={<Check className={cn('size-10', accent.text)} />}
          title="เข้าร่วมสำเร็จ!"
          subtitle="มองไปที่หน้าจอหลักและรอให้เกมเริ่ม"
          screenHint
        />
      )

    case 'event_reveal':
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
          <Waiting
            icon={<Eye className="size-10 text-alert" />}
            title="วิกฤตปรากฏ!"
            subtitle="ดูการ์ดเหตุการณ์บนหน้าจอหลัก"
            screenHint
          />
          {isMayor && !state.hasUsedVeto && !state.vetoedEvent && (
            <Button onClick={veto} variant="destructive" className="mt-8 gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <ShieldX className="size-5" />
              ใช้สิทธิยับยั้งเหตุการณ์ (Veto) - 1 ครั้ง/เกม
            </Button>
          )}
        </div>
      )

    case 'voting': {
      if (isMayor) {
        return (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
             <Waiting
               icon={<Crown className="size-10 text-gold" />}
               title="จับตาดูพวกมัน"
               subtitle="รอให้กลุ่มต่างๆ ตัดสินใจโหวต"
               screenHint
             />
             {!state.hasUsedMartialLaw && (
                <Button onClick={() => martialLaw([])} className="mt-8 gap-2 bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                  <Gavel className="size-5" />
                  ประกาศกฎอัยการศึก (ข้ามโหวต) - 1 ครั้ง/เกม
                </Button>
             )}
          </div>
        )
      }

      // Abilities for factions during voting
      const renderAbilities = () => {
        if (me.role === 'farmer' && !state.factions.farmer.hasUsedFertilizer && state.factions.farmer.crisis > 0) {
          return (
            <Button onClick={bioFertilizer} className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] mb-4">
              <Zap className="size-4" /> ใช้ปุ๋ยชีวภาพ (ลดวิกฤตตัวเอง 1) - 1 ครั้ง/เกม
            </Button>
          )
        }
        if (me.role === 'industry' && !state.factions.industry.hasUsedBackup) {
          return (
            <Button onClick={backupFactory} className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] mb-4">
              <Factory className="size-4" /> ใช้โรงงานสำรอง (เพิ่มน้ำ 2 แต่เพิ่มวิกฤต 1) - 1 ครั้ง/เกม
            </Button>
          )
        }
        if (me.role === 'citizen' && !state.factions.citizen.hasRevoted) {
          return (
            <Button onClick={revote} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] mb-4">
              <RefreshCw className="size-4" /> ปลุกระดมให้โหวตใหม่ (ล้างโหวตทุกคน) - 1 ครั้ง/เกม
            </Button>
          )
        }
        return null
      }

      const myVote = state.votes[me.id]
      if (myVote) {
        return (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <TimerRing timerEnds={state.timerEnds} totalSeconds={VOTE_SECONDS} offset={offset} size={120} />
            <div className="space-y-2">
              <p className="font-display text-2xl font-bold">ล็อกผลโหวตแล้ว</p>
              <p
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold shadow-inner',
                  myVote === 'invest' ? 'bg-toxic/20 text-toxic' : 'bg-alert/20 text-alert',
                )}
              >
                {myVote === 'invest' ? <Check className="size-4" /> : <X className="size-4" />}
                คุณเลือก {myVote === 'invest' ? 'ลงทุน' : 'ผ่าน'}
              </p>
              <p className="text-sm text-muted-foreground">รอดูผลบนหน้าจอหลัก</p>
            </div>
            {renderAbilities()}
          </div>
        )
      }
      return (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col items-center gap-3 pt-2 text-center">
            <TimerRing timerEnds={state.timerEnds} totalSeconds={VOTE_SECONDS} offset={offset} size={104} />
            <p className="text-pretty text-muted-foreground">
              ลงทุนน้ำ 1 หยดเพื่อคุ้มกันกลุ่มคุณจากการถูกตัดน้ำในรอบนี้หรือไม่?
            </p>
          </div>
          {renderAbilities()}
          <div className="grid flex-1 grid-rows-2 gap-4 pt-2">
            <BigButton
              onClick={() => vote('invest')}
              className="bg-toxic text-toxic-foreground hover:bg-toxic/90"
              icon={<ArrowUpCircle className="size-9" />}
              label="ลงทุน"
              hint="ใช้น้ำ 1 หยด"
            />
            <BigButton
              onClick={() => vote('pass')}
              className="bg-alert text-alert-foreground hover:bg-alert/90"
              icon={<X className="size-9" />}
              label="ผ่าน"
              hint="ประหยัดน้ำไว้"
            />
          </div>
        </div>
      )
    }

    case 'mayor_action': {
      if (!isMayor) {
        return (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
             <Waiting
               icon={<Crown className="size-10 text-gold" />}
               title="นายกฯ กำลังตัดสินใจ"
               subtitle="มีกลุ่มที่กำลังจะถูกตัดน้ำ รอดูหน้าจอหลัก"
               screenHint
             />
             {me.role === 'citizen' && !state.factions.citizen.hasProtested && (
                <Button onClick={protest} className="mt-8 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <Megaphone className="size-5" />
                  ม็อบประท้วง! (ป้องกันการถูกนายกฯ ตัดน้ำรอบนี้) - 1 ครั้ง/เกม
                </Button>
             )}
          </div>
        )
      }
      if (state.mayorTarget && !state.martialLawActive) {
        return (
          <Waiting
            icon={<Check className="size-10 text-gold" />}
            title="ตัดสินใจเด็ดขาด"
            subtitle={`คุณตัดน้ำ ${ROLE_META[state.mayorTarget].label} ดูผลลัพธ์บนหน้าจอหลัก`}
            screenHint
          />
        )
      }
      return (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <TimerRing timerEnds={state.timerEnds} totalSeconds={MAYOR_SECONDS} offset={offset} size={104} danger />
            <div>
              <p className="font-display text-2xl font-bold text-alert text-glow-alert">วิกฤต!</p>
              <p className="text-pretty text-muted-foreground">
                {state.martialLawActive ? "กฎอัยการศึก: เลือกกลุ่มที่ต้องการ ตัดน้ำ (ไม่ได้คุ้มกัน)" : "เลือก 1 กลุ่มเพื่อตัดน้ำ"}
              </p>
            </div>
          </div>
          <div className="grid flex-1 gap-3">
            {FACTIONS.map((faction) => {
              const fm = ROLE_META[faction]
              const fa = ACCENT[fm.accent]
              const FIcon = ICON[fm.icon]
              const immune = state.immuneFactions.includes(faction)
              const protested = state.factions[faction].hasProtested && faction === 'citizen'
              const cantCut = immune || protested
              
              return (
                <button
                  key={faction}
                  type="button"
                  onClick={() => { if (!cantCut) chooseCut(faction) }}
                  disabled={cantCut}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-transform active:scale-[0.98]',
                    fa.border,
                    fa.bgSoft,
                    cantCut && 'opacity-50 grayscale cursor-not-allowed'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <FIcon className={cn('size-6', fa.text)} />
                    <span className="font-display text-lg font-bold">ตัด ${fm.label}</span>
                  </span>
                  {immune && (
                    <span className="rounded-full bg-toxic/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-toxic border border-toxic/40">
                      คุ้มกัน
                    </span>
                  )}
                  {protested && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/40">
                      ประท้วง
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    case 'round_result':
      return (
        <Waiting
          icon={<Eye className="size-10 text-water" />}
          title="ฝุ่นตลบ"
          subtitle="ดูว่าใครรอดและใครถูกตัดน้ำบนหน้าจอหลัก"
          screenHint
        />
      )

    case 'game_over':
      return (
        <Waiting
          icon={<X className="size-10 text-alert" />}
          title="เมืองล่มสลาย"
          subtitle="ความโกลาหลครอบงำ ดูบทสรุปบนหน้าจอหลัก"
        />
      )

    case 'victory':
      return (
        <Waiting
          icon={<Check className="size-10 text-toxic" />}
          title="เมืองอยู่รอด"
          subtitle="คุณแบ่งปันน้ำหยดสุดท้ายด้วยกัน ฉลองบนหน้าจอหลัก!"
        />
      )

    default:
      return null
  }
}

function BigButton({
  onClick,
  className,
  icon,
  label,
  hint,
}: {
  onClick: () => void
  className: string
  icon: React.ReactNode
  label: string
  hint: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-3xl font-display shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-transform active:scale-[0.97]',
        className,
      )}
    >
      {icon}
      <span className="text-3xl font-black tracking-wide">{label}</span>
      <span className="text-sm font-medium opacity-90">{hint}</span>
    </button>
  )
}

function Waiting({
  icon,
  title,
  subtitle,
  screenHint = false,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  screenHint?: boolean
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
      <div className="grid size-20 place-items-center rounded-full border border-border/60 bg-card/80 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h2 className="font-display text-2xl font-bold text-balance">{title}</h2>
        <p className="mx-auto max-w-xs text-pretty text-muted-foreground">{subtitle}</p>
      </div>
      {screenHint && (
        <span className="mt-2 flex items-center gap-2 rounded-full border border-water/40 bg-water/10 px-4 py-2 text-sm font-medium text-water shadow-inner">
          <Eye className="size-4" /> ดูที่หน้าจอหลัก
        </span>
      )}
    </div>
  )
}
