"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, UserRound, Lock, IdCard, ArrowRight, Eye, EyeOff } from "lucide-react"
import { BrandLogo } from "@/components/dashboard/brand-logo"
import { useAuth, type Role } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const { session, hydrated, login } = useAuth()
  const [portal, setPortal] = useState<Role>("admin")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (hydrated && session) {
      router.replace(session.role === "admin" ? "/admin" : "/employee")
    }
  }, [hydrated, session, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const res = login(userId, password)
    if (!res.ok) {
      setError(res.error ?? "Login failed.")
      return
    }
    if (res.role !== portal) {
      setError(
        `These credentials are for the ${res.role} portal. Switch tabs or use the correct ID.`,
      )
      return
    }
    router.replace(res.role === "admin" ? "/admin" : "/employee")
  }

  function switchPortal(next: Role) {
    setPortal(next)
    setError("")
    setUserId("")
    setPassword("")
  }

  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <BrandLogo />
        <div className="space-y-4">
          <h1 className="font-heading text-4xl font-bold leading-tight text-balance">
            Integrated Business Management System
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-primary-foreground/70">
            One command center for HR &amp; payroll, project delivery, CRM, meetings, and
            team collaboration — built for managers and their teams.
          </p>
          <ul className="mt-4 space-y-3 text-[14px] text-primary-foreground/80">
            <li className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-white/10">
                <ShieldCheck className="size-4 text-[var(--success)]" />
              </span>
              Admins manage projects, meetings &amp; payroll
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-white/10">
                <UserRound className="size-4 text-[var(--warning)]" />
              </span>
              Employees punch in/out &amp; submit their work
            </li>
          </ul>
        </div>
        <p className="text-[12px] text-primary-foreground/50">
          © 2026 PjSofonic MS. All rights reserved.
        </p>
      </div>

      {/* Right login panel */}
      <div className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandLogo variant="dark" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">
              Choose your portal and sign in to continue.
            </p>

            {/* Portal tabs */}
            <div
              role="tablist"
              aria-label="Select portal"
              className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1"
            >
              <PortalTab
                active={portal === "admin"}
                icon={<ShieldCheck className="size-4" />}
                label="Admin Portal"
                onClick={() => switchPortal("admin")}
              />
              <PortalTab
                active={portal === "employee"}
                icon={<UserRound className="size-4" />}
                label="Employee Portal"
                onClick={() => switchPortal("employee")}
              />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="userId"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  {portal === "admin" ? "Admin ID" : "Employee ID"}
                </label>
                <div className="relative">
                  <IdCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="userId"
                    inputMode="numeric"
                    autoComplete="username"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={portal === "admin" ? "e.g. 1111" : "e.g. 2222"}
                    className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-base text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-11 text-base text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                  <button
                    type="button"
                    aria-label={showPass ? "Hide password" : "Show password"}
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted"
                  >
                    {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-destructive/10 px-3 py-2 text-[13px] font-medium text-destructive"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 active:scale-[0.99]"
              >
                Sign in to {portal === "admin" ? "Admin" : "Employee"} Portal
                <ArrowRight className="size-4" />
              </button>
            </form>

            {/* Demo credentials helper */}
            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/50 p-3 text-[12px] text-muted-foreground">
              <p className="font-semibold text-foreground">Demo credentials</p>
              <p className="mt-1">
                Admin — ID <span className="font-mono text-foreground">1111</span> · Pass{" "}
                <span className="font-mono text-foreground">0000</span>
              </p>
              <p>
                Employee — ID <span className="font-mono text-foreground">2222</span> · Pass{" "}
                <span className="font-mono text-foreground">9999</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortalTab({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition",
        active
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  )
}
