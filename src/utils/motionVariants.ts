import { type Variants } from 'motion/react';

export const isReducedMotion = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

// Coherent timing tiers
export const TIMING = {
  micro: 0.18,     // tactile button taps, hover highlights
  medium: 0.5,     // navigation indicators, modal transitions, mobile drawer
  slow: 0.9,       // section reveals, card appearances, image reveals
  hero: 1.4,       // monumental hero name reveal
} as const;

// Coherent stagger tiers
export const STAGGER = {
  letter: 0.062,   // hero letter reveal (target 0.045–0.075s)
  fast: 0.06,      // compact lists, pills
  medium: 0.1,     // section content cards, milestones (target 0.08–0.13s)
  slow: 0.18,      // top-level architectural block sequence
} as const;

// Coherent spring presets for physics-based elements
export const SPRING = {
  magnetic: { stiffness: 180, damping: 18 },
  card3D: { stiffness: 260, damping: 24 },
  tab: { stiffness: 240, damping: 28 },
  pill: { stiffness: 220, damping: 26 },
  drawer: { stiffness: 200, damping: 25 },
} as const;

// Architectural editorial easing curves
export const easeEditorial = [0.16, 1, 0.3, 1] as const;
export const easeDramatic = [0.22, 1, 0.36, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.medium,
      delayChildren: 0.08,
    },
  },
};

export const wordStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
};

export const firstNameContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

export const lastNameContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.48,
    },
  },
};

export const letterCharVariants: Variants = {
  hidden: {
    y: '115%',
    opacity: 0,
    rotateX: 35,
  },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.95,
      ease: easeEditorial,
    },
  },
};

export const kineticWordReveal: Variants = {
  hidden: {
    y: '105%',
    opacity: 0,
    rotateZ: 1.5,
  },
  visible: {
    y: '0%',
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 0.9,
      ease: easeEditorial,
    },
  },
};

export const fadeUpReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: easeEditorial,
    },
  },
};

export const imageMaskReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    clipPath: 'inset(6% 0% 6% 0% round 14px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 14px)',
    transition: {
      duration: 0.95,
      ease: easeEditorial,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    clipPath: 'inset(4% 0% 4% 0% round 14px)',
    transition: {
      duration: 0.45,
      ease: easeEditorial,
    },
  },
};

export const sectionHeadingReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.88,
      ease: easeEditorial,
    },
  },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.48, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.38, ease: 'easeIn' },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: easeEditorial,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 14,
    transition: {
      duration: 0.38,
      ease: 'easeIn',
    },
  },
};

// Kinetic typography character staggered container
export const kineticCharContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

// Kinetic character masked upward emergence
export const kineticCharReveal: Variants = {
  hidden: {
    y: '115%',
    opacity: 0,
    rotateX: 30,
  },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.85,
      ease: easeEditorial,
    },
  },
};

// Architectural letter-spacing compression on entrance
export const letterSpacingReveal: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: '0.12em',
    y: 18,
  },
  visible: {
    opacity: 1,
    letterSpacing: '-0.02em',
    y: 0,
    transition: {
      duration: 0.95,
      ease: easeEditorial,
    },
  },
};

