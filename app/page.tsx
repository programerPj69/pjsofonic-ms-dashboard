'use client'

import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/top-bar'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { TaskOverview } from '@/components/dashboard/task-overview'
import { ChatWidget } from '@/components/dashboard/chat-widget'

export default function DashboardPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-svh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-xl">
            <Sidebar onClose={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />

        <main className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
          {/* Welcome header */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Good Morning, Sarah Khan!
              </h1>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Here&apos;s your business overview for today.
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[13px] font-medium text-muted-foreground shadow-sm">
              <CalendarDays className="size-4 text-brand" />
              Monday, July 1
            </span>
          </div>

          {/* KPI cards */}
          <div className="mt-6">
            <KpiCards />
          </div>

          {/* Productivity + Chat */}
          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <PerformanceChart />
            </div>
            <div className="xl:col-span-1">
              <ChatWidget />
            </div>
          </div>

          {/* Task overview */}
          <div className="mt-6">
            <TaskOverview />
          </div>
        </main>
      </div>
    </div>
  )
}
