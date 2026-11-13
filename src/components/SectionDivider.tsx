import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = isReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax horizontal drift for monumental background watermark
  const ribbonX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['14%', '-14%']
  );

  // Dynamic laser expansion
  const beamScaleX = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    prefersReduced ? [1, 1] : [0, 1]
  );

  // Optical center badge focus
  const badgeOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    prefersReduced ? [1, 1, 1] : [0.4, 1, 0.4]
  );
  const badgeScale = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    prefersReduced ? [1, 1, 1] : [0.94, 1.04, 0.94]
  );

  if (variant === 'hero-about') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full h-24 sm:h-32 overflow-hidden select-none pointer-events-none flex items-center justify-center border-y border-white/[0.04] bg-[#07080C] ${className}`}
      >
        {/* Monumental Parallax Watermark Ribbon */}
        <motion.div
          style={{ x: ribbonX }}
          className="absolute inset-y-0 flex items-center whitespace-nowrap font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] will-change-transform"
        >
          <span>FOUNDATIONS // ACADEMIC METHODOLOGY // COMPUTATION CORE</span>
        </motion.div>

        {/* Dynamic Laser Guide Line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D26]/30 to-transparent" />
        <motion.div
          style={{ scaleX: beamScaleX }}
          className="w-48 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D26] to-transparent origin-center shadow-[0_0_14px_rgba(255,77,38,0.7)]"
        />

        {/* Central Architectural Threshold Badge */}
        <motion.div
          style={{ opacity: badgeOpacity, scale: badgeScale }}
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#090A0E] border border-[#262A36] text-[10px] sm:text-xs font-mono-tabular tracking-widest text-[#A8A39D] shadow-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" />
          <span className="text-[#FF4D26] font-semibold">STAGE 01</span>
          <span>&bull;</span>
          <span className="text-[#F4EFEA]">FOUNDATION &amp; CRAFT</span>
          <span className="hidden sm:inline text-[#7C7872]">&bull; 2026 ROADMAP</span>
        </motion.div>
      </div>
    );
  }

  if (variant === 'about-projects') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full h-28 sm:h-36 overflow-hidden select-none pointer-events-none flex flex-col justify-center items-center border-y border-white/[0.04] bg-[#07080C] ${className}`}
      >
        {/* Monumental Background Watermark */}
        <motion.div
          style={{ x: ribbonX }}
          className="absolute inset-y-0 flex items-center whitespace-nowrap font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] will-change-transform"
        >
          <span>ENGINEERED FLAGSHIPS // 320VH HORIZONTAL TRACK // AUDIO &amp; RELATIONAL</span>
        </motion.div>

        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tabular text-[#8E8B85] pb-3 z-10">
          <motion.div style={{ opacity: badgeOpacity }} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" />
            <span className="text-[#F4EFEA] font-semibold">DEPTH STACK</span>
            <span>// 320VH PINNED SHOWCASE TRACK</span>
          </motion.div>
          <div className="hidden sm:flex items-center gap-2 text-[#7C7872]">
            <span>STICKY VIEWPORT // 01 METROFLOW &bull; 02 SKILLSYNC &bull; 03 CAMPUSPULSE</span>
          </div>
        </div>

        {/* Luminous Shutter Track Beam */}
        <div className="w-full relative h-[1px] bg-[#262A36]">
          <motion.div
            style={{ scaleX: beamScaleX }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-[#FF4D26] to-transparent origin-left shadow-[0_0_12px_rgba(255,77,38,0.6)]"
          />
        </div>
      </div>
    );
  }

  if (variant === 'projects-skills') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full h-24 sm:h-32 overflow-hidden select-none pointer-events-none flex items-center justify-center border-y border-white/[0.04] bg-[#07080C] ${className}`}
      >
        {/* Monumental Watermark */}
        <motion.div
          style={{ x: ribbonX }}
          className="absolute inset-y-0 flex items-center whitespace-nowrap font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] will-change-transform"
        >
          <span>TOPOLOGY BRIDGE // C++ &bull; ELECTRON &bull; REACT 19 &bull; PRISMA &bull; POSTGRES</span>
        </motion.div>

        <div className="absolute inset-0 arch-grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]" />

        <motion.div
          style={{ opacity: badgeOpacity, scale: badgeScale }}
          className="relative flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0E1017] border border-[#262A36] text-[10px] sm:text-xs font-mono-tabular tracking-wider text-[#A8A39D] shadow-2xl z-10"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </div>
          <span>TOPOLOGICAL SYSTEM CLUSTERS</span>
          <span className="text-[#38BDF8]">&bull;</span>
          <span className="text-[#F4EFEA] font-semibold">STAGE 03</span>
        </motion.div>
      </div>
    );
  }

  if (variant === 'skills-journey') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full h-20 sm:h-28 overflow-hidden select-none pointer-events-none flex items-center justify-center border-y border-white/[0.04] bg-[#07080C] ${className}`}
      >
        <motion.div
          style={{ x: ribbonX }}
          className="absolute inset-y-0 flex items-center whitespace-nowrap font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] will-change-transform"
        >
          <span>CHRONOLOGY // ACADEMIC MILESTONES // 2024 &rarr; 2026 &rarr; BEYOND</span>
        </motion.div>

        {/* Laser Horizon line feeding directly into timeline */}
        <div className="w-full relative flex items-center z-10">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#262A36] to-[#10B981]/50" />
          <motion.div
            style={{ opacity: badgeOpacity, scale: badgeScale }}
            className="mx-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#090A0E] border border-[#10B981]/40 text-[10px] sm:text-xs font-mono-tabular text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>STAGE 04 // TEMPORAL VECTOR FEED</span>
          </motion.div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#262A36] to-[#10B981]/50" />
        </div>
      </div>
    );
  }

  // journey-contact
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-24 sm:h-32 overflow-hidden select-none pointer-events-none flex flex-col items-center justify-center border-y border-white/[0.04] bg-[#07080C] ${className}`}
    >
      <motion.div
        style={{ x: ribbonX }}
        className="absolute inset-y-0 flex items-center whitespace-nowrap font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] will-change-transform"
      >
        <span>APERTURE // DIRECT COMM CHANNEL // 2026 SWE ENGAGEMENT</span>
      </motion.div>

      <motion.div
        style={{ opacity: badgeOpacity, scale: badgeScale }}
        className="w-full max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[10px] sm:text-xs font-mono-tabular text-[#8E8B85] pb-2 z-10"
      >
        <span className="text-[#A8A39D] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" />
          STAGE 05 // APERTURE OPEN
        </span>
        <span className="text-[#FF4D26] font-semibold tracking-wider">INITIATE TRANSMISSION</span>
      </motion.div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4D26]/60 to-transparent" />
    </div>
  );
};
