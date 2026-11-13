import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, CornerDownLeft, X, Check, AlertCircle } from 'lucide-react';
import { SectionId, NAV_SECTIONS } from './Navbar';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { copyToClipboard } from '../utils/clipboard';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
  onOpenProject?: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Connect';
  label: string;
  detail: string;
  action: () => void;
}

const SECTION_DETAILS: Record<SectionId, string> = {
  home: 'Introduction, live resonator canvas & student background',
  about: 'Medi-Caps University, B.Tech CSE (2nd Year) & engineering method',
  projects: 'MetroFlow macOS player, SkillSync career platform & CampusPulse',
  skills: 'TypeScript, React, Node.js, Prisma ORM, PostgreSQL & Python',
  journey: 'Academic timeline, hackathons & collegiate milestones',
  contact: 'Direct email, GitHub, LinkedIn & honest messaging dispatch',
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProject,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands: CommandItem[] = useMemo(() => [
    ...NAV_SECTIONS.map((sec) => ({
      id: `cmd-${sec.id}`,
      category: 'Navigation' as const,
      label: sec.label,
      detail: SECTION_DETAILS[sec.id] || sec.label,
      action: () => {
        onNavigate(sec.id);
        onClose();
      },
    })),
    ...PORTFOLIO_DATA.projects.map((project) => ({
      id: `cmd-proj-${project.id}`,
      category: 'Projects' as const,
      label: `${project.title} — ${project.subtitle}`,
      detail: project.shortDescription,
      action: () => {
        onNavigate('projects');
        onOpenProject?.(project.id);
        onClose();
      },
    })),
    {
      id: 'cmd-github',
      category: 'Connect',
      label: 'View GitHub Profile',
      detail: PORTFOLIO_DATA.personal.github.replace('https://', ''),
      action: () => {
        window.open(PORTFOLIO_DATA.personal.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'cmd-linkedin',
      category: 'Connect',
      label: 'View LinkedIn Profile',
      detail: PORTFOLIO_DATA.personal.linkedin.replace('https://', ''),
      action: () => {
        window.open(PORTFOLIO_DATA.personal.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'cmd-email',
      category: 'Connect',
      label: 'Copy Direct Email Address',
      detail: PORTFOLIO_DATA.personal.email,
      action: async () => {
        const success = await copyToClipboard(PORTFOLIO_DATA.personal.email);
        if (success) {
          setCopyFeedback({
            type: 'success',
            message: `Email copied to clipboard (${PORTFOLIO_DATA.personal.email})`,
          });
          setTimeout(() => {
            setCopyFeedback(null);
            onClose();
          }, 1200);
        } else {
          setCopyFeedback({
            type: 'error',
            message: `Could not copy to clipboard. Please copy manually: ${PORTFOLIO_DATA.personal.email}`,
          });
          setTimeout(() => setCopyFeedback(null), 3500);
        }
      },
    },
  ], [onNavigate, onOpenProject, onClose]);

  const filteredCommands = commands.filter((cmd) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.detail.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Lock body scroll while command palette is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Command search menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-[#262A36] bg-[#090A0E] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#262A36] bg-[#0E1017]">
          <Search className="w-4 h-4 text-[#FF4D26] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search sections, projects, or command actions..."
            className="flex-1 bg-transparent text-sm text-[#F4EFEA] placeholder:text-[#8E8B85] focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search text"
              className="text-[#8E8B85] hover:text-[#F4EFEA] p-1.5 rounded cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono-tabular bg-[#141721] text-[#8E8B85] border border-[#262A36] rounded">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command search"
            className="text-[#8E8B85] hover:text-white p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center sm:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Copy Feedback Announcement */}
        {copyFeedback && (
          <div
            role="status"
            aria-live="polite"
            className={`px-4 py-2 text-xs font-mono-tabular flex items-center gap-2 border-b transition-all ${
              copyFeedback.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-[#FF4D26]/15 border-[#FF4D26]/30 text-[#FF4D26]'
            }`}
          >
            {copyFeedback.type === 'success' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-[#FF4D26] shrink-0" aria-hidden="true" />
            )}
            <span>{copyFeedback.message}</span>
          </div>
        )}

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#262A36]/40">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono-tabular text-[#8E8B85]">
              No matching commands or destinations found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between gap-3 cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-[#FF4D26] text-white shadow-xs'
                      : 'text-[#D6CFC7] hover:bg-[#0E1017]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold truncate">{cmd.label}</span>
                      <span
                        className={`text-[10px] font-mono-tabular px-1.5 py-0.2 rounded ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-[#141721] text-[#8E8B85] border border-[#262A36]'
                        }`}
                      >
                        {cmd.category}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-white/90' : 'text-[#8E8B85]'
                      }`}
                    >
                      {cmd.detail}
                    </p>
                  </div>
                  {isSelected && <CornerDownLeft className="w-3.5 h-3.5 shrink-0 opacity-90" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-[#262A36] bg-[#0E1017] flex items-center justify-between text-[11px] text-[#8E8B85] font-mono-tabular">
          <span className="hidden sm:inline">&uarr; &darr; to navigate</span>
          <span className="hidden sm:inline">&crarr; to select</span>
          <span className="sm:hidden text-center w-full">Tap any destination to navigate</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
