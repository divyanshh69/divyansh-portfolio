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
    github: 'https://github.com/divyanshnayak',
    linkedin: 'https://linkedin.com/in/divyanshnayak',
    heroImage: heroWorkspaceImg,
    metrics: [
      { value: 'B.Tech CSE', label: 'Undergraduate Program', context: 'Computer Science & Engineering' },
      { value: 'MetroFlow', label: 'macOS Music Player', context: 'Swift, SwiftUI & AVFoundation' },
      { value: 'CampusPulse', label: 'Club Management Platform', context: 'React, Node.js & PostgreSQL' },
      { value: '2026', label: 'Engineering Focus', context: 'Open to Software Roles' },
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
        subtitle: 'Bachelor of Technology in Computer Science & Engineering',
        content:
          'Currently completing foundational coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks, while applying those concepts directly to personal projects.',
        keyTakeaway: 'Strong academic CS fundamentals paired with practical project experience.',
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
      status: 'Active Project',
      shortDescription:
        'A native music application for macOS that pairs distraction-free listening and local audio playback with a dark, minimal visual interface.',
      fullOverview:
        'MetroFlow is a native macOS music player built for focused listening. Built with Swift and SwiftUI/AppKit, it focuses on local audio files, intuitive keyboard controls, and responsive waveform visualization in a clean Mac-native layout.',
      problemStatement:
        'Many modern desktop music players are heavy web wrappers that consume significant system memory and clutter the listening experience with social feeds and recommendations.',
      engineeringSolution:
        'Built a native macOS application using Swift and AppKit/SwiftUI with local audio playback via AVFoundation, responsive UI layouts, and an integrated mini-player mode.',
      image: projectMetroflowImg,
      screenshots: [
        {
          title: 'Main Player Interface',
          image: projectMetroflowImg,
          caption: 'Dark, distraction-free player layout with album art and audio waveform visualizer.',
        },
        {
          title: 'Keyboard Controls',
          image: projectMetroflowImg,
          caption: 'Quick track switching, volume control, and playback commands designed for keyboard flow.',
        },
        {
          title: 'Compact Mini-Player',
          image: projectMetroflowImg,
          caption: 'Minimal desktop mode designed to stay out of the way while working or studying.',
        },
      ],
      technologies: ['Swift', 'SwiftUI / AppKit', 'AVFoundation', 'macOS SDK'],
      highlights: [
        'Built natively for macOS using Swift and Apple’s AVFoundation framework',
        'Responsive waveform visualization for real-time visual feedback during playback',
        'Keyboard shortcuts for playback controls, volume, and track navigation',
        'Lightweight mini-player mode designed for focused work sessions',
      ],
      architecture: [
        {
          layer: 'User Interface',
          component: 'SwiftUI & AppKit Views',
          responsibility: 'Renders the main window, album artwork, playback controls, and mini-player.',
        },
        {
          layer: 'Audio Engine',
          component: 'AVFoundation Media Playback',
          responsibility: 'Handles local audio decoding, playback state management, and volume adjustment.',
        },
        {
          layer: 'Library Management',
          component: 'Local Track Indexer',
          responsibility: 'Scans and organizes local audio files, track metadata, and playlist queues.',
        },
      ],
      metrics: [
        { label: 'Platform', value: 'macOS Native' },
        { label: 'Audio Engine', value: 'AVFoundation' },
        { label: 'Language', value: 'Swift' },
      ],
      githubUrl: 'https://github.com/divyanshnayak/metroflow',
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
      image: projectCampuspulseImg,
      screenshots: [
        {
          title: 'Club & Events Dashboard',
          image: projectCampuspulseImg,
          caption: 'Central dashboard showing upcoming campus events and active student societies.',
        },
        {
          title: 'Venue Conflict Detection',
          image: projectCampuspulseImg,
          caption: 'Scheduling logic that flags overlapping room bookings before events are finalized.',
        },
        {
          title: 'Event RSVP & Attendance',
          image: projectCampuspulseImg,
          caption: 'Participant registration flow with clear attendee tracking for club leads.',
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
      githubUrl: 'https://github.com/divyanshnayak/campuspulse',
      liveDemoUrl: '#projects',
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
      title: 'Finalist — Collegiate Software Hackathon',
      issuerOrEvent: 'Technical Symposium Hackathon',
      date: '2025',
      detail:
        'Selected among top project teams for building a working full-stack prototype within an intensive 36-hour sprint.',
      credentialRef: 'Hackathon Finalist',
    },
    {
      id: 'ach-2',
      category: 'Leadership & Clubs',
      title: 'Technical Society Core Member & Workshop Lead',
      issuerOrEvent: 'Campus Developer Community',
      date: '2024 — Present',
      detail:
        'Conducted developer sessions on web fundamentals, Git workflows, and collaborative project building for junior students.',
      credentialRef: 'Club Technical Lead',
    },
    {
      id: 'ach-3',
      category: 'Academic',
      title: 'Consistent Performance in Core CS Systems Labs',
      issuerOrEvent: 'Department of Computer Science & Engineering',
      date: '2024 — Present',
      detail:
        'Demonstrated strong practical understanding in Data Structures, Relational Databases, and Object-Oriented Software Development.',
      credentialRef: 'Academic Track',
    },
    {
      id: 'ach-4',
      category: 'Certifications',
      title: 'Full-Stack Web Development Course Completion',
      issuerOrEvent: 'Online Engineering Specialization',
      date: '2025',
      detail:
        'Covered relational database schema design, RESTful API development, React component patterns, and modern TypeScript.',
      credentialRef: 'Course Completed',
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
