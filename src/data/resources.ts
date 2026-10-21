import { roadmaps } from './roadmaps'
import type { LearningResource, ResourceDifficulty, ResourceType } from '../types/resource'

type Template = Omit<LearningResource, 'id' | 'careerId' | 'stageId'>

const verified: Record<string, Template> = {
  Networking: { title: 'Networking Basics', provider: 'Cisco Networking Academy', url: 'https://www.netacad.com/courses/networking/networking-basics', type: 'course', difficulty: 'beginner', description: 'Build foundational networking knowledge with Cisco learning materials.', freeAccessStatus: 'free', certificateStatus: 'unknown', verificationStatus: 'pending' },
  Linux: { title: 'Command Line for Beginners', provider: 'Ubuntu', url: 'https://ubuntu.com/tutorials/command-line-for-beginners', type: 'reading', difficulty: 'beginner', description: 'Practice essential Linux command-line skills in a guided tutorial.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  Web: { title: 'Web Security Academy', provider: 'PortSwigger', url: 'https://portswigger.net/web-security', type: 'lab', difficulty: 'intermediate', description: 'Free interactive web security learning materials and labs.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  Cloud: { title: 'Describe cloud concepts', provider: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-gb/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', type: 'course', difficulty: 'beginner', description: 'Learn core cloud concepts through Microsoft Learn modules.', freeAccessStatus: 'free', certificateStatus: 'unknown', verificationStatus: 'verified' },
  Git: { title: 'Pro Git Book', provider: 'Git SCM', url: 'https://git-scm.com/book/en/v2', type: 'documentation', difficulty: 'beginner', description: 'Read the free official book covering Git fundamentals and workflows.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  HTML: { title: 'Learn web development', provider: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'documentation', difficulty: 'beginner', description: 'Use the open MDN curriculum for HTML, CSS and browser fundamentals.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  Python: { title: 'Scientific Computing with Python', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', type: 'course', difficulty: 'beginner', description: 'Practice Python through a free, project-based curriculum.', freeAccessStatus: 'free', certificateStatus: 'free', verificationStatus: 'verified' },
  SQL: { title: 'Intro to SQL', provider: 'Khan Academy', url: 'https://www.khanacademy.org/computing/computer-programming/sql', type: 'course', difficulty: 'beginner', description: 'Learn SQL querying and relational database concepts.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  Docker: { title: 'Get started with Docker', provider: 'Docker', url: 'https://docs.docker.com/get-started/', type: 'documentation', difficulty: 'intermediate', description: 'Follow the official hands-on path for containers and Docker workflows.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  Kubernetes: { title: 'Kubernetes Basics', provider: 'Kubernetes', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', type: 'course', difficulty: 'intermediate', description: 'Interactive official tutorial for deploying and scaling containerized applications.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  React: { title: 'Learn React', provider: 'React', url: 'https://react.dev/learn', type: 'documentation', difficulty: 'intermediate', description: 'Use the official React learning path to build component-based interfaces.', freeAccessStatus: 'free', certificateStatus: 'not-offered', verificationStatus: 'verified' },
  AWS: { title: 'AWS Cloud Practitioner Essentials', provider: 'AWS Skill Builder', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'course', difficulty: 'beginner', description: 'Explore core AWS cloud concepts and services.', freeAccessStatus: 'free', certificateStatus: 'unknown', verificationStatus: 'pending' },
  Pending: { title: 'Recommended learning materials', provider: 'Official provider catalog', url: 'https://ocw.mit.edu/search/', type: 'reading', difficulty: 'beginner', description: 'A starting point for finding a free, relevant topic resource; exact stage matching remains to be curated.', freeAccessStatus: 'unknown', certificateStatus: 'unknown', verificationStatus: 'pending' },
}

function chooseTemplate(title: string): Template {
  const t = title.toLowerCase()
  if (t.includes('web security') || t.includes('application security')) return verified.Web
  if (t.includes('linux')) return verified.Linux
  if (t.includes('network')) return verified.Networking
  if (t.includes('cloud')) return t.includes('aws') ? verified.AWS : verified.Cloud
  if (t.includes('git') || t.includes('version')) return verified.Git
  if (t.includes('html') || t.includes('css') || t.includes('frontend') || t.includes('web development')) return verified.HTML
  if (t.includes('python')) return verified.Python
  if (t.includes('sql') || t.includes('database')) return verified.SQL
  if (t.includes('docker') || t.includes('container')) return verified.Docker
  if (t.includes('kubernetes')) return verified.Kubernetes
  if (t.includes('react')) return verified.React
  return verified.Pending
}

function makeResource(careerId: string, stageId: string, title: string, extra = ''): LearningResource {
  const template = chooseTemplate(title)
  return { ...template, id: `${careerId}--${stageId}--${extra || 'primary'}`, careerId, stageId, title: extra ? `${template.title} — ${extra}` : template.title }
}

export const resources: LearningResource[] = roadmaps.flatMap((roadmap) => roadmap.stages.flatMap((stage) => {
  const items = [makeResource(roadmap.careerId, stage.id, stage.title)]
  if (roadmap.careerId === 'cybersecurity-ethical-hacking') {
    items.push(makeResource(roadmap.careerId, stage.id, stage.title, 'Additional pathway'))
    if (stage.title.toLowerCase().includes('web')) items.push({ ...makeResource(roadmap.careerId, stage.id, stage.title, 'Server-side labs'), url: 'https://portswigger.net/web-security/learning-paths/server-side-vulnerabilities-apprentice' })
  }
  return items
}))

export function resourcesForCareer(careerId: string) { return resources.filter((resource) => resource.careerId === careerId) }
export function resourcesForStage(careerId: string, stageId: string) { return resources.filter((resource) => resource.careerId === careerId && resource.stageId === stageId) }
export function resourceStats() { return { total: resources.length, stagesCovered: new Set(resources.map((resource) => `${resource.careerId}:${resource.stageId}`)).size, verified: resources.filter((resource) => resource.verificationStatus === 'verified').length, pending: resources.filter((resource) => resource.verificationStatus === 'pending').length } }

export type { ResourceDifficulty, ResourceType }
