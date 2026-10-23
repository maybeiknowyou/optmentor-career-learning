export interface CourseEvidence {
  courseId: string
  evidence: string
  imageDataUrl?: string
  submittedAt: string
}

const STORAGE_KEY = 'optmentor.course-evidence.v1'

function read(): CourseEvidence[] {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getCourseEvidence(courseId: string) {
  return read().find((item) => item.courseId === courseId)
}

export function hasCourseEvidence(courseId: string) {
  return Boolean(getCourseEvidence(courseId))
}

export function saveCourseEvidence(courseId: string, evidence: string, imageDataUrl?: string) {
  const trimmed = evidence.trim()
  if (!trimmed) return undefined
  const updated = [{ courseId, evidence: trimmed, imageDataUrl, submittedAt: new Date().toISOString() }, ...read().filter((item) => item.courseId !== courseId)]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new CustomEvent('optmentor-course-evidence-changed'))
  return updated[0]
}
