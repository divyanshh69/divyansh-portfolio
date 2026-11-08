import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code2, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData';
import { filterSkillsByCategory } from '../utils/portfolioLogic';
import { CardTilt } from './CardTilt';

const SKILL_CATEGORIES: SkillCategory[] = [
  'All',
  'Programming',
  'Web Development',
  'Tools & Technologies',
  'Currently Learning',
];

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = filterSkillsByCategory(
    PORTFOLIO_DATA.skills,
    selectedCategory,
    searchQuery
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-14 sm:py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB]">02.</span>
              <span>Skills</span>
              <span aria-hidden="true">·</span>
              <span>Technologies & Tools</span>
            </div>
            <h2
              id="skills-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              Technologies I use to build software.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Rather than arbitrary skill bars, each technology reflects practical usage in my coursework and personal projects.
            </p>
          </div>

          {/* Search Filter Input */}
          <div className="w-full lg:w-72">
            <label htmlFor="skill-search" className="sr-only">
              Filter skills by name or project
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="skill-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skill or project..."
                className="w-full pl-10 pr-4 py-2.5 text-sm liquid-glass-surface rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          role="group"
          aria-label="Filter skills by category"
          className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 liquid-glass-pill rounded-xl w-full sm:w-fit mb-8 sm:mb-10 overflow-x-auto no-scrollbar"
        >
          {SKILL_CATEGORIES.map((category) => {
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

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] text-center space-y-3">
            <p className="text-base font-medium text-zinc-200">
              No matching skills found for "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <CardTilt key={skill.id} maxTilt={3} className="rounded-2xl">
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="group p-4.5 sm:p-6 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4 sm:space-y-5 h-full shadow-lg"
                  >
                    <div className="space-y-3">
                      {/* Clean unboxed metadata kicker */}
                      <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                        <span>{skill.category}</span>
                        <span className="font-mono-tabular text-zinc-400">
                          {skill.usedIn.length} {skill.usedIn.length === 1 ? 'System' : 'Systems'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                        {skill.name}
                      </h3>

                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {skill.context}
                      </p>

                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {skill.experienceNote}
                      </p>
                    </div>

                    {/* Unboxed project usage footer */}
                    <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                      <span className="text-zinc-500">Applied in:</span>
                      {skill.usedIn.map((proj, i) => (
                        <React.Fragment key={proj}>
                          <span className="text-zinc-200 font-medium">{proj}</span>
                          {i < skill.usedIn.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </motion.article>
                </CardTilt>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
