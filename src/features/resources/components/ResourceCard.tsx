import { Check, CheckCircle2, Copy, ExternalLink, Heart, Play, Clock, Sparkles, HelpCircle, FileCheck2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import type { LearningResource } from '../../../types/resource'
import {
  isResourceBookmarked,
  markResourceVisited,
  toggleResourceBookmark,
} from '../../../services/resourcePreferences'
import {
  startCourse,
  completeCourse,
  getCourseStatus,
} from '../../../services/progressService'
import { getCourseEvidence, saveCourseEvidence } from '../../../services/courseEvidenceService'

export function ResourceCard({ resource }: { resource: LearningResource }) {
  const [bookmarked, setBookmarked] = useState(() => isResourceBookmarked(resource.id))
  const [copied, setCopied] = useState(false)
  const [courseStatus, setCourseStatus] = useState(() => getCourseStatus(resource.id))
  const [evidence, setEvidence] = useState(() => getCourseEvidence(resource.id))
  const [showEvidence, setShowEvidence] = useState(false)
  const [evidenceText, setEvidenceText] = useState(() => getCourseEvidence(resource.id)?.evidence ?? '')
  const [evidenceImage, setEvidenceImage] = useState(() => getCourseEvidence(resource.id)?.imageDataUrl ?? '')

  useEffect(() => {
    function onProgressUpdate() {
      setCourseStatus(getCourseStatus(resource.id))
    }
    window.addEventListener('optmentor-progress-changed', onProgressUpdate)
    function onEvidenceUpdate() { setEvidence(getCourseEvidence(resource.id)) }
    window.addEventListener('optmentor-course-evidence-changed', onEvidenceUpdate)
    return () => { window.removeEventListener('optmentor-progress-changed', onProgressUpdate); window.removeEventListener('optmentor-course-evidence-changed', onEvidenceUpdate) }
  }, [resource.id])

  async function copyLink() {
    await navigator.clipboard?.writeText(resource.url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  function handleOpenCourse() {
    startCourse(resource.careerId, resource.id)
    markResourceVisited(resource.id)
    setCourseStatus(getCourseStatus(resource.id))
  }

  function handleToggleComplete() {
    if (courseStatus === 'completed') {
      startCourse(resource.careerId, resource.id)
    } else {
      completeCourse(resource.careerId, resource.id)
    }
    setCourseStatus(getCourseStatus(resource.id))
  }

  const isCompleted = courseStatus === 'completed'
  const isInProgress = courseStatus === 'in-progress'

  return (
    <Card className="interactive-lift flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={resource.verificationStatus === 'verified' ? 'green' : 'slate'}>
              {resource.verificationStatus === 'verified' ? 'Verified Resource' : 'Pending Verification'}
            </Badge>
            {isCompleted && <Badge tone="green">Completed</Badge>}
            {isInProgress && <Badge tone="blue">In Progress</Badge>}
          </div>
          <h3 className="text-lg font-extrabold text-ink">{resource.title}</h3>
          <p className="text-sm font-semibold text-brand-blue">{resource.provider}</p>
        </div>
        <button
          type="button"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
          onClick={() => {
            setBookmarked(toggleResourceBookmark(resource.id))
          }}
          className={`rounded-lg p-2 transition-colors ${
            bookmarked ? 'bg-blue-50 text-brand-blue' : 'text-slate-400 hover:bg-slate-100'
          }`}
        >
          <Heart size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{resource.description}</p>

      {resource.skillsCovered && resource.skillsCovered.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {resource.skillsCovered.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <Badge tone="blue">{resource.difficulty}</Badge>
        <Badge tone="slate">{resource.type}</Badge>
        {resource.duration && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
            <Clock size={12} />
            {resource.duration}
          </span>
        )}
        <Badge tone="green">
          {resource.freeAccessStatus === 'free'
            ? 'Free access'
            : resource.freeAccessStatus === 'partially-free'
            ? 'Partly free'
            : 'Access to confirm'}
        </Badge>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>
          Certificate:{' '}
          {resource.certificateStatus === 'paid'
            ? 'Optional / Paid'
            : resource.certificateStatus === 'free'
            ? 'Free Certificate'
            : resource.certificateStatus === 'not-offered'
            ? 'Not offered'
            : 'Not specified'}
        </span>
        {resource.hasPracticalActivity && (
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <Sparkles size={12} />
            Hands-on Activity
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-line">
        <a
          className="inline-flex flex-1"
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          onClick={handleOpenCourse}
        >
          <Button
            className="w-full"
            variant={isCompleted ? 'secondary' : 'primary'}
            leftIcon={isInProgress ? <Play size={15} /> : undefined}
            rightIcon={<ExternalLink size={15} />}
          >
            {isCompleted ? 'Review Course' : isInProgress ? 'Continue Learning' : 'Start Course'}
          </Button>
        </a>

        <Link
          to={evidence ? `/career-learning/courses/${resource.id}/quiz` : '#'}
          className="inline-flex"
          onClick={(event) => { if (!evidence) { event.preventDefault(); setShowEvidence(true) } }}
        >
          <Button
            variant="secondary"
            title={evidence ? 'Take course quiz and 50-MCQ assessment' : 'Submit course evidence to unlock the quiz'}
            leftIcon={<HelpCircle size={15} />}
          >
            {evidence ? 'Quiz (50 Qs)' : 'Unlock Quiz'}
          </Button>
        </Link>

        <Button
          variant={isCompleted ? 'success' : 'secondary'}
          title={isCompleted ? 'Mark as Incomplete' : 'Mark Course as Completed'}
          aria-label={isCompleted ? 'Mark as Incomplete' : 'Mark Course as Completed'}
          onClick={handleToggleComplete}
          className="px-3"
        >
          <CheckCircle2 size={17} className={isCompleted ? 'text-white' : 'text-slate-500'} />
        </Button>

        <Button variant={evidence ? 'success' : 'secondary'} title={evidence ? 'Evidence submitted' : 'Submit evidence of course completion'} onClick={() => setShowEvidence(true)} className="px-3" aria-label="Submit course evidence">
          <FileCheck2 size={17} />
        </Button>

        <Button
          variant="secondary"
          aria-label="Copy course link"
          title={copied ? 'Link copied' : 'Copy course link'}
          onClick={copyLink}
          className="px-3"
        >
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        </Button>
      </div>
      {showEvidence && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"><Card className="w-full max-w-md p-6"><h3 className="text-xl font-extrabold text-ink">{evidence ? 'Update course evidence' : 'Submit course evidence'}</h3><p className="mt-2 text-sm text-muted">Add a certificate link, project link, screenshot reference, or a short note confirming what you completed. This is self-reported evidence.</p><textarea value={evidenceText} onChange={(event) => setEvidenceText(event.target.value)} rows={3} className="mt-4 w-full rounded-xl border border-line bg-surface p-3 text-sm text-ink outline-none focus:border-brand-blue" placeholder="Paste a link or describe your completed work…" /><label className="mt-4 block text-sm font-bold text-ink">Certificate or completion image <input type="file" accept="image/png,image/jpeg,image/webp" className="mt-2 block w-full rounded-xl border border-line bg-surface p-3 text-sm text-muted" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 2 * 1024 * 1024) { window.alert('Please choose an image smaller than 2 MB.'); return } const reader = new FileReader(); reader.onload = () => setEvidenceImage(String(reader.result)); reader.readAsDataURL(file) }} /></label>{evidenceImage && <img src={evidenceImage} alt="Uploaded course completion evidence preview" className="mt-3 max-h-32 rounded-xl border border-line object-contain" />}<div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setShowEvidence(false)}>Cancel</Button><Button disabled={!evidenceText.trim() && !evidenceImage} onClick={() => { const saved = saveCourseEvidence(resource.id, evidenceText || 'Completion image attached', evidenceImage || undefined); setEvidence(saved); setShowEvidence(false) }}>Save Evidence</Button></div></Card></div>}
    </Card>
  )
}
