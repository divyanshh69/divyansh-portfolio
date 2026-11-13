import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA, SkillCategory, SkillItem } from '../data/portfolioData';
import { filterSkillsByCategory } from '../utils/portfolioLogic';
import { SkillConstellationCanvas } from './SkillConstellationCanvas';
import { easeEditorial } from '../utils/motionVariants';
import { KineticHeading } from './KineticHeading';
import { Magnetic } from './Magnetic';

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
  const realProjects = ['MetroFlow', 'SkillSync', 'CampusPulse', 'Personal Portfolio'];
  const projectCount = skill.usedIn.filter((p) => realProjects.includes(p)).length;
  if (projectCount > 0) {
    return `${projectCount} ${projectCount === 1 ? 'Project' : 'Projects'}`;
  }
  return 'Coursework & Practice';
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [activeHoveredSkill, setActiveHoveredSkill] = useState<string | null>(null);

  const filteredSkills = filterSkillsByCategory(
    PORTFOLIO_DATA.skills,
    selectedCategory
  );

  const handleSelectSkillFromConstellation = (skillName: string) => {
    // If the skill matches one of our categorized items, highlight it
    const match = PORTFOLIO_DATA.skills.find(
      (s) =>
        s.name.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (match) {
      setActiveHoveredSkill(match.id);
      setTimeout(() => setActiveHoveredSkill(null), 3500);
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 sm:py-24 lg:py-32 border-b border-[#262A36] relative"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Kinetic Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262A36]">
          <KineticHeading
            id="skills-heading"
            tag="[ 03 // TECHNICAL CAPABILITIES ]"
            firstLine="Technical Matrix &"
            secondLine="Applied Tools"
            className="max-w-3xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.25, ease: easeEditorial }}
            className="text-sm sm:text-base text-[#D6CFC7] leading-relaxed max-w-md font-sans"
          >
            Directly applied across native macOS desktop runtimes, full-stack relational platforms, and university computer science coursework.
          </motion.p>
        </div>

        {/* Feature 1: Interactive Skill Constellation Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: easeEditorial }}
          className="space-y-3"
        >
          <SkillConstellationCanvas onSelectSkill={handleSelectSkillFromConstellation} />
        </motion.div>

        {/* Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: easeEditorial }}
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <div
            role="group"
            aria-label="Filter skills by category"
            className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0E1017] border border-[#262A36] overflow-x-auto no-scrollbar w-full sm:w-auto"
          >
            {SKILL_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <Magnetic key={category} strength={0.2} radius={45}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs font-mono-tabular rounded-xl transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
                      isActive
                        ? 'bg-[#FF4D26] text-white font-semibold shadow-xs'
                        : 'text-[#A8A39D] hover:text-[#F4EFEA] hover:bg-[#141721]'
                    }`}
                  >
                    {category}
                  </button>
                </Magnetic>
              );
            })}
          </div>

          <div className="text-xs font-mono-tabular text-[#8E8B85] hidden sm:block">
            SHOWING {filteredSkills.length} OF {PORTFOLIO_DATA.skills.length} VERIFIED CAPABILITIES
          </div>
        </motion.div>

        {/* Architectural Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isHovered = activeHoveredSkill === skill.id;
              const isLearning = skill.category === 'Currently Learning';

              return (
                <motion.article
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: easeEditorial }}
                  onMouseEnter={() => setActiveHoveredSkill(skill.id)}
                  onMouseLeave={() => setActiveHoveredSkill(null)}
                  className={`p-6 rounded-2xl arch-surface flex flex-col justify-between space-y-5 transition-all duration-300 ${
                    isHovered
                      ? 'border-[#FF4D26] ring-1 ring-[#FF4D26]/40 bg-[#121520] shadow-xl scale-[1.01]'
                      : 'border-[#262A36]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header line: category & badge */}
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="text-[#FF4D26] font-semibold text-[11px] uppercase tracking-wider">
                        {skill.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#141721] text-[#A8A39D] border border-[#262A36]">
                        {getSkillBadgeText(skill)}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4EFEA] tracking-tight">
                      {skill.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                      {skill.context}
                    </p>

                    <p className="text-xs text-[#8E8B85] leading-relaxed pt-1 border-t border-[#262A36]/50">
                      {skill.experienceNote}
                    </p>
                  </div>

                  {/* Footer: Applied In */}
                  <div className="pt-3.5 border-t border-[#262A36] flex flex-wrap items-center gap-1.5 text-xs font-mono-tabular">
                    <span className="text-[#8E8B85] text-[11px]">
                      {isLearning ? 'Study focus:' : 'Applied in:'}
                    </span>
                    {skill.usedIn.map((proj, i) => (
                      <React.Fragment key={proj}>
                        <span className="text-[#F4EFEA] font-medium text-xs">{proj}</span>
                        {i < skill.usedIn.length - 1 && (
                          <span aria-hidden="true" className="text-[#8E8B85]">
                            &bull;
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
