import { Check, ChevronRight, Lock, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { cn } from '../../../lib/cn'
import { getStageStatus } from '../../../data/roadmaps'
import { useProgress } from '../../../hooks/useProgress'
import type { Roadmap as RoadmapModel } from '../../../types/roadmap'

export function RoadmapView({ roadmap, preview = false }: { roadmap: RoadmapModel; preview?: boolean }) {
  const progress = useProgress()
  const stages = preview ? roadmap.stages.slice(0, 4) : roadmap.stages
  return (
    <div className="relative space-y-4">
      {stages.map((stage, index) => {
        const completed = progress.stages.some((item) => item.careerId === roadmap.careerId && item.stageId === stage.id && item.completed)
        const prerequisiteComplete = !stage.prerequisiteStageId || progress.stages.some((item) => item.careerId === roadmap.careerId && item.stageId === stage.prerequisiteStageId && item.completed)
        const status = completed ? 'completed' : prerequisiteComplete ? 'available' : getStageStatus(stage)
        const isAvailable = status === 'available' || status === 'completed'
        return (
          <div key={stage.id} className="relative pl-14 sm:pl-16">
            {index < stages.length - 1 && <span className="roadmap-line absolute left-[21px] top-12 h-[calc(100%+1rem)] w-px bg-line sm:left-[25px]" aria-hidden="true" />}
            <span className={cn('absolute left-0 top-1 grid size-11 place-items-center rounded-2xl border-4 border-page text-sm font-extrabold shadow-sm transition duration-300 sm:size-[50px]', completed ? 'roadmap-completed bg-success text-white' : isAvailable ? 'roadmap-available bg-brand-blue text-white' : 'bg-white text-slate-500')} aria-label={`Stage ${stage.order} ${status}`}>
              {completed ? <Check size={20} /> : isAvailable ? <PlayCircle size={20} /> : <Lock size={18} />}
            </span>
            <Link to={`/career-learning/careers/${roadmap.careerId}/roadmap/${stage.id}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
              <Card className="p-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-lg sm:p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">Stage {stage.order}</span><Badge tone={completed ? 'green' : isAvailable ? 'blue' : 'slate'}>{completed ? 'Completed' : isAvailable ? 'Available' : 'Locked preview'}</Badge></div><h3 className="mt-2 text-lg font-extrabold text-ink">{stage.title}</h3><p className="mt-1 text-sm leading-6 text-muted">{stage.description}</p></div><ChevronRight className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-blue" size={21} aria-hidden="true" /></div><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500"><span className="capitalize">{stage.difficulty}</span>{stage.prerequisiteStageId && <span className="flex items-center gap-1"><Check size={14} className="text-slate-400" />Prerequisite required</span>}</div></Card>
            </Link>
          </div>
        )
      })}
      {preview && roadmap.stages.length > stages.length && <p className="pl-14 text-sm font-semibold text-brand-blue sm:pl-16">+ {roadmap.stages.length - stages.length} more stages in the full roadmap</p>}
    </div>
  )
}
