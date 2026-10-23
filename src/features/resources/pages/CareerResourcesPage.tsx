import { ArrowLeft, Layers } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../../../components/feedback/States'
import { Badge } from '../../../components/ui/Badge'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { getCareerById } from '../../../data/careers'
import { resourcesForCareer } from '../../../data/resources'
import { ResourceList } from '../components/ResourceList'

export function CareerResourcesPage() {
  const { careerId } = useParams()
  const career = getCareerById(careerId)

  if (!career) {
    return (
      <div className="mx-auto max-w-2xl">
        <ErrorState
          title="Career field not found"
          description="Could not find learning resources for the requested career."
        />
      </div>
    )
  }

  const items = resourcesForCareer(career.id)

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Career Fields', to: '/career-learning/careers' },
          { label: career.title, to: `/career-learning/careers/${career.id}` },
          { label: 'Courses & Resources' },
        ]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Badge>{career.category}</Badge>
            <span className="text-xs font-semibold text-muted">{items.length} learning modules</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {career.title} Courses &amp; Resources
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
            Curated official courses, labs, documentation, and videos. Start learning and track your progress locally.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link to={`/career-learning/careers/${career.id}`}>
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />}>
              Career Details
            </Button>
          </Link>
          <Link to={`/career-learning/careers/${career.id}/roadmap`}>
            <Button leftIcon={<Layers size={16} />}>View Roadmap</Button>
          </Link>
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <ResourceList resources={items} />
      </Card>
    </div>
  )
}
