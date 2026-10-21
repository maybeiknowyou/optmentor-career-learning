import { ArrowLeft, Map } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../../../components/feedback/States'
import { Badge } from '../../../components/ui/Badge'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { getCareerById } from '../../../data/careers'
import { getRoadmapByCareerId } from '../../../data/roadmaps'
import { RoadmapView } from '../components/Roadmap'

export function RoadmapPage() {
  const { careerId } = useParams()
  const career = getCareerById(careerId)
  const roadmap = getRoadmapByCareerId(careerId)

  if (!career || !roadmap) return <div className="mx-auto max-w-2xl"><ErrorState title="Roadmap not found" description="This career does not have a roadmap in the approved ten-field module." /></div>

  return <div className="mx-auto max-w-4xl space-y-6"><Breadcrumbs items={[{ label: 'Career Fields', to: '/career-learning/careers' }, { label: career.title, to: `/career-learning/careers/${career.id}` }, { label: 'Roadmap' }]} /><section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Badge>{career.category}</Badge><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{roadmap.title}</h1><p className="mt-3 max-w-2xl text-base leading-7 text-muted">{roadmap.description} The first stage is available; later stages are previewable and remain locked until the progress phase.</p></div><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue"><Map size={28} /></span></section><Card className="p-5 sm:p-8"><RoadmapView roadmap={roadmap} /></Card><Link className="inline-flex" to={`/career-learning/careers/${career.id}`}><Button variant="secondary" leftIcon={<ArrowLeft size={17} />}>Back to Career Details</Button></Link></div>
}
