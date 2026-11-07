import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Layers,
  CheckCircle2,
  Play,
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
  const [modalTab, setModalTab] = useState<'overview' | 'architecture' | 'interactive' | 'decisions'>('overview');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = filterProjects(PORTFOLIO_DATA.projects, selectedCategory);

  useEffect(() => {
    if (externalSelectedProject) {
      const found = PORTFOLIO_DATA.projects.find((p) => p.id === externalSelectedProject);
      if (found) {
        setActiveProject(found);
        setModalTab('overview');
      }
    }
  }, [externalSelectedProject]);

  const openProjectModal = (
    project: ProjectItem,
    initialTab: 'overview' | 'architecture' | 'interactive' | 'decisions' = 'overview'
  ) => {
    setModalTab(initialTab);
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
      className="py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB]">03.</span>
              <span>Featured Projects</span>
              <span aria-hidden="true">·</span>
              <span>Selected Product & Systems Engineering</span>
            </div>
            <h2
              id="projects-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
            >
              Flagship builds engineered from the ground up.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every project is designed as a complete product experience—pairing thoughtful visual craft with resilient underlying architecture.
            </p>
          </div>

          {/* Interactive Category Segmented Filter */}
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0A0A0C] border border-zinc-800/80 rounded-xl w-fit shrink-0"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
        <div className="space-y-12">
          {filteredProjects.map((project) => {
            const hasImgError = imageErrors[project.id];
            const isMetroFlow = project.id === 'metroflow';

            return (
              <CardTilt key={project.id} maxTilt={4} className="rounded-2xl">
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] overflow-hidden hover:border-zinc-700 transition-all duration-300 shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Project Visual Preview Column */}
                    <div
                      onClick={() => openProjectModal(project, 'overview')}
                      className="lg:col-span-7 relative overflow-hidden bg-zinc-950 min-h-[300px] sm:min-h-[400px] cursor-pointer group/img"
                    >
                      {!hasImgError ? (
                        <img
                          src={project.image}
                          alt={`${project.title} — ${project.subtitle}`}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-center">
                          <Layers className="w-10 h-10 text-[#2563EB] mb-3" aria-hidden="true" />
                          <p className="text-base font-semibold text-white">{project.title}</p>
                          <p className="text-xs text-zinc-400 mt-1">{project.subtitle}</p>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-200 font-mono-tabular">
                          {isMetroFlow ? (
                            <>
                              <Disc3 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                              <span>Native macOS · AVFoundation</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span>Full-Stack Web · PostgreSQL</span>
                            </>
                          )}
                        </span>

                        <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/90 backdrop-blur-md text-white font-mono-tabular text-[11px] font-semibold">
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom scrim with quick metrics and peek prompt */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
                        <div className="flex flex-wrap items-center gap-6">
                          {project.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="font-mono-tabular text-sm font-semibold text-white">
                                {m.value}
                              </div>
                              <div className="text-[11px] text-zinc-400">{m.label}</div>
                            </div>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-zinc-900/90 hover:bg-[#2563EB] border border-zinc-700 px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0">
                          <span>Inspect Deep Dive</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Project Narrative & Controls Column */}
                    <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Unboxed Metadata Row */}
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

                        <div className="space-y-1.5">
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-zinc-300">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {project.shortDescription}
                        </p>

                        {/* Key Engineering Highlights */}
                        <ul className="space-y-2 pt-1">
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

                      <div className="space-y-5 pt-4 border-t border-zinc-900">
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

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'overview')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-blue-500/20"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'interactive')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Play className="w-3 h-3 text-[#2563EB]" aria-hidden="true" />
                            <span>Interactive Simulator</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'architecture')}
                            className="inline-flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 rounded-lg hover:text-zinc-200 hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Layers className="w-3 h-3 text-zinc-400" />
                            <span className="hidden sm:inline">Blueprint</span>
                          </button>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code on GitHub`}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
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
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
