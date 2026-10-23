export interface AssessmentRecordItem {
  id: string
  title: string
  score: number
  passed: boolean
  timestamp: string
}

export interface DailyActivityRecord {
  date: string // ISO 'YYYY-MM-DD'
  appOpened: boolean
  meaningfulLearning: boolean
  coursesStarted: string[]
  coursesResumed: string[]
  coursesCompleted: string[]
  milestonesCompleted: string[]
  assessmentsAttempted: AssessmentRecordItem[]
}

export interface TrackerDayItem {
  dayIndex: number // 0..6 (Monday = 0, Sunday = 6)
  dayName: string // 'Mon', 'Tue', etc.
  daySequenceNumber: number // 1..7 (for 7-day learning progression)
  date: string // 'YYYY-MM-DD'
  isToday: boolean
  isFuture: boolean
  appOpened: boolean
  meaningfulLearning: boolean
  activityCount: number
  details: DailyActivityRecord | null
}

export interface RecommendedAction {
  daySequenceNumber: number // 1..7
  dayTitle: string
  description: string
  actionLabel: string
  actionRoute: string
  isDay7Test?: boolean
  readyForTest?: boolean
  suggestedCourseId?: string
  suggestedCourseTitle?: string
}

export interface WeeklySummary {
  weekStartDate: string
  weekEndDate: string
  weekOffset: number
  days: TrackerDayItem[]
  weeklyGoalDays: number
  learningDaysCount: number
  loginDaysCount: number
  currentStreak: number
  completedActivitiesCount: number
  recommendedAction: RecommendedAction
}

export interface WeeklyTrackerStore {
  version: number
  records: Record<string, DailyActivityRecord>
  weeklyGoalDays: number
}
