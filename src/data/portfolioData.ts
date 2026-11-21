const metroflowHomeImg = new URL('../assets/images/metroflow-home.png', import.meta.url).href;
const metroflowLyricsImg = new URL('../assets/images/metroflow-synchronized-lyrics.png', import.meta.url).href;
const metroflowSettingsImg = new URL('../assets/images/metroflow-settings-about.png', import.meta.url).href;

const skillsyncHomeImg = new URL('../assets/images/skillsync-home.png', import.meta.url).href;
const skillsyncRoadmapImg = new URL('../assets/images/skillsync-roadmap.png', import.meta.url).href;
const skillsyncProjectsImg = new URL('../assets/images/skillsync-projects.png', import.meta.url).href;

const campuspulseDashboardImg = new URL('../assets/images/campuspulse-dashboard.png', import.meta.url).href;
const campuspulseMemberManagementImg = new URL('../assets/images/campuspulse-member-management.png', import.meta.url).href;
const campuspulsePlatformSettingsImg = new URL('../assets/images/campuspulse-platform-settings.png', import.meta.url).href;

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

export interface ProjectSpecification {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectTechnicalDecision {
  title: string;
  decision: string;
  rationale: string;
}

export interface ProjectChallengeLearning {
  title: string;
  challenge: string;
  solution: string;
  learning: string;
}

export interface ScreenshotAnnotation {
  id: string;
  number: number;
  label: string;
  description: string;
  xPercent: number;
  yPercent: number;
  leaderDirection?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ProjectScreenshot {
  title: string;
  image: string;
  caption: string;
  annotations?: ScreenshotAnnotation[];
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
  screenshots?: ProjectScreenshot[];
  technologies: string[];
  highlights: string[];
  architecture: ProjectArchitectureNode[];
  specifications?: ProjectSpecification[];
  technicalDecisions?: ProjectTechnicalDecision[];
  challengesAndLearnings?: ProjectChallengeLearning[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
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
  category: 'Academic' | 'Projects' | 'Hackathons' | 'Leadership & Clubs' | 'Certifications' | 'Learning';
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

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Divyansh Nayak',
    title: 'Computer Science Student & Software Developer',
    headline: '2nd-year B.Tech CSE student at Medi-Caps University, Indore. Building macOS desktop software and full-stack web platforms.',
    email: 'divyanshnayak713@gmail.com',
    github: 'https://github.com/divyanshh69',
    linkedin: 'https://www.linkedin.com/in/divyansh-nayak-703390370/',
  },

  about: {
    lead: 'I am a 2nd-year Computer Science student at Medi-Caps University in Indore, India. I learn by engineering software from scratch—translating coursework in data structures, systems, and relational databases into working desktop tools and web platforms, alongside campus student leadership.',
  },

  skills: [
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Programming',
      context: 'Type-safe application development across frontend React components and backend Node.js services.',
      experienceNote: 'Strict typing, generic helpers, API contract interfaces, and modular component props.',
      usedIn: ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'js',
      name: 'JavaScript (ES2024+)',
      category: 'Programming',
      context: 'Asynchronous programming, DOM interactions, Web APIs, and modern ES features.',
      experienceNote: 'Async/await, modern ES syntax, DOM manipulation, and audio API integration.',
      usedIn: ['CampusPulse'],
    },
    {
      id: 'cpp',
      name: 'C++ & Data Structures',
      category: 'Programming',
      context: 'Algorithmic problem solving, core computer science fundamentals, and data structure implementations.',
      experienceNote: 'STL containers, algorithms, recursion, trees, graphs, and complexity analysis.',
      usedIn: ['CS Coursework', 'Problem Solving Practice'],
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      context: 'Local microservice bridges, backend prototyping, data handling, and course projects.',
      experienceNote: 'Writing clean scripts, CLI utilities, and local HTTP services with ytmusicapi.',
      usedIn: ['MetroFlow', 'Coursework Scripts'],
    },
    {
      id: 'swift',
      name: 'Swift & macOS UI Explorations',
      category: 'Programming',
      context: 'Studying Swift language fundamentals and SwiftUI for macOS interface prototyping.',
      experienceNote: 'Exploring Swift syntax, SwiftUI view hierarchies, and macOS UI patterns.',
      usedIn: ['macOS UI Prototyping', 'Independent Study'],
    },
    {
      id: 'react',
      name: 'React',
      category: 'Web Development',
      context: 'Building interactive user interfaces, single-page web applications, and custom hooks with Vite.',
      experienceNote: 'Functional components, hooks, state management, and responsive layouts.',
      usedIn: ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS & Design Systems',
      category: 'Web Development',
      context: 'Responsive styling, dark mode UI theming, and consistent layout design.',
      experienceNote: 'Utility classes, custom CSS variables, responsive breakpoints, and clean component styling.',
      usedIn: ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'motion',
      name: 'Framer Motion & Web Animations',
      category: 'Web Development',
      context: 'Smooth UI animations, scroll-triggered reveals, and micro-interactions.',
      experienceNote: 'Spring animations, staggered reveals, smooth transitions, and respecting prefers-reduced-motion.',
      usedIn: ['Personal Portfolio'],
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'Web Development',
      context: 'REST API development, routing, authentication middleware, and server logic.',
      experienceNote: 'Express routes, JWT/session authentication, input validation, and database queries.',
      usedIn: ['SkillSync', 'CampusPulse'],
    },
    {
      id: 'electron',
      name: 'Electron & Desktop Packaging',
      category: 'Tools & Technologies',
      context: 'Building desktop applications on macOS with custom frameless windowing, IPC channels, and local runtime packaging.',
      experienceNote: 'Electron main/preload integration, window state management, and macOS packaging (.dmg/.app).',
      usedIn: ['MetroFlow'],
    },
    {
      id: 'databases',
      name: 'PostgreSQL & Relational Databases',
      category: 'Tools & Technologies',
      context: 'Relational data modeling, SQL queries, schema normalization, and foreign key constraints.',
      experienceNote: 'Designing normalized schemas for campus events, career roadmaps, writing queries, and enforcing relational integrity.',
      usedIn: ['SkillSync', 'CampusPulse'],
    },
    {
      id: 'prisma',
      name: 'Prisma ORM & Relational Modeling',
      category: 'Tools & Technologies',
      context: 'Type-safe database modeling, schema migrations, composite keys, and relational queries with PostgreSQL 16.',
      experienceNote: 'Structuring relational schemas, explicit join models, cascade deletion rules, and aggregation queries.',
      usedIn: ['SkillSync'],
    },
    {
      id: 'git',
      name: 'Git, GitHub & Linux Workflow',
      category: 'Tools & Technologies',
      context: 'Version control, feature branching, code reviews, and Linux terminal workflow.',
      experienceNote: 'Git commands, branch workflows, pull requests, and command-line tooling.',
      usedIn: ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'figma',
      name: 'Figma & UI Prototyping',
      category: 'Tools & Technologies',
      context: 'UI wireframing, layout experimentation, and prototyping before writing code.',
      experienceNote: 'Creating mockups, planning component spacing, and testing color schemes.',
      usedIn: ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'rust',
      name: 'Rust & Systems Programming',
      category: 'Currently Learning',
      context: 'Learning memory safety, ownership concepts, and systems programming basics.',
      experienceNote: 'Studying Rust fundamentals, compiler checks, and building small command-line utilities.',
      usedIn: ['Independent Study', 'Command-Line Tools'],
    },
    {
      id: 'distributed',
      name: 'Distributed Systems & Caching',
      category: 'Currently Learning',
      context: 'Studying caching concepts, WebSockets, and real-time communication patterns.',
      experienceNote: 'Exploring Redis caching patterns, real-time message handling, and system design basics.',
      usedIn: ['Independent Study', 'System Architecture Study'],
    },
  ] as SkillItem[],

  projects: [
    {
      id: 'metroflow',
      index: '01',
      title: 'MetroFlow',
      subtitle: 'A standalone macOS music application featuring Liquid Glass design, intelligent radio, and Apple Silicon audio engine',
      category: 'macOS / Native',
      year: '2026',
      status: 'Version 1.0.0 — Release Candidate',
      shortDescription:
        'MetroFlow is a standalone macOS music application featuring a custom Liquid Glass-inspired interface, intelligent music recommendations, continuous radio, dynamic artwork themes, lyrics, listening statistics, and native macOS window behaviour.',
      fullOverview:
        'MetroFlow evolved from an exploratory music application concept into a fully realized standalone macOS desktop application reaching its 1.0.0 release-candidate milestone. Built on an Electron shell with a React and TypeScript frontend, it introduces a signature Liquid Glass-inspired interface that harmonizes dynamically with album artwork. Across its iterative development, the application progressed through substantial UI/UX redesigns, advancing from basic streaming to a dual-engine architecture combining an embedded player API with an optional Apple Silicon ARM64 libmpv CoreAudio engine when bundled. In clean distributions where libmpv is not bundled, the player operates seamlessly on embedded playback without requiring external C libraries. The architecture integrates continuous radio playback with automatic queue replenishment, an intelligent recommendation engine, synchronized lyrics with click-to-seek timestamp navigation for time-coded tracks, and transparent on-device listening statistics stored via client-side IndexedDB. Backend reliability and lifecycle management are anchored by an Electron-managed local Python service bridge on port 8765 running ytmusicapi, with build scripts supporting Astral\'s standalone Python distribution for self-contained desktop packaging.',
      problemStatement:
        'Many mainstream desktop music players suffer from bloated social feeds, high memory footprints, and rigid windowing, while lacking clean support for time-synced lyrics, automated continuous radio replenishment, transparent on-device listening statistics, or lightweight macOS mini-player integration.',
      engineeringSolution:
        'Redesigned and engineered MetroFlow into a high-performance macOS desktop application reaching Version 1.0.0 — Release Candidate status. Implemented a custom Liquid Glass interface with dynamic artwork theming, an intelligent recommendation engine with smart automix quick picks, automated radio replenishment, click-to-seek synchronized lyrics for timestamped tracks, native macOS window lifecycle behavior with in-app keyboard shortcuts, and a local Python bridge on port 8765 with standalone runtime bundling support.',
      image: metroflowHomeImg,
      screenshots: [
        {
          title: 'Home / Music Discovery',
          image: metroflowHomeImg,
          caption: 'Redesigned Liquid Glass home screen featuring personalized continue listening cards, smart automix quick picks, dynamic spotlights, and floating sidebar navigation.',
          annotations: [
            {
              id: 'mf-ann-1',
              number: 1,
              label: 'Liquid Glass Sidebar Navigation',
              description: 'Floating vertical navigation capsule providing rapid access to library, playlists, listening statistics, and preferences.',
              xPercent: 3,
              yPercent: 48,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'mf-ann-2',
              number: 2,
              label: 'Dynamic Spotlight & Flow Control',
              description: 'Contextual greeting card with ambient album art harmonization, flow pausing, personal radio, and taste tuning.',
              xPercent: 40,
              yPercent: 22,
              leaderDirection: 'bottom-left',
            },
            {
              id: 'mf-ann-3',
              number: 3,
              label: 'Smart Automix Quick Picks',
              description: 'Audio-first recommendation picks ranked from recent listening history, 7-day heavy rotation, and related song graphs.',
              xPercent: 35,
              yPercent: 72,
              leaderDirection: 'top-right',
            },
          ],
        },
        {
          title: 'Synchronized Lyrics',
          image: metroflowLyricsImg,
          caption: 'Expanded player view displaying high-resolution album artwork with spinning vinyl platter, interactive synchronized lyrics with click-to-seek for timestamped tracks, and continuous radio controls.',
          annotations: [
            {
              id: 'mf-ann-4',
              number: 1,
              label: 'Interactive Synchronized Lyrics',
              description: 'Time-coded lyrics parser with illuminated glass active-line highlight and instant click-to-seek timestamp navigation for tracks with available timecodes.',
              xPercent: 65,
              yPercent: 58,
              leaderDirection: 'bottom-left',
            },
            {
              id: 'mf-ann-5',
              number: 2,
              label: 'Vinyl Artwork Showcase',
              description: 'High-resolution album artwork with vinyl record styling, dynamic theme color harmonization, and millisecond transport controls.',
              xPercent: 25,
              yPercent: 46,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'mf-ann-6',
              number: 3,
              label: 'Continuous Radio & Mini-Player',
              description: 'Seed-based radio mode status banner, up-next queue drawer access, and dockable mini-player toggle.',
              xPercent: 72,
              yPercent: 7,
              leaderDirection: 'bottom-left',
            },
          ],
        },
        {
          title: 'Settings / About',
          image: metroflowSettingsImg,
          caption: 'Settings dashboard displaying in-app macOS keyboard shortcuts, on-device IndexedDB storage telemetry, example user listening statistics, and v1.0.0 ARM64 release specifications.',
          annotations: [
            {
              id: 'mf-ann-7',
              number: 1,
              label: 'macOS Keyboard Shortcuts',
              description: 'In-app hotkey bindings matching macOS conventions: Space for play/pause, arrow keys for seeking, ⌘K for quick search, and ⌘L for library navigation.',
              xPercent: 42,
              yPercent: 25,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'mf-ann-8',
              number: 2,
              label: 'On-Device Statistics & Private Storage',
              description: 'Tracks user listening statistics (example session data shown: play completions and listen duration) stored entirely client-side in IndexedDB with JSON export/import and zero external analytics tracking.',
              xPercent: 42,
              yPercent: 56,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'mf-ann-9',
              number: 3,
              label: 'v1.0.0 Release Candidate Runtime',
              description: 'Apple Silicon ARM64 runtime details showcasing YouTube player API compliance, local Python bridge, and optional libmpv integration when bundled.',
              xPercent: 35,
              yPercent: 78,
              leaderDirection: 'top-left',
            },
          ],
        },
      ],
      technologies: ['Electron', 'React', 'TypeScript', 'Node.js', 'Python Bridge', 'libmpv CoreAudio', 'Tailwind CSS'],
      highlights: [
        'Reached Version 1.0.0 — Release Candidate with a custom macOS Liquid Glass-inspired design system',
        'Continuous radio with automatic replenishment when queue drops to 5 tracks & smart automix quick picks',
        'Synchronized lyrics with click-to-seek timestamp navigation for time-coded tracks and dynamic album themes',
        'Dual audio architecture pairing embedded streaming with an optional Apple Silicon libmpv CoreAudio engine when bundled',
        'Transparent on-device listening statistics, IndexedDB caching, and JSON library export/import with 100% privacy',
      ],
      architecture: [
        {
          layer: 'Desktop & UI Shell',
          component: 'Electron & React (TypeScript)',
          responsibility: 'Renders frameless macOS Liquid Glass interface, sidebar navigation, dynamic artwork themes, in-app keyboard shortcuts, and dockable mini-player.',
        },
        {
          layer: 'Audio Pipeline',
          component: 'Dual Engine (Embedded Player & Optional libmpv)',
          responsibility: 'Coordinates compliant embedded streaming alongside an optional Apple Silicon ARM64 libmpv CoreAudio engine when bundled, plus Web Audio Studio Synth.',
        },
        {
          layer: 'Discovery & Backend Services',
          component: 'Local Python Bridge & YouTube API (Port 8765)',
          responsibility: 'Communicates via localhost port 8765 using ytmusicapi and YouTube Data API v3, with standalone Python runtime bundling support.',
        },
        {
          layer: 'Storage & Telemetry',
          component: 'IndexedDB & Local State',
          responsibility: 'Maintains 100% private on-device listening statistics, queue history, and JSON library export/import without remote tracking.',
        },
      ],
      specifications: [
        {
          label: 'Target Architecture',
          value: 'Apple Silicon ARM64',
          detail: 'v1.0.0 Release Candidate',
        },
        {
          label: 'Desktop Shell',
          value: 'Electron + React 18',
          detail: 'Liquid Glass Frameless Windowing & Hotkeys',
        },
        {
          label: 'Audio Pipeline',
          value: 'Embedded Player + Optional libmpv',
          detail: 'CoreAudio Buffers When Bundled',
        },
        {
          label: 'Frontend Stack',
          value: 'React & TypeScript',
          detail: 'Tailwind CSS & Glassmorphism',
        },
        {
          label: 'Backend Runtime',
          value: 'Python Bridge (Port 8765)',
          detail: 'ytmusicapi & Standalone Python Bundler',
        },
        {
          label: 'Storage & Privacy',
          value: 'IndexedDB & Local Cache',
          detail: '100% On-Device Listening Analytics',
        },
      ],
      technicalDecisions: [
        {
          title: 'Redesign to Version 1.0.0 — Release Candidate with Liquid Glass Interface',
          decision: 'Re-engineered the interface from initial prototypes into a production-grade macOS desktop app using custom Liquid Glass styling and dynamic artwork harmonization.',
          rationale:
            'Delivers an authentic macOS look and feel, ensuring high visual elegance, intuitive window interactions, and seamless playback immersion.',
        },
        {
          title: 'Continuous Radio Replenishment & Intelligent Recommendations',
          decision: 'Implemented an automatic radio queue replenishment algorithm that generates related tracks when the queue drops to 5 or fewer items.',
          rationale:
            'Maintains an uninterrupted listening flow without requiring manual playlist intervention, pairing seed tracks with automated recommendation graphs.',
        },
        {
          title: 'Interactive Synchronized Lyrics & Timestamp Seeking',
          decision: 'Engineered an indexed time-coded lyrics parser synchronized with playback clock events, with automatic fallback for tracks without timestamps.',
          rationale:
            'Keeps lyrics smoothly highlighted in an illuminated glass pill while enabling instant click-to-seek timestamp navigation for time-coded songs without frame drops.',
        },
        {
          title: 'Optional libmpv Packaging & Compliant Fallback',
          decision: 'Architected libmpv as an optional native audio engine for local CoreAudio buffers when bundled, with the player operating reliably on compliant embedded streaming in clean distributions.',
          rationale:
            'Ensures the application remains completely functional across diverse deployment targets without hard dependencies on host C-dynamic libraries.',
        },
        {
          title: 'On-Device Privacy & Listening Telemetry',
          decision: 'Engineered listening statistics (plays, completions, total time) and library storage using browser-standard IndexedDB and local JSON backup.',
          rationale:
            'Guarantees complete user privacy with zero cloud telemetry dependencies, empowering users to export and import their library anytime.',
        },
      ],
      challengesAndLearnings: [
        {
          title: 'Transitioning from Prototype to v1.0.0 Desktop Release Candidate',
          challenge:
            'Managing the architectural transition from an early audio prototype into a stable macOS desktop application with robust IPC, background processes, and native windowing.',
          solution:
            'Engineered clean Electron lifecycle handlers, isolated the Python service bridge on port 8765, and packaged the runtime for Apple Silicon ARM64 with standalone Python runtime bundling.',
          learning:
            'Learned desktop software engineering practices, lifecycle management, and native macOS window integration.',
        },
        {
          title: 'Optional Native Library Policy & Dual Engine Architecture',
          challenge:
            'Supporting optional Apple Silicon ARM64 libmpv CoreAudio output when available on host systems without breaking or crashing clean distributions where the dynamic library is unbundled.',
          solution:
            'Implemented an explicit packaging policy and provenance check, quarantining unverified binaries and defaulting cleanly to embedded streaming playback.',
          learning:
            'Gained practical experience designing fallback-resilient desktop architectures that balance high-performance native libraries with cross-machine compatibility.',
        },
        {
          title: 'Continuous Radio State & Dual Queue Management',
          challenge:
            'Managing distinct state between user-curated Normal Queues and infinite auto-replenished Radio Mode queues without losing track history.',
          solution:
            'Architected a dual-state queue controller with automatic replenishment triggers when remaining tracks count drops below 5.',
          learning:
            'Deepened practical knowledge of finite state machines and media queue synchronization in complex frontend applications.',
        },
      ],
      metrics: [
        { label: 'Status', value: 'v1.0.0 RC' },
        { label: 'Platform', value: 'macOS ARM64' },
        { label: 'Design', value: 'Liquid Glass' },
      ],
      githubUrl: 'https://github.com/divyanshh69/MetroFlow-MAC',
    },
    {
      id: 'skillsync',
      index: '02',
      title: 'SkillSync',
      subtitle: 'A full-stack career roadmap and skill progression platform for student developers',
      category: 'Full-Stack Web',
      year: '2026',
      status: 'Active Project',
      shortDescription:
        'A full-stack career preparation and skill progression platform that connects student career goals with structured milestone roadmaps, project evidence deliverables, and readiness analytics.',
      fullOverview:
        'SkillSync is an engineering career companion designed to help computer science students and early-career builders track skills, manage project evidence, and navigate structured learning roadmaps. Built with a React/TypeScript client, a Node.js/Express REST API, PostgreSQL 16, and Prisma ORM, it replaces disconnected spreadsheets with a normalized relational model that links individual skills to completed projects, milestone roadmap phases, and career readiness percentages.',
      problemStatement:
        'Students and early-career developers frequently track their learning across scattered bookmarks, arbitrary to-do lists, and disconnected repositories without a structured way to assess real career readiness or demonstrate concrete project evidence for specific competencies.',
      engineeringSolution:
        'Engineered a full-stack platform featuring a normalized relational schema with Prisma ORM and PostgreSQL 16. Implemented a five-phase career roadmap engine, project portfolio manager with skill tagging, and an aggregated readiness calculator that evaluates completed skills alongside linked repository deliverables.',
      image: skillsyncHomeImg,
      screenshots: [
        {
          title: 'Dashboard',
          image: skillsyncHomeImg,
          caption:
            'Student home overview displaying active career goals, recommended next-step actions (e.g. Component Testing with Vitest), priority checklists, and progress metrics (45% readiness, 4 of 23 skills, 3 linked portfolio projects).',
          annotations: [
            {
              id: 'ss-ann-1',
              number: 1,
              label: 'Next Step Recommendation',
              description: 'Personalized action item: Component Testing with Vitest and checklist tracking.',
              xPercent: 48,
              yPercent: 32,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'ss-ann-2',
              number: 2,
              label: 'Readiness Calculator (45%)',
              description: 'Weighted formula weighting project-evidenced skills (1.5x) over passive theory.',
              xPercent: 36,
              yPercent: 84,
              leaderDirection: 'top-right',
            },
            {
              id: 'ss-ann-3',
              number: 3,
              label: 'Active Phase Telemetry',
              description: 'Current focus: Phase 2 Reactive Web & State Architecture milestones.',
              xPercent: 74,
              yPercent: 90,
              leaderDirection: 'top-left',
            },
          ],
        },
        {
          title: 'Career Roadmap',
          image: skillsyncRoadmapImg,
          caption:
            'Five-phase milestone roadmap view detailing curriculum progress from Core Web Foundations through Reactive Web Architecture, Backend APIs, Scalability, and Cloud Delivery, with real-time phase completion status.',
          annotations: [
            {
              id: 'ss-ann-4',
              number: 1,
              label: 'Phase 1: Web Foundations',
              description: 'Completed milestones: DOM manipulation, semantic HTML, and modern JS.',
              xPercent: 50,
              yPercent: 26,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'ss-ann-5',
              number: 2,
              label: 'Phase 2: Reactive Web',
              description: 'Current study focus: React 18 component patterns and client state management.',
              xPercent: 50,
              yPercent: 45,
              leaderDirection: 'bottom-left',
            },
            {
              id: 'ss-ann-6',
              number: 3,
              label: 'Phases 3-5: Relational & Cloud',
              description: 'Upcoming progression: Express REST APIs, PostgreSQL schemas, and CI/CD pipelines.',
              xPercent: 50,
              yPercent: 80,
              leaderDirection: 'top-right',
            },
          ],
        },
        {
          title: 'My Projects',
          image: skillsyncProjectsImg,
          caption:
            'Project evidence directory (TaskForge CLI, ShopNest Storefront, DevPulse Analytics) linking concrete codebase deliverables directly to demonstrated skill proficiencies and GitHub repositories.',
          annotations: [
            {
              id: 'ss-ann-7',
              number: 1,
              label: 'TaskForge CLI',
              description: 'Node.js terminal tool demonstrating pre-commit hooks, TypeScript, and CLI UX.',
              xPercent: 32,
              yPercent: 38,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'ss-ann-8',
              number: 2,
              label: 'ShopNest Storefront',
              description: 'Headless e-commerce client demonstrating Zustand state sync across tabs.',
              xPercent: 68,
              yPercent: 38,
              leaderDirection: 'bottom-left',
            },
            {
              id: 'ss-ann-9',
              number: 3,
              label: 'DevPulse Analytics',
              description: 'Productivity analytics dashboard evidencing React 18 & custom SVG visual charts.',
              xPercent: 32,
              yPercent: 78,
              leaderDirection: 'top-right',
            },
          ],
        },
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM'],
      highlights: [
        'Five-phase structured career roadmap mapping foundational web concepts through production systems',
        'Normalized 7-model PostgreSQL schema with Prisma ORM linking users, skills, projects, and roadmaps',
        'Deterministic readiness calculation in utils/readiness.ts weighting project-evidenced skills (1.5x) over theory',
        'GitHub repository analyzer inspecting package.json & manifests to suggest linked skill evidence',
      ],
      architecture: [
        {
          layer: 'Frontend Application',
          component: 'React 18 + TypeScript Client (Vite)',
          responsibility:
            'Renders interactive roadmap milestone trees, project evidence cards, progress bars, and priority task checklists.',
        },
        {
          layer: 'Backend API Service',
          component: 'Node.js & Express REST Service',
          responsibility:
            'Exposes endpoints for student profiles, roadmap progress, GitHub repository analysis, and milestone phase transitions.',
        },
        {
          layer: 'Data & ORM Layer',
          component: 'PostgreSQL 16 & Prisma ORM',
          responsibility:
            'Enforces relational integrity across 7 models (User, Skill, UserSkill, Project, ProjectSkill, RoadmapPhase, PhaseSkill).',
        },
      ],
      specifications: [
        {
          label: 'Platform Architecture',
          value: 'Full-Stack Client-Server',
          detail: 'RESTful API + Single Page App',
        },
        {
          label: 'Frontend Stack',
          value: 'React 18 & TypeScript',
          detail: 'Vite + Tailwind CSS UI',
        },
        {
          label: 'Backend Runtime',
          value: 'Node.js & Express',
          detail: 'Type-Safe REST Controllers',
        },
        {
          label: 'Database',
          value: 'PostgreSQL 16',
          detail: 'Prisma ORM Managed Schema',
        },
        {
          label: 'Readiness Formula',
          value: 'Weighted Multiplier',
          detail: '1.5x Evidenced + 0.8x Theory + 0.3x In-Progress',
        },
        {
          label: 'Roadmap Structure',
          value: '5 Milestone Phases',
          detail: 'Phase 1 Foundations to Phase 5 Cloud',
        },
      ],
      technicalDecisions: [
        {
          title: 'Prisma ORM with PostgreSQL 16 & Parameterized Queries',
          decision:
            'Selected PostgreSQL 16 with Prisma ORM to define a type-safe relational schema with explicit join tables and parameterized query generation.',
          rationale:
            'SkillSync requires complex many-to-many relationships: a skill can be required by multiple roadmap phases and evidenced by multiple user projects. Prisma provides auto-generated TypeScript types, schema migrations, and parameterized query generation for relational operations, reducing manual join boilerplate while keeping queries type-checked against the database schema.',
        },
        {
          title: 'Relational Model for Skill-to-Project Evidence',
          decision:
            'Structured explicit relation tables (UserSkill, ProjectSkill, PhaseSkill) linking student progress directly to tangible project deliverables.',
          rationale:
            'Rather than allowing self-reported checkboxes without proof, the schema models projects as proof of competence. Completing a skill requires associating it with an actual project deliverable, grounding career progress in real engineering work.',
        },
        {
          title: 'Deterministic Weighted Readiness Calculation (utils/readiness.ts)',
          decision:
            'Implemented a deterministic backend readiness algorithm in server/src/utils/readiness.ts weighting project-evidenced skills over passive completion.',
          rationale:
            'Calculates points = (evidencedSkills * 1.5) + (theoryOnlySkills * 0.8) + (inProgressSkills * 0.3) against maxPossible = (totalSkills * 1.5). By rewarding project-evidenced skills with a 1.5x multiplier compared to 0.8x for unevidenced completion and 0.3x for in-progress work, the platform grounds student progress in tangible repository deliverables rather than passive checkboxes.',
        },
      ],
      challengesAndLearnings: [
        {
          title: 'Relational Modeling of Many-to-Many Skill Evidence',
          challenge:
            'Modeling the intricate relationships between users, skills, roadmap phases, and projects without redundant tables, circular dependencies, or orphan records.',
          solution:
            'Designed a normalized Prisma schema with explicit join models (UserSkill, ProjectSkill, PhaseSkill) with composite unique constraints (@@unique([projectId, skillId])) and cascade deletion rules.',
          learning:
            'Deepened my mastery of relational database design, composite indexing, and Prisma schema modeling for complex domain problems.',
        },
        {
          title: 'Preventing N+1 Query Bottlenecks in Dashboard Aggregations',
          challenge:
            'Fetching dashboard overview data required querying user goals, milestone phase statuses, skill counts, and linked project records, which initially triggered multiple nested database lookups.',
          solution:
            'Leveraged Prisma’s fluent query API with selective include clauses and database-level aggregate counts (_count: { select: { skills: true } }), consolidating related data fetching into structured relational lookups.',
          learning:
            'Learned how ORM abstractions affect query performance and how to inspect generated SQL queries to keep API endpoints responsive.',
        },
        {
          title: 'Hierarchical State Management for Milestone Roadmap Progression',
          challenge:
            'Managing interactive phase accordions, task checkoffs, and real-time progress updates across the UI without desynchronizing the client state from the database.',
          solution:
            'Implemented optimistic UI updates in React backed by resilient API error boundaries, paired with clean modular hooks that coordinate phase transition mutations.',
          learning:
            'Gained practical experience managing complex hierarchical UI state in React, handling asynchronous mutations smoothly, and designing clear, intuitive user feedback loops.',
        },
      ],
      metrics: [
        { label: 'Architecture', value: 'Full-Stack' },
        { label: 'Database', value: 'PostgreSQL 16' },
        { label: 'ORM', value: 'Prisma ORM' },
      ],
      githubUrl: 'https://github.com/divyanshh69/SkillSync',
    },
    {
      id: 'campuspulse',
      index: '03',
      title: 'CampusPulse',
      subtitle: 'A college club management and campus event operations platform',
      category: 'Full-Stack Web',
      year: '2026',
      status: 'Active College Project',
      shortDescription:
        'A college club management platform designed to centralize student society registrations, event schedules, and member management in one web platform.',
      fullOverview:
        'CampusPulse was born out of observing how university clubs struggle with scattered communication across group chats and shared spreadsheets. The platform provides club leads with a clear dashboard to post events, manage member lists, and check for venue availability without schedule clashes.',
      problemStatement:
        'Student societies face frequent venue clashes, scattered event notices across multiple group chats, and manual attendance tracking with spreadsheets.',
      engineeringSolution:
        'Developed a full-stack web application with role-based permissions, an event scheduling calendar with venue conflict detection, and student RSVP tracking.',
      image: campuspulseDashboardImg,
      screenshots: [
        {
          title: 'Dashboard',
          image: campuspulseDashboardImg,
          caption: 'Executive club operations overview showing active member headcount, upcoming event schedules, average attendance rates, and live operational activity feeds.',
          annotations: [
            {
              id: 'cp-ann-1',
              number: 1,
              label: 'Member Operations KPI',
              description: 'Active society roster metrics and aggregate attendance percentages.',
              xPercent: 30,
              yPercent: 22,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'cp-ann-2',
              number: 2,
              label: 'Conflict-Aware Schedule',
              description: 'Calendar view displaying upcoming society meetings and scheduled campus events.',
              xPercent: 68,
              yPercent: 48,
              leaderDirection: 'top-left',
            },
            {
              id: 'cp-ann-3',
              number: 3,
              label: 'Live Activity Feeds',
              description: 'Updates on student RSVP registrations and upcoming society event announcements.',
              xPercent: 48,
              yPercent: 82,
              leaderDirection: 'top-right',
            },
          ],
        },
        {
          title: 'Member Management',
          image: campuspulseMemberManagementImg,
          caption: 'PostgreSQL-backed member directory with department filters, attendance percentages, credit tracking, and an interactive member profile editing modal.',
          annotations: [
            {
              id: 'cp-ann-4',
              number: 1,
              label: 'Relational Member Directory',
              description: 'PostgreSQL-backed student roster with department filtering and attendance rates.',
              xPercent: 48,
              yPercent: 40,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'cp-ann-5',
              number: 2,
              label: 'Role-Based Access',
              description: 'Separated permissions for club organizers and student members.',
              xPercent: 74,
              yPercent: 32,
              leaderDirection: 'bottom-left',
            },
          ],
        },
        {
          title: 'Platform Settings',
          image: campuspulsePlatformSettingsImg,
          caption: 'Administrative settings panel for configuring club parameters, term dates, minimum attendance thresholds, and inspecting JWT authentication privileges.',
          annotations: [
            {
              id: 'cp-ann-6',
              number: 1,
              label: 'Society Governance',
              description: 'Administrative parameters for academic terms and minimum attendance thresholds.',
              xPercent: 44,
              yPercent: 38,
              leaderDirection: 'bottom-right',
            },
            {
              id: 'cp-ann-7',
              number: 2,
              label: 'JWT Privilege Verification',
              description: 'Stateless authentication middleware protecting administrative endpoints.',
              xPercent: 72,
              yPercent: 62,
              leaderDirection: 'top-left',
            },
          ],
        },
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
      highlights: [
        'Role-based permissions separating club organizers and student members',
        'Conflict-aware event calendar that checks for overlapping event dates and campus locations',
        'Student event discovery with category filtering and one-click RSVP registration',
        'Normalized PostgreSQL schema connecting student clubs, event dates, and member records',
      ],
      architecture: [
        {
          layer: 'Frontend Application',
          component: 'React + TypeScript Client',
          responsibility: 'Provides responsive dashboards for event browsing, club discovery, and administrative management.',
        },
        {
          layer: 'Backend API',
          component: 'Express REST Service',
          responsibility: 'Validates event details, checks for venue scheduling conflicts, and manages authentication.',
        },
        {
          layer: 'Database Layer',
          component: 'PostgreSQL Relational Database',
          responsibility: 'Stores structured records for student societies, event schedules, and student registrations.',
        },
      ],
      specifications: [
        {
          label: 'Architecture',
          value: 'Full-Stack Client-Server',
          detail: 'RESTful Service Layer',
        },
        {
          label: 'Frontend Stack',
          value: 'React & TypeScript',
          detail: 'Tailwind CSS Responsive UI',
        },
        {
          label: 'Backend API',
          value: 'Node.js & Express',
          detail: 'Routing & JWT Middleware',
        },
        {
          label: 'Database',
          value: 'PostgreSQL',
          detail: 'Relational Schema & Constraints',
        },
        {
          label: 'Validation',
          value: 'Conflict Detection',
          detail: 'Schedule Clash Prevention',
        },
        {
          label: 'Permissions',
          value: 'Role-Based Access',
          detail: 'Organizers & Student Members',
        },
      ],
      technicalDecisions: [
        {
          title: 'Relational Database Schema (PostgreSQL)',
          decision: 'Structured data in PostgreSQL with relational foreign keys across clubs, events, and registrations.',
          rationale:
            'Campus club operations rely on relational links: events belong to clubs, event dates are scheduled with location details, and students register for specific events. Relational foreign keys keep data consistent.',
        },
        {
          title: 'Role-Based Permissions for Campus Societies',
          decision: 'Implemented custom middleware to separate permissions between club organizers and student members.',
          rationale:
            'Separates event creation and society administrative privileges from standard student attendance, keeping club controls organized.',
        },
        {
          title: 'Event Conflict Validation Logic',
          decision: 'Added checks to verify date and location availability before confirming an event.',
          rationale:
            'Prevents scheduling clashes by querying overlapping event times for shared campus locations before saving records to the database.',
        },
      ],
      challengesAndLearnings: [
        {
          title: 'Event Scheduling Clashes & Relational Data Integrity',
          challenge:
            'Student societies frequently suffered from overlapping event schedules and uncoordinated dates across separate group chats and spreadsheets.',
          solution:
            'Designed a normalized PostgreSQL schema with relational foreign keys linking clubs, events, and registrations, paired with backend conflict-detection logic that validates time and location availability before confirming events.',
          learning:
            'Learned how to write relational SQL queries to detect overlapping time ranges and realized the importance of enforcing data constraints directly at the database layer.',
        },
        {
          title: 'Role-Based Permissions for Campus Societies',
          challenge:
            'Safely separating administrative privileges (club organizers) from student member actions without duplicating route logic or creating security loopholes.',
          solution:
            'Built custom Express authentication middleware that verifies JWT claims and evaluates permissions before granting access to sensitive actions like credit distribution or platform settings.',
          learning:
            'Deepened my understanding of stateless session management, role verification middleware, and how to protect REST endpoints cleanly.',
        },
        {
          title: 'Full-Stack State Synchronization for Member Roster Updates',
          challenge:
            'Keeping student attendance percentages, merit credits, and profile edits immediately consistent across the React frontend and PostgreSQL backend without full-page reloads.',
          solution:
            'Structured modular API controllers with input validation and clean React custom hooks that handle optimistic UI updates and gracefully handle API error states.',
          learning:
            'Gained practical experience coordinating full-stack data flow, managing asynchronous request states, and structuring clean API endpoints for relational updates.',
        },
      ],
      metrics: [
        { label: 'Architecture', value: 'Full-Stack' },
        { label: 'Stack', value: 'React / Node.js' },
        { label: 'Database', value: 'PostgreSQL' },
      ],
      githubUrl: 'https://github.com/divyanshh69/CampusPulse',
    },
  ] as ProjectItem[],

  journey: [
    {
      id: 'j-edu-1',
      period: 'Aug 2025 — Present',
      title: 'B.Tech in Computer Science & Engineering (2nd Year)',
      organization: 'Medi-Caps University',
      category: 'Education',
      summary:
        'Enrolled in August 2025 and currently in 2nd year, building a strong academic foundation in core computer science fundamentals while actively developing practical software projects.',
      outcomes: [
        'Studying core CS subjects including Data Structures, Object-Oriented Programming, and Database Systems',
        'Directly applying classroom theory to practical software builds like MetroFlow, SkillSync, and CampusPulse',
      ],
    },
    {
      id: 'j-club-1',
      period: 'Aug 2025 — Present',
      title: 'Co-head, Promotional Team',
      organization: 'Yog & Spiritual Club, Medi-Caps University',
      category: 'Club Roles',
      summary:
        'Serving as Co-head of the Promotional Team, leading campus event announcements, scheduling coordination, and promotional outreach for university wellness sessions. Collaborating closely with student volunteers and faculty advisors.',
      outcomes: [
        'Coordinated campus promotional schedules and announcement campaigns for collegiate sessions',
        'Gained hands-on experience in student team leadership, inter-department communication, and event logistics',
      ],
    },
    {
      id: 'j-proj-campuspulse',
      period: 'Late 2025 — 2026',
      title: 'Built CampusPulse Platform',
      organization: 'College Project',
      category: 'Projects',
      summary:
        'Designed and built a college club management web application to centralize society event discovery, student registrations, and member management.',
      outcomes: [
        'Implemented role-based permissions, venue conflict checks, and event registration flows',
        'Structured modular React components and an Express REST API with PostgreSQL',
      ],
    },
    {
      id: 'j-hack-1',
      period: '2026',
      title: 'Collegiate Hackathon Participation',
      organization: 'Collegiate Hackathon Sprints',
      category: 'Hackathons',
      summary:
        'Participated in collegiate hackathon sprints, teaming up with peers to design, build, and present functional full-stack prototypes under tight deadlines.',
      outcomes: [
        'Collaborated on full-stack application prototypes under sprint constraints',
        'Gained practical experience in team coordination, rapid debugging, and project presentation',
      ],
    },
    {
      id: 'j-proj-skillsync',
      period: '2026',
      title: 'Engineered SkillSync Career Platform',
      organization: 'Independent Project',
      category: 'Projects',
      summary:
        'Built a full-stack career roadmap and skill progression platform with React, TypeScript, Node.js, PostgreSQL 16, and Prisma ORM.',
      outcomes: [
        'Modeled normalized relational schema with explicit join tables linking skills, projects, and roadmaps',
        'Built 5-phase career milestone roadmap with deterministic readiness analytics and project evidence mapping',
      ],
    },
    {
      id: 'j-proj-metroflow',
      period: '2026',
      title: 'Created MetroFlow for macOS',
      organization: 'Independent Project',
      category: 'Projects',
      summary:
        'Evolved MetroFlow into a Version 1.0.0 Release Candidate standalone macOS music application featuring Liquid Glass design, continuous radio replenishment, synchronized lyrics, and Apple Silicon ARM64 audio.',
      outcomes: [
        'Engineered custom Liquid Glass UI, continuous radio replenishment, and on-device listening statistics',
        'Integrated dual audio pipeline pairing streaming discovery with Apple Silicon ARM64 libmpv CoreAudio',
      ],
    },
    {
      id: 'j-goal-future',
      period: 'Current — Future',
      title: 'Next Step: Software Engineering Roles & Practical Growth',
      organization: 'Career Roadmap',
      category: 'Future Goals',
      summary:
        'Seeking software engineering internship and entry-level opportunities to contribute to real-world software, learn team workflows, and deepen engineering skills.',
      outcomes: [
        'Continuing to build practical software tools and independent systems',
        'Deepening practical knowledge of backend services and system programming',
      ],
    },
  ] as JourneyItem[],

  achievements: [
    {
      id: 'ach-1',
      category: 'Academic',
      title: 'B.Tech CSE Undergraduate Enrollment',
      issuerOrEvent: 'Medi-Caps University',
      date: 'Aug 2025',
      detail:
        'Commenced 4-year undergraduate degree in Computer Science & Engineering, building a core foundation in Data Structures, Algorithms, and Database Systems.',
      credentialRef: 'Degree Track',
    },
    {
      id: 'ach-2',
      category: 'Projects',
      title: 'MetroFlow macOS Player — v1.0.0 Release Candidate',
      issuerOrEvent: 'Independent Desktop Build',
      date: '2026',
      detail:
        'Engineered and redesigned a standalone desktop music application for macOS with Liquid Glass UI, continuous radio, synchronized lyrics, and libmpv CoreAudio playback.',
      credentialRef: 'Desktop Build',
    },
    {
      id: 'ach-3',
      category: 'Projects',
      title: 'CampusPulse Web Platform',
      issuerOrEvent: 'Collegiate Web Build',
      date: '2026',
      detail:
        'Developed full-stack club management platform with role-based permissions, venue conflict validation, and normalized PostgreSQL database.',
      credentialRef: 'College Build',
    },
    {
      id: 'ach-4',
      category: 'Hackathons',
      title: 'Collegiate Hackathon Rapid Prototyping',
      issuerOrEvent: 'Collegiate Hackathon Sprints',
      date: '2026',
      detail:
        'Teamed up with fellow student developers during hackathon sprints, rapidly turning conceptual designs into functional software prototypes under time pressure.',
      credentialRef: 'Sprint Participant',
    },
  ] as AchievementItem[],

  beyondResume: {
    intro:
      'A candid overview of my engineering practices, what I focus on when building software, and where I am actively working to grow.',
    strengths: [
      {
        id: 'str-1',
        title: 'End-to-End Data Flow',
        description:
          'I focus on how backend schemas connect to frontend state. When designing tables in PostgreSQL or models in Prisma, I plan how client components will fetch, cache, and render the records cleanly.',
        evidence: 'Applied in SkillSync’s Prisma schema, CampusPulse’s event schedules, and MetroFlow’s local playback state.',
      },
      {
        id: 'str-2',
        title: 'Interface Ergonomics & Performance',
        description:
          'I care about interface responsiveness, consistent spacing, readable typography, keyboard navigation, and avoiding unnecessary component re-renders.',
        evidence: 'Demonstrated in MetroFlow’s Mac mini-player and interactive synced lyrics.',
      },
      {
        id: 'str-3',
        title: 'Independent Project Development',
        description:
          'I enjoy breaking requirements down into schemas, REST endpoints, and modular UI components—taking a project from an empty folder to a functioning build.',
        evidence: 'Built MetroFlow, SkillSync, and CampusPulse end-to-end.',
      },
      {
        id: 'str-4',
        title: 'Type Safety & Modular Structure',
        description:
          'I write typed TypeScript with clear separation between data models, API controllers, and presentation components.',
        evidence: 'Strict type safety across MetroFlow, SkillSync, and CampusPulse codebases.',
      },
    ] as StrengthItem[],

    growthAreas: [
      {
        id: 'grw-1',
        title: 'Production Backend Deployment & DevOps',
        honestReflection:
          'As an undergraduate, most of my backend projects have run in local development or simple server environments. I am eager to gain more experience with containerization, CI/CD pipelines, and cloud services.',
        activeActionPlan:
          'Currently learning Docker basics and practicing automated testing and deployment for CampusPulse and SkillSync.',
      },
      {
        id: 'grw-2',
        title: 'Balancing Polish with Fast Shipping',
        honestReflection:
          'Because I enjoy interface polish and clean design, I sometimes spend extra time tweaking visual details before shipping an initial working version.',
        activeActionPlan:
          'Practicing milestone timeboxing: building the essential functional features first, then adding polish in dedicated passes.',
      },
      {
        id: 'grw-3',
        title: 'Deepening Systems & C++ Programming',
        honestReflection:
          'While I feel comfortable with TypeScript, React, and Python, I want to build stronger intuition around low-level memory layout, pointers, and systems programming.',
        activeActionPlan:
          'Actively practicing C++ data structures and exploring operating system concepts through university coursework and problem sets.',
      },
    ] as GrowthAreaItem[],
  },
};
