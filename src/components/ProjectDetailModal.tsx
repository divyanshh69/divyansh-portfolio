import React, { useState } from 'react';
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
  Play,
  FileText,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { InteractiveAudioSpectrum } from './InteractiveAudioSpectrum';
import { InteractiveCampusPulsePreview } from './InteractiveCampusPulsePreview';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  initialTab?: 'overview' | 'architecture' | 'interactive' | 'decisions';
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  initialTab = 'overview',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'interactive' | 'decisions'>(
    initialTab
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Case Study & Overview', icon: FileText },
    { id: 'interactive', label: 'Interactive Sandbox', icon: Play },
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'decisions', label: 'Engineering Trade-Offs', icon: Code2 },
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl border border-zinc-800 bg-[#09090B] text-zinc-100 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800 bg-[#0C0C0F] shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono-tabular text-[#2563EB] font-semibold">
                Project {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-200 font-medium">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{project.year}</span>
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Repository</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-zinc-800/80 bg-[#0A0A0C] overflow-x-auto shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* TAB 1: OVERVIEW & CASE STUDY */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Large High-Res Visual Preview Container */}
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
                  <div className={`relative overflow-hidden ${isZoomed ? 'max-h-none' : 'max-h-[380px]'}`}>
                    <img
                      src={activeScreenshot.image}
                      alt={`${project.title} — ${activeScreenshot.title}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
                  </div>

                  {/* Image controls & badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700/80 text-zinc-200">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-semibold">{activeScreenshot.title}:</span>
                      <span className="text-zinc-300 hidden sm:inline">{activeScreenshot.caption}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsZoomed((prev) => !prev)}
                      className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700/80 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title={isZoomed ? 'Fit image' : 'Expand full image'}
                    >
                      {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Gallery Thumbnail Viewport Switcher */}
                {screenshots.length > 1 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-zinc-500 font-mono-tabular">Viewpoint:</span>
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() => setActiveScreenshotIdx(idx)}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                          idx === activeScreenshotIdx
                            ? 'bg-[#2563EB] text-white font-medium'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-950">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left space-y-0.5">
                    <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-white">
                      {m.value}
                    </div>
                    <div className="text-xs text-zinc-400">{m.label}</div>
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

          {/* TAB 2: INTERACTIVE PREVIEW */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Interactive Interface Preview</h4>
                <p className="text-xs text-zinc-400">
                  Explore an interactive demonstration of the visual interface and key features of {project.title}.
                </p>
              </div>

              {project.id === 'metroflow' ? (
                <InteractiveAudioSpectrum />
              ) : (
                <InteractiveCampusPulsePreview />
              )}
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

              <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-6">
                {project.architecture.map((node, index) => (
                  <div key={node.layer} className="relative group">
                    {/* Node Dot */}
                    <span className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-[#2563EB]" />

                    <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950 space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-mono-tabular text-[#2563EB] font-semibold">
                          Layer 0{index + 1}
                        </span>
                        <span className="font-medium text-zinc-300">{node.layer}</span>
                      </div>
                      <h5 className="text-base font-semibold text-white">{node.component}</h5>
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

              <div className="space-y-4">
                {technicalDecisions.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#2563EB]">
                      <span>0{idx + 1}.</span>
                      <span className="text-zinc-200 font-semibold">{item.title}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-white font-medium pl-4 border-l-2 border-[#2563EB]">
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-[#0C0C0F] shrink-0 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Status:</span>
            <span className="text-emerald-400 font-medium">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
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

