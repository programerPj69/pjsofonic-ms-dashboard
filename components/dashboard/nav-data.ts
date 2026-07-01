import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Headset,
  MessagesSquare,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  icon: LucideIcon
  active?: boolean
  badge?: string
  children?: { label: string; badge?: string }[]
}

export const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', icon: LayoutDashboard, active: true }],
  },
  {
    title: 'Modules',
    items: [
      {
        label: 'HR & Payroll',
        icon: Users,
        children: [
          { label: 'Employee Directory' },
          { label: 'Attendance' },
          { label: 'Leave Requests', badge: '3' },
          { label: 'Payroll Processing' },
        ],
      },
      {
        label: 'Project Management',
        icon: FolderKanban,
        children: [
          { label: 'Task Board (Kanban)' },
          { label: 'Production Pipelines' },
          { label: 'QA Reports' },
        ],
      },
      {
        label: 'CRM Module',
        icon: Headset,
        children: [
          { label: 'Client Requirements' },
          { label: 'Complaint Tickets', badge: '7' },
          { label: 'Sales Funnel' },
        ],
      },
      {
        label: 'Collaboration',
        icon: MessagesSquare,
        children: [
          { label: 'Internal Chat' },
          { label: 'Meeting Scheduler' },
          { label: 'Announcements' },
        ],
      },
      {
        label: 'Reporting & Analytics',
        icon: BarChart3,
        children: [{ label: 'Custom Reports' }, { label: 'Financial Overviews' }],
      },
    ],
  },
]
