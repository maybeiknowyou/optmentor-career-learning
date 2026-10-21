import { Navigate, Route, Routes } from 'react-router-dom'
import { ModuleShell, type ShellMode } from '../components/layout/ModuleShell'
import { CareerDetailPage } from '../features/careers/pages/CareerDetailPage'
import { CareerExplorerPage } from '../features/careers/pages/CareerExplorerPage'
import { RoadmapPage } from '../features/roadmaps/pages/RoadmapPage'
import { RoadmapStagePage } from '../features/roadmaps/pages/RoadmapStagePage'
import { NotFoundPage } from '../features/placeholders/NotFoundPage'
import { PlaceholderPage } from '../features/placeholders/PlaceholderPage'
import { ThemeProvider } from '../context/ThemeProvider'
import { MyLearningPage } from '../features/learning/pages/MyLearningPage'
import { AssessmentListPage } from '../features/assessments/pages/AssessmentListPage'
import { AssessmentPage } from '../features/assessments/pages/AssessmentPage'
import { AssessmentResultsPage } from '../features/assessments/pages/AssessmentResultsPage'
import { BadgesPage } from '../features/badges/pages/BadgesPage'

export interface CareerLearningModuleProps { shellMode?: ShellMode }

export function CareerLearningModule({ shellMode = 'standalone' }: CareerLearningModuleProps) {
  return (
    <ThemeProvider><ModuleShell mode={shellMode}>
      <Routes>
        <Route path="/" element={<Navigate to="/career-learning/careers" replace />} />
        <Route path="/career-learning" element={<Navigate to="/career-learning/careers" replace />} />
        <Route path="/career-learning/careers" element={<CareerExplorerPage />} />
        <Route path="/career-learning/careers/:careerId" element={<CareerDetailPage />} />
        <Route path="/career-learning/careers/:careerId/roadmap" element={<RoadmapPage />} />
        <Route path="/career-learning/careers/:careerId/roadmap/:stageId" element={<RoadmapStagePage />} />
        <Route path="/career-learning/careers/:careerId/resources" element={<PlaceholderPage eyebrow="Learning Resources" title="Free Learning Resources" description="Verified external courses, videos, documentation and labs will be organized here without fabricating availability claims." phase="Phase 4" />} />
        <Route path="/career-learning/assessments" element={<AssessmentListPage />} />
        <Route path="/career-learning/assessments/:assessmentId" element={<AssessmentPage />} />
        <Route path="/career-learning/assessments/:assessmentId/results" element={<AssessmentResultsPage />} />
        <Route path="/career-learning/learning" element={<MyLearningPage />} />
        <Route path="/career-learning/badges" element={<BadgesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ModuleShell></ThemeProvider>
  )
}
