import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Cpu,
  Sparkles,
  Maximize2,
  Minimize2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

export type ProjectModalTab = 'overview' | 'architecture' | 'decisions' | 'learnings' | 'technical';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  initialTab?: ProjectModalTab;
  initialScreenshotIdx?: number;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  initialTab = 'overview',
  initialScreenshotIdx = 0,
  onClose,
}) => {
  const normalizedInitialTab = initialTab === 'technical' ? 'architecture' : initialTab;
  const [activeTab, setActiveTab] = useState<ProjectModalTab>(normalizedInitialTab);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(initialScreenshotIdx);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setActiveScreenshotIdx(initialScreenshotIdx);
  }, [initialScreenshotIdx, project?.id]);

  useEffect(() => {
    setActiveTab(initialTab === 'technical' ? 'architecture' : initialTab);
  }, [initialTab, project?.id]);

  // Lock body scroll while modal is open, restoring previous overflow state on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, []);

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus close button on mount for immediate keyboard control
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [project?.id]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Case Study & Gallery', icon: FileText },
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'decisions', label: 'Engineering Decisions', icon: Cpu },
    { id: 'learnings', label: 'Challenges & Learnings', icon: Sparkles },
  ] as const;

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  const technicalDecisions = project.technicalDecisions || [];

  const screenshots = project.screenshots || [
    { title: 'Overview', image: project.image, caption: project.subtitle },
  ];
  const activeScreenshot = screenshots[activeScreenshotIdx] || screenshots[0];

  const handlePrevScreenshot = () => {
    setActiveScreenshotIdx((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNextScreenshot = () => {
    setActiveScreenshotIdx((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl liquid-glass text-zinc-100 shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col max-h-[94vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.08] bg-[#0c0d14] shrink-0">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400 font-mono-tabular">
              <span className="text-[#2563EB] font-bold">PROJECT {project.index}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-200">{project.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{project.year}</span>
            </div>
            <h3 id="modal-project-title" className="text-lg sm:text-2xl font-bold text-white truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Accessible Tab Switcher */}
        <div
          role="tablist"
          aria-label={`${project.title} detail tabs`}
          className="flex items-center gap-1.5 px-3 sm:px-6 py-2.5 border-b border-white/[0.06] bg-[#090a0f] overflow-x-auto touch-pan-x no-scrollbar shrink-0"
        >
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`project-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`project-tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[38px] ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div
          role="tabpanel"
          id={`project-tabpanel-${activeTab}`}
          aria-labelledby={`project-tab-${activeTab}`}
          tabIndex={0}
          className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 focus:outline-none"
        >
          {/* TAB 1: CASE STUDY & GALLERY */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Window Frame Screenshot Showcase */}
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#07070a] shadow-xl">
                  {/* Chrome Titlebar */}
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#11121c] border-b border-white/[0.06] text-xs">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono-tabular truncate min-w-0">
                      <Monitor className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-zinc-200 font-medium truncate">{project.title}</span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-400 truncate">{activeScreenshot.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono-tabular text-zinc-500">
                        {activeScreenshotIdx + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsZoomed((prev) => !prev)}
                        className="p-1 rounded hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title={isZoomed ? 'Default view' : 'Expand full view'}
                        aria-label={isZoomed ? 'Default view' : 'Expand full view'}
                      >
                        {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Uncropped Viewport */}
                  <div
                    className={`relative bg-[#050508] flex items-center justify-center p-3 sm:p-5 transition-all duration-300 ${
                      isZoomed
                        ? 'min-h-[500px] max-h-[80vh]'
                        : project.id === 'metroflow'
                        ? 'aspect-[1024/665] max-h-[460px]'
                        : 'aspect-[1024/587] max-h-[460px]'
                    }`}
                  >
                    <img
                      src={activeScreenshot.image}
                      alt={`${project.title} — ${activeScreenshot.title}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Prev / Next Chevrons */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevScreenshot}
                          aria-label="Previous screenshot"
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 hover:bg-black text-white border border-white/[0.1] shadow-lg transition-transform hover:scale-105 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextScreenshot}
                          aria-label="Next screenshot"
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 hover:bg-black text-white border border-white/[0.1] shadow-lg transition-transform hover:scale-105 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption Drawer (Outside the image) */}
                  <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0e0f17] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs">
                    <div className="flex items-start sm:items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono-tabular bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium shrink-0">
                        {activeScreenshot.title}
                      </span>
                      <p className="text-zinc-300 text-xs leading-relaxed">{activeScreenshot.caption}</p>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono-tabular shrink-0 hidden md:inline">
                      Desktop Capture Preview
                    </span>
                  </div>
                </div>

                {/* Multiple Screenshot Thumbnail Grid Switcher */}
                {screenshots.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {screenshots.map((s, idx) => {
                      const isActive = idx === activeScreenshotIdx;
                      return (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => setActiveScreenshotIdx(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            isActive
                              ? 'border-[#2563EB] bg-blue-950/30 shadow-sm'
                              : 'border-white/[0.06] bg-[#0c0d14] hover:border-white/[0.15] hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="w-11 h-8 rounded overflow-hidden shrink-0 bg-black/40 border border-white/[0.08]">
                            <img
                              src={s.image}
                              alt=""
                              className="w-full h-full object-cover object-top opacity-80"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs truncate ${
                                  isActive ? 'text-blue-300 font-semibold' : 'text-zinc-300 font-medium'
                                }`}
                              >
                                {s.title}
                              </span>
                              <span className="font-mono-tabular text-[10px] text-zinc-500 shrink-0">
                                0{idx + 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 truncate mt-0.5">{s.caption}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#0c0d14]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left space-y-0.5">
                    <div className="font-mono-tabular text-lg sm:text-2xl font-bold text-white">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-zinc-400">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Problem vs Engineering Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] space-y-2">
                  <span className="text-xs font-mono-tabular text-rose-400 uppercase tracking-wider font-semibold">
                    The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-2">
                  <span className="text-xs font-mono-tabular text-emerald-400 uppercase tracking-wider font-semibold">
                    Engineering Solution
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.engineeringSolution}
                  </p>
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white font-mono-tabular">
                  Key Engineering Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0c0d14] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Applied */}
              <div className="space-y-2">
                <span className="text-xs font-mono-tabular text-zinc-400">Core Technologies Applied:</span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE & RUNTIME SPECS */}
          {(activeTab === 'architecture' || activeTab === 'technical') && (
            <div className="space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white">
                  <Layers className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-lg font-bold">System Architecture & Runtime Specifications</h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Detailed technical architecture, runtime environment, and subsystem responsibilities for {project.title}.
                </p>
              </div>

              {/* Subsystems Breakdown */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Subsystem Structural Roles (Layers)</span>
                </h5>
                <div className="space-y-2.5">
                  {project.architecture.map((arch, aIdx) => (
                    <div
                      key={arch.layer}
                      className="p-4 rounded-xl border border-white/[0.06] bg-[#0c0d14] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-tabular text-[#2563EB] font-bold">
                            LAYER 0{aIdx + 1}
                          </span>
                          <span className="text-xs font-semibold text-white">{arch.layer}</span>
                        </div>
                        <div className="text-xs text-zinc-400 font-mono-tabular">{arch.component}</div>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
                        {arch.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Runtime Environment & Specifications</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  {project.specifications?.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0c0d14] space-y-1"
                    >
                      <span className="text-[11px] font-mono-tabular text-zinc-400">{spec.label}</span>
                      <div className="text-sm font-semibold text-white">{spec.value}</div>
                      <div className="text-[11px] text-zinc-500">{spec.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENGINEERING DECISIONS */}
          {activeTab === 'decisions' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-lg font-bold">Engineering Decisions & Technical Rationale</h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Why specific tools, architectures, and design patterns were chosen for {project.title}.
                </p>
              </div>

              <div className="space-y-3.5">
                {technicalDecisions.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-white/[0.08] bg-[#0c0d14] space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#2563EB]">
                      <span className="font-bold">0{idx + 1}.</span>
                      <span className="text-white font-semibold">{item.title}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-zinc-200 font-medium pl-3.5 border-l-2 border-[#2563EB]">
                      {item.decision}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                      {item.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CHALLENGES & LEARNINGS */}
          {activeTab === 'learnings' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-lg font-bold">Development Challenges & Key Learnings</h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Authentic engineering problems encountered during the development of {project.title}, the technical solutions adopted, and takeaways gained.
                </p>
              </div>

              {project.challengesAndLearnings && (
                <div className="space-y-4">
                  {project.challengesAndLearnings.map((item, idx) => (
                    <div
                      key={item.title}
                      className="p-5 rounded-xl border border-white/[0.08] bg-[#0c0d14] space-y-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          0{idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-white">{item.title}</h5>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            <span>Challenge Encountered</span>
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">{item.challenge}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span>Approach & Solution</span>
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">{item.solution}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>What I Learned</span>
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">{item.learning}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-white/[0.08] bg-[#0c0d14] shrink-0 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Development Status:</span>
            <span className="text-emerald-400 font-medium">{project.status}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors cursor-pointer w-full sm:w-auto min-h-[44px]"
            >
              <span>Explore Code on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
