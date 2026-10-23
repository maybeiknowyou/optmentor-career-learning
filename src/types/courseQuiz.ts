export type QuestionDomain =
  | 'foundational'
  | 'conceptual'
  | 'application'
  | 'troubleshooting'
  | 'safety-scenario'

export interface CourseMCQ {
  id: string
  careerId: string
  courseId: string
  stageId: string
  topic: string
  domain: QuestionDomain
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  question: string
  options: [string, string, string, string]
  correctAnswer: number // 0, 1, 2, or 3
  explanation: string
  reference?: string
  safetyNote?: string
}

export interface CourseQuizAttempt {
  id: string
  courseId: string
  careerId: string
  stageId: string
  courseTitle: string
  mode: 'practice' | 'full' // 10 questions vs 50 questions
  totalQuestions: number
  score: number
  percentage: number
  passed: boolean // passing >= 70%
  timeSpentSeconds: number
  answers: Record<string, number> // questionId -> selectedOption (0-3)
  attemptedAt: string
}
