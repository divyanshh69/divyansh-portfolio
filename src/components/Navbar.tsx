import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Search, ArrowUp } from 'lucide-react';
import { Magnetic } from './Magnetic';

export type SectionId =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'journey'
  | 'contact';

export const NAV_SECTIONS: { id: SectionId; label: string; index: string }[] = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'journey', label: 'Journey', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
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
  const headerRef = useRef<HTMLElement>(null);

  // Synchronize CSS variable --navbar-height with actual measured header height
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        const measuredHeight = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${measuredHeight}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight, { passive: true });
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

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
      <header ref={headerRef} className="sticky top-0 z-40 w-full bg-[#090A0E]/90 backdrop-blur-md border-b border-[#262A36]">
        {/* Architectural Scroll Progress Indicator */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#FF4D26] via-[#FF4D26] to-[#10B981] transition-all duration-75 z-50 pointer-events-none shadow-[0_0_8px_rgba(255,77,38,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Brand Wordmark & Technical Badge */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-[#F4EFEA] hover:text-[#FF4D26] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4D26]"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#FF4D26] animate-pulse"
              aria-hidden="true"
            />
            <span className="font-display">Divyansh Nayak</span>
            <span className="hidden sm:inline font-mono-tabular text-[10px] tracking-widest uppercase text-[#8E8B85] group-hover:text-[#D6CFC7] transition-colors">
              / CSE &bull; IND
            </span>
          </a>

          {/* Primary Center Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 bg-[#0E1017]/90 border border-[#262A36] rounded-full px-2 py-1 shadow-inner relative"
          >
            {centerNavLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative px-3 lg:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 font-mono-tabular text-[11px] tracking-wider uppercase z-10 ${
                    isActive
                      ? 'text-[#090A0E] font-bold'
                      : 'text-[#A8A39D] hover:text-[#F4EFEA]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#F4EFEA] rounded-full -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Command Trigger + Contact Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Command Trigger: Full pill on desktop (lg+), compact icon on tablet (sm-md) */}
            {onOpenCommandPalette && (
              <>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  aria-label="Open Command Menu (⌘K)"
                  title="Open Command Menu (⌘K)"
                  className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tabular text-[#A8A39D] bg-[#0E1017] border border-[#262A36] rounded-lg hover:text-[#F4EFEA] hover:border-[#FF4D26]/40 transition-all cursor-pointer min-h-[36px]"
                >
                  <Search className="w-3.5 h-3.5 text-[#8E8B85]" />
                  <span className="text-[11px]">Command</span>
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-[#141721] rounded text-[#D6CFC7] border border-[#262A36]">
                    ⌘K
                  </kbd>
                </button>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  aria-label="Open Command Search"
                  title="Search portfolio"
                  className="hidden sm:inline-flex lg:hidden items-center justify-center w-8 h-8 rounded-lg border border-[#262A36] bg-[#0E1017] text-[#A8A39D] hover:text-[#F4EFEA] hover:border-[#FF4D26]/40 transition-all cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#8E8B85]" />
                </button>
              </>
            )}

            {/* Architectural Direct Contact Button */}
            <Magnetic strength={0.25} radius={50}>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono-tabular uppercase tracking-wider font-semibold text-white bg-[#FF4D26] hover:bg-[#ff623e] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D26] shadow-xs"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Magnetic>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#262A36] bg-[#0E1017] text-[#D6CFC7] hover:text-white hover:border-[#FF4D26]/40 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay for outside tap-dismissal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              style={{ top: 'var(--navbar-height, 73px)' }}
              className="md:hidden fixed inset-0 bg-black/75 backdrop-blur-xs z-30"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              style={{ top: 'var(--navbar-height, 73px)' }}
              className="md:hidden fixed inset-x-0 z-40 bg-[#090A0E] border-b border-[#262A36] px-4 py-4 shadow-2xl"
            >
              <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
                {NAV_SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={(e) => handleLinkClick(e, sec.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-[#FF4D26] text-white shadow-sm font-semibold'
                          : 'bg-[#0E1017] text-[#D6CFC7] hover:bg-[#141721] hover:text-white border border-[#262A36]'
                      }`}
                    >
                      <span className="font-display font-medium">{sec.label}</span>
                      <span className="font-mono-tabular text-[11px] opacity-75">{sec.index}</span>
                    </button>
                  );
                })}
              </nav>

              {onOpenCommandPalette && (
                <div className="pt-3 mt-3 border-t border-[#262A36]">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCommandPalette();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono-tabular text-[#D6CFC7] bg-[#0E1017] border border-[#262A36] rounded-xl hover:text-white hover:border-[#FF4D26]/40 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Search className="w-4 h-4 text-[#8E8B85]" aria-hidden="true" />
                    <span>Search Projects, Skills & Index (⌘K)</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Return-to-Top Indicator */}
      <AnimatePresence>
        {scrollProgress > 15 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 hidden sm:block"
          >
            <Magnetic strength={0.25} radius={50}>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Return to top of page"
                title="Return to top of page"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0E1017]/90 backdrop-blur-md border border-[#262A36] hover:border-[#FF4D26]/50 text-xs font-mono-tabular text-[#A8A39D] hover:text-[#F4EFEA] shadow-xl transition-all cursor-pointer min-h-[44px]"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#FF4D26]" />
                <span>TOP // {Math.round(scrollProgress)}%</span>
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
