export interface AssessmentQuestion { id: string; prompt: string; options: string[]; correctAnswer: number; explanation: string }
export interface Assessment { id: string; careerId: string; stageId: string; title: string; description: string; passingPercentage: number; questions: AssessmentQuestion[] }
export interface AssessmentAttempt { assessmentId: string; careerId: string; stageId: string; score: number; percentage: number; passed: boolean; attemptedAt: string; answers?: Record<string, number> }
