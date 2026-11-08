import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Cpu,
  Sparkles,
  Maximize2,
  Minimize2,
  Code2,
  Terminal,
  FileText,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Image as ImageIcon,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  initialTab?: 'overview' | 'technical' | 'architecture' | 'decisions';
  initialScreenshotIdx?: number;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  initialTab = 'overview',
  initialScreenshotIdx = 0,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'architecture' | 'decisions'>(
    initialTab
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(initialScreenshotIdx);

  useEffect(() => {
    setActiveScreenshotIdx(initialScreenshotIdx);
  }, [initialScreenshotIdx, project?.id]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Case Study & Gallery', icon: FileText },
    { id: 'technical', label: 'Technical Overview', icon: Cpu },
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'decisions', label: 'Engineering Decisions', icon: Code2 },
  ] as const;

  // Authentic technical decisions and architectural approach
  const technicalDecisions =
    project.id === 'metroflow'
      ? [
          {
            title: 'Native Swift & SwiftUI vs. Cross-Platform Wrapper',
            decision: 'Built directly with Swift and SwiftUI/AppKit for macOS rather than a cross-platform web container.',
            rationale:
              'Building natively allows direct integration with macOS window styling, system keyboard shortcuts, and Apple’s AVFoundation for reliable local audio playback with minimal system overhead.',
          },
          {
            title: 'Visual Audio Feedback',
            decision: 'Implemented an integrated waveform frequency visualization alongside playback.',
            rationale:
              'Provides responsive visual feedback while tracks are playing, making the interface feel active and visually engaging while keeping the layout minimal.',
          },
          {
            title: 'Focused Local-First Library Design',
            decision: 'Prioritized offline playback and simple folder-based library organization.',
            rationale:
              'Avoids background data syncing, external account requirements, and social feed clutter, focusing purely on playing local music files smoothly.',
          },
        ]
      : [
          {
            title: 'Relational Database Schema (PostgreSQL)',
            decision: 'Structured data in PostgreSQL with relational integrity across clubs, events, and registrations.',
            rationale:
              'Campus club operations rely on relational links: events belong to clubs, venues are reserved during specific time slots, and students register for specific events. Relational foreign keys keep the data consistent.',
          },
          {
            title: 'Role-Based Permissions for Campus Societies',
            decision: 'Implemented middleware to separate permissions between club leads, faculty, and student members.',
            rationale:
              'Separates event creation and room booking privileges from standard student attendance, keeping club administrative controls organized.',
          },
          {
            title: 'Venue Conflict Validation Logic',
            decision: 'Added checks to verify venue availability before confirming an event date and location.',
            rationale:
              'Helps student societies avoid double-booking campus halls and computer labs by flagging overlapping schedules ahead of time.',
          },
        ];

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl liquid-glass text-zinc-100 shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col max-h-[95vh] sm:max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] bg-black/40 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB] font-semibold">
                Project {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-200 font-medium">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{project.year}</span>
            </div>
            <h3 id="modal-project-title" className="text-lg sm:text-2xl font-bold text-white truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-300 liquid-glass-pill rounded-lg hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Repository</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              className="p-1.5 sm:p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 border-b border-white/[0.06] bg-black/30 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* TAB 1: OVERVIEW & CASE STUDY */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Elevated Desktop Screenshot Showcase */}
              <div className="space-y-4">
                {/* Desktop Window Frame */}
                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0B0B0E] shadow-2xl">
                  {/* Window Chrome Titlebar */}
                  <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#101014] border-b border-white/[0.06] text-xs">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-600/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
                    </div>

                    {/* Window Center Title */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 font-mono-tabular truncate px-1 sm:px-2">
                      <Monitor className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="text-zinc-200 font-medium truncate">{project.title}</span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-400 truncate">{activeScreenshot.title}</span>
                    </div>

                    {/* Window Right Action Controls */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-500">
                        {activeScreenshotIdx + 1} / {screenshots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsZoomed((prev) => !prev)}
                        className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        title={isZoomed ? 'Default view' : 'Expand full view'}
                        aria-label={isZoomed ? 'Default view' : 'Expand full view'}
                      >
                        {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Screenshot Viewport Container */}
                  <div
                    className={`relative overflow-hidden bg-[#070709] flex items-center justify-center transition-all duration-300 ${
                      isZoomed
                        ? 'min-h-[520px] max-h-[85vh]'
                        : project.id === 'metroflow'
                        ? 'aspect-[1024/665] max-h-[480px]'
                        : 'aspect-[1024/587] max-h-[480px]'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeScreenshotIdx}
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={activeScreenshot.image}
                          alt={`${project.title} — ${activeScreenshot.title}`}
                          className="w-full h-full object-contain object-center"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Left & Right Chevrons */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevScreenshot}
                          aria-label="Previous screenshot"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full liquid-glass-pill hover:bg-black/95 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg opacity-85 hover:opacity-100 hover:scale-105"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextScreenshot}
                          aria-label="Next screenshot"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full liquid-glass-pill hover:bg-black/95 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg opacity-85 hover:opacity-100 hover:scale-105"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption & Context Drawer */}
                  <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0C0C0F] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#2563EB]/20 text-[#60A5FA] border border-blue-500/30 font-medium shrink-0 text-[11px] sm:text-xs">
                        {activeScreenshot.title}
                      </span>
                      <p className="text-zinc-300 leading-relaxed text-xs">
                        {activeScreenshot.caption}
                      </p>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono-tabular shrink-0 hidden md:inline">
                      Desktop Capture Preview
                    </span>
                  </div>
                </div>

                {/* Multiple Screenshot Thumbnail Grid Switcher */}
                {screenshots.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                    {screenshots.map((s, idx) => {
                      const isActive = idx === activeScreenshotIdx;
                      return (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => setActiveScreenshotIdx(idx)}
                          className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3 ${
                            isActive
                              ? 'border-[#2563EB] bg-blue-950/20 shadow-sm'
                              : 'border-zinc-800/80 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/50'
                          }`}
                        >
                          <div className="w-10 h-8 rounded overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                            <img
                              src={s.image}
                              alt=""
                              className="w-full h-full object-cover object-top opacity-80"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs font-medium truncate ${
                                  isActive ? 'text-blue-300 font-semibold' : 'text-zinc-300'
                                }`}
                              >
                                {s.title}
                              </span>
                              <span className="font-mono-tabular text-[10px] text-zinc-500 shrink-0">
                                0{idx + 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                              {s.caption}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-950">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left space-y-0.5">
                    <div className="font-mono-tabular text-lg sm:text-2xl font-bold text-white">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-400">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-2.5">
                  <span className="text-xs font-mono-tabular text-rose-400 uppercase tracking-wider font-semibold">
                    The Problem
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-2.5">
                  <span className="text-xs font-mono-tabular text-emerald-400 uppercase tracking-wider font-semibold">
                    Engineering Solution
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.engineeringSolution}
                  </p>
                </div>
              </div>

              {/* Key Architectural Highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-zinc-200">Key Engineering Capabilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-lg border border-zinc-900 bg-zinc-950 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Pills */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-zinc-400">Core Technologies Applied:</span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL OVERVIEW */}
          {activeTab === 'technical' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Technical Specifications & Implementation Overview
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Detailed technical architecture, runtime environment, and subsystem responsibilities for {project.title}.
                </p>
              </div>

              {/* 1. Technical Stack Specifications Grid */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Engineering Stack & Runtime Environment</span>
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.id === 'metroflow' ? (
                    <>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Target Architecture</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Apple Silicon ARM64</div>
                        <div className="text-[11px] text-zinc-500">Native macOS Build</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Core Language</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Swift</div>
                        <div className="text-[11px] text-zinc-500">Strict Type Safety & Concurrency</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Audio Pipeline</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">CoreAudio & AVFoundation</div>
                        <div className="text-[11px] text-zinc-500">Hardware-Accelerated Decoding</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">UI Framework</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">SwiftUI + AppKit</div>
                        <div className="text-[11px] text-zinc-500">Native macOS Windowing & Shortcuts</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Bridge Interface</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Local Python Service</div>
                        <div className="text-[11px] text-zinc-500">Port 8765 Metadata Pipeline</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Playback Modes</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Full Window & Mini-Player</div>
                        <div className="text-[11px] text-zinc-500">Dockable Compact Mode</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Architecture</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Full-Stack Client-Server</div>
                        <div className="text-[11px] text-zinc-500">RESTful Service Layer</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Frontend Stack</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">React & TypeScript</div>
                        <div className="text-[11px] text-zinc-500">Tailwind CSS Responsive UI</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Backend API</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Node.js & Express</div>
                        <div className="text-[11px] text-zinc-500">Route Validation & Controllers</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Database Engine</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">PostgreSQL</div>
                        <div className="text-[11px] text-zinc-500">Relational Schemas & Foreign Keys</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Authentication</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">JWT & Session Claims</div>
                        <div className="text-[11px] text-zinc-500">Role-Based Access Control</div>
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] space-y-1">
                        <span className="text-[10px] sm:text-[11px] font-mono-tabular text-zinc-400">Scheduling Engine</span>
                        <div className="text-xs sm:text-sm font-semibold text-white">Conflict Detection</div>
                        <div className="text-[11px] text-zinc-500">Auditorium & Lab Validation</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 2. Key Features & Implementation Specifications */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Features & Technical Implementation</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, hIdx) => (
                    <div
                      key={highlight}
                      className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] flex items-start gap-3"
                    >
                      <span className="font-mono-tabular text-xs font-semibold text-blue-400 shrink-0 mt-0.5">
                        0{hIdx + 1}.
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Subsystem Architecture Overview */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Subsystem Structural Roles</span>
                </h5>
                <div className="space-y-2.5">
                  {project.architecture.map((arch, aIdx) => (
                    <div
                      key={arch.layer}
                      className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                    >
                      <div className="space-y-0.5 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-tabular text-[#2563EB] font-semibold">
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

              {/* 4. Engineering Challenge & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] space-y-2">
                  <span className="text-xs font-mono-tabular text-rose-400 uppercase tracking-wider font-semibold">
                    Engineering Challenge
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-2">
                  <span className="text-xs font-mono-tabular text-emerald-400 uppercase tracking-wider font-semibold">
                    Technical Solution
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.engineeringSolution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM STRUCTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">System Structure & Component Roles</h4>
                <p className="text-xs text-zinc-400">
                  Overview of the client interface, application logic, and data layer.
                </p>
              </div>

              <div className="relative pl-4 sm:pl-8 border-l border-zinc-800 space-y-4 sm:space-y-6">
                {project.architecture.map((node, index) => (
                  <div key={node.layer} className="relative group">
                    {/* Node Dot */}
                    <span className="absolute -left-[23px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-[#2563EB]" />

                    <div className="p-3.5 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-mono-tabular text-[#2563EB] font-semibold">
                          Layer 0{index + 1}
                        </span>
                        <span className="font-medium text-zinc-300">{node.layer}</span>
                      </div>
                      <h5 className="text-sm sm:text-base font-semibold text-white">{node.component}</h5>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {node.responsibility}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TECHNICAL APPROACH */}
          {activeTab === 'decisions' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Technical Decisions & Approach</h4>
                <p className="text-xs text-zinc-400">
                  Why specific tools and structures were chosen for {project.title}.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {technicalDecisions.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-3.5 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-950 space-y-2 sm:space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#2563EB]">
                      <span>0{idx + 1}.</span>
                      <span className="text-zinc-200 font-semibold">{item.title}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-white font-medium pl-3 sm:pl-4 border-l-2 border-[#2563EB]">
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
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-6 py-3 sm:py-4 border-t border-zinc-800 bg-[#0C0C0F] shrink-0 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Status:</span>
            <span className="text-emerald-400 font-medium">{project.status}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors cursor-pointer w-full sm:w-auto"
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

