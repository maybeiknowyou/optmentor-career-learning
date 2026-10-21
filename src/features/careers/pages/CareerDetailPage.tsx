import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Code2, Map, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../../../components/feedback/States'
import { Badge } from '../../../components/ui/Badge'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { ProgressBar } from '../../../components/ui/ProgressBar'
import { Tabs, type TabItem } from '../../../components/ui/Tabs'
import { getCareerById } from '../../../data/careers'
import { getRoadmapByCareerId } from '../../../data/roadmaps'
import { CareerImage } from '../components/CareerImage'
import { RoadmapView } from '../../roadmaps/components/Roadmap'
import { resourcesForCareer } from '../../..//data/resources'
import { ResourceList } from '../../resources/components/ResourceList'

const tabs: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'skills', label: 'Skills' },
  { id: 'roles', label: 'Career Roles' },
]

export function CareerDetailPage() {
  const { careerId } = useParams()
  const career = getCareerById(careerId)
  const roadmap = getRoadmapByCareerId(careerId)
  const [activeTab, setActiveTab] = useState('overview')

  if (!career || !roadmap) return <div className="mx-auto max-w-2xl"><ErrorState title="Career field not found" description="This career ID is not part of the ten OptMentor career-learning pathways." /></div>

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      <Breadcrumbs items={[{ label: 'Career Fields', to: '/career-learning/careers' }, { label: career.title }]} />
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.4fr)]"><CareerImage image={career.image} className="aspect-[16/9] min-h-64 w-full lg:aspect-auto lg:min-h-[290px]" /><div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"><Badge className="w-fit">{career.category}</Badge><h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{career.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-muted">{career.detailedDescription}</p><div className="mt-6 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><CheckCircle2 size={15} />Beginner-friendly foundations</span><span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-brand-blue"><Map size={15} />{roadmap.stages.length} roadmap stages</span></div><Link className="mt-6 inline-flex w-fit" to={`/career-learning/careers/${career.id}/roadmap`}><Button rightIcon={<ArrowRight size={17} />}>View Roadmap</Button></Link></div></div>
      </Card>

      <Card className="px-5"><Tabs items={tabs} activeId={activeTab} onChange={setActiveTab} label="Career detail sections" /></Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
        <Card className="p-6 sm:p-8">{activeTab === 'overview' && <OverviewContent career={career} />} {activeTab === 'courses' && <CoursesContent careerId={career.id} />} {activeTab === 'roadmap' && <RoadmapContent careerId={career.id} roadmap={roadmap} />} {activeTab === 'skills' && <SkillsContent career={career} />} {activeTab === 'roles' && <RolesContent career={career} />}</Card>
        <aside className="space-y-6"><Card className="p-6"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue"><BarChart3 size={21} /></span><div><h2 className="font-extrabold text-ink">Your progress</h2><p className="text-xs text-muted">Progress tracking arrives later</p></div></div><div className="mt-5"><ProgressBar value={0} label="Not started" showValue /></div><p className="mt-3 text-xs leading-5 text-muted">Lesson completion and assessment progress will connect here in the progress phase.</p></Card><Card className="p-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600"><BriefcaseBusiness size={19} /></span><h2 className="font-extrabold text-ink">Example roles</h2></div><ul className="mt-4 space-y-3">{career.exampleRoles.map((role) => <li key={role} className="flex gap-2 text-sm text-muted"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />{role}</li>)}</ul></Card></aside>
      </div>
    </div>
  )
}

function OverviewContent({ career }: { career: NonNullable<ReturnType<typeof getCareerById>> }) {
  return <div><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue"><Code2 size={21} /></span><div><h2 className="text-2xl font-extrabold text-ink">Build your foundation</h2><p className="mt-1 text-sm text-muted">A practical starting point for this career pathway.</p></div></div><p className="mt-6 text-base leading-8 text-muted">{career.detailedDescription}</p><div className="mt-7 rounded-2xl border border-blue-100 bg-brand-blue-soft p-5"><h3 className="font-extrabold text-brand-navy">What you will explore</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{career.keySkills.slice(0, 4).map((skill) => <div key={skill} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 size={17} className="text-success" />{skill}</div>)}</div></div></div>
}

function CoursesContent({ careerId }: { careerId: string }) { const items = resourcesForCareer(careerId); return <div><div className="mb-6"><h2 className="text-2xl font-extrabold text-ink">Free learning resources</h2><p className="mt-2 text-sm leading-6 text-muted">Curated external courses, documentation and labs connected to this roadmap. Certificates may be separate or unavailable.</p></div><ResourceList resources={items} /></div> }

function RoadmapContent({ careerId, roadmap }: { careerId: string; roadmap: NonNullable<ReturnType<typeof getRoadmapByCareerId>> }) { return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-extrabold text-ink">Learning roadmap</h2><p className="mt-1 text-sm text-muted">Preview the first stages and open the full prerequisite pathway.</p></div><Link to={`/career-learning/careers/${careerId}/roadmap`}><Button rightIcon={<ArrowRight size={17} />}>View Roadmap</Button></Link></div><div className="mt-7"><RoadmapView roadmap={roadmap} preview /></div></div> }

function SkillsContent({ career }: { career: NonNullable<ReturnType<typeof getCareerById>> }) { return <div><h2 className="text-2xl font-extrabold text-ink">Key skills you will develop</h2><p className="mt-2 text-sm leading-6 text-muted">These skill areas organize the pathway content. Detailed lessons will be connected in later phases.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{career.keySkills.map((skill) => <div key={skill} className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm font-bold text-slate-700"><span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-success"><CheckCircle2 size={18} /></span>{skill}</div>)}</div></div> }

function RolesContent({ career }: { career: NonNullable<ReturnType<typeof getCareerById>> }) { return <div><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue"><UsersRound size={21} /></span><div><h2 className="text-2xl font-extrabold text-ink">Example career roles</h2><p className="mt-1 text-sm text-muted">Role examples help learners connect skills to possible directions.</p></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{career.exampleRoles.map((role) => <div key={role} className="rounded-2xl border border-line p-5"><h3 className="font-extrabold text-ink">{role}</h3><p className="mt-2 text-sm leading-6 text-muted">Explore the skills and supervised experience commonly associated with this direction.</p></div>)}</div></div> }
