import { Award, BookOpen, ClipboardCheck, PanelsTopLeft } from 'lucide-react'

export const moduleNavigation = [
  { label: 'Career Fields', to: '/career-learning/careers', icon: PanelsTopLeft },
  { label: 'My Learning', to: '/career-learning/learning', icon: BookOpen },
  { label: 'Assessments', to: '/career-learning/assessments', icon: ClipboardCheck },
  { label: 'Badges', to: '/career-learning/badges', icon: Award },
] as const
