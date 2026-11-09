import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA, JourneyCategory } from '../data/portfolioData';
import { filterJourneyMilestones } from '../utils/portfolioLogic';

const JOURNEY_CATEGORIES: JourneyCategory[] = [
  'All',
  'Education',
  'Projects',
  'Hackathons',
  'Club Roles',
  'Future Goals',
];

export const JourneySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<JourneyCategory>('All');
  const milestones = filterJourneyMilestones(PORTFOLIO_DATA.journey, selectedCategory);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-16 sm:py-24 border-b border-white/[0.06] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">
        {/* Timeline Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
              <span className="text-[#2563EB] font-bold">04.</span>
              <span className="uppercase tracking-wider">Experience & Timeline</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Academic & Projects</span>
            </div>

            <h2
              id="journey-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              Academic timeline and engineering milestones.
            </h2>

            <p className="font-editorial text-lg sm:text-xl text-zinc-300 leading-relaxed [text-wrap:balance]">
              A chronological overview of university enrollment at Medi-Caps, collegiate hackathons, and software projects.
            </p>
          </div>

          {/* Timeline Category Filter */}
          <div
            role="group"
            aria-label="Filter journey milestones"
            className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-full sm:w-fit overflow-x-auto no-scrollbar shrink-0"
          >
            {JOURNEY_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-5 sm:pl-8 border-l border-white/[0.1] space-y-8 sm:space-y-10">
          <AnimatePresence mode="popLayout">
            {milestones.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                {/* Node Dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-[#08090d] border-2 border-[#2563EB] group-hover:scale-125 transition-transform"
                />

                <div className="p-5 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0c0d14] hover:border-white/20 transition-all space-y-3.5 shadow-md">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                    <div className="flex items-center gap-2">
                      <span className="text-[#2563EB] font-bold">0{idx + 1}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="text-white font-medium">{item.period}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="text-zinc-400">{item.category}</span>
                    </div>
                    <span className="text-blue-400 font-medium">{item.organization}</span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                      {item.summary}
                    </p>
                  </div>

                  {/* Outcomes Checklist */}
                  <ul className="pt-2 space-y-1.5 border-t border-white/[0.06]">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Milestones & Recognitions Sub-Block */}
        <div className="pt-6 sm:pt-10 border-t border-white/[0.06] space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
              <span className="text-[#2563EB] font-bold">05.</span>
              <span className="uppercase tracking-wider">Milestones</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Hackathons & Community</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Collegiate milestones and community involvement.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PORTFOLIO_DATA.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c0d14] flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-blue-400 font-medium">{ach.category}</span>
                    <span className="text-zinc-500">{ach.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{ach.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{ach.detail}</p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span>{ach.issuerOrEvent}</span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-200 font-medium">
                    <Award className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                    <span>{ach.credentialRef}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
