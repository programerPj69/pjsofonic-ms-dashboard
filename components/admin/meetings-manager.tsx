"use client"

import { useState } from "react"
import { CalendarPlus, Trash2, Clock, Users } from "lucide-react"
import { useStore } from "@/lib/store"

export function MeetingsManager() {
  const { data, addMeeting, removeMeeting } = useStore()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [attendee, setAttendee] = useState("all")
  const [note, setNote] = useState("")

  function attendeeLabel(id: string) {
    if (id === "all") return "All Employees"
    return data.employees.find((e) => e.id === id)?.name ?? "Unknown"
  }

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date || !time) return
    addMeeting({ title, date, time, attendee, note })
    setTitle("")
    setDate("")
    setTime("")
    setNote("")
    setAttendee("all")
  }

  const sorted = [...data.meetings].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  )

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">Schedule a Meeting</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Set up a meeting for the whole team or a specific employee.
          </p>
          <form onSubmit={handleSchedule} className="mt-4 space-y-3">
            <Field label="Meeting Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sprint Planning"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  required
                />
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  required
                />
              </Field>
            </div>
            <Field label="Attendees">
              <select
                value={attendee}
                onChange={(e) => setAttendee(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="all">All Employees</option>
                {data.employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Note (optional)">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Agenda / details"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[14px] font-semibold text-primary-foreground transition hover:opacity-95"
            >
              <CalendarPlus className="size-4" />
              Schedule Meeting
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Scheduled Meetings ({sorted.length})
          </h2>
          <div className="mt-4 space-y-3">
            {sorted.length === 0 && (
              <p className="rounded-lg bg-muted px-4 py-6 text-center text-[13px] text-muted-foreground">
                No meetings scheduled.
              </p>
            )}
            {sorted.map((m) => (
              <div
                key={m.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-4"
              >
                <div className="flex gap-3">
                  <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-[var(--warning)]/20 text-center">
                    <span className="text-[11px] font-bold uppercase leading-none text-[color:var(--warning-foreground)]">
                      {new Date(m.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-[16px] font-bold leading-tight text-foreground">
                      {new Date(m.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-foreground">
                      {m.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {m.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        {attendeeLabel(m.attendee)}
                      </span>
                    </div>
                    {m.note && (
                      <p className="mt-1 text-[13px] text-muted-foreground">{m.note}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeMeeting(m.id)}
                  aria-label={`Delete ${m.title}`}
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-medium text-foreground">{label}</label>
      {children}
    </div>
  )
}
