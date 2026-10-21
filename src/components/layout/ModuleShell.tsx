import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useTheme } from '../../context/useTheme'
import { BackToTop } from '../ui/BackToTop'

export type ShellMode = 'standalone' | 'embedded'

interface ModuleShellProps { mode: ShellMode; children: ReactNode }

export function ModuleShell({ mode, children }: ModuleShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useTheme()
  const themeClass = theme === 'dark' ? 'optmentor-theme-dark' : 'optmentor-theme-light'

  if (mode === 'embedded') {
    return <main className={`${themeClass} min-h-screen bg-page p-4 text-ink sm:p-6 lg:p-8`}>{children}<BackToTop /></main>
  }

  return (
    <div className={`${themeClass} min-h-screen bg-page text-ink`}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-h-screen lg:pl-60">
        <Topbar onMenuOpen={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}<BackToTop /></main>
      </div>
    </div>
  )
}
