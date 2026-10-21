interface ProgressBarProps { value: number; label?: string; showValue?: boolean }

export function ProgressBar({ value, label, showValue = false }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value))
  return (
    <div>
      {(label || showValue) && <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span className="font-medium text-ink">{label}</span>{showValue && <span className="font-semibold text-brand-blue">{safeValue}%</span>}</div>}
      <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label={label ?? 'Progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <div className="h-full rounded-full bg-brand-blue transition-[width] duration-500" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
