import { createServer } from 'vite'

async function testGenerator() {
  const server = await createServer({ server: { middlewareMode: true } })
  const { resources } = await server.ssrLoadModule('./src/data/resources.ts')
  const { generateCourseQuestions } = await server.ssrLoadModule('./src/data/questionBanks/questionGenerator.ts')

  console.log(`Auditing MCQ generation for ${resources.length} courses...`)
  let totalMCQs = 0
  const allIds = new Set()
  const answerCounts = { 0: 0, 1: 0, 2: 0, 3: 0 }
  const domainCounts = {}
  let errorCount = 0

  for (const course of resources) {
    const questions = generateCourseQuestions(course)
    if (questions.length !== 50) {
      console.error(`Course ${course.id} produced ${questions.length} questions, expected 50!`)
      errorCount++
    }

    for (const q of questions) {
      totalMCQs++
      if (allIds.has(q.id)) {
        console.error(`Duplicate question ID detected: ${q.id}`)
        errorCount++
      }
      allIds.add(q.id)

      if (!q.question || q.question.trim().length === 0) {
        console.error(`Empty question prompt in ${q.id}`)
        errorCount++
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`Question ${q.id} does not have exactly 4 options!`)
        errorCount++
      } else {
        const uniqueOpts = new Set(q.options)
        if (uniqueOpts.size !== 4) {
          console.error(`Question ${q.id} has duplicate options:`, q.options)
          errorCount++
        }
        for (const opt of q.options) {
          if (!opt || opt.trim().length === 0) {
            console.error(`Question ${q.id} has empty option string!`)
            errorCount++
          }
        }
      }

      if (q.correctAnswer < 0 || q.correctAnswer > 3) {
        console.error(`Question ${q.id} has invalid correctAnswer: ${q.correctAnswer}`)
        errorCount++
      } else {
        answerCounts[q.correctAnswer]++
      }

      if (!q.explanation || q.explanation.trim().length === 0) {
        console.error(`Question ${q.id} has empty explanation!`)
        errorCount++
      }

      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1
    }
  }

  console.log('--- AUDIT RESULTS ---')
  console.log(`Total courses inspected: ${resources.length}`)
  console.log(`Total MCQs generated: ${totalMCQs}`)
  console.log(`Unique Question IDs: ${allIds.size}`)
  console.log(`Errors encountered: ${errorCount}`)
  console.log('Correct Answer Distribution across all 7,000 MCQs:', answerCounts)
  console.log('Domain Distribution across all 7,000 MCQs:', domainCounts)

  await server.close()
  if (errorCount > 0 || totalMCQs !== 7000) {
    process.exit(1)
  }
}

testGenerator().catch(err => {
  console.error(err)
  process.exit(1)
})
