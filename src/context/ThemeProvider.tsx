import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
function initialTheme(): 'light' | 'dark' { if (typeof window === 'undefined') return 'light'; const saved = window.localStorage.getItem('optmentor.theme'); if (saved === 'light' || saved === 'dark') return saved; return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
export function ThemeProvider({ children }: { children: ReactNode }) { const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme); const toggleTheme = () => setTheme((current) => { const next = current === 'light' ? 'dark' : 'light'; window.localStorage.setItem('optmentor.theme', next); return next }); return <ThemeContext.Provider value={useMemo(() => ({ theme, toggleTheme }), [theme])}>{children}</ThemeContext.Provider> }
