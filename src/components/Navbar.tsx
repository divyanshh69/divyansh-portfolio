import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';

export type SectionId =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'journey'
  | 'contact';

export const NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
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

  // Keyboard accessibility: Escape key closes mobile navigation drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background page scrolling while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [mobileMenuOpen]);

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

  const centerNavLinks = NAV_SECTIONS.filter((item) => item.id !== 'contact');

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#08090d]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.03)]">
        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-75 z-50 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span>Divyansh Nayak</span>
            <span className="hidden sm:inline font-mono-tabular text-[11px] font-normal text-zinc-500 group-hover:text-zinc-400 transition-colors">
              / CSE
            </span>
          </a>

          {/* Primary Center Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1"
          >
            {centerNavLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative px-2.5 lg:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white font-semibold bg-white/[0.08]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Command Trigger + Contact Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Command Trigger: Full pill on desktop (lg+), compact icon on tablet (sm-md), drawer on mobile */}
            {onOpenCommandPalette && (
              <>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  aria-label="Open Command Menu (⌘K)"
                  title="Open Command Menu (⌘K)"
                  className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tabular text-zinc-400 liquid-glass-pill rounded-lg hover:text-white hover:border-white/20 transition-all cursor-pointer min-h-[36px]"
                >
                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px]">Search</span>
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-white/[0.08] rounded text-zinc-300 border border-white/[0.1]">
                    ⌘K
                  </kbd>
                </button>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  aria-label="Open Command Search"
                  title="Search portfolio"
                  className="hidden sm:inline-flex lg:hidden items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </>
            )}

            {/* Direct Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[38px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {/* Mobile Hamburger Button with comfortable 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/[0.1] text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer with backdrop dismissal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay for outside tap-dismissal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              className="md:hidden fixed inset-0 top-[57px] bg-black/60 backdrop-blur-xs z-30"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-x-0 top-[57px] z-40 liquid-glass border-b border-white/[0.08] px-4 py-4 shadow-2xl"
            >
              <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
                {NAV_SECTIONS.map((sec, index) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={(e) => handleLinkClick(e, sec.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-sm font-semibold'
                          : 'bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-white/[0.04]'
                      }`}
                    >
                      <span>{sec.label}</span>
                      <span className="font-mono-tabular text-[11px] opacity-70">0{index + 1}</span>
                    </button>
                  );
                })}
              </nav>

              {onOpenCommandPalette && (
                <div className="pt-3 mt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCommandPalette();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm text-zinc-200 bg-zinc-900/80 border border-white/[0.08] rounded-xl hover:text-white transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Search className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                    <span>Search Projects, Skills & Links</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
