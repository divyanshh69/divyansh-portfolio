import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Search, Command } from 'lucide-react';

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'journey'
  | 'beyond'
  | 'now'
  | 'contact';

export const NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'beyond', label: 'Mindset' },
  { id: 'now', label: 'Now' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: SectionId
  ) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const centerNavLinks: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'beyond', label: 'Mindset' },
    { id: 'now', label: 'Now' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.03)]">
        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-75 z-50 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-3.5">
          {/* Zone 1: Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-tight text-zinc-100 hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            <span>Divyansh Nayak</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400"
          >
            {centerNavLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="header-active-underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#2563EB]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Command Trigger + Contact + Mobile Menu */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Command Trigger Pill */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                aria-label="Open Command Menu (⌘K)"
                title="Open Command Menu (⌘K)"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tabular text-zinc-400 liquid-glass-pill hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Search className="w-3 h-3 text-zinc-400" />
                <span className="text-[11px]">Search</span>
                <kbd className="px-1 py-0.5 text-[10px] bg-white/[0.08] rounded text-zinc-300 border border-white/[0.1]">
                  ⌘K
                </kbd>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-all hover:shadow-md hover:shadow-blue-500/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden fixed inset-x-0 top-[53px] sm:top-[57px] z-30 liquid-glass border-b border-white/[0.08] px-4 sm:px-6 py-4 sm:py-5 shadow-2xl"
          >
            <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
              {NAV_SECTIONS.map((sec, index) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={(e) => handleLinkClick(e, sec.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-white/[0.04]'
                    }`}
                  >
                    <span>{sec.label}</span>
                    <span className="font-mono-tabular text-[11px] sm:text-xs opacity-70">0{index + 1}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
