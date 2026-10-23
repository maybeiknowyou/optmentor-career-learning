import { careers, getCareerById } from '../src/data/careers.ts'
import { roadmaps, getRoadmapByCareerId } from '../src/data/roadmaps.ts'
import { resourcesForCareer } from '../src/data/resources.ts'
import { assessments, getAssessmentById } from '../src/data/assessments.ts'
import { badges } from '../src/data/badges.ts'

console.log('================================================================')
console.log('OptMentor Phase 2 — Comprehensive Data & Integrity Test Suite')
console.log('================================================================\n')

let passCount = 0
let failCount = 0

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`)
    passCount++
  } else {
    console.error(`  [FAIL] ${message}`)
    failCount++
  }
}

// 1. Verify 20 Careers
console.log('1. Checking Career Catalog (Target: 20 Distinct Careers)...')
assert(careers.length === 20, `Career count is exactly 20 (Actual: ${careers.length})`)

const careerIds = new Set<string>()
careers.forEach((career, idx) => {
  const isUnique = !careerIds.has(career.id)
  careerIds.add(career.id)
  assert(isUnique, `Career #${idx + 1} (${career.title}) has unique ID: ${career.id}`)
  assert(Boolean(career.title && career.description && career.category), `Career ${career.id} has title, description, category`)
  assert(Boolean(career.salaryInfo && career.salaryInfo.entryLevel && career.salaryInfo.experienced), `Career ${career.id} has realistic salary estimates`)
  assert(Boolean(career.marketOutlook && career.marketOutlook.growthRate && career.marketOutlook.primaryHiringSectors?.length), `Career ${career.id} has market outlook`)
  assert(Boolean(career.skills?.length >= 4), `Career ${career.id} has at least 4 defined skills (Actual: ${career.skills?.length})`)
  assert(Boolean(career.exampleRoles?.length >= 3), `Career ${career.id} has at least 3 example job roles (Actual: ${career.exampleRoles?.length})`)
  assert(Boolean(career.institutions?.length >= 2), `Career ${career.id} has at least 2 verified institutions (Actual: ${career.institutions?.length})`)
  assert(Boolean(career.opportunities?.length >= 2), `Career ${career.id} has at least 2 sample career opportunities (Actual: ${career.opportunities?.length})`)
})

// 2. Verify 20 Roadmaps & 100 Stages
console.log('\n2. Checking Career Roadmaps (Target: 20 Roadmaps, 100 Stages)...')
assert(roadmaps.length === 20, `Roadmap count is exactly 20 (Actual: ${roadmaps.length})`)

careers.forEach(career => {
  const roadmap = getRoadmapByCareerId(career.id)
  assert(Boolean(roadmap), `Roadmap found for career: ${career.id}`)
  if (roadmap) {
    assert(roadmap.stages.length === 5, `Roadmap for ${career.id} has exactly 5 stages (Actual: ${roadmap.stages.length})`)
    roadmap.stages.forEach((stage, sIdx) => {
      assert(Boolean(stage.id && stage.title && stage.description), `Stage ${sIdx + 1} (${stage.id}) has title and description`)
      assert(Boolean(stage.resources && stage.resources.length > 0), `Stage ${sIdx + 1} has linked resources (${stage.resources?.length})`)
      assert(Boolean(stage.keySkills && stage.keySkills.length > 0), `Stage ${sIdx + 1} has key skills defined`)
    })
  }
})

// 3. Verify Course Resources Catalog (~140 Courses)
console.log('\n3. Checking Course Catalog (Target: ~7 Courses per Career, ~140 Total)...')
let totalCourses = 0
careers.forEach(career => {
  const courses = resourcesForCareer(career.id)
  totalCourses += courses.length
  assert(courses.length >= 6, `Career ${career.id} has at least 6 curated courses (Actual: ${courses.length})`)
  courses.forEach(course => {
    assert(Boolean(course.id && course.title && course.provider && course.url), `Course ${course.id} has id, title, provider (${course.provider}), and url`)
    assert(Boolean(course.skillsCovered && course.skillsCovered.length > 0), `Course ${course.id} covers specific skills`)
    assert(Boolean(course.completionCriteria), `Course ${course.id} has explicit completion criteria`)
  })
})
assert(totalCourses >= 120, `Total course resources across catalog >= 120 (Actual: ${totalCourses})`)

// 4. Verify Career Assessments (20 Assessments)
console.log('\n4. Checking Assessments (Target: 20 Career Assessments)...')
assert(assessments.length === 20, `Assessments count is exactly 20 (Actual: ${assessments.length})`)

careers.forEach(career => {
  const assessment = getAssessmentById(career.id)
  assert(Boolean(assessment), `Assessment exists for career: ${career.id}`)
  if (assessment) {
    assert(assessment.questions.length >= 5, `Assessment for ${career.id} has at least 5 questions (Actual: ${assessment.questions.length})`)
    const answerIndices = new Set(assessment.questions.map(q => q.correctAnswerIndex))
    assert(answerIndices.size >= 3, `Assessment for ${career.id} has varied correct answer positions (Unique positions: ${answerIndices.size})`)
    assessment.questions.forEach((q, qIdx) => {
      assert(q.options.length >= 4, `Question ${qIdx + 1} in ${career.id} has 4 options`)
      assert(Boolean(q.explanation), `Question ${qIdx + 1} in ${career.id} has an explanation`)
      assert(q.correctAnswerIndex >= 0 && q.correctAnswerIndex < q.options.length, `Question ${qIdx + 1} correct answer index is within range`)
    })
  }
})

// 5. Verify Badges
console.log('\n5. Checking Badges Catalog...')
assert(badges.length >= 10, `Badges catalog has at least 10 badges (Actual: ${badges.length})`)

// 6. Verify Backward Compatibility Aliases
console.log('\n6. Checking Backward Compatibility Aliases...')
const legacyCareer = getCareerById('data-analytics-artificial-intelligence')
assert(Boolean(legacyCareer), 'Legacy career ID data-analytics-artificial-intelligence resolves gracefully')
const legacyRoadmap = getRoadmapByCareerId('data-analytics-artificial-intelligence')
assert(Boolean(legacyRoadmap), 'Legacy roadmap lookup resolves gracefully')
const legacyAssessment = getAssessmentById('data-analytics-artificial-intelligence')
assert(Boolean(legacyAssessment), 'Legacy assessment lookup resolves gracefully')
const legacyResources = resourcesForCareer('data-analytics-artificial-intelligence')
assert(legacyResources.length > 0, 'Legacy resources lookup resolves gracefully')

console.log('\n================================================================')
console.log(`Results: ${passCount} Passed, ${failCount} Failed`)
console.log('================================================================')

if (failCount > 0) {
  process.exit(1)
} else {
  console.log('\nALL DATA INTEGRITY AND ARCHITECTURAL ACCEPTANCE CRITERIA PASSED!')
  process.exit(0)
}
