import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export function AnimatedReveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), delay); return () => window.clearTimeout(timer) }, [delay])
  return <div className={`${className} motion-reveal ${visible ? 'motion-reveal-visible' : ''}`}>{children}</div>
}
