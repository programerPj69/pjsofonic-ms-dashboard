'use client'

import { useState } from 'react'
import {
  Menu,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  UserCircle,
} from 'lucide-react'

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search modules, employees, projects..."
          aria-label="Universal search"
          className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-16 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:flex">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-muted"
          >
            <span className="relative">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                SK
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-card"
                title="Online"
              />
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[13px] font-semibold text-foreground">
                Sarah Khan
              </span>
              <span className="block text-[11px] text-muted-foreground">
                Operations Manager
              </span>
            </span>
            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 cursor-default"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 top-12 z-20 w-52 overflow-hidden rounded-xl border border-border bg-popover py-1.5 shadow-lg"
              >
                <div className="border-b border-border px-3 py-2">
                  <p className="text-[13px] font-semibold text-foreground">
                    Sarah Khan
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    sarah.khan@pjsofonic.com
                  </p>
                </div>
                {[
                  { label: 'My Profile', icon: UserCircle },
                  { label: 'Settings', icon: Settings },
                  { label: 'Notifications', icon: Bell },
                ].map((it) => (
                  <button
                    key={it.label}
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted"
                  >
                    <it.icon className="size-4 text-muted-foreground" />
                    {it.label}
                  </button>
                ))}
                <div className="my-1 border-t border-border" />
                <button
                  role="menuitem"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
