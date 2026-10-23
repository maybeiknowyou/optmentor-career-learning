import type { Career } from '../../../types/career'
import { CareerCard } from './CareerCard'
import { AnimatedReveal } from '../../../components/motion/AnimatedReveal'

export function CareerGrid({ careers }: { careers: Career[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {careers.map((career, index) => (
        <AnimatedReveal key={career.id} delay={Math.min(index * 35, 400)}>
          <CareerCard career={career} index={careerIndex(career.id, index)} />
        </AnimatedReveal>
      ))}
    </div>
  )
}

const orderedCareerIds = [
  'cybersecurity-ethical-hacking',
  'cloud-computing-devops',
  'software-web-development',
  'artificial-intelligence-machine-learning',
  'data-analytics',
  'it-support-hardware-networking',
  'mechanical-engineering-manufacturing',
  'electrical-industrial-maintenance',
  'mining-mineral-processing',
  'steel-metallurgical-industries',
  'industrial-automation-cnc-robotics',
  'agriculture-agritech',
  'food-processing-preservation',
  'dairy-fisheries-animal-husbandry',
  'tailoring-stitching-apparel',
  'solar-energy-green-jobs',
  'construction-skilled-trades',
  'carpentry-woodworking-furniture',
  'digital-marketing-entrepreneurship',
  'healthcare-assistance-community-health',
]

function careerIndex(id: string, fallback: number) {
  const found = orderedCareerIds.indexOf(id)
  return found >= 0 ? found : fallback
}
