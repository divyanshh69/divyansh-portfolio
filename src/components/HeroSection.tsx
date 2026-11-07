import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowDownRight, ArrowRight, Terminal, Layers, Sparkles, Disc3, Calendar, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SectionId } from './Navbar';
import { InteractiveHeroCanvas } from './InteractiveHeroCanvas';
import { CardTilt } from './CardTilt';
import { InteractiveAudioSpectrum } from './InteractiveAudioSpectrum';
import { InteractiveCampusPulsePreview } from './InteractiveCampusPulsePreview';

interface HeroSectionProps {
  onNavigate: (id: SectionId) => void;
  onOpenProject?: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProject }) => {
  const { personal } = PORTFOLIO_DATA;
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
      className="relative overflow-hidden border-b border-zinc-900 pt-10 pb-16 md:py-20"
    >
      {/* Interactive generative background layer */}
      <InteractiveHeroCanvas />

      {/* Subtle architectural background radial gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.1),transparent_48%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.03),transparent_40%)]"
      />

      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* 2-Column Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy & Cinematic Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div className="space-y-6">
              {/* Unboxed Kicker with Status & Live Clock */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono-tabular text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>Available for SDE 2026</span>
                </span>
                {currentTime && (
                  <span className="text-zinc-500 font-mono-tabular text-xs hidden sm:inline">
                    · {currentTime}
                  </span>
                )}
                <span className="text-zinc-400 tracking-wide font-medium">
                  CS Engineering Student · Developer · Builder
                </span>
              </motion.div>

              {/* Primary Name & Statement with Cinematic Typographic Reveal */}
              <div className="space-y-4">
                <motion.h1
                  variants={itemVariants}
                  className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-white leading-[1.06] [text-wrap:balance]"
                >
                  <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    {personal.name}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="font-editorial text-xl sm:text-2xl text-zinc-300 font-normal leading-snug max-w-2xl [text-wrap:balance]"
                >
                  {personal.headline}
                </motion.p>
              </div>

              {/* Confident Introduction */}
              <motion.p
                variants={itemVariants}
                className="text-base text-zinc-400 leading-relaxed max-w-[64ch]"
              >
                {personal.shortIntro}
              </motion.p>
            </div>

            {/* Primary & Secondary Call-To-Action Buttons */}
            <motion.div variants={itemVariants} className="pt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-500 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
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
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
              <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#0A0A0C] shadow-2xl flex flex-col justify-between">
                {/* HUD View Switcher Tabs */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/90 bg-[#0C0C10] z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 font-mono-tabular text-[11px] text-zinc-400 hidden sm:inline">
                      divyansh.studio
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveHudTab('workspace')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
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
                <div className="relative min-h-[340px] sm:min-h-[400px] flex flex-col justify-between p-4 bg-zinc-950">
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
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-zinc-800 text-zinc-300">
                          Active Build: 2026.1
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300">
                          Latency: &lt;8ms
                        </span>
                      </div>

                      {/* Bottom Scrim Text */}
                      <div className="relative z-10 space-y-1.5 pt-20">
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Layers className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                          <span>Featured Engineering Focus</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">2026</span>
                        </div>
                        <p className="text-sm font-medium text-white leading-snug">
                          Crafting MetroFlow for macOS & CampusPulse for university communities.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: METROFLOW LIVE WAVEFORM */}
                  {activeHudTab === 'metroflow' && (
                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <Disc3 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                          MetroFlow Audio Engine
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate('projects');
                            onOpenProject?.('metroflow');
                          }}
                          className="text-[11px] text-[#60A5FA] hover:underline cursor-pointer"
                        >
                          Open Full Case Study →
                        </button>
                      </div>
                      <InteractiveAudioSpectrum compact />
                    </div>
                  )}

                  {/* TAB 3: CAMPUSPULSE PREVIEW */}
                  {activeHudTab === 'campuspulse' && (
                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" />
                          CampusPulse Telemetry
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate('projects');
                            onOpenProject?.('campuspulse');
                          }}
                          className="text-[11px] text-[#60A5FA] hover:underline cursor-pointer"
                        >
                          Open Full Case Study →
                        </button>
                      </div>
                      <InteractiveCampusPulsePreview />
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
          className="mt-14 pt-8 border-t border-zinc-900 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {personal.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-zinc-300">{metric.label}</div>
              <div className="text-xs text-zinc-400">{metric.context}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
