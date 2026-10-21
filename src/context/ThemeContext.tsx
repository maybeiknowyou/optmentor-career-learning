import { createContext } from 'react'
export type ThemeMode = 'light' | 'dark'
export const ThemeContext = createContext<{ theme: ThemeMode; toggleTheme: () => void }>({ theme: 'light', toggleTheme: () => undefined })
