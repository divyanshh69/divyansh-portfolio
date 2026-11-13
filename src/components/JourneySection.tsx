import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Calendar, Code2, Users, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { easeEditorial } from '../utils/motionVariants';
import { KineticHeading } from './KineticHeading';

const getMilestoneIcon = (category: string) => {
  switch (category) {
    case 'Academic':
      return <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />;
    case 'Projects':
      return <Code2 className="w-3.5 h-3.5 text-[#FF4D26]" aria-hidden="true" />;
    case 'Hackathons':
      return <Users className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />;
    default:
      return <Award className="w-3.5 h-3.5 text-[#A8A39D]" aria-hidden="true" />;
  }
};

export const JourneySection: React.FC = () => {
  const milestones = PORTFOLIO_DATA.journey;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [journeyProgressPct, setJourneyProgressPct] = useState<number>(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 70%'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      setJourneyProgressPct(Math.round(latest * 100));
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-16 sm:py-24 lg:py-32 border-b border-[#262A36] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Timeline Header with Kinetic Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262A36]">
          <KineticHeading
            id="journey-heading"
            tag="[ 04 // CHRONOLOGY & MILESTONES ]"
            firstLine="Academic & Engineering"
            secondLine="Timeline"
            className="max-w-3xl"
          />

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1017] border border-[#262A36] text-xs font-mono-tabular text-[#A8A39D] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>AUG 2025 &mdash; PRESENT &bull; ROADMAP</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#FF4D26]/10 border border-[#FF4D26]/20 text-xs font-mono-tabular text-[#FF4D26] font-semibold">
              SCROLL // {journeyProgressPct}%
            </div>
          </div>
        </div>

        {/* Vertical Timeline with Scroll-Driven Laser Progress Beam */}
        <div
          ref={timelineRef}
          className="relative pl-7 sm:pl-12 space-y-12 sm:space-y-16"
        >
          {/* Static Background Guide Track */}
          <div
            aria-hidden="true"
            className="absolute left-2 sm:left-4 top-2 bottom-6 w-[2px] bg-[#262A36]"
          />

          {/* Dynamic Laser Beam Progressive Draw */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute left-2 sm:left-4 top-2 bottom-6 w-[2px] bg-gradient-to-b from-[#FF4D26] via-[#FF4D26] to-[#10B981] origin-top shadow-[0_0_10px_rgba(255,77,38,0.6)] z-10"
            />
          )}

          <AnimatePresence mode="popLayout">
            {milestones.map((item, idx) => {
              const isFutureGoal = item.category === 'Future Goals';
              const isOngoing = item.period.includes('Present');

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={prefersReduced ? false : { opacity: 0, x: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.85, delay: idx * 0.06, ease: easeEditorial }}
                  className="relative group"
                >
                  {/* Node Dot with Laser Intersection */}
                  {isFutureGoal ? (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[27px] sm:-left-[41px] top-6 w-4 h-4 rounded-full bg-[#090A0E] border-2 border-dashed border-[#FF4D26]/80 group-hover:scale-125 transition-transform z-20 shadow-lg"
                    />
                  ) : isOngoing ? (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[27px] sm:-left-[41px] top-6 w-4 h-4 rounded-full bg-[#090A0E] border-2 border-[#10B981] ring-4 ring-[#10B981]/25 group-hover:scale-125 transition-transform z-20 shadow-lg"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute -left-[27px] sm:-left-[41px] top-6 w-4 h-4 rounded-full bg-[#FF4D26] border-2 border-[#090A0E] ring-2 ring-[#FF4D26]/40 group-hover:scale-125 transition-transform z-20 shadow-lg"
                    />
                  )}

                  <div
                    className={`p-6 sm:p-8 rounded-2xl arch-surface transition-all duration-300 space-y-4 border ${
                      isFutureGoal
                        ? 'border-[#FF4D26]/30 bg-[#0E0F16]'
                        : isOngoing
                        ? 'border-[#10B981]/30 bg-[#0A0D12]'
                        : 'border-[#262A36] hover:border-[#FF4D26]/40 hover:shadow-xl'
                    }`}
                  >
                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tabular">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#FF4D26] font-bold">
                          0{idx + 1} //
                        </span>
                        <span className="text-[#F4EFEA] font-semibold">{item.period}</span>
                        <span aria-hidden="true" className="text-[#8E8B85]">&bull;</span>
                        <span className="text-[#A8A39D] flex items-center gap-1.5">
                          {getMilestoneIcon(item.category)}
                          <span>{item.category}</span>
                        </span>
                        {isOngoing && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold">
                            ACTIVE
                          </span>
                        )}
                        {isFutureGoal && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#FF4D26]/15 text-[#FF4D26] border border-[#FF4D26]/30 font-semibold">
                            TARGET
                          </span>
                        )}
                      </div>

                      <span className="text-[#8E8B85] font-medium text-xs">
                        {item.organization}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4EFEA] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed max-w-3xl">
                        {item.summary}
                      </p>
                    </div>

                    {/* Outcomes / Objectives */}
                    <ul className="pt-3 space-y-2 border-t border-[#262A36]">
                      {item.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-xs text-[#A8A39D] leading-relaxed"
                        >
                          <span className="text-[#FF4D26] mt-0.5 font-bold">&rarr;</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
