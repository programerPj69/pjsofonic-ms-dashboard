"use client"

import { LogIn, LogOut, CircleDot } from "lucide-react"
import { useStore, formatTime } from "@/lib/store"

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function durationBetween(inIso?: string, outIso?: string) {
  if (!inIso) return "—"
  const end = outIso ? new Date(outIso) : new Date()
  const ms = end.getTime() - new Date(inIso).getTime()
  if (ms < 0) return "—"
  const mins = Math.floor(ms / 60000)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}h ${m}m${outIso ? "" : " (ongoing)"}`
}

export function AttendanceView() {
  const { data } = useStore()
  const today = todayKey()

  // Build a per-employee view for today, plus recent history
  const todayRecords = data.employees.map((emp) => {
    const rec = data.attendance.find((a) => a.employeeId === emp.id && a.date === today)
    return { emp, rec }
  })

  const history = [...data.attendance]
    .filter((a) => a.date !== today)
    .sort((a, b) => b.date.localeCompare(a.date))

  function empName(id: string) {
    return data.employees.find((e) => e.id === id)?.name ?? id
  }

  return (
    <div className="space-y-6">
      {/* Today */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Today&apos;s Attendance
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Live punch in / punch out status for {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-[12px] uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 font-semibold">Employee</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Punch In</th>
                <th className="pb-3 font-semibold">Punch Out</th>
                <th className="pb-3 font-semibold">Worked</th>
              </tr>
            </thead>
            <tbody>
              {todayRecords.map(({ emp, rec }) => {
                const isIn = rec?.punchIn && !rec?.punchOut
                const done = rec?.punchIn && rec?.punchOut
                return (
                  <tr key={emp.id} className="border-b border-border/60 text-[14px]">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-primary text-[12px] font-bold text-primary-foreground">
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <p className="font-medium text-foreground">{emp.name}</p>
                          <p className="text-[12px] text-muted-foreground">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      {isIn ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--success)]/15 px-2.5 py-1 text-[12px] font-semibold text-[var(--success)]">
                          <CircleDot className="size-3.5 animate-pulse" />
                          Working
                        </span>
                      ) : done ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[12px] font-semibold text-muted-foreground">
                          Clocked out
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[12px] font-semibold text-muted-foreground">
                          Not in yet
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-foreground">
                      {formatTime(rec?.punchIn)}
                    </td>
                    <td className="py-3 font-mono text-foreground">
                      {formatTime(rec?.punchOut)}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {durationBetween(rec?.punchIn, rec?.punchOut)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-foreground">Attendance History</h2>
        {history.length === 0 ? (
          <p className="mt-4 rounded-lg bg-muted px-4 py-6 text-center text-[13px] text-muted-foreground">
            No past attendance records yet. Records appear here after employees punch in on
            previous days.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {history.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 text-[13px]"
              >
                <span className="font-medium text-foreground">{empName(a.employeeId)}</span>
                <span className="text-muted-foreground">{a.date}</span>
                <span className="flex items-center gap-1 text-foreground">
                  <LogIn className="size-3.5 text-[var(--success)]" />
                  {formatTime(a.punchIn)}
                </span>
                <span className="flex items-center gap-1 text-foreground">
                  <LogOut className="size-3.5 text-destructive" />
                  {formatTime(a.punchOut)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
