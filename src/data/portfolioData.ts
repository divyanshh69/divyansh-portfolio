const heroWorkspaceImg = new URL('../assets/images/hero_developer_workspace_1794058110461.jpg', import.meta.url).href;
const projectMetroflowImg = new URL('../assets/images/project_metroflow_macos_1794058111862.jpg', import.meta.url).href;
const projectCampuspulseImg = new URL('../assets/images/project_campuspulse_platform_1794058111483.jpg', import.meta.url).href;

export type SkillCategory =
  | 'All'
  | 'Programming'
  | 'Web Development'
  | 'Tools & Technologies'
  | 'Currently Learning';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  context: string;
  experienceNote: string;
  usedIn: string[];
}

export interface ProjectArchitectureNode {
  layer: string;
  component: string;
  responsibility: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'macOS / Native' | 'Full-Stack Web' | 'Systems & Tools';
  year: string;
  status: string;
  shortDescription: string;
  fullOverview: string;
  problemStatement: string;
  engineeringSolution: string;
  image: string;
  technologies: string[];
  highlights: string[];
  architecture: ProjectArchitectureNode[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveDemoUrl: string;
}

export type JourneyCategory =
  | 'All'
  | 'Education'
  | 'Projects'
  | 'Hackathons'
  | 'Club Roles'
  | 'Achievements'
  | 'Future Goals';

export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  category: Exclude<JourneyCategory, 'All'>;
  summary: string;
  outcomes: string[];
}

export interface AchievementItem {
  id: string;
  category: 'Certifications' | 'Hackathons' | 'Academic' | 'Leadership & Clubs';
  title: string;
  issuerOrEvent: string;
  date: string;
  detail: string;
  credentialRef: string;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  evidence: string;
}

export interface GrowthAreaItem {
  id: string;
  title: string;
  honestReflection: string;
  activeActionPlan: string;
}

export interface BeyondFacet {
  id: 'interests' | 'habits' | 'building' | 'principles' | 'improving';
  label: string;
  headline: string;
  items: {
    title: string;
    detail: string;
  }[];
}

export interface NowItem {
  id: string;
  emoji: string;
  category: 'Currently Building' | 'Currently Learning' | 'Current Goal' | 'Currently Exploring';
  headline: string;
  summary: string;
  recentMilestone: string;
  nextStep: string;
  updatedAt: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Divyansh Nayak',
    title: 'Computer Science Engineering Student · Developer · Builder',
    headline: 'Designing and engineering software that feels tactile, intentional, and resilient.',
    shortIntro:
      'I am a Computer Science Engineering student focused on building native-grade desktop experiences and scalable full-stack web platforms. I care deeply about the intersection of clean system architecture, low-latency interfaces, and thoughtful human interaction.',
    location: 'India',
    email: 'divyanshnayak713@gmail.com',
    github: 'https://github.com/divyanshnayak',
    linkedin: 'https://linkedin.com/in/divyanshnayak',
    heroImage: heroWorkspaceImg,
    metrics: [
      { value: '2', label: 'Flagship Platforms Shipped', context: 'macOS Native & Web' },
      { value: '14+', label: 'Core Technologies Practiced', context: 'Systems to UI' },
      { value: '850+', label: 'Commits & Iterations', context: 'Consistent Craft' },
      { value: '2026', label: 'Current Engineering Focus', context: 'Full-Stack & Systems' },
    ],
  },

  about: {
    sectionTitle: 'Beyond the Standard Transcript',
    lead: 'Software engineering to me is not just completing tickets or passing exams—it is the craft of turning abstract ideas into living, responsive tools that people genuinely enjoy using.',
    pillars: [
      {
        id: 'background',
        index: '01',
        title: 'My Background',
        subtitle: 'From curiosity about how apps work to building from scratch',
        content:
          'My path into computer science began with dissecting the everyday applications on my screen—wondering why some interfaces felt effortless while others felt sluggish. That curiosity evolved from writing small utility scripts into architecting complete full-stack platforms and native desktop tools.',
        keyTakeaway: 'Self-driven builder who learns best by shipping real products.',
      },
      {
        id: 'education',
        index: '02',
        title: 'Education',
        subtitle: 'Bachelor of Technology in Computer Science & Engineering',
        content:
          'Pursuing a rigorous foundation in Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Object-Oriented Software Engineering—while bridging classroom theory with practical product engineering.',
        keyTakeaway: 'Strong algorithmic fundamentals paired with modern web & native stacks.',
      },
      {
        id: 'interests',
        index: '03',
        title: 'Interests',
        subtitle: 'Interface craft, audio software, and developer ergonomics',
        content:
          'I gravitate toward projects where performance meets design: desktop media software, real-time collaborative workspaces, design systems, and automation tools that eliminate repetitive friction for students and developers.',
        keyTakeaway: 'Obsessed with 60fps interaction fidelity and clean API boundaries.',
      },
      {
        id: 'goals',
        index: '04',
        title: 'Goals',
        subtitle: 'Growing into a high-impact product & systems engineer',
        content:
          'My immediate goal is to contribute to ambitious engineering teams where I can own features end-to-end—from database schema design and API performance to pixel-accurate frontend execution—while deepening my systems programming expertise.',
        keyTakeaway: 'Focused on high-ownership engineering roles and open-source impact.',
      },
      {
        id: 'motivation',
        index: '05',
        title: 'What Motivates Me',
        subtitle: 'The moment a complex system clicks into a simple experience',
        content:
          'Nothing beats watching a real user—whether a fellow student organizing a campus event on CampusPulse or a listener queuing tracks in MetroFlow—navigate something I built without needing instructions.',
        keyTakeaway: 'Driven by clarity, craft, and tangible utility for real people.',
      },
    ],
  },

  skills: [
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Programming',
      context: 'Primary language for type-safe frontend and backend application architecture.',
      experienceNote: 'Strict mode, generics, discriminated unions, and end-to-end API contracts.',
      usedIn: ['CampusPulse', 'Portfolio Space', 'MetroFlow Bridge'],
    },
    {
      id: 'js',
      name: 'JavaScript (ES2024+)',
      category: 'Programming',
      context: 'Asynchronous runtime execution, DOM manipulation, and browser performance tuning.',
      experienceNote: 'Event loop optimization, Web Audio APIs, and modular ES packages.',
      usedIn: ['CampusPulse', 'Interactive Web Tools'],
    },
    {
      id: 'cpp',
      name: 'C++ & Data Structures',
      category: 'Programming',
      context: 'Algorithmic problem solving, memory-conscious data structures, and competitive programming.',
      experienceNote: 'STL containers, graph algorithms, dynamic programming, and complexity analysis.',
      usedIn: ['Algorithmic Benchmarks', 'CS Coursework'],
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      context: 'Scripting, backend prototyping, data processing, and automation pipelines.',
      experienceNote: 'FastAPI services, CLI tooling, and clean modular scripting.',
      usedIn: ['Automation Scripts', 'Data Parsers'],
    },
    {
      id: 'swift',
      name: 'Swift & AppKit / SwiftUI',
      category: 'Programming',
      context: 'Native macOS interface construction and low-latency audio playback integration.',
      experienceNote: 'Window management, native macOS vibrancy, and AVFoundation media pipelines.',
      usedIn: ['MetroFlow'],
    },
    {
      id: 'react',
      name: 'React & Next.js',
      category: 'Web Development',
      context: 'Component-driven UI engineering, custom hooks, and state orchestration.',
      experienceNote: 'Compound components, render optimization, and accessible interactive primitives.',
      usedIn: ['CampusPulse', 'Personal Digital Space'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS & Design Systems',
      category: 'Web Development',
      context: 'Tokenized styling, responsive grid math, and dark-mode optical refinement.',
      experienceNote: 'Custom design tokens, layout choreography, and zero-bloat utility composition.',
      usedIn: ['CampusPulse', 'Personal Digital Space'],
    },
    {
      id: 'motion',
      name: 'Framer Motion & GSAP',
      category: 'Web Development',
      context: 'Intentional choreography, scroll-linked timelines, and layout transitions.',
      experienceNote: 'Compositor-friendly transforms, spring physics, and reduced-motion compliance.',
      usedIn: ['Personal Digital Space', 'CampusPulse UI'],
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'Web Development',
      context: 'RESTful API design, authentication middleware, and real-time event handling.',
      experienceNote: 'Role-based access control, structured error handling, and request validation.',
      usedIn: ['CampusPulse'],
    },
    {
      id: 'databases',
      name: 'PostgreSQL & MongoDB',
      category: 'Tools & Technologies',
      context: 'Relational schema modeling, indexing, and document-based persistence.',
      experienceNote: 'Normalized club/event schemas, aggregation pipelines, and query optimization.',
      usedIn: ['CampusPulse'],
    },
    {
      id: 'git',
      name: 'Git, GitHub & Linux Workflow',
      category: 'Tools & Technologies',
      context: 'Version control hygiene, branch workflows, shell scripting, and CI automation.',
      experienceNote: 'Atomic commits, pull request reviews, and reproducible dev environments.',
      usedIn: ['MetroFlow', 'CampusPulse'],
    },
    {
      id: 'figma',
      name: 'Figma & UI Prototyping',
      category: 'Tools & Technologies',
      context: 'Wireframing, component tokenization, and high-contrast interface inspection.',
      experienceNote: 'Translating typographic scales and spatial grids directly into production code.',
      usedIn: ['MetroFlow', 'CampusPulse'],
    },
    {
      id: 'rust',
      name: 'Rust & Systems Programming',
      category: 'Currently Learning',
      context: 'Exploring ownership, zero-cost abstractions, and high-performance native tooling.',
      experienceNote: 'Building CLI utilities and studying memory safety without garbage collection.',
      usedIn: ['Systems Lab Explorations'],
    },
    {
      id: 'distributed',
      name: 'Distributed Systems & Caching',
      category: 'Currently Learning',
      context: 'Studying Redis caching patterns, WebSockets scaling, and event-driven architectures.',
      experienceNote: 'Designing resilient real-time notification pipelines for high-concurrency events.',
      usedIn: ['CampusPulse v2 Architecture'],
    },
  ] as SkillItem[],

  projects: [
    {
      id: 'metroflow',
      index: '01',
      title: 'MetroFlow',
      subtitle: 'A modern, distraction-free music application designed for macOS',
      category: 'macOS / Native',
      year: '2026',
      status: 'Active Flagship Build',
      shortDescription:
        'A modern music application designed for macOS that pairs native desktop ergonomics and lossless audio playback with an editorial, high-contrast visual interface.',
      fullOverview:
        'MetroFlow reimagines desktop music listening for macOS users who value album art, instant keyboard-driven navigation, and clean acoustic visualization over bloated streaming feeds. Designed with native macOS spatial aesthetics, it delivers sub-10ms library search and seamless queue choreography.',
      problemStatement:
        'Most modern desktop music players are heavy web wrappers that consume excessive RAM, lag during large library scrubbing, and clutter the listening experience with social feeds.',
      engineeringSolution:
        'Engineered a lightweight native-first architecture with an indexed local metadata cache, hardware-accelerated waveform rendering at 60fps, and a global command bar for instant track switching.',
      image: projectMetroflowImg,
      technologies: ['Swift', 'macOS AppKit / SwiftUI', 'AVFoundation', 'CoreAudio', 'SQLite FTS5'],
      highlights: [
        'Real-time acoustic waveform visualizer synchronized with CoreAudio output buffers',
        'Instant command palette (⌘K) for searching tracks, albums, and playlists in under 8ms',
        'Minimal mini-player mode that docks cleanly into the macOS menu bar workflow',
        'Lossless FLAC & ALAC metadata parser with gapless album transitions',
      ],
      architecture: [
        {
          layer: 'Presentation Layer',
          component: 'Native Dark Canvas & Mini-Player',
          responsibility: 'Renders album grids, 60fps audio spectrum bars, and keyboard-first navigation.',
        },
        {
          layer: 'Audio Engine',
          component: 'AVAudioEngine & Gapless Buffer Pipeline',
          responsibility: 'Manages gapless track pre-buffering, EQ nodes, and real-time FFT frequency analysis.',
        },
        {
          layer: 'Data & Indexing',
          component: 'SQLite Full-Text Search (FTS5)',
          responsibility: 'Indexes local & synced track metadata for instant zero-latency filtering.',
        },
      ],
      metrics: [
        { label: 'Search Latency', value: '< 8ms' },
        { label: 'Frame Rate', value: '60 fps' },
        { label: 'Memory Footprint', value: '~64 MB' },
      ],
      githubUrl: 'https://github.com/divyanshnayak/metroflow',
      liveDemoUrl: '#projects-metroflow-preview',
    },
    {
      id: 'campuspulse',
      index: '02',
      title: 'CampusPulse',
      subtitle: 'A unified college club management and campus event operations platform',
      category: 'Full-Stack Web',
      year: '2026',
      status: 'Production Platform',
      shortDescription:
        'A college club management platform that centralizes student society registrations, event scheduling, role-based approvals, and real-time attendance analytics.',
      fullOverview:
        'CampusPulse replaces scattered WhatsApp groups, Google Forms, and manual spreadsheets across university clubs with a single, cohesive operating system. Club leads can publish events, manage member rosters, track room bookings, and verify student check-ins from one unified dashboard.',
      problemStatement:
        'College clubs struggle with fragmented communication, duplicate event clashes, manual attendance spreadsheets, and zero historical continuity when leadership transitions each academic year.',
      engineeringSolution:
        'Built a role-based full-stack web platform featuring conflict-aware event scheduling, QR-based participant check-ins, automated roster permissions, and structured club archives.',
      image: projectCampuspulseImg,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
      highlights: [
        'Role-based access control (RBAC) for Faculty Advisors, Club Presidents, Core Leads, and Members',
        'Conflict-aware campus calendar that flags overlapping auditorium or lab bookings automatically',
        'One-click event registration with instant attendance telemetry and CSV export',
        'Dedicated club discovery directory with category filtering and recruitment application workflows',
      ],
      architecture: [
        {
          layer: 'Client Interface',
          component: 'React + TypeScript Workspace',
          responsibility: 'Provides responsive dashboards for club discovery, event calendars, and roster management.',
        },
        {
          layer: 'API & Auth Gateway',
          component: 'Express REST API + RBAC Middleware',
          responsibility: 'Enforces university role permissions, validates event payloads, and handles registrations.',
        },
        {
          layer: 'Persistence Layer',
          component: 'PostgreSQL Relational Schema',
          responsibility: 'Maintains normalized records for clubs, memberships, venues, and attendance logs.',
        },
      ],
      metrics: [
        { label: 'Core Modules', value: '6 Modules' },
        { label: 'Role Tiers', value: '4 RBAC Levels' },
        { label: 'Admin Time Saved', value: '~70%' },
      ],
      githubUrl: 'https://github.com/divyanshnayak/campuspulse',
      liveDemoUrl: '#projects-campuspulse-preview',
    },
  ] as ProjectItem[],

  journey: [
    {
      id: 'j-edu-1',
      period: '2023 — Present',
      title: 'B.Tech in Computer Science & Engineering',
      organization: 'University Undergraduate Program',
      category: 'Education',
      summary:
        'Building a deep theoretical and practical foundation in algorithms, operating systems, computer networks, relational databases, and software design patterns.',
      outcomes: [
        'Completed core coursework in Data Structures, Algorithms, DBMS, and Operating Systems',
        'Translated academic database & systems concepts directly into full-stack projects',
      ],
    },
    {
      id: 'j-club-1',
      period: '2024 — Present',
      title: 'Technical Lead & Core Developer',
      organization: 'University Coding & Developer Society',
      category: 'Club Roles',
      summary:
        'Organizing technical workshops, mentoring junior students in web architecture and Git workflows, and spearheading internal software tooling for campus events.',
      outcomes: [
        'Observed firsthand the operational friction in student societies that inspired CampusPulse',
        'Facilitated hands-on code labs on React, TypeScript, and modern full-stack engineering',
      ],
    },
    {
      id: 'j-hack-1',
      period: '2025',
      title: 'Inter-College Hackathon Finalist & Builder',
      organization: '36-Hour Product Engineering Sprint',
      category: 'Hackathons',
      summary:
        'Architected and shipped a working full-stack prototype under tight time constraints, focusing on real-time collaboration, clean UI execution, and resilient API design.',
      outcomes: [
        'Delivered end-to-end authentication, database schema, and polished dark-mode UI in 36 hours',
        'Recognized by jury for product polish and practical deployment readiness',
      ],
    },
    {
      id: 'j-proj-campuspulse',
      period: 'Late 2025 — 2026',
      title: 'Architected & Built CampusPulse',
      organization: 'Flagship Full-Stack Platform',
      category: 'Projects',
      summary:
        'Designed and engineered a comprehensive college club management platform to unify event discovery, member rosters, and club administration.',
      outcomes: [
        'Implemented multi-role RBAC, conflict-free event scheduling, and club analytics dashboards',
        'Structured modular frontend and backend architecture for long-term maintainability',
      ],
    },
    {
      id: 'j-proj-metroflow',
      period: '2026',
      title: 'Created MetroFlow for macOS',
      organization: 'Native Desktop Engineering',
      category: 'Projects',
      summary:
        'Ventured beyond browser boundaries to craft a modern, high-contrast music application tailored specifically for macOS ergonomics and lossless audio playback.',
      outcomes: [
        'Built 60fps real-time waveform visualization and ultra-fast local library search',
        'Refined native dark UI aesthetics with strict attention to typography and keyboard shortcuts',
      ],
    },
    {
      id: 'j-goal-future',
      period: '2026 — Beyond',
      title: 'Next Horizon: High-Impact Software & Systems Engineering',
      organization: 'Future Roadmap',
      category: 'Future Goals',
      summary:
        'Expanding into high-concurrency distributed systems, native cross-platform tooling in Rust/Swift, and contributing to production-scale engineering teams.',
      outcomes: [
        'Shipping CampusPulse v2 with real-time WebSocket notifications and mobile check-ins',
        'Open-sourcing modular UI primitives and native macOS audio utilities',
      ],
    },
  ] as JourneyItem[],

  achievements: [
    {
      id: 'ach-1',
      category: 'Hackathons',
      title: 'Finalist — 36-Hour Collegiate Software Hackathon',
      issuerOrEvent: 'National Technical Symposium',
      date: '2025',
      detail:
        'Selected among top engineering teams for building a production-ready campus workflow prototype with zero mock dependencies.',
      credentialRef: 'Top 5% Cohort Finish',
    },
    {
      id: 'ach-2',
      category: 'Leadership & Clubs',
      title: 'Core Technical Organizer & Student Mentor',
      issuerOrEvent: 'Campus Developer Community',
      date: '2024 — 2026',
      detail:
        'Led technical architecture sessions, code reviews, and collaborative project sprints for undergraduate developers.',
      credentialRef: '150+ Students Mentored',
    },
    {
      id: 'ach-3',
      category: 'Academic',
      title: 'Distinction in Core Computer Science Systems Labs',
      issuerOrEvent: 'Department of Computer Science & Engineering',
      date: '2024 — 2025',
      detail:
        'Consistent top performance in Data Structures & Algorithms, Database Management Systems, and Object-Oriented Programming.',
      credentialRef: 'Core CS Honors Track',
    },
    {
      id: 'ach-4',
      category: 'Certifications',
      title: 'Full-Stack Architecture & Modern TypeScript Engineering',
      issuerOrEvent: 'Verified Technical Specialization',
      date: '2025',
      detail:
        'Completed intensive verification covering relational schema design, RESTful API security, React performance patterns, and automated testing.',
      credentialRef: 'Verified Credential',
    },
  ] as AchievementItem[],

  beyondResume: {
    intro:
      'A resume shows what I have built, but how I think, collaborate, and iterate matters just as much. Here is an honest look at where I excel and where I am actively pushing myself to grow.',
    strengths: [
      {
        id: 'str-1',
        title: 'Product-Minded Systems Thinking',
        description:
          'I do not view backend schemas and frontend animations as separate worlds. When designing a database table, I am already thinking about how fast the UI will feel to the end user.',
        evidence: 'Demonstrated in CampusPulse’s instant roster filtering and MetroFlow’s sub-10ms library search.',
      },
      {
        id: 'str-2',
        title: 'Obsessive UI & Interaction Polish',
        description:
          'I sweat the small details that elevate software from "working" to "memorable"—typographic hierarchy, keyboard accessibility, focus states, and smooth compositor transitions.',
        evidence: 'Every project is built with custom layout math and deliberate motion budgets rather than generic templates.',
      },
      {
        id: 'str-3',
        title: 'Self-Sufficient Rapid Prototyping',
        description:
          'Give me an ambiguous problem statement and I will break it down into a clean data model, a working API, and an interactive interface without waiting for hand-holding.',
        evidence: 'Took both MetroFlow and CampusPulse from blank repositories to cohesive architectures independently.',
      },
      {
        id: 'str-4',
        title: 'Clean, Maintainable Code Hygiene',
        description:
          'I write modular TypeScript with clear separation between data, business logic, and presentation so that future contributors (or future me) can extend features effortlessly.',
        evidence: 'Strict type safety and decoupled component structures across all repositories.',
      },
    ] as StrengthItem[],

    growthAreas: [
      {
        id: 'grw-1',
        title: 'Large-Scale Distributed Infrastructure',
        honestReflection:
          'While I am comfortable building single-instance APIs and relational databases, my hands-on experience with multi-region replication, message queues, and Kubernetes at massive scale is still early.',
        activeActionPlan:
          'Currently designing Redis caching layers, event-driven workers, and containerized deployments for CampusPulse v2.',
      },
      {
        id: 'grw-2',
        title: 'Perfectionism vs. Early Shipping Speed',
        honestReflection:
          'Because I care deeply about visual and architectural polish, I sometimes spend extra hours refining micro-interactions before releasing an initial version.',
        activeActionPlan:
          'Practicing strict milestone timeboxing: shipping a functional core first, then layering cinematic polish in dedicated passes.',
      },
      {
        id: 'grw-3',
        title: 'Low-Level Systems & Memory Optimization',
        honestReflection:
          'Coming primarily from high-level TypeScript and modern app frameworks, I want deeper intuition around manual memory layout, concurrency primitives, and systems-level profiling.',
        activeActionPlan:
          'Actively learning Rust and studying CoreAudio buffer pipelines in MetroFlow to strengthen my low-level engineering foundation.',
      },
    ] as GrowthAreaItem[],

    facets: [
      {
        id: 'principles',
        label: 'Personal Principles',
        headline: 'The rules I hold myself to when writing code and building products',
        items: [
          {
            title: 'Clarity over cleverness',
            detail: 'Readable code and intuitive interfaces always win over convoluted one-liners or flashy distractions.',
          },
          {
            title: 'Speed is a core feature',
            detail: 'A beautiful interface that lags by 400ms feels broken. Responsiveness is the foundation of user trust.',
          },
          {
            title: 'Own the entire stack',
            detail: 'Never say "that is a backend problem" or "that is a design problem"—care about the whole experience.',
          },
        ],
      },
      {
        id: 'building',
        label: 'Things I Enjoy Building',
        headline: 'The kinds of software problems that make me lose track of time',
        items: [
          {
            title: 'Native-feeling desktop & media apps',
            detail: 'Tools like MetroFlow that respect keyboard shortcuts, system resources, and high-craft dark interfaces.',
          },
          {
            title: 'Community & workflow platforms',
            detail: 'Systems like CampusPulse that replace chaotic spreadsheets with structured, collaborative clarity.',
          },
          {
            title: 'Interactive design & developer tools',
            detail: 'Reusable UI primitives, command palettes, and utilities that make other builders faster.',
          },
        ],
      },
      {
        id: 'habits',
        label: 'Daily Habits',
        headline: 'Routines that compound my engineering craft day by day',
        items: [
          {
            title: 'Deep work blocks without notifications',
            detail: 'Setting aside uninterrupted 2-hour nocturnal or early-morning sessions for complex architecture and debugging.',
          },
          {
            title: 'Deconstructing great product UIs',
            detail: 'Inspecting how Linear, Raycast, and Apple engineer their transitions, keyboard flows, and typography.',
          },
          {
            title: 'Writing architectural notes before code',
            detail: 'Sketching data models and component boundaries on paper or markdown before opening the editor.',
          },
        ],
      },
      {
        id: 'interests',
        label: 'Interests Beyond Code',
        headline: 'What inspires my taste and keeps my perspective fresh',
        items: [
          {
            title: 'High-fidelity music & acoustic design',
            detail: 'Exploring album production, spatial audio, and minimal industrial hardware design.',
          },
          {
            title: 'Editorial typography & brutalist architecture',
            detail: 'Studying grid systems, Swiss graphic design, and how physical spaces guide human attention.',
          },
          {
            title: 'Tech mentorship & hackathons',
            detail: 'Brainstorming late-night product ideas with peers and helping freshmen ship their first web apps.',
          },
        ],
      },
      {
        id: 'improving',
        label: 'Currently Working to Improve',
        headline: 'Deliberate practice areas for the current semester',
        items: [
          {
            title: 'Automated test coverage & TDD discipline',
            detail: 'Writing fast unit and integration tests alongside business logic rather than as an afterthought.',
          },
          {
            title: 'Technical writing & architecture RFCs',
            detail: 'Documenting system trade-offs and engineering post-mortems with greater precision.',
          },
          {
            title: 'Open-source contributions',
            detail: 'Moving from consuming open-source packages to submitting meaningful PRs and maintaining public repos.',
          },
        ],
      },
    ] as BeyondFacet[],
  },

  now: {
    lastUpdated: 'November 2026',
    locationStatus: 'On Campus & In the Code Lab',
    items: [
      {
        id: 'now-building',
        emoji: '🔨',
        category: 'Currently Building',
        headline: 'MetroFlow Audio Engine & CampusPulse Analytics',
        summary:
          'Refining MetroFlow’s real-time audio spectrum visualizer and playlist keyboard navigation on macOS, while expanding CampusPulse’s club analytics and QR event check-in flow.',
        recentMilestone: 'Completed sub-10ms local track search indexing and dark-mode mini-player layout.',
        nextStep: 'Implementing smart queue persistence and custom audio equalizer presets.',
        updatedAt: 'Active Sprint',
      },
      {
        id: 'now-learning',
        emoji: '📚',
        category: 'Currently Learning',
        headline: 'Rust Systems Programming & Distributed Backend Patterns',
        summary:
          'Deepening my understanding of memory-safe systems programming in Rust alongside scalable backend patterns like Redis caching, rate limiting, and event-driven queues.',
        recentMilestone: 'Built a multithreaded CLI file indexer and studied ownership semantics.',
        nextStep: 'Benchmarking Rust WebAssembly modules for client-side audio waveform processing.',
        updatedAt: 'Daily Study',
      },
      {
        id: 'now-goal',
        emoji: '🎯',
        category: 'Current Goal',
        headline: 'High-Impact Software Engineering Internships & Open-Source Shipping',
        summary:
          'Seeking challenging software engineering opportunities where I can contribute to production systems, learn from seasoned engineers, and ship user-facing products at scale.',
        recentMilestone: 'Consolidated flagship projects with clean documentation and live architectural breakdowns.',
        nextStep: 'Publishing technical deep-dives on building MetroFlow and CampusPulse.',
        updatedAt: '2026 — 2027 Target',
      },
      {
        id: 'now-exploring',
        emoji: '💡',
        category: 'Currently Exploring',
        headline: 'Spatial Micro-Interactions & Local-First Software Architecture',
        summary:
          'Investigating how web and desktop applications can feel instantaneous using local-first sync engines (CRDTs / IndexedDB) and hardware-accelerated shader/motion primitives.',
        recentMilestone: 'Experimented with hybrid GSAP + Framer Motion choreography for editorial storytelling.',
        nextStep: 'Prototyping an offline-capable sync layer for student club notes in CampusPulse.',
        updatedAt: 'R&D Sandbox',
      },
    ] as NowItem[],
  },
};
