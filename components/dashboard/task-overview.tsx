import { Plus, GripVertical } from 'lucide-react'

type Task = {
  id: string
  title: string
  tag: string
  tagColor: string
  assignees: string[]
}

const columns: {
  key: string
  title: string
  count: number
  color: string
  tasks: Task[]
}[] = [
  {
    key: 'todo',
    title: 'To-Do',
    count: 3,
    color: '#94a3b8',
    tasks: [
      {
        id: '#451',
        title: 'QA Checklist for release',
        tag: 'QA',
        tagColor: '#2d6cdf',
        assignees: ['AM', 'RK'],
      },
      {
        id: '#452',
        title: 'Client Requirement #101',
        tag: 'CRM',
        tagColor: '#00bfa6',
        assignees: ['SK'],
      },
    ],
  },
  {
    key: 'inprogress',
    title: 'In-Progress',
    count: 5,
    color: '#f1c40f',
    tasks: [
      {
        id: '#449',
        title: 'Develop Feature Y',
        tag: 'Dev',
        tagColor: '#2d6cdf',
        assignees: ['JD', 'MP'],
      },
      {
        id: '#450',
        title: 'Resolve Ticket #C77',
        tag: 'Support',
        tagColor: '#e74c3c',
        assignees: ['RK'],
      },
    ],
  },
  {
    key: 'done',
    title: 'Done',
    count: 12,
    color: '#00bfa6',
    tasks: [
      {
        id: '#448',
        title: 'Deploy v2.1 to production',
        tag: 'DevOps',
        tagColor: '#00bfa6',
        assignees: ['MP'],
      },
    ],
  },
]

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: `${task.tagColor}1a`,
            color: task.tagColor,
          }}
        >
          {task.tag}
        </span>
        <GripVertical className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-2 text-[13px] font-medium leading-snug text-foreground">
        {task.title}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">
          {task.id}
        </span>
        <div className="flex -space-x-1.5">
          {task.assignees.map((a) => (
            <span
              key={a}
              className="flex size-6 items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-secondary-foreground ring-2 ring-card"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TaskOverview() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-base font-bold text-foreground">
            Task Overview
          </h2>
          <p className="text-[13px] text-muted-foreground">
            Kanban board preview
          </p>
        </div>
        <button
          type="button"
          className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New
        </button>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.key} className="flex flex-col rounded-xl bg-muted/60 p-2.5">
            <div className="mb-2 flex items-center gap-2 px-1">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: col.color }}
              />
              <h3 className="text-[13px] font-semibold text-foreground">
                {col.title}
              </h3>
              <span className="ml-auto rounded-full bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {col.count}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {col.tasks.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
