export const careerCategories = [
  'Digital Technology',
  'IT Infrastructure',
  'Engineering & Manufacturing',
  'Core Industries',
] as const

export type CareerCategory = (typeof careerCategories)[number]

export interface CareerImageAsset {
  src: string
  alt: string
  attribution: string
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
}
