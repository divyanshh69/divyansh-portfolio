const metroflowHomeImg = new URL('../assets/images/metroflow-home.png', import.meta.url).href;
const metroflowLyricsImg = new URL('../assets/images/metroflow-synchronized-lyrics.png', import.meta.url).href;
const metroflowSettingsImg = new URL('../assets/images/metroflow-settings-about.png', import.meta.url).href;
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

export interface ProjectScreenshot {
  title: string;
  image: string;
  caption: string;
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
    title: 'Computer Science Engineering Student · Developer · Builder',
    headline: 'Designing and building native macOS and full-stack web applications.',
    email: 'divyanshnayak713@gmail.com',
    github: 'https://github.com/divyanshh69',
    linkedin: 'https://www.linkedin.com/in/divyansh-nayak-703390370/',
  },

  about: {
    lead: 'Software engineering to me is about learning by building—taking ideas from classroom theory and turning them into practical, functional tools for real people.',
  },

  skills: [
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Programming',
      context: 'Type-safe application development across frontend React components and backend Node.js services.',
      experienceNote: 'Strict typing, generic helpers, API contract interfaces, and modular component props.',
      usedIn: ['MetroFlow', 'CampusPulse', 'Personal Portfolio'],
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
      context: 'Studying Swift language fundamentals and SwiftUI for native macOS interface prototyping.',
      experienceNote: 'Exploring Swift syntax, SwiftUI view hierarchies, and macOS UI patterns.',
      usedIn: ['macOS UI Prototyping', 'Independent Study'],
    },
    {
      id: 'react',
      name: 'React',
      category: 'Web Development',
      context: 'Building interactive user interfaces, single-page web applications, and custom hooks with Vite.',
      experienceNote: 'Functional components, hooks, state management, and responsive layouts.',
      usedIn: ['MetroFlow', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS & Design Systems',
      category: 'Web Development',
      context: 'Responsive styling, dark mode UI theming, and consistent layout design.',
      experienceNote: 'Utility classes, custom CSS variables, responsive breakpoints, and clean component styling.',
      usedIn: ['MetroFlow', 'CampusPulse', 'Personal Portfolio'],
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
      usedIn: ['CampusPulse'],
    },
    {
      id: 'electron',
      name: 'Electron & Desktop Packaging',
      category: 'Tools & Technologies',
      context: 'Building desktop applications on macOS with custom frameless windowing, IPC channels, and native packaging.',
      experienceNote: 'Electron main/preload integration, window state management, and macOS packaging (.dmg/.app).',
      usedIn: ['MetroFlow'],
    },
    {
      id: 'databases',
      name: 'PostgreSQL & Relational Databases',
      category: 'Tools & Technologies',
      context: 'Relational data modeling, SQL queries, schema normalization, and foreign key constraints.',
      experienceNote: 'Designing normalized schemas for campus events and clubs, writing queries, and enforcing relational integrity.',
      usedIn: ['CampusPulse'],
    },
    {
      id: 'git',
      name: 'Git, GitHub & Linux Workflow',
      category: 'Tools & Technologies',
      context: 'Version control, feature branching, code reviews, and Linux terminal workflow.',
      experienceNote: 'Git commands, branch workflows, pull requests, and command-line tooling.',
      usedIn: ['MetroFlow', 'CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'figma',
      name: 'Figma & UI Prototyping',
      category: 'Tools & Technologies',
      context: 'UI wireframing, layout experimentation, and prototyping before writing code.',
      experienceNote: 'Creating mockups, planning component spacing, and testing color schemes.',
      usedIn: ['MetroFlow', 'CampusPulse', 'Personal Portfolio'],
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
      subtitle: 'A standalone macOS music streaming and studio synth application optimized for Apple Silicon',
      category: 'macOS / Native',
      year: '2026',
      status: 'Active Project',
      shortDescription:
        'A macOS desktop music application built with Electron, React, and a local Python bridge, pairing streaming discovery with synchronized lyrics, libmpv CoreAudio playback, and a dockable mini-player.',
      fullOverview:
        'MetroFlow is a standalone desktop music application for macOS optimized for Apple Silicon ARM64. Built with an Electron desktop shell, a React/TypeScript interface, and a local Python bridge on port 8765, it pairs compliant streaming playback with a native libmpv CoreAudio engine, interactive synchronized lyrics, and a dockable mini-player.',
      problemStatement:
        'Many modern desktop music players are cluttered with social feeds and lack seamless support for interactive synchronized lyrics, lightweight mini-player docking, and low-latency audio playback.',
      engineeringSolution:
        'Engineered a desktop macOS application combining an Electron native shell with a responsive React frontend, a dual audio playback pipeline (streaming player and native Apple Silicon libmpv CoreAudio output), interactive synchronized lyrics with click-to-seek, and a local Python backend bridge on port 8765 for fast catalogue search.',
      image: metroflowHomeImg,
      screenshots: [
        {
          title: 'Home / Music Discovery',
          image: metroflowHomeImg,
          caption: 'Audio discovery dashboard with personalized recommendations, featured spotlights, continue listening queue, and docked mini-player.',
        },
        {
          title: 'Synchronized Lyrics',
          image: metroflowLyricsImg,
          caption: 'Now-playing view with high-resolution album artwork and interactive time-synced lyrics with click-to-seek timestamp navigation.',
        },
        {
          title: 'Settings / About',
          image: metroflowSettingsImg,
          caption: 'Preferences panel with configurable macOS keyboard shortcuts, Apple Silicon ARM64 target, and dual audio engine configuration.',
        },
      ],
      technologies: ['Electron', 'React', 'TypeScript', 'Python Bridge', 'libmpv CoreAudio', 'Tailwind CSS'],
      highlights: [
        'Built for macOS Apple Silicon with dual audio pipeline (streaming player & native libmpv CoreAudio)',
        'Interactive synchronized lyrics with time-tagging and one-click timestamp seeking',
        'Local Python backend service on port 8765 for fast catalogue search, metadata, and lyrics',
        'Configurable macOS keyboard shortcuts and lightweight dockable mini-player for focused work',
      ],
      architecture: [
        {
          layer: 'Desktop & UI Shell',
          component: 'Electron & React (TypeScript)',
          responsibility: 'Renders frameless macOS window, navigation, album artwork, interactive synchronized lyrics, and dockable mini-player.',
        },
        {
          layer: 'Audio Engine',
          component: 'Dual Engine (Streaming & libmpv CoreAudio)',
          responsibility: 'Coordinates compliant streaming playback alongside native Apple Silicon ARM64 libmpv CoreAudio output and Web Audio Studio Synth.',
        },
        {
          layer: 'Metadata & Services',
          component: 'Local Python Bridge (Port 8765)',
          responsibility: 'Communicates via localhost port 8765 using ytmusicapi and YouTube Data API v3 for catalogue discovery, metadata, and lyrics.',
        },
      ],
      specifications: [
        {
          label: 'Target Architecture',
          value: 'Apple Silicon ARM64',
          detail: 'Native macOS Build (com.metroflow.mac)',
        },
        {
          label: 'Desktop Shell',
          value: 'Electron + React',
          detail: 'Frameless Windowing & Global Shortcuts',
        },
        {
          label: 'Audio Pipeline',
          value: 'Dual Engine (Stream & libmpv)',
          detail: 'Apple Silicon CoreAudio Output',
        },
        {
          label: 'Frontend Stack',
          value: 'React & TypeScript',
          detail: 'Vite + Tailwind CSS UI',
        },
        {
          label: 'Backend Bridge',
          value: 'Local Python Service',
          detail: 'Port 8765 ytmusicapi Pipeline',
        },
        {
          label: 'Playback Modes',
          value: 'Full Window & Mini-Player',
          detail: 'Dockable Compact Mode',
        },
      ],
      technicalDecisions: [
        {
          title: 'Electron Desktop Shell with Native macOS Integration',
          decision: 'Packaged the React/TypeScript frontend into an Electron desktop bundle tailored for Apple Silicon ARM64.',
          rationale:
            'Provides a dedicated desktop experience with native macOS frameless windowing, global media shortcuts, system About panel, and a compact dockable mini-player mode.',
        },
        {
          title: 'Interactive Synchronized Lyrics & Timestamp Seeking',
          decision: 'Implemented an interactive time-tagged lyrics parser with click-to-seek playback synchronization.',
          rationale:
            'Keeps lyrics smoothly highlighted in sync with current audio playback while enabling instant timestamp navigation directly from individual lyric lines without UI stutter.',
        },
        {
          title: 'Dual Playback Engine & Local Python Microservice',
          decision: 'Separated audio playback engines and metadata retrieval across a local Python bridge on port 8765.',
          rationale:
            'Enables high-fidelity streaming playback alongside Studio Synth and libmpv CoreAudio output while offloading discovery and metadata indexing to a lightweight local background service.',
        },
      ],
      challengesAndLearnings: [
        {
          title: 'Low-Latency Native Audio Pipeline on macOS',
          challenge:
            'Managing desktop audio playback efficiently on Apple Silicon without audio stutter, high memory footprint, or IPC bottlenecks.',
          solution:
            'Integrated a dual playback architecture combining an embedded streaming player with an Apple Silicon ARM64 native libmpv dynamic library (libmpv.2.dylib), managing CoreAudio output buffers directly.',
          learning:
            'Learned how native audio libraries interface with macOS CoreAudio and discovered the architectural patterns for bridging native C/C++ audio runtimes with desktop UI processes.',
        },
        {
          title: 'Synchronized Lyrics Parsing & Timestamp Seeking',
          challenge:
            'Keeping time-tagged lyrics smoothly highlighted in sync with live audio without triggering frame drops, UI jitter, or state mismatches during rapid manual seeking.',
          solution:
            'Implemented an indexed timecode parser that synchronizes with the audio playback clock and allows one-click timestamp seeking directly from lyric lines.',
          learning:
            'Gained hands-on experience handling high-frequency time updates in React, separating timecode indexing from rendering, and preventing UI re-render bottlenecks.',
        },
        {
          title: 'Desktop Window Management & Mini-Player Mode',
          challenge:
            'Designing an interface that transitions smoothly between a rich discovery experience and an unobtrusive, docked mini-player suitable for focused coding sessions.',
          solution:
            'Combined React view state with Electron window management, configuring global keyboard shortcuts and a lightweight compact window mode for study and work sessions.',
          learning:
            'Learned how Electron and macOS window APIs work together, specifically managing frameless window bounds, window levels, and system keyboard event listeners.',
        },
      ],
      metrics: [
        { label: 'Platform', value: 'macOS ARM64' },
        { label: 'Audio Engine', value: 'libmpv & Stream' },
        { label: 'Stack', value: 'Electron + React' },
      ],
      githubUrl: 'https://github.com/divyanshh69/MetroFlow-MAC',
    },
    {
      id: 'campuspulse',
      index: '02',
      title: 'CampusPulse',
      subtitle: 'A college club management and campus event operations platform',
      category: 'Full-Stack Web',
      year: '2026',
      status: 'Active College Project',
      shortDescription:
        'A college club management platform designed to centralize student society registrations, event schedules, and room bookings in one web platform.',
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
        },
        {
          title: 'Member Management',
          image: campuspulseMemberManagementImg,
          caption: 'PostgreSQL-backed member directory with department filters, attendance percentages, credit tracking, and an interactive member profile editing modal.',
        },
        {
          title: 'Platform Settings',
          image: campuspulsePlatformSettingsImg,
          caption: 'Administrative settings panel for configuring club parameters, term dates, minimum attendance thresholds, and inspecting JWT authentication privileges.',
        },
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
      highlights: [
        'Role-based permissions separating club organizers, faculty advisors, and student members',
        'Conflict-aware event calendar that checks for overlapping auditorium and lab bookings',
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
          responsibility: 'Stores structured records for student societies, event schedules, venues, and registrations.',
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
          detail: 'Venue Overlap Logic',
        },
        {
          label: 'Permissions',
          value: 'Role-Based Access',
          detail: 'Organizers, Faculty & Students',
        },
      ],
      technicalDecisions: [
        {
          title: 'Relational Database Schema (PostgreSQL)',
          decision: 'Structured data in PostgreSQL with relational foreign keys across clubs, events, and registrations.',
          rationale:
            'Campus club operations rely on relational links: events belong to clubs, venues are reserved during specific time slots, and students register for specific events. Relational foreign keys keep data consistent.',
        },
        {
          title: 'Role-Based Permissions for Campus Societies',
          decision: 'Implemented custom middleware to separate permissions between club leads, faculty, and student members.',
          rationale:
            'Separates event creation and room booking privileges from standard student attendance, keeping club administrative controls organized.',
        },
        {
          title: 'Venue Conflict Validation Logic',
          decision: 'Added checks to verify venue availability before confirming an event date and location.',
          rationale:
            'Prevents double-booking auditoriums and seminar halls by querying overlapping time ranges before saving event records to the database.',
        },
      ],
      challengesAndLearnings: [
        {
          title: 'Venue Scheduling Clashes & Relational Data Integrity',
          challenge:
            'Student societies frequently suffered from double-booked auditoriums and seminar halls due to uncoordinated event notices across separate group chats and spreadsheets.',
          solution:
            'Designed a normalized PostgreSQL schema with relational foreign keys linking clubs, rooms, and time slots, paired with backend conflict-detection logic that validates venue availability before confirming bookings.',
          learning:
            'Learned how to write relational SQL queries to detect overlapping time ranges and realized the importance of enforcing data constraints directly at the database layer.',
        },
        {
          title: 'Role-Based Permissions for Campus Societies',
          challenge:
            'Safely separating administrative privileges (faculty advisors, club presidents) from student member actions without duplicating route logic or creating security loopholes.',
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
        'Directly applying classroom theory to practical software builds like CampusPulse and MetroFlow',
      ],
    },
    {
      id: 'j-club-1',
      period: 'Aug 2025 — Present',
      title: 'Student Developer & Tech Community Member',
      organization: 'Medi-Caps Student Developer Community',
      category: 'Club Roles',
      summary:
        'Active participant in the Medi-Caps University student developer community, engaging in peer learning, exploring modern web technologies, and collaborating with fellow student builders.',
      outcomes: [
        'Engaged in collaborative coding sessions and developer discussions with college peers',
        'Observed firsthand the club communication and scheduling challenges that inspired CampusPulse',
      ],
    },
    {
      id: 'j-proj-campuspulse',
      period: 'Late 2025 — 2026',
      title: 'Built CampusPulse Platform',
      organization: 'College Project',
      category: 'Projects',
      summary:
        'Designed and built a college club management web application to centralize society event discovery, registrations, and room bookings.',
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
      id: 'j-proj-metroflow',
      period: '2026',
      title: 'Created MetroFlow for macOS',
      organization: 'Independent Project',
      category: 'Projects',
      summary:
        'Built a standalone desktop music streaming and studio synth application for macOS Apple Silicon with Electron, React, libmpv CoreAudio, and a local Python bridge.',
      outcomes: [
        'Integrated compliant streaming playback alongside native Apple Silicon libmpv CoreAudio output',
        'Engineered interactive time-synced lyrics, dockable mini-player, and local Python metadata bridge',
      ],
    },
    {
      id: 'j-goal-future',
      period: '2026 — Beyond',
      title: 'Next Step: Software Engineering Roles & Practical Growth',
      organization: 'Career Roadmap',
      category: 'Future Goals',
      summary:
        'Seeking software engineering internship and entry-level opportunities to contribute to real-world software, learn team workflows, and deepen engineering skills.',
      outcomes: [
        'Continuing to build practical tools and open-source projects',
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
      title: 'MetroFlow macOS Player Architecture',
      issuerOrEvent: 'Independent Desktop Build',
      date: '2026',
      detail:
        'Engineered a standalone desktop music application for macOS Apple Silicon with synchronized lyrics, libmpv CoreAudio playback, and local Python bridge.',
      credentialRef: 'Project Release',
    },
    {
      id: 'ach-3',
      category: 'Projects',
      title: 'CampusPulse Web Platform Deployment',
      issuerOrEvent: 'Collegiate Web Build',
      date: '2026',
      detail:
        'Developed full-stack club management platform with role-based permissions, venue conflict validation, and normalized PostgreSQL database.',
      credentialRef: 'Project Release',
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
      'A resume shows what I have built, but how I think, learn, and grow matters just as much. Here is an honest look at where I feel confident and where I am actively working to improve.',
    strengths: [
      {
        id: 'str-1',
        title: 'Full-Stack Mindset',
        description:
          'I like understanding how both ends of a system connect. When designing a database table in PostgreSQL, I am already thinking about how the client interface will consume and render the data cleanly.',
        evidence: 'Applied in CampusPulse’s event schedules and MetroFlow’s local playback state.',
      },
      {
        id: 'str-2',
        title: 'Care for User Interface Details',
        description:
          'I pay attention to the details that make software pleasant to use—consistent spacing, readable typography, dark mode contrast, keyboard shortcuts, and smooth feedback.',
        evidence: 'Demonstrated in MetroFlow’s Mac-native interface and custom interactive portfolio components.',
      },
      {
        id: 'str-3',
        title: 'Self-Driven Project Execution',
        description:
          'Give me an interesting problem statement and I enjoy breaking it down into a data model, building the API, and implementing the interface through independent problem solving.',
        evidence: 'Built both MetroFlow and CampusPulse from initial idea to working functional code.',
      },
      {
        id: 'str-4',
        title: 'Modular, Readable Code Structure',
        description:
          'I write clean, typed TypeScript and modular components with clear separation between data, business logic, and presentation.',
        evidence: 'Strict type safety and decoupled component structures across all repositories.',
      },
    ] as StrengthItem[],

    growthAreas: [
      {
        id: 'grw-1',
        title: 'Production Backend Deployment & DevOps',
        honestReflection:
          'As an undergraduate, most of my backend projects have run in local development or simple server environments. I am eager to gain more experience with containerization, CI/CD pipelines, and cloud services.',
        activeActionPlan:
          'Currently learning Docker basics and practicing automated testing and deployment for CampusPulse.',
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

