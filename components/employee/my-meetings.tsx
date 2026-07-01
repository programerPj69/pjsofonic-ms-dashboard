"use client"

import { CalendarClock, Clock, Users } from "lucide-react"
import { useStore, EMPLOYEE_ID } from "@/lib/store"

export function MyMeetings() {
  const { data } = useStore()
  const mine = [...data.meetings]
    .filter((m) => m.attendee === "all" || m.attendee === EMPLOYEE_ID)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))

  const next = mine[0]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-[var(--warning)]/20 text-[color:var(--warning-foreground)]">
          <CalendarClock className="size-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">My Meetings</h2>
          <p className="text-[13px] text-muted-foreground">
            Meetings scheduled for you by the admin.
          </p>
        </div>
      </div>

      {next && (
        <div className="mt-4 rounded-xl bg-primary p-4 text-primary-foreground">
          <p className="text-[12px] uppercase tracking-wide text-primary-foreground/70">
            Next up
          </p>
          <p className="mt-1 font-heading text-[16px] font-bold">{next.title}</p>
          <p className="mt-1 text-[13px] text-primary-foreground/80">
            {new Date(next.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            at {next.time}
          </p>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {mine.length === 0 && (
          <p className="rounded-lg bg-muted px-4 py-6 text-center text-[13px] text-muted-foreground">
            No meetings scheduled for you.
          </p>
        )}
        {mine.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
          >
            <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-muted text-center">
              <span className="text-[11px] font-bold uppercase leading-none text-muted-foreground">
                {new Date(m.date).toLocaleDateString("en-US", { month: "short" })}
              </span>
              <span className="text-[16px] font-bold leading-tight text-foreground">
                {new Date(m.date).getDate()}
              </span>
            </div>
            <div>
              <h3 className="font-heading text-[15px] font-bold text-foreground">{m.title}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {m.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {m.attendee === "all" ? "All Employees" : "You"}
                </span>
              </div>
              {m.note && <p className="mt-1 text-[13px] text-muted-foreground">{m.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
