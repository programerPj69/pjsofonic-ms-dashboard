"use client"

import { useState } from "react"
import { Pencil, Check, X, Mail, Phone, Building2, IndianRupee } from "lucide-react"
import { useStore, formatINR, type Employee } from "@/lib/store"

export function EmployeesManager() {
  const { data, updateEmployee } = useStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Employee>>({})

  function startEdit(emp: Employee) {
    setEditingId(emp.id)
    setDraft(emp)
  }

  function save(id: string) {
    updateEmployee(id, {
      name: draft.name,
      role: draft.role,
      email: draft.email,
      phone: draft.phone,
      department: draft.department,
      monthlyPay: Number(draft.monthlyPay) || 0,
      status: draft.status,
    })
    setEditingId(null)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-heading text-lg font-bold text-foreground">Employee Directory</h2>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Edit employee details, department, monthly pay, and status.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.employees.map((emp) => {
          const editing = editingId === emp.id
          return (
            <div
              key={emp.id}
              className="flex flex-col rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-primary text-[15px] font-bold text-primary-foreground">
                    {emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] text-muted-foreground">{emp.id}</p>
                    <span
                      className={
                        "mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
                        (emp.status === "active"
                          ? "bg-[var(--success)]/15 text-[var(--success)]"
                          : "bg-[var(--warning)]/20 text-[color:var(--warning-foreground)]")
                      }
                    >
                      {emp.status === "active" ? "Active" : "On Leave"}
                    </span>
                  </div>
                </div>
                {!editing ? (
                  <button
                    type="button"
                    onClick={() => startEdit(emp)}
                    aria-label={`Edit ${emp.name}`}
                    className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => save(emp.id)}
                      aria-label="Save"
                      className="grid size-9 place-items-center rounded-lg bg-[var(--success)] text-white transition hover:opacity-90"
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      aria-label="Cancel"
                      className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              {editing ? (
                <div className="mt-4 space-y-2">
                  <EditField
                    label="Name"
                    value={draft.name ?? ""}
                    onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
                  />
                  <EditField
                    label="Role"
                    value={draft.role ?? ""}
                    onChange={(v) => setDraft((d) => ({ ...d, role: v }))}
                  />
                  <EditField
                    label="Department"
                    value={draft.department ?? ""}
                    onChange={(v) => setDraft((d) => ({ ...d, department: v }))}
                  />
                  <EditField
                    label="Email"
                    value={draft.email ?? ""}
                    onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                  />
                  <EditField
                    label="Phone"
                    value={draft.phone ?? ""}
                    onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
                  />
                  <EditField
                    label="Monthly Pay (₹)"
                    type="number"
                    value={String(draft.monthlyPay ?? 0)}
                    onChange={(v) => setDraft((d) => ({ ...d, monthlyPay: Number(v) }))}
                  />
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-muted-foreground">
                      Status
                    </label>
                    <select
                      value={draft.status ?? "active"}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          status: e.target.value as Employee["status"],
                        }))
                      }
                      className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                    >
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <p className="font-heading text-[15px] font-bold text-foreground">
                    {emp.name}
                  </p>
                  <p className="text-[13px] text-muted-foreground">{emp.role}</p>
                  <div className="mt-3 space-y-1.5 text-[13px] text-foreground">
                    <InfoRow icon={<Building2 className="size-3.5" />} text={emp.department} />
                    <InfoRow icon={<Mail className="size-3.5" />} text={emp.email} />
                    <InfoRow icon={<Phone className="size-3.5" />} text={emp.phone} />
                    <InfoRow
                      icon={<IndianRupee className="size-3.5" />}
                      text={`${formatINR(emp.monthlyPay)} / month`}
                      strong
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  text,
  strong,
}: {
  icon: React.ReactNode
  text: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <span className={strong ? "font-semibold text-foreground" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  )
}

function EditField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-[14px] text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </div>
  )
}
