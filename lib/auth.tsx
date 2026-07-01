"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Role = "admin" | "employee"

interface Session {
  role: Role
}

interface Credential {
  role: Role
  userId: string
  password: string
}

// Fixed demo credentials (as requested)
const CREDENTIALS: Credential[] = [
  { role: "admin", userId: "1111", password: "0000" },
  { role: "employee", userId: "2222", password: "9999" },
]

const SESSION_KEY = "pjsofonic-session-v1"

interface AuthContextValue {
  session: Session | null
  hydrated: boolean
  login: (userId: string, password: string) => { ok: boolean; role?: Role; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) setSession(JSON.parse(raw))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  const login = useCallback((userId: string, password: string) => {
    const match = CREDENTIALS.find(
      (c) => c.userId === userId.trim() && c.password === password.trim(),
    )
    if (!match) {
      return { ok: false, error: "Invalid ID or password. Please try again." }
    }
    const next: Session = { role: match.role }
    setSession(next)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    return { ok: true, role: match.role }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
