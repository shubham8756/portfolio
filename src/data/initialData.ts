import { PortfolioProfile, Project, Skill, WorkExperience, Education, Testimonial, Certification, Award } from '../types';

export const initialProfile: PortfolioProfile = {
  name: "Shubham Pandey",
  title: "Software Engineer (Site Reliability Engineer) | AWS & GCP | Kubernetes & DevOps",
  subtitle: "Specializing in Site Reliability Engineering, AWS & GCP Multi-Cloud, Kubernetes, Performance Engineering, and CI/CD Automation.",
  bio: "Currently working as a Software Engineer (SRE) at Xoriant with 3+ years of experience in cloud infrastructure, reliability engineering, and DevOps automation across AWS and GCP environments. Proven track record of managing high-traffic Apple Online Store production systems, improving availability to 99.95%, reducing MTTR by 30%, and optimizing deployment times from 15 to 6 minutes through Kubernetes, Terraform IaC, Prometheus/Grafana observability, and automated CI/CD pipelines.",
  location: "Bengaluru, Karnataka, India",
  avatarUrl: "/Shubham.png",
  availability: "Available for Hire",
  socialLinks: [
    { platform: "github", url: "https://github.com/shubham8756/", label: "GitHub" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/shubham-pandey-dev/", label: "LinkedIn" },
    { platform: "email", url: "mailto:shubhampandey8756@gmail.com", label: "Email" },
  ],
  stats: {
    yearsExperience: 3,
    projectsCompleted: 20,
    githubContributions: 1450,
    happyClients: 8,
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Apple Online Store Performance Engineering & Reliability",
    tagline: "High-concurrency load testing & reliability management for millions of users during product launches",
    description: "Managed system reliability, SLI/SLO tracking, and capacity planning for Apple Online Store systems during major product launches.",
    longDescription: "Led performance testing for 500+ backend services using Apache JMeter. Simulated high-traffic scenarios to identify bottlenecks across applications, databases, and AWS infrastructure, ensuring 99.95% system availability and zero downtime during peak releases.",
    category: "Performance Engineering",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["AWS", "Apache JMeter", "Kubernetes", "Splunk", "Capacity Planning", "Incident Management"],
    featured: true,
    demoUrl: "https://github.com/shubham8756/",
    githubUrl: "https://github.com/shubham8756/",
    metrics: [
      { label: "Availability", value: "99.95%" },
      { label: "Backend Services", value: "500+" },
      { label: "MTTR Reduction", value: "30%" }
    ]
  },
  {
    id: "proj-2",
    title: "Kubernetes Auto Healing & Container Orchestration",
    tagline: "EKS & GKE cluster auto-scaling, ingress management, and cluster fault debugging",
    description: "Deployed containerized workloads on Kubernetes (EKS/GKE) with Horizontal Pod Autoscaling (HPA) and zero-downtime releases.",
    longDescription: "Architected resilient Kubernetes cluster environments with HPA and custom resource limits. Reduced production incidents by rapidly diagnosing CrashLoopBackOff and OOMKilled events, managing ingress controllers, and troubleshooting TCP/IP and DNS routing.",
    category: "Containers & Orchestration",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
    tags: ["Kubernetes (EKS/GKE)", "Docker", "HPA", "Linux", "Shell Scripting", "Ingress"],
    featured: true,
    demoUrl: "https://github.com/shubham8756/",
    githubUrl: "https://github.com/shubham8756/",
    metrics: [
      { label: "Deploy Failures", value: "-25%" },
      { label: "Workload Auto-Scale", value: "100%" }
    ]
  },
  {
    id: "proj-3",
    title: "AWS & GCP Infrastructure Automation Platform",
    tagline: "Infrastructure as Code (IaC) with Terraform, CloudFormation, and Ansible",
    description: "Built scalable multi-cloud infrastructure (EC2, EKS, VPC, S3, IAM) across AWS and GCP using Terraform & CloudFormation.",
    longDescription: "Automated end-to-end cloud environment provisioning and configuration management with Ansible, reducing manual operational tasks by 35% and enforcing security best practices across cloud environments.",
    category: "Cloud & Infrastructure",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["AWS", "GCP", "Terraform", "CloudFormation", "Ansible", "Python"],
    featured: true,
    demoUrl: "https://github.com/shubham8756/",
    githubUrl: "https://github.com/shubham8756/",
    metrics: [
      { label: "Manual Effort Cut", value: "35%" },
      { label: "IaC Coverage", value: "100%" }
    ]
  },
  {
    id: "proj-4",
    title: "Production Observability & SLA Monitoring Hub",
    tagline: "Proactive alert noise reduction & telemetry with Prometheus, Grafana, Splunk & CloudWatch",
    description: "Implemented a full-stack observability suite establishing SLIs, SLOs, and error budgets for microservices.",
    longDescription: "Engineered unified dashboards for latency, throughput, error rates, and infrastructure health. Reduced MTTR by 30% and alert noise by 40%, empowering on-call SRE teams with actionable alerts.",
    category: "Observability",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tags: ["Prometheus", "Grafana", "Splunk", "CloudWatch", "SLI/SLO", "Error Budget"],
    featured: false,
    demoUrl: "https://github.com/shubham8756/",
    githubUrl: "https://github.com/shubham8756/",
    metrics: [
      { label: "Alert Noise Cut", value: "40%" },
      { label: "MTTR Reduction", value: "30%" }
    ]
  },
  {
    id: "proj-5",
    title: "Zero-Downtime CI/CD Automation Pipeline",
    tagline: "Automated Jenkins & GitHub Actions workflows with Blue-Green deployments",
    description: "Optimized deployment pipelines with Jenkins, GitHub Actions, Maven, and Ansible for zero-downtime releases.",
    longDescription: "Accelerated release velocity by cutting deployment time from 15 minutes down to 6 minutes. Enforced automated health checks, rollback triggers, and blue-green deployment strategies to ensure zero customer impact.",
    category: "CI/CD & Automation",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    tags: ["Jenkins", "GitHub Actions", "Ansible", "Maven", "Blue-Green Deployment", "Python"],
    featured: false,
    demoUrl: "https://github.com/shubham8756/",
    githubUrl: "https://github.com/shubham8756/",
    metrics: [
      { label: "Deploy Time", value: "15m -> 6m" },
      { label: "Pipeline Errors", value: "-25%" }
    ]
  }
];

export const initialSkills: Skill[] = [
  // Cloud
  { id: "sk-1", name: "AWS (EKS, EC2, VPC, S3, IAM, SQS/SNS)", category: "Cloud", level: 95, isTopSkill: true },
  { id: "sk-2", name: "Google Cloud Platform (GCP)", category: "Cloud", level: 90, isTopSkill: true },

  // Containers
  { id: "sk-3", name: "Kubernetes (EKS / GKE)", category: "Containers", level: 95, isTopSkill: true },
  { id: "sk-4", name: "Docker & Containerization", category: "Containers", level: 92, isTopSkill: true },

  // Programming
  { id: "sk-5", name: "Python", category: "Programming", level: 88, isTopSkill: true },
  { id: "sk-6", name: "Java / Core Java", category: "Programming", level: 85, isTopSkill: false },
  { id: "sk-7", name: "Shell Scripting (Bash)", category: "Programming", level: 92, isTopSkill: true },
  { id: "sk-8", name: "SQL", category: "Programming", level: 85, isTopSkill: false },

  // CI/CD
  { id: "sk-9", name: "Jenkins & Maven Pipelines", category: "CI/CD", level: 92, isTopSkill: true },
  { id: "sk-10", name: "GitHub Actions", category: "CI/CD", level: 90, isTopSkill: true },
  { id: "sk-11", name: "Ansible", category: "CI/CD", level: 88, isTopSkill: false },

  // Observability
  { id: "sk-12", name: "Prometheus & Grafana", category: "Observability", level: 94, isTopSkill: true },
  { id: "sk-13", name: "Splunk & AWS CloudWatch", category: "Observability", level: 92, isTopSkill: true },

  // Performance Engineering
  { id: "sk-14", name: "Apache JMeter", category: "Performance Engineering", level: 95, isTopSkill: true },
  { id: "sk-15", name: "Load, Stress & Soak Testing", category: "Performance Engineering", level: 92, isTopSkill: false },
  { id: "sk-16", name: "Capacity Planning & Bottleneck Analysis", category: "Performance Engineering", level: 90, isTopSkill: false },

  // SRE & Operations
  { id: "sk-17", name: "Incident Management & RCA", category: "SRE", level: 94, isTopSkill: true },
  { id: "sk-18", name: "SLI / SLO & Error Budgets", category: "SRE", level: 92, isTopSkill: true },
  { id: "sk-19", name: "Blue-Green Deployment & Auto Scaling", category: "SRE", level: 90, isTopSkill: false },

  // Automation & Infrastructure
  { id: "sk-20", name: "Terraform & CloudFormation", category: "Automation", level: 94, isTopSkill: true },
  { id: "sk-21", name: "Apache Kafka", category: "Automation", level: 85, isTopSkill: false },
  { id: "sk-22", name: "Git & Version Control", category: "Automation", level: 95, isTopSkill: false },
  { id: "sk-23", name: "Linux Administration & Debugging", category: "Automation", level: 94, isTopSkill: false }
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    title: "Google Cloud Certified: Associate Cloud Engineer",
    issuer: "Google Cloud Platform (GCP)",
    issueDate: "Verified",
    category: "Cloud"
  },
  {
    id: "cert-2",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Verified",
    category: "Cloud"
  },
  {
    id: "cert-3",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Verified",
    category: "Cloud & AI"
  },
  {
    id: "cert-4",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "Verified",
    category: "Cloud"
  },
  {
    id: "cert-5",
    title: "Udemy Labs - Online Kubernetes Lab for Beginners - Hands On",
    issuer: "Udemy Labs",
    issueDate: "Verified",
    category: "Containers"
  },
  {
    id: "cert-6",
    title: "Core Java Certification",
    issuer: "Core Java",
    issueDate: "Verified",
    category: "Programming"
  },
  {
    id: "cert-7",
    title: "Machine Learning with Python - Level 1",
    issuer: "Python Machine Learning",
    issueDate: "Verified",
    category: "Programming & ML"
  }
];

export const initialAwards: Award[] = [
  {
    id: "award-1",
    title: "Apple Online Store Launch Recognition Award",
    issuer: "Apple COE / Wipro",
    date: "Recognition Award",
    description: "Honored for operational excellence, high-concurrency performance engineering, and platform stability during high-traffic Apple product online store launches."
  }
];

export const initialExperience: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Software Engineer (Site Reliability Engineer)",
    company: "Xoriant",
    period: "May 2026 - Present",
    location: "Bengaluru, India",
    description: "Driving cloud infrastructure scaling, reliability engineering, and DevOps automation across AWS and GCP environments.",
    highlights: [
      "Architecting scalable and resilient cloud infrastructure across AWS and GCP using Terraform and CloudFormation.",
      "Delivering zero-downtime releases for containerized workloads on AWS EKS with automated Horizontal Pod Autoscaling (HPA).",
      "Building advanced observability with Prometheus, Grafana, Splunk, and CloudWatch, reducing MTTR by 30%.",
      "Automating operational workflows with Python, Shell scripting, and Ansible to cut manual effort by 35%."
    ],
    techStack: ["AWS", "GCP", "Kubernetes", "EKS", "Docker", "Terraform", "Prometheus", "Grafana", "Splunk", "Python", "Shell"],
    current: true
  },
  {
    id: "exp-2",
    role: "Project Engineer - Apple COE (Site Reliability Engineering & Cloud)",
    company: "Wipro",
    period: "March 2023 - April 2026 (3 years 2 months)",
    location: "Bengaluru, India",
    description: "Managed site reliability engineering, performance testing, and AWS cloud infrastructure for the Apple Online Store handling millions of users.",
    highlights: [
      "Managed reliability for high-traffic Apple Online Store systems handling millions of users during major product launch events.",
      "Defined SLIs/SLOs and error budgets to balance platform reliability with rapid release velocity.",
      "Built scalable AWS infrastructure (EC2, EKS, VPC, S3, IAM, SQS/SNS) using Terraform and CloudFormation.",
      "Led performance engineering and load testing for 500+ backend services using Apache JMeter.",
      "Improved platform availability to 99.95%, reduced MTTR by 30%, and cut alert noise by 40%.",
      "Optimized CI/CD pipelines (Jenkins, GitHub Actions), reducing deployment time from 15 to 6 minutes and failure rates by 25%.",
      "Troubleshot complex Kubernetes production issues including CrashLoopBackOff, OOMKilled, Ingress, and TCP/IP/DNS routing bottlenecks."
    ],
    techStack: ["AWS", "EKS", "Kubernetes", "Apache JMeter", "Splunk", "Prometheus", "Grafana", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Python", "Shell"]
  },
  {
    id: "exp-3",
    role: "Operations Engineer",
    company: "PW (PhysicsWallah)",
    period: "February 2023 - March 2023",
    location: "India",
    description: "Supported production platform operations, incident triage, and monitoring workflows.",
    highlights: [
      "Monitored production infrastructure metrics and supported quick incident recovery.",
      "Assisted in log analysis and system health checks during high usage periods."
    ],
    techStack: ["Linux", "AWS", "Monitoring", "Shell Scripting"]
  },
  {
    id: "exp-4",
    role: "AWS ReStart - Cloud Practitioner Trainee",
    company: "Tata STRIVE",
    period: "September 2022 - January 2023",
    location: "Gurugram, India",
    description: "Comprehensive hands-on training on AWS Cloud concepts, architecture, security, and cloud automation.",
    highlights: [
      "Mastered core AWS infrastructure services, IAM security policies, and VPC networking.",
      "Built automated cloud labs and foundational infrastructure scripts."
    ],
    techStack: ["AWS", "Cloud Practitioner", "Linux", "Networking"]
  },
  {
    id: "exp-5",
    role: "Java Full Stack Developer Trainee",
    company: "StackRoute Learning",
    period: "May 2022 - August 2022",
    location: "Uttar Pradesh, India",
    description: "Full-stack development training focusing on Core Java, SQL databases, and web services.",
    highlights: [
      "Developed web application modules using Java, SQL, and RESTful web services.",
      "Applied object-oriented programming principles and version control with Git."
    ],
    techStack: ["Java", "SQL", "Git", "REST APIs"]
  },
  {
    id: "exp-6",
    role: "System Engineer Intern",
    company: "Infosys",
    period: "February 2022 - May 2022",
    location: "Mysore, Karnataka, India",
    description: "System engineering internship focused on software development fundamentals, enterprise IT workflows, and database querying.",
    highlights: [
      "Gained hands-on experience in enterprise software engineering and technical problem solving.",
      "Created backend scripts and executed system validation tests."
    ],
    techStack: ["Java", "SQL", "Linux", "Git"]
  },
  {
    id: "exp-7",
    role: "Software Engineer Intern",
    company: "Nucleus Software",
    period: "January 2022 - February 2022",
    location: "India",
    description: "Software development and engineering practice on banking and financial technology solutions.",
    highlights: [
      "Worked on core software modules and technical documentation."
    ],
    techStack: ["Java", "SQL", "Software Testing"]
  }
];

export const initialEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech) in Information Technology",
    institution: "United College Of Engineering and Research",
    period: "July 2018 - June 2022",
    description: "Specialized in Information Technology, Distributed Systems, Database Management Systems, Computer Networks, and Operating Systems."
  },
  {
    id: "edu-2",
    degree: "Intermediate (Class XII) - PCM",
    institution: "St. Francis School",
    period: "April 2017 - May 2018",
    description: "Physics, Chemistry, and Mathematics (PCM)."
  },
  {
    id: "edu-3",
    degree: "High School (Class X) - Science",
    institution: "St. Francis School",
    period: "April 2015 - May 2016",
    description: "General Science & Mathematics."
  }
];

export const initialTestimonials: Testimonial[] = [];

