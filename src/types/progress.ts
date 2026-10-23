export interface StageProgress {
  careerId: string
  stageId: string
  completed: boolean
  completedAt?: string
}

export interface CourseProgress {
  courseId: string
  careerId: string
  status: 'in-progress' | 'completed'
  startedAt: string
  completedAt?: string
}

export interface LearningProgressState {
  activeCareerId?: string
  lastVisitedStage?: { careerId: string; stageId: string }
  stages: StageProgress[]
  courses?: CourseProgress[]
}
