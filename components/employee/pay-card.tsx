"use client"

import { IndianRupee, TrendingUp, Wallet } from "lucide-react"
import { useStore, formatINR, EMPLOYEE_ID } from "@/lib/store"

export function PayCard() {
  const { data } = useStore()
  const me = data.employees.find((e) => e.id === EMPLOYEE_ID)
  if (!me) return null

  const monthly = me.monthlyPay
  const annual = monthly * 12
  // Simple illustrative breakdown
  const basic = Math.round(monthly * 0.5)
  const hra = Math.round(monthly * 0.3)
  const allowances = monthly - basic - hra

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-[var(--success)]/15 text-[var(--success)]">
          <Wallet className="size-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Monthly Pay</h2>
          <p className="text-[13px] text-muted-foreground">Your current salary details.</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-background p-5">
        <p className="text-[13px] text-muted-foreground">Net Monthly Salary</p>
        <p className="mt-1 flex items-center font-heading text-4xl font-bold text-foreground">
          <IndianRupee className="size-7" />
          {monthly.toLocaleString("en-IN")}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[13px] text-[var(--success)]">
          <TrendingUp className="size-4" />
          {formatINR(annual)} per year
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <Breakdown label="Basic Pay" value={basic} />
        <Breakdown label="House Rent Allowance" value={hra} />
        <Breakdown label="Other Allowances" value={allowances} />
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
          <span className="text-[14px] font-semibold text-foreground">Total</span>
          <span className="font-heading text-[16px] font-bold text-foreground">
            {formatINR(monthly)}
          </span>
        </div>
      </div>
    </div>
  )
}

function Breakdown({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{formatINR(value)}</span>
    </div>
  )
}
