import { ArrowRight, Blocks, Construction } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Tabs } from '../../components/ui/Tabs'

export interface PlaceholderPageProps {
  eyebrow: string
  title: string
  description: string
  phase: string
  showTabs?: boolean
}

const detailTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'skills', label: 'Skills' },
  { id: 'roles', label: 'Career Roles' },
]

function prettify(value?: string) {
  if (!value) return undefined
  return value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function PlaceholderPage({ eyebrow, title, description, phase, showTabs = false }: PlaceholderPageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const params = useParams()
  const contextLabel = prettify(params.stageId ?? params.assessmentId ?? params.careerId)

  return (
    <div className="mx-auto max-w-[1480px] space-y-6">
      <Breadcrumbs items={[{ label: 'Career Learning', to: '/career-learning/careers' }, { label: title }]} />
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl"><Badge>{eyebrow}</Badge><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1><p className="mt-3 text-base leading-7 text-muted">{description}</p>{contextLabel && <p className="mt-3 text-sm"><span className="font-semibold text-ink">Route context:</span> <code className="rounded-md bg-white px-2 py-1 text-brand-blue">{contextLabel}</code></p>}</div>
        <Badge tone="slate">Planned for {phase}</Badge>
      </section>

      {showTabs && <Card className="px-5"><Tabs items={detailTabs} activeId={activeTab} onChange={setActiveTab} label="Career detail sections" /></Card>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 size-52 rounded-full bg-brand-blue-soft" />
          <div className="relative"><span className="grid size-12 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue"><Construction size={25} /></span><h2 className="mt-5 text-xl font-bold text-ink">Phase 1 foundation ready</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">This route is intentionally a labeled placeholder. Its final data and interactions will be added only in the authorized feature phase.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Shared input preview" placeholder="Accessible input component" /><div><p className="mb-2 text-sm font-semibold text-ink">Shared progress preview</p><div className="min-h-11 rounded-xl border border-line p-3"><ProgressBar value={35} /></div></div></div><div className="mt-6 flex flex-wrap gap-3"><Button rightIcon={<ArrowRight size={17} />}>Primary action</Button><Button variant="secondary">Secondary action</Button></div></div>
        </Card>
        <Card className="p-6"><span className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-600"><Blocks size={22} /></span><h2 className="mt-4 text-lg font-bold text-ink">Reusable by design</h2><ul className="mt-4 space-y-3 text-sm text-muted"><li className="flex gap-2"><span className="mt-1 size-2 shrink-0 rounded-full bg-brand-blue" />Standalone and embedded shell modes</li><li className="flex gap-2"><span className="mt-1 size-2 shrink-0 rounded-full bg-brand-blue" />Module-owned route namespace</li><li className="flex gap-2"><span className="mt-1 size-2 shrink-0 rounded-full bg-brand-blue" />Responsive, accessible UI primitives</li></ul></Card>
      </div>
    </div>
  )
}
