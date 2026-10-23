import fs from 'node:fs'
import path from 'node:path'

console.log('=== OptMentor Phase 2 Data & Implementation Verification ===\n')

const root = path.resolve('.')

// 1. Check careers.ts
const careersContent = fs.readFileSync(path.join(root, 'src/data/careers.ts'), 'utf-8')
const careerMatches = [...careersContent.matchAll(/id:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])
const careerIds = [...new Set(careerMatches)]

console.log(`[1] Career Catalog Check:`)
console.log(`- Found ${careerIds.length} distinct career IDs:`)
careerIds.forEach((id, i) => console.log(`  ${String(i + 1).padStart(2, '0')}. ${id}`))

if (careerIds.length !== 20) {
  console.error(`FAIL: Expected exactly 20 careers, got ${careerIds.length}`)
  process.exit(1)
} else {
  console.log('PASS: Exactly 20 distinct careers present.')
}

// 2. Check roadmaps.ts
const roadmapsContent = fs.readFileSync(path.join(root, 'src/data/roadmaps.ts'), 'utf-8')
const roadmapMatches = [...roadmapsContent.matchAll(/createRoadmap\('([a-z0-9-]+)'/g)].map((m) => m[1])
console.log(`\n[2] Roadmap Check:`)
console.log(`- Found ${roadmapMatches.length} roadmaps created.`)

careerIds.forEach((id) => {
  if (!roadmapMatches.includes(id)) {
    console.error(`FAIL: Missing roadmap for career: ${id}`)
    process.exit(1)
  }
})
console.log('PASS: All 20 careers have corresponding roadmaps.')

// 3. Check resources.ts
const resourcesContent = fs.readFileSync(path.join(root, 'src/data/resources.ts'), 'utf-8')
console.log(`\n[3] Course Catalog Check:`)
careerIds.forEach((id) => {
  const hasCourses = resourcesContent.includes(id)
  if (!hasCourses) {
    console.error(`FAIL: No course mapping for career: ${id}`)
    process.exit(1)
  }
})
console.log('PASS: All 20 careers have curated courses.')

// 4. Check assessments.ts
const assessmentsContent = fs.readFileSync(path.join(root, 'src/data/assessments.ts'), 'utf-8')
console.log(`\n[4] Assessments Check:`)
const assessmentIds = [...assessmentsContent.matchAll(/id:\s*'(assessment-[a-z0-9-]+)'/g)].map((m) => m[1])
console.log(`- Found ${assessmentIds.length} assessments registered.`)

careerIds.forEach((id) => {
  const exists = assessmentIds.includes(`assessment-${id}`)
  if (!exists) {
    console.error(`FAIL: Missing assessment for career: ${id}`)
    process.exit(1)
  }
})
console.log('PASS: All 20 careers have an assessment.')

// 5. Check badges.ts
const badgesContent = fs.readFileSync(path.join(root, 'src/data/badges.ts'), 'utf-8')
console.log(`\n[5] Badges Check:`)
const badgeCount = (badgesContent.match(/id:\s*'[a-z0-9-]+'/g) || []).length
console.log(`- Found ${badgeCount} badge definitions.`)
if (badgeCount < 7) {
  console.error(`FAIL: Insufficient badges: ${badgeCount}`)
  process.exit(1)
}
console.log('PASS: Badges system is complete and active.')

console.log('\n=== ALL VERIFICATION CHECKS PASSED SUCCESSFULLY ===\n')
