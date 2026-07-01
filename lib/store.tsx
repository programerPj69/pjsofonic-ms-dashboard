"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

/* ---------------- Types ---------------- */

export type ProjectStatus = "assigned" | "in-progress" | "submitted" | "approved"

export interface Project {
  id: string
  title: string
  description: string
  assignedTo: string // employee id
  dueDate: string
  status: ProjectStatus
  submissionLink?: string
  submissionNote?: string
  submittedAt?: string
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  attendee: string // employee id or "all"
  note?: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string // YYYY-MM-DD
  punchIn?: string // ISO time
  punchOut?: string // ISO time
}

export interface Employee {
  id: string
  name: string
  role: string
  email: string
  phone: string
  department: string
  monthlyPay: number
  status: "active" | "on-leave"
}

export interface StoreData {
  employees: Employee[]
  projects: Project[]
  meetings: Meeting[]
  attendance: AttendanceRecord[]
}

/* ---------------- Constants ---------------- */

// The single demo employee that logs in with 2222 / 9999
export const EMPLOYEE_ID = "EMP-2222"

const STORAGE_KEY = "pjsofonic-data-v1"

const seedData: StoreData = {
  employees: [
    {
      id: EMPLOYEE_ID,
      name: "Ravi Kumar",
      role: "Software Engineer",
      email: "ravi.kumar@pjsofonic.com",
      phone: "+91 98765 43210",
      department: "Engineering",
      monthlyPay: 65000,
      status: "active",
    },
    {
      id: "EMP-1002",
      name: "Aisha Sheikh",
      role: "QA Analyst",
      email: "aisha.sheikh@pjsofonic.com",
      phone: "+91 91234 56780",
      department: "Quality Assurance",
      monthlyPay: 48000,
      status: "active",
    },
    {
      id: "EMP-1003",
      name: "Mohit Verma",
      role: "UI/UX Designer",
      email: "mohit.verma@pjsofonic.com",
      phone: "+91 99887 76655",
      department: "Design",
      monthlyPay: 52000,
      status: "on-leave",
    },
  ],
  projects: [
    {
      id: "PRJ-101",
      title: "Client Portal Revamp",
      description: "Rebuild the client-facing portal with the new design system.",
      assignedTo: EMPLOYEE_ID,
      dueDate: "2026-07-20",
      status: "in-progress",
    },
    {
      id: "PRJ-102",
      title: "QA Automation Suite",
      description: "Set up automated regression tests for v2.1 release.",
      assignedTo: "EMP-1002",
      dueDate: "2026-07-15",
      status: "assigned",
    },
  ],
  meetings: [
    {
      id: "MTG-1",
      title: "Project Alpha Sync",
      date: "2026-07-02",
      time: "14:00",
      attendee: "all",
      note: "Weekly progress review.",
    },
    {
      id: "MTG-2",
      title: "Code Review - Client Portal",
      date: "2026-07-03",
      time: "11:30",
      attendee: EMPLOYEE_ID,
      note: "Review PR #245.",
    },
  ],
  attendance: [],
}

/* ---------------- Context ---------------- */

interface StoreContextValue {
  data: StoreData
  // employees
  updateEmployee: (id: string, patch: Partial<Employee>) => void
  addEmployee: (emp: Omit<Employee, "id">) => void
  // projects
  addProject: (project: Omit<Project, "id" | "status">) => void
  updateProject: (id: string, patch: Partial<Project>) => void
  submitProject: (id: string, submission: { link: string; note: string }) => void
  // meetings
  addMeeting: (meeting: Omit<Meeting, "id">) => void
  removeMeeting: (id: string) => void
  // attendance
  punch: (employeeId: string, type: "in" | "out") => void
  getTodayAttendance: (employeeId: string) => AttendanceRecord | undefined
  reset: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(seedData)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setData(JSON.parse(raw))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  // Persist + broadcast to other tabs/routes
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* ignore */
    }
  }, [data, hydrated])

  // Sync across routes/tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue))
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    setData((d) => ({
      ...d,
      employees: d.employees.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const addEmployee = useCallback((emp: Omit<Employee, "id">) => {
    setData((d) => ({ ...d, employees: [...d.employees, { ...emp, id: uid("EMP") }] }))
  }, [])

  const addProject = useCallback((project: Omit<Project, "id" | "status">) => {
    setData((d) => ({
      ...d,
      projects: [...d.projects, { ...project, id: uid("PRJ"), status: "assigned" }],
    }))
  }, [])

  const updateProject = useCallback((id: string, patch: Partial<Project>) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const submitProject = useCallback(
    (id: string, submission: { link: string; note: string }) => {
      setData((d) => ({
        ...d,
        projects: d.projects.map((p) =>
          p.id === id
            ? {
                ...p,
                status: "submitted",
                submissionLink: submission.link,
                submissionNote: submission.note,
                submittedAt: new Date().toISOString(),
              }
            : p,
        ),
      }))
    },
    [],
  )

  const addMeeting = useCallback((meeting: Omit<Meeting, "id">) => {
    setData((d) => ({ ...d, meetings: [...d.meetings, { ...meeting, id: uid("MTG") }] }))
  }, [])

  const removeMeeting = useCallback((id: string) => {
    setData((d) => ({ ...d, meetings: d.meetings.filter((m) => m.id !== id) }))
  }, [])

  const punch = useCallback((employeeId: string, type: "in" | "out") => {
    const date = todayKey()
    const now = new Date().toISOString()
    setData((d) => {
      const existing = d.attendance.find(
        (a) => a.employeeId === employeeId && a.date === date,
      )
      if (existing) {
        return {
          ...d,
          attendance: d.attendance.map((a) =>
            a.id === existing.id
              ? { ...a, [type === "in" ? "punchIn" : "punchOut"]: now }
              : a,
          ),
        }
      }
      return {
        ...d,
        attendance: [
          ...d.attendance,
          {
            id: uid("ATT"),
            employeeId,
            date,
            [type === "in" ? "punchIn" : "punchOut"]: now,
          } as AttendanceRecord,
        ],
      }
    })
  }, [])

  const getTodayAttendance = useCallback(
    (employeeId: string) =>
      data.attendance.find((a) => a.employeeId === employeeId && a.date === todayKey()),
    [data.attendance],
  )

  const reset = useCallback(() => setData(seedData), [])

  return (
    <StoreContext.Provider
      value={{
        data,
        updateEmployee,
        addEmployee,
        addProject,
        updateProject,
        submitProject,
        addMeeting,
        removeMeeting,
        punch,
        getTodayAttendance,
        reset,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}

/* ---------------- Helpers ---------------- */

export function formatTime(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}
