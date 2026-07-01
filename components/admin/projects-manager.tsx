"use client"

import { useState } from "react"
import { Plus, ExternalLink, CheckCircle2, Clock, FileText } from "lucide-react"
import { useStore, type ProjectStatus } from "@/lib/store"

const STATUS_STYLES: Record<ProjectStatus, string> = {
  assigned: "bg-muted text-muted-foreground",
  "in-progress": "bg-[var(--info)]/15 text-[var(--info)]",
  submitted: "bg-[var(--warning)]/20 text-[color:var(--warning-foreground)]",
  approved: "bg-[var(--success)]/15 text-[var(--success)]",
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  assigned: "Assigned",
  "in-progress": "In Progress",
  submitted: "Submitted",
  approved: "Approved",
}

export function ProjectsManager() {
  const { data, addProject, updateProject } = useStore()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState(data.employees[0]?.id ?? "")
  const [dueDate, setDueDate] = useState("")

  function employeeName(id: string) {
    return data.employees.find((e) => e.id === id)?.name ?? "Unassigned"
  }

  function handleAssign(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !assignedTo || !dueDate) return
    addProject({ title, description, assignedTo, dueDate })
    setTitle("")
    setDescription("")
    setDueDate("")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Assign form */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">Assign a Project</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Create a task and assign it to an employee.
          </p>
          <form onSubmit={handleAssign} className="mt-4 space-y-3">
            <Field label="Project Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Payment Gateway Integration"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                required
              />
            </Field>
            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short brief of the task"
                rows={3}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>
            <Field label="Assign To">
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                {data.employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Due Date">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                required
              />
            </Field>
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[14px] font-semibold text-primary-foreground transition hover:opacity-95"
            >
              <Plus className="size-4" />
              Assign Project
            </button>
          </form>
        </div>
      </div>

      {/* Project list */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">
            All Projects ({data.projects.length})
          </h2>
          <div className="mt-4 space-y-3">
            {data.projects.length === 0 && (
              <p className="rounded-lg bg-muted px-4 py-6 text-center text-[13px] text-muted-foreground">
                No projects yet. Assign one to get started.
              </p>
            )}
            {data.projects.map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-background p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[11px] text-muted-foreground">{p.id}</p>
                    <h3 className="font-heading text-[15px] font-bold text-foreground">
                      {p.title}
                    </h3>
                  </div>
                  <span
                    className={
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                      STATUS_STYLES[p.status]
                    }
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                {p.description && (
                  <p className="mt-2 text-[13px] text-muted-foreground">{p.description}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {employeeName(p.assignedTo)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    Due {p.dueDate}
                  </span>
                </div>

                {/* Submission */}
                {p.status === "submitted" || p.status === "approved" ? (
                  <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/50 p-3">
                    <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
                      <FileText className="size-3.5" />
                      Submission
                    </p>
                    {p.submissionNote && (
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        {p.submissionNote}
                      </p>
                    )}
                    {p.submissionLink && (
                      <a
                        href={p.submissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:underline"
                      >
                        View submission <ExternalLink className="size-3.5" />
                      </a>
                    )}
                    {p.status === "submitted" && (
                      <button
                        type="button"
                        onClick={() => updateProject(p.id, { status: "approved" })}
                        className="mt-3 flex h-9 items-center gap-1.5 rounded-lg bg-[var(--success)] px-3 text-[13px] font-semibold text-white transition hover:opacity-90"
                      >
                        <CheckCircle2 className="size-4" />
                        Approve
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-medium text-foreground">{label}</label>
      {children}
    </div>
  )
}
