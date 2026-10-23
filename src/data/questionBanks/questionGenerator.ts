import type { LearningResource } from '../../types/resource'
import type { CourseMCQ, QuestionDomain } from '../../types/courseQuiz'
import { CAREER_KNOWLEDGE_MAP } from './careerDomains'

/**
 * Deterministic hash function for uniform distribution of correct answer indices (0..3)
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Shuffles an array with a deterministic seed to position the correct answer uniformly
 */
function assembleOptions(
  correctText: string,
  distractors: [string, string, string],
  targetIndex: number
): { options: [string, string, string, string]; correctIndex: number } {
  const opts: string[] = ['', '', '', '']
  opts[targetIndex] = correctText

  let dIdx = 0
  for (let i = 0; i < 4; i++) {
    if (i !== targetIndex) {
      opts[i] = distractors[dIdx++]
    }
  }

  return {
    options: opts as [string, string, string, string],
    correctIndex: targetIndex,
  }
}

/**
 * Generates exactly 50 distinct, high-quality, course-specific MCQs for a given course.
 */
export function generateCourseQuestions(course: LearningResource): CourseMCQ[] {
  const careerKnowledge = CAREER_KNOWLEDGE_MAP[course.careerId] || {
    careerId: course.careerId,
    coreConcepts: ['Core principles', 'Standard methodologies', 'Quality verification', 'Workflow execution'],
    toolsAndStandards: ['Industry Standard', 'Testing Protocol', 'Safety Regulations'],
    commonFailureModes: ['Operational deviation', 'Inspection omission', 'Miscalibration'],
    diagnosticProcedures: ['Visual inspection', 'Instrumented verification', 'Root cause analysis'],
    safetyAndRegulations: ['Standard PPE', 'Regulatory adherence', 'Safe operating procedures'],
    practicalScenarios: [],
  }

  const skills = course.skillsCovered && course.skillsCovered.length > 0
    ? course.skillsCovered
    : ['Foundational Concepts', 'Practical Procedures', 'Quality Assurance', 'Safety Management']

  const outcomes = course.learningOutcomes && course.learningOutcomes.length > 0
    ? course.learningOutcomes
    : ['Demonstrate core competencies', 'Execute technical tasks accurately', 'Diagnose common issues']

  const questions: CourseMCQ[] = []

  // Generate 50 questions across 5 pedagogical domains:
  // Questions 1-10: Foundational Knowledge
  // Questions 11-20: Conceptual Understanding
  // Questions 21-30: Practical Application
  // Questions 31-40: Troubleshooting & Diagnostics
  // Questions 41-50: Safety & Real-World Scenarios

  for (let i = 1; i <= 50; i++) {
    const qId = `mcq-${course.id}-${i}`
    const seed = simpleHash(`${course.id}-q-${i}`)
    const correctIdx = (seed + i) % 4 // Balanced distribution: 0, 1, 2, 3

    let domain: QuestionDomain = 'foundational'
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
    let topic = ''
    let prompt = ''
    let correct = ''
    let distractors: [string, string, string] = ['', '', '']
    let explanation = ''
    let safetyNote: string | undefined

    const skillIndex = (i - 1) % skills.length
    const currentSkill = skills[skillIndex]
    const currentOutcome = outcomes[(i - 1) % outcomes.length]

    if (i <= 10) {
      // DOMAIN 1: FOUNDATIONAL KNOWLEDGE (Q1 - Q10)
      domain = 'foundational'
      difficulty = 'beginner'
      topic = `${currentSkill} Fundamentals`

      const conceptItem = careerKnowledge.coreConcepts[(i - 1) % careerKnowledge.coreConcepts.length]
      const toolItem = careerKnowledge.toolsAndStandards[(i - 1) % careerKnowledge.toolsAndStandards.length]

      if (i % 2 === 1) {
        prompt = `In the context of ${course.title}, what is the primary role or definition of "${currentSkill}"?`
        correct = `To establish systematic, verified standards for ${currentSkill.toLowerCase()} in accordance with ${course.provider} practices.`
        distractors = [
          `To bypass standard verification protocols and accelerate output without validation.`,
          `To eliminate the need for documentation or quality review in daily operations.`,
          `To replace all diagnostic instruments with visual approximations alone.`,
        ]
        explanation = `In ${course.title}, "${currentSkill}" provides foundational competence, ensuring procedures meet ${course.provider} quality benchmarks rather than ad-hoc shortcuts.`
      } else {
        prompt = `Which core tool or standard is fundamentally utilized when studying ${conceptItem} in ${course.title}?`
        correct = `${toolItem}, which ensures rigorous measurement, verification, and standard compliance.`
        distractors = [
          `Non-standard improvised tools that avoid calibrated measurement checks.`,
          `Unregulated commercial software lacking audit trails or error logging.`,
          `Manual guesswork without reference to standard operational baselines.`,
        ]
        explanation = `${toolItem} is the established industry standard used to measure and verify ${conceptItem} accurately.`
      }
    } else if (i <= 20) {
      // DOMAIN 2: CONCEPTUAL UNDERSTANDING (Q11 - Q20)
      domain = 'conceptual'
      difficulty = i <= 15 ? 'beginner' : 'intermediate'
      topic = `${currentSkill} Principles`

      const conceptA = careerKnowledge.coreConcepts[(i - 1) % careerKnowledge.coreConcepts.length]
      const conceptB = careerKnowledge.coreConcepts[(i + 2) % careerKnowledge.coreConcepts.length]

      prompt = `How does understanding "${currentSkill}" directly impact the learner's ability to ${currentOutcome.toLowerCase()} in ${course.title}?`
      correct = `It provides the theoretical framework needed to analyze ${conceptA} and predict performance outcomes accurately.`
      distractors = [
        `It serves only as decorative terminology with no real influence on field performance.`,
        `It contradicts ${conceptB} and forces operators to ignore standard procedures.`,
        `It limits execution by requiring every minor step to be manually approved by external vendors.`,
      ]
      explanation = `Mastery of ${currentSkill} equips professionals with the conceptual insight needed to ${currentOutcome.toLowerCase()} reliably under variable conditions.`
    } else if (i <= 30) {
      // DOMAIN 3: PRACTICAL APPLICATION (Q21 - Q30)
      domain = 'application'
      difficulty = 'intermediate'
      topic = `Applying ${currentSkill}`

      const tool = careerKnowledge.toolsAndStandards[(i - 1) % careerKnowledge.toolsAndStandards.length]
      const diagnostic = careerKnowledge.diagnosticProcedures[(i - 1) % careerKnowledge.diagnosticProcedures.length]

      prompt = `When executing practical work for "${currentSkill}" in ${course.title}, what is the standard recommended procedure?`
      correct = `Deploy ${tool} to perform ${diagnostic.toLowerCase()}, recording baseline parameters before operational changes.`
      distractors = [
        `Initiate full operational load immediately without recording any baseline parameters.`,
        `Rely on intuitive guesswork and skip using ${tool} to save setup time.`,
        `Alter operational parameters at random until an acceptable visual state is reached.`,
      ]
      explanation = `Systematic execution in ${currentSkill} demands initial baseline documentation via ${tool} prior to making adjustments.`
    } else if (i <= 40) {
      // DOMAIN 4: TROUBLESHOOTING & DIAGNOSTICS (Q31 - Q40)
      domain = 'troubleshooting'
      difficulty = i <= 35 ? 'intermediate' : 'advanced'
      topic = `Diagnosing ${currentSkill}`

      const failure = careerKnowledge.commonFailureModes[(i - 1) % careerKnowledge.commonFailureModes.length]
      const diagnostic = careerKnowledge.diagnosticProcedures[(i - 1) % careerKnowledge.diagnosticProcedures.length]

      prompt = `During a workflow in ${course.title}, the system exhibits symptoms of "${failure}". What is the primary diagnostic step?`
      correct = `Execute ${diagnostic.toLowerCase()} to isolate root cause before replacing components or modifying system logic.`
      distractors = [
        `Power-cycle or reset the equipment repeatedly without recording error codes or symptoms.`,
        `Increase system operational speed to push through the anomaly without inspection.`,
        `Permanently disable alert thresholds and warning indicators to suppress error messages.`,
      ]
      explanation = `Addressing "${failure}" requires targeted root cause analysis via ${diagnostic.toLowerCase()} rather than unmeasured resets.`
    } else {
      // DOMAIN 5: SAFETY & REAL-WORLD SCENARIOS (Q41 - Q50)
      domain = 'safety-scenario'
      difficulty = 'advanced'
      topic = `Safety & Scenario: ${currentSkill}`

      const safetyItem = careerKnowledge.safetyAndRegulations[(i - 1) % careerKnowledge.safetyAndRegulations.length]
      const scenarioIndex = (i - 41) % Math.max(1, careerKnowledge.practicalScenarios.length)
      const scenario = careerKnowledge.practicalScenarios[scenarioIndex]

      if (scenario && (i % 2 === 1)) {
        prompt = `Scenario: ${scenario.situation} In accordance with professional standards taught in ${course.title}, what action should you take?`
        correct = scenario.bestAction
        distractors = scenario.incorrectActions
        explanation = scenario.rationale
      } else {
        prompt = `In the context of ${course.title} and ${currentSkill}, what does the safety guideline "${safetyItem}" mandate?`
        correct = `Strict adherence to verified protocols, risk mitigation controls, and verified energy/hazard isolation.`
        distractors = [
          `Treating safety controls as optional recommendations that can be waived during rush deadlines.`,
          `Relying on personal confidence rather than certified protective equipment and isolation locks.`,
          `Delegating safety inspections solely to unverified third-party casual laborers.`,
        ]
        explanation = `"${safetyItem}" represents a non-negotiable safety standard designed to prevent catastrophic failures, personal injury, or equipment damage.`
      }

      safetyNote = `Notice: Theoretical assessment of safety principles reinforces standard operating awareness but does not replace supervised on-site practical certification.`
    }

    const assembled = assembleOptions(correct, distractors, correctIdx)

    questions.push({
      id: qId,
      careerId: course.careerId,
      courseId: course.id,
      stageId: course.stageId,
      topic,
      domain,
      difficulty,
      question: prompt,
      options: assembled.options,
      correctAnswer: assembled.correctIndex,
      explanation,
      reference: `${course.provider} — Module ${Math.ceil(i / 5)}: ${currentSkill}`,
      safetyNote,
    })
  }

  return questions
}
