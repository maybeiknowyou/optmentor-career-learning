import type { LearningProgressState, CourseProgress } from '../types/progress'
import {
  recordCourseStart,
  recordCourseComplete,
  recordMilestoneComplete,
} from './weeklyTrackerService'
import { roadmaps } from '../data/roadmaps'

const STORAGE_KEY = 'optmentor.learning-progress.v1'
const emptyState = (): LearningProgressState => ({ stages: [], courses: [] })

export function seedDemoProgress() {
  const state = readProgress()
  if (state.stages.length > 0 || state.courses?.length) return state
  const roadmap = roadmaps.find((item) => item.careerId === 'cybersecurity-ethical-hacking')
  if (!roadmap) return state
  const completed = roadmap.stages.slice(0, 2).map((stage) => ({
    careerId: roadmap.careerId,
    stageId: stage.id,
    completed: true,
    completedAt: '2026-10-23T00:00:00.000Z',
  }))
  return writeProgress({
    ...state,
    activeCareerId: roadmap.careerId,
    lastVisitedStage: { careerId: roadmap.careerId, stageId: roadmap.stages[2]?.id ?? roadmap.stages[1].id },
    stages: completed,
    courses: Array.from({ length: 4 }, (_, index) => ({
      courseId: `demo-course-${index + 1}`,
      careerId: roadmap.careerId,
      status: 'completed' as const,
      startedAt: '2026-10-23T00:00:00.000Z',
      completedAt: '2026-10-23T00:00:00.000Z',
    })),
  })
}

export function readProgress(): LearningProgressState {
  if (typeof window === 'undefined') return emptyState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as LearningProgressState
    return {
      stages: Array.isArray(parsed.stages) ? parsed.stages : [],
      courses: Array.isArray(parsed.courses) ? parsed.courses : [],
      activeCareerId: parsed.activeCareerId,
      lastVisitedStage: parsed.lastVisitedStage,
    }
  } catch {
    return emptyState()
  }
}

function writeProgress(state: LearningProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent('optmentor-progress-changed'))
  return state
}

export function setActiveCareer(careerId: string) {
  const state = readProgress()
  return writeProgress({ ...state, activeCareerId: careerId })
}

export function visitStage(careerId: string, stageId: string) {
  const state = readProgress()
  return writeProgress({ ...state, activeCareerId: careerId, lastVisitedStage: { careerId, stageId } })
}

export function isStageCompleted(careerId: string, stageId: string) {
  return readProgress().stages.some((item) => item.careerId === careerId && item.stageId === stageId && item.completed)
}

export function completeStage(careerId: string, stageId: string) {
  const state = readProgress()
  const existing = state.stages.find((item) => item.careerId === careerId && item.stageId === stageId)
  const stages = existing
    ? state.stages.map((item) => item === existing ? { ...item, completed: true, completedAt: item.completedAt ?? new Date().toISOString() } : item)
    : [...state.stages, { careerId, stageId, completed: true, completedAt: new Date().toISOString() }]
  recordMilestoneComplete(`${careerId}:${stageId}`)
  return writeProgress({ ...state, activeCareerId: careerId, lastVisitedStage: { careerId, stageId }, stages })
}

export function careerProgress(careerId: string, totalStages: number) {
  const completed = readProgress().stages.filter((item) => item.careerId === careerId && item.completed).length
  return {
    completed,
    total: totalStages,
    percentage: totalStages ? Math.round((completed / totalStages) * 100) : 0,
  }
}

export function startCourse(careerId: string, courseId: string) {
  const state = readProgress()
  const courses = state.courses ?? []
  const existing = courses.find((item) => item.courseId === courseId)
  if (existing) {
    return state
  }
  recordCourseStart(courseId)
  const updatedCourses: CourseProgress[] = [
    ...courses,
    { courseId, careerId, status: 'in-progress', startedAt: new Date().toISOString() },
  ]
  return writeProgress({ ...state, activeCareerId: careerId, courses: updatedCourses })
}

export function completeCourse(careerId: string, courseId: string) {
  const state = readProgress()
  const courses = state.courses ?? []
  const existing = courses.find((item) => item.courseId === courseId)
  recordCourseComplete(courseId)
  const updatedCourses: CourseProgress[] = existing
    ? courses.map((item) =>
        item.courseId === courseId
          ? { ...item, status: 'completed', completedAt: item.completedAt ?? new Date().toISOString() }
          : item,
      )
    : [
        ...courses,
        {
          courseId,
          careerId,
          status: 'completed',
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        },
      ]
  return writeProgress({ ...state, activeCareerId: careerId, courses: updatedCourses })
}

export function getCourseStatus(courseId: string): 'not-started' | 'in-progress' | 'completed' {
  const state = readProgress()
  const match = (state.courses ?? []).find((item) => item.courseId === courseId)
  return match ? match.status : 'not-started'
}

export function careerCourseProgress(careerId: string, totalCourses: number) {
  const courses = readProgress().courses ?? []
  const careerItems = courses.filter((item) => item.careerId === careerId)
  const completed = careerItems.filter((item) => item.status === 'completed').length
  const inProgress = careerItems.filter((item) => item.status === 'in-progress').length
  return {
    completed,
    inProgress,
    total: totalCourses,
    percentage: totalCourses ? Math.round((completed / totalCourses) * 100) : 0,
  }
}

export function overallCareerProgress(careerId: string, totalStages: number, totalCourses: number) {
  const stageP = careerProgress(careerId, totalStages)
  const courseP = careerCourseProgress(careerId, totalCourses)
  const totalUnits = totalStages + totalCourses
  const completedUnits = stageP.completed + courseP.completed
  return {
    completedStages: stageP.completed,
    totalStages,
    completedCourses: courseP.completed,
    inProgressCourses: courseP.inProgress,
    totalCourses,
    percentage: totalUnits ? Math.round((completedUnits / totalUnits) * 100) : 0,
  }
}
