"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { BrandLogo } from "@/components/dashboard/brand-logo"
import { useAuth, type Role } from "@/lib/auth"

export interface PortalTab {
  id: string
  label: string
  icon: ReactNode
}

export function PortalShell({
  role,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  headerRight,
  children,
}: {
  role: Role
  title: string
  subtitle: string
  tabs: PortalTab[]
  activeTab: string
  onTabChange: (id: string) => void
  headerRight?: ReactNode
  children: ReactNode
}) {
  const router = useRouter()
  const { session, hydrated, logout } = useAuth()

  // Route guard
  useEffect(() => {
    if (!hydrated) return
    if (!session) {
      router.replace("/")
    } else if (session.role !== role) {
      router.replace(session.role === "admin" ? "/admin" : "/employee")
    }
  }, [hydrated, session, role, router])

  if (!hydrated || !session || session.role !== role) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="size-4 animate-spin rounded-full border-2 border-border border-t-brand" />
          Loading portal…
        </div>
      </div>
    )
  }

  function handleLogout() {
    logout()
    router.replace("/")
  }

  return (
    <div className="min-h-svh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-sidebar-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/80 sm:inline">
              {role} Portal
            </span>
          </div>
          <div className="flex items-center gap-2">
            {headerRight}
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-lg bg-white/10 px-3 text-[13px] font-semibold text-primary-foreground transition hover:bg-white/20"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        {/* Title */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground text-balance">
              {title}
            </h1>
            <p className="mt-1 text-[14px] text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <nav
          className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 shadow-sm"
          aria-label="Portal sections"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onTabChange(tab.id)}
                className={
                  "flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-[13px] font-semibold transition " +
                  (active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground")
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-6">{children}</div>
      </main>
    </div>
  )
}
