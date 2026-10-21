import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  leadingIcon?: ReactNode
}

export function Input({ className, label, hint, leadingIcon, id, ...props }: InputProps) {
  const inputId = id ?? props.name
  return (
    <label className="block" htmlFor={inputId}>
      {label && <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>}
      <span className="relative block">
        {leadingIcon && <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">{leadingIcon}</span>}
        <input id={inputId} className={cn('min-h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-blue-100', Boolean(leadingIcon) && 'pl-10', className)} {...props} />
      </span>
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  )
}
