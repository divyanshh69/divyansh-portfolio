import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Hammer,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { about, beyondResume } = PORTFOLIO_DATA;
  const [showMindsetDetails, setShowMindsetDetails] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 border-b border-white/[0.06] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
            <span className="text-[#2563EB] font-bold">01.</span>
            <span className="uppercase tracking-wider">About</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span>Education & Approach</span>
          </div>

          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
          >
            Education & Technical Approach
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {about.lead}
          </p>
        </div>

        {/* 2 Focused Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Academic Track */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0c0d14] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="font-mono-tabular text-xs text-zinc-400">Aug 2025 — Present</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Medi-Caps University</h3>
                <p className="text-xs text-zinc-400 font-medium">
                  B.Tech in Computer Science & Engineering (2nd Year)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Enrolled in August 2025. Currently building core strength across Data Structures,
                Object-Oriented Programming, Relational Databases, and Computer Architecture while
                applying coursework directly to functional software builds.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs space-y-1.5">
              <span className="text-zinc-500 font-mono-tabular">Coursework Applied:</span>
              <div className="text-zinc-200 font-medium">
                Data Structures · SQL Schemas · System Fundamentals
              </div>
            </div>
          </div>

          {/* Card 2: Engineering Approach & Direction */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0c0d14] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Hammer className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="font-mono-tabular text-xs text-zinc-400">Focus & Direction</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Learn by Building</h3>
                <p className="text-xs text-zinc-400 font-medium">
                  Architecture, User Experience & Open to Internships
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                I believe architecture and state management make sense when you build from an empty directory to
                a working application. I enjoy engineering native macOS utilities and relational web platforms, and I am actively
                seeking software engineering internship opportunities.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs space-y-1.5">
              <span className="text-zinc-500 font-mono-tabular">Technical Interests:</span>
              <div className="text-zinc-200 font-medium">
                macOS Desktop Architecture · Full-Stack Systems · Relational DBs
              </div>
            </div>
          </div>
        </div>

        {/* Mindset & Practices Expandable Section */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d14] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowMindsetDetails((prev) => !prev)}
            aria-expanded={showMindsetDetails}
            aria-controls="mindset-details-panel"
            className="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer min-h-[48px]"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="text-sm font-semibold text-white">
                  Engineering Practices & Growth Roadmap
                </span>
                <span className="hidden sm:inline text-xs text-zinc-400 ml-2">
                  (Technical habits, development approaches, and active study focus)
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                showMindsetDetails ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {showMindsetDetails && (
              <motion.div
                id="mindset-details-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="px-6 pb-6 pt-2 border-t border-white/[0.06] space-y-6"
              >
                {/* Strengths & Growth Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {/* Strengths */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Technical Strengths & Habits</span>
                    </h4>
                    <div className="space-y-2.5">
                      {beyondResume.strengths.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04] space-y-1"
                        >
                          <div className="text-xs font-semibold text-white">{item.title}</div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                          <div className="text-[11px] text-zinc-500 font-mono-tabular pt-1">
                            Applied in: {item.evidence}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Areas */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Active Learning & Growth Areas</span>
                    </h4>
                    <div className="space-y-2.5">
                      {beyondResume.growthAreas.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04] space-y-1"
                        >
                          <div className="text-xs font-semibold text-white">{item.title}</div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.honestReflection}</p>
                          <div className="text-[11px] text-blue-300 font-mono-tabular pt-1">
                            Action Plan: {item.activeActionPlan}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
