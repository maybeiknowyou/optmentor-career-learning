import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-blue text-white shadow-sm hover:bg-brand-blue-hover',
  secondary: 'border border-brand-blue bg-white text-brand-blue hover:bg-brand-blue-soft',
  ghost: 'bg-transparent text-muted hover:bg-slate-100 hover:text-ink',
  success: 'bg-success text-white shadow-sm hover:bg-emerald-700',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
}

export function Button({ className, variant = 'primary', size = 'md', leftIcon, rightIcon, children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn('inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50', variants[variant], sizes[size], className)} {...props}>
      {leftIcon}{children}{rightIcon}
    </button>
  )
}
