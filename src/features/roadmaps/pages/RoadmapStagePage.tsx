import { ArrowLeft, CheckCircle2, CircleCheck, LockKeyhole } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../../../components/feedback/States'
import { Badge } from '../../../components/ui/Badge'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { getCareerById } from '../../../data/careers'
import { getRoadmapByCareerId, getStageById, getStageStatus } from '../../../data/roadmaps'
import { getAssessmentById } from '../../../data/assessments'
import { resourcesForStage } from '../../../data/resources'
import { ResourceList } from '../../resources/components/ResourceList'
import { completeStage, visitStage, careerProgress } from '../../../services/progressService'
import { useProgress } from '../../../hooks/useProgress'

export function RoadmapStagePage() {
  const { careerId, stageId } = useParams()
  const career = getCareerById(careerId)
  const roadmap = getRoadmapByCareerId(careerId)
  const stage = getStageById(careerId, stageId)
  const progressState = useProgress()
  useEffect(() => { if (career && stage) visitStage(career.id, stage.id) }, [career, stage])

  if (!career || !roadmap || !stage) return <div className="mx-auto max-w-2xl"><ErrorState title="Roadmap stage not found" description="This stage ID is not part of the selected career roadmap." /></div>

  const completed = progressState.stages.some((item) => item.careerId === career.id && item.stageId === stage.id && item.completed)
  const prerequisiteComplete = !stage.prerequisiteStageId || progressState.stages.some((item) => item.careerId === career.id && item.stageId === stage.prerequisiteStageId && item.completed)
  const available = completed || prerequisiteComplete || getStageStatus(stage) === 'available'
  const stageIndex = roadmap.stages.findIndex((item) => item.id === stage.id)
  const nextStage = roadmap.stages[stageIndex + 1]
  const progress = careerProgress(career.id, roadmap.stages.length)
  const stageResources = resourcesForStage(career.id, stage.id)
  const assessment = getAssessmentById(`assessment-${career.id}`) ?? (career.id === 'cybersecurity-ethical-hacking' && stage.order === 1 ? getAssessmentById('assessment-cybersecurity-networking') : undefined)
  const careerKey = career.id
  const stageKey = stage.id
  function markComplete() { if (available && !completed) completeStage(careerKey, stageKey) }
  return <div className="mx-auto max-w-4xl space-y-6"><Breadcrumbs items={[{ label: 'Career Fields', to: '/career-learning/careers' }, { label: career.title, to: `/career-learning/careers/${career.id}` }, { label: 'Roadmap', to: `/career-learning/careers/${career.id}/roadmap` }, { label: stage.title }]} /><Card className="overflow-hidden"><div className="bg-brand-navy px-6 py-7 text-white sm:px-8"><div className="flex flex-wrap items-center gap-2"><Badge className="bg-white/10 text-blue-100">Stage {stage.order}</Badge><Badge tone={completed ? 'green' : available ? 'blue' : 'slate'}>{completed ? 'Completed' : available ? 'Available' : 'Locked preview'}</Badge></div><h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{stage.title}</h1><p className="mt-3 max-w-2xl text-blue-100">{stage.description}</p></div><div className="space-y-7 p-6 sm:p-8"><div className="flex items-start gap-3 rounded-2xl border border-line bg-slate-50 p-4"><span className={completed ? 'text-success' : available ? 'text-brand-blue' : 'text-slate-500'}>{completed ? <CircleCheck size={22} /> : available ? <CheckCircle2 size={22} /> : <LockKeyhole size={22} />}</span><div><p className="font-bold text-ink">{completed ? 'Self-reported completion saved' : available ? 'This stage is available to begin' : 'This stage is a locked preview'}</p><p className="mt-1 text-sm leading-6 text-muted">{completed ? 'This records your own learning completion; it does not verify completion of an external course.' : available ? 'Mark the stage complete after you have finished the learning materials.' : 'Prerequisites are not complete yet. You can preview this stage, but cannot mark it completed.'}</p></div></div><div><h2 className="text-xl font-extrabold text-ink">Learning objectives</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{stage.learningObjectives.map((objective) => <li key={objective} className="flex gap-3 rounded-xl border border-line p-4 text-sm leading-6 text-muted"><span className="mt-1 size-2 shrink-0 rounded-full bg-brand-blue" />{objective}</li>)}</ul></div>{stage.prerequisiteStageId && <div className="rounded-xl bg-brand-blue-soft p-4 text-sm text-slate-700"><strong>Prerequisite:</strong> Complete the previous roadmap stage before this stage becomes available.</div>}<section><h2 className="mb-4 text-xl font-extrabold text-ink">Recommended learning resources</h2><ResourceList resources={stageResources} /></section>{assessment && <section className="rounded-2xl border border-blue-100 bg-brand-blue-soft p-5"><h2 className="font-extrabold text-brand-navy">Knowledge check</h2><p className="mt-1 text-sm text-slate-700">Test the concepts from this roadmap stage with a short MCQ assessment.</p><Link className="mt-4 inline-flex" to={`/career-learning/assessments/${assessment.id}`}><Button rightIcon={<ArrowLeft className="rotate-180" size={17} />}>Take Assessment</Button></Link></section>}<div className="rounded-2xl border border-line p-5"><div className="flex items-center justify-between gap-4"><div><p className="font-extrabold text-ink">Pathway progress</p><p className="mt-1 text-sm text-muted">{progress.completed} of {progress.total} stages completed</p></div><span className="text-xl font-extrabold text-brand-blue">{progress.percentage}%</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-brand-blue" style={{ width: `${progress.percentage}%` }} /></div></div><div className="flex flex-wrap gap-3"><Button variant={completed ? 'success' : 'primary'} disabled={!available || completed} leftIcon={<CheckCircle2 size={17} />} onClick={markComplete}>{completed ? 'Stage Completed' : 'Mark Stage as Completed'}</Button>{completed && nextStage && <Link to={`/career-learning/careers/${career.id}/roadmap/${nextStage.id}`}><Button rightIcon={<ArrowLeft className="rotate-180" size={17} />}>Continue to Next Stage</Button></Link>}<Link to={`/career-learning/careers/${career.id}/roadmap`}><Button variant="secondary" leftIcon={<ArrowLeft size={17} />}>Back to Roadmap</Button></Link><Link to={`/career-learning/careers/${career.id}`}><Button variant="ghost">Back to Career Details</Button></Link></div></div></Card></div>
}
