import fs from 'node:fs'
import { createServer } from 'vite'

async function rebalance() {
  const server = await createServer({ server: { middlewareMode: true } })
  const { assessments } = await server.ssrLoadModule('./src/data/assessments.ts')

  let code = `import { roadmaps } from './roadmaps'
import type { Assessment, AssessmentQuestion } from '../types/assessment'

const q = (id: string, prompt: string, options: string[], correctAnswer: number, explanation: string): AssessmentQuestion => ({
  id,
  prompt,
  options,
  correctAnswer,
  explanation,
})

const stage = (careerId: string, index: number) =>
  roadmaps.find((item) => item.careerId === careerId)?.stages[index]?.id ?? ''

export const assessments: Assessment[] = [
`

  const dist = { 0: 0, 1: 0, 2: 0, 3: 0 }

  assessments.forEach((ass, aIdx) => {
    code += `  {\n`
    code += `    id: ${JSON.stringify(ass.id)},\n`
    code += `    careerId: ${JSON.stringify(ass.careerId)},\n`
    code += `    stageId: stage(${JSON.stringify(ass.careerId)}, 0),\n`
    code += `    title: ${JSON.stringify(ass.title)},\n`
    code += `    description: ${JSON.stringify(ass.description)},\n`
    code += `    passingPercentage: ${ass.passingPercentage},\n`
    code += `    questions: [\n`

    ass.questions.forEach((question, qIdx) => {
      const originalCorrectText = question.options[question.correctAnswer]
      const distractors = question.options.filter((_, idx) => idx !== question.correctAnswer)

      const targetIndex = (qIdx + aIdx) % 4
      const newOptions = []
      let distractorIdx = 0
      for (let i = 0; i < 4; i++) {
        if (i === targetIndex) {
          newOptions.push(originalCorrectText)
        } else {
          newOptions.push(distractors[distractorIdx++])
        }
      }

      dist[targetIndex]++

      code += `      q(${JSON.stringify(question.id)}, ${JSON.stringify(question.prompt)}, ${JSON.stringify(newOptions)}, ${targetIndex}, ${JSON.stringify(question.explanation)}),\n`
    })

    code += `    ],\n`
    code += `  },\n`
  })

  code += `]

export const getAssessmentById = (id?: string) => {
  if (!id) return undefined
  if (id === 'assessment-data-analytics-artificial-intelligence' || id === 'data-analytics-artificial-intelligence') {
    return assessments.find((a) => a.id === 'assessment-data-analytics')
  }
  return (
    assessments.find((assessment) => assessment.id === id) ??
    assessments.find((assessment) => assessment.careerId === id) ??
    assessments.find((assessment) => assessment.id === \`assessment-\${id}\`)
  )
}
`

  fs.writeFileSync('./src/data/assessments.ts', code, 'utf-8')
  console.log('Successfully rebalanced assessments!')
  console.log('New answer distribution:', dist)

  await server.close()
}

rebalance()
