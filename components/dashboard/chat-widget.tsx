'use client'

import { Search, Send } from 'lucide-react'

type Message = {
  name: string
  initials: string
  color: string
  text: string
  time: string
  online?: boolean
}

const messages: Message[] = [
  {
    name: 'Ravi Menon',
    initials: 'RM',
    color: '#2d6cdf',
    text: 'Meeting moved to 3 PM — please update calendars.',
    time: '2m',
    online: true,
  },
  {
    name: 'QA Team',
    initials: 'QA',
    color: '#00bfa6',
    text: 'QA passed on v1.2 ✅ ready for staging.',
    time: '11m',
    online: true,
  },
  {
    name: 'Aisha Malik',
    initials: 'AM',
    color: '#e74c3c',
    text: 'Ticket #C77 escalated — need a dev on this.',
    time: '24m',
  },
  {
    name: 'Dev Team',
    initials: 'DT',
    color: '#f1c40f',
    text: 'Feature Y branch merged into develop.',
    time: '1h',
  },
]

export function ChatWidget() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-foreground">
            Recent Activity
          </h2>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
            <span className="size-2 rounded-full bg-success" />
            Live
          </span>
        </div>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search chat"
            placeholder="Search messages..."
            className="h-9 w-full rounded-lg border border-border bg-background pl-8 pr-3 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto p-2">
        {messages.map((m, i) => (
          <li key={i}>
            <button
              type="button"
              className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-muted"
            >
              <span className="relative shrink-0">
                <span
                  className="flex size-9 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{ backgroundColor: m.color }}
                >
                  {m.initials}
                </span>
                {m.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success ring-2 ring-card" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-foreground">
                    {m.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {m.time}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">
                  {m.text}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5">
          <input
            type="text"
            aria-label="Quick message"
            placeholder="Send a quick message..."
            className="h-8 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg bg-success text-white hover:bg-success/90"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
