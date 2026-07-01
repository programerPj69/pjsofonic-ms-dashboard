"use client"

import { useState } from "react"
import { LayoutDashboard, FolderKanban, CalendarClock, Wallet } from "lucide-react"
import { PortalShell, type PortalTab } from "@/components/portal/portal-shell"
import { PunchCard } from "@/components/employee/punch-card"
import { PayCard } from "@/components/employee/pay-card"
import { MyProjects } from "@/components/employee/my-projects"
import { MyMeetings } from "@/components/employee/my-meetings"
import { useStore, EMPLOYEE_ID } from "@/lib/store"

const TABS: PortalTab[] = [
  { id: "overview", label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
  { id: "projects", label: "My Projects", icon: <FolderKanban className="size-4" /> },
  { id: "meetings", label: "Meetings", icon: <CalendarClock className="size-4" /> },
  { id: "pay", label: "My Pay", icon: <Wallet className="size-4" /> },
]

export default function EmployeePage() {
  const [tab, setTab] = useState("overview")
  const { data } = useStore()
  const me = data.employees.find((e) => e.id === EMPLOYEE_ID)
  const firstName = me?.name.split(" ")[0] ?? "there"

  return (
    <PortalShell
      role="employee"
      title={`Welcome, ${firstName}!`}
      subtitle="Track your attendance, projects, meetings, and pay."
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
    >
      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <PunchCard />
          <MyMeetings />
        </div>
      )}
      {tab === "projects" && <MyProjects />}
      {tab === "meetings" && <MyMeetings />}
      {tab === "pay" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <PayCard />
          <PunchCard />
        </div>
      )}
    </PortalShell>
  )
}
