export interface StageProgress { careerId: string; stageId: string; completed: boolean; completedAt?: string }
export interface LearningProgressState { activeCareerId?: string; lastVisitedStage?: { careerId: string; stageId: string }; stages: StageProgress[] }
