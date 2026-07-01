import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  showText = true,
  variant = 'light',
}: {
  className?: string
  showText?: boolean
  /** "light" = white text (for dark backgrounds), "dark" = dark text (for light backgrounds) */
  variant?: 'light' | 'dark'
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight text-white shadow-md shadow-[#0a2540]/30"
        style={{
          background: 'linear-gradient(135deg, #2d6cdf 0%, #0a2540 100%)',
        }}
        aria-hidden="true"
      >
        PS
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-heading text-[15px] font-bold',
              variant === 'light' ? 'text-white' : 'text-foreground',
            )}
          >
            PjSofonic
          </span>
          <span className="text-[11px] font-medium tracking-widest text-[#00bfa6]">
            MS
          </span>
        </div>
      )}
    </div>
  )
}
