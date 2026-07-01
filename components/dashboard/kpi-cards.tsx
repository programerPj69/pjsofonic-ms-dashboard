import {
  Rocket,
  UserCheck,
  TicketX,
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Kpi = {
  title: string
  value: string
  unit?: string
  icon: LucideIcon
  accent: string // hex
  tint: string // bg tint class value
  progress?: number
  breakdown: { label: string; value: string; dot?: string }[]
  trend?: { dir: 'up' | 'down'; value: string; good: boolean }
  footnote?: string
}

const kpis: Kpi[] = [
  {
    title: 'Active Projects',
    value: '14',
    icon: Rocket,
    accent: '#2d6cdf',
    tint: 'rgba(45,108,223,0.1)',
    progress: 79,
    breakdown: [
      { label: 'On Track', value: '11', dot: '#2d6cdf' },
      { label: 'Overdue', value: '3', dot: '#e74c3c' },
    ],
  },
  {
    title: 'Employee Attendance',
    value: '82',
    unit: '/ 85',
    icon: UserCheck,
    accent: '#00bfa6',
    tint: 'rgba(0,191,166,0.12)',
    progress: 96,
    breakdown: [
      { label: 'Present', value: '80', dot: '#00bfa6' },
      { label: 'Remote', value: '2', dot: '#2d6cdf' },
      { label: 'On Leave', value: '3', dot: '#94a3b8' },
    ],
  },
  {
    title: 'Pending Complaints',
    value: '7',
    icon: TicketX,
    accent: '#e74c3c',
    tint: 'rgba(231,76,60,0.1)',
    breakdown: [
      { label: 'High Priority', value: '2', dot: '#e74c3c' },
      { label: 'Medium', value: '5', dot: '#f1c40f' },
    ],
    trend: { dir: 'down', value: '12%', good: true },
  },
  {
    title: 'Upcoming Meetings',
    value: '5',
    icon: CalendarClock,
    accent: '#f1c40f',
    tint: 'rgba(241,196,15,0.16)',
    breakdown: [{ label: 'Today', value: '5', dot: '#f1c40f' }],
    footnote: 'Next: Project Alpha Sync @ 2:00 PM',
  },
]

function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">
            {kpi.title}
          </p>
          <p className="mt-1 flex items-baseline gap-1 font-heading text-3xl font-bold text-foreground">
            {kpi.value}
            {kpi.unit && (
              <span className="text-base font-semibold text-muted-foreground">
                {kpi.unit}
              </span>
            )}
          </p>
        </div>
        <div
          className="flex size-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: kpi.tint, color: kpi.accent }}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>

      {typeof kpi.progress === 'number' && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{ width: `${kpi.progress}%`, backgroundColor: kpi.accent }}
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {kpi.breakdown.map((b) => (
          <span key={b.label} className="flex items-center gap-1.5 text-[12px]">
            {b.dot && (
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: b.dot }}
              />
            )}
            <span className="font-semibold text-foreground">{b.value}</span>
            <span className="text-muted-foreground">{b.label}</span>
          </span>
        ))}
      </div>

      {kpi.trend && (
        <div className="mt-3">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold',
              kpi.trend.good
                ? 'bg-success/12 text-success'
                : 'bg-destructive/10 text-destructive',
            )}
          >
            {kpi.trend.dir === 'up' ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {kpi.trend.value} vs last week
          </span>
        </div>
      )}

      {kpi.footnote && (
        <p className="mt-3 truncate rounded-md bg-muted px-2 py-1.5 text-[12px] font-medium text-foreground">
          {kpi.footnote}
        </p>
      )}
    </div>
  )
}

export function KpiCards() {
  return (
    <section
      aria-label="Key performance indicators"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} kpi={kpi} />
      ))}
    </section>
  )
}
