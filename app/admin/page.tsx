"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarClock,
  Fingerprint,
} from "lucide-react"
import { PortalShell, type PortalTab } from "@/components/portal/portal-shell"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { TaskOverview } from "@/components/dashboard/task-overview"
import { ChatWidget } from "@/components/dashboard/chat-widget"
import { EmployeesManager } from "@/components/admin/employees-manager"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { MeetingsManager } from "@/components/admin/meetings-manager"
import { AttendanceView } from "@/components/admin/attendance-view"

const TABS: PortalTab[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="size-4" /> },
  { id: "employees", label: "Employees", icon: <Users className="size-4" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="size-4" /> },
  { id: "meetings", label: "Meetings", icon: <CalendarClock className="size-4" /> },
  { id: "attendance", label: "Attendance", icon: <Fingerprint className="size-4" /> },
]

export default function AdminPage() {
  const [tab, setTab] = useState("overview")

  return (
    <PortalShell
      role="admin"
      title="Good Morning, Admin!"
      subtitle="Manage employees, projects, meetings, and attendance from one place."
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
    >
      {tab === "overview" && (
        <div className="space-y-6">
          <KpiCards />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <PerformanceChart />
            </div>
            <div className="xl:col-span-1">
              <ChatWidget />
            </div>
          </div>
          <TaskOverview />
        </div>
      )}
      {tab === "employees" && <EmployeesManager />}
      {tab === "projects" && <ProjectsManager />}
      {tab === "meetings" && <MeetingsManager />}
      {tab === "attendance" && <AttendanceView />}
    </PortalShell>
  )
}
