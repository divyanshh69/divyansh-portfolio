import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowDownRight,
  Github,
  Linkedin,
  Disc3,
  Calendar,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionId } from './Navbar';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
  onOpenProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProject }) => {
  const { personal, projects } = PORTFOLIO_DATA;
  const metroflow = projects.find((p) => p.id === 'metroflow');
  const campuspulse = projects.find((p) => p.id === 'campuspulse');

  const [activeSpotlight, setActiveSpotlight] = useState<'metroflow' | 'campuspulse'>('metroflow');
  const currentProject = activeSpotlight === 'metroflow' ? metroflow : campuspulse;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      aria-label="Introduction and Overview"
      className="relative pt-10 sm:pt-16 md:pt-20 pb-16 sm:pb-20 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Subtle Restrained Engineering Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-35 [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_75%)]"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Introduction */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Status & University Kicker */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-tabular bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Open to Internship Opportunities</span>
              </span>
              <span className="text-xs text-zinc-400 font-mono-tabular hidden sm:inline">
                Medi-Caps University · 2nd-Year CSE
              </span>
            </motion.div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]"
              >
                {personal.name}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-zinc-200 font-medium leading-snug [text-wrap:balance]"
              >
                Building native macOS desktop tools and full-stack web platforms.
              </motion.p>
            </div>

            {/* Authentic Bio */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[62ch]"
            >
              I am a 2nd-year Computer Science student at{' '}
              <span className="text-zinc-200 font-medium">Medi-Caps University</span>.
              I build desktop applications with Electron and React, and full-stack web applications backed by PostgreSQL.
            </motion.p>

            {/* Primary & External CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-3.5"
            >
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-500 transition-colors cursor-pointer min-h-[44px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer min-h-[44px]"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" aria-hidden="true" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer min-h-[44px]"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer min-h-[44px]"
              >
                <span>About Me</span>
                <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Authentic Interactive Project Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/[0.1] bg-[#0c0d14] overflow-hidden shadow-xl">
              {/* Clean Spotlight Header */}
              <div className="px-4 py-3 bg-[#11121c] border-b border-white/[0.08] flex items-center justify-between gap-3">
                <span className="font-mono-tabular text-xs font-medium text-zinc-300">
                  Featured Application
                </span>

                {/* Project Switcher Tabs */}
                <div
                  role="tablist"
                  aria-label="Spotlight projects"
                  className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/[0.06]"
                >
                  <button
                    type="button"
                    role="tab"
                    id="spotlight-tab-metroflow"
                    aria-selected={activeSpotlight === 'metroflow'}
                    aria-controls="spotlight-viewport-panel"
                    onClick={() => setActiveSpotlight('metroflow')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium font-mono-tabular transition-colors cursor-pointer min-h-[30px] ${
                      activeSpotlight === 'metroflow'
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    MetroFlow
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="spotlight-tab-campuspulse"
                    aria-selected={activeSpotlight === 'campuspulse'}
                    aria-controls="spotlight-viewport-panel"
                    onClick={() => setActiveSpotlight('campuspulse')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium font-mono-tabular transition-colors cursor-pointer min-h-[30px] ${
                      activeSpotlight === 'campuspulse'
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    CampusPulse
                  </button>
                </div>
              </div>

              {/* Spotlight Viewport */}
              {currentProject && (
                <div
                  id="spotlight-viewport-panel"
                  role="tabpanel"
                  aria-labelledby={`spotlight-tab-${activeSpotlight}`}
                  className="p-4 sm:p-5 space-y-4"
                >
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-zinc-300 font-medium">
                      {activeSpotlight === 'metroflow' ? (
                        <>
                          <Disc3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>macOS Desktop Application</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />
                          <span>Full-Stack Web Platform</span>
                        </>
                      )}
                    </span>
                    <span className="font-mono-tabular text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-400">
                      {currentProject.year} · {currentProject.status}
                    </span>
                  </div>

                  {/* Real Screenshot Preview */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore ${currentProject.title} technical architecture`}
                    onClick={() => {
                      onNavigate('projects');
                      onOpenProject?.(currentProject.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate('projects');
                        onOpenProject?.(currentProject.id);
                      }
                    }}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#07070a] border border-white/[0.08] flex items-center justify-center p-2 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                    title={`Click to explore ${currentProject.title} technical architecture`}
                  >
                    <img
                      src={currentProject.image}
                      alt={`${currentProject.title} interface preview`}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </div>

                  {/* Summary & Tags */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{currentProject.title}</h3>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('projects');
                          onOpenProject?.(currentProject.id);
                        }}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Specs & Case Study →</span>
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {currentProject.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentProject.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
