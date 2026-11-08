import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowDownRight, ArrowRight, Terminal, Layers, Sparkles, Disc3, Calendar, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionId } from './Navbar';
import { InteractiveHeroCanvas } from './InteractiveHeroCanvas';
import { CardTilt } from './CardTilt';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
  onOpenProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProject }) => {
  const { personal, projects } = PORTFOLIO_DATA;
  const metroflowProject = projects.find((p) => p.id === 'metroflow');
  const campuspulseProject = projects.find((p) => p.id === 'campuspulse');
  const [imgError, setImgError] = useState(false);
  const [activeHudTab, setActiveHudTab] = useState<'workspace' | 'metroflow' | 'campuspulse'>('workspace');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setCurrentTime(`${ist} IST`);
      } catch {
        setCurrentTime('IST (UTC+5:30)');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      aria-label="Introduction and Hero"
      className="relative overflow-hidden border-b border-zinc-900 pt-8 pb-14 sm:pt-10 sm:pb-16 md:py-20"
    >
      {/* Interactive generative background layer */}
      <InteractiveHeroCanvas />

      {/* Subtle architectural background radial gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.1),transparent_48%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.03),transparent_40%)]"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 2-Column Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy & Cinematic Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-between py-1 sm:py-2"
          >
            <div className="space-y-5 sm:space-y-6">
              {/* Unboxed Kicker with Status & Live Clock */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs md:text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-blue-400 font-mono-tabular text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>Open to Internship Opportunities</span>
                </span>
                {currentTime && (
                  <span className="text-zinc-500 font-mono-tabular text-xs hidden sm:inline">
                    · {currentTime}
                  </span>
                )}
                <span className="text-zinc-400 tracking-wide font-medium text-xs sm:text-sm">
                  CS Engineering Student · Developer · Builder
                </span>
              </motion.div>

              {/* Primary Name & Statement with Cinematic Typographic Reveal */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h1
                  variants={itemVariants}
                  className="font-display text-3xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.06] [text-wrap:balance]"
                >
                  <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    {personal.name}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="font-editorial text-lg sm:text-2xl text-zinc-300 font-normal leading-snug max-w-2xl [text-wrap:balance]"
                >
                  {personal.headline}
                </motion.p>
              </div>

              {/* Confident Introduction */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[64ch]"
              >
                {personal.shortIntro}
              </motion.p>
            </div>

            {/* Primary & Secondary Call-To-Action Buttons */}
            <motion.div variants={itemVariants} className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-500 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explore My Work</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>About Me</span>
                <ArrowDownRight
                  className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('now')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>What I’m Building Now</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Studio & Engineering HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <CardTilt maxTilt={6} className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden liquid-glass shadow-2xl flex flex-col justify-between">
                {/* HUD View Switcher Tabs */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.06] bg-black/40 z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 font-mono-tabular text-[11px] text-zinc-400 hidden sm:inline">
                      divyansh.studio
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-0.5 sm:p-1 liquid-glass-pill rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveHudTab('workspace')}
                      className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
                        activeHudTab === 'workspace'
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Studio
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHudTab('metroflow')}
                      className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
                        activeHudTab === 'metroflow'
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      MetroFlow
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHudTab('campuspulse')}
                      className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
                        activeHudTab === 'campuspulse'
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      CampusPulse
                    </button>
                  </div>
                </div>

                {/* HUD Interactive Content Viewport */}
                <div className="relative min-h-[300px] sm:min-h-[400px] flex flex-col justify-between p-3 sm:p-4 bg-zinc-950">
                  {/* TAB 1: WORKSPACE IMAGE VIEW */}
                  {activeHudTab === 'workspace' && (
                    <div className="relative w-full h-full min-h-[330px] rounded-xl overflow-hidden flex flex-col justify-between">
                      {!imgError ? (
                        <img
                          src={personal.heroImage}
                          alt="Divyansh Nayak engineering workspace studio"
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-center">
                          <Terminal className="w-10 h-10 text-[#2563EB] mb-3" aria-hidden="true" />
                          <p className="text-sm font-medium text-zinc-200">Engineering Studio</p>
                          <p className="text-xs text-zinc-400 mt-1">macOS Native & Web Systems</p>
                        </div>
                      )}

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                      {/* Live overlay badges */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tabular">
                        <span className="px-2.5 py-1 rounded-md liquid-glass-pill text-zinc-300">
                          Student Developer · 2026
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300">
                          macOS & Full-Stack
                        </span>
                      </div>

                      {/* Bottom Scrim Text */}
                      <div className="relative z-10 space-y-1.5 pt-20">
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Layers className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                          <span>Projects In Development</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">2026</span>
                        </div>
                        <p className="text-sm font-medium text-white leading-snug">
                          Building MetroFlow for macOS & CampusPulse for college communities.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: METROFLOW REAL SPOTLIGHT */}
                  {activeHudTab === 'metroflow' && metroflowProject && (
                    <div className="w-full flex flex-col justify-between space-y-3 min-h-[330px]">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <Disc3 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                          <span>MetroFlow · macOS Player</span>
                        </span>
                        <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded liquid-glass-pill text-blue-300">
                          Apple Silicon ARM64
                        </span>
                      </div>

                      {/* Real Project Screenshot */}
                      <div
                        onClick={() => {
                          onNavigate('projects');
                          onOpenProject?.('metroflow');
                        }}
                        className="relative w-full aspect-[16/10] max-h-[220px] rounded-lg overflow-hidden bg-[#050508] border border-white/[0.08] flex items-center justify-center p-1.5 cursor-pointer group/heroimg"
                        title="Click to explore MetroFlow technical details"
                      >
                        <img
                          src={metroflowProject.image}
                          alt="MetroFlow native macOS music player interface"
                          className="w-full h-full object-contain rounded transition-transform duration-500 group-hover/heroimg:scale-[1.02]"
                        />
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {metroflowProject.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between gap-3 pt-1">
                          <p className="text-xs text-zinc-400 truncate">
                            Local audio playback, synchronized lyrics & mini-player.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              onNavigate('projects');
                              onOpenProject?.('metroflow');
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                          >
                            <span>Technical Details →</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CAMPUSPULSE REAL SPOTLIGHT */}
                  {activeHudTab === 'campuspulse' && campuspulseProject && (
                    <div className="w-full flex flex-col justify-between space-y-3 min-h-[330px]">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />
                          <span>CampusPulse · Club Platform</span>
                        </span>
                        <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded liquid-glass-pill text-emerald-300">
                          PostgreSQL Verified
                        </span>
                      </div>

                      {/* Real Project Screenshot */}
                      <div
                        onClick={() => {
                          onNavigate('projects');
                          onOpenProject?.('campuspulse');
                        }}
                        className="relative w-full aspect-[16/10] max-h-[220px] rounded-lg overflow-hidden bg-[#050508] border border-white/[0.08] flex items-center justify-center p-1.5 cursor-pointer group/heroimg"
                        title="Click to explore CampusPulse technical details"
                      >
                        <img
                          src={campuspulseProject.image}
                          alt="CampusPulse operations dashboard interface"
                          className="w-full h-full object-contain rounded transition-transform duration-500 group-hover/heroimg:scale-[1.02]"
                        />
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {campuspulseProject.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between gap-3 pt-1">
                          <p className="text-xs text-zinc-400 truncate">
                            Society operations, conflict-aware scheduling & RSVP tracking.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              onNavigate('projects');
                              onOpenProject?.('campuspulse');
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                          >
                            <span>Technical Details →</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardTilt>
          </motion.div>
        </div>

        {/* Full-Width Engineering Snapshot Row Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-zinc-900 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {personal.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="font-mono-tabular text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300">{metric.label}</div>
              <div className="text-[11px] sm:text-xs text-zinc-400">{metric.context}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
