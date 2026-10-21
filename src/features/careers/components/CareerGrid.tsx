import type { Career } from '../../../types/career'
import { CareerCard } from './CareerCard'
import { AnimatedReveal } from '../../../components/motion/AnimatedReveal'

export function CareerGrid({ careers }: { careers: Career[] }) {
  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{careers.map((career, index) => <AnimatedReveal key={career.id} delay={index * 45}><CareerCard career={career} index={careerIndex(career.id)} /></AnimatedReveal>)}</div>
}

const orderedCareerIds = [
  'cybersecurity-ethical-hacking', 'cloud-computing-devops', 'software-web-development',
  'data-analytics-artificial-intelligence', 'it-support-hardware-networking',
  'mechanical-engineering-manufacturing', 'electrical-industrial-maintenance',
  'mining-mineral-processing', 'steel-metallurgical-industries',
  'industrial-automation-cnc-robotics',
]

function careerIndex(id: string) { return orderedCareerIds.indexOf(id) }
