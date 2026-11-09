import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code2, Cpu, Wrench, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory, SkillItem } from '../data/portfolioData';
import { filterSkillsByCategory } from '../utils/portfolioLogic';

const SKILL_CATEGORIES: SkillCategory[] = [
  'All',
  'Programming',
  'Web Development',
  'Tools & Technologies',
  'Currently Learning',
];

const getSkillBadgeText = (skill: SkillItem): string => {
  if (skill.category === 'Currently Learning') {
    return 'Active Study';
  }
  const realProjects = ['MetroFlow', 'CampusPulse', 'Personal Portfolio'];
  const projectCount = skill.usedIn.filter((p) => realProjects.includes(p)).length;
  if (projectCount > 0) {
    return `${projectCount} ${projectCount === 1 ? 'Project' : 'Projects'}`;
  }
  return 'Coursework & Practice';
};

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
      className="py-16 sm:py-24 border-b border-white/[0.06] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
              <span className="text-[#2563EB] font-bold">03.</span>
              <span className="uppercase tracking-wider">Technical Skills</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Tools & Stack</span>
            </div>

            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              Technologies I use to build software.
            </h2>

            <p className="font-editorial text-lg sm:text-xl text-zinc-300 leading-relaxed [text-wrap:balance]">
              Organized into clear areas of practice—every tool represents direct application in real projects or coursework.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <label htmlFor="skill-search" className="sr-only">
              Search skills or projects
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
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          role="group"
          aria-label="Filter skills by category"
          className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-full sm:w-fit overflow-x-auto no-scrollbar shrink-0"
        >
          {SKILL_CATEGORIES.map((category) => {
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

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-2xl border border-white/[0.08] bg-[#0c0d14] text-center space-y-3">
            <p className="text-sm font-medium text-zinc-300">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.article
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c0d14] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono-tabular text-zinc-400 text-[11px]">
                        {skill.category}
                      </span>
                      <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {getSkillBadgeText(skill)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {skill.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {skill.context}
                    </p>

                    <p className="text-xs text-zinc-400 leading-relaxed pt-0.5">
                      {skill.experienceNote}
                    </p>
                  </div>

                  {/* Project application footer */}
                  <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-zinc-500 font-mono-tabular text-[11px]">
                      {skill.category === 'Currently Learning' ? 'Study focus:' : 'Applied in:'}
                    </span>
                    {skill.usedIn.map((proj, i) => (
                      <React.Fragment key={proj}>
                        <span className="text-zinc-200 font-medium text-xs">{proj}</span>
                        {i < skill.usedIn.length - 1 && (
                          <span aria-hidden="true" className="text-zinc-600">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
