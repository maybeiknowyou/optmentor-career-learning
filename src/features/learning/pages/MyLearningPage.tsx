import { ArrowRight, Award, BookOpen, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { ProgressBar } from '../../../components/ui/ProgressBar'
import { careers } from '../../../data/careers'
import { getRoadmapByCareerId } from '../../../data/roadmaps'
import { resourcesForCareer } from '../../../data/resources'
import { getAssessmentById } from '../../../data/assessments'
import { getEarnedBadges } from '../../../data/badges'
import { readAttempts } from '../../../services/assessmentService'
import { overallCareerProgress } from '../../../services/progressService'
import { useProgress } from '../../../hooks/useProgress'
import { WeeklyTracker } from '../components/WeeklyTracker'

export function MyLearningPage() {
  const state = useProgress()
  const started = careers.filter(
    (career) =>
      state.stages.some((stage) => stage.careerId === career.id) ||
      (state.courses ?? []).some((course) => course.careerId === career.id) ||
      state.activeCareerId === career.id,
  )
  const active = careers.find((career) => career.id === state.activeCareerId) ?? started[0]
  const roadmap = active ? getRoadmapByCareerId(active.id) : undefined
  const activeCourses = active ? resourcesForCareer(active.id) : []
  const progress =
    active && roadmap
      ? overallCareerProgress(active.id, roadmap.stages.length, activeCourses.length)
      : undefined
  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1'

  const nextStage = roadmap?.stages.find(
    (stage) => !state.stages.some((item) => item.stageId === stage.id && item.completed),
  )
  const attempts = readAttempts()
  const badges = getEarnedBadges()

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      <div>
        <Badge>My Learning Hub</Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Keep building your pathway
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
          Your course starts, roadmap completions, and assessment milestones are saved in this browser.
        </p>
      </div>

      <WeeklyTracker />

      {active && roadmap && progress ? (
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Active Career Pathway
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">{active.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {progress.completedStages} of {progress.totalStages} stages completed ·{' '}
                {progress.completedCourses} of {progress.totalCourses} courses finished
              </p>
            </div>
            <div className="w-full lg:max-w-xs">
              <ProgressBar
                value={demoMode ? 45 : progress.percentage}
                label="Pathway progress"
                showValue
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={
                nextStage
                  ? `/career-learning/careers/${active.id}/roadmap/${nextStage.id}`
                  : `/career-learning/careers/${active.id}/roadmap`
              }
            >
              <Button rightIcon={<ArrowRight size={17} />}>
                {nextStage ? 'Continue Learning' : 'Review Completed Roadmap'}
              </Button>
            </Link>
            <Link to={`/career-learning/careers/${active.id}`}>
              <Button variant="secondary">Career Details &amp; Courses</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-10 text-center">
          <BookOpen className="mx-auto text-brand-blue" size={38} />
          <h2 className="mt-4 text-xl font-extrabold text-ink">No pathway started yet</h2>
          <p className="mt-2 text-sm text-muted">
            Explore our 20 career pathways to start courses, follow roadmaps, and earn badges.
          </p>
          <Link className="mt-5 inline-flex" to="/career-learning/careers">
            <Button rightIcon={<ArrowRight size={16} />}>Explore Career Fields</Button>
          </Link>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Assessment Attempts */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-blue" size={22} />
              <h2 className="text-xl font-extrabold text-ink">Assessment Results</h2>
            </div>
            <Link to="/career-learning/assessments">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>

          {attempts.length ? (
            <div className="mt-5 space-y-3">
              {attempts.slice(0, 4).map((attempt) => (
                <Link
                  key={`${attempt.assessmentId}-${attempt.attemptedAt}`}
                  to={`/career-learning/assessments/${attempt.assessmentId}/results`}
                  className="flex items-center justify-between rounded-xl border border-line p-4 transition-all hover:border-blue-200 hover:bg-slate-50"
                >
                  <div>
                    <strong className="block text-sm font-extrabold text-ink">
                      {getAssessmentById(attempt.assessmentId)?.title ??
                        attempt.assessmentId.replace('assessment-', '').replaceAll('-', ' ')}
                    </strong>
                    <span className="text-xs text-muted">
                      {attempt.passed ? 'Passed' : 'Needs review'} · Score {attempt.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-extrabold ${attempt.passed ? 'text-emerald-700' : 'text-slate-600'
                        }`}
                    >
                      {attempt.percentage}%
                    </span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-50 border border-line p-5 text-center text-sm text-muted">
              No assessments attempted yet. Take knowledge checks on roadmap stages to test your understanding.
            </div>
          )}
        </Card>

        {/* Badges Earned */}
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Award className="text-amber-600" size={22} />
              <h2 className="text-xl font-extrabold text-ink">Earned Badges</h2>
            </div>
            <span className="text-sm font-black text-brand-blue">{badges.length} Unlocked</span>
          </div>

          {badges.length ? (
            <div className="mt-5 space-y-3">
              {badges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3.5 rounded-xl border border-line p-4 bg-amber-50/20"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                    <Sparkles size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="font-extrabold text-sm text-ink">{badge.title}</p>
                    <p className="text-xs text-muted">
                      Unlocked on {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl bg-slate-50 border border-line p-5 text-center text-sm text-muted">
              Complete roadmap stages or score 60%+ on assessments to unlock achievement badges.
            </div>
          )}

          <Link className="mt-5 inline-flex" to="/career-learning/badges">
            <Button size="sm" variant="secondary">
              View All Badges
            </Button>
          </Link>
        </Card>
      </div>

      {/* Started Pathways Grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="text-brand-blue" size={22} />
            <h2 className="text-xl font-extrabold text-ink">Active &amp; Started Pathways</h2>
          </div>
          <span className="text-xs font-semibold text-muted">
            {started.length} of {careers.length} explored
          </span>
        </div>

        {started.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {started.map((item) => {
              const itemRoadmap = getRoadmapByCareerId(item.id)
              const itemCourses = resourcesForCareer(item.id)
              const itemProgress = itemRoadmap
                ? overallCareerProgress(item.id, itemRoadmap.stages.length, itemCourses.length)
                : undefined

              return (
                <Link
                  key={item.id}
                  to={`/career-learning/careers/${item.id}`}
                  className="group block rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                      {item.category}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-slate-400 group-hover:translate-x-1 group-hover:text-brand-blue transition-all"
                    />
                  </div>
                  <h3 className="mt-2 text-base font-extrabold text-ink group-hover:text-brand-blue">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {itemProgress?.completedStages ?? 0} of {itemProgress?.totalStages ?? 0} stages ·{' '}
                    {itemProgress?.completedCourses ?? 0} courses
                  </p>
                  <div className="mt-4">
                    <ProgressBar value={itemProgress?.percentage ?? 0} showValue />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-muted">
            Started pathways will appear here as you take courses or roadmap steps.
          </p>
        )}
      </section>
    </div>
  )
}
