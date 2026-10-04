/**
 * Sahil Singh — Portfolio Data Source (V3)
 * 
 * STRICT RULE: All information is sourced directly from Sahil Singh's verified resume.
 * No fabricated statistics, employers, dates, or certifications.
 */

export const personalInfo = {
  name: "Sahil Singh",
  firstName: "SAHIL",
  lastName: "SINGH",
  role: "Data Analyst | Business Analyst",
  tagline: "DATA ANALYST · BUSINESS INTELLIGENCE · GENAI",
  heroStatement: "Turning complex data into clear decisions, systems into insight.",
  email: "sahilsingh.data@gmail.com",
  phone: "+91 9667428133",
  location: "Delhi, India",
  summary: "Data Analyst with hands-on experience in SQL, Python, Power BI, Tableau and Advanced Excel across data cleaning, EDA, statistical testing, KPI reporting and dashboard development. Built three end-to-end analytics projects: a 10-phase telecom churn and retention platform (MySQL, scikit-learn, RAG), a supply chain pipeline over 180,000+ records ($36.8M revenue analyzed) and a Power BI sales dashboard. Trained 100+ learners in Python, SQL, Excel, Power BI and Tableau.",
  editorialAbout: [
    "I'm a Data Analyst focused on turning raw data into useful insights, interactive dashboards, and intelligent analytical systems.",
    "Experienced across the full data lifecycle — from relational database design and exploratory analysis to predictive modeling, executive BI dashboards, and GenAI / RAG query layers.",
    "Driven by analytical rigor and structured modeling to bridge the gap between complex datasets and strategic executive decision-making."
  ],
  status: "Available for High-Impact Roles & Projects"
};

export const navigationLinks = [
  { id: "about", label: "01 / Who I Am", target: "#about" },
  { id: "capabilities", label: "02 / What I Do", target: "#capabilities" },
  { id: "work", label: "03 / Work", target: "#work" },
  { id: "experience", label: "04 / Experience", target: "#experience" },
  { id: "connect", label: "05 / Connect", target: "#connect" },
];

/**
 * 8 Specific Capability Cards for the Redesigned About Section (My Expertise)
 */
export const eightCapabilities = [
  {
    number: "01",
    title: "Data Analytics",
    description: "Python, SQL, exploratory analysis and statistical methods.",
    tools: ["Python", "SQL", "EDA", "Statistics"]
  },
  {
    number: "02",
    title: "Business Intelligence",
    description: "Power BI, DAX, Power Query and business reporting.",
    tools: ["Power BI", "DAX", "Power Query", "KPIs"]
  },
  {
    number: "03",
    title: "Data Visualization",
    description: "Interactive reports, analytical storytelling and visual communication.",
    tools: ["Tableau", "Power BI", "Matplotlib", "Seaborn"]
  },
  {
    number: "04",
    title: "Database Management",
    description: "MySQL, relational modeling and analytical queries.",
    tools: ["MySQL", "3NF Design", "CTEs", "Window Functions"]
  },
  {
    number: "05",
    title: "Data Preparation",
    description: "Pandas, NumPy, data cleaning and transformation.",
    tools: ["Pandas", "NumPy", "Data Wrangling", "ETL"]
  },
  {
    number: "06",
    title: "GenAI & RAG",
    description: "Retrieval-augmented generation, Ollama and intelligent analytical applications.",
    tools: ["RAG", "Ollama", "Qwen3", "Streamlit"]
  },
  {
    number: "07",
    title: "Spreadsheet Analytics",
    description: "Advanced Excel, Pivot Tables, XLOOKUP and reporting.",
    tools: ["Advanced Excel", "Pivot Tables", "XLOOKUP", "Macros"]
  },
  {
    number: "08",
    title: "Analytical Problem Solving",
    description: "Exploratory investigation, business questions and evidence-based insights.",
    tools: ["Hypothesis Testing", "Root Cause Analysis", "A/B Testing"]
  }
];

/**
 * 4 Primary High-Level Categories for "What Can I Do" (Broader Domains)
 */
export const capabilities = [
  {
    index: "01",
    domain: "DATA ANALYTICS",
    subtitle: "Exploratory investigation, statistical rigor, and behavioral pattern recognition.",
    skills: ["Python (Pandas, NumPy)", "SQL (CTEs, Window Functions)", "EDA & Hypothesis Testing", "Statistical Modeling", "Root Cause Analysis"],
    details: "Analyzing multidimensional datasets to uncover hidden distributions, anomalies, correlations, and actionable business patterns that guide data-driven strategy."
  },
  {
    index: "02",
    domain: "BUSINESS INTELLIGENCE",
    subtitle: "Executive reporting systems, metric frameworks, and interactive dashboards.",
    skills: ["Power BI (DAX, Modeling)", "Tableau", "Advanced Excel (Pivot, XLOOKUP)", "KPI Dashboards", "MIS Reporting"],
    details: "Designing end-to-end self-service dashboards and executive KPI views that convert complex tabular records into immediate visual clarity."
  },
  {
    index: "03",
    domain: "DATA ENGINEERING",
    subtitle: "Normalized schema architectures, ETL pipelines, and query optimization.",
    skills: ["MySQL Workbench", "3NF Relational Schemas", "ETL Pipelines", "Views & Stored Procedures", "Data Validation"],
    details: "Structuring resilient data storage with normalized schemas, reliable ingestion workflows, and performant SQL queries built for large-scale analytical workloads."
  },
  {
    index: "04",
    domain: "GENAI / RAG",
    subtitle: "Retrieval-augmented intelligence, context augmentation, and LLM reasoning.",
    skills: ["Generative AI", "RAG Systems", "Ollama & Local LLMs", "Streamlit Applications", "Prompt Engineering"],
    details: "Augmenting analytical pipelines with retrieval-augmented generation to enable conversational natural-language querying with verifiable evidence citations."
  }
];

/**
 * Verified Projects Sourced from Resume
 */
export const projects = [
  {
    id: "retainrag",
    number: "01",
    featured: true,
    name: "RetainIQ / RetainRAG",
    title: "Telecom Customer Retention Intelligence Platform",
    tagline: "10-Phase Analytics Platform · Churn Modeling · Hybrid RAG + SQL Assistant",
    description: "End-to-end customer churn and retention platform profiling 7,043 records with a MySQL fact/dimension warehouse and predictive modeling. Quantified $3.68M in revenue at risk using K-Means segmentation and engineered a hybrid RAG + SQL assistant providing evidence-backed business insights.",
    metrics: [
      { label: "Customer Records", value: "7,043", numeric: 7043 },
      { label: "Revenue at Risk", value: "$3.68M", numeric: 3.68, prefix: "$" },
      { label: "Churn Rate", value: "26.5%", numeric: 26.5, suffix: "%" },
      { label: "Phases", value: "10", numeric: 10 }
    ],
    technologies: [
      "Python",
      "MySQL",
      "Streamlit",
      "GenAI / RAG",
      "Power BI"
    ],
    highlights: [
      "Built a 10-phase analytics platform on 7,043 customer records with a normalized MySQL warehouse",
      "Segmented customers with K-Means (3 segments, ARI ~0.99) and quantified $3.68M revenue at risk",
      "Flagged an Emerging Risk segment (46% of customers, 47% churn) and San Diego as top market (64.9% churn)",
      "Designed a revenue-at-risk priority score and recovery scenarios (5% to 30%) for retention strategy",
      "Built a hybrid RAG + SQL Streamlit assistant (Ollama, Qwen3) answering business questions with cited evidence"
    ],
    architecture: [
      { stage: "Phases 1–3", name: "Data Audit, Cleaning & MySQL Warehouse", tech: "Python / MySQL (Fact/Dim Tables)" },
      { stage: "Phases 4–6", name: "EDA, Statistical Tests & Churn Modeling", tech: "Logistic Regression / Random Forest" },
      { stage: "Phases 7–10", name: "K-Means Segmentation & RAG Assistant", tech: "Streamlit / Ollama / Qwen3 / RAG" }
    ],
    githubUrl: "https://github.com/Sahil-Singh01",
    liveUrl: null,
    screenshots: []
  },
  {
    id: "dataco",
    number: "02",
    featured: true,
    name: "Supply Chain Analytics Pipeline",
    title: "Global Supply Chain Optimization & Diagnostics",
    tagline: "180,000+ Order Line Items · 3NF Schema · 60+ Complex SQL Queries",
    description: "Engineered an end-to-end analytics pipeline (Excel cleaning, normalized MySQL, Python EDA) across 180,000+ order line items. Designed a 3NF schema (6 tables) with indexes and views and authored 60+ queries utilizing CTEs, window functions, and subqueries. Delivered diagnostics on $36.8M revenue across 65,752 orders at ~10.8% margin; traced a 100% late-delivery rate on First Class shipping to an SLA-design mismatch and isolated fraud risk in TRANSFER payments (8.2% vs 0%).",
    metrics: [
      { label: "Order Line Items", value: "180,000+", numeric: 180000, suffix: "+" },
      { label: "Revenue Analyzed", value: "$36.8M", numeric: 36.8, prefix: "$" },
      { label: "Orders Profiled", value: "65,752", numeric: 65752 },
      { label: "Complex SQL Queries", value: "60+", numeric: 60, suffix: "+" }
    ],
    technologies: [
      "SQL / MySQL",
      "Python (Pandas)",
      "Advanced Excel",
      "3NF Schema Design",
      "Data Modeling"
    ],
    highlights: [
      "Designed a normalized 3NF database schema with 6 relational tables, indexes, and views",
      "Authored 60+ advanced SQL queries utilizing CTEs, window functions, and multi-table joins",
      "Analyzed $36.8M in revenue across 65,752 orders operating at ~10.8% margin",
      "Discovered 100% late-delivery rate on First Class shipping stemmed from an SLA-design mismatch",
      "Isolated critical fraud risk in TRANSFER payment channels (8.2% vs 0% in standard channels)"
    ],
    architecture: [
      { stage: "Stage 1", name: "Excel Cleaning & MySQL 3NF Database Design", tech: "Excel / MySQL / 6 Tables" },
      { stage: "Stage 2", name: "Exploratory Analysis & Complex SQL Modeling", tech: "Python / CTEs / Window Functions" },
      { stage: "Stage 3", name: "Logistics SLA Diagnostics & Fraud Isolation", tech: "Statistical Analysis / Pandas" }
    ],
    githubUrl: "https://github.com/Sahil-Singh01",
    liveUrl: null,
    screenshots: []
  },
  {
    id: "blinkit",
    number: "03",
    featured: true,
    name: "Blinkit Grocery Sales Performance Dashboard",
    title: "Retail Performance Intelligence & Dynamic BI System",
    tagline: "8,500+ Sales Records · Power BI DAX Modeling · Dynamic KPI Slicers",
    description: "Built an interactive Power BI self-service intelligence dashboard analyzing 8,500+ grocery retail records with custom KPI cards and dynamic slicers (Outlet Size, Location Type, Item Type). Discovered that Supermarket Type1 outlets drove ~69% of sales (INR 1.86 Cr), Medium outlets accounted for 63% of revenue, and Tier 3 cities outsold Tier 1 by 70%+.",
    metrics: [
      { label: "Sales Records", value: "8,500+", numeric: 8500, suffix: "+" },
      { label: "Sales Analyzed", value: "₹1.86 Cr", numeric: 1.86, prefix: "₹" },
      { label: "Core Outlets Share", value: "69%", numeric: 69, suffix: "%" },
      { label: "Tier 3 vs Tier 1", value: "+70%", numeric: 70, prefix: "+" }
    ],
    technologies: [
      "Power BI",
      "DAX",
      "Power Query",
      "Data Modeling",
      "Advanced Excel"
    ],
    highlights: [
      "Built an interactive Power BI dashboard on 8,500+ records with dynamic slicers for self-service exploration",
      "Engineered calculated DAX measures and robust data models for fast slice-and-dice capability",
      "Found Supermarket Type1 outlets drove ~69% of sales (INR 1.86 Cr)",
      "Demonstrated that Medium outlets generated 63% of total revenue",
      "Identified that Tier 3 locations outsold Tier 1 locations by over 70%"
    ],
    architecture: [
      { stage: "Data Prep", name: "Excel Data Audit & Power Query Transformation", tech: "Power Query / Excel" },
      { stage: "Modeling", name: "DAX Measures, Time Intelligence & KPIs", tech: "Power BI DAX" },
      { stage: "Delivery", name: "Dynamic Multi-Dimensional BI Dashboard", tech: "Power BI / Visual Reporting" }
    ],
    githubUrl: "https://github.com/Sahil-Singh01",
    liveUrl: null,
    screenshots: []
  }
];

/**
 * Verified Work Experience from Resume
 */
export const experience = [
  {
    id: "ifda",
    period: "Jan 2026 – Apr 2026",
    role: "Data Analyst Intern",
    organization: "IFDA Institute",
    summary: "Trained 100+ aspiring data analysts in Python, SQL, Excel, Power BI and Tableau through project-based instruction across the full analytics workflow. Simplified EDA, data wrangling, statistical testing and visualization concepts; evaluated learner proficiency and gave individual feedback.",
    tags: ["Python", "SQL", "Excel", "Power BI", "Tableau"]
  }
];

/**
 * Verified Education & Certifications from Resume
 */
export const education = {
  degree: "Bachelor of Science (BSCG)",
  institution: "Indira Gandhi National Open University, Delhi",
  period: "2022 – 2026"
};

export const certifications = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera"
  },
  {
    name: "Microsoft Business Analyst Professional Certificate",
    issuer: "Microsoft"
  },
  {
    name: "Data Analyst and Visualisation Certification",
    issuer: "IFDA Institute"
  }
];

/**
 * Two Clean Semantic Tool Streams for Marquee
 */
export const techStreams = {
  stream1: [
    "Python",
    "SQL (MySQL)",
    "Power BI",
    "Tableau",
    "Advanced Excel",
    "DAX",
    "Power Query"
  ],
  stream2: [
    "Pandas & NumPy",
    "EDA & Statistics",
    "GenAI & RAG",
    "Ollama (Qwen3)",
    "Streamlit",
    "3NF Database Design",
    "Git & GitHub"
  ]
};

/**
 * Verified Social and Resume URLs
 */
export const userSocialProfiles = {
  linkedinUrl: "https://www.linkedin.com/in/sahil-singh-762a4b388/",
  githubUrl: "https://github.com/Sahil-Singh01",
  emailAddress: "sahilsingh.data@gmail.com",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=sahilsingh.data@gmail.com",
  phone: "+91 9667428133",
  resumePdfPath: "/Sahil_Singh_Resume.pdf",
  resumeDocxPath: "/Sahil_Singh_Resume_Updated.docx"
};

export const socialStages = [
  {
    id: "linkedin",
    stage: "01",
    label: "LINKEDIN",
    sublabel: "Professional profile, network & recommendations",
    action: "VIEW LINKEDIN PROFILE →",
    getUrl: () => userSocialProfiles.linkedinUrl,
    type: "external"
  },
  {
    id: "github",
    stage: "02",
    label: "GITHUB",
    sublabel: "Analytics repositories, SQL scripts & codebases",
    action: "VIEW GITHUB PROFILE →",
    getUrl: () => userSocialProfiles.githubUrl,
    type: "external"
  },
  {
    id: "email",
    stage: "03",
    label: "EMAIL",
    sublabel: "sahilsingh.data@gmail.com",
    action: "COMPOSE IN GMAIL →",
    getUrl: () => userSocialProfiles.gmailComposeUrl,
    type: "external"
  },
  {
    id: "resume",
    stage: "04",
    label: "RESUME",
    sublabel: "View my current resume and professional experience.",
    action: "VIEW & DOWNLOAD RESUME →",
    getUrl: () => userSocialProfiles.resumePdfPath,
    type: "modal"
  }
];
