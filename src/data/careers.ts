import automationImage from '../assets/careers/automation.png'
import cloudImage from '../assets/careers/cloud-devops.png'
import cybersecurityImage from '../assets/careers/cybersecurity.png'
import dataImage from '../assets/careers/data-ai.png'
import electricalImage from '../assets/careers/electrical.png'
import itSupportImage from '../assets/careers/it-support.png'
import mechanicalImage from '../assets/careers/mechanical.png'
import miningImage from '../assets/careers/mining.png'
import softwareImage from '../assets/careers/software-web.png'
import steelImage from '../assets/careers/steel.png'
import type { Career } from '../types/career'

const generatedAttribution = 'Original AI-generated image created for OptMentor with OpenAI, 2026-10-21.'

export const careers: Career[] = [
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Digital Technology',
    shortDescription: 'Learn to protect systems, networks and data through secure, authorized practices.',
    detailedDescription: 'Build a foundation in networking, operating systems, security principles, defensive monitoring and ethical testing performed only with clear authorization.',
    image: { src: cybersecurityImage, alt: 'Cybersecurity analyst monitoring network activity in a security operations center', attribution: generatedAttribution },
    keySkills: ['Networking', 'Linux', 'Security monitoring', 'Web security', 'Ethical testing'],
    exampleRoles: ['Security Operations Analyst', 'Junior Security Analyst', 'Vulnerability Assessment Associate'],
    roadmapId: 'roadmap-cybersecurity-ethical-hacking',
  },
  {
    id: 'cloud-computing-devops',
    title: 'Cloud Computing & DevOps',
    category: 'Digital Technology',
    shortDescription: 'Build, deploy and operate modern applications using cloud and automation tools.',
    detailedDescription: 'Learn Linux, networking, version control, cloud fundamentals, containers, delivery pipelines, infrastructure automation and service monitoring.',
    image: { src: cloudImage, alt: 'Cloud engineer working with a laptop beside data-center servers', attribution: generatedAttribution },
    keySkills: ['Linux', 'Cloud platforms', 'Git', 'Containers', 'CI/CD'],
    exampleRoles: ['Cloud Support Associate', 'Junior DevOps Engineer', 'Platform Operations Associate'],
    roadmapId: 'roadmap-cloud-computing-devops',
  },
  {
    id: 'software-web-development',
    title: 'Software & Web Development',
    category: 'Digital Technology',
    shortDescription: 'Create accessible websites, applications and reliable software solutions.',
    detailedDescription: 'Progress from web foundations and responsive interfaces to React, backend concepts, databases, APIs and complete portfolio projects.',
    image: { src: softwareImage, alt: 'Software developer building an application on a laptop', attribution: generatedAttribution },
    keySkills: ['HTML', 'CSS', 'JavaScript', 'React', 'APIs'],
    exampleRoles: ['Junior Web Developer', 'Frontend Developer', 'Software Development Associate'],
    roadmapId: 'roadmap-software-web-development',
  },
  {
    id: 'data-analytics-artificial-intelligence',
    title: 'Data Analytics & Artificial Intelligence',
    category: 'Digital Technology',
    shortDescription: 'Turn data into useful insights and build foundational machine-learning skills.',
    detailedDescription: 'Develop practical ability in spreadsheets, statistics, SQL, Python, data visualization, machine-learning concepts and responsible AI projects.',
    image: { src: dataImage, alt: 'Data analyst reviewing charts and model visualizations on multiple monitors', attribution: generatedAttribution },
    keySkills: ['Excel', 'Statistics', 'SQL', 'Python', 'Data visualization'],
    exampleRoles: ['Junior Data Analyst', 'Reporting Analyst', 'Machine Learning Trainee'],
    roadmapId: 'roadmap-data-analytics-artificial-intelligence',
  },
  {
    id: 'it-support-hardware-networking',
    title: 'IT Support, Hardware & Networking',
    category: 'IT Infrastructure',
    shortDescription: 'Understand computer hardware, troubleshoot systems and support connected devices.',
    detailedDescription: 'Learn PC components, operating systems, systematic troubleshooting, network fundamentals, administration and practical help-desk workflows.',
    image: { src: itSupportImage, alt: 'IT support technician inspecting computer hardware at a workbench', attribution: generatedAttribution },
    keySkills: ['Computer hardware', 'Troubleshooting', 'Operating systems', 'Networking', 'Help desk'],
    exampleRoles: ['IT Support Technician', 'Help Desk Associate', 'Network Support Trainee'],
    roadmapId: 'roadmap-it-support-hardware-networking',
  },
  {
    id: 'mechanical-engineering-manufacturing',
    title: 'Mechanical Engineering & Manufacturing',
    category: 'Engineering & Manufacturing',
    shortDescription: 'Explore mechanical systems, design thinking and modern production processes.',
    detailedDescription: 'Study engineering fundamentals, technical drawing, materials, CAD, manufacturing methods, quality control and supervised practical projects.',
    image: { src: mechanicalImage, alt: 'Mechanical engineer inspecting a precision-machined component in a factory', attribution: generatedAttribution },
    keySkills: ['Engineering drawing', 'Materials', 'CAD', 'Manufacturing processes', 'Quality control'],
    exampleRoles: ['Mechanical Design Trainee', 'Production Associate', 'Quality Technician'],
    roadmapId: 'roadmap-mechanical-engineering-manufacturing',
  },
  {
    id: 'electrical-industrial-maintenance',
    title: 'Electrical & Industrial Maintenance',
    category: 'Engineering & Manufacturing',
    shortDescription: 'Learn electrical principles, safe maintenance concepts and fault diagnosis.',
    detailedDescription: 'Build theoretical knowledge in electrical safety, circuits, machines, motors, industrial wiring, troubleshooting and preventive maintenance.',
    image: { src: electricalImage, alt: 'Electrical maintenance technician safely inspecting an industrial control cabinet', attribution: generatedAttribution },
    keySkills: ['Electrical safety', 'Circuit theory', 'Motors', 'Troubleshooting', 'Preventive maintenance'],
    exampleRoles: ['Electrical Maintenance Trainee', 'Industrial Technician', 'Maintenance Assistant'],
    roadmapId: 'roadmap-electrical-industrial-maintenance',
  },
  {
    id: 'mining-mineral-processing',
    title: 'Mining & Mineral Processing',
    category: 'Core Industries',
    shortDescription: 'Understand responsible mineral extraction, processing, safety and environmental care.',
    detailedDescription: 'Explore geology, mining methods, mineral extraction, processing equipment, occupational safety and responsible environmental practices.',
    image: { src: miningImage, alt: 'Mining engineer viewing an open-pit mine and mineral processing operation from a safe lookout', attribution: generatedAttribution },
    keySkills: ['Geology basics', 'Mining methods', 'Mineral processing', 'Equipment awareness', 'Safety'],
    exampleRoles: ['Mining Operations Trainee', 'Mineral Processing Assistant', 'Safety and Environment Assistant'],
    roadmapId: 'roadmap-mining-mineral-processing',
  },
  {
    id: 'steel-metallurgical-industries',
    title: 'Steel & Metallurgical Industries',
    category: 'Core Industries',
    shortDescription: 'Study metals, steel production, testing, heat treatment and industrial quality.',
    detailedDescription: 'Learn materials science, metallurgy, iron and steel production, furnaces, heat treatment, material testing, quality and industrial safety.',
    image: { src: steelImage, alt: 'Metallurgical engineer observing steel production from a protected control area', attribution: generatedAttribution },
    keySkills: ['Materials science', 'Metallurgy', 'Steel production', 'Material testing', 'Industrial safety'],
    exampleRoles: ['Metallurgy Trainee', 'Quality Control Assistant', 'Steel Plant Operations Trainee'],
    roadmapId: 'roadmap-steel-metallurgical-industries',
  },
  {
    id: 'industrial-automation-cnc-robotics',
    title: 'Industrial Automation, CNC & Robotics',
    category: 'Engineering & Manufacturing',
    shortDescription: 'Connect manufacturing, CNC systems, industrial control and robotics.',
    detailedDescription: 'Develop foundations in technical drawing, CNC and G-code, sensors, PLCs, SCADA, industrial robotics and supervised automation projects.',
    image: { src: automationImage, alt: 'Automation engineer operating a guarded robotic CNC manufacturing cell', attribution: generatedAttribution },
    keySkills: ['CNC', 'G-code', 'Sensors', 'PLC', 'Industrial robotics'],
    exampleRoles: ['CNC Operator Trainee', 'Automation Technician', 'PLC and Controls Trainee'],
    roadmapId: 'roadmap-industrial-automation-cnc-robotics',
  },
]

export function getCareerById(id?: string) {
  return careers.find((career) => career.id === id)
}
