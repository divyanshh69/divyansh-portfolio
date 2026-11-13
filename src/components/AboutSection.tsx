import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  GraduationCap,
  Hammer,
  ChevronDown,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { easeEditorial } from '../utils/motionVariants';
import { KineticHeading } from './KineticHeading';

const DEVELOPMENT_STEPS = [
  {
    step: '01',
    title: 'Deconstruct the Problem',
    detail: 'Understand user requirements, edge cases, and runtime constraints thoroughly before reaching for libraries or frameworks.',
  },
  {
    step: '02',
    title: 'Model Data & Boundaries',
    detail: 'Design clean schemas, relational foreign keys, and TypeScript contracts to establish unambiguous application boundaries.',
  },
  {
    step: '03',
    title: 'Build Incrementally',
    detail: 'Ship from the essential core feedback loop outward—validating data flow and state management before adding interface flourishes.',
  },
  {
    step: '04',
    title: 'Verify Key User Flows',
    detail: 'Manually test critical paths, edge cases, and asynchronous error boundaries to ensure dependable real-world execution.',
  },
  {
    step: '05',
    title: 'Refine Usability & Ergonomics',
    detail: 'Dial in keyboard shortcuts, layout spacing, visual hierarchy, and performance profiling for a polished developer experience.',
  },
];

export const AboutSection: React.FC = () => {
  const { about, beyondResume } = PORTFOLIO_DATA;
  const [showMindsetDetails, setShowMindsetDetails] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);

      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        media.removeEventListener('change', listener);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered vertical parallax for desktop (differential depth between panels)
  const yPanel1 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced || isMobile ? [0, 0] : [35, -35]
  );
  const yPanel2 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced || isMobile ? [0, 0] : [70, -25]
  );
  const bgParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced || isMobile ? [0, 0] : [-20, 25]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 lg:py-32 border-b border-[#262A36] relative overflow-hidden"
    >
      {/* Restrained Architectural Grid Parallax Layer */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgParallax }}
        className="pointer-events-none absolute inset-0 arch-grid-pattern opacity-25 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_75%)]"
      />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {/* Section Header with Kinetic Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262A36]">
          <KineticHeading
            id="about-heading"
            tag="[ 01 // IDENTITY & APPROACH ]"
            firstLine="Academic Foundation &"
            secondLine="Engineering Approach"
            className="max-w-3xl"
          />

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.25, ease: easeEditorial }}
            className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed max-w-md font-sans"
          >
            {about.lead}
          </motion.p>
        </div>

        {/* 2 Main Architectural Panels with Layered Differential Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Panel 1: University & Applied Coursework (lg:col-span-7) */}
          <motion.div
            style={{ y: yPanel1 }}
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.88, ease: easeEditorial }}
            className="lg:col-span-7 rounded-2xl arch-surface p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#262A36]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono-tabular text-xs text-[#FF4D26] tracking-wider uppercase font-semibold">Degree Program</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F4EFEA]">Medi-Caps University</h3>
                  </div>
                </div>

                <span className="font-mono-tabular text-xs text-[#A8A39D] px-2.5 py-1 rounded bg-[#0E1017] border border-[#262A36]">
                  Aug 2025 &mdash; Present
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#F4EFEA]">
                  B.Tech in Computer Science &amp; Engineering (2nd Year)
                </div>
                <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                  Enrolled in August 2025. Currently building core strength across Data Structures, Object-Oriented Programming, Relational Database Systems, and Computer Architecture while directly translating theory into working software.
                </p>
              </div>

              {/* Coursework mapping grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1">
                  <div className="text-xs font-mono-tabular font-semibold text-[#F4EFEA] flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Data Structures (C++)</span>
                  </div>
                  <p className="text-[11px] text-[#8E8B85] leading-snug">
                    Trees, graphs, and hash indexing applied in algorithmic problem-solving.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1">
                  <div className="text-xs font-mono-tabular font-semibold text-[#F4EFEA] flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Relational Schemas</span>
                  </div>
                  <p className="text-[11px] text-[#8E8B85] leading-snug">
                    Prisma ORM and PostgreSQL normalization applied in SkillSync and CampusPulse.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1">
                  <div className="text-xs font-mono-tabular font-semibold text-[#F4EFEA] flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#FF4D26]" />
                    <span>Desktop Systems</span>
                  </div>
                  <p className="text-[11px] text-[#8E8B85] leading-snug">
                    libmpv CoreAudio, IPC bridges, and window management in MetroFlow.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262A36] flex items-center justify-between text-xs font-mono-tabular text-[#8E8B85]">
              <span>ENROLLMENT: MEDI-CAPS CSE 2025</span>
              <span className="text-[#FF4D26] font-semibold">INDORE, INDIA</span>
            </div>
          </motion.div>

          {/* Panel 2: Philosophy & Focus with Layered Depth (lg:col-span-5) */}
          <motion.div
            style={{ y: yPanel2 }}
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.88, delay: 0.14, ease: easeEditorial }}
            className="lg:col-span-5 rounded-2xl arch-surface p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262A36]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4D26]/10 border border-[#FF4D26]/25 flex items-center justify-center text-[#FF4D26] shrink-0">
                    <Hammer className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono-tabular text-xs text-[#FF4D26] tracking-wider uppercase font-semibold">Core Principle</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F4EFEA]">Learn by Building</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                  I believe system architecture, state flow, and database models become intuitive when you start from an empty folder and build until a real tool works smoothly.
                </p>

                <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                  I prioritize desktop ergonomics, responsive keyboard shortcuts, clean relational schemas, and strict TypeScript types over superficial novelty.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FF4D26]/5 border border-[#FF4D26]/20 space-y-1">
                <span className="text-[11px] font-mono-tabular font-semibold text-[#FF4D26] uppercase">2026 Target</span>
                <p className="text-xs text-[#F4EFEA]">
                  Seeking software engineering internship opportunities where I can contribute to production systems and learn team workflows from experienced mentors.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262A36] text-xs font-mono-tabular text-[#8E8B85]">
              <span>DEVELOPMENT FOCUS: DESKTOP &amp; DISTRIBUTED WEB</span>
            </div>
          </motion.div>
        </div>

        {/* Development Approach Progression Strip */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.88, ease: easeEditorial }}
          className="rounded-2xl arch-surface p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#262A36]">
            <div>
              <span className="text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-wider font-semibold">
                Engineering Method
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#F4EFEA] tracking-tight">
                How I Approach Building Software
              </h3>
            </div>
            <span className="text-xs font-mono-tabular text-[#8E8B85]">
              DISCIPLINED &bull; INCREMENTAL &bull; VERIFIABLE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {DEVELOPMENT_STEPS.map((step, sIdx) => (
              <motion.div
                key={step.step}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: sIdx * 0.08, ease: easeEditorial }}
                className="p-4 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-2 flex flex-col justify-between transition-colors hover:border-[#FF4D26]/30"
              >
                <div className="space-y-1.5">
                  <span className="font-mono-tabular text-xs font-bold text-[#FF4D26]">
                    {step.step} //
                  </span>
                  <h4 className="text-xs font-bold text-[#F4EFEA]">{step.title}</h4>
                </div>
                <p className="text-[11px] text-[#8E8B85] leading-relaxed pt-1 border-t border-[#262A36]/50">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expandable Engineering Practices & Growth Drawer */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: easeEditorial }}
          className="rounded-2xl arch-surface overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setShowMindsetDetails((prev) => !prev)}
            aria-expanded={showMindsetDetails}
            className="w-full px-6 py-4.5 min-h-[52px] flex items-center justify-between gap-4 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#FF4D26]" />
              <div>
                <h4 className="text-sm font-bold text-[#F4EFEA]">Engineering Practices &amp; Growth Areas</h4>
                <p className="text-xs text-[#8E8B85]">Daily habits, architectural reflections, and active learning areas</p>
              </div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-[#8E8B85] transition-transform duration-300 ${
                showMindsetDetails ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {showMindsetDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: easeEditorial }}
                className="px-6 pb-6 pt-2 border-t border-[#262A36] space-y-6"
              >
                {/* Strengths */}
                <div className="space-y-3">
                  <span className="text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-wider font-semibold">
                    Core Technical Strengths:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {beyondResume.strengths.map((str) => (
                      <div
                        key={str.id}
                        className="p-4 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1.5"
                      >
                        <h5 className="text-xs font-bold text-[#F4EFEA]">{str.title}</h5>
                        <p className="text-xs text-[#D6CFC7] leading-relaxed">{str.description}</p>
                        <p className="text-[11px] font-mono-tabular text-[#8E8B85] pt-1">
                          Evidence: {str.evidence}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth Areas */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono-tabular text-[#38BDF8] uppercase tracking-wider font-semibold">
                    Active Growth &amp; Learning Areas:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {beyondResume.growthAreas.map((grw) => (
                      <div
                        key={grw.id}
                        className="p-4 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-[#F4EFEA]">{grw.title}</h5>
                          <p className="text-xs text-[#8E8B85] leading-relaxed">{grw.honestReflection}</p>
                        </div>
                        <p className="text-[11px] font-mono-tabular text-[#10B981] pt-1">
                          Action: {grw.activeActionPlan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
