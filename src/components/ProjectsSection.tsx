import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Layers,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import { ProjectDetailModal, ProjectModalTab } from './ProjectDetailModal';
import { easeEditorial } from '../utils/motionVariants';
import { Project3DCard } from './Project3DCard';
import { DisplacementImageTransition } from './DisplacementImageTransition';
import { Magnetic } from './Magnetic';
import { KineticHeading } from './KineticHeading';

interface ProjectsSectionProps {
  externalSelectedProject?: string | null;
  onClearExternalProject?: () => void;
}

const getProjectAccentTheme = (id: string) => {
  if (id === 'metroflow') {
    return {
      accentColor: '#FF4D26',
      badgeBg: 'bg-[#FF4D26]/10 text-[#FF4D26] border-[#FF4D26]/30',
      activeTabBg: 'bg-[#FF4D26] text-white',
      borderHover: 'hover:border-[#FF4D26]/40',
      tag: '01 // MAC-NATIVE DESKTOP',
    };
  }
  if (id === 'skillsync') {
    return {
      accentColor: '#10B981',
      badgeBg: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
      activeTabBg: 'bg-[#10B981] text-white',
      borderHover: 'hover:border-[#10B981]/40',
      tag: '02 // CAREER INTELLIGENCE & ORM',
    };
  }
  return {
    accentColor: '#2563EB',
    badgeBg: 'bg-[#2563EB]/10 text-[#38BDF8] border-[#2563EB]/30',
    activeTabBg: 'bg-[#2563EB] text-white',
    borderHover: 'hover:border-[#2563EB]/40',
    tag: '03 // EVENT OPERATIONS & RELATIONAL',
  };
};

const getScreenshotShortLabel = (projectId: string, sIdx: number): string => {
  if (projectId === 'metroflow') {
    return sIdx === 0 ? 'DISCOVERY' : sIdx === 1 ? 'SYNC LYRICS' : 'SETTINGS';
  }
  if (projectId === 'skillsync') {
    return sIdx === 0 ? 'DASHBOARD' : sIdx === 1 ? 'CAREER ROADMAP' : 'MY PROJECTS';
  }
  return sIdx === 0 ? 'DASHBOARD' : sIdx === 1 ? 'MEMBERS' : 'SETTINGS';
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  externalSelectedProject,
  onClearExternalProject,
}) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<ProjectModalTab>('overview');
  const [cardScreenshotIdx, setCardScreenshotIdx] = useState<Record<string, number>>({});
  const [modalScreenshotIdx, setModalScreenshotIdx] = useState<number>(0);
  const [mobileActiveProjectIdx, setMobileActiveProjectIdx] = useState<number>(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (externalSelectedProject) {
      const match = PORTFOLIO_DATA.projects.find((p) => p.id === externalSelectedProject);
      if (match) {
        lastFocusedElementRef.current = document.activeElement as HTMLElement;
        setActiveProject(match);
        setModalTab('overview');
        setModalScreenshotIdx(0);
      }
    }
  }, [externalSelectedProject]);

  const openProjectModal = (
    project: ProjectItem,
    tab: ProjectModalTab = 'overview',
    screenshotIdx: number = 0
  ) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setActiveProject(project);
    setModalTab(tab);
    setModalScreenshotIdx(screenshotIdx);
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    onClearExternalProject?.();
    setTimeout(() => {
      lastFocusedElementRef.current?.focus();
    }, 50);
  };

  // Scroll Progress across Desktop pinned container
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ['start start', 'end end'],
  });

  // 3 projects: translation from 0% to -66.666%
  const horizontalX = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0.333, 1]);
  const watermarkHorizontalX = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);

  const [activeProjectNumber, setActiveProjectNumber] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.38) {
        setActiveProjectNumber(1);
      } else if (latest < 0.72) {
        setActiveProjectNumber(2);
      } else {
        setActiveProjectNumber(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToProject = (targetIndex: number) => {
    const container = desktopContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetY = scrollTop + (targetIndex / (projects.length - 1)) * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const scrollMobileToProject = (index: number) => {
    setMobileActiveProjectIdx(index);
    const container = mobileCarouselRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.88 + 20;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative">
      {/* ─────────────────────────────────────────────────────────────────────────
          1. DESKTOP PINNED HORIZONTAL SHOWCASE (lg: screens >= 1024px)
          ───────────────────────────────────────────────────────────────────────── */}
      {!prefersReduced ? (
        <div
          ref={desktopContainerRef}
          className="hidden lg:block relative h-[320vh] border-b border-[#262A36]"
        >
          {/* Pinned Viewport Container */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 px-8 xl:px-14 bg-[#090A0E] z-10 select-none">
            {/* Top Showcase Telemetry Bar */}
            <div className="flex items-center justify-between gap-6 pb-4 border-b border-[#262A36]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D26] animate-pulse" />
                  <span>[ 02 // PINNED HORIZONTAL SHOWCASE ]</span>
                </span>
                <span className="opacity-30 text-xs font-mono-tabular">|</span>
                <span className="text-xs font-mono-tabular text-[#A8A39D]">
                  CURRENT // PROJECT 0{activeProjectNumber} OF 0{projects.length}
                </span>
              </div>

              {/* Direct Jump Selector & Horizontal Progress Bar */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1017] border border-[#262A36]">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => scrollToProject(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
                        activeProjectNumber === idx + 1
                          ? 'bg-[#FF4D26] text-white font-semibold'
                          : 'text-[#8E8B85] hover:text-[#F4EFEA]'
                      }`}
                    >
                      0{idx + 1} {p.title}
                    </button>
                  ))}
                </div>

                {/* Progress bar line */}
                <div className="w-28 h-1.5 rounded-full bg-[#141721] overflow-hidden border border-[#262A36] relative">
                  <motion.div
                    style={{ scaleX: progressScaleX }}
                    className="absolute inset-y-0 left-0 w-full bg-[#FF4D26] origin-left"
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Projects Glide Track */}
            <div className="relative flex-1 flex items-center overflow-hidden my-auto py-2">
              {/* Monumental Architectural Glide Watermark (Differential Parallax) */}
              <motion.div
                aria-hidden="true"
                style={{ x: watermarkHorizontalX }}
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap font-display font-black text-[16vw] text-white/[0.022] tracking-tighter select-none z-0 will-change-transform"
              >
                <span>ENGINEERED SYSTEMS &bull; AUDIO RUNTIMES &bull; RELATIONAL ORM &bull; PRODUCTION CODE</span>
              </motion.div>

              <motion.div
                style={{ x: horizontalX }}
                className="relative flex items-stretch gap-14 w-[300%] h-full max-h-[72vh] flex-nowrap will-change-transform z-10"
              >
                {projects.map((project, pIdx) => {
                  const activeCardIdx = cardScreenshotIdx[project.id] ?? 0;
                  const currentScreenshot =
                    project.screenshots?.[activeCardIdx] || {
                      title: project.title,
                      image: project.image,
                      caption: project.subtitle,
                    };
                  const theme = getProjectAccentTheme(project.id);

                  return (
                    <div
                      key={project.id}
                      className="w-[calc(100vw-5rem)] max-w-[1260px] shrink-0 h-full flex flex-col relative"
                    >
                      <Project3DCard maxTilt={5} borderAccent={theme.accentColor}>
                        <article
                          style={{ transformStyle: 'preserve-3d' }}
                          className={`rounded-3xl arch-surface overflow-hidden flex-1 flex flex-col border border-[#262A36] shadow-2xl transition-colors duration-300 ${theme.borderHover} h-full relative`}
                        >
                        {/* Background Numeral Watermark */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-8 -right-4 font-display font-black text-[180px] leading-none text-white/[0.02] select-none z-0"
                        >
                          0{pIdx + 1}
                        </span>
                        {/* Showcase Header Strip */}
                        <div className="px-6 py-3.5 bg-[#0E1017] border-b border-[#262A36] flex items-center justify-between gap-4 shrink-0">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono-tabular font-bold text-[#FF4D26]">
                              0{pIdx + 1} //
                            </span>
                            <span className="text-sm font-bold text-[#F4EFEA] tracking-tight">
                              {project.title}
                            </span>
                            <span className="hidden sm:inline text-xs font-mono-tabular text-[#8E8B85]">
                              &mdash; {project.subtitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono-tabular">
                            <span className="px-2.5 py-0.5 rounded bg-[#141721] text-[#A8A39D] border border-[#262A36]">
                              {project.year}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded border font-semibold ${theme.badgeBg}`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>

                        {/* Showcase Grid: Asymmetrical Viewport & Specs */}
                        <div className="grid grid-cols-12 flex-1 items-stretch min-h-0">
                          {/* Left Column: Interactive Screenshot Gallery (col-span-7) */}
                          <div className="col-span-7 flex flex-col bg-[#07080C] border-r border-[#262A36] min-h-0">
                            {/* View Switcher Header */}
                            <div className="px-5 py-2.5 bg-[#0E1017] border-b border-[#262A36] flex items-center justify-between gap-3 text-xs font-mono-tabular shrink-0">
                              <span className="text-[#8E8B85] font-medium text-[11px]">
                                SCREENSHOT VIEWPORT:
                              </span>

                              {project.screenshots && project.screenshots.length > 1 && (
                                <div
                                  role="tablist"
                                  aria-label={`${project.title} screenshot views`}
                                  className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-[#262A36]"
                                >
                                  {project.screenshots.map((s, sIdx) => {
                                    const isSelected = activeCardIdx === sIdx;
                                    const shortLabel = getScreenshotShortLabel(project.id, sIdx);

                                    return (
                                      <button
                                        key={s.title}
                                        type="button"
                                        role="tab"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                          setCardScreenshotIdx((prev) => ({
                                            ...prev,
                                            [project.id]: sIdx,
                                          }));
                                        }}
                                        className={`px-3 py-1 rounded-lg text-[11px] font-mono-tabular transition-all cursor-pointer whitespace-nowrap ${
                                          isSelected
                                            ? `${theme.activeTabBg} font-semibold shadow-xs`
                                            : 'text-[#A8A39D] hover:text-[#F4EFEA] hover:bg-[#141721]'
                                        }`}
                                      >
                                        {shortLabel}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Viewport Frame with WebGL Wave Displacement Shader */}
                            <div
                              role="button"
                              tabIndex={0}
                              aria-label={`Open detailed case study for ${project.title}`}
                              onClick={() => openProjectModal(project, 'overview', activeCardIdx)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  openProjectModal(project, 'overview', activeCardIdx);
                                }
                              }}
                              style={{ transform: 'translateZ(18px)' }}
                              className="relative flex-1 w-full bg-[#050608] flex items-center justify-center p-4 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#FF4D26] overflow-hidden"
                              title="Click to view full case study & technical specifications"
                            >
                              <div className="w-full h-full max-h-[380px] rounded-xl overflow-hidden border border-[#262A36] group-hover:border-[#FF4D26]/40 transition-colors">
                                <DisplacementImageTransition
                                  src={currentScreenshot.image}
                                  alt={`${project.title} — ${currentScreenshot.title}`}
                                  imgClassName="max-h-[380px]"
                                />
                              </div>
                            </div>

                            {/* Technical Caption Drawer */}
                            <div className="px-5 py-2.5 bg-[#0E1017] border-t border-[#262A36] flex items-center justify-between gap-3 text-xs shrink-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[#FF4D26] font-mono-tabular font-bold shrink-0 text-[11px]">
                                  {currentScreenshot.title}:
                                </span>
                                <span className="text-[#A8A39D] text-xs truncate">
                                  {currentScreenshot.caption}
                                </span>
                              </div>
                              <span className="text-[#8E8B85] font-mono-tabular text-[10px] shrink-0">
                                CAPTURE {activeCardIdx + 1} OF {project.screenshots?.length || 1}
                              </span>
                            </div>
                          </div>

                          {/* Right Column: Architectural Narrative & Actions (col-span-5) */}
                          <div className="col-span-5 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <div className="text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-wider font-semibold">
                                  {project.category}
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#F4EFEA] tracking-tight">
                                  {project.title}
                                </h3>
                              </div>

                              <p className="text-xs text-[#D6CFC7] leading-relaxed line-clamp-3">
                                {project.shortDescription}
                              </p>

                              {/* Highlight Architecture Layer */}
                              <div className="p-3.5 rounded-xl bg-[#090A0E] border border-[#262A36] space-y-1.5">
                                <div className="text-[11px] font-mono-tabular text-[#38BDF8] uppercase font-semibold flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5" />
                                  <span>Engineered Highlight</span>
                                </div>
                                <p className="text-xs text-[#F4EFEA] font-medium leading-snug">
                                  {project.architecture[0]?.responsibility || project.shortDescription}
                                </p>
                              </div>

                              {/* Tech Stack Chips */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {project.technologies.slice(0, 5).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[10px] font-mono-tabular px-2.5 py-0.5 rounded bg-[#141721] border border-[#262A36] text-[#F4EFEA]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons with Magnetic Ergonomics */}
                            <div
                              style={{ transform: 'translateZ(24px)' }}
                              className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#262A36]"
                            >
                              <Magnetic strength={0.25} radius={60}>
                                <button
                                  type="button"
                                  onClick={() => openProjectModal(project, 'overview')}
                                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#090A0E] bg-[#F4EFEA] hover:bg-white rounded-xl transition-all cursor-pointer min-h-[42px]"
                                >
                                  <span>CASE STUDY &amp; SPECS</span>
                                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                                </button>
                              </Magnetic>

                              <Magnetic strength={0.25} radius={60}>
                                <button
                                  type="button"
                                  onClick={() => openProjectModal(project, 'architecture')}
                                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-mono-tabular text-[#F4EFEA] bg-[#0E1017] hover:bg-[#141721] border border-[#262A36] rounded-xl transition-colors cursor-pointer min-h-[42px]"
                                >
                                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                                  <span>ARCHITECTURE</span>
                                </button>
                              </Magnetic>

                              <div className="flex items-center gap-2 ml-auto">
                                <span
                                  className="px-2.5 py-1 text-[10px] font-mono-tabular rounded bg-[#141721] text-[#A8A39D] border border-[#262A36]"
                                  title="Repository is private. Code walkthrough available upon request."
                                >
                                  PRIVATE REPO
                                </span>
                                <Magnetic strength={0.2} radius={45}>
                                  <a
                                    href={PORTFOLIO_DATA.personal.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View Divyansh's GitHub profile"
                                    className="inline-flex items-center justify-center p-2 text-xs font-mono-tabular text-[#A8A39D] hover:text-[#F4EFEA] hover:bg-[#141721] rounded-lg border border-transparent hover:border-[#262A36] transition-colors min-w-[36px] min-h-[36px]"
                                    title="View GitHub Profile (@divyanshh69)"
                                  >
                                    <Github className="w-4 h-4" aria-hidden="true" />
                                  </a>
                                </Magnetic>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      </Project3DCard>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom Pinned Showcase Footer Navigation */}
            <div className="flex items-center justify-between text-xs font-mono-tabular text-[#8E8B85] pt-3 border-t border-[#262A36]">
              <span className="flex items-center gap-2">
                <span>VERTICAL SCROLL TRANSLATES SHOWCASE HORIZONTALLY</span>
              </span>
              <span className="text-[#A8A39D]">
                CLICK ANY CARD TO INSPECT PRODUCTION ARCHITECTURE SPECS &rarr;
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Reduced Motion Fallback for Desktop */
        <div className="hidden lg:block py-20 px-8 max-w-[1320px] mx-auto space-y-16">
          <div className="flex items-center justify-between pb-6 border-b border-[#262A36]">
            <div>
              <span className="text-xs font-mono-tabular text-[#FF4D26] uppercase font-semibold">
                [ 02 // SELECTED WORK ]
              </span>
              <h2 className="font-display text-4xl font-bold text-[#F4EFEA]">
                Engineered Applications &amp; Case Studies
              </h2>
            </div>
          </div>
          <div className="space-y-16">
            {projects.map((project, pIdx) => (
              <div key={project.id} className="p-6 rounded-3xl arch-surface space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#F4EFEA]">0{pIdx + 1} // {project.title}</h3>
                  <button
                    type="button"
                    onClick={() => openProjectModal(project, 'overview')}
                    className="px-4 py-2 bg-[#F4EFEA] text-[#090A0E] text-xs font-bold rounded-xl"
                  >
                    SPECS &rarr;
                  </button>
                </div>
                <p className="text-sm text-[#D6CFC7]">{project.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────
          2. MOBILE & TABLET RESPONSIVE TOUCH CAROUSEL (screens < 1024px)
          ───────────────────────────────────────────────────────────────────────── */}
      <div className="block lg:hidden py-14 sm:py-20 px-4 sm:px-6 border-b border-[#262A36] space-y-8">
        {/* Mobile Section Header with Kinetic Typography */}
        <div className="space-y-3 pb-5 border-b border-[#262A36]">
          <KineticHeading
            tag="[ 02 // SELECTED WORK ]"
            firstLine="Engineered Applications &"
            secondLine="Case Studies"
          />
          <p className="text-xs text-[#A8A39D] font-mono-tabular">
            SWIPE TO BROWSE OR TAP A PROJECT BELOW
          </p>
        </div>

        {/* Touch Project Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1017] border border-[#262A36] overflow-x-auto no-scrollbar">
          {projects.map((p, idx) => {
            const isActive = mobileActiveProjectIdx === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollMobileToProject(idx)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono-tabular whitespace-nowrap cursor-pointer transition-colors min-h-[44px] flex items-center justify-center ${
                  isActive
                    ? 'bg-[#FF4D26] text-white font-semibold'
                    : 'text-[#8E8B85] hover:text-[#F4EFEA]'
                }`}
              >
                0{idx + 1} {p.title}
              </button>
            );
          })}
        </div>

        {/* Touch Snap Horizontal Scroll Container */}
        <div
          ref={mobileCarouselRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const scrollLeft = target.scrollLeft;
            const cardWidth = target.offsetWidth * 0.88 + 20;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex >= 0 && newIndex < projects.length && newIndex !== mobileActiveProjectIdx) {
              setMobileActiveProjectIdx(newIndex);
            }
          }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6"
        >
          {projects.map((project, pIdx) => {
            const activeCardIdx = cardScreenshotIdx[project.id] ?? 0;
            const currentScreenshot =
              project.screenshots?.[activeCardIdx] || {
                title: project.title,
                image: project.image,
                caption: project.subtitle,
              };
            const theme = getProjectAccentTheme(project.id);

            return (
              <div
                key={project.id}
                className="w-[88vw] max-w-md shrink-0 snap-center rounded-2xl arch-surface overflow-hidden flex flex-col border border-[#262A36]"
              >
                {/* Mobile Card Header */}
                <div className="px-4 py-3 bg-[#0E1017] border-b border-[#262A36] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-tabular font-bold text-[#FF4D26]">
                      0{pIdx + 1} //
                    </span>
                    <span className="text-sm font-bold text-[#F4EFEA]">{project.title}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${theme.badgeBg}`}>
                    {project.status}
                  </span>
                </div>

                {/* Mobile Screenshot Viewport */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openProjectModal(project, 'overview', activeCardIdx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openProjectModal(project, 'overview', activeCardIdx);
                  }}
                  className="relative w-full aspect-16/10 bg-[#050608] flex items-center justify-center p-3 cursor-pointer overflow-hidden border-b border-[#262A36]"
                >
                  <img
                    src={currentScreenshot.image}
                    alt={`${project.title} — ${currentScreenshot.title}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] font-mono-tabular text-[#FF4D26] border border-[#FF4D26]/30">
                    TAP FOR SPECS &rarr;
                  </div>
                </div>

                {/* Mobile Screenshot Tabs */}
                {project.screenshots && project.screenshots.length > 1 && (
                  <div className="flex items-center gap-1 px-3 py-2 bg-[#0A0C11] border-b border-[#262A36] overflow-x-auto no-scrollbar">
                    {project.screenshots.map((s, sIdx) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() =>
                          setCardScreenshotIdx((prev) => ({ ...prev, [project.id]: sIdx }))
                        }
                        className={`px-3 py-2 rounded text-[11px] font-mono-tabular min-h-[44px] flex items-center cursor-pointer transition-colors ${
                          activeCardIdx === sIdx
                            ? 'bg-[#FF4D26] text-white font-bold'
                            : 'text-[#8E8B85] hover:text-[#F4EFEA]'
                        }`}
                      >
                        {getScreenshotShortLabel(project.id, sIdx)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Mobile Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-[#D6CFC7] leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono-tabular px-2 py-0.5 rounded bg-[#141721] border border-[#262A36] text-[#F4EFEA]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Actions: Touch target min 44x44px with Magnetic feedback */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#262A36]">
                    <Magnetic strength={0.2} radius={40} className="flex-1">
                      <button
                        type="button"
                        onClick={() => openProjectModal(project, 'overview')}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#F4EFEA] text-[#090A0E] text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                      >
                        <span>SPECS &amp; CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </Magnetic>

                    <Magnetic strength={0.2} radius={40}>
                      <a
                        href={PORTFOLIO_DATA.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Private repository — View GitHub profile"
                        title="Private repository — View GitHub profile"
                        className="p-2.5 rounded-xl bg-[#0E1017] border border-[#262A36] text-[#A8A39D] hover:text-white flex items-center justify-center min-w-[44px] min-h-[44px]"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1 pt-1">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollMobileToProject(idx)}
              aria-label={`Jump to project 0${idx + 1}`}
              className="p-3 cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <span
                className={`h-2 rounded-full transition-all block ${
                  mobileActiveProjectIdx === idx ? 'w-6 bg-[#FF4D26]' : 'w-2 bg-[#262A36]'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Case Study Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            initialTab={modalTab}
            initialScreenshotIdx={modalScreenshotIdx}
            onClose={closeProjectModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
