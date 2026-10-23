export const careerCategories = [
  'Digital Technology',
  'IT Infrastructure',
  'Engineering & Manufacturing',
  'Core Industries',
  'Agriculture & Food',
  'Green Jobs & Energy',
  'Skilled Trades & Crafts',
  'Healthcare & Community',
] as const

export type CareerCategory = (typeof careerCategories)[number]

export interface CareerImageAsset {
  src: string
  alt: string
  attribution: string
}

export interface CareerSalaryInfo {
  range: string
  period: string
  note: string
  isEstimate: boolean
}

export interface CareerMarketOutlook {
  demandLevel: 'High' | 'Steady' | 'Growing' | 'Emerging'
  growthSummary: string
  topLocations?: string[]
}

export interface CareerOpportunity {
  title: string
  type: 'Full-time' | 'Apprenticeship' | 'Internship' | 'Trainee'
  organizationType: string
  skillsRequired: string[]
  description: string
  samplePortalUrl?: string
  portalName?: string
}

export interface TrainingInstitution {
  name: string
  type: 'ITI' | 'Polytechnic' | 'University' | 'Vocational Center' | 'Govt Scheme'
  location: string
  programsOffered: string[]
  websiteUrl?: string
}

export interface Career {
  id: string
  title: string
  category: CareerCategory
  shortDescription: string
  detailedDescription: string
  image: CareerImageAsset
  keySkills: string[]
  exampleRoles: string[]
  roadmapId: string
  difficulty?: 'Beginner' | 'Intermediate' | 'All Levels'
  salaryEstimate?: CareerSalaryInfo
  marketOutlook?: CareerMarketOutlook
  introVideoUrl?: string
  externalLearningUrl?: string
  relatedCareerIds?: string[]
  sampleOpportunities?: CareerOpportunity[]
  institutions?: TrainingInstitution[]
}
