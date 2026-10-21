import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Career } from '../../../types/career'
import { CareerImage } from './CareerImage'

const badgeColors = ['bg-blue-600', 'bg-violet-600', 'bg-orange-500', 'bg-emerald-600', 'bg-cyan-600', 'bg-indigo-600', 'bg-amber-500', 'bg-teal-600', 'bg-sky-600', 'bg-rose-600']

export function CareerCard({ career, index }: { career: Career; index: number }) {
  return (
    <Link style={{ ['--card-index' as string]: index } as CSSProperties} to={`/career-learning/careers/${career.id}`} aria-label={`Explore ${career.title}`} className="career-card-stagger group interactive-lift flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
      <div className="relative overflow-hidden"><CareerImage image={career.image} className="aspect-[16/9] w-full" /><span className={`absolute left-3 top-3 grid size-10 place-items-center rounded-xl text-sm font-extrabold text-white shadow-lg ${badgeColors[index % badgeColors.length]}`}>{String(index + 1).padStart(2, '0')}</span><span className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/40 to-transparent" aria-hidden="true" /></div>
      <div className="flex flex-1 flex-col p-5"><span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">{career.category}</span><h2 className="mt-2 text-lg font-extrabold leading-snug text-ink">{career.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{career.shortDescription}</p><div className="mt-auto flex items-end justify-between gap-4 pt-5"><div className="flex flex-wrap gap-1.5">{career.keySkills.slice(0, 2).map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{skill}</span>)}</div><span className="grid size-10 shrink-0 place-items-center rounded-full border border-blue-200 text-brand-blue transition-all group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white" aria-hidden="true"><ArrowUpRight size={19} /></span></div></div>
    </Link>
  )
}
