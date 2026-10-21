import type { Roadmap, RoadmapDifficulty, RoadmapStage } from '../types/roadmap'

interface StageSeed {
  title: string
  description: string
  difficulty?: RoadmapDifficulty
  objectives: string[]
}

function stageId(careerId: string, title: string) {
  return `${careerId}--${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
}

function createRoadmap(careerId: string, title: string, description: string, seeds: StageSeed[]): Roadmap {
  const roadmapId = `roadmap-${careerId}`
  const stages: RoadmapStage[] = seeds.map((seed, index) => ({
    id: stageId(careerId, seed.title),
    roadmapId,
    careerId,
    order: index + 1,
    title: seed.title,
    description: seed.description,
    difficulty: seed.difficulty ?? (index < 3 ? 'beginner' : index < 7 ? 'intermediate' : 'advanced'),
    prerequisiteStageId: index > 0 ? stageId(careerId, seeds[index - 1].title) : undefined,
    learningObjectives: seed.objectives,
  }))
  return { id: roadmapId, careerId, title, description, stages }
}

export const roadmaps: Roadmap[] = [
  createRoadmap('cybersecurity-ethical-hacking', 'Cybersecurity & Ethical Hacking Roadmap', 'Build security foundations before moving into authorized testing and defensive practice.', [
    { title: 'Networking Fundamentals', description: 'Understand how devices, protocols and networks communicate.', objectives: ['Explain core networking concepts', 'Recognize common protocols and addressing', 'Trace a simple client-server connection'] },
    { title: 'Operating Systems', description: 'Learn how operating systems manage users, processes, files and permissions.', objectives: ['Describe operating system responsibilities', 'Work with users and permissions', 'Identify common system components'] },
    { title: 'Linux', description: 'Develop practical command-line and system-navigation foundations.', objectives: ['Navigate a Linux filesystem', 'Use essential shell commands', 'Read basic system and process information'] },
    { title: 'Cybersecurity Fundamentals', description: 'Learn security principles, threats, risk and responsible practice.', objectives: ['Explain confidentiality, integrity and availability', 'Recognize common threat categories', 'Apply basic risk and defense vocabulary'] },
    { title: 'Network Security', description: 'Explore controls that protect networks and services.', objectives: ['Describe firewalls and segmentation', 'Recognize secure network patterns', 'Explain monitoring and access controls'] },
    { title: 'Web Security', description: 'Understand common web risks and secure development concepts.', objectives: ['Identify common web vulnerability classes', 'Explain input validation and session safety', 'Use safe, authorized learning labs'] },
    { title: 'Ethical Hacking Fundamentals', description: 'Study the authorized security-testing lifecycle and reporting.', objectives: ['Describe a legal testing workflow', 'Plan scoped reconnaissance', 'Write clear findings and remediation notes'] },
    { title: 'Defensive Security', description: 'Learn how teams detect, investigate and respond to incidents.', objectives: ['Recognize security event patterns', 'Describe incident response stages', 'Explain basic defensive monitoring'] },
    { title: 'Authorized Practical Labs', description: 'Apply concepts in controlled labs with explicit permission and safe boundaries.', objectives: ['Follow a written lab scope', 'Document observations reproducibly', 'Reflect on mitigations and next steps'] },
  ]),
  createRoadmap('cloud-computing-devops', 'Cloud Computing & DevOps Roadmap', 'Move from systems foundations into cloud delivery, automation and observability.', ['Linux', 'Networking', 'Git', 'Cloud Fundamentals', 'AWS/Azure Concepts', 'Docker', 'CI/CD', 'Infrastructure as Code', 'Kubernetes', 'Monitoring'].map((title, index) => ({ title, description: `Build practical ${title.toLowerCase()} knowledge for modern cloud operations.`, objectives: [`Explain ${title.toLowerCase()} concepts`, `Practice a beginner ${title.toLowerCase()} workflow`, 'Connect the concept to reliable software delivery'], difficulty: index > 6 ? 'advanced' : undefined }))),
  createRoadmap('software-web-development', 'Software & Web Development Roadmap', 'Progress from web foundations to full-stack projects through deliberate practice.', ['HTML', 'CSS', 'JavaScript', 'Git/GitHub', 'Responsive Design', 'React', 'Backend Development', 'Databases', 'APIs', 'Full-Stack Projects'].map((title, index) => ({ title, description: `Learn the role of ${title} in building usable, maintainable software.`, objectives: [`Describe the fundamentals of ${title}`, `Build a small practice example`, 'Review work for clarity and accessibility'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('data-analytics-artificial-intelligence', 'Data Analytics & Artificial Intelligence Roadmap', 'Build analytical fluency before applying machine learning and AI to projects.', ['Excel', 'Statistics', 'SQL', 'Python', 'Pandas', 'Data Visualization', 'Machine Learning Fundamentals', 'Model Evaluation', 'AI Projects'].map((title, index) => ({ title, description: `Develop practical ${title.toLowerCase()} skills for evidence-based decisions.`, objectives: [`Explain key ${title.toLowerCase()} ideas`, `Complete a guided practice task`, 'Communicate findings with appropriate context'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('it-support-hardware-networking', 'IT Support, Hardware & Networking Roadmap', 'Learn the foundations of reliable technical support and connected systems.', ['Computer Hardware', 'Operating Systems', 'Troubleshooting', 'Networking Fundamentals', 'Routers & Switches', 'System Administration', 'Network Security', 'Help Desk Practice'].map((title, index) => ({ title, description: `Build practical understanding of ${title.toLowerCase()} for support environments.`, objectives: [`Describe ${title.toLowerCase()} fundamentals`, 'Use a structured troubleshooting approach', 'Document a clear support outcome'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('mechanical-engineering-manufacturing', 'Mechanical Engineering & Manufacturing Roadmap', 'Connect engineering fundamentals to design, production and quality practice.', ['Engineering Fundamentals', 'Engineering Drawing', 'Materials', 'CAD', 'Manufacturing Processes', 'Quality Control', 'Production Systems', 'Practical Projects'].map((title, index) => ({ title, description: `Explore ${title.toLowerCase()} as part of a safe, supervised manufacturing pathway.`, objectives: [`Explain ${title.toLowerCase()} concepts`, 'Interpret a simple technical example', 'Identify relevant safety and quality considerations'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('electrical-industrial-maintenance', 'Electrical & Industrial Maintenance Roadmap', 'Build electrical theory and maintenance awareness with safety as the foundation.', ['Electrical Fundamentals', 'Electrical Safety', 'Circuit Theory', 'Electrical Machines', 'Motors', 'Industrial Wiring Concepts', 'Troubleshooting', 'Preventive Maintenance'].map((title, index) => ({ title, description: `Study ${title.toLowerCase()} concepts for supervised industrial maintenance learning.`, objectives: [`Explain ${title.toLowerCase()} principles`, 'Interpret a basic maintenance scenario', 'Identify when qualified supervision is required'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('mining-mineral-processing', 'Mining & Mineral Processing Roadmap', 'Explore extraction, processing, equipment, safety and environmental responsibility.', ['Mining Fundamentals', 'Geology', 'Mining Methods', 'Mineral Extraction', 'Mineral Processing', 'Equipment', 'Safety', 'Environmental Practices'].map((title, index) => ({ title, description: `Understand the role of ${title.toLowerCase()} in responsible mining operations.`, objectives: [`Explain ${title.toLowerCase()} fundamentals`, 'Connect the concept to an operational example', 'Identify safety and environmental considerations'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('steel-metallurgical-industries', 'Steel & Metallurgical Industries Roadmap', 'Move from materials science into steel production, testing and quality systems.', ['Materials Science', 'Metallurgy', 'Iron & Steel Production', 'Furnaces', 'Heat Treatment', 'Material Testing', 'Quality Control', 'Industrial Safety'].map((title, index) => ({ title, description: `Study ${title.toLowerCase()} within the steel and metallurgical process chain.`, objectives: [`Describe ${title.toLowerCase()} concepts`, 'Interpret a simplified industrial example', 'Relate the topic to product quality and safety'], difficulty: index > 5 ? 'advanced' : undefined }))),
  createRoadmap('industrial-automation-cnc-robotics', 'Industrial Automation, CNC & Robotics Roadmap', 'Connect manufacturing foundations with programmable machines and automation systems.', ['Manufacturing Fundamentals', 'Engineering Drawing', 'CNC Fundamentals', 'G-Code', 'Sensors', 'PLC', 'SCADA', 'Industrial Robotics', 'Automation Projects'].map((title, index) => ({ title, description: `Build a safe conceptual foundation in ${title.toLowerCase()} for automation work.`, objectives: [`Explain ${title.toLowerCase()} fundamentals`, 'Interpret a guided automation example', 'Identify safe boundaries for practical work'], difficulty: index > 5 ? 'advanced' : undefined }))),
]

export function getRoadmapByCareerId(careerId?: string) {
  return roadmaps.find((roadmap) => roadmap.careerId === careerId)
}

export function getStageById(careerId?: string, stageId?: string) {
  return getRoadmapByCareerId(careerId)?.stages.find((stage) => stage.id === stageId)
}

export function getStageStatus(stage: RoadmapStage): 'available' | 'locked' {
  return stage.prerequisiteStageId ? 'locked' : 'available'
}
