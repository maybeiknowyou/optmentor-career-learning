import type { LearningProgressState } from '../types/progress'

const STORAGE_KEY = 'optmentor.learning-progress.v1'
const emptyState = (): LearningProgressState => ({ stages: [] })

export function readProgress(): LearningProgressState {
  if (typeof window === 'undefined') return emptyState()
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '') as LearningProgressState } catch { return emptyState() }
}

function writeProgress(state: LearningProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent('optmentor-progress-changed'))
  return state
}

export function setActiveCareer(careerId: string) { const state = readProgress(); return writeProgress({ ...state, activeCareerId: careerId }) }
export function visitStage(careerId: string, stageId: string) { const state = readProgress(); return writeProgress({ ...state, activeCareerId: careerId, lastVisitedStage: { careerId, stageId } }) }
export function isStageCompleted(careerId: string, stageId: string) { return readProgress().stages.some((item) => item.careerId === careerId && item.stageId === stageId && item.completed) }
export function completeStage(careerId: string, stageId: string) { const state = readProgress(); const existing = state.stages.find((item) => item.careerId === careerId && item.stageId === stageId); const stages = existing ? state.stages.map((item) => item === existing ? { ...item, completed: true, completedAt: item.completedAt ?? new Date().toISOString() } : item) : [...state.stages, { careerId, stageId, completed: true, completedAt: new Date().toISOString() }]; return writeProgress({ ...state, activeCareerId: careerId, lastVisitedStage: { careerId, stageId }, stages }) }
export function careerProgress(careerId: string, totalStages: number) { const completed = readProgress().stages.filter((item) => item.careerId === careerId && item.completed).length; return { completed, total: totalStages, percentage: totalStages ? Math.round((completed / totalStages) * 100) : 0 } }
