import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar, SectionId, NAV_SECTIONS } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { JourneySection } from './components/JourneySection';
import { ContactFooter } from './components/ContactFooter';
import { ParticleTrailCanvas } from './components/ParticleTrailCanvas';
import { SectionDivider } from './components/SectionDivider';

const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleNavigate = useCallback((id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, []);

  const handleOpenProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    const element = document.getElementById('projects');
    if (element) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, []);

  // Global ⌘K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scrollspy for active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const secId = NAV_SECTIONS[i].id;
        const el = document.getElementById(secId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(secId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#090A0E] text-[#F4EFEA] flex flex-col selection:bg-[#FF4D26] selection:text-white relative w-full overflow-x-clip font-sans antialiased">
      {/* Global Pointer & Touch Reactive Particle Canvas */}
      <ParticleTrailCanvas />

      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className="flex-1 w-full overflow-x-clip">
        <HeroSection
          onNavigate={handleNavigate}
          onOpenProject={handleOpenProject}
        />
        <SectionDivider variant="hero-about" />
        <AboutSection />
        <SectionDivider variant="about-projects" />
        <ProjectsSection
          externalSelectedProject={selectedProjectId}
          onClearExternalProject={() => setSelectedProjectId(null)}
        />
        <SectionDivider variant="projects-skills" />
        <SkillsSection />
        <SectionDivider variant="skills-journey" />
        <JourneySection />
        <SectionDivider variant="journey-contact" />
      </main>

      <ContactFooter onNavigate={handleNavigate} />

      {/* Global Command Palette (⌘K) — Lazy loaded on demand */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onNavigate={handleNavigate}
              onOpenProject={handleOpenProject}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}