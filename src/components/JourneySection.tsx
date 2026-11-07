import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { Award, CheckCircle2, Milestone, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, JourneyCategory } from '../data/portfolioData';
import { filterJourneyMilestones } from '../utils/portfolioLogic';
import { CardTilt } from './CardTilt';

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
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const milestones = filterJourneyMilestones(PORTFOLIO_DATA.journey, selectedCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !timelineContainerRef.current) return;

    const cards = timelineContainerRef.current.querySelectorAll('.journey-milestone-card');
    gsap.fromTo(
      cards,
      { opacity: 0.85, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: 'power2.out',
      }
    );
  }, [selectedCategory]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-14 sm:py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24">
        {/* Part 1: Animated Journey & Timeline */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="font-mono-tabular text-[#2563EB]">04.</span>
                <span>Journey & Timeline</span>
                <span aria-hidden="true">·</span>
                <span>Milestones, Roles & Future Trajectory</span>
              </div>
              <h2
                id="journey-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
              >
                From foundational CS theory to building practical software.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                A chronological look at the coursework, developer communities, hackathons, and independent engineering builds that shaped my craft.
              </p>
            </div>

            {/* Interactive Timeline Filter Controls */}
            <div
              role="group"
              aria-label="Filter journey milestones"
              className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 bg-[#0A0A0C] border border-zinc-800/80 rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar"
            >
              {JOURNEY_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vertical Timeline with Animated Connecting Line */}
          <div
            ref={timelineContainerRef}
            className="relative pl-4 sm:pl-10 border-l border-zinc-800 space-y-5 sm:space-y-8"
          >
            {/* Glowing Accent Gradient Overlay */}
            <div
              aria-hidden="true"
              className="absolute left-[-1px] top-0 bottom-10 w-[2px] bg-gradient-to-b from-[#2563EB] via-blue-500/40 to-transparent pointer-events-none"
            />

            <AnimatePresence mode="popLayout">
              {milestones.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="journey-milestone-card relative group"
                >
                  {/* Subtle Timeline Node Marker */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[22px] sm:-left-[46px] top-5 sm:top-6 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-950 border-2 border-[#2563EB] group-hover:scale-125 group-hover:bg-[#2563EB] transition-all duration-200"
                  />

                  <CardTilt maxTilt={3} className="rounded-2xl">
                    <div className="p-4 sm:p-8 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-colors space-y-3 sm:space-y-4 shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-mono-tabular text-[#2563EB] font-semibold">
                            0{idx + 1}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular text-zinc-200 font-medium">{item.period}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-zinc-300">{item.category}</span>
                        </div>
                        <span className="text-zinc-400 font-medium">{item.organization}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                        {item.summary}
                      </p>

                      <ul className="pt-2 space-y-1 sm:space-y-1.5 border-t border-zinc-900">
                        {item.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex items-start gap-2 text-xs text-zinc-300"
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardTilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Part 2: Achievements & Recognition */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-900">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3 mb-6 sm:mb-10">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB]">05.</span>
              <span>Achievements & Milestones</span>
              <span aria-hidden="true">·</span>
              <span>Hackathons, Leadership, Academics & Credentials</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Verified recognition across code, campus, and academics.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {PORTFOLIO_DATA.achievements.map((ach) => (
              <CardTilt key={ach.id} maxTilt={4} className="rounded-2xl">
                <div className="p-4 sm:p-6 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-3.5 sm:space-y-4 h-full shadow-lg">
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                      <span className="text-zinc-300 font-medium">{ach.category}</span>
                      <span className="font-mono-tabular text-zinc-500">{ach.date}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{ach.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{ach.detail}</p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-zinc-900 flex items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>{ach.issuerOrEvent}</span>
                    <span className="inline-flex items-center gap-1.5 text-zinc-200 font-medium">
                      <Award className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      <span>{ach.credentialRef}</span>
                    </span>
                  </div>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
