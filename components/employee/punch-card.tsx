"use client"

import { useEffect, useState } from "react"
import { LogIn, LogOut, Fingerprint } from "lucide-react"
import { useStore, formatTime, EMPLOYEE_ID } from "@/lib/store"

export function PunchCard() {
  const { punch, getTodayAttendance } = useStore()
  const [now, setNow] = useState<Date | null>(null)

  // Live clock (client only to avoid hydration mismatch)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const record = getTodayAttendance(EMPLOYEE_ID)
  const isIn = !!record?.punchIn && !record?.punchOut
  const done = !!record?.punchIn && !!record?.punchOut

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <Fingerprint className="size-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Attendance</h2>
          <p className="text-[13px] text-muted-foreground">Punch in when you start work.</p>
        </div>
      </div>

      {/* Live clock */}
      <div className="mt-5 rounded-xl bg-primary p-5 text-center text-primary-foreground">
        <p className="font-mono text-4xl font-bold tabular-nums">
          {now
            ? now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "--:--:--"}
        </p>
        <p className="mt-1 text-[13px] text-primary-foreground/70">
          {now
            ? now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : ""}
        </p>
      </div>

      {/* Status */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-background p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-[12px] text-muted-foreground">
            <LogIn className="size-3.5 text-[var(--success)]" /> Punch In
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-foreground">
            {formatTime(record?.punchIn)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-[12px] text-muted-foreground">
            <LogOut className="size-3.5 text-destructive" /> Punch Out
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-foreground">
            {formatTime(record?.punchOut)}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="mt-4">
        {done ? (
          <p className="rounded-xl bg-[var(--success)]/15 px-4 py-3 text-center text-[14px] font-semibold text-[var(--success)]">
            You&apos;re done for today. See you tomorrow!
          </p>
        ) : !isIn ? (
          <button
            type="button"
            onClick={() => punch(EMPLOYEE_ID, "in")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--success)] text-[15px] font-semibold text-white transition hover:opacity-90 active:scale-[0.99]"
          >
            <LogIn className="size-5" />
            Punch In
          </button>
        ) : (
          <button
            type="button"
            onClick={() => punch(EMPLOYEE_ID, "out")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-destructive text-[15px] font-semibold text-white transition hover:opacity-90 active:scale-[0.99]"
          >
            <LogOut className="size-5" />
            Punch Out
          </button>
        )}
      </div>
    </div>
  )
}
