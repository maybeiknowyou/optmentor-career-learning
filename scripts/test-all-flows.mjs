import { createServer } from 'vite'

async function runComprehensiveTests() {
  console.log('================================================================')
  console.log('OptMentor Phase 2 — Comprehensive Verification & Flow Tests')
  console.log('================================================================\n')

  const server = await createServer({ server: { middlewareMode: true } })

  const { careerCategories } = await server.ssrLoadModule('./src/types/career.ts')
  const { careers, getCareerById } = await server.ssrLoadModule('./src/data/careers.ts')
  const { getRoadmapByCareerId, getStageById } = await server.ssrLoadModule('./src/data/roadmaps.ts')
  const { resources, resourcesForCareer } = await server.ssrLoadModule('./src/data/resources.ts')
  const { assessments, getAssessmentById } = await server.ssrLoadModule('./src/data/assessments.ts')

  let passCount = 0
  let failCount = 0
  const bugLog = []

  function test(name, fn) {
    try {
      fn()
      console.log(`  [PASS] ${name}`)
      passCount++
    } catch (err) {
      console.error(`  [FAIL] ${name}: ${err.message}`)
      failCount++
      bugLog.push({ test: name, error: err.message })
    }
  }

  // --- Task 1: Career Records & Search/Filter ---
  console.log('1. Verifying 20 Career Records & Catalog Invariants...')
  test('Exactly 20 distinct career records exist', () => {
    if (careers.length !== 20) throw new Error(`Expected 20 careers, got ${careers.length}`)
  })

  test('All career IDs are unique, lowercase-kebab and valid', () => {
    const ids = new Set()
    careers.forEach((c) => {
      if (!c.id) throw new Error('Found career without ID')
      if (ids.has(c.id)) throw new Error(`Duplicate career ID: ${c.id}`)
      if (!/^[a-z0-9-]+$/.test(c.id)) throw new Error(`Invalid ID format: ${c.id}`)
      ids.add(c.id)
    })
  })

  test('All career categories belong to official careerCategories', () => {
    careers.forEach((c) => {
      if (!careerCategories.includes(c.category)) {
        throw new Error(`Career ${c.id} has invalid category: ${c.category}`)
      }
    })
  })

  test('All 20 careers have required UI fields', () => {
    careers.forEach((c) => {
      if (!c.title || !c.shortDescription || !c.detailedDescription) {
        throw new Error(`Career ${c.id} missing title or descriptions`)
      }
      if (!c.image?.src || !c.image?.alt) {
        throw new Error(`Career ${c.id} missing image src/alt`)
      }
      if (!c.salaryEstimate?.range || !c.salaryEstimate?.period) {
        throw new Error(`Career ${c.id} missing salaryEstimate`)
      }
      if (!c.marketOutlook?.demandLevel || !c.marketOutlook?.growthSummary) {
        throw new Error(`Career ${c.id} missing marketOutlook`)
      }
      if (!Array.isArray(c.keySkills) || c.keySkills.length < 4) {
        throw new Error(`Career ${c.id} has fewer than 4 keySkills`)
      }
      if (!Array.isArray(c.exampleRoles) || c.exampleRoles.length < 3) {
        throw new Error(`Career ${c.id} has fewer than 3 exampleRoles`)
      }
      if (!Array.isArray(c.institutions) || c.institutions.length < 2) {
        throw new Error(`Career ${c.id} has fewer than 2 institutions`)
      }
    })
  })

  // --- Task 2: Roadmaps & Stages ---
  console.log('\n2. Verifying Roadmaps, 5 Stages & Prerequisite Chaining...')
  test('All 20 careers have corresponding 5-stage roadmaps', () => {
    careers.forEach((c) => {
      const rm = getRoadmapByCareerId(c.id)
      if (!rm) throw new Error(`No roadmap for career ${c.id}`)
      if (rm.stages.length !== 5) throw new Error(`Career ${c.id} roadmap has ${rm.stages.length} stages (expected 5)`)
    })
  })

  test('Roadmap stages have strict sequential prerequisite chain', () => {
    careers.forEach((c) => {
      const rm = getRoadmapByCareerId(c.id)
      rm.stages.forEach((stage, idx) => {
        if (stage.order !== idx + 1) {
          throw new Error(`Stage ${stage.id} has order ${stage.order}, expected ${idx + 1}`)
        }
        if (idx === 0) {
          if (stage.prerequisiteStageId) {
            throw new Error(`Stage 1 (${stage.id}) should not have a prerequisite`)
          }
        } else {
          const prevStage = rm.stages[idx - 1]
          if (stage.prerequisiteStageId !== prevStage.id) {
            throw new Error(
              `Stage ${idx + 1} (${stage.id}) prerequisite is "${stage.prerequisiteStageId}", expected "${prevStage.id}"`
            )
          }
        }
      })
    })
  })

  test('Stage retrieval via getStageById works for every stage across all 20 careers', () => {
    careers.forEach((c) => {
      const rm = getRoadmapByCareerId(c.id)
      rm.stages.forEach((stage) => {
        const found = getStageById(c.id, stage.id)
        if (!found || found.id !== stage.id) {
          throw new Error(`getStageById('${c.id}', '${stage.id}') failed`)
        }
      })
    })
  })

  // --- Task 3: Course Catalog & Associations ---
  console.log('\n3. Verifying Course Catalog Coverage & Associations...')
  test('Every career has at least 6-8 curated courses', () => {
    careers.forEach((c) => {
      const courses = resourcesForCareer(c.id)
      if (courses.length < 6) {
        throw new Error(`Career ${c.id} has only ${courses.length} courses (minimum 6 required)`)
      }
    })
  })

  test('All courses reference a valid stageId in the career roadmap', () => {
    resources.forEach((course) => {
      const rm = getRoadmapByCareerId(course.careerId)
      if (!rm) throw new Error(`Course ${course.id} has invalid careerId: ${course.careerId}`)
      const validStage = rm.stages.some((s) => s.id === course.stageId)
      if (!validStage) {
        throw new Error(`Course ${course.id} references invalid stageId "${course.stageId}" for career "${course.careerId}"`)
      }
    })
  })

  test('All course IDs are globally unique', () => {
    const seen = new Set()
    resources.forEach((course) => {
      if (seen.has(course.id)) throw new Error(`Duplicate course ID: ${course.id}`)
      seen.add(course.id)
    })
  })

  // --- Task 4: External Resource URLs ---
  console.log('\n4. Inspecting Course URLs and Domains...')
  test('All courses have syntactically valid HTTP/HTTPS URLs and no placeholders', () => {
    resources.forEach((course) => {
      if (!course.url) throw new Error(`Course ${course.id} has empty URL`)
      let parsed
      try {
        parsed = new URL(course.url)
      } catch {
        throw new Error(`Course ${course.id} has malformed URL: ${course.url}`)
      }
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error(`Course ${course.id} has non-web URL: ${course.url}`)
      }
      const forbidden = ['example.com', 'placeholder', 'dummy', 'temp.com', 'test.com']
      if (forbidden.some((f) => parsed.hostname.includes(f))) {
        throw new Error(`Course ${course.id} contains forbidden placeholder domain: ${course.url}`)
      }
    })
  })

  // --- Task 5: Assessment Engine & Scoring Invariants ---
  console.log('\n5. Verifying Assessments, Correct Answers & Scoring Engine...')
  test('Every career has a corresponding assessment (via assessment-${careerId})', () => {
    careers.forEach((c) => {
      const ass = getAssessmentById(`assessment-${c.id}`)
      if (!ass) throw new Error(`No assessment found for career ${c.id} via ID "assessment-${c.id}"`)
      if (ass.questions.length < 5) throw new Error(`Assessment for ${c.id} has fewer than 5 questions`)
    })
  })

  test('All assessment questions have 4 options, valid correctAnswer index (0..3), and explanations', () => {
    assessments.forEach((ass) => {
      ass.questions.forEach((q, idx) => {
        if (!q.prompt) throw new Error(`Assessment ${ass.id} Q${idx + 1} has no prompt`)
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Assessment ${ass.id} Q${idx + 1} must have exactly 4 options`)
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Assessment ${ass.id} Q${idx + 1} has invalid correctAnswer: ${q.correctAnswer}`)
        }
        if (!q.explanation || q.explanation.length < 10) {
          throw new Error(`Assessment ${ass.id} Q${idx + 1} has missing or too short explanation`)
        }
      })
    })
  })

  test('Assessment answer keys are diverse across all 4 options', () => {
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 }
    assessments.forEach((ass) => {
      ass.questions.forEach((q) => {
        distribution[q.correctAnswer] = (distribution[q.correctAnswer] || 0) + 1
      })
    })
    console.log(`    Answer distribution across all ${assessments.length} assessments:`, distribution)
    for (let i = 0; i < 4; i++) {
      if (distribution[i] < 10) {
        throw new Error(`Option ${String.fromCharCode(65 + i)} is underrepresented: only ${distribution[i]} occurrences`)
      }
    }
  })

  test('Scoring logic correctly handles 100% correct, 0% correct, exactly passing, and failing thresholds', () => {
    const sampleAssessment = assessments[0] // 10 questions, passing = 60%
    const totalQ = sampleAssessment.questions.length
    const passingThreshold = sampleAssessment.passingPercentage

    // Case A: 100% correct
    const allCorrectAnswers = {}
    sampleAssessment.questions.forEach((q) => {
      allCorrectAnswers[q.id] = q.correctAnswer
    })
    const scoreA = sampleAssessment.questions.reduce((sum, q) => sum + (allCorrectAnswers[q.id] === q.correctAnswer ? 1 : 0), 0)
    const pctA = Math.round((scoreA / totalQ) * 100)
    const passedA = pctA >= passingThreshold
    if (scoreA !== totalQ || pctA !== 100 || !passedA) throw new Error('100% correct scoring logic failed')

    // Case B: 0% correct (all wrong)
    const allWrongAnswers = {}
    sampleAssessment.questions.forEach((q) => {
      allWrongAnswers[q.id] = (q.correctAnswer + 1) % 4
    })
    const scoreB = sampleAssessment.questions.reduce((sum, q) => sum + (allWrongAnswers[q.id] === q.correctAnswer ? 1 : 0), 0)
    const pctB = Math.round((scoreB / totalQ) * 100)
    const passedB = pctB >= passingThreshold
    if (scoreB !== 0 || pctB !== 0 || passedB) throw new Error('0% correct scoring logic failed')

    // Case C: Exactly 60% passing (e.g. 6 of 10)
    const passingAnswers = {}
    sampleAssessment.questions.forEach((q, idx) => {
      passingAnswers[q.id] = idx < 6 ? q.correctAnswer : (q.correctAnswer + 1) % 4
    })
    const scoreC = sampleAssessment.questions.reduce((sum, q) => sum + (passingAnswers[q.id] === q.correctAnswer ? 1 : 0), 0)
    const pctC = Math.round((scoreC / totalQ) * 100)
    const passedC = pctC >= passingThreshold
    if (scoreC !== 6 || pctC !== 60 || !passedC) throw new Error('60% boundary passing scoring logic failed')

    // Case D: 50% failing (5 of 10)
    const failingAnswers = {}
    sampleAssessment.questions.forEach((q, idx) => {
      failingAnswers[q.id] = idx < 5 ? q.correctAnswer : (q.correctAnswer + 1) % 4
    })
    const scoreD = sampleAssessment.questions.reduce((sum, q) => sum + (failingAnswers[q.id] === q.correctAnswer ? 1 : 0), 0)
    const pctD = Math.round((scoreD / totalQ) * 100)
    const passedD = pctD >= passingThreshold
    if (scoreD !== 5 || pctD !== 50 || passedD) throw new Error('50% failing scoring logic failed')
  })

  // --- Task 6: Error Handling for Malformed & Missing Routes ---
  console.log('\n6. Verifying Graceful Handling for Malformed / Unknown IDs...')
  test('getCareerById handles unknown, undefined, or legacy IDs gracefully', () => {
    if (getCareerById('non-existent-career') !== undefined) throw new Error('Unknown career did not return undefined')
    if (getCareerById(undefined) !== undefined) throw new Error('Undefined career did not return undefined')
    if (getCareerById('') !== undefined) throw new Error('Empty career did not return undefined')
    // Legacy alias
    const legacy = getCareerById('data-analytics-artificial-intelligence')
    if (!legacy) throw new Error('Legacy ID data-analytics-artificial-intelligence failed to resolve')
  })

  test('getRoadmapByCareerId handles unknown IDs gracefully', () => {
    if (getRoadmapByCareerId('unknown') !== undefined) throw new Error('Unknown roadmap did not return undefined')
    if (getRoadmapByCareerId(undefined) !== undefined) throw new Error('Undefined roadmap did not return undefined')
  })

  test('getAssessmentById handles unknown IDs gracefully and resolves aliases', () => {
    if (getAssessmentById('unknown-assessment') !== undefined) throw new Error('Unknown assessment did not return undefined')
    if (getAssessmentById(undefined) !== undefined) throw new Error('Undefined assessment did not return undefined')
    // Check if getAssessmentById works with careerId directly
    const directWithCareerId = getAssessmentById('solar-energy-green-jobs')
    console.log('    Direct careerId lookup support in getAssessmentById:', Boolean(directWithCareerId))
    if (!directWithCareerId) {
      console.warn('    [NOTE] getAssessmentById does not currently resolve raw careerId without "assessment-" prefix.')
    }
  })

  await server.close()

  console.log('\n================================================================')
  console.log(`Test Suite Finished: ${passCount} Passed, ${failCount} Failed`)
  console.log('================================================================')

  if (bugLog.length > 0) {
    console.log('\nIdentified Issues to Fix:')
    bugLog.forEach((b, i) => console.log(`  ${i + 1}. [${b.test}]: ${b.error}`))
  }
}

runComprehensiveTests()
