import React from 'react';
import { motion } from 'motion/react';
import { easeEditorial, isReducedMotion } from '../utils/motionVariants';

export type DividerVariant =
  | 'hero-about'
  | 'about-projects'
  | 'projects-skills'
  | 'skills-journey'
  | 'journey-contact';

interface SectionDividerProps {
  variant: DividerVariant;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ variant, className = '' }) => {
  const prefersReduced = isReducedMotion();

  if (variant === 'hero-about') {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-16 sm:h-24 overflow-hidden select-none pointer-events-none flex items-center justify-center ${className}`}
      >
        {/* Editorial expanding diagonal slit */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D26]/40 to-transparent" />
        <motion.div
          initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: easeEditorial }}
          className="w-48 sm:w-80 h-[2px] bg-[#FF4D26] origin-center shadow-[0_0_12px_rgba(255,77,38,0.5)]"
        />
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-3 px-4 bg-[#090A0E] text-[10px] font-mono-tabular tracking-widest text-[#7C7872]">
          <span className="text-[#FF4D26]">TRANSITION</span>
          <span>&bull;</span>
          <span>SEC 00 &rarr; 01</span>
          <span>&bull;</span>
          <span className="hidden sm:inline">FOUNDATIONS</span>
        </div>
      </div>
    );
  }

  if (variant === 'about-projects') {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-20 sm:h-28 overflow-hidden select-none pointer-events-none flex flex-col justify-center items-center ${className}`}
      >
        {/* Layered Architectural Shutter Reveal */}
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[10px] font-mono-tabular text-[#7C7872] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" />
            <span>DEPTH STACK // 320VH HORIZONTAL TRACK</span>
          </div>
          <div className="hidden sm:block">
            <span>SYS_VIEWPORT // 100VH STICKY PIN</span>
          </div>
        </div>

        <div className="w-full relative h-[1px] bg-[#262A36]">
          <motion.div
            initial={prefersReduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: easeEditorial }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-[#FF4D26] to-transparent origin-left"
          />
        </div>
      </div>
    );
  }

  if (variant === 'projects-skills') {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-20 sm:h-24 overflow-hidden select-none pointer-events-none flex items-center justify-center ${className}`}
      >
        {/* Topological vector grid mesh transition */}
        <div className="absolute inset-0 arch-grid-pattern opacity-15 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]" />
        <div className="relative flex items-center gap-4 px-6 py-2 rounded-full bg-[#0E1017] border border-[#262A36] text-[10px] font-mono-tabular tracking-wider text-[#A8A39D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span>TOPOLOGY BRIDGE // HARDWARE &bull; WEB &bull; RELATIONAL</span>
          <span className="text-[#38BDF8]">&bull;</span>
          <span className="text-[#F4EFEA] font-semibold">SEC 03</span>
        </div>
      </div>
    );
  }

  if (variant === 'skills-journey') {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-16 sm:h-20 overflow-hidden select-none pointer-events-none flex items-center justify-center ${className}`}
      >
        {/* Laser Horizon line feeding into Timeline */}
        <div className="w-full relative flex items-center">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#262A36]" />
          <motion.div
            initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="mx-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#090A0E] border border-[#10B981]/40 text-[10px] font-mono-tabular text-[#10B981]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>TEMPORAL VECTOR // 2025 &rarr; FUTURE</span>
          </motion.div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#262A36]" />
        </div>
      </div>
    );
  }

  // journey-contact
  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-20 sm:h-28 overflow-hidden select-none pointer-events-none flex flex-col items-center justify-center ${className}`}
    >
      {/* Obsidian Aperture Iris Transition */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, ease: easeEditorial }}
        className="w-full max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[10px] font-mono-tabular text-[#7C7872] pb-2"
      >
        <span>APERTURE // 05</span>
        <span className="text-[#FF4D26] font-semibold">INITIATE TRANSMISSION</span>
      </motion.div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4D26]/50 to-transparent" />
    </div>
  );
};

