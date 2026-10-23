import { careers } from './careers'
import { getRoadmapByCareerId } from './roadmaps'
import { readAttempts } from '../services/assessmentService'
import { readProgress } from '../services/progressService'
import type { BadgeDefinition, EarnedBadge } from '../types/badge'

export const badgeDefinitions: BadgeDefinition[] = [
  { id: 'first-stage-completed', title: 'First Stage Completed', description: 'You completed your first roadmap stage.', requirement: 'Complete any roadmap stage.', icon: 'flag' },
  { id: 'networking-fundamentals', title: 'Networking Fundamentals', description: 'You passed the Cybersecurity Networking assessment.', requirement: 'Pass the Cybersecurity Networking assessment.', icon: 'network' },
  { id: 'cybersecurity-beginner', title: 'Cybersecurity Beginner', description: 'You completed the first three Cybersecurity stages.', requirement: 'Complete the first three Cybersecurity stages.', icon: 'shield' },
  { id: 'cloud-fundamentals', title: 'Cloud Fundamentals', description: 'You passed the Cloud assessment.', requirement: 'Pass the Cloud Computing & DevOps assessment.', icon: 'cloud' },
  { id: 'web-development-foundations', title: 'Web Development Foundations', description: 'You passed the Software Development assessment.', requirement: 'Pass the Software & Web Development assessment.', icon: 'code' },
  { id: 'assessment-excellence', title: 'Assessment Excellence', description: 'You scored at least 90% on an assessment.', requirement: 'Score 90% or higher on any assessment.', icon: 'star' },
  { id: 'pathway-completion', title: 'Pathway Completion', description: 'You completed every stage in a career pathway.', requirement: 'Complete all stages in any career.', icon: 'trophy' },
  { id: 'agritech-green-pioneer', title: 'AgriTech & Green Pioneer', description: 'You passed the Agriculture or Solar Energy assessment.', requirement: 'Pass Agriculture & AgriTech or Solar Energy assessment.', icon: 'leaf' },
  { id: 'skilled-craftsman', title: 'Master Craftsman', description: 'You passed the Carpentry, Tailoring, or Construction assessment.', requirement: 'Pass Carpentry, Tailoring, or Construction assessment.', icon: 'tool' },
  { id: 'multi-pathway-explorer', title: 'Multi-Pathway Explorer', description: 'You completed stages across at least 3 different career fields.', requirement: 'Complete stages in at least 3 distinct career pathways.', icon: 'compass' },
]

export function getEarnedBadges(): EarnedBadge[] {
  const progress = readProgress()
  const attempts = readAttempts()
  const earned: EarnedBadge[] = []

  const first = progress.stages.find((item) => item.completed)
  if (first) {
    earned.push({ ...badgeDefinitions[0], earnedAt: first.completedAt ?? new Date().toISOString() })
  }

  const pass = (id: string) => attempts.find((item) => (item.assessmentId === id || item.assessmentId === `assessment-${id}`) && item.passed)

  if (pass('assessment-cybersecurity-networking') || pass('cybersecurity-ethical-hacking')) {
    earned.push({ ...badgeDefinitions[1], earnedAt: pass('assessment-cybersecurity-networking')?.attemptedAt ?? new Date().toISOString() })
  }

  const cyber = getRoadmapByCareerId('cybersecurity-ethical-hacking')
  if (cyber && cyber.stages.slice(0, 3).every((stage) => progress.stages.some((item) => item.stageId === stage.id && item.completed))) {
    earned.push({ ...badgeDefinitions[2], earnedAt: new Date().toISOString() })
  }

  if (pass('cloud-computing-devops')) {
    earned.push({ ...badgeDefinitions[3], earnedAt: pass('cloud-computing-devops')?.attemptedAt ?? new Date().toISOString() })
  }

  if (pass('software-web-development')) {
    earned.push({ ...badgeDefinitions[4], earnedAt: pass('software-web-development')?.attemptedAt ?? new Date().toISOString() })
  }

  const excellence = attempts.find((item) => item.percentage >= 90)
  if (excellence) {
    earned.push({ ...badgeDefinitions[5], earnedAt: excellence.attemptedAt })
  }

  if (careers.some((career) => {
    const roadmap = getRoadmapByCareerId(career.id)
    return roadmap && roadmap.stages.length > 0 && roadmap.stages.every((stage) => progress.stages.some((item) => item.stageId === stage.id && item.completed))
  })) {
    earned.push({ ...badgeDefinitions[6], earnedAt: new Date().toISOString() })
  }

  if (pass('agriculture-agritech') || pass('solar-energy-green-jobs') || pass('food-processing-preservation')) {
    earned.push({ ...badgeDefinitions[7], earnedAt: new Date().toISOString() })
  }

  if (pass('carpentry-woodworking-furniture') || pass('tailoring-stitching-apparel') || pass('construction-skilled-trades')) {
    earned.push({ ...badgeDefinitions[8], earnedAt: new Date().toISOString() })
  }

  const distinctCareersCompleted = new Set(progress.stages.filter((item) => item.completed).map((item) => item.careerId)).size
  if (distinctCareersCompleted >= 3) {
    earned.push({ ...badgeDefinitions[9], earnedAt: new Date().toISOString() })
  }

  return earned
}
