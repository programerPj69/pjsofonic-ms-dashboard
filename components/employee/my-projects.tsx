"use client"

import { useState } from "react"
import { Upload, Clock, CheckCircle2, ExternalLink, Play } from "lucide-react"
import { useStore, EMPLOYEE_ID, type Project, type ProjectStatus } from "@/lib/store"

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

export function MyProjects() {
  const { data } = useStore()
  const mine = data.projects.filter((p) => p.assignedTo === EMPLOYEE_ID)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-heading text-lg font-bold text-foreground">My Projects</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Projects assigned to you. Submit your work when ready.
      </p>

      <div className="mt-5 space-y-4">
        {mine.length === 0 && (
          <p className="rounded-lg bg-muted px-4 py-6 text-center text-[13px] text-muted-foreground">
            No projects assigned to you yet.
          </p>
        )}
        {mine.map((p) => (
          <ProjectItem key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}

function ProjectItem({ project: p }: { project: Project }) {
  const { updateProject, submitProject } = useStore()
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState("")
  const [note, setNote] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submitProject(p.id, { link, note })
    setOpen(false)
    setLink("")
    setNote("")
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] text-muted-foreground">{p.id}</p>
          <h3 className="font-heading text-[15px] font-bold text-foreground">{p.title}</h3>
        </div>
        <span
          className={"rounded-full px-2.5 py-1 text-[11px] font-semibold " + STATUS_STYLES[p.status]}
        >
          {STATUS_LABEL[p.status]}
        </span>
      </div>
      {p.description && (
        <p className="mt-2 text-[13px] text-muted-foreground">{p.description}</p>
      )}
      <p className="mt-2 flex items-center gap-1 text-[12px] text-muted-foreground">
        <Clock className="size-3.5" />
        Due {p.dueDate}
      </p>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {p.status === "assigned" && (
          <button
            type="button"
            onClick={() => updateProject(p.id, { status: "in-progress" })}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] font-semibold text-foreground transition hover:bg-muted"
          >
            <Play className="size-4" />
            Start Working
          </button>
        )}
        {(p.status === "assigned" || p.status === "in-progress") && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-semibold text-primary-foreground transition hover:opacity-95"
          >
            <Upload className="size-4" />
            Submit Work
          </button>
        )}
      </div>

      {/* Submission display */}
      {(p.status === "submitted" || p.status === "approved") && (
        <div className="mt-3 rounded-lg border border-dashed border-border bg-muted/50 p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            {p.status === "approved" ? (
              <CheckCircle2 className="size-3.5 text-[var(--success)]" />
            ) : (
              <Clock className="size-3.5" />
            )}
            {p.status === "approved" ? "Approved by admin" : "Awaiting admin review"}
          </p>
          {p.submissionNote && (
            <p className="mt-1 text-[13px] text-muted-foreground">{p.submissionNote}</p>
          )}
          {p.submissionLink && (
            <a
              href={p.submissionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:underline"
            >
              {p.submissionLink} <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Submit form */}
      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 space-y-2 rounded-lg border border-border bg-muted/40 p-3"
        >
          <div>
            <label className="mb-1 block text-[12px] font-medium text-foreground">
              Submission Link
            </label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://github.com/... or drive link"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-medium text-foreground">
              Note to Admin
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Anything the admin should know…"
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[var(--success)] px-3 text-[13px] font-semibold text-white transition hover:opacity-90"
            >
              <Upload className="size-4" />
              Submit
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-9 rounded-lg border border-border px-3 text-[13px] font-semibold text-muted-foreground transition hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
