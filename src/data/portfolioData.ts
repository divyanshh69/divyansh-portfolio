const heroWorkspaceImg = new URL('../assets/images/hero_developer_workspace_1794058110461.jpg', import.meta.url).href;
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
    headline: 'Designing and building native macOS and full-stack web applications.',
    shortIntro:
      'I am a Computer Science Engineering student focused on building clean native desktop tools and practical full-stack web platforms. I enjoy turning project ideas into responsive, well-structured software that is intuitive and dependable.',
    location: 'India',
    email: 'divyanshnayak713@gmail.com',
    github: 'https://github.com/divyanshh69',
    linkedin: 'https://www.linkedin.com/in/divyansh-nayak-703390370/',
    heroImage: heroWorkspaceImg,
    metrics: [
      { value: 'B.Tech CSE', label: 'Undergraduate Program', context: 'Medi-Caps University · 2nd Year' },
      { value: 'MetroFlow', label: 'macOS Music Player', context: 'Swift, SwiftUI & CoreAudio' },
      { value: 'CampusPulse', label: 'Club Management Platform', context: 'React, Node.js & PostgreSQL' },
      { value: 'Hackathons', label: '2026 Participant', context: 'Rapid Prototyping & Team Builds' },
    ],
  },

  about: {
    sectionTitle: 'Beyond the Transcript',
    lead: 'Software engineering to me is about learning by building—taking ideas from classroom theory and turning them into practical, functional tools for real people.',
    pillars: [
      {
        id: 'background',
        index: '01',
        title: 'My Background',
        subtitle: 'From curiosity about how software works to building projects',
        content:
          'My journey into computer science started with a genuine curiosity about how everyday software is constructed. That interest motivated me to move beyond small scripts and start architecting complete web applications and exploring native macOS app development.',
        keyTakeaway: 'Hands-on developer who learns best by building real projects.',
      },
      {
        id: 'education',
        index: '02',
        title: 'Education',
        subtitle: '2nd-Year B.Tech CSE at Medi-Caps University',
        content:
          'Enrolled at Medi-Caps University in August 2025. Currently a 2nd-year student building a solid foundation in Data Structures, Object-Oriented Programming, and Database Systems, while actively applying these concepts to practical software projects.',
        keyTakeaway: 'Solid computer science foundation paired with active project development.',
      },
      {
        id: 'interests',
        index: '03',
        title: 'Interests',
        subtitle: 'Desktop software, clean user interfaces, and full-stack web',
        content:
          'I enjoy building software that solves practical problems: native desktop media apps with clean interfaces, campus tools that streamline student activities, and responsive web applications built with TypeScript and React.',
        keyTakeaway: 'Motivated by clean architecture, intuitive UI, and fast feedback loops.',
      },
      {
        id: 'goals',
        index: '04',
        title: 'Goals',
        subtitle: 'Growing as a software engineer and contributing to real products',
        content:
          'My goal is to join a supportive engineering team where I can contribute to production software, learn from experienced mentors, and continue developing my skills across the stack.',
        keyTakeaway: 'Looking for software engineering internship and entry-level opportunities.',
      },
      {
        id: 'motivation',
        index: '05',
        title: 'What Motivates Me',
        subtitle: 'Seeing a project work seamlessly for someone else',
        content:
          'Nothing is more rewarding than watching a friend or fellow student use something I built—whether it is managing a club event on CampusPulse or playing music on MetroFlow—and finding it easy and intuitive.',
        keyTakeaway: 'Driven by curiosity, utility, and continuous improvement.',
      },
    ],
  },

  skills: [
    {
      id: 'ts',
      name: 'TypeScript',
      category: 'Programming',
      context: 'Type-safe application development across frontend React components and backend Node.js services.',
      experienceNote: 'Strict typing, generic helpers, API contract interfaces, and modular component props.',
      usedIn: ['CampusPulse', 'Portfolio Space', 'MetroFlow Bridge'],
    },
    {
      id: 'js',
      name: 'JavaScript (ES2024+)',
      category: 'Programming',
      context: 'Asynchronous programming, DOM interactions, Web APIs, and modern ES features.',
      experienceNote: 'Async/await, modern ES syntax, DOM manipulation, and audio API integration.',
      usedIn: ['CampusPulse', 'Interactive Web Tools'],
    },
    {
      id: 'cpp',
      name: 'C++ & Data Structures',
      category: 'Programming',
      context: 'Algorithmic problem solving, core computer science fundamentals, and data structure implementations.',
      experienceNote: 'STL containers, algorithms, recursion, trees, graphs, and complexity analysis.',
      usedIn: ['Algorithmic Benchmarks', 'CS Coursework'],
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      context: 'Automation scripts, backend prototyping, data handling, and course projects.',
      experienceNote: 'Writing clean scripts, CLI utilities, and small backend services.',
      usedIn: ['Automation Scripts', 'Data Parsers'],
    },
    {
      id: 'swift',
      name: 'Swift & AppKit / SwiftUI',
      category: 'Programming',
      context: 'Native macOS application development and local audio playback integration.',
      experienceNote: 'SwiftUI views, AppKit window integration, and AVFoundation audio playback.',
      usedIn: ['MetroFlow'],
    },
    {
      id: 'react',
      name: 'React & Next.js',
      category: 'Web Development',
      context: 'Building interactive user interfaces, single-page web applications, and custom hooks.',
      experienceNote: 'Functional components, hooks, state management, and responsive layouts.',
      usedIn: ['CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS & Design Systems',
      category: 'Web Development',
      context: 'Responsive styling, dark mode UI theming, and consistent layout design.',
      experienceNote: 'Utility classes, custom CSS variables, responsive breakpoints, and clean component styling.',
      usedIn: ['CampusPulse', 'Personal Portfolio'],
    },
    {
      id: 'motion',
      name: 'Framer Motion & GSAP',
      category: 'Web Development',
      context: 'Smooth UI animations, scroll-triggered reveals, and micro-interactions.',
      experienceNote: 'Spring animations, staggered reveals, smooth transitions, and respecting prefers-reduced-motion.',
      usedIn: ['Personal Portfolio', 'CampusPulse UI'],
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
      id: 'databases',
      name: 'PostgreSQL & MongoDB',
      category: 'Tools & Technologies',
      context: 'Relational data modeling, SQL queries, and NoSQL document storage.',
      experienceNote: 'Designing normalized schemas for club events, writing queries, and managing relationships.',
      usedIn: ['CampusPulse'],
    },
    {
      id: 'git',
      name: 'Git, GitHub & Linux Workflow',
      category: 'Tools & Technologies',
      context: 'Version control, feature branching, code reviews, and Linux terminal workflow.',
      experienceNote: 'Git commands, branch workflows, pull requests, and command-line tooling.',
      usedIn: ['MetroFlow', 'CampusPulse'],
    },
    {
      id: 'figma',
      name: 'Figma & UI Prototyping',
      category: 'Tools & Technologies',
      context: 'UI wireframing, layout experimentation, and prototyping before writing code.',
      experienceNote: 'Creating mockups, planning component spacing, and testing color schemes.',
      usedIn: ['MetroFlow', 'CampusPulse'],
    },
    {
      id: 'rust',
      name: 'Rust & Systems Programming',
      category: 'Currently Learning',
      context: 'Learning memory safety, ownership concepts, and systems programming basics.',
      experienceNote: 'Studying Rust fundamentals, compiler checks, and building small command-line utilities.',
      usedIn: ['Systems Lab Explorations'],
    },
    {
      id: 'distributed',
      name: 'Distributed Systems & Caching',
      category: 'Currently Learning',
      context: 'Studying caching concepts, WebSockets, and real-time communication patterns.',
      experienceNote: 'Exploring Redis caching patterns, real-time message handling, and system design basics.',
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
      status: 'Active Project',
      shortDescription:
        'A native music application for macOS that pairs distraction-free listening and local audio playback with a dark, minimal visual interface.',
      fullOverview:
        'MetroFlow is a native macOS music player built for focused listening. Built with Swift and SwiftUI/AppKit, it focuses on local audio files, intuitive keyboard controls, and responsive waveform visualization in a clean Mac-native layout.',
      problemStatement:
        'Many modern desktop music players are heavy web wrappers that consume significant system memory and clutter the listening experience with social feeds and recommendations.',
      engineeringSolution:
        'Built a native macOS application using Swift and AppKit/SwiftUI with local audio playback via AVFoundation, responsive UI layouts, and an integrated mini-player mode.',
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
      technologies: ['Swift', 'SwiftUI / AppKit', 'CoreAudio', 'Python Bridge', 'macOS SDK'],
      highlights: [
        'Built natively for macOS Apple Silicon with custom audio streaming and studio synthesizer',
        'Interactive synchronized lyrics with time-tagging and one-click timestamp seeking',
        'Configurable macOS keyboard shortcuts for playback, volume, and quick search',
        'Lightweight docking mini-player mode designed for focused work and study sessions',
      ],
      architecture: [
        {
          layer: 'User Interface',
          component: 'SwiftUI & AppKit macOS Views',
          responsibility: 'Renders the main window, album artwork, interactive synchronized lyrics, and docked mini-player.',
        },
        {
          layer: 'Audio Engine',
          component: 'Native CoreAudio & Stream Pipeline',
          responsibility: 'Handles local audio decoding, queue state management, and real-time audio playback.',
        },
        {
          layer: 'Discovery & Metadata',
          component: 'Metadata Service & Local Indexer',
          responsibility: 'Fetches catalogue discovery, track metadata, album artwork, and synchronized lyrics timestamps.',
        },
      ],
      metrics: [
        { label: 'Platform', value: 'macOS ARM64' },
        { label: 'Audio Engine', value: 'CoreAudio Native' },
        { label: 'Language', value: 'Swift' },
      ],
      githubUrl: 'https://github.com/divyanshh69/MetroFlow-MAC',
      liveDemoUrl: '#projects',
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
      metrics: [
        { label: 'Architecture', value: 'Full-Stack' },
        { label: 'Stack', value: 'React / Node.js' },
        { label: 'Database', value: 'PostgreSQL' },
      ],
      githubUrl: 'https://github.com/divyanshh69/CampusPulse',
      liveDemoUrl: '#projects',
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
      title: 'Student Developer & Club Member',
      organization: 'Campus Developer Community',
      category: 'Club Roles',
      summary:
        'Active participant in campus student developer groups, engaging in peer learning, exploring modern web technologies, and collaborating with fellow student builders.',
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
      title: 'Hackathon Participation & Rapid Prototyping',
      organization: 'Collegiate Hackathons',
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
      organization: 'Personal Project',
      category: 'Projects',
      summary:
        'Built a native macOS music application in Swift designed for local audio files, focused listening, and clean dark aesthetics.',
      outcomes: [
        'Built a responsive audio waveform visualizer and clean keyboard navigation',
        'Engineered a lightweight mini-player layout docking cleanly on macOS desktop',
      ],
    },
    {
      id: 'j-goal-future',
      period: '2026 — Beyond',
      title: 'Next Step: Software Engineering Roles & Practical Growth',
      organization: 'Development Roadmap',
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
      category: 'Hackathons',
      title: 'Collegiate Hackathon Participant',
      issuerOrEvent: 'Collegiate Software Sprints',
      date: '2026',
      detail:
        'Collaborated with student developer teams during intensive hackathon sprints, rapidly turning concepts into working software prototypes.',
      credentialRef: 'Hackathon Participant',
    },
    {
      id: 'ach-2',
      category: 'Campus & Clubs',
      title: 'Student Developer & Club Member',
      issuerOrEvent: 'Medi-Caps Developer Community',
      date: 'Aug 2025 — Present',
      detail:
        'Active participant in campus tech community sessions, collaborating on web projects and engaging in student developer workshops.',
      credentialRef: 'Active Member',
    },
    {
      id: 'ach-3',
      category: 'Academic',
      title: 'Academic Track in Computer Science & Engineering',
      issuerOrEvent: 'Medi-Caps University (CSE)',
      date: 'Aug 2025 — Present',
      detail:
        'Consistently developing practical understanding across Data Structures, Object-Oriented Programming, and database systems.',
      credentialRef: 'Academic Track',
    },
    {
      id: 'ach-4',
      category: 'Learning',
      title: 'Self-Directed Web & Systems Development',
      issuerOrEvent: 'Practical Development & Projects',
      date: '2025 — 2026',
      detail:
        'Completed practical self-directed study in modern web development, React component architecture, and relational database schema design.',
      credentialRef: 'Self-Directed Learning',
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

    facets: [
      {
        id: 'principles',
        label: 'How I Approach Software',
        headline: 'Principles I follow when writing code and building projects',
        items: [
          {
            title: 'Learn by building real projects',
            detail: 'You understand architecture far better when you write code from an empty directory to a working application.',
          },
          {
            title: 'Clarity and readability first',
            detail: 'Readable code and straightforward component structures are always easier to debug, maintain, and share with others.',
          },
          {
            title: 'Responsive, respectful interfaces',
            detail: 'Software should feel quick and respectful of user time—clear layouts, keyboard shortcuts, and no unnecessary bloat.',
          },
        ],
      },
      {
        id: 'building',
        label: 'Things I Enjoy Building',
        headline: 'The kinds of projects that make me lose track of time',
        items: [
          {
            title: 'Native desktop apps with Swift',
            detail: 'Tools like MetroFlow that feel at home on macOS, respect keyboard controls, and provide focused utility.',
          },
          {
            title: 'Full-stack campus & community tools',
            detail: 'Platforms like CampusPulse that replace disorganized group chats with structured, collaborative event calendars.',
          },
          {
            title: 'Interactive web components',
            detail: 'Clean UI primitives, dashboards, and interactive visualizers that make interfaces engaging and intuitive.',
          },
        ],
      },
      {
        id: 'habits',
        label: 'Daily Development Habits',
        headline: 'Routines that help me improve my coding skills',
        items: [
          {
            title: 'Dedicated deep work sessions',
            detail: 'Setting aside uninterrupted blocks for writing code, debugging complex issues, and studying CS theory.',
          },
          {
            title: 'Studying well-crafted software',
            detail: 'Inspecting how apps like Raycast, Linear, and macOS utilities design their keyboard navigation and layout hierarchy.',
          },
          {
            title: 'Planning schema and components first',
            detail: 'Sketching database relations and UI component breakdowns in notes before writing code.',
          },
        ],
      },
      {
        id: 'interests',
        label: 'Interests Beyond Code',
        headline: 'What keeps me energized outside the terminal',
        items: [
          {
            title: 'Music & Audio Listening',
            detail: 'Listening to electronic and ambient music while coding, which directly motivated me to build the MetroFlow music player.',
          },
          {
            title: 'Software UI & Ergonomics',
            detail: 'Appreciating minimal dark interfaces, clean typography, keyboard navigation, and thoughtful micro-interactions.',
          },
          {
            title: 'Campus Hackathons & Learning',
            detail: 'Collaborating with college peers on weekend projects, brainstorming ideas, and participating in hackathons.',
          },
        ],
      },
      {
        id: 'improving',
        label: 'Current Improvement Focus',
        headline: 'Deliberate practice areas for the current semester',
        items: [
          {
            title: 'Automated testing discipline',
            detail: 'Writing unit and integration tests alongside application logic rather than treating tests as an afterthought.',
          },
          {
            title: 'Technical documentation',
            detail: 'Writing clear READMEs, architecture notes, and setup guides for projects.',
          },
          {
            title: 'Open-source exploration',
            detail: 'Studying open-source repositories and learning how maintainers structure large codebases.',
          },
        ],
      },
    ] as BeyondFacet[],
  },

  now: {
    lastUpdated: 'November 2026',
    locationStatus: 'On Campus & Active in Projects',
    items: [
      {
        id: 'now-building',
        emoji: '🔨',
        category: 'Currently Building',
        headline: 'MetroFlow Player Polish & CampusPulse Event Flow',
        summary:
          'Refining the audio visualizer UI and keyboard shortcuts in MetroFlow for macOS, while improving event registration and room scheduling in CampusPulse.',
        recentMilestone: 'Added responsive waveform visualizer and dark mini-player layout in MetroFlow.',
        nextStep: 'Testing venue scheduling validation and attendee lists in CampusPulse.',
        updatedAt: 'Active Project',
      },
      {
        id: 'now-learning',
        emoji: '📚',
        category: 'Currently Learning',
        headline: 'Algorithms, Data Structures & Backend Practices',
        summary:
          'Practicing algorithmic problem solving in C++ while studying relational database design and REST API security fundamentals.',
        recentMilestone: 'Completed core problem sets on graphs, trees, and relational normalization.',
        nextStep: 'Building full-stack projects with automated test suites.',
        updatedAt: 'Daily Study',
      },
      {
        id: 'now-goal',
        emoji: '🎯',
        category: 'Current Goal',
        headline: 'Software Engineering Internships & Early Career Roles',
        summary:
          'Seeking software engineering internship and entry-level opportunities where I can learn from experienced engineers and contribute to production software.',
        recentMilestone: 'Documented core projects with clear case studies and responsive demos.',
        nextStep: 'Connecting with engineering teams and contributing to developer projects.',
        updatedAt: '2026 Focus',
      },
      {
        id: 'now-exploring',
        emoji: '💡',
        category: 'Currently Exploring',
        headline: 'SwiftUI Native Development & Modern Web Interfaces',
        summary:
          'Exploring native macOS app development with SwiftUI and learning how clean micro-interactions and keyboard navigation make everyday software more enjoyable to use.',
        recentMilestone: 'Experimented with Framer Motion and canvas animations for interactive portfolio previews.',
        nextStep: 'Exploring macOS menu bar utility concepts.',
        updatedAt: 'Exploration',
      },
    ] as NowItem[],
  },
};
