import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
  Flag,
  ListOrdered,
  ShieldAlert,
  FileCheck2,
} from 'lucide-react'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { ErrorState } from '../../../components/feedback/States'
import {
  getCourseById,
  getCourseQuestionsForQuiz,
  saveCourseQuizAttempt,
  readCourseAttempts,
} from '../../../services/courseQuizService'
import type { CourseQuizAttempt } from '../../../types/courseQuiz'
import { hasCourseEvidence } from '../../../services/courseEvidenceService'

export function CourseQuizPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialMode = (searchParams.get('mode') === 'practice' ? 'practice' : 'full') as 'practice' | 'full'
  const [mode, setMode] = useState<'practice' | 'full'>(initialMode)

  const course = useMemo(() => (courseId ? getCourseById(courseId) : null), [courseId])

  const questions = useMemo(() => {
    if (!courseId) return []
    return getCourseQuestionsForQuiz(courseId, mode)
  }, [courseId, mode])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flagged, setFlagged] = useState<Record<string, boolean>>({})
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all')
  const [savedAttempt, setSavedAttempt] = useState<CourseQuizAttempt | null>(null)

  // Timer
  useEffect(() => {
    if (isSubmitted) return
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isSubmitted])

  // Reset state when switching mode
  function switchMode(newMode: 'practice' | 'full') {
    setMode(newMode)
    setSearchParams({ mode: newMode })
    setCurrentIndex(0)
    setAnswers({})
    setFlagged({})
    setElapsedSeconds(0)
    setIsSubmitted(false)
    setShowSubmitModal(false)
    setSavedAttempt(null)
  }

  function handleSelectOption(optionIndex: number) {
    if (isSubmitted) return
    const currentQ = questions[currentIndex]
    if (!currentQ) return
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }))
  }

  function toggleFlag() {
    const currentQ = questions[currentIndex]
    if (!currentQ) return
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }))
  }

  function handleSubmit() {
    if (!course) return
    setShowSubmitModal(false)

    let correctCount = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })

    const total = questions.length
    const percentage = Math.round((correctCount / total) * 100)
    const passed = percentage >= 70

    const attempt = saveCourseQuizAttempt({
      courseId: course.id,
      careerId: course.careerId,
      stageId: course.stageId,
      courseTitle: course.title,
      mode,
      totalQuestions: total,
      score: correctCount,
      percentage,
      passed,
      timeSpentSeconds: elapsedSeconds,
      answers,
    })

    setSavedAttempt(attempt)
    setIsSubmitted(true)
  }

  function handleRetake() {
    setCurrentIndex(0)
    setAnswers({})
    setFlagged({})
    setElapsedSeconds(0)
    setIsSubmitted(false)
    setShowSubmitModal(false)
    setSavedAttempt(null)
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`
  }

  const reviewQuestions = useMemo(() => {
    if (!isSubmitted) return []
    return questions.filter((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer
      if (reviewFilter === 'incorrect') return !isCorrect
      if (reviewFilter === 'flagged') return flagged[q.id]
      return true
    })
  }, [isSubmitted, questions, answers, flagged, reviewFilter])

  if (!course) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <ErrorState
          title="Course not found"
          description={`The course ID "${courseId}" does not exist in the learning catalog.`}
        />
        <div className="mt-4 text-center">
          <Link to="/career-learning/learning">
            <Button leftIcon={<ArrowLeft size={16} />}>Back to My Learning</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const currentQuestion = questions[currentIndex]
  const allAttempts = readCourseAttempts().filter((a) => a.courseId === course.id)

  if (!hasCourseEvidence(course.id)) {
    return <div className="mx-auto max-w-2xl space-y-6"><Breadcrumbs items={[{ label: 'Careers', to: '/career-learning/careers' }, { label: course.title }, { label: 'Course Quiz' }]} /><Card className="p-8 text-center"><FileCheck2 className="mx-auto text-brand-blue" size={42} /><h1 className="mt-4 text-2xl font-black text-ink">Quiz locked until evidence is submitted</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">Complete the external course, then return to its resource card and use “Submit course evidence”. This confirms your self-reported learning before the quiz is unlocked.</p><Link className="mt-6 inline-flex" to={`/career-learning/careers/${course.careerId}/resources`}><Button leftIcon={<ArrowLeft size={16} />}>Back to Course Resources</Button></Link></Card></div>
  }

  return (
    <div className="mx-auto max-w-[1420px] space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Careers', to: '/career-learning/careers' },
          { label: course.careerId.replace(/-/g, ' '), to: `/career-learning/careers/${course.careerId}/courses` },
          { label: course.title },
          { label: mode === 'full' ? 'Course Exam (50 MCQs)' : 'Practice Quiz (10 MCQs)' },
        ]}
      />

      {/* Top Header Card */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="slate">{course.provider}</Badge>
              <Badge tone={course.difficulty === 'advanced' ? 'amber' : course.difficulty === 'intermediate' ? 'blue' : 'green'}>
                {course.difficulty}
              </Badge>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {course.stageId.split('--')[1]?.replace(/-/g, ' ')}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-black text-ink sm:text-3xl">{course.title} — Assessment</h1>
            <p className="mt-1 text-sm text-muted">{course.description}</p>
          </div>

          {/* Mode Switcher */}
          {!isSubmitted && (
            <div className="flex flex-wrap items-center gap-2 self-start rounded-xl border border-line bg-surface p-1">
              <button
                type="button"
                onClick={() => switchMode('practice')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  mode === 'practice'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 hover:text-ink'
                }`}
              >
                Quick Practice (10 Qs)
              </button>
              <button
                type="button"
                onClick={() => switchMode('full')}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  mode === 'full'
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-600 hover:text-ink'
                }`}
              >
                Comprehensive Exam (50 Qs)
              </button>
            </div>
          )}
        </div>
      </Card>

      {!isSubmitted ? (
        /* ACTIVE QUIZ SCREEN */
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Question Panel */}
          <div className="space-y-6">
            <Card className="p-6 sm:p-8">
              {/* Question Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-brand-blue">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <Badge tone="slate">{currentQuestion.domain.replace('-', ' ')}</Badge>
                  <Badge tone="amber">{currentQuestion.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleFlag}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      flagged[currentQuestion.id]
                        ? 'bg-amber-100 text-amber-800'
                        : 'border border-line text-muted hover:text-ink'
                    }`}
                  >
                    <Flag size={14} className={flagged[currentQuestion.id] ? 'fill-amber-600 text-amber-600' : ''} />
                    {flagged[currentQuestion.id] ? 'Flagged' : 'Flag for review'}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                    <Clock size={15} />
                    <span>{formatTime(elapsedSeconds)}</span>
                  </div>
                </div>
              </div>

              {/* Topic & Learning Objective */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-muted">Topic:</span>{' '}
                <span className="text-xs font-bold text-ink">{currentQuestion.topic}</span>
              </div>

              {/* Question Text */}
              <h2 className="mt-4 text-xl font-extrabold leading-8 text-ink sm:text-2xl">
                {currentQuestion.question}
              </h2>

              {/* 4 Distinct Options */}
              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = answers[currentQuestion.id] === optIdx
                  const optionLabel = String.fromCharCode(65 + optIdx)

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? 'border-brand-blue bg-blue-50/80 shadow-sm ring-1 ring-brand-blue'
                          : 'border-line bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-brand-blue text-white'
                            : 'border border-slate-300 bg-slate-100 text-slate-700'
                        }`}
                      >
                        {optionLabel}
                      </div>
                      <span className={`text-sm leading-relaxed ${isSelected ? 'font-bold text-brand-navy' : 'text-slate-800'}`}>
                        {option}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Bottom Nav Bar */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
                <Button
                  variant="secondary"
                  disabled={currentIndex === 0}
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {currentIndex < totalQuestions - 1 ? (
                    <Button
                      rightIcon={<ArrowRight size={16} />}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => setShowSubmitModal(true)}
                    >
                      Submit Exam ({answeredCount}/{totalQuestions})
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar: Palette & Stats */}
          <aside className="space-y-6">
            {/* Question Navigation Palette */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-ink">Question Palette</h3>
                <span className="text-xs font-bold text-brand-blue">
                  {answeredCount}/{totalQuestions} Answered
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-blue transition-all"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Number Grid (1..10 or 1..50) */}
              <div className={`mt-4 grid gap-1.5 ${mode === 'full' ? 'grid-cols-5' : 'grid-cols-5'}`}>
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined
                  const isCurrent = idx === currentIndex
                  const isFlagged = flagged[q.id]

                  let btnClass = 'border-line bg-white text-slate-700 hover:bg-slate-100'
                  if (isCurrent) {
                    btnClass = 'border-brand-blue bg-brand-blue text-white ring-2 ring-blue-300'
                  } else if (isFlagged) {
                    btnClass = 'border-amber-400 bg-amber-50 text-amber-800 font-bold'
                  } else if (isAnswered) {
                    btnClass = 'border-blue-200 bg-blue-50 text-brand-blue font-bold'
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      aria-label={`Jump to question ${idx + 1}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`grid aspect-square place-items-center rounded-lg border text-xs transition-all ${btnClass}`}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>

              {/* Palette Legend */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-line pt-4 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-brand-blue" />
                  Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full border border-slate-300 bg-white" />
                  Unanswered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-amber-500" />
                  Flagged
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-blue-600 ring-2 ring-blue-300" />
                  Current
                </span>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Finish & Submit Test
                </Button>
              </div>
            </Card>

            {/* Course & Roadmap Info */}
            <Card className="p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Associated Roadmap</h4>
              <p className="mt-1 text-sm font-semibold text-ink">
                {course.stageId.split('--')[1]?.replace(/-/g, ' ')}
              </p>
              <p className="mt-2 text-xs text-muted">
                Passing grade is 70%. Results are stored in your weekly learning record and career progress.
              </p>
              <div className="mt-4">
                <Link to={`/career-learning/careers/${course.careerId}/roadmap`}>
                  <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={14} />}>
                    View Career Roadmap
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      ) : (
        /* COMPLETED REVIEW & RESULTS SCREEN */
        <div className="space-y-6">
          {/* Results Summary Banner */}
          <Card className={`p-8 text-center ${savedAttempt?.passed ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}`}>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-white shadow-sm">
              {savedAttempt?.passed ? (
                <Award size={36} className="text-emerald-600" />
              ) : (
                <AlertTriangle size={36} className="text-rose-600" />
              )}
            </div>

            <h2 className="mt-4 text-3xl font-black text-ink">
              {savedAttempt?.passed ? 'Congratulations! You Passed!' : 'Review & Practice Recommended'}
            </h2>

            <p className="mt-2 text-sm text-slate-700">
              {savedAttempt?.passed
                ? `You achieved ${savedAttempt.percentage}% on the ${mode === 'full' ? '50-question course exam' : 'practice quiz'}, exceeding the 70% passing threshold.`
                : `You scored ${savedAttempt?.percentage}%. A minimum score of 70% is required to achieve mastery certification.`}
            </p>

            {/* Score Grid */}
            <div className="mx-auto mt-6 grid max-w-lg grid-cols-4 gap-3 text-center">
              <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                <div className="text-2xl font-black text-brand-blue">{savedAttempt?.score}</div>
                <div className="text-xs font-semibold text-muted">Correct</div>
              </div>
              <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                <div className="text-2xl font-black text-rose-600">
                  {(savedAttempt?.totalQuestions ?? 0) - (savedAttempt?.score ?? 0)}
                </div>
                <div className="text-xs font-semibold text-muted">Incorrect</div>
              </div>
              <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                <div className="text-2xl font-black text-ink">{savedAttempt?.percentage}%</div>
                <div className="text-xs font-semibold text-muted">Score</div>
              </div>
              <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                <div className="text-2xl font-black text-slate-700">{formatTime(savedAttempt?.timeSpentSeconds ?? 0)}</div>
                <div className="text-xs font-semibold text-muted">Time</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="secondary"
                leftIcon={<RotateCcw size={16} />}
                onClick={handleRetake}
              >
                Retake Assessment
              </Button>
              {mode === 'practice' && (
                <Button
                  variant="primary"
                  leftIcon={<Award size={16} />}
                  onClick={() => switchMode('full')}
                >
                  Take Full 50-Q Exam
                </Button>
              )}
              <Link to="/career-learning/learning">
                <Button variant="ghost" leftIcon={<BookOpen size={16} />}>
                  Return to My Learning
                </Button>
              </Link>
            </div>
          </Card>

          {/* Filter Bar for Review */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-2">
              <ListOrdered size={18} className="text-brand-blue" />
              <h3 className="font-extrabold text-ink">Question Review Breakdown</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  reviewFilter === 'all' ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('incorrect')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Incorrect Only ({questions.filter((q) => answers[q.id] !== q.correctAnswer).length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('flagged')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  reviewFilter === 'flagged' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Flagged ({Object.keys(flagged).filter((k) => flagged[k]).length})
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            {reviewQuestions.map((q) => {
              const userAnswer = answers[q.id]
              const isCorrect = userAnswer === q.correctAnswer

              return (
                <Card key={q.id} className="p-6">
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-ink">
                        Question {questions.findIndex((orig) => orig.id === q.id) + 1}
                      </span>
                      <Badge tone="slate">{q.domain.replace('-', ' ')}</Badge>
                      <Badge tone="amber">{q.difficulty}</Badge>
                      {flagged[q.id] && <Badge tone="amber">Flagged</Badge>}
                    </div>
                    <div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <CheckCircle2 size={16} /> Correct (+1)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                          <XCircle size={16} /> Incorrect (0)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h4 className="mt-3 text-base font-bold text-ink sm:text-lg">{q.question}</h4>

                  {/* Options List */}
                  <div className="mt-4 space-y-2">
                    {q.options.map((option, optIdx) => {
                      const isTargetCorrect = optIdx === q.correctAnswer
                      const isUserChoice = optIdx === userAnswer
                      const letter = String.fromCharCode(65 + optIdx)

                      let optClasses = 'border-line bg-white text-slate-700'
                      if (isTargetCorrect) {
                        optClasses = 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950 ring-1 ring-emerald-500'
                      } else if (isUserChoice && !isCorrect) {
                        optClasses = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold'
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${optClasses}`}
                        >
                          <span className="font-mono font-bold">{letter}.</span>
                          <span className="flex-1">{option}</span>
                          {isTargetCorrect && (
                            <span className="text-xs font-extrabold text-emerald-700">Correct Answer</span>
                          )}
                          {isUserChoice && !isTargetCorrect && (
                            <span className="text-xs font-extrabold text-rose-700">Your Answer</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Authoritative Explanation */}
                  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-slate-800">
                    <p className="font-bold text-brand-navy">Explanation:</p>
                    <p className="mt-1 leading-relaxed">{q.explanation}</p>
                    {q.reference && (
                      <p className="mt-2 text-muted">
                        <span className="font-semibold">Curriculum Reference:</span> {q.reference}
                      </p>
                    )}
                  </div>

                  {/* Safety Callout */}
                  {q.safetyNote && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                      <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-700" />
                      <div>
                        <span className="font-bold">Trade Safety Note:</span> {q.safetyNote}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Past Attempts History */}
          {allAttempts.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-extrabold text-ink">Attempt History for This Course</h3>
              <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
                {allAttempts.map((att) => (
                  <div key={att.id} className="flex flex-wrap items-center justify-between p-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge tone={att.passed ? 'green' : 'amber'}>
                          {att.passed ? 'Passed' : 'Needs Practice'}
                        </Badge>
                        <span className="font-bold text-ink">
                          {att.mode === 'full' ? 'Comprehensive Exam (50 Qs)' : 'Practice Quiz (10 Qs)'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        Attempted on {new Date(att.attemptedAt).toLocaleDateString()} at{' '}
                        {new Date(att.attemptedAt).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-ink">{att.percentage}%</div>
                        <div className="text-xs text-muted">
                          {att.score}/{att.totalQuestions} marks
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-muted">
                        {formatTime(att.timeSpentSeconds)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <Card className="max-w-md p-6">
            <h3 className="text-xl font-extrabold text-ink">Submit Assessment?</h3>
            <p className="mt-2 text-sm text-muted">
              You have answered {answeredCount} of {totalQuestions} questions.
              {answeredCount < totalQuestions && (
                <span className="mt-1 block font-semibold text-amber-600">
                  Warning: You have {totalQuestions - answeredCount} unanswered questions!
                </span>
              )}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
                Back to Questions
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Confirm & Submit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
