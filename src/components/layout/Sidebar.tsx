import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { moduleNavigation } from '../../config/navigation'
import { cn } from '../../lib/cn'
import { Brand } from './Brand'

interface SidebarProps { open: boolean; onClose: () => void }

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div className={cn('fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] transition-opacity lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')} aria-hidden="true" onClick={onClose} />
      <aside id="module-navigation" className={cn('fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-brand-navy text-white shadow-2xl transition-transform duration-300 lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')} aria-label="Career learning navigation">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5"><Brand /><button type="button" className="grid size-10 cursor-pointer place-items-center rounded-xl text-blue-100 hover:bg-white/10 lg:hidden" aria-label="Close navigation" onClick={onClose}><X size={22} /></button></div>
        <nav className="flex-1 space-y-2 px-3 py-6">
          {moduleNavigation.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => cn('flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-colors', isActive ? 'bg-brand-blue text-white shadow-lg shadow-blue-950/20' : 'text-blue-100 hover:bg-white/8 hover:text-white')}>
              <Icon size={20} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4"><div className="rounded-2xl bg-white/6 p-4"><p className="text-sm font-semibold">Career Learning</p><p className="mt-1 text-xs leading-5 text-blue-200">Explore structured pathways and build practical skills.</p></div></div>
      </aside>
    </>
  )
}
