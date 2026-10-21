export type RoadmapDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface RoadmapStage {
  id: string
  roadmapId: string
  careerId: string
  order: number
  title: string
  description: string
  difficulty: RoadmapDifficulty
  prerequisiteStageId?: string
  learningObjectives: string[]
}

export interface Roadmap {
  id: string
  careerId: string
  title: string
  description: string
  stages: RoadmapStage[]
}
