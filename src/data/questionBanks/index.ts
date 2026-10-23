import { resources } from '../resources'
import type { CourseMCQ } from '../../types/courseQuiz'
import { generateCourseQuestions } from './questionGenerator'

const bankCache = new Map<string, CourseMCQ[]>()

/**
 * Loads the 50-question question bank for a specific course on-demand.
 * Cached in memory once loaded.
 */
export function getQuestionBankForCourse(courseId: string): CourseMCQ[] {
  if (bankCache.has(courseId)) {
    return bankCache.get(courseId)!
  }
  const course = resources.find((r) => r.id === courseId)
  if (!course) {
    return []
  }
  const bank = generateCourseQuestions(course)
  bankCache.set(courseId, bank)
  return bank
}

/**
 * Utility to inspect or validate all course question banks across the catalog.
 */
export function getAllCourseQuestionBanks(): Record<string, CourseMCQ[]> {
  const all: Record<string, CourseMCQ[]> = {}
  for (const course of resources) {
    all[course.id] = getQuestionBankForCourse(course.id)
  }
  return all
}
