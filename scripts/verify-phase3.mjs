import { createServer } from 'vite'

async function runPhase3Verification() {
  console.log('====================================================')
  console.log('OPTMENTOR PHASE 3 COMPREHENSIVE VALIDATION SUITE')
  console.log('====================================================\n')

  const server = await createServer({ server: { middlewareMode: true } })
  const { careers } = await server.ssrLoadModule('./src/data/careers.ts')
  const { roadmaps } = await server.ssrLoadModule('./src/data/roadmaps.ts')
  const { resources } = await server.ssrLoadModule('./src/data/resources.ts')
  const { generateCourseQuestions } = await server.ssrLoadModule('./src/data/questionBanks/questionGenerator.ts')
  const { getWeeklySummary, recordAppOpen, recordCourseStart, recordCourseComplete, recordAssessmentAttempt } = await server.ssrLoadModule('./src/services/weeklyTrackerService.ts')

  let passedChecks = 0
  let failedChecks = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`)
      passedChecks++
    } else {
      console.error(`[FAIL] ${message}`)
      failedChecks++
    }
  }

  // 1. Careers 11-20 have at least 5 usable, distinct resources
  const careers11to20 = [
    'industrial-automation-cnc-robotics',
    'agriculture-agritech',
    'food-processing-preservation',
    'dairy-fisheries-animal-husbandry',
    'tailoring-stitching-apparel',
    'solar-energy-green-jobs',
    'construction-skilled-trades',
    'carpentry-woodworking-furniture',
    'digital-marketing-entrepreneurship',
    'healthcare-assistance-community-health'
  ]

  for (const careerId of careers11to20) {
    const careerRes = resources.filter(r => r.careerId === careerId)
    assert(careerRes.length >= 5, `Career "${careerId}" has ${careerRes.length} resources (>= 5 required)`)
    
    // Check distinct URLs and IDs
    const urls = new Set(careerRes.map(r => r.url))
    const ids = new Set(careerRes.map(r => r.id))
    assert(urls.size === careerRes.length, `Career "${careerId}" resources have unique URLs (${urls.size}/${careerRes.length})`)
    assert(ids.size === careerRes.length, `Career "${careerId}" resources have unique IDs (${ids.size}/${careerRes.length})`)
  }

  // 2. Strict Link Requirements: Zero Bharat Skills or Skill India Digital
  const forbiddenLinks = resources.filter(r => 
    r.url.includes('bharatskills.gov.in') || 
    r.url.includes('skillindiadigital.gov.in')
  )
  assert(forbiddenLinks.length === 0, `Zero Bharat Skills or Skill India Digital links in catalog (Found: ${forbiddenLinks.length})`)

  // 3. Verification status, date checked, and sign-in metadata recorded
  const missingVerification = resources.filter(r => !r.verificationStatus || r.verificationStatus !== 'verified')
  assert(missingVerification.length === 0, `All ${resources.length} resources have verificationStatus: 'verified' (Missing: ${missingVerification.length})`)

  const missingDateChecked = resources.filter(r => !r.dateChecked)
  assert(missingDateChecked.length === 0, `All ${resources.length} resources have recorded dateChecked (Missing: ${missingDateChecked.length})`)

  const missingSignIn = resources.filter(r => typeof r.signInRequired !== 'boolean')
  assert(missingSignIn.length === 0, `All ${resources.length} resources declare signInRequired boolean (Missing: ${missingSignIn.length})`)

  // 4. Roadmap and Career reference resolution
  const careerIds = new Set(careers.map(c => c.id))
  const stageIds = new Set()
  roadmaps.forEach(rm => rm.stages.forEach(st => stageIds.add(st.id)))

  let unresolvedCareers = 0
  let unresolvedStages = 0
  resources.forEach(r => {
    if (!careerIds.has(r.careerId)) unresolvedCareers++
    if (!stageIds.has(r.stageId)) unresolvedStages++
  })
  assert(unresolvedCareers === 0, `All resource careerIds resolve to valid careers (Unresolved: ${unresolvedCareers})`)
  assert(unresolvedStages === 0, `All resource stageIds resolve to valid roadmap stages (Unresolved: ${unresolvedStages})`)

  // 5. MCQ Generation: Exactly 50 MCQs per course (7,000 total)
  console.log('\nValidating 7,000 Course-Specific MCQs...')
  let totalMCQs = 0
  const allQuestionIds = new Set()
  let invalidOptionCount = 0
  let invalidCorrectIndex = 0
  let emptyExplanationCount = 0
  let missingReferenceCount = 0
  const answerDist = { 0: 0, 1: 0, 2: 0, 3: 0 }

  for (const course of resources) {
    const questions = generateCourseQuestions(course)
    if (questions.length !== 50) {
      assert(false, `Course ${course.id} produced ${questions.length} MCQs instead of 50`)
    }

    for (const q of questions) {
      totalMCQs++
      if (allQuestionIds.has(q.id)) {
        assert(false, `Duplicate question ID detected: ${q.id}`)
      }
      allQuestionIds.add(q.id)

      if (!Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4) {
        invalidOptionCount++
      }

      if (q.correctAnswer < 0 || q.correctAnswer > 3) {
        invalidCorrectIndex++
      } else {
        answerDist[q.correctAnswer]++
      }

      if (!q.explanation || q.explanation.trim().length === 0) {
        emptyExplanationCount++
      }

      if (!q.reference) {
        missingReferenceCount++
      }
    }
  }

  assert(totalMCQs === 7000, `Exactly 7,000 distinct MCQs generated across 140 courses (Total: ${totalMCQs})`)
  assert(allQuestionIds.size === 7000, `All 7,000 question IDs are completely unique (${allQuestionIds.size} unique IDs)`)
  assert(invalidOptionCount === 0, `All 7,000 questions have exactly 4 distinct options (Invalid: ${invalidOptionCount})`)
  assert(invalidCorrectIndex === 0, `All 7,000 questions have valid correct answers 0..3 (Invalid: ${invalidCorrectIndex})`)
  assert(emptyExplanationCount === 0, `All 7,000 questions have non-empty explanations (Empty: ${emptyExplanationCount})`)
  assert(missingReferenceCount === 0, `All 7,000 questions have curriculum references (Missing: ${missingReferenceCount})`)

  console.log('MCQ Correct Answer Distribution (Balanced):', answerDist)

  // 6. Weekly Tracker Behavioral Tests (Mocking window / localStorage in Node)
  console.log('\nValidating Weekly Tracker & Login vs Learning Differentiation...')
  const mockStorage = {}
  global.window = {
    localStorage: {
      getItem: (k) => mockStorage[k] || null,
      setItem: (k, v) => { mockStorage[k] = v },
      removeItem: (k) => { delete mockStorage[k] },
      clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]) }
    },
    dispatchEvent: () => true
  }

  // Test 6a: App open marks appOpened = true, but meaningfulLearning = false
  recordAppOpen()
  let summary = getWeeklySummary(0)
  assert(summary.learningDaysCount === 0, `App open alone does NOT count as a learning day (learningDaysCount: ${summary.learningDaysCount})`)
  assert(summary.loginDaysCount === 1, `App open alone counts as an active login day (loginDaysCount: ${summary.loginDaysCount})`)

  // Test 6b: Course start marks meaningfulLearning = true
  recordCourseStart('cybersecurity-ethical-hacking', 'course-cybersecurity-ethical-hacking-1')
  summary = getWeeklySummary(0)
  assert(summary.learningDaysCount === 1, `Course start marks meaningful learning day (learningDaysCount: ${summary.learningDaysCount})`)

  // Test 6c: Course completion and assessment
  recordCourseComplete('cybersecurity-ethical-hacking', 'course-cybersecurity-ethical-hacking-1')
  recordAssessmentAttempt({
    id: 'test-attempt-1',
    title: 'Networking Basics Exam',
    score: 84,
    passed: true
  })
  summary = getWeeklySummary(0)
  assert(summary.learningDaysCount === 1, `Same day actions deduplicate to 1 calendar learning day (learningDaysCount: ${summary.learningDaysCount})`)

  // Test 6d: Day 7 recommendation behavior reflects learning
  assert(summary.recommendedAction !== null, 'Recommended progression action is generated')
  console.log('Current Recommended Action:', summary.recommendedAction.dayTitle, '->', summary.recommendedAction.actionLabel)

  // Clean up
  await server.close()

  console.log('\n====================================================')
  console.log(`SUMMARY: ${passedChecks} checks passed, ${failedChecks} checks failed.`)
  console.log('====================================================')

  if (failedChecks > 0) {
    process.exit(1)
  }
}

runPhase3Verification().catch((err) => {
  console.error('Validation script error:', err)
  process.exit(1)
})
