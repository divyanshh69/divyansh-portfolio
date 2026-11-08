import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Layers,
  CheckCircle2,
  Cpu,
  Sparkles,
  Disc3,
  Calendar,
  Activity,
  FileCode2,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { CardTilt } from './CardTilt';
import { ProjectDetailModal } from './ProjectDetailModal';

const PROJECT_CATEGORIES = ['All', 'macOS / Native', 'Full-Stack Web'];

interface ProjectsSectionProps {
  externalSelectedProject?: string | null;
  onClearExternalProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  externalSelectedProject,
  onClearExternalProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'technical' | 'architecture' | 'decisions'>('overview');
  const [cardScreenshotIdx, setCardScreenshotIdx] = useState<Record<string, number>>({});
  const [modalScreenshotIdx, setModalScreenshotIdx] = useState<number>(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = filterProjects(PORTFOLIO_DATA.projects, selectedCategory);

  useEffect(() => {
    if (externalSelectedProject) {
      const found = PORTFOLIO_DATA.projects.find((p) => p.id === externalSelectedProject);
      if (found) {
        setActiveProject(found);
        setModalTab('overview');
        setModalScreenshotIdx(cardScreenshotIdx[found.id] ?? 0);
      }
    }
  }, [externalSelectedProject]);

  const openProjectModal = (
    project: ProjectItem,
    initialTab: 'overview' | 'technical' | 'architecture' | 'decisions' = 'overview',
    screenshotIdx?: number
  ) => {
    setModalTab(initialTab);
    setModalScreenshotIdx(screenshotIdx ?? cardScreenshotIdx[project.id] ?? 0);
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
    onClearExternalProject?.();
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-14 sm:py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB]">03.</span>
              <span>Projects</span>
              <span aria-hidden="true">·</span>
              <span>Selected Work</span>
            </div>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              Projects built from concept to working software.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Each project represents practical problem-solving—combining clean interface design with well-structured application code.
            </p>
          </div>

          {/* Interactive Category Segmented Filter */}
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 liquid-glass-pill rounded-xl w-full sm:w-fit shrink-0 overflow-x-auto no-scrollbar"
          >
            {PROJECT_CATEGORIES.map((category) => {
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

        {/* Featured Project Showcase Cards */}
        <div className="space-y-8 sm:space-y-12">
          {filteredProjects.map((project) => {
            const hasImgError = imageErrors[project.id];
            const isMetroFlow = project.id === 'metroflow';
            const activeCardIdx = cardScreenshotIdx[project.id] ?? 0;
            const currentScreenshot =
              project.screenshots?.[activeCardIdx] || {
                title: project.title,
                image: project.image,
                caption: project.subtitle,
              };

            return (
              <CardTilt key={project.id} maxTilt={4} className="rounded-2xl">
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl border border-white/[0.08] bg-[#0A0A0E] overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Project Visual Preview Column */}
                    <div className="lg:col-span-7 flex flex-col bg-[#070709] border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                      {/* Window Chrome Header - Contains Window dots, Platform Badge & View Switcher */}
                      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0C0C10] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                        {/* Left: Window Dots & Platform Tag */}
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md liquid-glass-pill text-zinc-300 font-mono-tabular text-[11px]">
                            {isMetroFlow ? (
                              <>
                                <Disc3 className="w-3 h-3 text-blue-400 animate-spin" />
                                <span>Native macOS</span>
                              </>
                            ) : (
                              <>
                                <Calendar className="w-3 h-3 text-blue-400" />
                                <span>Full-Stack Web</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Right: Interactive Desktop View Switcher Pills */}
                        {project.screenshots && project.screenshots.length > 1 && (
                          <div
                            role="tablist"
                            aria-label={`${project.title} screenshot views`}
                            className="flex items-center gap-1 p-0.5 rounded-lg liquid-glass-pill"
                          >
                            <span className="text-[10px] font-mono-tabular text-zinc-400 px-1 hidden md:inline">
                              Views:
                            </span>
                            {project.screenshots.map((s, sIdx) => {
                              const isSelected = activeCardIdx === sIdx;
                              const shortLabel = isMetroFlow
                                ? (sIdx === 0 ? 'Home' : sIdx === 1 ? 'Lyrics' : 'Settings')
                                : (sIdx === 0 ? 'Dashboard' : sIdx === 1 ? 'Members' : 'Settings');
                              return (
                                <button
                                  key={s.title}
                                  type="button"
                                  role="tab"
                                  aria-selected={isSelected}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardScreenshotIdx((prev) => ({
                                      ...prev,
                                      [project.id]: sIdx,
                                    }));
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono-tabular transition-all cursor-pointer whitespace-nowrap ${
                                    isSelected
                                      ? 'bg-[#2563EB] text-white font-semibold shadow-sm'
                                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                                  }`}
                                  title={s.title}
                                >
                                  {shortLabel}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Uncropped Screenshot Viewport */}
                      <div
                        onClick={() => openProjectModal(project, 'overview', activeCardIdx)}
                        className="relative flex-1 w-full bg-[#050508] flex items-center justify-center p-2.5 sm:p-4 cursor-pointer group/img overflow-hidden"
                        title="Click to view full case study & screenshots"
                      >
                        {!hasImgError ? (
                          <img
                            src={currentScreenshot.image}
                            alt={`${project.title} — ${currentScreenshot.title}`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setImageErrors((prev) => ({ ...prev, [project.id]: true }))
                            }
                            className="w-full max-h-[380px] sm:max-h-[460px] object-contain rounded-lg border border-white/[0.05] shadow-lg transition-transform duration-500 group-hover/img:scale-[1.01]"
                          />
                        ) : (
                          <div className="w-full min-h-[260px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-center rounded-lg">
                            <Layers className="w-10 h-10 text-[#2563EB] mb-3" aria-hidden="true" />
                            <p className="text-base font-semibold text-white">{project.title}</p>
                            <p className="text-xs text-zinc-400 mt-1">{project.subtitle}</p>
                          </div>
                        )}
                      </div>

                      {/* Bottom Caption Bar (Completely outside the screenshot - no overlap!) */}
                      <div className="px-3 sm:px-4 py-2 bg-[#0A0A0E] border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-blue-400 font-semibold font-mono-tabular shrink-0">
                            {currentScreenshot.title}:
                          </span>
                          <span className="text-zinc-400 truncate">
                            {currentScreenshot.caption}
                          </span>
                        </div>
                        <span className="text-zinc-500 font-mono-tabular text-[10px] shrink-0 hidden sm:inline">
                          Click to enlarge
                        </span>
                      </div>
                    </div>

                    {/* Project Narrative & Controls Column */}
                    <div className="lg:col-span-5 p-4.5 sm:p-7 md:p-8 flex flex-col justify-between space-y-5 sm:space-y-6">
                      <div className="space-y-3.5 sm:space-y-4">
                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                          <span className="font-mono-tabular text-[#2563EB] font-semibold">
                            {project.index}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-zinc-200 font-medium">{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400 font-medium">{project.status}</span>
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-zinc-300">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {project.shortDescription}
                        </p>

                        {/* Project Technical Highlights / Metrics */}
                        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-zinc-900/60 border border-white/[0.05]">
                          {project.metrics.map((m) => (
                            <div key={m.label} className="min-w-0">
                              <div className="font-mono-tabular text-xs sm:text-sm font-semibold text-white truncate">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-zinc-400 truncate">{m.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Key Engineering Highlights */}
                        <ul className="space-y-1.5 sm:space-y-2 pt-1">
                          {project.highlights.slice(0, 3).map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed"
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4 sm:space-y-5 pt-3 sm:pt-4 border-t border-zinc-900">
                        {/* Technologies List */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
                          <span className="text-zinc-500">Stack:</span>
                          {project.technologies.map((tech, idx) => (
                            <React.Fragment key={tech}>
                              <span className="text-zinc-200 font-medium">{tech}</span>
                              {idx < project.technologies.length - 1 && (
                                <span aria-hidden="true" className="text-zinc-600">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* Action Buttons: Clear distinction between Primary and Secondary */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                          {/* Primary Action Button */}
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'overview')}
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                          >
                            <span>Case Study & Details</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>

                          {/* Secondary Action: Technical Overview */}
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'technical')}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-xs font-medium text-zinc-200 liquid-glass-pill rounded-lg hover:text-white hover:border-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Cpu className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                            <span>Technical Overview</span>
                          </button>

                          {/* Secondary Action: Architecture */}
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'architecture')}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-xs font-medium text-zinc-300 bg-zinc-900/70 border border-zinc-800 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Layers className="w-3 h-3 text-zinc-400" />
                            <span>Architecture</span>
                          </button>

                          {/* Secondary Action: Source Code */}
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code on GitHub`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 ml-auto sm:ml-0"
                          >
                            <Github className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </CardTilt>
            );
          })}
        </div>
      </div>

      {/* Full Expanded Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            initialTab={modalTab}
            initialScreenshotIdx={modalScreenshotIdx}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
