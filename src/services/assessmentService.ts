import type { AssessmentAttempt } from '../types/assessment'
import { recordAssessmentAttempt } from './weeklyTrackerService'

const KEY = 'optmentor.assessment-attempts.v1'
export function readAttempts(): AssessmentAttempt[] { try { return JSON.parse(window.localStorage.getItem(KEY) ?? '[]') as AssessmentAttempt[] } catch { return [] } }
export function saveAttempt(input: Omit<AssessmentAttempt, 'attemptedAt'> & { attemptedAt?: string }) {
  const attempt: AssessmentAttempt = { ...input, attemptedAt: input.attemptedAt ?? new Date().toISOString() }
  const attempts = [attempt, ...readAttempts().filter((item) => !(item.assessmentId === attempt.assessmentId && item.attemptedAt === attempt.attemptedAt))]
  window.localStorage.setItem(KEY, JSON.stringify(attempts))
  recordAssessmentAttempt({
    id: attempt.assessmentId,
    title: attempt.assessmentId,
    score: attempt.percentage,
    passed: attempt.passed,
  })
  window.dispatchEvent(new CustomEvent('optmentor-assessment-changed'))
  window.dispatchEvent(new CustomEvent('optmentor-progress-changed'))
  return attempt
}
export function latestAttempt(assessmentId: string) { return readAttempts().find((attempt) => attempt.assessmentId === assessmentId) }
