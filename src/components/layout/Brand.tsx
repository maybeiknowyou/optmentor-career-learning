import { GraduationCap } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-blue text-white shadow-lg shadow-blue-950/20"><GraduationCap size={25} aria-hidden="true" /></span>
      {!compact && <span><span className="block text-xl font-bold tracking-tight">OptMentor</span><span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-blue-200">Learn · Build · Grow</span></span>}
    </div>
  )
}
