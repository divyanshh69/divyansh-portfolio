import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Clock, Terminal, CheckCircle2, ArrowRight, Sparkles, BookOpen, Hammer, Compass, Target } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CardTilt } from './CardTilt';

export const NowSection: React.FC = () => {
  const { now } = PORTFOLIO_DATA;
  const [selectedNowId, setSelectedNowId] = useState<string>(now.items[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Currently Building', 'Currently Learning', 'Current Goal', 'Currently Exploring'];

  const filteredItems =
    filterCategory === 'All'
      ? now.items
      : now.items.filter((item) => item.category === filterCategory);

  const activeItem = now.items.find((i) => i.id === selectedNowId) || now.items[0];

  const categoryIcons: Record<string, React.ReactNode> = {
    'Currently Building': <Hammer className="w-3.5 h-3.5 text-blue-400" />,
    'Currently Learning': <BookOpen className="w-3.5 h-3.5 text-emerald-400" />,
    'Current Goal': <Target className="w-3.5 h-3.5 text-amber-400" />,
    'Currently Exploring': <Compass className="w-3.5 h-3.5 text-purple-400" />,
  };

  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="py-14 sm:py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB]">07.</span>
              <span>Now</span>
              <span aria-hidden="true">·</span>
              <span>Current Focus</span>
            </div>
            <h2
              id="now-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              What I am building, studying, and exploring right now.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              A transparent look at my current project priorities, study areas, and upcoming software development goals.
            </p>
          </div>

          <div className="text-xs text-zinc-400 space-y-1 md:text-right shrink-0 p-3 sm:p-3.5 rounded-xl liquid-glass-surface">
            <div className="flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-200 font-medium">Active Focus · {now.lastUpdated}</span>
            </div>
            <div className="text-zinc-400">{now.locationStatus}</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 liquid-glass-pill rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Now Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedNowId;
            return (
              <CardTilt key={item.id} maxTilt={4} className="rounded-2xl">
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  onClick={() => setSelectedNowId(item.id)}
                  className={`p-4.5 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 sm:space-y-5 h-full ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#0C0F17] shadow-xl shadow-blue-500/5'
                      : 'border-zinc-800/90 bg-[#0A0A0C] hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                        {categoryIcons[item.category] || <span>{item.emoji}</span>}
                        <span>{item.category}</span>
                      </span>
                      <span className="font-mono-tabular text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px]">
                        {item.updatedAt}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {item.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-zinc-900 space-y-2 sm:space-y-2.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                      <span className="text-zinc-400 font-medium shrink-0">Recent Milestone:</span>
                      <span className="text-zinc-200 sm:text-right sm:max-w-xs">{item.recentMilestone}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                      <span className="text-zinc-400 font-medium shrink-0">Next Up:</span>
                      <span className="text-[#60A5FA] font-medium sm:text-right sm:max-w-xs">{item.nextStep}</span>
                    </div>
                  </div>
                </motion.article>
              </CardTilt>
            );
          })}
        </div>

        {/* Active Focus Spotlight Callout */}
        <div className="p-4 sm:p-6 rounded-2xl border border-zinc-800 bg-[#08080A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Deep-Dive Focus · {activeItem.category}</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">
              {activeItem.headline} —{' '}
              <span className="text-zinc-300 font-normal">{activeItem.nextStep}</span>
            </div>
          </div>
          <span className="font-mono-tabular text-xs text-zinc-400 whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
            Status: {activeItem.updatedAt}
          </span>
        </div>
      </div>
    </section>
  );
};
