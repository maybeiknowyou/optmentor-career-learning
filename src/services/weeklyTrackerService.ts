import type {
  DailyActivityRecord,
  WeeklySummary,
  WeeklyTrackerStore,
  TrackerDayItem,
  RecommendedAction,
} from '../types/weeklyTracker'
import { getResourceById } from '../data/resources'

const TRACKER_STORAGE_KEY = 'optmentor.weekly-tracker.v1'
const TRACKER_EVENT = 'optmentor-weekly-tracker-change'

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getInitialStore(): WeeklyTrackerStore {
  return {
    version: 1,
    records: {},
    weeklyGoalDays: 5,
  }
}

function loadStore(): WeeklyTrackerStore {
  if (typeof window === 'undefined') return getInitialStore()
  try {
    const raw = window.localStorage.getItem(TRACKER_STORAGE_KEY)
    if (!raw) return getInitialStore()
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.version === 1 && parsed.records) {
      return parsed as WeeklyTrackerStore
    }
  } catch (err) {
    console.error('Error loading weekly tracker from localStorage, resetting:', err)
  }
  return getInitialStore()
}

function saveStore(store: WeeklyTrackerStore): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(store))
    window.dispatchEvent(new Event(TRACKER_EVENT))
  } catch (err) {
    console.error('Error saving weekly tracker to localStorage:', err)
  }
}

function getOrCreateRecordForDate(store: WeeklyTrackerStore, dateStr: string): DailyActivityRecord {
  if (!store.records[dateStr]) {
    store.records[dateStr] = {
      date: dateStr,
      appOpened: false,
      meaningfulLearning: false,
      coursesStarted: [],
      coursesResumed: [],
      coursesCompleted: [],
      milestonesCompleted: [],
      assessmentsAttempted: [],
    }
  }
  return store.records[dateStr]
}

/**
 * Record an application open / login event.
 * Strictly deduplicated by local calendar date.
 * Note: App open alone does NOT mark meaningful learning.
 */
export function recordAppOpen(): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  if (!record.appOpened) {
    record.appOpened = true
    saveStore(store)
  }
}

/**
 * Record a course start. Marks meaningful learning for today.
 */
export function recordCourseStart(courseId: string): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  if (!record.coursesStarted.includes(courseId)) {
    record.coursesStarted.push(courseId)
  }
  record.meaningfulLearning = true
  saveStore(store)
}

/**
 * Record a course resumption. Marks meaningful learning for today.
 */
export function recordCourseResume(courseId: string): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  if (!record.coursesResumed.includes(courseId)) {
    record.coursesResumed.push(courseId)
  }
  record.meaningfulLearning = true
  saveStore(store)
}

/**
 * Record a course completion. Marks meaningful learning for today.
 */
export function recordCourseComplete(courseId: string): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  if (!record.coursesCompleted.includes(courseId)) {
    record.coursesCompleted.push(courseId)
  }
  record.meaningfulLearning = true
  saveStore(store)
}

/**
 * Record milestone completion on roadmap. Marks meaningful learning for today.
 */
export function recordMilestoneComplete(milestoneId: string): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  if (!record.milestonesCompleted.includes(milestoneId)) {
    record.milestonesCompleted.push(milestoneId)
  }
  record.meaningfulLearning = true
  saveStore(store)
}

/**
 * Record assessment attempt and score. Marks meaningful learning for today.
 */
export function recordAssessmentAttempt(attempt: {
  id: string
  title: string
  score: number
  passed: boolean
}): void {
  const store = loadStore()
  const today = getLocalDateString()
  const record = getOrCreateRecordForDate(store, today)

  record.assessmentsAttempted.push({
    ...attempt,
    timestamp: new Date().toISOString(),
  })
  record.meaningfulLearning = true
  saveStore(store)
}

/**
 * Calculate consecutive daily streak of meaningful learning up to today or yesterday.
 */
export function calculateCurrentStreak(records: Record<string, DailyActivityRecord>): number {
  const today = new Date()
  let streak = 0
  let checkDate = new Date(today)

  // If today has learning, start counting from today.
  // Otherwise, if yesterday had learning, start from yesterday so streak doesn't immediately break at 00:01.
  const todayStr = getLocalDateString(checkDate)
  if (!records[todayStr]?.meaningfulLearning) {
    checkDate.setDate(checkDate.getDate() - 1)
    const yesterdayStr = getLocalDateString(checkDate)
    if (!records[yesterdayStr]?.meaningfulLearning) {
      return 0
    }
  }

  while (true) {
    const dStr = getLocalDateString(checkDate)
    if (records[dStr]?.meaningfulLearning) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

/**
 * Calculate the 7-day Monday-to-Sunday range for a given week offset.
 */
function getWeekDays(weekOffset = 0): Date[] {
  const now = new Date()
  // Adjust day to ISO Monday (1) through Sunday (7)
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday ... 6 = Saturday
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay

  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset + weekOffset * 7)
  monday.setHours(0, 0, 0, 0)

  const days: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d)
  }
  return days
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/**
 * Determine the 7-day realistic progression recommendation for the learner.
 * Sequence:
 * Day 1: Begin a course and establish a baseline.
 * Days 2–3: Continue foundational lessons.
 * Days 4–5: Study core skills and complete practical tasks.
 * Day 6: Revise and practice.
 * Day 7: Recommend a test covering the week's learning.
 */
function determineRecommendedAction(
  days: TrackerDayItem[],
  _weekOffset: number,
  allRecords: Record<string, DailyActivityRecord>
): RecommendedAction {
  // Find all active or completed courses across all records
  const allCoursesStarted = new Set<string>()
  const allCoursesCompleted = new Set<string>()

  Object.values(allRecords).forEach((rec) => {
    rec.coursesStarted.forEach((c) => allCoursesStarted.add(c))
    rec.coursesResumed.forEach((c) => allCoursesStarted.add(c))
    rec.coursesCompleted.forEach((c) => {
      allCoursesStarted.add(c)
      allCoursesCompleted.add(c)
    })
  })

  // Count meaningful learning days in this week
  const weekLearningDays = days.filter((d) => d.meaningfulLearning).length
  const todayItem = days.find((d) => d.isToday)
  const currentDaySeq = todayItem ? todayItem.daySequenceNumber : 7

  const firstCourseId = Array.from(allCoursesStarted)[0] || 'course-cybersecurity-ethical-hacking-1'
  const firstCourse = getResourceById(firstCourseId)
  const courseTitle = firstCourse ? firstCourse.title : 'Selected Pathway Course'

  // If learner has not started any course yet -> Day 1 recommendation
  if (allCoursesStarted.size === 0) {
    return {
      daySequenceNumber: 1,
      dayTitle: 'Day 1: Begin a Course & Establish Baseline',
      description: 'Start your vocational learning journey today. Select your primary career pathway and enroll in your first foundational course.',
      actionLabel: 'Explore Pathways & Start Course',
      actionRoute: '/career-learning',
      isDay7Test: false,
      readyForTest: false,
    }
  }

  // Day 7: Check if it's Day 7 (Sunday) or if learner has completed 4+ learning days this week
  if (currentDaySeq === 7 || weekLearningDays >= 5) {
    // Check if learner has completed enough material
    const hasEnoughMaterial = allCoursesCompleted.size > 0 || weekLearningDays >= 3
    if (hasEnoughMaterial) {
      return {
        daySequenceNumber: 7,
        dayTitle: 'Day 7: Weekly Mastery & Practice Test',
        description: `You have completed active study this week! Take the Day 7 course-specific assessment on "${courseTitle}" to benchmark your progress.`,
        actionLabel: 'Take Day 7 Course Assessment (50 MCQs)',
        actionRoute: `/career-learning/courses/${firstCourseId}/quiz`,
        isDay7Test: true,
        readyForTest: true,
        suggestedCourseId: firstCourseId,
        suggestedCourseTitle: courseTitle,
      }
    } else {
      return {
        daySequenceNumber: 7,
        dayTitle: 'Day 7: Revision Recommended Before Testing',
        description: `You haven't completed enough study modules on "${courseTitle}" yet. Review the core lessons before taking the weekly test.`,
        actionLabel: 'Resume Course Lessons First',
        actionRoute: `/career-learning/courses/${firstCourseId}`,
        isDay7Test: true,
        readyForTest: false,
        suggestedCourseId: firstCourseId,
        suggestedCourseTitle: courseTitle,
      }
    }
  }

  // Day 6: Revise and practice
  if (currentDaySeq === 6 || weekLearningDays === 4) {
    return {
      daySequenceNumber: 6,
      dayTitle: 'Day 6: Revise & Practice Knowledge Checks',
      description: `Review your study notes, key formulas, and practical steps from "${courseTitle}". Take a 10-question practice quiz to prepare for tomorrow's Day 7 test.`,
      actionLabel: 'Take Practice Quiz (10 MCQs)',
      actionRoute: `/career-learning/courses/${firstCourseId}/quiz?mode=practice`,
      isDay7Test: false,
      readyForTest: true,
      suggestedCourseId: firstCourseId,
      suggestedCourseTitle: courseTitle,
    }
  }

  // Days 4–5: Core practical skills
  if (currentDaySeq >= 4 || weekLearningDays >= 2) {
    return {
      daySequenceNumber: currentDaySeq,
      dayTitle: 'Days 4–5: Study Core Skills & Practical Tasks',
      description: `Deepen your technical competence on "${courseTitle}". Complete the hands-on lab exercises and apply safety procedures.`,
      actionLabel: 'Continue Practical Modules',
      actionRoute: `/career-learning/courses/${firstCourseId}`,
      isDay7Test: false,
      readyForTest: false,
      suggestedCourseId: firstCourseId,
      suggestedCourseTitle: courseTitle,
    }
  }

  // Days 2–3: Foundational lessons
  return {
    daySequenceNumber: currentDaySeq,
    dayTitle: 'Days 2–3: Continue Foundational Lessons',
    description: `Build steady momentum on "${courseTitle}". Study the core theory, standard definitions, and foundational concepts.`,
    actionLabel: 'Resume Learning',
    actionRoute: `/career-learning/courses/${firstCourseId}`,
    isDay7Test: false,
    readyForTest: false,
    suggestedCourseId: firstCourseId,
    suggestedCourseTitle: courseTitle,
  }
}

/**
 * Get the complete 7-day weekly tracker summary.
 * Allows navigating between weeks via weekOffset without modifying underlying history.
 */
export function getWeeklySummary(weekOffset = 0): WeeklySummary {
  const store = loadStore()
  const weekDates = getWeekDays(weekOffset)
  const todayStr = getLocalDateString()

  const days: TrackerDayItem[] = weekDates.map((dateObj, idx) => {
    const dStr = getLocalDateString(dateObj)
    const rec = store.records[dStr] || null
    const isToday = dStr === todayStr
    const isFuture = dStr > todayStr

    const activityCount = rec
      ? rec.coursesStarted.length +
        rec.coursesResumed.length +
        rec.coursesCompleted.length +
        rec.milestonesCompleted.length +
        rec.assessmentsAttempted.length
      : 0

    return {
      dayIndex: idx,
      dayName: DAY_NAMES[idx],
      daySequenceNumber: idx + 1,
      date: dStr,
      isToday,
      isFuture,
      appOpened: rec?.appOpened ?? false,
      meaningfulLearning: rec?.meaningfulLearning ?? false,
      activityCount,
      details: rec,
    }
  })

  const learningDaysCount = days.filter((d) => d.meaningfulLearning).length
  const loginDaysCount = days.filter((d) => d.appOpened).length
  const currentStreak = calculateCurrentStreak(store.records)

  const completedActivitiesCount = days.reduce((sum, d) => sum + d.activityCount, 0)
  const recommendedAction = determineRecommendedAction(days, weekOffset, store.records)

  return {
    weekStartDate: days[0].date,
    weekEndDate: days[6].date,
    weekOffset,
    days,
    weeklyGoalDays: store.weeklyGoalDays || 5,
    learningDaysCount,
    loginDaysCount,
    currentStreak,
    completedActivitiesCount,
    recommendedAction,
  }
}

/**
 * Subscribe to weekly tracker changes across tabs and local actions.
 */
export function subscribeToWeeklyTracker(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handler = () => callback()
  window.addEventListener(TRACKER_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(TRACKER_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
