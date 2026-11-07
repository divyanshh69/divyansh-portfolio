import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';

export const AboutSection: React.FC = () => {
  const { about } = PORTFOLIO_DATA;
  const [activePillarId, setActivePillarId] = useState<string>(about.pillars[0].id);

  const activePillar =
    about.pillars.find((p) => p.id === activePillarId) || about.pillars[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono-tabular text-[#2563EB]">01.</span>
            <span>About Me</span>
            <span aria-hidden="true">·</span>
            <span>Background, Education, Interests & Motivation</span>
          </div>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
          >
            {about.sectionTitle}
          </h2>
          <p className="font-editorial text-lg sm:text-xl text-zinc-300 leading-relaxed">
            {about.lead}
          </p>
        </div>

        {/* Interactive Chapter Explorer + Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Pillar Selector */}
          <div
            role="tablist"
            aria-label="About Divyansh perspectives"
            className="lg:col-span-5 flex flex-col divide-y divide-zinc-900 border border-zinc-800/80 rounded-2xl bg-[#0A0A0C] overflow-hidden shadow-xl"
          >
            {about.pillars.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left px-6 py-5 transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-zinc-900/95 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-mono-tabular text-xs ${
                          isSelected ? 'text-[#2563EB] font-bold' : 'text-zinc-500'
                        }`}
                      >
                        {pillar.index}.
                      </span>
                      <span className="text-base font-semibold tracking-tight">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 pl-6">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <span
                    className={`font-mono-tabular text-xs mt-1 whitespace-nowrap shrink-0 px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#2563EB]/20 text-[#60A5FA] border border-blue-500/30'
                        : 'text-zinc-600'
                    }`}
                  >
                    {isSelected ? 'Active' : 'Read'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Spotlight Reader + Complete Overview Grid */}
          <div className="lg:col-span-7 space-y-6">
            <CardTilt maxTilt={3} className="rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="p-8 rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] space-y-5 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                    <div>
                      <span className="font-mono-tabular text-xs text-[#2563EB] font-semibold">
                        Perspective {activePillar.index}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {activePillar.title}
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400 hidden sm:inline font-mono-tabular">
                      {activePillar.subtitle}
                    </span>
                  </div>

                  <p className="text-base text-zinc-300 leading-relaxed">
                    {activePillar.content}
                  </p>

                  <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-zinc-400">Core Takeaway</span>
                    <span className="text-zinc-100 font-semibold bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                      {activePillar.keyTakeaway}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardTilt>

            {/* All-at-a-glance Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.pillars.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePillarId(item.id)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer space-y-2 ${
                    item.id === activePillarId
                      ? 'border-[#2563EB]/70 bg-zinc-900/60'
                      : 'border-zinc-900 bg-[#070709] hover:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-200">{item.title}</span>
                    <span className="font-mono-tabular text-zinc-500">{item.index}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
