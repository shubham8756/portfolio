import { PortfolioProfile, Project, Skill, WorkExperience, Education, Testimonial, Certification, Award } from '../types';

export const initialProfile: PortfolioProfile = {
  name: "Shubham Pandey",
  title: "Site Reliability Engineer | Cloud Infrastructure & Automation Specialist",
  subtitle: "Specializing in Kubernetes, Multi-Cloud (AWS & GCP), Terraform IaC, Observability, and Zero-Downtime CI/CD Automation.",
  bio: "Passionate Site Reliability Engineer with 5+ years of experience architecting resilient multi-cloud infrastructures, managing high-throughput Kubernetes clusters, and building automated GitOps CI/CD pipelines. Proven track record in scaling mission-critical cloud applications, optimizing infrastructure costs, reducing MTTR with Prometheus/Datadog, and earning Apple Store launch awards.",
  location: "Bengaluru, India & Remote",
  // Note: For custom images on Vercel or local Vite, place your Shubham.png image in the /public folder (e.g., /public/Shubham.png)
  // and reference it as "/Shubham.png".
  avatarUrl: "/Shubham.png",
  availability: "Available for Hire",
  socialLinks: [
    { platform: "github", url: "https://github.com/shubham8756/", label: "GitHub" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/shubham-pandey-dev/", label: "LinkedIn" },
    { platform: "email", url: "mailto:shubhampandey8756@gmail.com", label: "Email" },
    { platform: "twitter", url: "https://x.com", label: "X / Twitter" },
  ],
  stats: {
    yearsExperience: 5,
    projectsCompleted: 35,
    githubContributions: 1850,
    happyClients: 15,
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "GitOps Multi-Region EKS Automation Engine",
    tagline: "High-availability Kubernetes deployment engine with ArgoCD & Terraform",
    description: "Architected a self-healing multi-region EKS cluster environment with GitOps workflows, automated failover capabilities, and zero-downtime cluster upgrades.",
    longDescription: "Designed to support 200+ microservices using Terraform IaC, ArgoCD, and Helm. Reduced deployment friction across environments and achieved 99.99% uptime with automated canary rollouts via Istio service mesh.",
    category: "Containers & Orchestration",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
    tags: ["Kubernetes", "AWS EKS", "ArgoCD", "Terraform", "Helm", "Istio"],
    featured: true,
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Deploy Time", value: "-75%" },
      { label: "Cluster Failover", value: "< 45s" }
    ]
  },
  {
    id: "proj-2",
    title: "FinOps Cloud Cost Optimization Framework",
    tagline: "Automated AWS & GCP resource auto-scaling & spot instance orchestration",
    description: "Engineered an automated FinOps pipeline using Karpenter, AWS Spot instances, and custom Python serverless scripts to eliminate idle compute footprint.",
    longDescription: "Integrated automated right-sizing alerts and automated shutdown triggers for non-prod environments. Saved over $120,000 annually while maintaining strict performance thresholds.",
    category: "Cloud & Infrastructure",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["AWS", "GCP", "Karpenter", "Terraform", "Python", "FinOps"],
    featured: true,
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Annual Savings", value: "$120k/yr" },
      { label: "Idle Waste Reduced", value: "42%" }
    ]
  },
  {
    id: "proj-3",
    title: "Unified Cloud Observability & SLA Monitoring Hub",
    tagline: "Centralized telemetry, distributed tracing & proactive incident response system",
    description: "Implemented a full-stack observability platform combining Datadog, Prometheus, Grafana, and OpenTelemetry across distributed microservices.",
    longDescription: "Established Service Level Indicators (SLIs) and Service Level Objectives (SLOs) with automated PagerDuty routing, cutting mean time to resolution (MTTR) by 45%.",
    category: "Observability",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tags: ["Datadog", "Prometheus", "Grafana", "OpenTelemetry", "PagerDuty"],
    featured: true,
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    metrics: [
      { label: "MTTR Reduction", value: "-45%" },
      { label: "Alert Noise", value: "-60%" }
    ]
  },
  {
    id: "proj-4",
    title: "Apple Online Store Launch Infrastructure & High Concurrency Architecture",
    tagline: "Resilient infrastructure provisioning and CDN tuning for high peak traffic events",
    description: "Provisioned and tuned peak-capacity infrastructure, CDN caching rules, and load balancers during major Apple Online Store releases, earning official launch awards.",
    longDescription: "Engineered strict load testing models with Locust and k6, handling traffic spikes over 10M requests/minute without performance degradation or dropped sessions.",
    category: "Site Reliability",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["AWS", "Akamai CDN", "Kubernetes", "k6 Load Test", "Terraform"],
    featured: false,
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Peak Capacity", value: "10M RPM" },
      { label: "Downtime", value: "0 seconds" }
    ]
  },
  {
    id: "proj-5",
    title: "Zero-Downtime Blue/Green CI/CD Pipeline",
    tagline: "Automated GitHub Actions pipeline with automated security scanning & canary deployment",
    description: "Built modular CI/CD workflows using GitHub Actions, Docker, SonarQube, and Argo Rollouts for automated testing, container scanning, and zero-downtime release.",
    longDescription: "Automated vulnerability scanning with Trivy and Snyk, enforcing strict compliance policies prior to production registry pushes.",
    category: "DevOps & CI/CD",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    tags: ["GitHub Actions", "Docker", "Trivy", "Argo Rollouts", "Go"],
    featured: false,
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  }
];

export const initialSkills: Skill[] = [
  // Containers & Orchestration
  { id: "sk-1", name: "Kubernetes (EKS & GKE)", category: "Containers & Orchestration", level: 96, isTopSkill: true },
  { id: "sk-2", name: "Docker & Container Security", category: "Containers & Orchestration", level: 94, isTopSkill: true },
  { id: "sk-3", name: "Helm & Kustomize", category: "Containers & Orchestration", level: 90, isTopSkill: true },
  { id: "sk-4", name: "ArgoCD & GitOps", category: "Containers & Orchestration", level: 92, isTopSkill: true },
  { id: "sk-5", name: "Istio Service Mesh", category: "Containers & Orchestration", level: 85, isTopSkill: false },

  // Cloud & Infrastructure
  { id: "sk-6", name: "AWS (EKS, EC2, S3, IAM, VPC)", category: "Cloud & Infrastructure", level: 95, isTopSkill: true },
  { id: "sk-7", name: "GCP (GKE, Cloud Run, IAM)", category: "Cloud & Infrastructure", level: 90, isTopSkill: true },
  { id: "sk-8", name: "Terraform & CloudFormation", category: "Cloud & Infrastructure", level: 95, isTopSkill: true },
  { id: "sk-9", name: "Azure Basics & Hybrid Cloud", category: "Cloud & Infrastructure", level: 80, isTopSkill: false },

  // Observability & Monitoring
  { id: "sk-10", name: "Datadog & APM Tracing", category: "Observability & Monitoring", level: 94, isTopSkill: true },
  { id: "sk-11", name: "Prometheus & Grafana", category: "Observability & Monitoring", level: 92, isTopSkill: true },
  { id: "sk-12", name: "OpenTelemetry & ELK Stack", category: "Observability & Monitoring", level: 88, isTopSkill: false },
  { id: "sk-13", name: "PagerDuty & SLO/SLI Setup", category: "Observability & Monitoring", level: 90, isTopSkill: false },

  // DevOps & CI/CD
  { id: "sk-14", name: "GitHub Actions & GitLab CI", category: "DevOps & CI/CD", level: 95, isTopSkill: true },
  { id: "sk-15", name: "Jenkins & Argo Rollouts", category: "DevOps & CI/CD", level: 88, isTopSkill: false },

  // Languages & Security
  { id: "sk-16", name: "Python & Automation Scripts", category: "Languages & Security", level: 88, isTopSkill: true },
  { id: "sk-17", name: "Bash / Shell Scripting", category: "Languages & Security", level: 92, isTopSkill: true },
  { id: "sk-18", name: "Go (Golang)", category: "Languages & Security", level: 82, isTopSkill: false },
  { id: "sk-19", name: "HashiCorp Vault & Secret Manager", category: "Languages & Security", level: 86, isTopSkill: false }
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Verified Certification",
    category: "Cloud"
  },
  {
    id: "cert-2",
    title: "Google Cloud Certified Professional Cloud Architect",
    issuer: "Google Cloud (GCP)",
    issueDate: "Verified Certification",
    category: "Cloud"
  },
  {
    id: "cert-3",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    issueDate: "Verified Certification",
    category: "Kubernetes"
  },
  {
    id: "cert-4",
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    issueDate: "Verified Certification",
    category: "Infrastructure as Code"
  },
  {
    id: "cert-5",
    title: "GitHub Certified Developer & Copilot Specialist",
    issuer: "GitHub",
    issueDate: "Verified Certification",
    category: "DevOps & AI"
  }
];

export const initialAwards: Award[] = [
  {
    id: "award-1",
    title: "Apple Online Store Launch Recognition Award",
    issuer: "Apple e-Commerce Operations",
    date: "Special Recognition",
    description: "Awarded for exceptional site reliability performance, continuous uptime, and zero-latency CDN orchestration during major Apple product online store launch events."
  },
  {
    id: "award-2",
    title: "SRE Excellence Award",
    issuer: "Engineering Leadership",
    date: "Annual Honor",
    description: "Recognized for driving 99.99% availability SLA, reducing MTTR by 45%, and architecting zero-downtime microservice failovers."
  }
];

export const initialExperience: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Senior Site Reliability Engineer",
    company: "Cloud & Enterprise Tech Solutions",
    period: "2022 - Present",
    location: "Bengaluru, India",
    description: "Leading SRE initiatives across multi-cloud environments (AWS & GCP), driving zero-downtime reliability, and managing production EKS clusters.",
    highlights: [
      "Architected multi-region Kubernetes clusters serving high-traffic applications with 99.99% availability.",
      "Engineered automated GitOps CI/CD pipelines with ArgoCD, Terraform, and GitHub Actions, reducing deployment times by 75%.",
      "Implemented Karpenter auto-scaling and spot instance policies, cutting infrastructure spend by $120,000 annually.",
      "Honored with Apple Store Launch Recognition for seamless capacity handling during critical release events."
    ],
    techStack: ["Kubernetes", "AWS EKS", "GCP GKE", "Terraform", "ArgoCD", "Datadog", "Python", "Bash"],
    current: true
  },
  {
    id: "exp-2",
    role: "DevOps & Cloud Infrastructure Engineer",
    company: "ScaleTech Systems",
    period: "2020 - 2022",
    location: "Bengaluru, India",
    description: "Managed cloud provisioning, automated container security scanning, and established observability dashboards.",
    highlights: [
      "Built centralized Grafana & Prometheus monitoring hub across 80+ microservices.",
      "Automated infrastructure state management using Terraform modules and AWS CloudFormation.",
      "Reduced MTTR by 45% through custom SLI/SLO dashboards and smart PagerDuty alert grouping."
    ],
    techStack: ["AWS", "Docker", "Prometheus", "Grafana", "Terraform", "Jenkins", "GitHub Actions"]
  },
  {
    id: "exp-3",
    role: "Systems & Infrastructure Administrator",
    company: "Apex IT Services",
    period: "2019 - 2020",
    location: "India",
    description: "Provided core server administration, Linux performance tuning, network security, and database backup routines.",
    highlights: [
      "Migrated legacy monolithic workloads into Dockerized container environments.",
      "Authored 50+ shell scripts for automated backup, security patching, and log archiving."
    ],
    techStack: ["Linux", "Docker", "Bash", "Python", "Nginx", "MySQL"]
  }
];

export const initialEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    institution: "Premier Technical University",
    period: "2015 - 2019",
    description: "Specialized in Distributed Systems, Computer Networks, Operating Systems, and Cloud Architectures."
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Sharma",
    role: "VP of Infrastructure & Engineering",
    company: "CloudTech Enterprise",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    content: "Shubham is an incredible Site Reliability Engineer. When our high-concurrency launches hit, Shubham's Kubernetes and cloud infrastructure design ensures flawless execution with zero downtime."
  },
  {
    id: "test-2",
    name: "Ananya Roy",
    role: "Engineering Director",
    company: "ScaleTech Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    content: "Shubham's deep expertise in Terraform, AWS, and Datadog completely transformed our operations. He reduced our incident response time drastically and saved our team over $120k in cloud costs."
  }
];
