'use client'

import { useState } from 'react'
import { ChevronDown, X, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandLogo } from './brand-logo'
import { navGroups, type NavItem } from './nav-data'

function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const Icon = item.icon
  const hasChildren = !!item.children?.length

  return (
    <li>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        aria-expanded={hasChildren ? open : undefined}
        className={cn(
          'flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
          item.active
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-black/20'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        )}
      >
        <Icon className="size-[18px] shrink-0" aria-hidden="true" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              'size-4 shrink-0 transition-transform',
              open && 'rotate-180',
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {hasChildren && open && (
        <ul className="mt-1 space-y-0.5 pl-11 pr-1">
          {item.children!.map((child) => (
            <li key={child.label}>
              <a
                href="#"
                className="flex min-h-9 items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span>{child.label}</span>
                {child.badge && (
                  <span className="rounded-full bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-semibold text-[#00bfa6]">
                    {child.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-5">
        <BrandLogo />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <a
          href="#"
          className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LifeBuoy className="size-[18px]" aria-hidden="true" />
          Help &amp; Support
        </a>
      </div>
    </div>
  )
}
