import { Menu, Moon, Search, Sun, UserRound } from 'lucide-react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../ui/Input'
import { Brand } from './Brand'
import { useTheme } from '../../context/useTheme'

export function Topbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentQuery = new URLSearchParams(location.search).get('q') ?? ''
  const demoMode = new URLSearchParams(location.search).get('demo') === '1'
  const { theme, toggleTheme } = useTheme()

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = String(new FormData(event.currentTarget).get('career-search') ?? '').trim()
    navigate(query ? `/career-learning/careers?q=${encodeURIComponent(query)}` : '/career-learning/careers')
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button type="button" className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-line text-ink hover:bg-slate-50 lg:hidden" aria-label="Open navigation" aria-controls="module-navigation" onClick={onMenuOpen}><Menu size={22} /></button>
      <div className="lg:hidden"><Brand compact /></div>
      <form className="hidden w-full max-w-2xl md:block" role="search" onSubmit={submitSearch}><Input key={`${location.pathname}-${currentQuery}`} name="career-search" aria-label="Search career fields" placeholder="Search career fields by title or skill…" leadingIcon={<Search size={18} />} defaultValue={currentQuery} /></form>
      <div className="ml-auto flex items-center gap-3 border-l border-line pl-3 sm:pl-5"><button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} className="relative grid size-11 place-items-center overflow-hidden rounded-xl border border-line bg-white text-brand-blue transition-colors hover:bg-brand-blue-soft"><Sun size={18} className={`absolute transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} /><Moon size={18} className={`absolute transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} /></button><span className="grid size-10 place-items-center rounded-full bg-brand-blue-soft text-brand-blue"><UserRound size={20} aria-hidden="true" /></span><span className="hidden sm:block"><span className="block text-sm font-bold text-ink">{demoMode ? 'Demo Learner' : 'Learner'}</span><span className="block text-xs text-muted">{demoMode ? 'Hackathon preview · 45%' : 'Career learner'}</span></span></div>
    </header>
  )
}
