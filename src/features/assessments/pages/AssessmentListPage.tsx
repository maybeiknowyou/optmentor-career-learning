import { ArrowRight, CheckCircle2, ClipboardCheck, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { assessments } from '../../../data/assessments'
import { careers } from '../../../data/careers'
import { latestAttempt } from '../../../services/assessmentService'

export function AssessmentListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'not-passed' | 'not-started'>('all')

  const items = useMemo(() => {
    return assessments.map((assessment) => {
      const career = careers.find((item) => item.id === assessment.careerId)
      const attempt = latestAttempt(assessment.id)
      return { assessment, career, attempt }
    })
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter(({ assessment, career, attempt }) => {
      const matchesSearch =
        !q ||
        assessment.title.toLowerCase().includes(q) ||
        (career?.title.toLowerCase().includes(q) ?? false) ||
        assessment.description.toLowerCase().includes(q)

      let matchesStatus = true
      if (statusFilter === 'passed') matchesStatus = Boolean(attempt?.passed)
      else if (statusFilter === 'not-passed') matchesStatus = Boolean(attempt && !attempt.passed)
      else if (statusFilter === 'not-started') matchesStatus = !attempt

      return matchesSearch && matchesStatus
    })
  }, [items, search, statusFilter])

  const passedCount = items.filter(({ attempt }) => attempt?.passed).length

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge>Pathway Assessments</Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Test your understanding
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
            Roadmap-linked knowledge checks with a 60% passing threshold across all 20 pathways.
          </p>
        </div>
        <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white p-3.5 shadow-sm">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <span className="block text-lg font-black text-ink">
              {passedCount} / {assessments.length}
            </span>
            <span className="text-xs text-muted">Assessments Passed</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assessments or careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-line bg-white pl-10 pr-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(['all', 'passed', 'not-passed', 'not-started'] as const).map((filter) => {
            const label =
              filter === 'all'
                ? 'All Quizzes'
                : filter === 'passed'
                ? 'Passed'
                : filter === 'not-passed'
                ? 'Needs Review'
                : 'Not Started'
            const active = statusFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`rounded-lg px-3 py-2 font-semibold transition-colors ${
                  active
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-white border border-line text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map(({ assessment, career, attempt }) => (
          <Card key={assessment.id} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
                  <ClipboardCheck size={22} />
                </span>
                <Badge tone={attempt?.passed ? 'green' : attempt ? 'slate' : 'slate'}>
                  {attempt
                    ? `${attempt.percentage}% ${attempt.passed ? 'Passed' : 'Not Passed'}`
                    : 'Not Started'}
                </Badge>
              </div>

              <h2 className="mt-4 text-xl font-extrabold text-ink">{assessment.title}</h2>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
                {career?.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{assessment.description}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
              <span className="text-xs text-muted font-medium">
                {assessment.questions.length} questions · Pass at {assessment.passingPercentage}%
              </span>
              <div className="flex gap-2">
                {attempt && (
                  <Link to={`/career-learning/assessments/${assessment.id}/results`}>
                    <Button size="sm" variant="secondary">
                      Review Result
                    </Button>
                  </Link>
                )}
                <Link to={`/career-learning/assessments/${assessment.id}`}>
                  <Button size="sm" rightIcon={<ArrowRight size={16} />}>
                    {attempt ? 'Retake' : 'Start Assessment'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
