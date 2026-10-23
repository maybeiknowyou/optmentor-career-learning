/**
 * Domain-specific technical knowledge banks for all 20 career pathways.
 * Provides authentic technical concepts, real-world tools, failure modes,
 * diagnostic procedures, and trade safety regulations.
 */

export interface CareerDomainKnowledge {
  careerId: string
  coreConcepts: string[]
  toolsAndStandards: string[]
  commonFailureModes: string[]
  diagnosticProcedures: string[]
  safetyAndRegulations: string[]
  practicalScenarios: Array<{
    situation: string
    bestAction: string
    incorrectActions: [string, string, string]
    rationale: string
  }>
}

export const CAREER_KNOWLEDGE_MAP: Record<string, CareerDomainKnowledge> = {
  'cybersecurity-ethical-hacking': {
    careerId: 'cybersecurity-ethical-hacking',
    coreConcepts: [
      'Packet encapsulation & TCP/IP 4-layer model',
      'Public Key Infrastructure (PKI) and asymmetric TLS handshakes',
      'Stateful firewall packet inspection vs proxy application filtering',
      'Principle of Least Privilege and Role-Based Access Control (RBAC)',
      'Cross-Site Scripting (XSS) input sanitization and CSP headers',
      'SQL injection parameterized queries and prepared statements',
      'SIEM log correlation and event anomaly detection',
      'Incident containment, eradication, and post-mortem reporting',
      'Vulnerability scanning with CVSS v3.1 severity metrics',
      'Zero Trust network segmentation and continuous authentication'
    ],
    toolsAndStandards: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'Snort IDS', 'OWASP Top 10', 'ISO/IEC 27001', 'NIST SP 800-53', 'Splunk', 'GnuPG'],
    commonFailureModes: [
      'Cleartext credential transmission across untrusted Wi-Fi',
      'Default administrative passwords left unconfigured on boundary routers',
      'Missing security patch allowing remote code execution exploit',
      'Unrestricted file upload vulnerability executing web shell scripts',
      'Improper CORS header allowing cross-domain token exfiltration'
    ],
    diagnosticProcedures: [
      'Capture PCAP stream and filter for TCP SYN floods or retransmissions',
      'Execute banner grabbing to determine running daemon versions',
      'Inspect hash values against known VirusTotal malware signatures',
      'Audit Active Directory group memberships for privilege escalation',
      'Review web server access logs for anomalous HTTP 500 error spikes'
    ],
    safetyAndRegulations: [
      'Strict written authorization and scoped Rules of Engagement (RoE)',
      'Indian IT Act Section 66 regulatory compliance for digital evidence',
      'Chain of custody preservation for forensic storage images',
      'Responsible disclosure timelines before public exploit release',
      'Air-gapped sandboxing for dynamic malware detonation'
    ],
    practicalScenarios: [
      {
        situation: 'A SOC analyst notices outbound connections to a known command-and-control IP from a payroll workstation.',
        bestAction: 'Isolate the affected workstation from the local network segment immediately to prevent lateral movement.',
        incorrectActions: [
          'Power off the machine immediately wiping volatile RAM forensic data',
          'Send an email to the employee asking if they visited external sites',
          'Delete the suspicious outbound connection log entry to clear alerts'
        ],
        rationale: 'Network isolation stops active data exfiltration and lateral spread while preserving volatile memory for forensic triage.'
      },
      {
        situation: 'During an authorized web assessment, an input field reflects unescaped user input back into the DOM.',
        bestAction: 'Implement context-aware HTML entity encoding and strict Content Security Policy directives.',
        incorrectActions: [
          'Disable JavaScript execution on the web server side entirely',
          'Rely solely on client-side regex validation in the HTML form',
          'Block all incoming GET requests containing alphanumeric characters'
        ],
        rationale: 'Server-side context-aware output encoding prevents browser script execution regardless of malicious input payloads.'
      }
    ]
  },

  'cloud-computing-devops': {
    careerId: 'cloud-computing-devops',
    coreConcepts: [
      'Infrastructure as Code (IaC) idempotency and declarative state',
      'Container virtualization namespaces, cgroups, and rootfs layers',
      'Continuous Integration / Continuous Delivery (CI/CD) deployment gates',
      'VPC CIDR block design, public/private subnets, and NAT gateways',
      'Cloud elasticity, Horizontal Pod Autoscalers (HPA), and load balancers',
      'Object storage durability (99.999999999%) and lifecycle policies',
      'Immutable infrastructure and blue-green deployment strategies',
      'Observability: Metrics, structured logging, and distributed tracing',
      'Serverless event-driven architecture and cold-start mitigations',
      'Cloud FinOps cost allocation tags and reserved instance planning'
    ],
    toolsAndStandards: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana', 'AWS IAM', 'Linux cgroups', 'OpenTelemetry', 'Helm'],
    commonFailureModes: [
      'Over-permissive cloud IAM wildcard policies (`*:*`) exposing storage',
      'Container CrashLoopBackOff due to unhandled SIGTERM or memory limit breach',
      'Hardcoded API secrets committed into public version control repositories',
      'Split-brain cluster state caused by cross-zone network partitioning',
      'Terraform state lock acquisition deadlock during concurrent pipeline runs'
    ],
    diagnosticProcedures: [
      'Inspect `kubectl describe pod` events and container logs for exit code 137 (OOMKilled)',
      'Review VPC Flow Logs to trace rejected packet drops at security group boundaries',
      'Execute `terraform plan` to compare local state against real cloud infrastructure drift',
      'Analyze Prometheus memory utilization metrics against container cgroup limits',
      'Trace distributed spans in OpenTelemetry to isolate database latency bottlenecks'
    ],
    safetyAndRegulations: [
      'Multi-region automated backup disaster recovery and RPO/RTO verification',
      'Secrets encryption at rest via Hardware Security Modules (KMS / HashiCorp Vault)',
      'SOC 2 Type II and GDPR data residency sovereignty compliance',
      'Ephemeral container lifecycles preventing persistent root compromise',
      'Zero root user access in production cloud management consoles'
    ],
    practicalScenarios: [
      {
        situation: 'A production Kubernetes pod crashes intermittently during high evening traffic with exit code 137.',
        bestAction: 'Inspect Linux OOM (Out Of Memory) killer events and increase container memory limits in the deployment manifest.',
        incorrectActions: [
          'Restart the entire cluster physical nodes without checking logs',
          'Disable Kubernetes resource limits to allow unbounded memory consumption',
          'Convert the container image to run as privileged root user'
        ],
        rationale: 'Exit code 137 indicates SIGKILL sent by the kernel OOM killer when a container exceeds its defined memory limit.'
      },
      {
        situation: 'A DevOps engineer needs to roll out an updated microservice without incurring zero-downtime customer errors.',
        bestAction: 'Deploy a blue-green or canary release with automated health checks routing traffic progressively.',
        incorrectActions: [
          'Drop all database tables and rebuild the application schema live',
          'Kill all active pods simultaneously before starting new versions',
          'Deploy without readiness probes allowing unready containers to accept traffic'
        ],
        rationale: 'Canary deployments validate live performance on a subset of traffic with instant rollback capability.'
      }
    ]
  },

  'software-web-development': {
    careerId: 'software-web-development',
    coreConcepts: [
      'DOM tree manipulation and virtual DOM reconciliation diffing',
      'Asynchronous event loop, Microtask queue, and Promise lifecycle',
      'RESTful HTTP status codes (200, 201, 400, 401, 403, 404, 500)',
      'Relational schema normalization (3NF) vs document store indexing',
      'Git merge conflicts, rebasing, and branch isolation conventions',
      'Responsive CSS Grid, Flexbox alignment, and media query breakpoints',
      'Client-side state management, unidirectional data flow, and immutability',
      'Web accessibility (WCAG 2.1 AA) aria labels and keyboard navigability',
      'Browser storage: LocalStorage, SessionStorage, IndexedDB, and HttpOnly cookies',
      'Unit, integration, and end-to-end automated testing pyramids'
    ],
    toolsAndStandards: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Git', 'Vite', 'Jest / Vitest', 'Postman', 'Chrome DevTools', 'ESLint'],
    commonFailureModes: [
      'Uncontrolled re-rendering loops in React caused by unstable object references',
      'N+1 database query antipattern degrading server response times',
      'CORS header mismatch blocking front-end fetch API requests',
      'Memory leak caused by uncleaned event listeners or intervals in components',
      'CSS specificity conflicts and unintended style leakage across components'
    ],
    diagnosticProcedures: [
      'Profile component rendering times using React Profiler flamegraphs',
      'Inspect Network tab waterfall charts to identify blocking resource assets',
      'Run EXPLAIN ANALYZE on SQL queries to evaluate sequential table scans',
      'Debug JavaScript stack traces using source maps in Chrome DevTools',
      'Execute static code analysis with ESLint and TypeScript strict mode'
    ],
    safetyAndRegulations: [
      'Prevent Cross-Site Scripting (XSS) via strict text content escaping',
      'Prevent Cross-Site Request Forgery (CSRF) using SameSite cookies and tokens',
      'Secure password storage using salted bcrypt / Argon2 hashing algorithms',
      'Enforce HTTPS TLS encryption on all public application endpoints',
      'Sanitize all user inputs before database execution to prevent SQLi'
    ],
    practicalScenarios: [
      {
        situation: 'A React dashboard component freezes the browser UI thread when processing a 50,000-row dataset.',
        bestAction: 'Implement list virtualization (windowing) and offload data crunching to a Web Worker.',
        incorrectActions: [
          'Increase the browser zoom level to shrink table cell dimensions',
          'Store all 50,000 DOM elements in LocalStorage before rendering',
          'Convert the dataset into a giant single string inside a `<p>` tag'
        ],
        rationale: 'Virtualization renders only DOM nodes currently visible in viewport, dramatically lowering browser memory and layout cost.'
      },
      {
        situation: 'A web API returns HTTP 403 Forbidden when a validly logged-in student attempts to delete a course catalog record.',
        bestAction: 'Verify Role-Based Access Control permissions: the user is authenticated but lacks admin authorization.',
        incorrectActions: [
          'Prompt the user to re-enter their password repeatedly without checking role',
          'Assume the database server has crashed and reboot the physical server',
          'Change the API response code to 200 OK without verifying permissions'
        ],
        rationale: 'HTTP 401 indicates missing authentication, whereas HTTP 403 indicates authenticated identity lacking authorization.'
      }
    ]
  },

  'artificial-intelligence-machine-learning': {
    careerId: 'artificial-intelligence-machine-learning',
    coreConcepts: [
      'Supervised vs unsupervised learning and reinforcement reward signals',
      'Loss functions: Mean Squared Error (MSE) vs Categorical Cross-Entropy',
      'Gradient descent optimization: Learning rate, momentum, and Adam optimizer',
      'Overfitting mitigation: L1/L2 regularization, dropout, and early stopping',
      'Model evaluation: Confusion matrix, Precision, Recall, F1-score, and ROC-AUC',
      'Feature engineering: One-hot encoding, min-max scaling, and PCA dimensionality',
      'Convolutional neural networks (CNN) kernel filters and pooling layers',
      'Recurrent networks and Transformer self-attention mechanisms',
      'Data leakage prevention during train-validation-test splitting',
      'Model serialization, ONNX format, and low-latency inference serving'
    ],
    toolsAndStandards: ['Python', 'PyTorch', 'Scikit-Learn', 'TensorFlow', 'Pandas', 'NumPy', 'Jupyter', 'Hugging Face', 'MLflow', 'Matplotlib'],
    commonFailureModes: [
      'Severe model overfitting achieving 99% training accuracy but failing on test data',
      'Data leakage occurring when standard scaler is fit on the test dataset',
      'Vanishing or exploding gradients during deep network backpropagation',
      'Severe class imbalance skewing accuracy metrics on minority classes',
      'Concept drift causing degradation in production model predictions over time'
    ],
    diagnosticProcedures: [
      'Plot learning curves comparing training loss vs validation loss over epochs',
      'Generate confusion matrices to inspect false positive and false negative rates',
      'Analyze gradient norm values across network layers during training steps',
      'Compute cosine similarity between embedded token vector representations',
      'Perform k-fold cross-validation to assess model variance and stability'
    ],
    safetyAndRegulations: [
      'Algorithmic bias auditing and demographic parity fairness metrics',
      'Data privacy governance preventing training on unconsented PII data',
      'Adversarial robustness testing against input perturbation attacks',
      'Explainable AI (XAI) using SHAP and LIME feature attribution models',
      'Safe deployment guardrails preventing hallucinated medical or legal advice'
    ],
    practicalScenarios: [
      {
        situation: 'A crop disease classification model achieves 98% accuracy on training data but drops to 52% on field photos taken by farmers.',
        bestAction: 'Apply image data augmentation (rotation, lighting variation) and add dropout layers to reduce overfitting.',
        incorrectActions: [
          'Train the model for 1,000 more epochs on the original training images',
          'Discard the test dataset and report only the 98% training accuracy',
          'Delete all intermediate network layers to reduce model capacity to zero'
        ],
        rationale: 'The gap indicates overfitting; augmentation and regularization force the network to generalize to varied real-world lighting.'
      },
      {
        situation: 'A fraud detection model has 99% accuracy because 99% of transactions are legitimate, but misses 80% of fraudulent cases.',
        bestAction: 'Evaluate the model using Precision-Recall AUC and apply SMOTE oversampling or class weighting.',
        incorrectActions: [
          'Celebrate the 99% accuracy score and deploy the model immediately',
          'Remove all fraud examples from the training data to reach 100% accuracy',
          'Use Mean Squared Error as the classification loss metric'
        ],
        rationale: 'In severe class imbalance, accuracy is misleading; recall and precision focus on the minority class of interest.'
      }
    ]
  },

  'data-analytics': {
    careerId: 'data-analytics',
    coreConcepts: [
      'SQL joins (INNER, LEFT, RIGHT, FULL OUTER) and set operations',
      'Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)',
      'Star schema vs snowflake schema dimensional data modeling',
      'Descriptive, diagnostic, predictive, and prescriptive analytics paradigms',
      'Measures of central tendency: Mean, median, mode, and standard deviation',
      'Hypothesis testing: p-values, null hypothesis, and confidence intervals',
      'Data cleaning: Handling missing values (imputation vs deletion) and outliers',
      'Dashboard visualization principles: Visual hierarchy and cognitive load',
      'Correlation coefficients (Pearson r) vs causal relationship fallacies',
      'ETL data pipeline orchestration and data warehouse staging layers'
    ],
    toolsAndStandards: ['SQL', 'Power BI', 'Tableau', 'Excel Pivot Tables', 'Python Pandas', 'Google BigQuery', 'dbt', 'Snowflake', 'Statistics', 'Seaborn'],
    commonFailureModes: [
      'Cartesian cross-product in SQL join causing duplicated metric calculations',
      'Misinterpreting high correlation as proof of direct causal causation',
      'Truncated Y-axis on bar charts creating misleading visual distortion',
      'Using arithmetic mean on heavily skewed salary or revenue distributions',
      'Dirty source data with inconsistent date formats breaking dashboard filters'
    ],
    diagnosticProcedures: [
      'Execute `COUNT(DISTINCT primary_key)` before and after SQL join operations',
      'Plot box plots and histograms to identify outlier values and distribution skew',
      'Cross-check dashboard aggregated KPI figures against raw source ledger totals',
      'Inspect null counts and data types across all pipeline ingestion stages',
      'Calculate z-scores to detect data values beyond 3 standard deviations'
    ],
    safetyAndRegulations: [
      'Data anonymization and masking of personally identifiable customer data',
      'Adherence to corporate data governance and role-based data view access',
      'Transparent documentation of data transformation logic and metric definitions',
      'Audit logging for sensitive financial and operational metric queries',
      'Regular backup of data warehouse dimension and fact tables'
    ],
    practicalScenarios: [
      {
        situation: 'A retail executive notices revenue reported in Power BI is double the actual banking ledger amount.',
        bestAction: 'Inspect the SQL join condition between orders and item lines for unhandled 1-to-many cardinality duplication.',
        incorrectActions: [
          'Divide all revenue figures by 2 directly in the dashboard presentation layer',
          'Delete half the rows in the database transactions table at random',
          'Blame the database server hardware and order a new server'
        ],
        rationale: 'A 1-to-many join without grouping sums order-level totals once for every line item, artificially inflating totals.'
      },
      {
        situation: 'A dataset has income values where 95% earn 20,000 INR/month, but two outliers earn 50,000,000 INR/month.',
        bestAction: 'Report the median and interquartile range (IQR) rather than the arithmetic mean to represent typical income.',
        incorrectActions: [
          'Report the mean income of 1,000,000 INR as the typical citizen earnings',
          'Replace all low-income records with the maximum outlier value',
          'Delete 95% of the dataset to make the distribution look normal'
        ],
        rationale: 'The median is robust against extreme outliers, providing an accurate measure of central tendency in skewed distributions.'
      }
    ]
  },

  'it-support-hardware-networking': {
    careerId: 'it-support-hardware-networking',
    coreConcepts: [
      'Motherboard POST sequence, BIOS/UEFI configuration, and CMOS battery',
      'Computer hardware subsystem architecture: CPU, RAM, NVMe, PCIe, and PSU',
      'Operating system installation, GPT vs MBR partitioning, and driver signing',
      'DHCP DORA process (Discover, Offer, Request, Acknowledge) and APIPA (169.254.x.x)',
      'DNS resolution troubleshooting and local hosts file precedence',
      'RJ45 crimping: T568A vs T568B pinout standards and cable testing',
      'Active Directory user provisioning, password resets, and GPO propagation',
      'Printer spooler service troubleshooting and network queue management',
      'Command-line network diagnostics: ping, tracert, ipconfig, nslookup, netstat',
      'Thermal paste application and desktop cooling airflow dynamics'
    ],
    toolsAndStandards: ['Multimeter', 'Cable Tester', 'Crimper', 'ESD Strap', 'Wireshark', 'Sysinternals', 'PowerShell', 'MemTest86', 'CrystalDiskInfo', 'S.M.A.R.T.'],
    commonFailureModes: [
      'Workstation assigning 169.254.x.x APIPA address due to DHCP server unreachability',
      'Continuous beep codes on power-on caused by unseated RAM modules',
      'Hard disk clicking sounds indicating imminent mechanical drive head failure',
      'Thermal throttling downclocking CPU due to dried thermal paste or fan failure',
      'Network loop caused by unmanaged switch creating broadcast storms'
    ],
    diagnosticProcedures: [
      'Check motherboard debug LEDs or listen to beep code patterns during POST',
      'Run `ipconfig /release && ipconfig /renew` to force fresh DHCP lease negotiation',
      'Inspect S.M.A.R.T. health parameters for reallocated sector counts on storage drives',
      'Execute `ping 127.0.0.1` loopback test to verify local TCP/IP stack integrity',
      'Boot MemTest86 to isolate faulty RAM memory addresses under stress'
    ],
    safetyAndRegulations: [
      'Wear an anti-static ESD wrist strap grounded to unpainted chassis metal',
      'Never open a computer Power Supply Unit (PSU) due to lethal high-voltage capacitors',
      'Safe electronic waste (e-waste) disposal compliance under Indian E-Waste Rules',
      'Ensure proper ergonomics (monitor height, chair lumbar support) at workstations',
      'Secure corporate storage drive sanitization (DoD 5220.22-M / NIST SP 800-88)'
    ],
    practicalScenarios: [
      {
        situation: 'An office PC boots to a black screen with three long beeps and will not display the BIOS splash screen.',
        bestAction: 'Power off, disconnect AC power, ground with ESD strap, and reseat the RAM sticks in their DIMM slots.',
        incorrectActions: [
          'Format the primary SSD drive using another workstation',
          'Replace the network Ethernet patch cable with a crossover cable',
          'Keep the machine running for 4 hours to see if it fixes itself'
        ],
        rationale: 'POST beep codes before video initialization typically indicate memory or GPU seating issues; reseating RAM is step one.'
      },
      {
        situation: 'A user cannot access internet websites, and `ipconfig` shows an IP address of 169.254.12.84.',
        bestAction: 'Investigate physical cable connection to switch or DHCP server availability, as APIPA indicates DHCP failure.',
        incorrectActions: [
          'Instruct the user to replace their computer motherboard',
          'Assume the internet is working properly and close the IT ticket',
          'Manually set the default gateway to 127.0.0.1'
        ],
        rationale: '169.254.x.x is an Automatic Private IP assigned by Windows when no DHCP server responds to DHCP Discover packets.'
      }
    ]
  },

  'mechanical-engineering-manufacturing': {
    careerId: 'mechanical-engineering-manufacturing',
    coreConcepts: [
      'Engineering tolerances and Geometric Dimensioning & Tolerancing (GD&T)',
      'Stress-strain curve: Elastic limit, yield strength, tensile strength, and fracture',
      'Heat treatment: Annealing, normalizing, quenching, and tempering processes',
      'Orthographic projection: First-angle vs third-angle projection standards',
      'Lathe turning operations: Facing, turning, knurling, parting, and threading',
      'Milling operations: Up-milling (conventional) vs down-milling (climb)',
      'Welding processes: SMAW (stick), GMAW (MIG), GTAW (TIG), and weld defect inspection',
      'Piping, hydraulic fluid power, and pneumatic actuator circuit schematics',
      'Bearings: Deep groove ball, roller, thrust bearings, and lubrication regimes',
      'Preventive maintenance schedules, vibration analysis, and alignment'
    ],
    toolsAndStandards: ['Vernier Caliper', 'Micrometer', 'Dial Indicator', 'Height Gauge', 'AutoCAD', 'SolidWorks', 'Feeler Gauge', 'Torque Wrench', 'ISO 2768', 'ASME Y14.5'],
    commonFailureModes: [
      'Bearing seizure caused by improper lubrication or excessive radial preload',
      'Fatigue cracking initiating at sharp internal corners lacking fillet radii',
      'Weld porosity and slag inclusion caused by damp electrodes or low shielding gas',
      'Shaft misalignment inducing destructive 1X/2X rotational vibration harmonics',
      'Thermal expansion binding rotating components due to inadequate clearance'
    ],
    diagnosticProcedures: [
      'Measure shaft runout using a dial test indicator mounted on a magnetic base',
      'Perform dye penetrant inspection (DPI) to detect surface fatigue cracks',
      'Collect FFT vibration spectra to distinguish unbalance from bearing defects',
      'Verify workpiece dimensions using calibrated outside micrometers with ratchet stop',
      'Inspect oil samples for metallic wear debris using ferrographic analysis'
    ],
    safetyAndRegulations: [
      'Never wear gloves, ties, loose clothing, or jewelry near rotating lathe spindles',
      'Mandatory safety goggles (ANSI Z87.1) and steel-toe footwear in machine shops',
      'Lockout-Tagout (LOTO) energy isolation before servicing gears or belt drives',
      'Machine guarding (interlocked chip shields) must remain closed during operation',
      'Emergency stop pull-cords must be tested and unobstructed along conveyor lines'
    ],
    practicalScenarios: [
      {
        situation: 'A machinist notices heavy chatter marks and high-pitched vibration during a deep lathe turning pass.',
        bestAction: 'Reduce tool overhang, ensure tool is on center height, and optimize feed rate and cutting speed.',
        incorrectActions: [
          'Increase the spindle speed to maximum RPM to power through the vibration',
          'Hold the spinning workpiece with gloved hands to dampen vibration',
          'Loosen the toolpost clamping bolts to allow tool movement'
        ],
        rationale: 'Chatter is caused by lack of rigidity or incorrect cutting speed; minimizing tool overhang increases system stiffness.'
      },
      {
        situation: 'A high-pressure hydraulic hose in a stamping press begins leaking fluid in a fine mist spray.',
        bestAction: 'Depressurize the hydraulic system immediately; never touch or inspect pressurized fluid spray with hands.',
        incorrectActions: [
          'Run a gloved finger along the hose to pinpoint the pinhole leak',
          'Wrap electrical duct tape over the leaking hose while the press is running',
          'Increase the hydraulic relief valve pressure setting'
        ],
        rationale: 'High-pressure fluid injection through the skin is a medical emergency causing severe tissue necrosis or amputation.'
      }
    ]
  },

  'electrical-industrial-maintenance': {
    careerId: 'electrical-industrial-maintenance',
    coreConcepts: [
      'Ohm\'s Law, Kirchhoff\'s Laws, and 3-phase AC power calculations (P = √3 × V × I × cosφ)',
      'Motor control circuits: Direct-On-Line (DOL) vs Star-Delta starting schemes',
      'Variable Frequency Drives (VFD) V/f control, parameterization, and braking resistors',
      'Transformer operation: Turns ratio, core losses, winding resistance, and Buchholz relays',
      'Protection devices: MCB, MCCB, RCCB/ELCB, and thermal overload relays',
      'Earthing systems (TT, TN-S, TN-C-S) and earth pit resistance measurement (IS 3043)',
      'Insulation resistance testing (Megger) standards and dielectric breakdown voltage',
      'Power factor correction using automatic capacitor banks (APFC)',
      'Programmable Logic Controller (PLC) digital/analog I/O wiring and sink/source concepts',
      'Single-line diagrams (SLD) and electrical panel schematics interpretation'
    ],
    toolsAndStandards: ['True-RMS Multimeter', 'Clamp Meter', 'Megger (Insulation Tester)', 'Earth Tester', 'Phase Rotation Tester', 'LOTO Kit', 'IS 732', 'NFPA 70E', 'IEC 60364', 'Thermal Imager'],
    commonFailureModes: [
      'Single phasing on 3-phase induction motors causing severe overheating and winding burnout',
      'Loose terminal connections generating thermal hotspots and electrical fires',
      'Insulation degradation leading to ground faults and frequent RCCB nuisance tripping',
      'Harmonic distortion from non-linear VFD loads overheating neutral conductors',
      'Contactor contact welding due to excessive inrush current or severe contact bounce'
    ],
    diagnosticProcedures: [
      'Test motor insulation resistance phase-to-phase and phase-to-earth with 500V/1000V Megger',
      'Measure 3-phase current balance using a True-RMS clamp meter on full load',
      'Scan electrical busbars and breaker terminals with an infrared thermal camera',
      'Measure earth electrode resistance using the fall-of-potential 3-point method',
      'Verify phase sequence rotation (R-Y-B) prior to commissioning motor drives'
    ],
    safetyAndRegulations: [
      'Zero Energy State verification: Test Before Touch with a calibrated voltage detector',
      'Arc Flash PPE (face shield, arc-rated suit) matching incident energy cal/cm² rating',
      'Lockout/Tagout (LOTO) individual padlocks and danger tags on main isolator switches',
      'Never bypass thermal overload relays or replace fuses with oversized copper wire',
      'Maintain minimum 1-meter clear working space in front of all switchgear panels'
    ],
    practicalScenarios: [
      {
        situation: 'A 3-phase 15 kW motor trips on thermal overload 5 minutes after starting, and hums loudly.',
        bestAction: 'Isolate power, apply LOTO, and measure line voltages and currents; a missing phase causes single-phasing.',
        incorrectActions: [
          'Turn the thermal overload adjustment screw to maximum to stop it tripping',
          'Hold the contactor armature manually closed with a wooden stick',
          'Pour water on the motor frame to cool the windings during operation'
        ],
        rationale: 'Single-phasing occurs when one phase is lost, drawing roughly 1.73x current on remaining lines, rapidly burning windings.'
      },
      {
        situation: 'An electrician prepares to troubleshoot inside a 415V distribution panel.',
        bestAction: 'Apply LOTO on upstream breaker, verify zero voltage with an approved tester, and wear rated PPE.',
        incorrectActions: [
          'Touch the main busbar quickly with the back of the hand to test for power',
          'Assume the panel is de-energized because the panel door indicator light is off',
          'Work barefoot or in wet canvas shoes to maintain balance on the floor'
        ],
        rationale: 'Always prove zero energy state using the "live-dead-live" testing method before touching any electrical conductor.'
      }
    ]
  },

  'mining-mineral-processing': {
    careerId: 'mining-mineral-processing',
    coreConcepts: [
      'Open-cast vs underground mining extraction methodologies and bench geometry',
      'Blasting engineering: Blast hole spacing, burden, stemming, and non-electric detonators',
      'Crushing and comminution: Primary jaw crushers, secondary cone crushers, and ball mills',
      'Sizing and screening: Vibrating screens, hydrocyclones, and cut-point separation',
      'Beneficiation processes: Froth flotation, magnetic separation, and gravity spirals',
      'Slurry transport: Centrifugal slurry pumps, pipeline hydraulics, and settling velocity',
      'Tailings dam management: Decant towers, embankment stability, and seepage monitoring',
      'Mine ventilation: Auxiliary fans, stopping walls, and lethal gas dilution (CO, CH4, NOx)',
      'Heavy Earth Moving Machinery (HEMM): Dumpers, excavators, surface miners, and haul roads',
      'Environmental rehabilitation: Topsoil preservation, overburden dump terracing, and afforestation'
    ],
    toolsAndStandards: ['Multi-Gas Detector', 'Inclinometer', 'Piezometer', 'Sieve Shaker', 'Slurry Densitometer', 'DGMS Regulations', 'MCDR 2017', 'Mines Act 1952', 'Laser Rangefinder', 'Anemometer'],
    commonFailureModes: [
      'Crusher cavity choke feeding causing drive belt slippage and motor thermal trip',
      'Slurry pipeline sanding and blockage due to sub-critical transport velocity',
      'Bench slope failure or rockslide along natural bedding plane dip directions',
      'Froth flotation grade collapse caused by reagent overdosing or incorrect slurry pH',
      'Hazardous mine atmosphere accumulation of carbon monoxide after blasting'
    ],
    diagnosticProcedures: [
      'Monitor slope stability movement using automated total station prism monitoring',
      'Measure slurry density using a Marcy scale or nuclear density gauge',
      'Test mine air velocity and toxic gas concentrations before personnel entry',
      'Perform sieve analysis on crushed ore to verify cumulative percent passing (P80)',
      'Inspect tailings embankment piezometric water table levels against safe thresholds'
    ],
    safetyAndRegulations: [
      'Directorate General of Mines Safety (DGMS) mandatory safety management plans',
      'Statutory 500-meter safety clearance zone during active surface blasting rounds',
      'Mandatory personal multi-gas monitors and self-contained self-rescuers underground',
      'HEMM blind-spot safety: Audio-visual reverse alarms and proximity detection sensors',
      'Dust suppression compliance: High-pressure mist sprays along haul roads and crushers'
    ],
    practicalScenarios: [
      {
        situation: 'Following a blast in an underground section, the ventilation air shows 45 ppm Carbon Monoxide (CO).',
        bestAction: 'Barricade the section, prohibit personnel entry, and run auxiliary fans until CO drops below permissible limits.',
        incorrectActions: [
          'Send miners in with standard dust masks to resume manual shovel loading',
          'Spray water on the blasted muck pile to dissolve the carbon monoxide gas',
          'Turn off ventilation fans to save electricity while waiting for gas to settle'
        ],
        rationale: 'Carbon monoxide is a lethal, odorless toxic gas produced by explosives; dust masks provide zero protection against gases.'
      },
      {
        situation: 'An iron ore wet screening plant experiences severe blinding (clogged screen cloth openings).',
        bestAction: 'Inspect water spray nozzle pressure and angle, or replace with polyurethane anti-blinding screen panels.',
        incorrectActions: [
          'Beat the running vibrating screen deck violently with heavy iron sledgehammers',
          'Increase ore feed rate by 200% to force material through the clogged openings',
          'Remove screen panels completely and allow unclassified rocks into the flotation cells'
        ],
        rationale: 'Screen blinding is alleviated by optimizing spray wash pressure or using flexible, non-stick polyurethane mesh.'
      }
    ]
  },

  'steel-metallurgical-industries': {
    careerId: 'steel-metallurgical-industries',
    coreConcepts: [
      'Ironmaking in Blast Furnace (BF): Burden distribution, pulverized coal injection, and slag chemistry',
      'Steelmaking in Basic Oxygen Furnace (BOF) vs Electric Arc Furnace (EAF)',
      'Secondary metallurgy: Ladle Refining Furnace (LRF), vacuum degassing (VD/RH), and deoxidation',
      'Continuous Casting Machine (CCM): Tundish metallurgy, mold oscillation, and spray cooling',
      'Hot and cold rolling mills: Reduction schedules, roll pass design, and crowning',
      'Iron-carbon phase diagram: Ferrite, austenite, pearlite, martensite, and bainite',
      'Non-destructive testing (NDT): Ultrasonic testing, magnetic particle testing, and radiography',
      'Corrosion mechanisms, galvanized zinc coatings, and stainless steel passivation',
      'Refractory materials: Basic (magnesite), acidic (silica), and neutral (alumina) linings',
      'Energy recovery: Top gas pressure recovery turbines (TRT) and coke dry quenching (CDQ)'
    ],
    toolsAndStandards: ['Optical Emission Spectrometer (OES)', 'Immersion Thermocouple', 'Ultrasonic Flaw Detector', 'Metallurgical Microscope', 'Charpy Impact Tester', 'Hardness Tester', 'ASTM E45', 'IS 2062', 'ISO 6892-1', 'Pyrometer'],
    commonFailureModes: [
      'Breakout during continuous casting when the solidified steel shell tears inside the mold',
      'Non-metallic oxide inclusion entrapment causing lamination defects in rolled plates',
      'Quench cracking resulting from excessive cooling rate during martensitic hardening',
      'Hydrogen-induced delayed cracking (fisheyes) in heavy forged alloy steel sections',
      'Refractory lining erosion in steel ladles risking catastrophic molten steel breakthrough'
    ],
    diagnosticProcedures: [
      'Sample liquid steel with immersion lollipop sampler and analyze chemistry via OES in 30 seconds',
      'Measure molten steel temperature and dissolved oxygen ppm using disposable lance probes',
      'Prepare metallographic micro-specimens with 2% Nital etch to evaluate grain boundary structure',
      'Conduct Charpy V-notch impact testing to determine ductile-to-brittle transition temperature',
      'Perform ultrasonic scanning on rolled steel billets to detect internal piping shrinkage voids'
    ],
    safetyAndRegulations: [
      'Extreme thermal safety: Aluminized proximity suits, furnace face shields, and wooden clogs',
      'Molten metal moisture explosion hazard: Never introduce wet scrap or damp tools into molten metal',
      'Blast furnace gas (BFG/COG) carbon monoxide hazard: Continuous wearable CO monitors',
      'Safe overhead crane ladle transport: Redundant wire ropes and ladle safety catches',
      'Strict statutory environmental emissions norms for coke ovens and sinter plants'
    ],
    practicalScenarios: [
      {
        situation: 'A crane operator is about to lower a bucket of heavy scrap into an active molten steel electric arc furnace.',
        bestAction: 'Verify that scrap is completely dry and preheated; moisture introduced into molten steel causes violent steam explosions.',
        incorrectActions: [
          'Ensure the scrap is soaking wet to reduce dust emissions inside the plant',
          'Drop the entire scrap charge rapidly from a height of 10 meters into the liquid bath',
          'Turn off furnace exhaust fans to prevent air from entering the vessel'
        ],
        rationale: 'Water expands roughly 1,700 times into steam instantaneously when contacting molten steel (1600°C), triggering catastrophic explosions.'
      },
      {
        situation: 'Tensile testing of a heat-treated structural steel sample reveals high hardness but near-zero ductility, fracturing under light shock.',
        bestAction: 'Perform a secondary tempering cycle at appropriate temperature to relieve internal stresses and restore toughness.',
        incorrectActions: [
          'Quench the steel sample immediately into ice water from room temperature',
          'Grind the outer surface of the sample to make it look smooth',
          'Certify the brittle sample for critical bridge construction loads'
        ],
        rationale: 'As-quenched martensite is extremely hard but dangerously brittle; tempering exchanges excess hardness for required impact toughness.'
      }
    ]
  },

  'industrial-automation-cnc-robotics': {
    careerId: 'industrial-automation-cnc-robotics',
    coreConcepts: [
      'PLC architecture: Scan cycle (Input scan, Program execution, Output update)',
      'IEC 61131-3 programming languages: Ladder Diagram (LD), Function Block (FBD), Structured Text (ST)',
      'Industrial networking protocols: Modbus TCP, Profinet, EtherCAT, and Ethernet/IP',
      'Sensor interfacing: NPN (sinking) vs PNP (sourcing) proximity sensors and analog 4-20mA loops',
      'CNC G-code programming: G00 rapid, G01 linear feed, G02/G03 circular interpolation, and M-codes',
      'Work coordinate systems (G54-G59) and tool length geometry offsets (G43 H-code)',
      'Robotics kinematics: Cartesian, SCARA, Articulated 6-axis, Delta, and cobot payload limits',
      'Robot teaching: Teach pendant jogging, joint coordinates vs tool center point (TCP) world frame',
      'Pneumatics and hydraulics: 5/2-way solenoid directional valves, flow control valves, and cylinders',
      'SCADA / HMI tag configuration, real-time alarms, and historical data trending'
    ],
    toolsAndStandards: ['Siemens TIA Portal', 'Rockwell Studio 5000', 'CNC Simulator', 'Robot Teach Pendant', 'Digital Multimeter', 'Oscilloscope', 'ISO 10218 (Robot Safety)', 'ISO 13849 (Safety of Machinery)', 'IEC 61131', 'G-Code Editor'],
    commonFailureModes: [
      'CNC axis overtravel collision caused by incorrect G54 work zero or missing tool length offset',
      'PLC output module blown because a PNP sensor was wired directly to a sourcing input card',
      'Industrial robot entering emergency stop due to singulatory axis lockup near joint limits',
      '4-20mA analog signal fluctuation caused by unshielded cable routed adjacent to VFD motor leads',
      'Pneumatic gripper failing to actuate due to system pressure drop below 4 bar operating threshold'
    ],
    diagnosticProcedures: [
      'Monitor live PLC ladder logic rungs online to verify input contact transitions',
      'Measure 24V DC control circuit voltage drops across inductive sensor terminals',
      'Dry run CNC programs in Single Block mode with Rapid Override throttled to 5% and distance-to-go display',
      'Ping industrial Ethernet nodes and inspect switch port packet error counters',
      'Calibrate robot Tool Center Point (TCP) using the 4-point tip-to-pointer touching method'
    ],
    safetyAndRegulations: [
      'Dual-channel safety circuits with safety relays and category 4 / PL e safety architecture',
      'Optical safety light curtains and interlocked perimeter safety fencing around robotic cells',
      'Emergency Stop (E-Stop) pushbuttons: Red mushroom head with yellow background, hardwired safety drop',
      'Collaborative robot (cobot) power and force limiting validation under ISO/TS 15066',
      'Lockout-Tagout (LOTO) on primary electrical switch and pneumatic dump valve before cell entry'
    ],
    practicalScenarios: [
      {
        situation: 'A CNC mill operator loads a new cutting tool into pocket 4 and prepares to machine a steel billet.',
        bestAction: 'Touch off the tool on a setter to measure tool length, enter the value in offset H04, and dry run in Single Block.',
        incorrectActions: [
          'Press Cycle Start immediately at 100% feed override without checking offsets',
          'Guess the tool length visually and enter zero in the offset register',
          'Disable machine safety interlocks to watch the cutter closely with unprotected eyes'
        ],
        rationale: 'Running without measured tool length offset causes the spindle to crash directly into the table fixture at rapid speed.'
      },
      {
        situation: 'A maintenance technician enters an automated robot welding cell to clear a jammed conveyor sensor.',
        bestAction: 'Depress the safety gate E-Stop, apply a personal padlock to the gate safety latch, and carry the teach pendant.',
        incorrectActions: [
          'Climb over the safety fence while the robot is running to avoid stopping the line',
          'Ask a colleague to press Cycle Start while standing inside the cell to test the fix',
          'Bypass the safety interlock switch using a spare magnet to save setup time'
        ],
        rationale: 'Never enter an active robot cell without positive lock-out; autonomous robot arms can swing unpredictably at lethal velocities.'
      }
    ]
  },

  'agriculture-agritech': {
    careerId: 'agriculture-agritech',
    coreConcepts: [
      'Soil science: Soil texture, cation exchange capacity (CEC), pH balance, and soil organic carbon (SOC)',
      'Macronutrients (NPK) and micronutrients (Zn, B, Fe): Deficiency symptoms and balanced nutrition',
      'Precision irrigation: Drip irrigation emitter discharge, fertigation Venturi injectors, and tensiometers',
      'Integrated Pest Management (IPM): Economic threshold level (ETL), pheromone traps, and bio-pesticides',
      'Protected cultivation: Polyhouse climate control, shade net percentages, and fan-pad cooling',
      'Agricultural drones: Multispectral NDVI imaging for crop vigor mapping and ultra-low-volume spraying',
      'Seed technology: Certified seed classes, germination percentage testing, and seed priming treatments',
      'Post-harvest management: Grain moisture threshold (<12%), hermetic bags, and solar dehydration',
      'Farm machinery: Tractor PTO shaft speeds (540 RPM), rotavator depth adjustment, and seed drills',
      'Government schemes: PM KISAN, Soil Health Card portal, e-NAM digital markets, and PMFBY crop insurance'
    ],
    toolsAndStandards: ['Soil Testing Kit', 'Tensiometer', 'Refractometer (Brix Meter)', 'EC / pH Pen Meter', 'NDVI Drone Camera', 'Venturi Injector', 'Seed Moisture Meter', 'Pheromone Trap', 'FSSAI Standards', 'ICAR Package of Practices'],
    commonFailureModes: [
      'Severe crop lodging in paddy caused by excessive nitrogen fertilizer application during vegetative stage',
      'Drip emitter clogging resulting from algae growth or calcium carbonate precipitate buildup',
      'Blossom end rot in tomato caused by calcium deficiency aggravated by erratic irrigation intervals',
      'Pesticide resistance resurgence caused by continuous repeated use of single-chemical group sprays',
      'Aflatoxin contamination in stored groundnut/maize due to bagging at moisture content above 14%'
    ],
    diagnosticProcedures: [
      'Collect representative soil samples using the V-shaped slice method at 15 cm depth across fields',
      'Measure electrical conductivity (EC) of soil paste extract to diagnose salinity levels',
      'Inspect underside of leaves using a 10x hand lens to identify early spider mite or whitefly infestation',
      'Test irrigation water hardness and bicarbonates before designing acid fertigation treatments',
      'Calculate crop water requirement (ETc) using reference evapotranspiration (ETo) and crop coefficient (Kc)'
    ],
    safetyAndRegulations: [
      'Chemical PPE: Chemical-resistant gloves, apron, respirator mask, and goggles during pesticide handling',
      'Tractor PTO safety guard must be securely fastened; never step over an unguarded rotating PTO shaft',
      'Observe strict Pre-Harvest Intervals (PHI) to prevent toxic chemical pesticide residue on food crops',
      'Secure storage of farm agrochemicals under lock and key, out of reach of children and livestock',
      'Safe disposal of empty pesticide containers: Triple-rinse, puncture, and deliver to authorized collection'
    ],
    practicalScenarios: [
      {
        situation: 'A farmer in Odisha reports severe soil acidity (pH 4.8) and poor paddy yield with iron toxicity symptoms.',
        bestAction: 'Apply calculated dosage of agricultural lime or dolomite based on Soil Health Card, and improve field drainage.',
        incorrectActions: [
          'Apply massive doses of urea and ammonium sulfate to lower the pH further',
          'Flood the field continuously without allowing any aeration or drainage',
          'Spray concentrated sulfuric acid directly on the crop seedlings'
        ],
        rationale: 'Agricultural lime neutralizes soil acidity, elevates pH to optimal 6.0-6.5 range, and suppresses toxic soluble aluminum/iron.'
      },
      {
        situation: 'A polyhouse drip irrigation system experiences widespread emitter clogging after 2 months of borewell water use.',
        bestAction: 'Flush lateral lines with a mild hydrochloric/nitric acid treatment to dissolve carbonate salts, and clean disc filters.',
        incorrectActions: [
          'Puncture large holes in all drip pipes with a knife destroying pressure regulation',
          'Pour raw engine oil into the irrigation tank to lubricate the emitters',
          'Increase water pump pressure beyond pipe burst rating to blow out clogs'
        ],
        rationale: 'Acid flushing safely dissolves mineral scale precipitates, restoring uniform emitter discharge rates across laterals.'
      }
    ]
  },

  'food-processing-preservation': {
    careerId: 'food-processing-preservation',
    coreConcepts: [
      'Food microbiology: Pathogenic bacteria (Salmonella, E. coli, Clostridium botulinum), yeasts, and molds',
      'Water activity (aw) and its relationship to microbial growth and osmotic dehydration preservation',
      'Thermal processing: Blanching, pasteurization (LTLT, HTST), commercial sterilization, and D/z/F values',
      'Refrigeration and freezing: Cold chain logistics, blast freezing, cryogenics, and freeze burn prevention',
      'FSSAI regulations: Schedule 4 hygiene requirements, licensing, labeling norms, and nutritional facts',
      'HACCP principles: Hazard analysis, Critical Control Points (CCPs), critical limits, and corrective actions',
      'Food packaging technology: Modified Atmosphere Packaging (MAP), retort pouches, and vacuum sealing',
      'Cereal and pulse processing: Parboiling of paddy, milling yield optimization, and pulse splitting (dal)',
      'Fruit and vegetable preservation: Jams (68° Brix), jellies, pickles (oil/acetic acid), and thermal canning',
      'Good Manufacturing Practices (GMP) and Cleaning-In-Place (CIP) sanitation protocols'
    ],
    toolsAndStandards: ['Handheld Refractometer (Brix)', 'pH Meter', 'Water Activity Meter (aw)', 'Autoclave / Retort', 'Seal Integrity Tester', 'Lactometer', 'Colorimeter', 'FSSAI Act 2006', 'ISO 22000', 'Codex Alimentarius'],
    commonFailureModes: [
      'Lethal Clostridium botulinum toxin production in canned food due to under-processing of low-acid foods (pH > 4.6)',
      'Jam weeping (syneresis) resulting from pectin degradation, excess acid, or insufficient soluble solids',
      'Oxidative rancidity in packaged fried snacks caused by leaky packaging allowing oxygen and light exposure',
      'Enzymatic browning in sliced fruits caused by polyphenol oxidase due to inadequate blanching',
      'Post-pasteurization microbial recontamination caused by micro-fissures in plate heat exchanger gaskets'
    ],
    diagnosticProcedures: [
      'Verify can seal seam geometry (overlap, body hook, cover hook) using a micrometer seam projector',
      'Measure total soluble solids (°Brix) using a temperature-compensated optical refractometer',
      'Perform swab testing on stainless steel food contact surfaces before production using ATP bioluminescence',
      'Conduct incubator testing on finished canned goods at 37°C and 55°C to detect gas-forming spoilage microbes',
      'Audit processing temperature logs to ensure CCP critical limits (e.g. 72°C for 15 seconds) are strictly maintained'
    ],
    safetyAndRegulations: [
      'Food safety PPE: Hairnets, beard covers, nitrile food-grade gloves, clean apron, and dedicated facility footwear',
      'Strict allergen cross-contamination management and dedicated color-coded utensils',
      'Personal hygiene: Handwashing for 20 seconds, prohibition of jewelry, and exclusion of sick food handlers',
      'Boiler and retort pressure vessel safety inspection and certified pressure relief valves',
      'Safe chemical handling of caustic soda (NaOH) and nitric acid during CIP cleaning cycles'
    ],
    practicalScenarios: [
      {
        situation: 'A quality manager observes that canned mango slices have swollen can ends (blown cans) after 10 days in warehouse storage.',
        bestAction: 'Quarantine the entire batch immediately, investigate microbial gas formation, and audit retort sterilization records.',
        incorrectActions: [
          'Puncture the swollen cans with a needle to release gas and sell them as discounted items',
          'Repack the mango slices into plastic pouches and boil them in an open kitchen pot',
          'Ignore the swelling because fruit cans naturally expand in hot weather'
        ],
        rationale: 'Blown cans indicate anaerobic gas-producing microbial spoilage; consuming under-sterilized canned food risks fatal food poisoning.'
      },
      {
        situation: 'A tomato sauce manufacturing line finds the product consistency is too watery and fails to meet FSSAI standards.',
        bestAction: 'Verify that tomato solids meet the minimum 25% total soluble solids (°Brix) and adjust vacuum kettle evaporation.',
        incorrectActions: [
          'Add non-food-grade chemical dyes to make the sauce look thicker and darker',
          'Add unfiltered tap water to increase product volume and lower manufacturing cost',
          'Falsify the laboratory test certificate to pass the batch onto supermarket shelves'
        ],
        rationale: 'FSSAI mandates minimum 25% TSS for tomato sauce; maintaining proper vacuum concentration ensures compliance and stability.'
      }
    ]
  },

  'dairy-fisheries-animal-husbandry': {
    careerId: 'dairy-fisheries-animal-husbandry',
    coreConcepts: [
      'Milk composition: Fat, Solids-Not-Fat (SNF), lactose, protein, and water percentages',
      'Clean Milk Production (CMP): Teat dipping (pre and post milking), somatic cell count, and mastitis screening',
      'Bulk Milk Cooler (BMC) operation: Rapid chilling from 37°C to below 4°C within 2 hours to halt bacteria',
      'Aquaculture pond ecology: Dissolved Oxygen (DO > 5 mg/L), pH (7.5-8.5), alkalinity, and toxic ammonia (NH3)',
      'Fish feeding regimes: Feed Conversion Ratio (FCR), floating extruded pellets, and feeding tray monitoring',
      'Recirculating Aquaculture Systems (RAS): Mechanical drum filters, moving bed bio-reactors, and UV sterilization',
      'Biofloc technology: Carbon-to-nitrogen ratio (C:N 10-15:1), microbial floc volume, and continuous aeration',
      'Poultry management: Broiler vs layer housing, biosecurity sanitizing footbaths, and Newcastle disease vaccination',
      'Dairy cattle nutrition: Total Mixed Ration (TMR), green fodder (silage/Napier grass), and bypass fat supplements',
      'Artificial Insemination (AI): Liquid nitrogen semen tank (-196°C) handling, thaw temperature (37°C), and rectovaginal technique'
    ],
    toolsAndStandards: ['Digital Lactometer', 'Gerber Centrifuge (Fat Test)', 'DO Meter', 'Salinity Refractometer', 'Secchi Disk (Turbidity)', 'Somatic Cell Counter', 'Liquid Nitrogen Container', 'FSSAI Dairy Standards', 'NFDB Guidelines', 'FAO Aquaculture Manual'],
    commonFailureModes: [
      'Catastrophic mass fish mortality at dawn caused by critical Dissolved Oxygen depletion in overstocked ponds',
      'High bacterial count and milk souring caused by delayed chilling or unsterilized milking machine clusters',
      'Ammonia toxicity spike (unionized NH3 > 0.05 mg/L) in fish ponds leading to gill damage and loss of appetite',
      'Subclinical mastitis leading to dramatic milk yield drop and elevated California Mastitis Test (CMT) reaction',
      'Semen straw cell mortality caused by lifting straws above the liquid nitrogen container frost line'
    ],
    diagnosticProcedures: [
      'Perform California Mastitis Test (CMT) using reagent paddle on individual cattle udder quarters',
      'Measure milk fat percentage using the Gerber butyrometer and SNF via corrected lactometer reading (CLR)',
      'Test pond water Dissolved Oxygen before dawn using a calibrated electrochemical DO meter',
      'Examine fish gill clips and skin mucus scrapings under a light microscope for parasitic protozoa',
      'Check liquid nitrogen container dipstick weekly to verify adequate cryogenic coolant level'
    ],
    safetyAndRegulations: [
      'Extreme cryogenic safety: Cryo-gloves, face shield, and closed shoes when handling liquid nitrogen at -196°C',
      'Biosecurity quarantine protocols to prevent entry of Highly Pathogenic Avian Influenza (HPAI) or Tilapia Lake Virus',
      'Observe withdrawal periods for antibiotics and veterinary drugs to prevent residues in milk, meat, and fish',
      'Electrical safety for pond aerators: Submersible cables must have water-tight splices and earth-leakage breakers',
      'Safe restraint of large dairy animals using head gates and veterinary crushes to prevent crush injuries'
    ],
    practicalScenarios: [
      {
        situation: 'At 5:00 AM, a fish farmer notices thousands of Indian Major Carps gasping at the water surface with open mouths.',
        bestAction: 'Activate all paddlewheel aerators immediately, pump in fresh oxygenated water, and suspend all feed additions.',
        incorrectActions: [
          'Dump large sacks of chemical urea and poultry manure into the pond',
          'Wait until noon to see if the fish recover naturally without intervention',
          'Throw large amounts of floating feed pellets to keep the fish occupied'
        ],
        rationale: 'Surface gasping at dawn is a textbook sign of acute anoxia; immediate aeration is required to prevent total fish kill.'
      },
      {
        situation: 'A milk collection center tests a dairy farmer\'s milk and finds specific gravity is 1.020 (normal is 1.028-1.032).',
        bestAction: 'Reject or penalize the milk batch for water adulteration, as added water dilutes milk density and SNF.',
        incorrectActions: [
          'Mix the watered milk with cream to artificially conceal the water dilution',
          'Add neutralizers like caustic soda to raise the lactometer reading artificially',
          'Accept the milk without comment and pass the financial loss to consumers'
        ],
        rationale: 'Lactometer readings below 1.028 indicate water addition; adulteration violates food standards and promotes spoilage.'
      }
    ]
  },

  'tailoring-stitching-apparel': {
    careerId: 'tailoring-stitching-apparel',
    coreConcepts: [
      'Textile fibers: Natural (cotton, silk, wool) vs synthetic (polyester, nylon) and fabric grainlines',
      'Fabric properties: Warp, weft, bias stretch, selvage, and Grams per Square Meter (GSM)',
      'Body measurement techniques: Bust/chest, waist, hip, shoulder width, sleeve length, and inseam',
      'Pattern making: Drafting, ease allowances, dart manipulation, seam allowances, and grading',
      'Industrial sewing machines: Single needle lockstitch (SNLS), overlock/serger, and flatlock machines',
      'Needle systems: DBx1, DPx5, ballpoint for knits, sharp points for wovens, and needle sizes (70/10 to 110/18)',
      'Thread tension: Upper needle tension vs bobbin tension balance to prevent puckering or loopy seams',
      'Garment construction sequence: Dart stitching, shoulder joining, collar assembly, sleeve insertion, and hemming',
      'Quality inspection: Defect classification (critical, major, minor), AQL 2.5 standards, and measurement tolerance',
      'Pressing and finishing: Iron temperature per fiber, fusing interlinings, steam pressing, and tag attachment'
    ],
    toolsAndStandards: ['Tailor\'s Measuring Tape', 'L-Square & French Curve', 'Industrial Single Needle Lockstitch Machine', 'Overlock Machine', 'Rotary Fabric Cutter', 'Thread Snips', 'Pinking Shears', 'Fabric GSM Cutter', 'AQL Sampling Standard', 'Steam Iron'],
    commonFailureModes: [
      'Seam puckering caused by excessive needle thread tension or using a blunt/damaged needle',
      'Skipped stitches occurring when sewing stretch knit fabric due to using a regular sharp needle instead of ballpoint',
      'Fabric distortion and twisting caused by cutting pattern pieces off-grain across the fabric bias',
      'Thread snapping continuously during high-speed stitching caused by incorrect needle insertion backwards',
      'Oil stains on finished garments caused by overfilling industrial sewing machine oil reservoirs'
    ],
    diagnosticProcedures: [
      'Inspect seam balance by pulling apart stitched fabric layers to see if lockstitch knots sit centered in fabric',
      'Check sewing needle point condition by running needle tip across a pair of nylon pantyhose for burrs',
      'Measure cut garment panels against master acrylic patterns to ensure cut accuracy within ±2mm',
      'Test interlining bond strength using peel-test methods after fusing at recommended heat and pressure',
      'Perform 4-point fabric inspection system to grade roll quality before spreading and cutting'
    ],
    safetyAndRegulations: [
      'Wear stainless steel wire-mesh safety gloves on the non-dominant hand when operating electric rotary fabric cutters',
      'Industrial sewing machine needle guards must be installed to prevent operator finger puncture injuries',
      'Mandatory hair ties and no loose scarves/dupatta near motor-driven industrial sewing machine belt pulleys',
      'Proper ergonomic seating: Adjustable chair height with footrest to prevent chronic repetitive strain injury (RSI)',
      'Safe storage and accountability of needles and snippers; broken needle policy to prevent needles in garments'
    ],
    practicalScenarios: [
      {
        situation: 'An operator sewing a lycra-spandex t-shirt reports that every third stitch is skipped, causing unraveling seams.',
        bestAction: 'Replace the standard sharp needle with a fresh ballpoint/stretch needle (SES) of appropriate size (75/11).',
        incorrectActions: [
          'Pull the fabric forcefully through the feed dogs by hand during stitching',
          'Tighten the upper thread tension screw to its maximum limit with pliers',
          'Use thick upholstery thread to force the lockstitch to hold'
        ],
        rationale: 'Knit fibers slip away from sharp needles; ballpoint needles push between elastic yarns without piercing or missing loops.'
      },
      {
        situation: 'A cutter is about to use an electric vertical straight-knife machine to cut through a 50-layer cotton fabric lay.',
        bestAction: 'Don a certified stainless steel mesh glove on the guiding hand and adjust the machine blade guard down to lay height.',
        incorrectActions: [
          'Operate the machine with bare hands with the knife guard raised to maximum height',
          'Hold the fabric lay together using bare fingers 1 centimeter directly in front of the blade',
          'Use an ungrounded two-pin electrical plug with frayed wires to power the cutter'
        ],
        rationale: 'Electric cutting knives cause catastrophic amputation injuries; steel mesh gloves and lowered guards are non-negotiable safety requirements.'
      }
    ]
  },

  'solar-energy-green-jobs': {
    careerId: 'solar-energy-green-jobs',
    coreConcepts: [
      'Photovoltaic (PV) physics: P-N junction bandgap, solar irradiance (W/m²), and standard test conditions (STC)',
      'Solar cell technologies: Monocrystalline PERC, polycrystalline, thin film, and bifacial modules',
      'I-V and P-V curve characteristics: Open-circuit voltage (Voc), short-circuit current (Isc), and Maximum Power Point (MPP)',
      'Solar inverters: String inverters, microinverters, central inverters, and Maximum Power Point Tracking (MPPT)',
      'System architectures: Grid-tied net metering, off-grid battery storage, and hybrid solar systems',
      'Rooftop mounting structures: Tilt angle calculation (latitude tilt), azimuth orientation, and wind load engineering',
      'Balance of System (BOS): DC solar cables, MC4 connectors, string combiner boxes, and DC disconnect isolators',
      'System earthing and lightning protection: Separate DC earth, AC earth, and Lightning Arrestor (LA) pits (<5 Ohms)',
      'Solar battery technologies: Lithium Iron Phosphate (LiFePO4) vs tubular lead-acid, Depth of Discharge (DoD), and C-ratings',
      'Operation & Maintenance: Thermal imaging hot-spot detection, soiling loss calculations, and module cleaning protocols'
    ],
    toolsAndStandards: ['Solar Irradiance Meter (Pyranometer)', 'True-RMS DC Clamp Meter', 'Solar PV Multimeter (1000V DC)', 'MC4 Crimping Tool', 'Thermal Imaging Camera', 'Angle Finder / Inclinometer', 'Insulation Resistance Tester (1000V)', 'MNRE Guidelines', 'IEC 61215 / 61730', 'CEA Regulations'],
    commonFailureModes: [
      'Catastrophic electrical fire caused by improperly crimped or cross-mated generic MC4 connectors under load',
      'Severe string power loss caused by partial shading activating bypass diodes or causing module hot spots',
      'Inverter failure to synchronize with grid displaying "Grid Voltage Out of Range" or "Frequency Fault"',
      'Potential Induced Degradation (PID) degrading panel efficiency due to high negative voltage to ground',
      'Lead-acid battery bank premature death caused by persistent chronic undercharging and sulfation'
    ],
    diagnosticProcedures: [
      'Measure open-circuit voltage (Voc) of each string with a 1000V DC meter before connecting to the inverter',
      'Scan solar array with an infrared thermal camera under bright sunshine (>700 W/m²) to detect localized hot spots',
      'Measure DC string operating current with a DC clamp meter and compare against rated Imp on module nameplate',
      'Conduct insulation resistance testing (megger) between positive/negative conductors and array earth frame',
      'Verify earth electrode resistance of the solar grounding pit using the 3-point fall-of-potential test'
    ],
    safetyAndRegulations: [
      'High-voltage DC hazard: Solar strings generate lethal 600V-1000V DC as soon as exposed to light; cannot be turned off',
      'Never disconnect MC4 connectors or DC switches while current is flowing; DC arcs do not self-extinguish',
      'Work at Height safety: Full-body safety harness anchored to certified lifelines, edge protection, and crawl boards',
      'Anti-islanding protection is statutory: Grid-tied inverters must shut down immediately during grid power outages',
      'Arc-rated personal protective equipment, safety helmet with chin strap, and electrical hazard safety boots'
    ],
    practicalScenarios: [
      {
        situation: 'A solar technician needs to disconnect a string of 18 monocrystalline panels producing 750V DC.',
        bestAction: 'Switch off the inverter DC isolator switch first to eliminate current flow before uncoupling MC4 connectors.',
        incorrectActions: [
          'Yank the MC4 connectors apart by hand while the inverter is feeding 10 Amps to the grid',
          'Cut through both positive and negative DC cables simultaneously with a metal hacksaw',
          'Pour cold water over the solar panels to shut down electricity production'
        ],
        rationale: 'Unmating DC connectors under load strikes an intense, persistent plasma arc capable of severe burns and fires.'
      },
      {
        situation: 'A rooftop 10 kWp solar system produces only 40% of expected daily kWh generation despite cloudless sunny skies.',
        bestAction: 'Inspect the array for localized shading from a newly erected water tank or heavy dust/bird dropping build-up.',
        incorrectActions: [
          'Add 50 extra panels directly to the same inverter without checking capacity limits',
          'Assume the sun has lost intensity and wait for winter season to begin',
          'Paint all the solar panels black with household enamel paint to absorb more heat'
        ],
        rationale: 'Even minor partial shading on one cell in a string forces current through bypass diodes, dropping substantial string power.'
      }
    ]
  },

  'construction-skilled-trades': {
    careerId: 'construction-skilled-trades',
    coreConcepts: [
      'Building materials: Cement grades (OPC 43/53, PPC), fine aggregate (sand), coarse aggregate, and water-cement ratio',
      'Concrete technology: Nominal vs design mixes (M20, M25), workability slump test, and 28-day compressive strength',
      'Reinforced Cement Concrete (RCC): Steel reinforcement bars (Fe 500/550 TMT), clear cover blocks, and bar bending schedules',
      'Masonry construction: English bond vs Flemish bond brickwork, mortar ratios (1:4, 1:6), and plumb line verticality',
      'Formwork and shuttering: Plywood formwork, centering props, striktoff schedules, and release agents',
      'Curing engineering: Ponding, wet burlap covering, curing compounds, and mandatory 7 to 14-day curing duration',
      'Site surveying: Auto-level instrument, leveling staff, bench marks, transfer of datum levels, and theodolites',
      'Plumbing and drainage: PVC/CPVC pipes, traps (P-trap, floor trap), slope gradients (1:50 to 1:100), and pressure testing',
      'Finishing trades: Plastering (12mm/18mm 2-coat), curing, floor tiling, leveling screeds, and waterproofing membranes',
      'Building codes and standards: National Building Code of India (NBC 2016), IS 456 for concrete, and IS 875 for wind loads'
    ],
    toolsAndStandards: ['Slump Cone Test Apparatus', 'Auto-Level / Transit Level', 'Plumb Bob', 'Spirit Level', 'Rebar Cover Blocks', 'Compression Testing Machine (CTM)', 'Trowel & Hawk', 'Water Pressure Test Gauge', 'IS 456:2000', 'IS 10262 (Concrete Mix Design)'],
    commonFailureModes: [
      'Severe concrete honeycombing and structural voids caused by lack of mechanical needle vibrator compaction',
      'Cracking in brick masonry walls caused by unsoaked dry bricks absorbing moisture from fresh mortar',
      'Spalling of concrete and rusting of TMT rebar caused by omission of cement cover blocks before pouring',
      'Plastic shrinkage cracks appearing on concrete roof slabs due to rapid wind drying and delayed curing',
      'Basement water seepage caused by failed cold construction joints or compromised waterproofing membranes'
    ],
    diagnosticProcedures: [
      'Perform on-site slump cone test on ready-mix concrete batch before permitting discharge into pump',
      'Cast 150mm concrete test cubes, cure in water, and crush in a Compression Testing Machine at 7 and 28 days',
      'Check vertical alignment of masonry columns and walls using a heavy calibrated steel plumb bob',
      'Conduct 10-bar hydraulic pressure test on freshly installed concealed CPVC plumbing lines for 24 hours',
      'Check floor screed surface slope and drainage runoff using an aluminum straight-edge and spirit level'
    ],
    safetyAndRegulations: [
      'Work at Height: Full body safety harness with double lanyard attached to an independent anchored lifeline',
      'Scaffolding safety: Tagged scaffolding (green tag), sturdy base plates, toe-boards, and complete guardrails',
      'Mandatory PPE: Hard hat (IS 2925), steel-toe puncture-resistant boots, high-visibility vest, and eye protection',
      'Trench excavation safety: Shoring and sloping for trenches deeper than 1.5 meters to prevent deadly cave-ins',
      'Housekeeping: Immediate removal of protruding nails from dismantled shuttering timber to prevent puncture wounds'
    ],
    practicalScenarios: [
      {
        situation: 'A concrete transit mixer driver offers to add 100 liters of extra water to the drum to make concrete flow easily into slabs.',
        bestAction: 'Refuse extra water addition; excess water drastically reduces concrete 28-day compressive strength and causes cracks.',
        incorrectActions: [
          'Encourage the driver to add 200 liters of water so workers do not have to vibrate the concrete',
          'Add washing soap powder to the concrete to make it slippery without telling the structural engineer',
          'Pour the over-watered concrete anyway and pretend no changes occurred'
        ],
        rationale: 'Increasing the water-cement ratio degrades concrete compressive strength and creates porous, weak concrete prone to corrosion.'
      },
      {
        situation: 'Workers on a commercial building project prepare to work on scaffolding on the 4th floor exterior.',
        bestAction: 'Inspect scaffold for green inspection tag, ensure full guardrails and toe-boards, and anchor safety harnesses.',
        incorrectActions: [
          'Balance on single loose wooden planks laid over rusted oil barrels without guardrails',
          'Tie safety harness ropes around other workers\' waists instead of anchored lifelines',
          'Work during high monsoon gales without hard hats or protective footwear'
        ],
        rationale: 'Falls from heights are the leading cause of construction fatalities; certified scaffolding and fall arrest systems save lives.'
      }
    ]
  },

  'carpentry-woodworking-furniture': {
    careerId: 'carpentry-woodworking-furniture',
    coreConcepts: [
      'Wood species & anatomy: Hardwoods (Teak, Sheesham, Sal) vs Softwoods (Pine), grain direction, and growth rings',
      'Engineered wood products: Commercial plywood, BWR/BWP marine ply, MDF, Particle Board, and blockboard',
      'Wood seasoning: Air seasoning vs kiln drying, Equilibrium Moisture Content (EMC 10-12%), and warp prevention',
      'Traditional joinery: Mortise and tenon, dovetail, lap joints, bridle joints, dowel joints, and pocket hole screws',
      'Hand tools: Hand planes (Jack, smoothing, block), chisels, backsaws, marking gauges, and Japanese pull saws',
      'Power tools: Table saw, miter saw, plunge router, random orbital sander, and cordless impact drivers',
      'Wood adhesives: Polyvinyl Acetate (PVA / Fevicol), polyurethane glue, epoxy, and clamping pressure dynamics',
      'Laminates & Veneers: 1mm decorative laminates, wood veneers, contact adhesive application, and edge banding',
      'Abrasives & Sanding: Sandpaper grits sequence (80 -> 120 -> 180 -> 240 -> 320) and sanding with the grain',
      'Wood finishing: Sanding sealer, polyurethane (PU), Danish oil, melamine, nitrocellulose lacquer, and wax'
    ],
    toolsAndStandards: ['Digital Moisture Meter', 'Combination Square', 'Marking Knife', 'Bench Chisels (Bevel Edge)', 'Block Plane', 'Random Orbital Sander', 'Bar Clamps & Pipe Clamps', 'Router with Flush Trim Bit', 'Table Saw Push Stick', 'IS 303 (Plywood)'],
    commonFailureModes: [
      'Solid wood table top warping, cupping, or splitting due to assembling wood with moisture content above 18%',
      'Table saw kickback hurling workpieces violently backward when ripping without a riving knife and fence',
      'Laminate bubbling and debonding caused by inadequate solvent flash-off time when applying contact adhesive',
      'Tearout and splintering on expensive veneered plywood caused by cutting with a dull blade or improper face orientation',
      'Glue joint failure under load caused by dry clamping without adequate adhesive spread or clamping pressure'
    ],
    diagnosticProcedures: [
      'Measure core moisture content across timber planks using a calibrated pin-type moisture meter',
      'Check frame assemblies for squareness by measuring and comparing diagonal corner-to-corner dimensions',
      'Inspect joint mating surfaces using a precision steel straight-edge to detect light gaps or twist (wind)',
      'Test router bit sharpness and bearing smoothness before making critical edge-profiling cuts',
      'Examine sanded surfaces under low-angle raking light to spot hidden swirl marks or cross-grain scratches'
    ],
    safetyAndRegulations: [
      'Table saw safety: Always install the riving knife, blade guard, and use a push stick for cuts under 150mm wide',
      'Respiratory safety: High-efficiency dust mask (N95 or P100) and dust extraction; fine wood dust is a carcinogen',
      'Eye and ear protection: Impact-resistant safety glasses and hearing protection during power tool operation',
      'Never wear gloves near spinning saw blades, jointers, or router bits where fabric can snag and pull hands in',
      'Safe storage of solvent-soaked finishing rags in airtight metal containers to prevent spontaneous combustion'
    ],
    practicalScenarios: [
      {
        situation: 'A woodworker is ripping a 2-meter narrow teak board on a table saw and the blade begins to pinch.',
        bestAction: 'Maintain firm forward pressure with a push stick against the fence; ensure the riving knife prevents pinch kickback.',
        incorrectActions: [
          'Reach behind the spinning blade with bare hands to pull the pinched board through',
          'Remove the riving knife and blade guard so the blade can cut freely without restriction',
          'Lean body directly in line with the spinning blade and force the board through sideways'
        ],
        rationale: 'Table saw kickback occurs when wood binds on the rising rear teeth; riving knives keep the kerf open to prevent kickback.'
      },
      {
        situation: 'A dining chair joint built with PVA glue will not fit tightly, leaving a 2mm gap inside the mortise.',
        bestAction: 'Re-trim the tenon shoulders using a sharp chisel to achieve a flush, gap-free wood-to-wood mating fit.',
        incorrectActions: [
          'Fill the 2mm gap with excess PVA glue assuming wood glue acts as a structural gap-filler',
          'Hammer the tenon violently with a 5kg sledgehammer until the wood crushes into place',
          'Drive an un-countersunk common wire nail through the outside face of the finished chair leg'
        ],
        rationale: 'PVA wood glue requires close wood-to-wood contact under clamp pressure; it shrinks and lacks structural strength across gaps.'
      }
    ]
  },

  'digital-marketing-entrepreneurship': {
    careerId: 'digital-marketing-entrepreneurship',
    coreConcepts: [
      'Search Engine Optimization (SEO): On-page meta tags, crawling, indexing, search intent, and backlink authority',
      'Search Engine Marketing (SEM): Google Ads auction, Quality Score, Cost-Per-Click (CPC), and keyword match types',
      'Social Media Marketing (SMM): Organic engagement algorithms, paid social targeting, lookalike audiences, and creative fatigue',
      'Content Marketing: Inbound marketing funnels (TOFU, MOFU, BOFU), blogs, lead magnets, and customer journey mapping',
      'Email Marketing: Open rate, Click-Through Rate (CTR), bounce rate, list hygiene, and automated drip sequences',
      'Web Analytics: Google Analytics 4 (GA4) event-based model, conversions, UTM parameter tracking, and attribution models',
      'Unit Economics: Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), LTV:CAC ratio (>3:1), and churn rate',
      'Entrepreneurship & Finance: Burn rate, runway calculation, gross margin, working capital, and Break-Even Point (BEP)',
      'Legal & Compliance: GST registration, MSME Udyam certificate, trademark protection, and consumer protection laws',
      'Growth hacking: A/B split testing (hypothesis, control vs variant, statistical significance), and viral loops'
    ],
    toolsAndStandards: ['Google Analytics 4', 'Google Search Console', 'Meta Ads Manager', 'SEMrush / Ahrefs', 'Mailchimp / Brevo', 'Canva', 'Shopify / WooCommerce', 'Google Tag Manager', 'MSME Udyam Portal', 'GST Portal'],
    commonFailureModes: [
      'Burning entire ad budget on Meta/Google Ads without setting conversion tracking pixels or UTM parameters',
      'Customer Acquisition Cost (CAC) exceeding Customer Lifetime Value (LTV), causing guaranteed business insolvency',
      'Buying spam email lists resulting in domain blacklist, 90% spam folder placement, and account suspension',
      'Targeting overly broad audiences on paid campaigns resulting in low relevance scores and sky-high CPCs',
      'Running out of cash runway because founder tracked vanity revenue metrics rather than actual cash collections'
    ],
    diagnosticProcedures: [
      'Verify conversion event firing using Google Tag Assistant and Meta Pixel Helper browser extensions',
      'Audit website crawl errors, coverage issues, and XML sitemaps inside Google Search Console',
      'Calculate monthly cash burn rate and runway: Cash Reserves ÷ Net Monthly Operating Cash Loss',
      'Analyze landing page bounce rate and heatmaps (Hotjar) to identify user drop-off points before checkout',
      'Perform A/B test statistical significance check before declaring a marketing variant successful'
    ],
    safetyAndRegulations: [
      'Strict adherence to advertising ethics: Never make deceptive claims or false discount countdown timers',
      'Data privacy regulations: Obtain explicit consent for email marketing under Indian DPDP Act 2023',
      'Trademark and copyright clearance for images, music, and brand names before launching public campaigns',
      'GST tax compliance: Issue statutory tax invoices and file monthly GSTR-1 and GSTR-3B returns on time',
      'Secure customer transaction data: Comply with RBI guidelines on tokenization and PCI-DSS compliance'
    ],
    practicalScenarios: [
      {
        situation: 'An e-commerce startup spends 50,000 INR on Facebook ads and acquires 20 customers whose average lifetime spend is 1,500 INR.',
        bestAction: 'Pause the campaign immediately; CAC is 2,500 INR while LTV is only 1,500 INR, losing 1,000 INR per acquired customer.',
        incorrectActions: [
          'Double the ad spend to 100,000 INR hoping scale will magically make negative unit economics profitable',
          'Ignore the customer acquisition cost and celebrate having 20 new customers',
          'Borrow high-interest money to continue funding the exact same marketing campaign'
        ],
        rationale: 'If CAC > LTV, scaling sales accelerates bankruptcy; marketing must be paused until conversion rate or margin improves.'
      },
      {
        situation: 'A business owner notices their website traffic dropped by 60% overnight following a major Google core algorithm update.',
        bestAction: 'Inspect Google Search Console for manual actions, analyze affected landing pages, and audit content quality against E-E-A-T.',
        incorrectActions: [
          'Buy 10,000 cheap backlinks from automated link farms to force rankings back up',
          'Delete the entire website domain and start over under a completely different business name',
          'Copy-paste articles directly from competitor websites without attribution'
        ],
        rationale: 'Algorithm updates penalize thin or unhelpful content; recovering requires diagnosing search intent and improving original value.'
      }
    ]
  },

  'healthcare-assistance-community-health': {
    careerId: 'healthcare-assistance-community-health',
    coreConcepts: [
      'Vital signs measurement: Body temperature, radial pulse, respiratory rate, blood pressure, and oxygen saturation (SpO2)',
      'Infection prevention & control: Hand hygiene (WHO 5 Moments), standard precautions, and aseptic non-touch technique (ANTT)',
      'Biomedical Waste Management (BMW Rules 2016): Color-coded segregation (Yellow, Red, White translucent, Blue)',
      'Patient safety & mobility: Safe patient transfers, ergonomics, bed sore (pressure ulcer) prevention, and position turning every 2h',
      'Emergency first aid: Cardiopulmonary Resuscitation (CPR), Basic Life Support (BLS 30:2 ratio, 100-120 bpm), and Heimlich maneuver',
      'Medication administration assistance: The 5 Rights (Right Patient, Right Drug, Right Dose, Right Route, Right Time)',
      'Community health & epidemiology: Primary Health Centres (PHC), ASHA workers, ANM role, and disease surveillance',
      'Maternal & child health: Antenatal care (ANC) checkups, institutional delivery, immunization schedule (UIP), and ORS therapy',
      'Chronic disease management: Hypertension monitoring, glucometer blood glucose testing, and tuberculosis DOTS adherence',
      'Medical ethics & communication: Patient dignity, confidentiality, informed consent, and compassionate bedside care'
    ],
    toolsAndStandards: ['Sphygmomanometer & Stethoscope', 'Pulse Oximeter', 'Digital Clinical Thermometer', 'Blood Glucose Meter (Glucometer)', 'Sharps Disposal Container', 'CPR Training Manikin', 'Weighing Scale & Stadiometer', 'Biomedical Waste Rules 2016', 'WHO Guidelines', 'National Health Mission (NHM) Protocols'],
    commonFailureModes: [
      'Disposing contaminated needles or sharps into regular yellow or black bags, causing needle-stick injuries',
      'Using the wrong size blood pressure cuff (too small gives falsely elevated BP readings; too large gives falsely low)',
      'Failing to turn a bedridden patient every 2 hours, resulting in painful Stage 3/4 decubitus pressure sores',
      'Administering CPR chest compressions too shallow (<5 cm) or with incomplete chest recoil, failing to circulate blood',
      'Breaching patient confidentiality by sharing identifiable medical diagnoses on personal social media'
    ],
    diagnosticProcedures: [
      'Measure manual blood pressure listening for Korotkoff sounds (Phase I systolic, Phase V diastolic)',
      'Check capillary refill time on patient fingernails (<2 seconds indicates adequate peripheral perfusion)',
      'Assess bedridden patients for pressure sore risk using the standardized Braden Scale or Norton Scale',
      'Screen fasting and postprandial capillary blood glucose levels using calibrated test strips',
      'Examine dehydration signs in pediatric diarrhea: Sunken fontanelle, skin pinch turgor, and tear production'
    ],
    safetyAndRegulations: [
      'Never recap used syringe needles by hand; use the single-handed scoop method or drop immediately into a sharps box',
      'Color coding: Yellow (anatomical/dressings), Red (infected plastics), White (sharps/needles), Blue (glassware/vials)',
      'Personal Protective Equipment: Gloves, medical mask, face shield, and fluid-resistant gown when exposure risk exists',
      'Immediate post-exposure prophylaxis (PEP) protocol within 72 hours following an accidental needle-stick injury',
      'Strict adherence to patient rights and reporting of notifiable infectious diseases to public health authorities'
    ],
    practicalScenarios: [
      {
        situation: 'An adult collapses in a clinic waiting area, becomes unresponsive, and is not breathing normally.',
        bestAction: 'Call for emergency help, check carotid pulse for no more than 10 seconds, and begin high-quality chest compressions immediately.',
        incorrectActions: [
          'Pour hot tea or water into the unconscious patient\'s mouth to wake them up',
          'Wait 30 minutes to see if the patient wakes up on their own without disturbing them',
          'Slap the patient\'s face repeatedly while shaking their shoulders violently'
        ],
        rationale: 'In cardiac arrest, immediate uninterrupted chest compressions (100-120/min at 5-6 cm depth) maintain vital brain perfusion.'
      },
      {
        situation: 'A healthcare assistant finishes giving an intramuscular injection with a disposable syringe.',
        bestAction: 'Discard the unrecapped needle and syringe directly into the puncture-proof white translucent sharps container.',
        incorrectActions: [
          'Two-handedly recap the sharp needle risking a slip and puncture injury to the fingers',
          'Toss the uncapped needle loosely into a regular black household garbage can',
          'Wash the disposable needle with tap water so it can be reused on another patient'
        ],
        rationale: 'Recapping needles by hand is the primary cause of accidental needle-stick injuries and transmission of HIV/Hepatitis B.'
      }
    ]
  }
}
