import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionId } from './Navbar';
import { InteractiveResonatorCanvas } from './InteractiveResonatorCanvas';
import { HeroBlueprintXRay } from './HeroBlueprintXRay';
import { Magnetic } from './Magnetic';
import {
  firstNameContainerVariants,
  lastNameContainerVariants,
  letterCharVariants,
  easeEditorial,
} from '../utils/motionVariants';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
  onOpenProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProject }) => {
  const { personal, projects } = PORTFOLIO_DATA;
  const metroflow = projects.find((p) => p.id === 'metroflow');
  const skillsync = projects.find((p) => p.id === 'skillsync');
  const campuspulse = projects.find((p) => p.id === 'campuspulse');

  const [activeSpotlight, setActiveSpotlight] = useState<'metroflow' | 'skillsync' | 'campuspulse'>('metroflow');
  const currentProject =
    activeSpotlight === 'metroflow'
      ? metroflow
      : activeSpotlight === 'skillsync'
        ? skillsync
        : campuspulse;

  const [prefersReduced, setPrefersReduced] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yHeroLeft = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, -55]
  );
  const yHeroRight = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, -28]
  );
  const opacityHero = useTransform(
    scrollYProgress,
    [0, 0.8],
    prefersReduced ? [1, 1] : [1, 0.4]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(media.matches);
      if (media.matches) {
        setNameRevealed(true);
      }
      const listener = (e: MediaQueryListEvent) => {
        setPrefersReduced(e.matches);
        if (e.matches) setNameRevealed(true);
      };
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const firstName = 'Divyansh'.split('');
  const lastName = 'Nayak'.split('');

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Introduction and Overview"
      className="relative pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 border-b border-[#262A36] overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 arch-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,white_15%,transparent_80%)]"
      />

      {/* Blueprint X-Ray Engineering Layer (Desktop cursor-masked inspection loupe) */}
      <HeroBlueprintXRay containerRef={heroRef} />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Top Architectural Metadata Strip */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeEditorial }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#262A36] text-xs font-mono-tabular tracking-wider text-[#A8A39D]"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#FF4D26]/10 text-[#FF4D26] border border-[#FF4D26]/20 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" />
              <span>AVAILABLE // SWE INTERNSHIPS</span>
            </span>
            <span className="hidden sm:inline opacity-40">/</span>
            <span className="hidden sm:inline text-[#F4EFEA]">MEDI-CAPS UNIVERSITY &bull; 2ND-YEAR CSE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline">INDORE, INDIA</span>
            <span className="opacity-40 hidden md:inline">|</span>
            <span className="text-[#F4EFEA] font-semibold">DEV.SPACE // PORTFOLIO</span>
          </div>
        </motion.div>

        {/* Main Typographic & Canvas Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monumental Kinetic Typography Choreography */}
          <motion.div
            style={{ y: yHeroLeft, opacity: opacityHero }}
            className="lg:col-span-7 space-y-8 will-change-transform"
          >
            <div className="space-y-3">
              {/* Step 0: Category identifier */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.05, ease: easeEditorial }}
                className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-widest font-semibold"
              >
                <span>[ 00 // CREATIVE & SYSTEMS ENGINEERING ]</span>
              </motion.div>

              {/* Kinetic Letter-by-Letter Art-Directed Reveal */}
              <h1
                aria-label="Divyansh Nayak — Creative &amp; Systems Engineering"
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#F4EFEA] leading-[1.04] sm:leading-[1.08] lg:leading-[1.1] select-none"
              >
                <span className="sr-only">Divyansh Nayak</span>
                <span aria-hidden="true">
                  {/* Step 1: First name begins revealing */}
                  <motion.div
                    variants={prefersReduced ? undefined : firstNameContainerVariants}
                    initial={prefersReduced ? false : "hidden"}
                    animate="visible"
                    className={`inline-flex flex-wrap pt-1 pb-2 sm:pb-3 -mb-2 sm:-mb-3 pr-2 ${
                      nameRevealed ? 'overflow-visible' : 'overflow-hidden'
                    }`}
                  >
                    {firstName.map((char, i) => (
                      <motion.span
                        key={`fn-${i}`}
                        variants={prefersReduced ? undefined : letterCharVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                  <br />
                  {/* Step 2: Surname follows with deliberate stagger */}
                  <motion.div
                    variants={prefersReduced ? undefined : lastNameContainerVariants}
                    initial={prefersReduced ? false : "hidden"}
                    animate="visible"
                    onAnimationComplete={() => setNameRevealed(true)}
                    className={`inline-flex flex-wrap font-editorial italic font-normal text-[#FF4D26] pt-1 pb-4 sm:pb-6 -mb-4 sm:-mb-6 pr-4 ${
                      nameRevealed ? 'overflow-visible' : 'overflow-hidden'
                    }`}
                  >
                    {lastName.map((char, i) => (
                      <motion.span
                        key={`ln-${i}`}
                        variants={prefersReduced ? undefined : letterCharVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                </span>
              </h1>
            </div>

            {/* Step 3: Role appears after the name */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.82, ease: easeEditorial }}
              className="text-lg sm:text-xl text-[#F4EFEA]/95 font-medium leading-snug max-w-xl"
            >
              Building native macOS desktop tools and full-stack web platforms backed by normalized relational schemas.
            </motion.p>

            {/* Step 4: Introduction enters next */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.88, delay: 1.05, ease: easeEditorial }}
              className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed max-w-xl"
            >
              2nd-year Computer Science student at Medi-Caps University. I build desktop media runtimes with Electron, React, and libmpv CoreAudio, career roadmaps with PostgreSQL and Prisma ORM, alongside conflict-aware campus systems.
            </motion.p>

            {/* Step 5: CTA buttons appear last */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.25, ease: easeEditorial }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Magnetic strength={0.3} radius={70}>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#090A0E] bg-[#F4EFEA] hover:bg-white rounded-xl transition-all cursor-pointer min-h-[46px] shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>EXPLORE FLAGSHIPS</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                </button>
              </Magnetic>

              <Magnetic strength={0.25} radius={60}>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono-tabular font-medium text-[#F4EFEA] bg-[#0E1017] hover:bg-[#141721] border border-[#262A36] rounded-xl transition-all cursor-pointer min-h-[46px]"
                >
                  <Github className="w-4 h-4 text-[#A8A39D]" aria-hidden="true" />
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8B85]" aria-hidden="true" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25} radius={60}>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono-tabular font-medium text-[#F4EFEA] bg-[#0E1017] hover:bg-[#141721] border border-[#262A36] rounded-xl transition-all cursor-pointer min-h-[46px]"
                >
                  <Linkedin className="w-4 h-4 text-[#A8A39D]" aria-hidden="true" />
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8B85]" aria-hidden="true" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25} radius={60}>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-mono-tabular font-medium text-[#FF4D26] hover:text-[#ff6e4a] transition-colors cursor-pointer min-h-[46px]"
                >
                  <span>[ INITIATE CONTACT ]</span>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Step 6: Right Column enters in coordination with the main content */}
          <motion.div
            style={{
              y: yHeroRight,
              opacity: opacityHero,
            }}
            className="lg:col-span-5 will-change-transform"
          >
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.65, ease: easeEditorial }}
              className="space-y-5"
            >
              {/* Interactive Resonator Canvas */}
              <div className="h-64 sm:h-72 w-full shadow-2xl" aria-hidden="true">
                <InteractiveResonatorCanvas className="h-full" />
              </div>

            {/* Quick Architectural Spotlight Switcher (All 3 Flagship Projects) */}
            <div className="rounded-2xl arch-surface p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#262A36]">
                <div className="flex items-center gap-2 text-xs font-mono-tabular">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D26]" />
                  <span className="text-[#F4EFEA] font-semibold uppercase tracking-wider">
                    {activeSpotlight === 'metroflow'
                      ? 'PROJECT 01 // MAC-NATIVE'
                      : activeSpotlight === 'skillsync'
                        ? 'PROJECT 02 // CAREER-ROADMAP'
                        : 'PROJECT 03 // EVENT-OPS'}
                  </span>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0E1017] border border-[#262A36]">
                  <button
                    type="button"
                    onClick={() => setActiveSpotlight('metroflow')}
                    className={`px-2 py-1 text-[11px] font-mono-tabular rounded transition-colors cursor-pointer ${activeSpotlight === 'metroflow'
                      ? 'bg-[#FF4D26] text-white font-semibold'
                      : 'text-[#A8A39D] hover:text-white'
                      }`}
                  >
                    MetroFlow
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSpotlight('skillsync')}
                    className={`px-2 py-1 text-[11px] font-mono-tabular rounded transition-colors cursor-pointer ${activeSpotlight === 'skillsync'
                      ? 'bg-[#FF4D26] text-white font-semibold'
                      : 'text-[#A8A39D] hover:text-white'
                      }`}
                  >
                    SkillSync
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSpotlight('campuspulse')}
                    className={`px-2 py-1 text-[11px] font-mono-tabular rounded transition-colors cursor-pointer ${activeSpotlight === 'campuspulse'
                      ? 'bg-[#FF4D26] text-white font-semibold'
                      : 'text-[#A8A39D] hover:text-white'
                      }`}
                  >
                    CampusPulse
                  </button>
                </div>
              </div>

              {/* Animated Project Details Switching */}
              <AnimatePresence mode="wait">
                {currentProject && (
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.75, ease: easeEditorial }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-[#F4EFEA] tracking-tight">{currentProject.title}</h3>
                        <p className="text-xs text-[#8E8B85] mt-0.5">{currentProject.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('projects');
                          onOpenProject?.(currentProject.id);
                        }}
                        className="px-2.5 py-1 text-xs font-mono-tabular text-[#FF4D26] hover:text-white hover:bg-[#FF4D26] border border-[#FF4D26]/40 rounded-lg transition-all shrink-0 cursor-pointer"
                      >
                        SPECS &rarr;
                      </button>
                    </div>

                    <p className="text-xs text-[#D6CFC7] leading-relaxed line-clamp-2">
                      {currentProject.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentProject.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-[#141721] border border-[#262A36] text-[#F4EFEA]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Live Architectural Marquee Ticker */}
      <div aria-hidden="true" className="pt-6 sm:pt-8 border-t border-[#262A36] overflow-hidden select-none">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-mono-tabular tracking-widest text-[#8E8B85]">
            <span className="mx-6 text-[#F4EFEA] font-semibold">SYSTEM ARCHITECTURE</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#FF4D26]">APPLE SILICON ARM64 COREAUDIO</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6">TYPESCRIPT &bull; REACT 19 &bull; NODE.JS</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#10B981]">PRISMA ORM &bull; POSTGRESQL 16</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6">ELECTRON DESKTOP RUNTIME</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#F4EFEA] font-semibold">MEDI-CAPS CSE 2025–2029</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#FF4D26]">LOCAL PYTHON BRIDGE // PORT 8765</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#2563EB]">DETERMINISTIC READINESS METRICS</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6">SYSTEM ARCHITECTURE</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#FF4D26]">APPLE SILICON ARM64 COREAUDIO</span>
            <span className="mx-6">&bull;</span>
            <span className="mx-6 text-[#10B981]">PRISMA ORM &bull; POSTGRESQL 16</span>
          </div>
        </div>
      </div>
    </section>
  );
};
