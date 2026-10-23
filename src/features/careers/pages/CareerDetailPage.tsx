import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  ExternalLink,
  GraduationCap,
  Layers,
  Map,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useState, useEffect } from 'react'
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
import { resourcesForCareer } from '../../../data/resources'
import { getAssessmentById } from '../../../data/assessments'
import { latestAttempt } from '../../../services/assessmentService'
import { ResourceList } from '../../resources/components/ResourceList'
import { RoadmapView } from '../../roadmaps/components/Roadmap'
import { CareerImage } from '../components/CareerImage'
import {
  overallCareerProgress,
  readProgress,
  setActiveCareer,
} from '../../../services/progressService'
import type { Career } from '../../../types/career'

const tabs: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'skills', label: 'Skills' },
  { id: 'jobs', label: 'Jobs & Internships' },
  { id: 'institutions', label: 'Institutions / ITI' },
]

export function CareerDetailPage() {
  const { careerId } = useParams()
  const career = getCareerById(careerId)
  const roadmap = getRoadmapByCareerId(careerId)
  const [activeTab, setActiveTab] = useState('overview')
  const [, setProgressTick] = useState(0)

  useEffect(() => {
    if (career) {
      setActiveCareer(career.id)
    }
  }, [career])

  useEffect(() => {
    function onProgressChange() {
      setProgressTick((prev) => prev + 1)
    }
    window.addEventListener('optmentor-progress-changed', onProgressChange)
    return () => window.removeEventListener('optmentor-progress-changed', onProgressChange)
  }, [])

  if (!career || !roadmap) {
    return (
      <div className="mx-auto max-w-2xl">
        <ErrorState
          title="Career field not found"
          description="This career ID is not part of the twenty OptMentor career-learning pathways."
        />
      </div>
    )
  }

  const courses = resourcesForCareer(career.id)
  const progress = overallCareerProgress(career.id, roadmap.stages.length, courses.length)
  const savedState = readProgress()
  const nextStage = roadmap.stages.find(
    (stage) => !savedState.stages.some((item) => item.stageId === stage.id && item.completed),
  )
  const assessment = getAssessmentById(`assessment-${career.id}`)
  const attempt = assessment ? latestAttempt(assessment.id) : undefined

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Career Fields', to: '/career-learning/careers' },
          { label: career.title },
        ]}
      />

      {/* Hero Banner Card */}
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.3fr)]">
          <CareerImage
            image={career.image}
            className="aspect-[16/9] min-h-[260px] w-full lg:aspect-auto lg:min-h-[340px]"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="w-fit">{career.category}</Badge>
              {career.difficulty && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  <Compass size={13} />
                  {career.difficulty} Friendly
                </span>
              )}
              {career.marketOutlook && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <TrendingUp size={13} />
                  {career.marketOutlook.demandLevel} Demand
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {career.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              {career.detailedDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-brand-blue">
                <Map size={14} />
                {roadmap.stages.length} Roadmap Stages
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                <Layers size={14} />
                {courses.length} Learning Resources
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 size={14} />
                Knowledge Assessment Included
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={
                  nextStage
                    ? `/career-learning/careers/${career.id}/roadmap/${nextStage.id}`
                    : `/career-learning/careers/${career.id}/roadmap`
                }
              >
                <Button rightIcon={<ArrowRight size={17} />}>
                  {progress.completedStages > 0 ? 'Continue Learning' : 'Start Pathway'}
                </Button>
              </Link>
              <Link to={`/career-learning/careers/${career.id}/roadmap`}>
                <Button variant="secondary" leftIcon={<Map size={17} />}>
                  View Full Roadmap
                </Button>
              </Link>
              {assessment && (
                <Link to={`/career-learning/assessments/${assessment.id}`}>
                  <Button variant="ghost" leftIcon={<ClipboardCheck size={17} />}>
                    {attempt ? `Assessment: ${attempt.percentage}%` : 'Take Knowledge Test'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Card className="px-5">
        <Tabs
          items={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          label="Career detail sections"
        />
      </Card>

      {/* Content Grid with Right Aside */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main Tab Content */}
        <Card className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <OverviewContent career={career} onExploreCourses={() => setActiveTab('courses')} />
          )}
          {activeTab === 'courses' && <CoursesContent courses={courses} career={career} />}
          {activeTab === 'roadmap' && <RoadmapContent careerId={career.id} roadmap={roadmap} />}
          {activeTab === 'skills' && <SkillsContent career={career} />}
          {activeTab === 'jobs' && <JobsContent career={career} />}
          {activeTab === 'institutions' && <InstitutionsContent career={career} />}
        </Card>

        {/* Right-Side Information Panels */}
        <aside className="space-y-6">
          {/* Progress Tracker Panel */}
          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
                  <BarChart3 size={21} />
                </span>
                <div>
                  <h2 className="font-extrabold text-ink">Pathway Progress</h2>
                  <p className="text-xs text-muted">
                    {progress.completedStages} of {progress.totalStages} stages completed
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-brand-blue">
                {progress.percentage}%
              </span>
            </div>

            <div className="mt-5">
              <ProgressBar
                value={progress.percentage}
                label={`${progress.percentage}% overall completion`}
                showValue={false}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl border border-line p-2.5 bg-slate-50">
                <span className="block font-black text-ink">{progress.completedStages} / {progress.totalStages}</span>
                <span className="text-muted">Stages</span>
              </div>
              <div className="rounded-xl border border-line p-2.5 bg-slate-50">
                <span className="block font-black text-ink">{progress.completedCourses} / {progress.totalCourses}</span>
                <span className="text-muted">Courses Done</span>
              </div>
            </div>

            <Link
              className="mt-5 block w-full"
              to={
                nextStage
                  ? `/career-learning/careers/${career.id}/roadmap/${nextStage.id}`
                  : `/career-learning/careers/${career.id}/roadmap`
              }
            >
              <Button className="w-full" rightIcon={<ArrowRight size={16} />}>
                {nextStage ? (progress.completedStages > 0 ? 'Continue to Next Stage' : 'Start Stage 1') : 'Review Completed Pathway'}
              </Button>
            </Link>

            {assessment && (
              <Link className="mt-2 block w-full" to={`/career-learning/assessments/${assessment.id}`}>
                <Button variant="secondary" className="w-full" leftIcon={<ClipboardCheck size={16} />}>
                  {attempt ? `Review Assessment (${attempt.percentage}%)` : 'Take Knowledge Test'}
                </Button>
              </Link>
            )}
          </Card>

          {/* Salary & Demand Outlook Card */}
          {career.salaryEstimate && (
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <TrendingUp size={20} />
                </span>
                <div>
                  <h2 className="font-extrabold text-ink">Market Outlook</h2>
                  <p className="text-xs text-muted">Estimated Trainee Compensation</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Indicative Entry Salary
                </span>
                <p className="mt-1 text-2xl font-black text-emerald-900">
                  {career.salaryEstimate.range}
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  {career.salaryEstimate.period} · {career.salaryEstimate.note}
                </p>
              </div>

              {career.marketOutlook && (
                <div className="mt-4 space-y-2 text-xs text-muted">
                  <p>
                    <strong className="text-ink">Demand Trend:</strong> {career.marketOutlook.demandLevel}
                  </p>
                  <p className="leading-5">{career.marketOutlook.growthSummary}</p>
                  {career.marketOutlook.topLocations && (
                    <div className="pt-2">
                      <span className="font-semibold text-ink">Key Employment Hubs:</span>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {career.marketOutlook.topLocations.map((loc) => (
                          <span
                            key={loc}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* Skills Checklist Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-brand-blue">
                <Sparkles size={19} />
              </span>
              <h2 className="font-extrabold text-ink">Key Competencies</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {career.keySkills.map((skill) => (
                <li key={skill} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-success shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Example Job Roles Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
                <BriefcaseBusiness size={19} />
              </span>
              <h2 className="font-extrabold text-ink">Career Directions</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {career.exampleRoles.map((role) => (
                <li key={role} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span className="font-medium text-slate-800">{role}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function OverviewContent({
  career,
  onExploreCourses,
}: {
  career: Career
  onExploreCourses: () => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
            <Compass size={22} />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Field Overview</h2>
            <p className="mt-1 text-sm text-muted">
              Learn the scope, industry relevance, and foundational skills required.
            </p>
          </div>
        </div>
        <p className="mt-5 text-base leading-8 text-muted">{career.detailedDescription}</p>
      </div>

      {/* Video / External Learning Link */}
      {career.introVideoUrl && (
        <div className="rounded-2xl border border-blue-100 bg-brand-blue-soft/60 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-blue text-white shadow-md">
                <PlayCircle size={24} />
              </span>
              <div>
                <h3 className="font-extrabold text-brand-navy">Recommended Starter Material</h3>
                <p className="text-sm text-slate-700">
                  Watch an introduction to understand the daily practice and career landscape.
                </p>
              </div>
            </div>
            <a href={career.introVideoUrl} target="_blank" rel="noreferrer" className="shrink-0">
              <Button size="sm" rightIcon={<ExternalLink size={15} />}>
                Open Resource
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Core Focus Areas */}
      <div className="rounded-2xl border border-line p-6">
        <h3 className="text-lg font-extrabold text-ink">What You Will Learn in this Pathway</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {career.keySkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-3 rounded-xl border border-line bg-slate-50/50 p-3.5 text-sm font-semibold text-slate-800"
            >
              <CheckCircle2 size={18} className="text-success shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Button variant="secondary" size="sm" onClick={onExploreCourses} rightIcon={<ArrowRight size={15} />}>
            Browse All Courses ({career.title})
          </Button>
        </div>
      </div>

      {/* Related Career Pathways */}
      {career.relatedCareerIds && career.relatedCareerIds.length > 0 && (
        <div>
          <h3 className="text-lg font-extrabold text-ink">Related Career Pathways</h3>
          <p className="mt-1 text-sm text-muted">
            Learners exploring this pathway often develop complementary skills in:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {career.relatedCareerIds.map((relId) => {
              const relCareer = getCareerById(relId)
              if (!relCareer) return null
              return (
                <Link
                  key={relCareer.id}
                  to={`/career-learning/careers/${relCareer.id}`}
                  className="group flex flex-col justify-between rounded-xl border border-line p-4 transition-all hover:border-blue-300 hover:bg-blue-50/30"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {relCareer.category}
                  </span>
                  <h4 className="mt-2 text-sm font-extrabold text-ink group-hover:text-brand-blue">
                    {relCareer.title}
                  </h4>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue">
                    Explore field <ChevronRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function CoursesContent({
  courses,
  career,
}: {
  courses: ReturnType<typeof resourcesForCareer>
  career: Career
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Curated Course Catalog</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            {courses.length} verified learning modules, documentation, and labs for{' '}
            <strong>{career.title}</strong>.
          </p>
        </div>
        <Badge tone="blue">{courses.length} Resources</Badge>
      </div>
      <ResourceList resources={courses} />
    </div>
  )
}

function RoadmapContent({
  careerId,
  roadmap,
}: {
  careerId: string
  roadmap: NonNullable<ReturnType<typeof getRoadmapByCareerId>>
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Structured Learning Roadmap</h2>
          <p className="mt-1 text-sm text-muted">
            Sequential progression across 5 milestones. Complete prerequisites to advance.
          </p>
        </div>
        <Link to={`/career-learning/careers/${careerId}/roadmap`}>
          <Button rightIcon={<ArrowRight size={17} />}>View Interactive Roadmap</Button>
        </Link>
      </div>
      <RoadmapView roadmap={roadmap} preview />
    </div>
  )
}

function SkillsContent({ career }: { career: Career }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-ink">Skill Competency Matrix</h2>
        <p className="mt-1 text-sm text-muted">
          Master these core competencies through courses and roadmap projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {career.keySkills.map((skill, idx) => (
          <div key={skill} className="rounded-2xl border border-line p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-50 font-black text-xs text-brand-blue">
                0{idx + 1}
              </span>
              <h3 className="font-extrabold text-ink">{skill}</h3>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">
              Covered in roadmap milestones and verified with practical exercises and assessments.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function JobsContent({ career }: { career: Career }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
          <BriefcaseBusiness size={22} />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Jobs &amp; Apprenticeship Pathways</h2>
          <p className="mt-1 text-sm text-muted">
            Representative entry-level opportunities, apprentice schemes, and career roles.
          </p>
        </div>
      </div>

      {career.sampleOpportunities && career.sampleOpportunities.length > 0 ? (
        <div className="grid gap-4">
          {career.sampleOpportunities.map((opp) => (
            <div key={opp.title} className="rounded-2xl border border-line p-5 sm:p-6 bg-slate-50/40">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Badge tone={opp.type === 'Apprenticeship' ? 'green' : 'blue'}>{opp.type}</Badge>
                  <h3 className="mt-2 text-lg font-extrabold text-ink">{opp.title}</h3>
                  <p className="text-xs font-semibold text-muted">{opp.organizationType}</p>
                </div>
                {opp.samplePortalUrl && (
                  <a href={opp.samplePortalUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="secondary" rightIcon={<ExternalLink size={14} />}>
                      {opp.portalName ?? 'Visit Portal'}
                    </Button>
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{opp.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {opp.skillsRequired.map((sk) => (
                  <span
                    key={sk}
                    className="rounded-md bg-white border border-line px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">Role specifications curated in the catalog.</p>
      )}

      {/* Official Opportunity Portals Banner */}
      <div className="rounded-2xl border border-blue-100 bg-brand-blue-soft/70 p-5">
        <h3 className="font-extrabold text-brand-navy">Official Indian Career &amp; Apprenticeship Portals</h3>
        <p className="mt-1 text-xs leading-5 text-slate-700">
          Search live verified vacancies, national apprentice training schemes (NAPS), and state employment registrations:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://www.ncs.gov.in" target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary" rightIcon={<ExternalLink size={14} />}>
              National Career Service (NCS)
            </Button>
          </a>
          <a href="https://www.apprenticeshipindia.gov.in" target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary" rightIcon={<ExternalLink size={14} />}>
              NAPS Apprenticeship Portal
            </Button>
          </a>
          <a href="https://www.skillindiadigital.gov.in" target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary" rightIcon={<ExternalLink size={14} />}>
              Skill India Digital Hub
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

function InstitutionsContent({ career }: { career: Career }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue">
          <GraduationCap size={22} />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Institutions, ITI &amp; Training Centres</h2>
          <p className="mt-1 text-sm text-muted">
            Recognized educational institutions and polytechnics offering programs in this field.
          </p>
        </div>
      </div>

      {career.institutions && career.institutions.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {career.institutions.map((inst) => (
            <div key={inst.name} className="flex flex-col justify-between rounded-2xl border border-line p-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="blue">{inst.type}</Badge>
                  <span className="text-xs text-muted font-medium">{inst.location}</span>
                </div>
                <h3 className="mt-3 text-base font-extrabold text-ink">{inst.name}</h3>
                <div className="mt-3">
                  <span className="text-xs font-semibold text-slate-700">Programs Offered:</span>
                  <ul className="mt-1 space-y-1">
                    {inst.programsOffered.map((prog) => (
                      <li key={prog} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 size={13} className="text-success shrink-0" />
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {inst.websiteUrl && (
                <div className="mt-4 pt-3 border-t border-line">
                  <a
                    href={inst.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                  >
                    Official Portal <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-line p-5 text-center text-sm text-muted">
          Institution listings are organized by the State Council for Technical Education &amp; Vocational Training (SCTEVT Odisha).
        </div>
      )}

      {/* State Vocational Portal Callout */}
      <div className="flex items-center justify-between rounded-2xl border border-line bg-slate-50 p-5">
        <div>
          <h4 className="font-extrabold text-ink">SCTEVT Odisha ITI &amp; Polytechnic Directory</h4>
          <p className="text-xs text-muted mt-1">
            Access admissions and trade affiliations across all 30 Odisha districts.
          </p>
        </div>
        <a href="https://sctevtodisha.nic.in" target="_blank" rel="noreferrer">
          <Button size="sm" variant="secondary" rightIcon={<ExternalLink size={14} />}>
            Visit SCTEVT
          </Button>
        </a>
      </div>
    </div>
  )
}
