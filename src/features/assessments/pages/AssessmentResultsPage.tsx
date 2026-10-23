import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../../../components/feedback/States'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { getAssessmentById } from '../../../data/assessments'
import { latestAttempt } from '../../../services/assessmentService'

export function AssessmentResultsPage() {
  const { assessmentId } = useParams()
  const assessment = getAssessmentById(assessmentId)
  const attempt = assessment ? latestAttempt(assessment.id) : undefined

  if (!assessment || !attempt) {
    return (
      <div className="mx-auto max-w-2xl">
        <ErrorState
          title="Assessment result not found"
          description="Complete an assessment before opening its result page."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="p-7 text-center sm:p-10">
        <Badge tone={attempt.passed ? 'green' : 'slate'}>
          {attempt.passed ? 'Passed Successfully' : 'Did Not Pass'}
        </Badge>

        <h1 className="mt-4 text-3xl font-extrabold text-ink">{assessment.title} Results</h1>
        <p className="mt-2 text-sm text-muted">
          Your attempt was saved locally on {new Date(attempt.attemptedAt).toLocaleString()}.
        </p>

        <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-4">
          <div className="rounded-2xl bg-brand-blue-soft p-5">
            <p className="text-3xl font-black text-brand-navy">
              {attempt.score} / {assessment.questions.length}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">Questions Correct</p>
          </div>
          <div className="rounded-2xl bg-brand-blue-soft p-5">
            <p className="text-3xl font-black text-brand-navy">{attempt.percentage}%</p>
            <p className="mt-1 text-xs font-semibold text-muted">
              Passing Mark: {assessment.passingPercentage}%
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={`/career-learning/assessments/${assessment.id}`}>
            <Button leftIcon={<RotateCcw size={17} />}>Retake Assessment</Button>
          </Link>
          <Link to={`/career-learning/careers/${assessment.careerId}/roadmap`}>
            <Button variant="secondary" leftIcon={<ArrowLeft size={17} />}>
              Back to Roadmap
            </Button>
          </Link>
          <Link to={`/career-learning/careers/${assessment.careerId}`}>
            <Button variant="ghost">Career Details</Button>
          </Link>
        </div>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-ink">Answer Review &amp; Explanations</h2>
          <p className="text-sm text-muted">
            Review your answers, correct options, and conceptual explanations.
          </p>
        </div>

        <div className="space-y-4">
          {assessment.questions.map((question, index) => {
            const userAnswerIndex = attempt.answers ? attempt.answers[question.id] : undefined
            const isCorrect = userAnswerIndex === question.correctAnswer

            return (
              <Card key={question.id} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-muted">
                      Question {index + 1}
                    </span>
                    {userAnswerIndex !== undefined && (
                      <Badge tone={isCorrect ? 'green' : 'slate'}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    )}
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 size={20} className="text-success shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-rose-500 shrink-0" />
                  )}
                </div>

                <h3 className="mt-3 text-base font-extrabold text-ink">{question.prompt}</h3>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
                  {question.options.map((option, optIdx) => {
                    const isSelected = userAnswerIndex === optIdx
                    const isRightAnswer = optIdx === question.correctAnswer

                    let itemStyle = 'border-line text-slate-700 bg-white'
                    if (isRightAnswer) {
                      itemStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold'
                    } else if (isSelected && !isRightAnswer) {
                      itemStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-semibold'
                    }

                    return (
                      <div
                        key={option}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 ${itemStyle}`}
                      >
                        <span className="font-bold text-xs">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{option}</span>
                        {isRightAnswer && (
                          <span className="text-[11px] font-bold text-emerald-700 uppercase">
                            (Correct)
                          </span>
                        )}
                        {isSelected && !isRightAnswer && (
                          <span className="text-[11px] font-bold text-rose-700 uppercase">
                            (Your choice)
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 border border-line p-3.5 text-xs leading-5 text-muted">
                  <strong className="text-ink">Explanation:</strong> {question.explanation}
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
