import automationImage from '../assets/careers/automation.png'
import cloudImage from '../assets/careers/cloud-devops.png'
import cybersecurityImage from '../assets/careers/cybersecurity.png'
import electricalImage from '../assets/careers/electrical.png'
import itSupportImage from '../assets/careers/it-support.png'
import mechanicalImage from '../assets/careers/mechanical.png'
import miningImage from '../assets/careers/mining.png'
import softwareImage from '../assets/careers/software-web.png'
import steelImage from '../assets/careers/steel.png'

import aiMlImage from '../assets/careers/ai-ml.png'
import dataAnalyticsImage from '../assets/careers/data-analytics.png'
import agricultureImage from '../assets/careers/agriculture.png'
import foodProcessingImage from '../assets/careers/food-processing.png'
import dairyFisheriesImage from '../assets/careers/dairy-fisheries.png'
import tailoringApparelImage from '../assets/careers/tailoring-apparel.png'
import solarEnergyImage from '../assets/careers/solar-energy.png'
import constructionImage from '../assets/careers/construction-skilled-trades.png'
import carpentryImage from '../assets/careers/carpentry-woodworking.png'
import digitalMarketingImage from '../assets/careers/digital-marketing.png'
import healthcareImage from '../assets/careers/healthcare-community.png'

import type { Career } from '../types/career'

const generatedAttribution = 'Original photographic asset created for OptMentor prototype, 2026.'
const generatedCareerAttribution = 'Original AI-generated career artwork created for OptMentor prototype, 2026.'

export const careers: Career[] = [
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Digital Technology',
    difficulty: 'Beginner',
    shortDescription: 'Learn to protect systems, networks and data through secure, authorized practices.',
    detailedDescription: 'Build a rigorous foundation in networking, Linux operating systems, security principles, defensive monitoring and authorized vulnerability assessment. Learn ethical testing workflows that operate strictly within legal, structured boundaries.',
    image: { src: cybersecurityImage, alt: 'Cybersecurity analyst monitoring network activity in a security operations center', attribution: generatedAttribution },
    keySkills: ['Networking & Protocols', 'Linux System Administration', 'Security Operations', 'Web Application Security', 'Vulnerability Assessment'],
    exampleRoles: ['Security Operations Analyst', 'Junior Security Analyst', 'Vulnerability Assessment Associate', 'Cyber Incident Responder'],
    roadmapId: 'roadmap-cybersecurity-ethical-hacking',
    salaryEstimate: { range: '₹3.5 - 7.5 LPA', period: 'Per Annum', note: 'Indicative entry-level range for junior security trainees and SOC analysts in India', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Significant growth due to digital infrastructure expansion, banking compliance, and cybersecurity defense initiatives across Indian enterprises.', topLocations: ['Bhubaneswar', 'Bengaluru', 'Hyderabad', 'Pune'] },
    introVideoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
    externalLearningUrl: 'https://www.netacad.com/courses/cybersecurity',
    relatedCareerIds: ['cloud-computing-devops', 'it-support-hardware-networking', 'software-web-development'],
    sampleOpportunities: [
      { title: 'Junior SOC Analyst Trainee', type: 'Trainee', organizationType: 'Managed Security Services Provider (MSSP)', skillsRequired: ['Network fundamentals', 'Linux', 'Log analysis'], description: 'Monitor tier-1 security alerts, evaluate intrusion logs, and escalate suspicious anomalies in accordance with standard operating procedures.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Cybersecurity Apprentice', type: 'Apprenticeship', organizationType: 'Public Sector & IT Enterprises', skillsRequired: ['Cyber hygiene', 'Firewall basics', 'Incident triage'], description: 'Government apprenticeship under NAPS focusing on baseline network defense, patch verification, and security auditing assistance.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'C-DAC Bhubaneswar / State Cyber Lab', type: 'Vocational Center', location: 'Bhubaneswar, Odisha', programsOffered: ['Cyber Security & Forensics Certificate', 'PG Diploma in Information Security'], websiteUrl: 'https://www.cdac.in' },
      { name: 'Government ITI Bhubaneswar', type: 'ITI', location: 'Bhubaneswar, Odisha', programsOffered: ['Information & Communication Technology System Maintenance (ICTSM)', 'COPA'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'cloud-computing-devops',
    title: 'Cloud Computing & DevOps',
    category: 'Digital Technology',
    difficulty: 'Beginner',
    shortDescription: 'Build, deploy and operate modern applications using cloud and automation tools.',
    detailedDescription: 'Master Linux administration, version control with Git, containerization using Docker, cloud provider architectures (AWS/Azure), continuous integration and continuous deployment (CI/CD) pipelines, and service observability.',
    image: { src: cloudImage, alt: 'Cloud engineer working with a laptop beside data-center servers', attribution: generatedAttribution },
    keySkills: ['Linux & Bash Scripting', 'Git & GitHub', 'Docker Containers', 'Cloud Infrastructure (AWS/Azure)', 'CI/CD Pipelines'],
    exampleRoles: ['Cloud Support Associate', 'Junior DevOps Engineer', 'Platform Operations Trainee', 'Site Reliability Apprentice'],
    roadmapId: 'roadmap-cloud-computing-devops',
    salaryEstimate: { range: '₹4.0 - 8.0 LPA', period: 'Per Annum', note: 'Indicative entry-level range for cloud support engineers and DevOps trainees', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Strong industry transition to scalable cloud services, serverless computing, and automated delivery pipelines across tech hubs.', topLocations: ['Bhubaneswar', 'Bengaluru', 'Hyderabad', 'Noida'] },
    introVideoUrl: 'https://learn.microsoft.com/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
    externalLearningUrl: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
    relatedCareerIds: ['software-web-development', 'cybersecurity-ethical-hacking', 'it-support-hardware-networking'],
    sampleOpportunities: [
      { title: 'Cloud Operations Associate', type: 'Full-time', organizationType: 'Cloud Consultancy & IT Services', skillsRequired: ['Linux', 'AWS Cloud Practitioner', 'Docker'], description: 'Assist in provisioning compute instances, monitoring server health metrics, and maintaining automated deployment scripts.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'DevOps Apprentice', type: 'Apprenticeship', organizationType: 'SaaS Development Companies', skillsRequired: ['Git', 'CI/CD concepts', 'Scripting'], description: 'Apprenticeship focusing on container builds, automated unit testing workflows, and deployment health checks.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'SCTEVT Odisha / Polytechnic Colleges', type: 'Polytechnic', location: 'Statewide, Odisha', programsOffered: ['Diploma in Computer Science & Engineering', 'Cloud Computing Specialization'], websiteUrl: 'https://sctevtodisha.nic.in' },
      { name: 'Skill India Digital Hub', type: 'Govt Scheme', location: 'Online / National', programsOffered: ['Cloud Infrastructure Associate', 'DevOps Trainee Track'], websiteUrl: 'https://www.skillindiadigital.gov.in' }
    ]
  },
  {
    id: 'software-web-development',
    title: 'Software & Web Development',
    category: 'Digital Technology',
    difficulty: 'Beginner',
    shortDescription: 'Create accessible websites, responsive applications and reliable software solutions.',
    detailedDescription: 'Start with foundational web technologies (HTML, CSS, JavaScript) and modern component engineering using React and TypeScript. Advance to API integrations, backend services with Node.js/databases, and end-to-end full stack project construction.',
    image: { src: softwareImage, alt: 'Software developer building an application on a laptop', attribution: generatedAttribution },
    keySkills: ['HTML5 & Responsive CSS', 'JavaScript & TypeScript', 'React & State Management', 'REST APIs', 'SQL & NoSQL Databases'],
    exampleRoles: ['Junior Web Developer', 'Frontend Developer', 'Software Development Trainee', 'Full-Stack Associate'],
    roadmapId: 'roadmap-software-web-development',
    salaryEstimate: { range: '₹3.6 - 7.2 LPA', period: 'Per Annum', note: 'Estimated range for junior software engineers and frontend web developers', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Continuous demand for web applications, e-governance portals, e-commerce, and enterprise digitisation across India and Odisha.', topLocations: ['Bhubaneswar', 'Cuttack', 'Bengaluru', 'Remote'] },
    introVideoUrl: 'https://developer.mozilla.org/en-US/docs/Learn',
    externalLearningUrl: 'https://www.freecodecamp.org/learn',
    relatedCareerIds: ['cloud-computing-devops', 'data-analytics', 'digital-marketing-entrepreneurship'],
    sampleOpportunities: [
      { title: 'Junior Frontend Developer', type: 'Full-time', organizationType: 'Web Development Agencies & Startups', skillsRequired: ['HTML/CSS', 'JavaScript', 'React'], description: 'Develop responsive, accessible user interfaces, consume backend RESTful APIs, and optimize browser rendering speed.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Web Development Trainee', type: 'Internship', organizationType: 'Software Services Companies', skillsRequired: ['Git', 'JavaScript', 'Basic SQL'], description: 'Assist senior developers with feature development, unit testing, bug fixing, and technical documentation.', samplePortalUrl: 'https://www.skillindiadigital.gov.in', portalName: 'Skill India Digital' }
    ],
    institutions: [
      { name: 'Government ITI Berhampur', type: 'ITI', location: 'Berhampur, Odisha', programsOffered: ['COPA (Computer Operator and Programming Assistant)', 'Web Designing Certificate'], websiteUrl: 'https://itiberhampur.edu.in' },
      { name: 'Odisha State Open University (OSOU)', type: 'University', location: 'Sambalpur, Odisha', programsOffered: ['Diploma in Web Designing', 'BCA / Diploma in IT'], websiteUrl: 'https://www.osou.ac.in' }
    ]
  },
  {
    id: 'artificial-intelligence-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Digital Technology',
    difficulty: 'Intermediate',
    shortDescription: 'Build intelligent systems with machine learning models, neural networks and computer vision.',
    detailedDescription: 'Master applied mathematics and statistics, Python scientific libraries (NumPy, Pandas, Scikit-Learn), neural network architectures with PyTorch/TensorFlow, computer vision, natural language processing, and ethical AI deployment.',
    image: { src: aiMlImage, alt: 'AI and machine learning lab with a luminous neural network visualization', attribution: generatedCareerAttribution },
    keySkills: ['Python & Scientific Computing', 'Applied Statistics & Linear Algebra', 'Machine Learning Algorithms', 'Deep Learning & Neural Networks', 'PyTorch / TensorFlow'],
    exampleRoles: ['Junior Machine Learning Engineer', 'AI Data Associate', 'Computer Vision Trainee', 'NLP Data Annotator & Specialist'],
    roadmapId: 'roadmap-artificial-intelligence-machine-learning',
    salaryEstimate: { range: '₹4.5 - 9.0 LPA', period: 'Per Annum', note: 'Estimated starting salary for entry-level ML engineers and AI associates', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Exponential expansion driven by generative AI, automated defect inspection in industries, predictive analytics, and smart public services.', topLocations: ['Bhubaneswar', 'Bengaluru', 'Hyderabad', 'Gurugram'] },
    introVideoUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
    externalLearningUrl: 'https://www.freecodecamp.org/learn/machine-learning-with-python/',
    relatedCareerIds: ['data-analytics', 'software-web-development', 'industrial-automation-cnc-robotics'],
    sampleOpportunities: [
      { title: 'AI Data Trainee', type: 'Trainee', organizationType: 'AI Research & Data Services', skillsRequired: ['Python', 'Data Cleaning', 'Basic Statistics'], description: 'Prepare, clean, and annotate training datasets for computer vision and NLP models; conduct initial model evaluation tests.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Junior ML Engineer', type: 'Full-time', organizationType: 'Technology Product Enterprises', skillsRequired: ['Scikit-Learn', 'PyTorch', 'Model Validation'], description: 'Train supervised and unsupervised learning models, fine-tune hyperparameters, and deploy inference endpoints into application pipelines.', samplePortalUrl: 'https://www.skillindiadigital.gov.in', portalName: 'Skill India Digital' }
    ],
    institutions: [
      { name: 'IIT Bhubaneswar School of Electrical Sciences', type: 'University', location: 'Bhubaneswar, Odisha', programsOffered: ['AI & ML Certification Outreach', 'Center of Excellence in AI'], websiteUrl: 'https://www.iitbbs.ac.in' },
      { name: 'NPTEL / SWAYAM Online Portal', type: 'Govt Scheme', location: 'Online / National', programsOffered: ['Introduction to Machine Learning', 'Deep Learning Specialization'], websiteUrl: 'https://swayam.gov.in' }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Digital Technology',
    difficulty: 'Beginner',
    shortDescription: 'Turn raw data into actionable business intelligence through spreadsheets, SQL and dashboards.',
    detailedDescription: 'Develop practical capabilities in advanced Excel, relational database querying with SQL, exploratory data analysis with Python/Pandas, interactive dashboarding in Power BI/Tableau, and executive storytelling with evidence.',
    image: { src: dataAnalyticsImage, alt: 'Business intelligence dashboard showing relational SQL tables, metrics and visual charts', attribution: generatedCareerAttribution },
    keySkills: ['Advanced Excel & Formulas', 'SQL Database Querying', 'Exploratory Data Analysis', 'Power BI & Tableau', 'Python for Data Analysis'],
    exampleRoles: ['Junior Data Analyst', 'Business Intelligence Associate', 'Reporting Specialist', 'Operations Data Analyst'],
    roadmapId: 'roadmap-data-analytics',
    salaryEstimate: { range: '₹3.2 - 6.5 LPA', period: 'Per Annum', note: 'Estimated range for entry-level data analysts and business intelligence associates', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Strong across manufacturing, banking, supply chains, healthcare and state development agencies requiring data-backed governance.', topLocations: ['Bhubaneswar', 'Cuttack', 'Kolkata', 'Hyderabad'] },
    introVideoUrl: 'https://www.khanacademy.org/computing/computer-programming/sql',
    externalLearningUrl: 'https://learn.microsoft.com/training/paths/data-analytics-microsoft/',
    relatedCareerIds: ['artificial-intelligence-machine-learning', 'software-web-development', 'digital-marketing-entrepreneurship'],
    sampleOpportunities: [
      { title: 'Junior Data Analyst', type: 'Full-time', organizationType: 'Corporate Analytics & Finance', skillsRequired: ['SQL', 'Excel', 'Data Visualization'], description: 'Extract queries from relational databases, clean operational records, and build KPI summary reports for management.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'MIS Trainee', type: 'Trainee', organizationType: 'Government & Industrial Units', skillsRequired: ['Spreadsheets', 'Reporting', 'Data Entry & Audit'], description: 'Maintain operational management information systems, track production output, and generate daily performance dashboards.', samplePortalUrl: 'https://www.skillindiadigital.gov.in', portalName: 'Skill India Digital' }
    ],
    institutions: [
      { name: 'Utkal University Department of Statistics', type: 'University', location: 'Bhubaneswar, Odisha', programsOffered: ['Data Analytics Diploma', 'Business Statistics'], websiteUrl: 'https://utkaluniversity.ac.in' },
      { name: 'Government ITI Cuttack', type: 'ITI', location: 'Cuttack, Odisha', programsOffered: ['COPA (Database & MIS)', 'Data Analytics Vocational Track'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'it-support-hardware-networking',
    title: 'IT Support, Hardware & Networking',
    category: 'IT Infrastructure',
    difficulty: 'Beginner',
    shortDescription: 'Understand computer hardware, assemble systems, troubleshoot faults and manage local networks.',
    detailedDescription: 'Master computer hardware assembly, BIOS configuration, operating system installation (Windows & Linux), peripheral troubleshooting, IPv4/IPv6 networking, routers/switches, remote desktop assistance, and help desk ticket resolution.',
    image: { src: itSupportImage, alt: 'IT support technician inspecting computer hardware at a workbench', attribution: generatedAttribution },
    keySkills: ['Computer Hardware Assembly', 'OS Installation & Recovery', 'Local Area Networking (LAN)', 'Troubleshooting Methodologies', 'Help Desk & Ticket Systems'],
    exampleRoles: ['IT Support Technician', 'Desktop Support Engineer', 'Network Support Associate', 'Hardware Maintenance Assistant'],
    roadmapId: 'roadmap-it-support-hardware-networking',
    salaryEstimate: { range: '₹2.2 - 4.5 LPA', period: 'Per Annum', note: 'Estimated range for junior IT technicians and desktop support engineers in India', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Essential backbone for all educational institutions, polytechnics, hospitals, banks, and IT parks needing on-site hardware support.', topLocations: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Berhampur'] },
    introVideoUrl: 'https://www.netacad.com/courses/networking/networking-basics',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=ICTSM',
    relatedCareerIds: ['cybersecurity-ethical-hacking', 'cloud-computing-devops', 'electrical-industrial-maintenance'],
    sampleOpportunities: [
      { title: 'Desktop Support Technician', type: 'Full-time', organizationType: 'IT Hardware & Support Services', skillsRequired: ['PC Troubleshooting', 'OS Deployment', 'Networking basics'], description: 'Install client hardware, configure local printer networks, configure anti-virus definitions, and solve user workplace tickets.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Network Maintenance Apprentice', type: 'Apprenticeship', organizationType: 'Telecom & ISP Providers', skillsRequired: ['Crimping cables', 'Router configuration', 'Wi-Fi testing'], description: 'Practical apprenticeship under NAPS deploying Ethernet cabling, installing switches, and troubleshooting broadband connectivity.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Government ITI Bhubaneswar', type: 'ITI', location: 'Bhubaneswar, Odisha', programsOffered: ['ICTSM (2 Years)', 'Computer Hardware & Networking Certificate'], websiteUrl: 'https://sctevtodisha.nic.in' },
      { name: 'Government ITI Rourkela', type: 'ITI', location: 'Rourkela, Odisha', programsOffered: ['Information Technology Technician Trade', 'Electronic Mechanic'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'mechanical-engineering-manufacturing',
    title: 'Mechanical Engineering & Manufacturing',
    category: 'Engineering & Manufacturing',
    difficulty: 'Beginner',
    shortDescription: 'Explore mechanical systems, engineering drawing, CAD modeling and modern production processes.',
    detailedDescription: 'Study fundamental mechanics, engineering drawing (orthographic/isometric), material properties, 2D/3D Computer Aided Design (CAD), conventional machining (lathe/milling), manufacturing methods, quality inspection, and industrial safety compliance.',
    image: { src: mechanicalImage, alt: 'Mechanical engineer inspecting a precision-machined component in a factory', attribution: generatedAttribution },
    keySkills: ['Engineering Drawing & GD&T', '2D/3D CAD (AutoCAD/SolidWorks)', 'Materials Science Basics', 'Machining & Workshop Technology', 'Quality Control & Metrology'],
    exampleRoles: ['Mechanical Draughtsman', 'Production Trainee', 'CAD Design Assistant', 'Quality Control Technician'],
    roadmapId: 'roadmap-mechanical-engineering-manufacturing',
    salaryEstimate: { range: '₹2.4 - 5.0 LPA', period: 'Per Annum', note: 'Estimated range for junior mechanical diploma holders and ITI machinists/fitters', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Continuous demand in Odisha’s manufacturing corridor (Angul, Jharsuguda, Kalinganagar, Rourkela) and automotive component plants.', topLocations: ['Rourkela', 'Angul', 'Jajpur', 'Jharsuguda', 'Bhubaneswar'] },
    introVideoUrl: 'https://nptel.ac.in/courses/112104193',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Fitter',
    relatedCareerIds: ['industrial-automation-cnc-robotics', 'steel-metallurgical-industries', 'electrical-industrial-maintenance'],
    sampleOpportunities: [
      { title: 'Mechanical Fitter / Production Trainee', type: 'Full-time', organizationType: 'Manufacturing & Heavy Engineering Plants', skillsRequired: ['Workshop Tools', 'Blueprint Reading', 'Assembly'], description: 'Assemble mechanical components, read production drawings, perform alignment checks, and assist with machine maintenance.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'CAD Draughtsman Apprentice', type: 'Apprenticeship', organizationType: 'Tool Rooms & Engineering Design Bureaus', skillsRequired: ['CAD Software', 'Orthographic Projection', 'Tolerancing'], description: 'Produce 2D shop floor drawings and 3D component models following IS engineering drawing standards.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Central Tool Room & Training Centre (CTTC)', type: 'Vocational Center', location: 'Bhubaneswar, Odisha', programsOffered: ['Diploma in Tool & Die Making', 'Advanced CAD/CAM Certificate'], websiteUrl: 'https://www.cttc.gov.in' },
      { name: 'Government Polytechnic Bhubaneswar', type: 'Polytechnic', location: 'Bhubaneswar, Odisha', programsOffered: ['Diploma in Mechanical Engineering (3 Years)'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'electrical-industrial-maintenance',
    title: 'Electrical & Industrial Maintenance',
    category: 'Engineering & Manufacturing',
    difficulty: 'Beginner',
    shortDescription: 'Learn electrical principles, safe industrial wiring, motor maintenance and fault diagnosis.',
    detailedDescription: 'Understand electrical safety and lockout-tagout (LOTO), single-phase and three-phase circuits, electrical machines, transformers, AC/DC motors, motor starters (DOL, Star-Delta), control panel wiring, multimeter diagnostics, and planned preventive maintenance.',
    image: { src: electricalImage, alt: 'Electrical maintenance technician safely inspecting an industrial control cabinet', attribution: generatedAttribution },
    keySkills: ['Electrical Safety & LOTO', 'AC/DC Circuit Theory', 'Motors & Starters', 'Industrial Control Panel Wiring', 'Preventive Maintenance & Testing'],
    exampleRoles: ['Electrical Maintenance Technician', 'Industrial Electrician', 'Substation Operator Trainee', 'Maintenance Assistant'],
    roadmapId: 'roadmap-electrical-industrial-maintenance',
    salaryEstimate: { range: '₹2.4 - 4.8 LPA', period: 'Per Annum', note: 'Estimated range for licensed ITI electricians and junior maintenance technicians', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Indispensable across power plants, steel/aluminium smelters, commercial complexes, and industrial estates throughout Odisha.', topLocations: ['Talcher', 'Jharsuguda', 'Angul', 'Jajpur', 'Bhubaneswar'] },
    introVideoUrl: 'https://nptel.ac.in/courses/108108076',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Electrician',
    relatedCareerIds: ['solar-energy-green-jobs', 'industrial-automation-cnc-robotics', 'mechanical-engineering-manufacturing'],
    sampleOpportunities: [
      { title: 'Plant Electrician Trainee', type: 'Full-time', organizationType: 'Power & Manufacturing Facilities', skillsRequired: ['Motor Testing', 'Panel Wiring', 'Safety procedures'], description: 'Inspect industrial control cabinets, test motor winding resistance, replace fuses/contactors, and maintain maintenance logs.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Substation & Grid Apprentice', type: 'Apprenticeship', organizationType: 'Power Distribution Companies (OPTCL/TPCODL)', skillsRequired: ['Transformers', 'Switchgear', 'Safety gear'], description: 'Government apprenticeship under NAPS working on transformer inspection, switchgear operation, and overhead line maintenance safety.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Government ITI Cuttack', type: 'ITI', location: 'Cuttack, Odisha', programsOffered: ['Electrician Trade (2 Years, NCVT)', 'Wireman Trade'], websiteUrl: 'https://sctevtodisha.nic.in' },
      { name: 'State Council for Technical Education (SCTEVT)', type: 'Polytechnic', location: 'Odisha State', programsOffered: ['Diploma in Electrical Engineering (3 Years)'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'mining-mineral-processing',
    title: 'Mining & Mineral Processing',
    category: 'Core Industries',
    difficulty: 'Beginner',
    shortDescription: 'Understand responsible mineral extraction, processing methods, mine safety and environmental care.',
    detailedDescription: 'Explore geological surveying, open-pit and underground mining methods, heavy earth-moving machinery (HEMM), mineral beneficiation (crushing, screening, flotation), mine safety regulations (DGMS standards), and environmental rehabilitation.',
    image: { src: miningImage, alt: 'Mining engineer viewing an open-pit mine and mineral processing operation from a safe lookout', attribution: generatedAttribution },
    keySkills: ['Mining Geology Basics', 'Open-Cast Mining Methods', 'Mineral Beneficiation & Processing', 'Mine Safety & DGMS Regulations', 'Environmental Management'],
    exampleRoles: ['Mining Mate / Foreman Trainee', 'Mineral Processing Assistant', 'Safety & Environmental Assistant', 'HEMM Maintenance Associate'],
    roadmapId: 'roadmap-mining-mineral-processing',
    salaryEstimate: { range: '₹2.8 - 6.0 LPA', period: 'Per Annum', note: 'Estimated starting range for mining diploma trainees and mineral processing operators', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Odisha produces over 50% of India’s iron ore and bauxite, sustaining enduring demand for trained mining and processing personnel.', topLocations: ['Keonjhar', 'Sundargarh', 'Jajpur', 'Koraput', 'Rayagada'] },
    introVideoUrl: 'https://nptel.ac.in/courses/123105001',
    externalLearningUrl: 'https://ibm.gov.in',
    relatedCareerIds: ['steel-metallurgical-industries', 'mechanical-engineering-manufacturing', 'construction-skilled-trades'],
    sampleOpportunities: [
      { title: 'Mining Operations Trainee', type: 'Trainee', organizationType: 'Mining Corporations (OMC, NMDC, Private Miners)', skillsRequired: ['Mine Safety Rules', 'Surveying Basics', 'Report Generation'], description: 'Assist mining managers with daily pit logs, verify bench slope stability protocols, and enforce DGMS personal protective rules.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Mineral Processing Apprentice', type: 'Apprenticeship', organizationType: 'Beneficiation & Pellet Plants', skillsRequired: ['Crusher Operation', 'Slurry Sampling', 'Quality Checking'], description: 'Hands-on training sampling iron ore fines, monitoring cyclone separators, and recording moisture contents at processing mills.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Government Polytechnic Keonjhar (Mining Engineering)', type: 'Polytechnic', location: 'Keonjhar, Odisha', programsOffered: ['Diploma in Mining Engineering (3 Years)', 'Diploma in Metallurgical Engineering'], websiteUrl: 'https://gpkeonjhar.org' },
      { name: 'Odisha School of Mining Engineering (OSME)', type: 'Polytechnic', location: 'Keonjhar, Odisha', programsOffered: ['Mining Engineering Diploma', 'Drilling Technology'], websiteUrl: 'https://osme.co.in' }
    ]
  },
  {
    id: 'steel-metallurgical-industries',
    title: 'Steel & Metallurgical Industries',
    category: 'Core Industries',
    difficulty: 'Beginner',
    shortDescription: 'Study metals, blast furnace steel production, heat treatment, testing and industrial quality.',
    detailedDescription: 'Trace the metallurgical supply chain from raw iron ore, coke and limestone to blast furnaces, basic oxygen furnaces (BOF), electric arc furnaces (EAF), secondary refining, continuous casting, rolling mills, heat treatment metallurgy, and tensile/hardness testing.',
    image: { src: steelImage, alt: 'Metallurgical engineer observing steel production from a protected control area', attribution: generatedAttribution },
    keySkills: ['Iron & Steelmaking Metallurgy', 'Furnace & Casting Operations', 'Heat Treatment (Annealing/Hardening)', 'Material Quality & Destructive Testing', 'Industrial Safety in Hot Metal Zones'],
    exampleRoles: ['Metallurgy Trainee', 'Furnace Operator Assistant', 'Quality Control Lab Assistant', 'Rolling Mill Technician'],
    roadmapId: 'roadmap-steel-metallurgical-industries',
    salaryEstimate: { range: '₹2.6 - 5.5 LPA', period: 'Per Annum', note: 'Estimated range for steel plant technicians and metallurgy diploma holders in Odisha', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Odisha is India’s premier steel hub (Rourkela Steel Plant, Tata Steel Kalinganagar, JSW, Jindal Steel), experiencing massive capacity expansions.', topLocations: ['Rourkela', 'Kalinganagar (Jajpur)', 'Angul', 'Jharsuguda'] },
    introVideoUrl: 'https://nptel.ac.in/courses/113104059',
    externalLearningUrl: 'https://bharatskills.gov.in',
    relatedCareerIds: ['mining-mineral-processing', 'mechanical-engineering-manufacturing', 'industrial-automation-cnc-robotics'],
    sampleOpportunities: [
      { title: 'Steel Melt Shop Operations Trainee', type: 'Full-time', organizationType: 'Integrated Steel Plants', skillsRequired: ['Process Flow Knowledge', 'Safety adherence', 'Instrumentation logs'], description: 'Monitor temperature readings, ladle movements, and metallurgical slag parameters from plant control pulpits.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Metallurgical Lab Assistant', type: 'Apprenticeship', organizationType: 'Steel Quality & Testing Laboratories', skillsRequired: ['Sample Preparation', 'Hardness Testing', 'Microscope polishing'], description: 'Prepare metal coupon specimens, conduct Brinell/Rockwell hardness measurements, and log chemical spectrometry readouts.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'National Institute of Technology (NIT) Rourkela', type: 'University', location: 'Rourkela, Odisha', programsOffered: ['Metallurgical & Materials Engineering', 'Continuing Education Short Courses'], websiteUrl: 'https://www.nitrkl.ac.in' },
      { name: 'Government Polytechnic Jajpur (Kalinganagar)', type: 'Polytechnic', location: 'Jajpur, Odisha', programsOffered: ['Diploma in Metallurgical Engineering (3 Years)', 'Mechanical Engineering'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'industrial-automation-cnc-robotics',
    title: 'Industrial Automation, CNC & Robotics',
    category: 'Engineering & Manufacturing',
    difficulty: 'Intermediate',
    shortDescription: 'Connect precision CNC machines, programmable logic controllers (PLCs), sensors and robotics.',
    detailedDescription: 'Integrate mechanical fabrication with computer control. Learn CNC machine programming (G-code/M-code), industrial sensors, PLC ladder logic programming, SCADA supervisory interfaces, robotic arm teach-pendant operations, and smart manufacturing integration.',
    image: { src: automationImage, alt: 'Automation engineer operating a guarded robotic CNC manufacturing cell', attribution: generatedAttribution },
    keySkills: ['CNC Programming & G-Code', 'PLC Ladder Logic (Siemens/Allen-Bradley)', 'Industrial Sensors & Actuators', 'SCADA & HMI Configuration', 'Industrial Robot Programming'],
    exampleRoles: ['CNC Programmer / Operator', 'PLC Automation Trainee', 'Mechatronics Technician', 'Robotics Maintenance Associate'],
    roadmapId: 'roadmap-industrial-automation-cnc-robotics',
    salaryEstimate: { range: '₹2.8 - 6.2 LPA', period: 'Per Annum', note: 'Estimated range for junior CNC programmers and automation technicians in India', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Driven by Industry 4.0 adoption, automated automotive lines, pharmaceutical packing units, and modern tool rooms.', topLocations: ['Bhubaneswar', 'Cuttack', 'Jharsuguda', 'Pune', 'Chennai'] },
    introVideoUrl: 'https://nptel.ac.in/courses/108105088',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Tool_and_Die_Maker',
    relatedCareerIds: ['mechanical-engineering-manufacturing', 'electrical-industrial-maintenance', 'software-web-development'],
    sampleOpportunities: [
      { title: 'Junior CNC Machinist', type: 'Full-time', organizationType: 'Precision Tool Rooms & Machine Shops', skillsRequired: ['G-Code', 'Caliper & Micrometer', 'Workpiece Setup'], description: 'Set up tooling fixtures, input offset coordinates, execute CNC turning/milling jobs, and inspect part tolerances.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'PLC & Automation Apprentice', type: 'Apprenticeship', organizationType: 'Automation System Integrators', skillsRequired: ['Ladder Logic', 'Wiring Sensors', 'Relay logic'], description: 'Assist in wiring automation control panels, testing sensor inputs on PLC racks, and simulating motor control sequences.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Central Tool Room & Training Centre (CTTC)', type: 'Vocational Center', location: 'Bhubaneswar, Odisha', programsOffered: ['Advanced Diploma in CNC Machining', 'Certificate in Industrial Automation & Robotics'], websiteUrl: 'https://www.cttc.gov.in' },
      { name: 'CIPET: Institute of Petrochemicals Technology', type: 'Vocational Center', location: 'Bhubaneswar, Odisha', programsOffered: ['Diploma in Plastics Mould Technology (CAD/CAM/CNC)', 'Machine Maintenance'], websiteUrl: 'https://www.cipet.gov.in' }
    ]
  },
  {
    id: 'agriculture-agritech',
    title: 'Agriculture & AgriTech',
    category: 'Agriculture & Food',
    difficulty: 'Beginner',
    shortDescription: 'Modern agronomy, precision farming, soil telemetry, greenhouse systems and automated irrigation.',
    detailedDescription: 'Bridge traditional agricultural science with digital innovations. Study soil chemistry, crop nutrition, organic farming, drip/sprinkler automated irrigation, polyhouse protected cultivation, IoT soil moisture sensors, and drone imagery for crop health monitoring.',
    image: { src: agricultureImage, alt: 'Smart farm greenhouse showing agricultural technician using telemetry sensors and crop monitoring', attribution: generatedCareerAttribution },
    keySkills: ['Agronomy & Crop Management', 'Automated Micro-Irrigation', 'Soil Testing & Nutrient Management', 'Greenhouse & Polyhouse Cultivation', 'Agri-IoT & Sensor Telemetry'],
    exampleRoles: ['AgriTech Field Officer', 'Greenhouse / Polyhouse Supervisor', 'Soil Health Technician', 'Precision Agriculture Trainee'],
    roadmapId: 'roadmap-agriculture-agritech',
    salaryEstimate: { range: '₹2.2 - 4.8 LPA', period: 'Per Annum', note: 'Estimated range for agriculture diploma holders, Krishi Mitras, and AgriTech field associates', isEstimate: true },
    marketOutlook: { demandLevel: 'Growing', growthSummary: 'Odisha’s state agriculture policy (SAMRUDDHI) and national PM-KUSUM programs heavily emphasize micro-irrigation and AgriTech startups.', topLocations: ['Bhubaneswar', 'Sambalpur', 'Balasore', 'Bhadrak', 'Koraput'] },
    introVideoUrl: 'https://ecourses.icar.gov.in/',
    externalLearningUrl: 'https://agricoop.nic.in/',
    relatedCareerIds: ['food-processing-preservation', 'dairy-fisheries-animal-husbandry', 'solar-energy-green-jobs'],
    sampleOpportunities: [
      { title: 'AgriTech Extension Trainee', type: 'Full-time', organizationType: 'AgriTech Enterprises & FPOs', skillsRequired: ['Agronomy basics', 'App-based field mapping', 'Farmer advisory'], description: 'Demonstrate precision farming apps to Farmer Producer Organizations (FPOs), install soil moisture probes, and advise on crop health.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Polyhouse Management Apprentice', type: 'Apprenticeship', organizationType: 'Horticulture Farms & Seed Nurseries', skillsRequired: ['Climate control', 'Fertigation', 'Pest scouting'], description: 'Manage humidity and temperature settings in polyhouse tunnels, calibrate nutrient dosing pumps, and track seedling quality.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Odisha University of Agriculture & Technology (OUAT)', type: 'University', location: 'Bhubaneswar, Odisha', programsOffered: ['B.Sc. Agriculture', 'Diploma in Agro-Polytechnic', 'Skill Training in Agri-Mechanization'], websiteUrl: 'https://ouat.ac.in' },
      { name: 'Krishi Vigyan Kendra (KVK) Network', type: 'Vocational Center', location: 'All 30 Districts, Odisha', programsOffered: ['Precision Farming Certificate', 'Organic Fertilizer & Soil Testing Course'], websiteUrl: 'https://icar.org.in' }
    ]
  },
  {
    id: 'food-processing-preservation',
    title: 'Food Processing & Preservation',
    category: 'Agriculture & Food',
    difficulty: 'Beginner',
    shortDescription: 'Master post-harvest handling, food preservation, canning, cold-chain safety and FSSAI standards.',
    detailedDescription: 'Learn industrial processing techniques for grains, pulses, fruits, and vegetables. Study thermal processing (pasteurization/sterilization), dehydration, freezing, modified atmosphere packaging, food chemistry, hygiene sanitation, and FSSAI food safety regulations.',
    image: { src: foodProcessingImage, alt: 'Food processing plant showing stainless steel pasteurizer, bottling line, and laboratory quality tests', attribution: generatedCareerAttribution },
    keySkills: ['Food Preservation Techniques', 'Thermal Processing & Canning', 'Packaging Technology', 'FSSAI Hygiene & Quality Standards', 'Cold Chain Management'],
    exampleRoles: ['Food Processing Technician', 'Quality Control Inspector', 'Packaging Line Supervisor', 'Cold Chain Logistics Trainee'],
    roadmapId: 'roadmap-food-processing-preservation',
    salaryEstimate: { range: '₹2.2 - 4.5 LPA', period: 'Per Annum', note: 'Estimated range for food technology ITI/diploma graduates and plant quality assistants', isEstimate: true },
    marketOutlook: { demandLevel: 'Growing', growthSummary: 'Significant investment in mega food parks (Derabish, Rayagada, Khordha) supported by PM Formalisation of Micro Food Processing Enterprises (PMFME).', topLocations: ['Khordha', 'Cuttack', 'Rayagada', 'Bhubaneswar', 'Balasore'] },
    introVideoUrl: 'https://www.fssai.gov.in/cms/training-institutions.php',
    externalLearningUrl: 'https://mofpi.gov.in/',
    relatedCareerIds: ['agriculture-agritech', 'dairy-fisheries-animal-husbandry', 'healthcare-assistance-community-health'],
    sampleOpportunities: [
      { title: 'Quality Assurance Assistant', type: 'Full-time', organizationType: 'Food & Beverage Processing Plants', skillsRequired: ['FSSAI basics', 'Refractometer / pH testing', 'Sanitation checks'], description: 'Conduct acidity, brix, and microbiological sample testing on raw produce; verify packaging seal integrity and expiry stamping.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Food Processing Operator Trainee', type: 'Apprenticeship', organizationType: 'Grain Milling & Fruit Preservation Units', skillsRequired: ['Machine Operation', 'Hygiene protocols', 'Batch logging'], description: 'Operate industrial blanching, pulping, and vacuum packaging machines under supervision; ensure clean-in-place (CIP) compliance.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Indian Institute of Food Processing Technology (IIFPT) Liaison Center', type: 'Vocational Center', location: 'Eastern Region / Odisha', programsOffered: ['Food Processing & Preservation Skill Certificate', 'Baking & Confectionery'], websiteUrl: 'https://www.iifpt.edu.in' },
      { name: 'Government ITI Cuttack (Food Processing Trade)', type: 'ITI', location: 'Cuttack, Odisha', programsOffered: ['Food Processing Operator (1 Year, NCVT)'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'dairy-fisheries-animal-husbandry',
    title: 'Dairy, Fisheries & Animal Husbandry',
    category: 'Agriculture & Food',
    difficulty: 'Beginner',
    shortDescription: 'Modern dairy operations, milk testing, biofloc aquaculture, hatchery care and livestock management.',
    detailedDescription: 'Acquire practical expertise across livestock management, balanced animal nutrition, automated milking hygiene, milk testing (fat/SNF testing), veterinary first-aid basics, freshwater fish farming, biofloc and cage aquaculture, and hatchery management.',
    image: { src: dairyFisheriesImage, alt: 'Dairy farm and sustainable fisheries setting', attribution: generatedCareerAttribution },
    keySkills: ['Dairy Herd & Nutrition Management', 'Milk Quality Testing (Fat/SNF)', 'Aquaculture (Biofloc & Pond Culture)', 'Fish Hatchery Operations', 'Livestock Health & Disease Prevention'],
    exampleRoles: ['Dairy Farm Assistant', 'Aquaculture Technician', 'Veterinary First Aid Assistant', 'Milk Chilling Centre Operator'],
    roadmapId: 'roadmap-dairy-fisheries-animal-husbandry',
    salaryEstimate: { range: '₹2.0 - 4.5 LPA', period: 'Per Annum', note: 'Estimated range for livestock inspectors, dairy supervisors, and fisheries technicians in Odisha', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Strong government schemes like Mukhyamantri Krushi Udyog Yojana (MKUY), Matsya Pokhari Yojana, and OMFED dairy cooperatives expansion.', topLocations: ['Bhubaneswar', 'Puri', 'Cuttack', 'Balasore', 'Ganjam'] },
    introVideoUrl: 'https://dahd.nic.in/',
    externalLearningUrl: 'https://cifa.nic.in/',
    relatedCareerIds: ['agriculture-agritech', 'food-processing-preservation', 'healthcare-assistance-community-health'],
    sampleOpportunities: [
      { title: 'Aquaculture Field Assistant', type: 'Full-time', organizationType: 'Commercial Fish Farms & Shrimp Hatcheries', skillsRequired: ['Water quality testing', 'Feed calculation', 'Aerator maintenance'], description: 'Monitor dissolved oxygen (DO), pH, and ammonia in ponds, administer probiotic feeds, and coordinate harvesting operations.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Dairy Plant Operations Apprentice', type: 'Apprenticeship', organizationType: 'Dairy Cooperatives (OMFED / Private Dairies)', skillsRequired: ['Milk Testing', 'Chiller Maintenance', 'Hygiene standards'], description: 'Operate electronic milk analyzers, oversee bulk milk coolers (BMCs), and record daily cooperative collection logs.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'ICAR-Central Institute of Freshwater Aquaculture (CIFA)', type: 'Vocational Center', location: 'Kausalyaganga, Bhubaneswar, Odisha', programsOffered: ['Biofloc Fish Farming Training', 'Fish Breeding & Hatchery Management', 'Pearl Culture'], websiteUrl: 'https://cifa.nic.in' },
      { name: 'College of Veterinary Science & Animal Husbandry (OUAT)', type: 'University', location: 'Bhubaneswar, Odisha', programsOffered: ['Livestock Inspector Training Course', 'Dairy Management Certificate'], websiteUrl: 'https://ouat.ac.in' }
    ]
  },
  {
    id: 'tailoring-stitching-apparel',
    title: 'Tailoring, Stitching & Apparel',
    category: 'Skilled Trades & Crafts',
    difficulty: 'Beginner',
    shortDescription: 'Industrial garment stitching, pattern making, fabric cutting, apparel construction and quality inspection.',
    detailedDescription: 'Master body measurement, garment design drafting, industrial flatbed and overlock sewing machines, fabric grain identification, seam finishes, collar/pocket construction, garment repair, hand embroidery basics, and apparel export quality auditing.',
    image: { src: tailoringApparelImage, alt: 'Tailor working with fabric in a modern textile studio', attribution: generatedCareerAttribution },
    keySkills: ['Pattern Drafting & Cutting', 'Industrial Sewing Machines', 'Garment Construction & Assembly', 'Finishing & Pressing', 'Quality Inspection & Alterations'],
    exampleRoles: ['Sewing Machine Operator', 'Garment Pattern Maker', 'Sample Tailor', 'Apparel Quality Checker'],
    roadmapId: 'roadmap-tailoring-stitching-apparel',
    salaryEstimate: { range: '₹1.8 - 3.8 LPA', period: 'Per Annum', note: 'Estimated starting range for skilled garment operators and boutique tailor assistants', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Expansion in Odisha’s textile and apparel parks (e.g. Ramdaspur Cuttack, Bhubaneswar Apparel Cluster) and self-employment boutiques.', topLocations: ['Cuttack', 'Bhubaneswar', 'Berhampur', 'Sambalpur', 'Surat (Outstation)'] },
    introVideoUrl: 'https://texmin.nic.in/',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Sewing_Technology',
    relatedCareerIds: ['carpentry-woodworking-furniture', 'digital-marketing-entrepreneurship', 'mechanical-engineering-manufacturing'],
    sampleOpportunities: [
      { title: 'Apparel Sewing Operator', type: 'Full-time', organizationType: 'Garment Manufacturing & Export Units', skillsRequired: ['Single needle lockstitch', 'Overlock', 'Production speed'], description: 'Stitch specified components of shirts, trousers, or uniforms according to technical spec sheets with tight tolerances.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Pattern Making Apprentice', type: 'Apprenticeship', organizationType: 'Fashion Studios & Boutiques', skillsRequired: ['Measurement taking', 'Cardboard pattern grading', 'Fabric layout'], description: 'Draft paper patterns from client measurements, calculate fabric consumption, and assemble test muslin garments.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'National Institute of Fashion Technology (NIFT) Bhubaneswar', type: 'University', location: 'Bhubaneswar, Odisha', programsOffered: ['Continuing Education Garment Construction', 'Apparel Production Certificate'], websiteUrl: 'https://www.nift.ac.in/bhubaneswar' },
      { name: 'Government ITI Berhampur (Sewing Technology)', type: 'ITI', location: 'Berhampur, Odisha', programsOffered: ['Sewing Technology (1 Year, NCVT)', 'Dress Making (1 Year)'], websiteUrl: 'https://itiberhampur.edu.in' }
    ]
  },
  {
    id: 'solar-energy-green-jobs',
    title: 'Solar Energy & Green Jobs',
    category: 'Green Jobs & Energy',
    difficulty: 'Beginner',
    shortDescription: 'Rooftop solar photovoltaic installation, inverter wiring, solar pumps and green energy auditing.',
    detailedDescription: 'Understand solar radiation fundamentals, photovoltaic (PV) cell technologies, solar panel mounting structure erection, series/parallel string wiring, grid-tie and hybrid inverters, solar water pumping systems, net metering, and Suryamitra safety protocols.',
    image: { src: solarEnergyImage, alt: 'Solar panel installation across a green landscape', attribution: generatedCareerAttribution },
    keySkills: ['Solar Photovoltaic (PV) Fundamentals', 'Array Mounting & Structure Erection', 'DC/AC Inverter & Battery Wiring', 'Solar Water Pump Installation', 'Testing, Commissioning & Maintenance'],
    exampleRoles: ['Suryamitra Solar PV Technician', 'Solar Installation Assistant', 'Green Energy Auditor Trainee', 'Solar Pump Service Associate'],
    roadmapId: 'roadmap-solar-energy-green-jobs',
    salaryEstimate: { range: '₹2.2 - 4.5 LPA', period: 'Per Annum', note: 'Estimated range for certified Suryamitra technicians and solar installers in India', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Massive growth driven by PM Surya Ghar Muft Bijli Yojana, solar agricultural pumps (PM-KUSUM), and industrial green energy mandates.', topLocations: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Bolangir'] },
    introVideoUrl: 'https://nise.res.in/',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Solar_Technician',
    relatedCareerIds: ['electrical-industrial-maintenance', 'construction-skilled-trades', 'agriculture-agritech'],
    sampleOpportunities: [
      { title: 'Rooftop Solar PV Installer', type: 'Full-time', organizationType: 'Solar EPC Contractors & Agencies', skillsRequired: ['Roof mounting', 'DC String wiring', 'Inverter setup'], description: 'Assemble rooftop mounting clamps, secure solar modules, connect MC4 cabling, and test circuit voltage before grid energization.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Solar Service Technician Apprentice', type: 'Apprenticeship', organizationType: 'Solar Operations & Maintenance Companies', skillsRequired: ['Multimeter diagnostics', 'Panel cleaning', 'Inverter error codes'], description: 'Perform scheduled maintenance on ground-mount and rooftop solar arrays, diagnose inverter fault codes, and check earthing resistance.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'National Institute of Solar Energy (NISE) / Skill Council for Green Jobs', type: 'Govt Scheme', location: 'National / Partner ITIs', programsOffered: ['Suryamitra Skill Development Program (3 Months)', 'Varunmitra Solar Water Pumping'], websiteUrl: 'https://nise.res.in' },
      { name: 'Government ITI Bhubaneswar (Solar Technician)', type: 'ITI', location: 'Bhubaneswar, Odisha', programsOffered: ['Solar Technician (Electrical) (1 Year, NCVT)'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'construction-skilled-trades',
    title: 'Construction & Skilled Trades',
    category: 'Core Industries',
    difficulty: 'Beginner',
    shortDescription: 'Civil construction, surveying, blueprint interpretation, masonry, reinforcement and site safety.',
    detailedDescription: 'Learn building construction principles, architectural and structural blueprint reading, surveying instruments (auto level, total station), brick and block masonry, concrete reinforcement (bar bending), scaffolding safety, and site hazard prevention.',
    image: { src: constructionImage, alt: 'Skilled construction worker reviewing plans at a modern site', attribution: generatedCareerAttribution },
    keySkills: ['Blueprint & Drawing Reading', 'Surveying & Leveling (Auto Level)', 'Masonry & Concrete Works', 'Reinforcement & Bar Bending', 'Construction Site Safety & OSHA/IS Codes'],
    exampleRoles: ['Junior Site Supervisor', 'Surveying Assistant', 'Construction Draughtsman', 'Quality & Materials Inspector'],
    roadmapId: 'roadmap-construction-skilled-trades',
    salaryEstimate: { range: '₹2.2 - 4.5 LPA', period: 'Per Annum', note: 'Estimated range for civil construction supervisors and surveying assistants', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'Continuous infrastructure development across highways, urban housing, industrial corridors, and coastal ports in Odisha.', topLocations: ['Bhubaneswar', 'Cuttack', 'Paradip', 'Puri', 'Jharsuguda'] },
    introVideoUrl: 'https://nptel.ac.in/courses/105102088',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Draughtsman_Civil',
    relatedCareerIds: ['carpentry-woodworking-furniture', 'mining-mineral-processing', 'mechanical-engineering-manufacturing'],
    sampleOpportunities: [
      { title: 'Assistant Site Supervisor', type: 'Full-time', organizationType: 'Civil Construction & Infrastructure Builders', skillsRequired: ['Drawing reading', 'Material checking', 'Worker coordination'], description: 'Supervise daily concrete pouring, check rebar spacing against structural schedules, and verify material deliveries.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Surveyor Apprentice', type: 'Apprenticeship', organizationType: 'Land Survey & Road Construction Agencies', skillsRequired: ['Auto Level', 'Prism holding', 'Field book recording'], description: 'Assist licensed surveyors with boundary staking, benchmark level transfers, and recording topographic elevation points.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Government ITI Cuttack (Draughtsman Civil)', type: 'ITI', location: 'Cuttack, Odisha', programsOffered: ['Draughtsman Civil (2 Years, NCVT)', 'Surveyor Trade (1 Year)'], websiteUrl: 'https://sctevtodisha.nic.in' },
      { name: 'Bhubaneswar Polytechnic (Civil Engineering)', type: 'Polytechnic', location: 'Bhubaneswar, Odisha', programsOffered: ['Diploma in Civil Engineering (3 Years)'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'carpentry-woodworking-furniture',
    title: 'Carpentry, Woodworking & Furniture Making',
    category: 'Skilled Trades & Crafts',
    difficulty: 'Beginner',
    shortDescription: 'Timber selection, precision joinery, woodworking machinery, modular furniture and finishing.',
    detailedDescription: 'Develop mastery over wood types and grain properties, precision hand tools (chisels, planes, saws), power machinery (table saws, routers, planers), traditional joinery (mortise-and-tenon, dovetail), modular cabinetry design, veneer/laminate application, and finishing.',
    image: { src: carpentryImage, alt: 'Woodworker shaping furniture in a refined workshop', attribution: generatedCareerAttribution },
    keySkills: ['Timber Selection & Seasoning', 'Traditional Joinery (Mortise & Tenon)', 'Power Woodworking Machinery', 'Modular Cabinetry & Assembly', 'Finishing, Polishing & Veneer Work'],
    exampleRoles: ['Furniture Maker', 'Cabinetmaker Trainee', 'Interior Woodwork Specialist', 'Modular Kitchen Installer'],
    roadmapId: 'roadmap-carpentry-woodworking-furniture',
    salaryEstimate: { range: '₹2.0 - 4.2 LPA', period: 'Per Annum', note: 'Estimated range for skilled carpenters, modular furniture installers, and shop floor craftsmen', isEstimate: true },
    marketOutlook: { demandLevel: 'Steady', growthSummary: 'High residential interior demand, modular kitchens, luxury timber decor, and heritage temple woodworking traditions in Odisha.', topLocations: ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Balasore'] },
    introVideoUrl: 'https://bharatskills.gov.in',
    externalLearningUrl: 'https://bharatskills.gov.in/Home/StudyMaterial?item=1&trade=Carpenter',
    relatedCareerIds: ['construction-skilled-trades', 'tailoring-stitching-apparel', 'mechanical-engineering-manufacturing'],
    sampleOpportunities: [
      { title: 'Modular Furniture Installer', type: 'Full-time', organizationType: 'Interior Decor & Modular Furniture Studios', skillsRequired: ['Hardware fitting', 'Power drill/router', 'Assembly reading'], description: 'Install modular kitchen cabinets, wardrobe carcases, soft-close hinges, and laminate edge-banding at residential sites.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Woodcraft Apprentice', type: 'Apprenticeship', organizationType: 'Custom Woodworking & Joinery Workshops', skillsRequired: ['Chisel work', 'Planer operation', 'Sanding & staining'], description: 'Fabricate mortise-tenon wooden doors, plane timber surfaces true and flat, and apply polyurethane or french polish finishes.', samplePortalUrl: 'https://www.apprenticeshipindia.gov.in', portalName: 'NAPS Portal' }
    ],
    institutions: [
      { name: 'Government ITI Puri (Carpentry)', type: 'ITI', location: 'Puri, Odisha', programsOffered: ['Carpenter Trade (1 Year, NCVT)', 'Traditional Heritage Woodcarving'], websiteUrl: 'https://sctevtodisha.nic.in' },
      { name: 'Government ITI Cuttack', type: 'ITI', location: 'Cuttack, Odisha', programsOffered: ['Carpenter Trade', 'Pattern Maker (Foundry) Trade'], websiteUrl: 'https://sctevtodisha.nic.in' }
    ]
  },
  {
    id: 'digital-marketing-entrepreneurship',
    title: 'Digital Marketing & Entrepreneurship',
    category: 'Digital Technology',
    difficulty: 'Beginner',
    shortDescription: 'Search engine optimization, paid ad campaigns, social media growth, e-commerce and venture building.',
    detailedDescription: 'Learn digital customer acquisition and business creation. Cover Search Engine Optimization (SEO), content marketing, performance advertising (Meta & Google Ads), social media community management, e-commerce setup (Shopify/ONDC), customer analytics, and startup unit economics.',
    image: { src: digitalMarketingImage, alt: 'Digital marketing strategist planning a campaign in a modern studio', attribution: generatedCareerAttribution },
    keySkills: ['Search Engine Optimization (SEO)', 'Performance Advertising (Meta & Google Ads)', 'Content Creation & Copywriting', 'Social Media Community Building', 'E-Commerce Store Operations (ONDC/Shopify)'],
    exampleRoles: ['Digital Marketing Associate', 'Social Media Coordinator', 'SEO Executive Trainee', 'E-Commerce Store Manager'],
    roadmapId: 'roadmap-digital-marketing-entrepreneurship',
    salaryEstimate: { range: '₹2.5 - 5.5 LPA', period: 'Per Annum', note: 'Estimated range for junior digital marketing executives and growth associates', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Every local enterprise, startup, handicraft cooperative (Sambalpuri sarees, filigree), and educational brand seeks online customer acquisition.', topLocations: ['Bhubaneswar', 'Cuttack', 'Remote', 'Bengaluru'] },
    introVideoUrl: 'https://skillshop.withgoogle.com/',
    externalLearningUrl: 'https://grow.google/intl/ALL_in/certificates/',
    relatedCareerIds: ['software-web-development', 'data-analytics', 'tailoring-stitching-apparel'],
    sampleOpportunities: [
      { title: 'Digital Marketing Executive', type: 'Full-time', organizationType: 'E-Commerce Brands & Digital Agencies', skillsRequired: ['Google Ads', 'Canva / Graphics', 'Copywriting'], description: 'Create promotional ad copy, set up keyword targeting, manage daily campaign budgets, and analyze conversion metrics.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Social Media & E-Commerce Trainee', type: 'Internship', organizationType: 'Artisanal & Regional D2C Brands', skillsRequired: ['Instagram / Reels', 'Product cataloging', 'Customer DM support'], description: 'Photograph regional artisan products, create engaging social videos, update marketplace product listings, and fulfill customer queries.', samplePortalUrl: 'https://www.skillindiadigital.gov.in', portalName: 'Skill India Digital' }
    ],
    institutions: [
      { name: 'Startup Odisha Incubation Center (O-Hub)', type: 'Vocational Center', location: 'Bhubaneswar, Odisha', programsOffered: ['Student Entrepreneurship Bootcamps', 'Digital Go-To-Market Mentorship'], websiteUrl: 'https://startupodisha.gov.in' },
      { name: 'Skill India Digital Hub', type: 'Govt Scheme', location: 'Online / National', programsOffered: ['Digital Marketing Executive Course', 'E-Commerce Operations Specialist'], websiteUrl: 'https://www.skillindiadigital.gov.in' }
    ]
  },
  {
    id: 'healthcare-assistance-community-health',
    title: 'Healthcare Assistance & Community Health',
    category: 'Healthcare & Community',
    difficulty: 'Beginner',
    shortDescription: 'Patient bedside care, vital signs monitoring, first-aid CPR, infection control and community wellness.',
    detailedDescription: 'Prepare for vital support roles in healthcare and rural public health. Learn human anatomy basics, vital signs monitoring (blood pressure, pulse, SpO2, temperature), patient mobility, bedside assistance, infection control (hygiene/PPE), emergency first aid and CPR, and community health education.',
    image: { src: healthcareImage, alt: 'Healthcare worker supporting an older adult in a community clinic', attribution: generatedCareerAttribution },
    keySkills: ['Vital Signs Monitoring & Recording', 'Patient Care & Bedside Assistance', 'First Aid & Basic Life Support (CPR)', 'Infection Control & Medical Waste Disposal', 'Community Health & Hygiene Education'],
    exampleRoles: ['General Duty Assistant (GDA)', 'Home Health Aide', 'Community Health Worker', 'Hospital Ward Care Assistant'],
    roadmapId: 'roadmap-healthcare-assistance-community-health',
    salaryEstimate: { range: '₹2.0 - 4.0 LPA', period: 'Per Annum', note: 'Estimated range for certified General Duty Assistants and healthcare support staff in India', isEstimate: true },
    marketOutlook: { demandLevel: 'High', growthSummary: 'Expansion of private hospitals, diagnostic chains, community health centers (CHCs), and home healthcare services across Odisha.', topLocations: ['Bhubaneswar', 'Cuttack', 'Berhampur', 'Sambalpur', 'Rourkela'] },
    introVideoUrl: 'https://www.nhp.gov.in/',
    externalLearningUrl: 'https://www.skillindiadigital.gov.in',
    relatedCareerIds: ['food-processing-preservation', 'dairy-fisheries-animal-husbandry', 'it-support-hardware-networking'],
    sampleOpportunities: [
      { title: 'General Duty Assistant (GDA)', type: 'Full-time', organizationType: 'Hospitals & Nursing Homes', skillsRequired: ['Vital checking', 'Patient hygiene', 'Wheelchair transfer'], description: 'Assist nursing staff with taking patient vital signs, maintaining ward sanitation, transport patients to radiology, and record intake charts.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' },
      { title: 'Community Health Aide Trainee', type: 'Trainee', organizationType: 'Public Health Initiatives & NGOs', skillsRequired: ['Health communication', 'Basic first aid', 'Maternal nutrition basics'], description: 'Conduct community health surveys, promote immunization awareness, and assist with primary health checkup camps in rural blocks.', samplePortalUrl: 'https://www.ncs.gov.in', portalName: 'National Career Service' }
    ],
    institutions: [
      { name: 'Healthcare Sector Skill Council (HSSC) Training Partners', type: 'Govt Scheme', location: 'Bhubaneswar / Statewide, Odisha', programsOffered: ['General Duty Assistant (GDA) Certificate (4 Months)', 'Emergency Medical Technician Trainee'], websiteUrl: 'https://www.healthcare-ssc.in' },
      { name: 'SCB Medical College & Hospital (Allied Health Training)', type: 'University', location: 'Cuttack, Odisha', programsOffered: ['Allied Healthcare Support Workshops', 'Paramedical Certificate Programs'], websiteUrl: 'https://scbmch.in' }
    ]
  }
]

export function getCareerById(id?: string) {
  if (!id) return undefined
  if (id === 'data-analytics-artificial-intelligence') {
    return careers.find((career) => career.id === 'data-analytics')
  }
  return careers.find((career) => career.id === id)
}
