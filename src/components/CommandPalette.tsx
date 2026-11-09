import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, CornerDownLeft, Sparkles, FolderGit2, Mail, ExternalLink, X } from 'lucide-react';
import { SectionId } from './Navbar';
import { PORTFOLIO_DATA } from '../data/portfolioData';

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
  icon?: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProject,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands: CommandItem[] = [
    {
      id: 'cmd-home',
      category: 'Navigation',
      label: 'Home & Overview',
      detail: 'Introduction, project spotlight & student role',
      action: () => {
        onNavigate('home');
        onClose();
      },
    },
    {
      id: 'cmd-about',
      category: 'Navigation',
      label: 'About Divyansh',
      detail: 'Medi-Caps University, B.Tech CSE, 2nd Year & approach',
      action: () => {
        onNavigate('about');
        onClose();
      },
    },
    {
      id: 'cmd-projects',
      category: 'Navigation',
      label: 'Featured Projects',
      detail: 'MetroFlow for macOS & CampusPulse Club Platform',
      action: () => {
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'cmd-skills',
      category: 'Navigation',
      label: 'Technical Skills',
      detail: 'Swift, TypeScript, C++, React, PostgreSQL, Node.js & Git',
      action: () => {
        onNavigate('skills');
        onClose();
      },
    },
    {
      id: 'cmd-journey',
      category: 'Navigation',
      label: 'Journey & Timeline',
      detail: 'Aug 2025 Medi-Caps enrollment, 2026 hackathons & milestones',
      action: () => {
        onNavigate('journey');
        onClose();
      },
    },
    {
      id: 'cmd-contact',
      category: 'Navigation',
      label: 'Contact & Connect',
      detail: 'Email, GitHub, LinkedIn & direct messaging',
      action: () => {
        onNavigate('contact');
        onClose();
      },
    },
    {
      id: 'cmd-proj-metroflow',
      category: 'Projects',
      label: 'MetroFlow — macOS Music Player',
      detail: 'Native desktop application built with Swift & CoreAudio',
      action: () => {
        onNavigate('projects');
        onOpenProject?.('metroflow');
        onClose();
      },
    },
    {
      id: 'cmd-proj-campuspulse',
      category: 'Projects',
      label: 'CampusPulse — Club Operations Platform',
      detail: 'Full-stack platform built with React, Node.js & PostgreSQL',
      action: () => {
        onNavigate('projects');
        onOpenProject?.('campuspulse');
        onClose();
      },
    },
    {
      id: 'cmd-github',
      category: 'Connect',
      label: 'View GitHub Profile',
      detail: 'github.com/divyanshh69',
      action: () => {
        window.open(PORTFOLIO_DATA.personal.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'cmd-linkedin',
      category: 'Connect',
      label: 'View LinkedIn Profile',
      detail: 'linkedin.com/in/divyansh-nayak-703390370',
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
      action: () => {
        navigator.clipboard?.writeText(PORTFOLIO_DATA.personal.email);
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.detail.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.16 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-white/[0.1] bg-[#0c0d14] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#11121c]">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search sections, projects, or external links..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono-tabular bg-white/[0.08] text-zinc-400 border border-white/[0.1] rounded">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
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
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2563EB] text-white'
                      : 'text-zinc-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold truncate">{cmd.label}</span>
                      <span
                        className={`text-[10px] font-mono-tabular px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white/[0.05] text-zinc-400'
                        }`}
                      >
                        {cmd.category}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-blue-100' : 'text-zinc-500'
                      }`}
                    >
                      {cmd.detail}
                    </p>
                  </div>
                  {isSelected && <CornerDownLeft className="w-3.5 h-3.5 shrink-0 opacity-80" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-[#090a0f] flex items-center justify-between text-[11px] text-zinc-500 font-mono-tabular">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press Enter to select</span>
        </div>
      </motion.div>
    </div>
  );
};
