export type ResourceType = 'course' | 'video' | 'documentation' | 'lab' | 'reading'
export type ResourceDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type VerificationStatus = 'verified' | 'pending'

export interface LearningResource {
  id: string
  careerId: string
  stageId: string
  title: string
  provider: string
  url: string
  type: ResourceType
  difficulty: ResourceDifficulty
  description: string
  freeAccessStatus: 'free' | 'partially-free' | 'unknown'
  certificateStatus: 'free' | 'paid' | 'not-offered' | 'unknown'
  verificationStatus: VerificationStatus
  duration?: string
  skillsCovered?: string[]
  learningOutcomes?: string[]
  prerequisites?: string
  completionCriteria?: string
  hasPracticalActivity?: boolean
  signInRequired?: boolean
  dateChecked?: string
}
