import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone = 'blue' | 'green' | 'amber' | 'slate'
const tones: Record<BadgeTone, string> = {
  blue: 'bg-brand-blue-soft text-brand-blue',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  slate: 'bg-slate-100 text-slate-700',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: BadgeTone }

export function Badge({ className, tone = 'blue', ...props }: BadgeProps) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone], className)} {...props} />
}
