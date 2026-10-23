export { CareerLearningModule } from './app/CareerLearningModule'
export type { CareerLearningModuleProps } from './app/CareerLearningModule'
export { ModuleShell } from './components/layout/ModuleShell'
export type { ShellMode } from './components/layout/ModuleShell'
export { Badge } from './components/ui/Badge'
export { Breadcrumbs } from './components/ui/Breadcrumbs'
export { Button } from './components/ui/Button'
export { Card } from './components/ui/Card'
export { Input } from './components/ui/Input'
export { ProgressBar } from './components/ui/ProgressBar'
export { Tabs } from './components/ui/Tabs'
export { EmptyState, ErrorState, LoadingState } from './components/feedback/States'
export { CareerExplorerPage } from './features/careers/pages/CareerExplorerPage'
export { CareerDetailPage } from './features/careers/pages/CareerDetailPage'
export { CareerResourcesPage } from './features/resources/pages/CareerResourcesPage'
export { RoadmapView } from './features/roadmaps/components/Roadmap'
export { RoadmapPage } from './features/roadmaps/pages/RoadmapPage'
export { RoadmapStagePage } from './features/roadmaps/pages/RoadmapStagePage'
export { MyLearningPage } from './features/learning/pages/MyLearningPage'
export { AssessmentListPage } from './features/assessments/pages/AssessmentListPage'
export { AssessmentPage } from './features/assessments/pages/AssessmentPage'
export { AssessmentResultsPage } from './features/assessments/pages/AssessmentResultsPage'
export { BadgesPage } from './features/badges/pages/BadgesPage'
export { careers, getCareerById } from './data/careers'
export { roadmaps, getRoadmapByCareerId, getStageById } from './data/roadmaps'
export { resources, resourcesForCareer, resourcesForStage, getResourceById, resourceStats } from './data/resources'
export { assessments, getAssessmentById } from './data/assessments'
export { badgeDefinitions, getEarnedBadges } from './data/badges'
export {
  readProgress,
  setActiveCareer,
  visitStage,
  isStageCompleted,
  completeStage,
  startCourse,
  completeCourse,
  getCourseStatus,
  careerProgress,
  careerCourseProgress,
  overallCareerProgress,
} from './services/progressService'
export type {
  Career,
  CareerCategory,
  CareerImageAsset,
  CareerSalaryInfo,
  CareerMarketOutlook,
  CareerOpportunity,
  TrainingInstitution,
} from './types/career'
export type { Roadmap, RoadmapStage, RoadmapDifficulty } from './types/roadmap'
export type { LearningResource, ResourceType, ResourceDifficulty, VerificationStatus } from './types/resource'
export type { StageProgress, CourseProgress, LearningProgressState } from './types/progress'
export type { Assessment, AssessmentQuestion, AssessmentAttempt } from './types/assessment'
export type { BadgeDefinition, EarnedBadge } from './types/badge'
