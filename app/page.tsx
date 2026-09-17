import { Droplets, Monitor, Smartphone, Users } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-atmosphere text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <header className="flex items-center gap-2 text-water">
          <Droplets className="size-6" />
          <span className="font-display text-xl font-bold tracking-wide">หยดสุดท้าย (The Last Drop)</span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-alert/40 bg-alert/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-alert">
            วิกฤตภัยแล้ง · การหักหลัง · การเอาตัวรอด
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-black leading-[1.05] text-balance sm:text-7xl">
            เมื่อน้ำแห้งขอด <span className="text-water text-glow-water">ใครจะเป็นผู้รอดชีวิต?</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground font-medium">
            เกมปาร์ตี้แบบเรียลไทม์ที่รองรับผู้เล่นสูงสุด 30 คน การต่อสู้แย่งชิงทรัพยากรน้ำระหว่าง เกษตรกร, อุตสาหกรรม และ ประชาชน 
            ภายใต้การตัดสินใจอันเด็ดขาดของ นายกเทศมนตรี 
            เปิดจอกลางเพื่อเป็นโฮสต์ และใช้มือถือของคุณในการเล่น!
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/host"
              className="group relative overflow-hidden rounded-3xl border border-water/40 bg-card p-7 shadow-xl shadow-black/40 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--water)]"
            >
              <Monitor className="size-8 text-water" />
              <h2 className="mt-4 font-display text-2xl font-bold">สร้างห้องเกม (โฮสต์)</h2>
              <p className="mt-1 text-pretty text-muted-foreground">
                เปิดเกมบนโปรเจคเตอร์หรือทีวี เพื่อแสดงรหัสผ่าน การ์ดเหตุการณ์ เวลา และอ่างเก็บน้ำของเมือง
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-water">
                เริ่มสร้างห้อง →
              </span>
            </Link>

            <Link
              href="/join"
              className="group relative overflow-hidden rounded-3xl border border-toxic/40 bg-card p-7 shadow-xl shadow-black/40 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--toxic)]"
            >
              <Smartphone className="size-8 text-toxic" />
              <h2 className="mt-4 font-display text-2xl font-bold">เข้าร่วมเกม</h2>
              <p className="mt-1 text-pretty text-muted-foreground">
                หยิบมือถือของคุณขึ้นมา ใส่รหัสผ่าน เลือกกลุ่มของคุณ แล้วมองไปที่หน้าจอหลัก!
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-toxic">
                เข้าสู่เมือง →
              </span>
            </Link>
          </div>
        </section>

        <footer className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Users className="size-4" />
          เหมาะสำหรับ 4–30 คนในห้องเดียวกัน
        </footer>
      </div>
    </main>
  )
}
