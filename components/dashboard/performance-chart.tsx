'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const data = [
  { week: 'W1', deptA: 62, deptB: 55, goal: 60 },
  { week: 'W2', deptA: 68, deptB: 61, goal: 65 },
  { week: 'W3', deptA: 65, deptB: 70, goal: 70 },
  { week: 'W4', deptA: 74, deptB: 72, goal: 75 },
  { week: 'W5', deptA: 82, deptB: 76, goal: 80 },
  { week: 'W6', deptA: 79, deptB: 84, goal: 82 },
  { week: 'W7', deptA: 88, deptB: 81, goal: 85 },
  { week: 'W8', deptA: 94, deptB: 89, goal: 88 },
]

const series = [
  { key: 'deptA', label: 'Department A', color: '#2d6cdf' },
  { key: 'deptB', label: 'Department B', color: '#00bfa6' },
  { key: 'goal', label: 'Target Goal', color: '#94a3b8', dashed: true },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md">
      <p className="mb-1 text-[12px] font-semibold text-foreground">
        {label} · Productivity
      </p>
      {payload.map((p: any) => (
        <div
          key={p.dataKey}
          className="flex items-center justify-between gap-4 text-[12px]"
        >
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            {series.find((s) => s.key === p.dataKey)?.label}
          </span>
          <span className="font-semibold text-foreground">{p.value}%</span>
        </div>
      ))}
    </div>
  )
}

export function PerformanceChart() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-base font-bold text-foreground">
            Quarterly Productivity vs. Goals
          </h2>
          <p className="text-[13px] text-muted-foreground">
            Department performance over the last 8 weeks
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
            <span
              key={s.key}
              className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground"
            >
              <span
                className="inline-block h-0.5 w-4 rounded-full"
                style={{
                  backgroundColor: s.color,
                  ...(s.dashed
                    ? { backgroundImage: 'none', opacity: 0.9 }
                    : {}),
                }}
              />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ec" vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#5b7085', fontSize: 12 }}
            />
            <YAxis
              domain={[40, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#5b7085', fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="goal"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="deptA"
              stroke="#2d6cdf"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#2d6cdf', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="deptB"
              stroke="#00bfa6"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#00bfa6', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
