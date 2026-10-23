import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ModuleShell, type ShellMode } from '../components/layout/ModuleShell'
import { recordAppOpen } from '../services/weeklyTrackerService'
import { seedDemoProgress } from '../services/progressService'
import { CareerDetailPage } from '../features/careers/pages/CareerDetailPage'
import { CareerExplorerPage } from '../features/careers/pages/CareerExplorerPage'
import { RoadmapPage } from '../features/roadmaps/pages/RoadmapPage'
import { RoadmapStagePage } from '../features/roadmaps/pages/RoadmapStagePage'
import { NotFoundPage } from '../features/placeholders/NotFoundPage'
import { ThemeProvider } from '../context/ThemeProvider'
import { MyLearningPage } from '../features/learning/pages/MyLearningPage'
import { AssessmentListPage } from '../features/assessments/pages/AssessmentListPage'
import { AssessmentPage } from '../features/assessments/pages/AssessmentPage'
import { AssessmentResultsPage } from '../features/assessments/pages/AssessmentResultsPage'
import { CareerResourcesPage } from '../features/resources/pages/CareerResourcesPage'
import { BadgesPage } from '../features/badges/pages/BadgesPage'

import { CourseQuizPage } from '../features/assessments/pages/CourseQuizPage'

export interface CareerLearningModuleProps { shellMode?: ShellMode }

export function CareerLearningModule({ shellMode = 'standalone' }: CareerLearningModuleProps) {
  useEffect(() => {
    recordAppOpen()
    if (new URLSearchParams(window.location.search).get('demo') === '1') seedDemoProgress()
  }, [])
  return (
    <ThemeProvider><ModuleShell mode={shellMode}>
      <Routes>
        <Route path="/" element={<Navigate to="/career-learning/careers" replace />} />
        <Route path="/career-learning" element={<Navigate to="/career-learning/careers" replace />} />
        <Route path="/career-learning/careers" element={<CareerExplorerPage />} />
        <Route path="/career-learning/careers/:careerId" element={<CareerDetailPage />} />
        <Route path="/career-learning/careers/:careerId/roadmap" element={<RoadmapPage />} />
        <Route path="/career-learning/careers/:careerId/roadmap/:stageId" element={<RoadmapStagePage />} />
        <Route path="/career-learning/careers/:careerId/resources" element={<CareerResourcesPage />} />
        <Route path="/career-learning/courses/:courseId" element={<CourseQuizPage />} />
        <Route path="/career-learning/courses/:courseId/quiz" element={<CourseQuizPage />} />
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
