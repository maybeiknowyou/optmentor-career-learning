import type { CourseMCQ, CourseQuizAttempt } from '../types/courseQuiz'
import { getQuestionBankForCourse } from '../data/questionBanks'
import { resources } from '../data/resources'
import { recordAssessmentAttempt } from './weeklyTrackerService'

const ATTEMPTS_STORAGE_KEY = 'optmentor.course-quiz-attempts.v1'

/**
 * Reads all stored course quiz attempts safely from localStorage.
 */
export function readCourseAttempts(): CourseQuizAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.warn('Failed to parse course quiz attempts:', err)
    return []
  }
}

/**
 * Gets questions for a course based on mode:
 * - 'full': returns all 50 questions
 * - 'practice': returns 10 questions (2 questions evenly sampled from each of the 5 domains)
 */
export function getCourseQuestionsForQuiz(courseId: string, mode: 'practice' | 'full' = 'full'): CourseMCQ[] {
  const fullBank = getQuestionBankForCourse(courseId)
  if (fullBank.length === 0) return []

  if (mode === 'full') {
    return fullBank
  }

  // Practice mode: pick 10 questions (2 from each domain)
  // Foundational (indices 0..9), Conceptual (10..19), Application (20..29), Troubleshooting (30..39), Safety (40..49)
  const practiceQuestions: CourseMCQ[] = [
    fullBank[1], fullBank[6],   // 2 Foundational
    fullBank[12], fullBank[17], // 2 Conceptual
    fullBank[22], fullBank[27], // 2 Application
    fullBank[32], fullBank[37], // 2 Troubleshooting
    fullBank[42], fullBank[47], // 2 Safety & Scenarios
  ].filter(Boolean)

  return practiceQuestions
}

/**
 * Records a course quiz attempt and syncs with weekly tracker and app progress.
 */
export function saveCourseQuizAttempt(
  data: Omit<CourseQuizAttempt, 'id' | 'attemptedAt'>
): CourseQuizAttempt {
  const attempt: CourseQuizAttempt = {
    ...data,
    id: `attempt-${data.courseId}-${Date.now()}`,
    attemptedAt: new Date().toISOString(),
  }

  const existing = readCourseAttempts()
  const updated = [attempt, ...existing]

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated))
    } catch (err) {
      console.warn('Failed to save course quiz attempt to localStorage:', err)
    }

    // Sync to weekly learning tracker
    recordAssessmentAttempt({
      id: attempt.id,
      title: `${attempt.courseTitle} (${attempt.mode === 'full' ? '50-Q Exam' : 'Practice Quiz'})`,
      score: attempt.percentage,
      passed: attempt.passed,
    })

    // Dispatch global events for real-time reactivity
    window.dispatchEvent(new CustomEvent('optmentor-course-quiz-changed'))
    window.dispatchEvent(new CustomEvent('optmentor-progress-changed'))
  }

  return attempt
}

/**
 * Gets the latest attempt for a given course.
 */
export function getLatestCourseAttempt(courseId: string): CourseQuizAttempt | null {
  const attempts = readCourseAttempts()
  return attempts.find((a) => a.courseId === courseId) || null
}

/**
 * Gets the best attempt (highest percentage) for a given course.
 */
export function getBestCourseAttempt(courseId: string): CourseQuizAttempt | null {
  const attempts = readCourseAttempts().filter((a) => a.courseId === courseId)
  if (attempts.length === 0) return null
  return attempts.reduce((best, cur) => (cur.percentage > best.percentage ? cur : best), attempts[0])
}

/**
 * Gets course metadata by course ID.
 */
export function getCourseById(courseId: string) {
  return resources.find((r) => r.id === courseId) || null
}
