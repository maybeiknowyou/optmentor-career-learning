import { createServer } from 'vite'

async function runAudit() {
  console.log('================================================================')
  console.log('OptMentor Phase 2 — Comprehensive Independent Audit')
  console.log('================================================================\n')

  const server = await createServer({ server: { middlewareMode: true } })

  const { careerCategories } = await server.ssrLoadModule('./src/types/career.ts')
  const { careers } = await server.ssrLoadModule('./src/data/careers.ts')
  const { roadmaps, getRoadmapByCareerId } = await server.ssrLoadModule('./src/data/roadmaps.ts')
  const { resources, resourcesForCareer } = await server.ssrLoadModule('./src/data/resources.ts')
  const { assessments, getAssessmentById } = await server.ssrLoadModule('./src/data/assessments.ts')

  const findings = []

  function addFinding(severity, issue, evidence, affectedFiles, reproductionSteps) {
    findings.push({ severity, issue, evidence, affectedFiles, reproductionSteps })
    console.log(`[${severity}] ${issue}`)
    console.log(`  Evidence: ${evidence}`)
    console.log(`  Affected: ${affectedFiles.join(', ')}\n`)
  }

  // 1. Audit Careers
  console.log('--- 1. Auditing Careers Catalog (20 Pathways) ---')
  if (careers.length !== 20) {
    addFinding(
      'HIGH',
      `Career catalog count is ${careers.length}, expected exactly 20`,
      `Found ${careers.length} items in careers array.`,
      ['src/data/careers.ts'],
      'Inspect careers.length in src/data/careers.ts'
    )
  }

  const careerIdSet = new Set()
  careers.forEach((c, idx) => {
    if (!c.id) {
      addFinding('HIGH', `Career at index ${idx} is missing an ID`, JSON.stringify(c), ['src/data/careers.ts'], 'Check careers.ts')
    }
    if (careerIdSet.has(c.id)) {
      addFinding('HIGH', `Duplicate career ID detected: ${c.id}`, `Duplicate ID ${c.id}`, ['src/data/careers.ts'], 'Check careers.ts for duplicate IDs')
    }
    careerIdSet.add(c.id)

    if (!c.title || !c.shortDescription || !c.detailedDescription) {
      addFinding(
        'MEDIUM',
        `Career "${c.id}" missing title or description`,
        `title: "${c.title}", shortDesc: "${c.shortDescription}", detailedDesc: "${c.detailedDescription}"`,
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" in src/data/careers.ts`
      )
    }

    if (!careerCategories.includes(c.category)) {
      addFinding(
        'MEDIUM',
        `Career "${c.id}" category "${c.category}" not in careerCategories list`,
        `category: "${c.category}", allowed: ${JSON.stringify(careerCategories)}`,
        ['src/data/careers.ts', 'src/types/career.ts'],
        `Inspect category of career "${c.id}"`
      )
    }

    if (!c.image || !c.image.src || !c.image.alt) {
      addFinding(
        'MEDIUM',
        `Career "${c.id}" missing or invalid image asset`,
        JSON.stringify(c.image),
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" image`
      )
    }

    if (!c.salaryEstimate || !c.salaryEstimate.range || !c.salaryEstimate.period) {
      addFinding(
        'LOW',
        `Career "${c.id}" missing salary estimate info`,
        JSON.stringify(c.salaryEstimate),
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" salaryEstimate`
      )
    }

    if (!c.marketOutlook || !c.marketOutlook.demandLevel || !c.marketOutlook.growthSummary) {
      addFinding(
        'LOW',
        `Career "${c.id}" missing market outlook info`,
        JSON.stringify(c.marketOutlook),
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" marketOutlook`
      )
    }

    if (!c.keySkills || !Array.isArray(c.keySkills) || c.keySkills.length < 4) {
      addFinding(
        'LOW',
        `Career "${c.id}" has fewer than 4 key skills`,
        `keySkills count: ${c.keySkills?.length}`,
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" keySkills`
      )
    }

    if (!c.exampleRoles || !Array.isArray(c.exampleRoles) || c.exampleRoles.length < 3) {
      addFinding(
        'LOW',
        `Career "${c.id}" has fewer than 3 example roles`,
        `exampleRoles count: ${c.exampleRoles?.length}`,
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" exampleRoles`
      )
    }

    if (!c.institutions || !Array.isArray(c.institutions) || c.institutions.length < 2) {
      addFinding(
        'LOW',
        `Career "${c.id}" has fewer than 2 training institutions`,
        `institutions count: ${c.institutions?.length}`,
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" institutions`
      )
    }

    if (!c.sampleOpportunities || !Array.isArray(c.sampleOpportunities) || c.sampleOpportunities.length < 2) {
      addFinding(
        'LOW',
        `Career "${c.id}" has fewer than 2 sample opportunities`,
        `sampleOpportunities count: ${c.sampleOpportunities?.length}`,
        ['src/data/careers.ts'],
        `Inspect career "${c.id}" sampleOpportunities`
      )
    }
  })

  // 2. Audit Roadmaps and Stages
  console.log('--- 2. Auditing Roadmaps and Stages ---')
  if (roadmaps.length !== 20) {
    addFinding(
      'HIGH',
      `Roadmaps count is ${roadmaps.length}, expected 20`,
      `Found ${roadmaps.length} roadmaps in src/data/roadmaps.ts`,
      ['src/data/roadmaps.ts'],
      'Inspect roadmaps.length'
    )
  }

  const allStageIds = new Set()
  const stageToCareerMap = new Map()

  careers.forEach(c => {
    const rm = getRoadmapByCareerId(c.id)
    if (!rm) {
      addFinding(
        'HIGH',
        `Missing roadmap for career "${c.id}"`,
        `getRoadmapByCareerId('${c.id}') returned undefined`,
        ['src/data/roadmaps.ts'],
        `Check roadmap for ${c.id}`
      )
      return
    }

    if (rm.careerId !== c.id) {
      addFinding(
        'HIGH',
        `Roadmap "${rm.id}" careerId mismatch: "${rm.careerId}" vs "${c.id}"`,
        `Roadmap careerId: ${rm.careerId}`,
        ['src/data/roadmaps.ts'],
        `Check roadmap ${rm.id}`
      )
    }

    if (rm.stages.length !== 5) {
      addFinding(
        'MEDIUM',
        `Roadmap for "${c.id}" has ${rm.stages.length} stages, expected 5`,
        `${rm.stages.length} stages`,
        ['src/data/roadmaps.ts'],
        `Check stages count for roadmap ${rm.id}`
      )
    }

    rm.stages.forEach((st, sIdx) => {
      if (allStageIds.has(st.id)) {
        addFinding(
          'HIGH',
          `Duplicate stage ID detected across roadmaps: "${st.id}"`,
          `Stage ID ${st.id} already used in career ${stageToCareerMap.get(st.id)}`,
          ['src/data/roadmaps.ts'],
          `Check stage ${st.id} in ${c.id}`
        )
      }
      allStageIds.add(st.id)
      stageToCareerMap.set(st.id, c.id)

      if (st.order !== sIdx + 1) {
        addFinding(
          'LOW',
          `Stage "${st.id}" has order ${st.order}, expected ${sIdx + 1}`,
          `order is ${st.order}`,
          ['src/data/roadmaps.ts'],
          `Check stage order for ${st.id}`
        )
      }

      if (sIdx > 0 && !st.prerequisiteStageId) {
        addFinding(
          'MEDIUM',
          `Stage "${st.id}" (stage #${sIdx + 1}) in career "${c.id}" has no prerequisiteStageId`,
          `prerequisiteStageId is undefined`,
          ['src/data/roadmaps.ts'],
          `Check prerequisiteStageId for ${st.id}`
        )
      }

      if (st.prerequisiteStageId && !allStageIds.has(st.prerequisiteStageId) && !rm.stages.some(s => s.id === st.prerequisiteStageId)) {
        addFinding(
          'HIGH',
          `Stage "${st.id}" in career "${c.id}" references non-existent prerequisite stage: "${st.prerequisiteStageId}"`,
          `prerequisiteStageId: ${st.prerequisiteStageId}`,
          ['src/data/roadmaps.ts'],
          `Check prerequisiteStageId for ${st.id}`
        )
      }

      if (!st.learningObjectives || st.learningObjectives.length === 0) {
        addFinding(
          'LOW',
          `Stage "${st.id}" in career "${c.id}" has no learning objectives`,
          `learningObjectives: ${JSON.stringify(st.learningObjectives)}`,
          ['src/data/roadmaps.ts'],
          `Check learningObjectives for ${st.id}`
        )
      }
    })
  })

  // 3. Audit Courses Catalog
  console.log('--- 3. Auditing Courses Catalog ---')
  const courseIdSet = new Set()
  resources.forEach(res => {
    if (!res.id) {
      addFinding('HIGH', 'Resource missing ID', JSON.stringify(res), ['src/data/resources.ts'], 'Check resources.ts')
    }
    if (courseIdSet.has(res.id)) {
      addFinding('HIGH', `Duplicate resource ID: ${res.id}`, res.id, ['src/data/resources.ts'], 'Check resources.ts')
    }
    courseIdSet.add(res.id)

    if (!careerIdSet.has(res.careerId)) {
      addFinding('HIGH', `Resource ${res.id} references invalid careerId: ${res.careerId}`, res.careerId, ['src/data/resources.ts'], `Check resource ${res.id}`)
    }

    if (!allStageIds.has(res.stageId)) {
      addFinding(
        'MEDIUM',
        `Resource "${res.id}" references stageId "${res.stageId}" which does not exist in any roadmap!`,
        `stageId: ${res.stageId}`,
        ['src/data/resources.ts', 'src/data/roadmaps.ts'],
        `Check stageId on resource ${res.id}`
      )
    }

    // URL validation
    if (!res.url) {
      addFinding('HIGH', `Resource "${res.id}" has empty URL`, res.title, ['src/data/resources.ts'], `Check resource ${res.id}`)
    } else {
      try {
        const parsed = new URL(res.url)
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          addFinding('HIGH', `Resource "${res.id}" has non-http URL: ${res.url}`, res.url, ['src/data/resources.ts'], `Check resource ${res.id}`)
        }
        if (parsed.hostname.includes('example.com') || parsed.hostname.includes('placeholder')) {
          addFinding('HIGH', `Resource "${res.id}" has placeholder URL: ${res.url}`, res.url, ['src/data/resources.ts'], `Check resource ${res.id}`)
        }
      } catch (e) {
        addFinding('HIGH', `Resource "${res.id}" has malformed URL: ${res.url}`, e.message, ['src/data/resources.ts'], `Check resource ${res.id}`)
      }
    }
  })

  // Check course count per career
  careers.forEach(c => {
    const courses = resourcesForCareer(c.id)
    if (courses.length < 6) {
      addFinding('MEDIUM', `Career "${c.id}" has only ${courses.length} courses, expected at least 6-8`, `${courses.length} courses`, ['src/data/resources.ts'], `Check courses for ${c.id}`)
    }
  })

  // 4. Audit Assessments
  console.log('--- 4. Auditing Assessments ---')
  if (assessments.length !== 20) {
    addFinding('HIGH', `Assessments count is ${assessments.length}, expected 20`, `${assessments.length} assessments`, ['src/data/assessments.ts'], 'Check assessments.ts')
  }

  careers.forEach(c => {
    const ass = getAssessmentById(c.id)
    if (!ass) {
      addFinding('HIGH', `Career "${c.id}" has no assessment`, `getAssessmentById('${c.id}') returned undefined`, ['src/data/assessments.ts'], `Check assessment for ${c.id}`)
      return
    }

    if (!ass.questions || ass.questions.length < 5) {
      addFinding('MEDIUM', `Assessment for "${c.id}" has fewer than 5 questions`, `${ass.questions?.length} questions`, ['src/data/assessments.ts'], `Check assessment ${c.id}`)
    }

    const answerDistribution = {}
    ass.questions.forEach((q, qIdx) => {
      if (!q.id || !q.prompt || !q.options || q.options.length !== 4) {
        addFinding('MEDIUM', `Question ${qIdx} in assessment "${c.id}" is invalid or does not have 4 options`, JSON.stringify(q), ['src/data/assessments.ts'], `Check question ${qIdx}`)
      }
      if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        addFinding('HIGH', `Question ${qIdx} in assessment "${c.id}" has invalid correctAnswer: ${q.correctAnswer}`, `${q.correctAnswer}`, ['src/data/assessments.ts'], `Check question ${qIdx}`)
      }
      answerDistribution[q.correctAnswer] = (answerDistribution[q.correctAnswer] || 0) + 1

      if (!q.explanation) {
        addFinding('LOW', `Question ${qIdx} in assessment "${c.id}" missing explanation`, q.prompt, ['src/data/assessments.ts'], `Check question ${qIdx}`)
      }
    })

    const uniquePositions = Object.keys(answerDistribution).length
    if (uniquePositions < 2) {
      addFinding('MEDIUM', `Assessment for "${c.id}" has poor answer variety (all answers are option ${Object.keys(answerDistribution)[0]})`, JSON.stringify(answerDistribution), ['src/data/assessments.ts'], `Check assessment answers for ${c.id}`)
    }
  })

  await server.close()

  console.log('\n================================================================')
  console.log(`Audit Complete. Total findings: ${findings.length}`)
  console.log('================================================================')
}

runAudit()
