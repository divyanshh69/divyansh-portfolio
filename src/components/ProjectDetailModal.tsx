import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Mail,
  Github,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { DisplacementImageTransition } from './DisplacementImageTransition';
import { Magnetic } from './Magnetic';

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

  const modalRef = useRef<HTMLDivElement | null>(null);
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

  // Keyboard accessibility: Escape key closes modal & Tab key traps focus within dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const visibleFocusables = Array.from(focusables).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );
        if (visibleFocusables.length === 0) return;
        const first = visibleFocusables[0];
        const last = visibleFocusables[visibleFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
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
    { id: 'overview', label: 'Case Study & Visuals', icon: FileText },
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
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl bg-[#090A0E] border border-[#262A36] text-[#F4EFEA] shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col max-h-[94vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#262A36] bg-[#0E1017] shrink-0">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#8E8B85] font-mono-tabular">
              <span className="text-[#FF4D26] font-bold">PROJECT {project.index}</span>
              <span aria-hidden="true" className="text-[#3A3F50]">&bull;</span>
              <span className="text-[#D6CFC7]">{project.category}</span>
              <span aria-hidden="true" className="text-[#3A3F50]">&bull;</span>
              <span>{project.year}</span>
            </div>
            <h3 id="modal-project-title" className="font-editorial italic font-normal text-xl sm:text-2xl text-[#F4EFEA] truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              className="p-1.5 sm:p-2 rounded-lg text-[#8E8B85] hover:text-white bg-[#141721] border border-[#262A36] hover:border-[#FF4D26]/40 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Accessible Tab Switcher */}
        <div
          role="tablist"
          aria-label={`${project.title} detail tabs`}
          className="flex items-center gap-1.5 px-3 sm:px-6 py-2.5 border-b border-[#262A36] bg-[#090A0E] overflow-x-auto touch-pan-x no-scrollbar shrink-0"
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
                className={`relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-mono-tabular tracking-wider uppercase rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[44px] z-10 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#A8A39D] hover:text-[#F4EFEA] hover:bg-[#0E1017]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeModalTab"
                    className="absolute inset-0 bg-[#FF4D26] rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                  />
                )}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
          {/* TAB 1: CASE STUDY & GALLERY */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Window Frame Screenshot Showcase */}
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-[#262A36] bg-[#07080C] shadow-xl">
                  {/* Titlebar */}
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#0E1017] border-b border-[#262A36] text-xs">
                    <div className="flex items-center gap-2 text-[#8E8B85] font-mono-tabular truncate min-w-0">
                      <Monitor className="w-3.5 h-3.5 text-[#FF4D26] shrink-0" />
                      <span className="text-[#F4EFEA] font-medium truncate">{project.title}</span>
                      <span className="text-[#3A3F50]">/</span>
                      <span className="text-[#A8A39D] truncate">{activeScreenshot.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono-tabular text-[#8E8B85]">
                        {activeScreenshotIdx + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsZoomed((prev) => !prev)}
                        className="p-2 rounded-lg bg-[#141721] border border-[#262A36] hover:border-[#FF4D26]/40 text-[#A8A39D] hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                        title={isZoomed ? 'Default view' : 'Expand full view'}
                        aria-label={isZoomed ? 'Default view' : 'Expand full view'}
                      >
                        {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Uncropped Viewport */}
                  <div
                    className={`relative bg-[#050608] flex items-center justify-center p-3 sm:p-5 transition-all duration-300 ${
                      isZoomed
                        ? 'min-h-[500px] max-h-[80vh]'
                        : project.id === 'metroflow'
                        ? 'aspect-[1024/665] max-h-[460px]'
                        : 'aspect-[1024/587] max-h-[460px]'
                    }`}
                  >
                    <DisplacementImageTransition
                      src={activeScreenshot.image}
                      alt={`${project.title} — ${activeScreenshot.title}`}
                      className="w-full h-full"
                    />

                    {/* Prev / Next Chevrons */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevScreenshot}
                          aria-label="Previous screenshot"
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0E1017]/90 hover:bg-[#141721] text-white border border-[#262A36] shadow-lg transition-transform hover:scale-105 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextScreenshot}
                          aria-label="Next screenshot"
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0E1017]/90 hover:bg-[#141721] text-white border border-[#262A36] shadow-lg transition-transform hover:scale-105 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption Drawer (Outside the image) */}
                  <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0E1017] border-t border-[#262A36] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs">
                    <div className="flex items-start sm:items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-tabular bg-[#FF4D26]/10 text-[#FF4D26] border border-[#FF4D26]/30 font-semibold shrink-0 uppercase">
                        {activeScreenshot.title}
                      </span>
                      <p className="text-[#D6CFC7] text-xs leading-relaxed">{activeScreenshot.caption}</p>
                    </div>
                    <span className="text-[11px] text-[#8E8B85] font-mono-tabular shrink-0 hidden md:inline">
                      DESKTOP CAPTURE PREVIEW
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
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 min-h-[44px] ${
                            isActive
                              ? 'border-[#FF4D26] bg-[#FF4D26]/10 shadow-xs'
                              : 'border-[#262A36] bg-[#0E1017] hover:border-[#FF4D26]/40 hover:bg-[#141721]'
                          }`}
                        >
                          <div className="w-11 h-8 rounded overflow-hidden shrink-0 bg-black/40 border border-[#262A36]">
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
                                  isActive ? 'text-[#FF4D26] font-semibold' : 'text-[#D6CFC7] font-medium'
                                }`}
                              >
                                {s.title}
                              </span>
                              <span className="font-mono-tabular text-[10px] text-[#8E8B85] shrink-0">
                                0{idx + 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#8E8B85] truncate mt-0.5">{s.caption}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 rounded-xl border border-[#262A36] bg-[#0E1017]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left space-y-0.5">
                    <div className="font-editorial text-xl sm:text-3xl font-bold text-[#F4EFEA]">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono-tabular uppercase tracking-wider text-[#8E8B85]">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem vs Engineering Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl border border-[#FF4D26]/25 bg-[#FF4D26]/[0.03] space-y-2">
                  <span className="text-[11px] font-mono-tabular text-[#FF4D26] uppercase tracking-wider font-semibold">
                    01. The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-[#38BDF8]/25 bg-[#38BDF8]/[0.03] space-y-2">
                  <span className="text-[11px] font-mono-tabular text-[#38BDF8] uppercase tracking-wider font-semibold">
                    02. Engineering Solution
                  </span>
                  <p className="text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                    {project.engineeringSolution}
                  </p>
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#A8A39D] font-semibold">
                  Key Engineering Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-xl border border-[#262A36] bg-[#0E1017] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF4D26] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#D6CFC7] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Applied */}
              <div className="space-y-2">
                <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#8E8B85]">
                  Core Technologies Applied:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono-tabular text-[#D6CFC7] bg-[#141721] border border-[#262A36] rounded-lg"
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
                <div className="flex items-center gap-2 text-[#F4EFEA]">
                  <Layers className="w-4 h-4 text-[#FF4D26]" />
                  <h4 className="font-editorial text-lg sm:text-xl font-bold">
                    System Architecture & Runtime Specifications
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#A8A39D] leading-relaxed">
                  Detailed technical architecture, runtime environment, and subsystem responsibilities for {project.title}.
                </p>
              </div>

              {/* Subsystems Breakdown */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-[#8E8B85] font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#FF4D26]" />
                  <span>Subsystem Structural Roles (Layers)</span>
                </h5>
                <div className="space-y-2.5">
                  {project.architecture.map((arch, aIdx) => (
                    <div
                      key={arch.layer}
                      className="p-4 rounded-xl border border-[#262A36] bg-[#0E1017] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-tabular text-[#FF4D26] font-bold">
                            LAYER 0{aIdx + 1}
                          </span>
                          <span className="text-xs font-semibold text-[#F4EFEA]">{arch.layer}</span>
                        </div>
                        <div className="text-xs text-[#8E8B85] font-mono-tabular">{arch.component}</div>
                      </div>
                      <p className="text-xs text-[#D6CFC7] leading-relaxed max-w-xl">
                        {arch.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-[#8E8B85] font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Runtime Environment & Specifications</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  {project.specifications?.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 sm:p-4 rounded-xl border border-[#262A36] bg-[#0E1017] space-y-1"
                    >
                      <span className="text-[11px] font-mono-tabular text-[#8E8B85]">{spec.label}</span>
                      <div className="text-sm font-semibold text-[#F4EFEA]">{spec.value}</div>
                      <div className="text-[11px] text-[#A8A39D]">{spec.detail}</div>
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
                <div className="flex items-center gap-2 text-[#F4EFEA]">
                  <Cpu className="w-4 h-4 text-[#FF4D26]" />
                  <h4 className="font-editorial text-lg sm:text-xl font-bold">
                    Engineering Decisions & Technical Rationale
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#A8A39D] leading-relaxed">
                  Why specific tools, architectures, and design patterns were chosen for {project.title}.
                </p>
              </div>

              <div className="space-y-3.5">
                {technicalDecisions.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-[#262A36] bg-[#0E1017] space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF4D26]">
                      <span className="font-bold">0{idx + 1}.</span>
                      <span className="text-[#F4EFEA] font-semibold">{item.title}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-[#F4EFEA] font-medium pl-3.5 border-l-2 border-[#FF4D26]">
                      {item.decision}
                    </div>

                    <p className="text-xs sm:text-sm text-[#A8A39D] leading-relaxed pt-1">
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
                <div className="flex items-center gap-2 text-[#F4EFEA]">
                  <Sparkles className="w-4 h-4 text-[#FF4D26]" />
                  <h4 className="font-editorial text-lg sm:text-xl font-bold">
                    Development Challenges & Key Learnings
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#A8A39D] leading-relaxed">
                  Authentic engineering problems encountered during the development of {project.title}, the technical solutions adopted, and takeaways gained.
                </p>
              </div>

              {project.challengesAndLearnings && (
                <div className="space-y-4">
                  {project.challengesAndLearnings.map((item, idx) => (
                    <div
                      key={item.title}
                      className="p-5 rounded-xl border border-[#262A36] bg-[#0E1017] space-y-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded bg-[#FF4D26]/10 text-[#FF4D26] border border-[#FF4D26]/30">
                          0{idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-[#F4EFEA]">{item.title}</h5>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <div className="p-3.5 rounded-lg bg-[#090A0E] border border-[#262A36] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#FF4D26] font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26]" />
                            <span>Challenge Encountered</span>
                          </span>
                          <p className="text-xs text-[#D6CFC7] leading-relaxed">{item.challenge}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-[#090A0E] border border-[#262A36] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#38BDF8] font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                            <span>Approach & Solution</span>
                          </span>
                          <p className="text-xs text-[#D6CFC7] leading-relaxed">{item.solution}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-[#090A0E] border border-[#262A36] space-y-1.5 flex flex-col justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>What I Learned</span>
                          </span>
                          <p className="text-xs text-[#D6CFC7] leading-relaxed">{item.learning}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-[#262A36] bg-[#0E1017] shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[#8E8B85] font-mono-tabular">
            <span>DEVELOPMENT STATUS:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
            <span className="opacity-40 hidden sm:inline">&bull;</span>
            <span className="px-2 py-0.5 rounded bg-[#141721] text-[#A8A39D] border border-[#262A36] text-[10px]">
              Private Repository &bull; Code Available on Request
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Magnetic strength={0.25} radius={50} className="flex-1 sm:flex-none">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
                  `Code Walkthrough Request: ${project.title}`
                )}&body=${encodeURIComponent(
                  `Hello Divyansh,\n\nI reviewed your portfolio and would like to request access or a walkthrough of the ${project.title} codebase.\n\nBest regards,`
                )}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono-tabular uppercase tracking-wider font-semibold text-white bg-[#FF4D26] hover:bg-[#ff623e] rounded-lg transition-colors cursor-pointer w-full sm:w-auto min-h-[44px] shadow-xs"
              >
                <span>Request Code Walkthrough</span>
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Magnetic>

            <Magnetic strength={0.2} radius={40}>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Divyansh's GitHub profile`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-mono-tabular text-[#A8A39D] hover:text-[#F4EFEA] bg-[#090A0E] border border-[#262A36] rounded-lg transition-colors min-h-[44px]"
                title="View GitHub Profile (@divyanshh69)"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Profile</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
