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
      label: 'Home & Hero Space',
      detail: 'Introduction, project highlights & core focus',
      action: () => {
        onNavigate('home');
        onClose();
      },
    },
    {
      id: 'cmd-about',
      category: 'Navigation',
      label: 'About Divyansh',
      detail: 'Background, education, interests & motivation',
      action: () => {
        onNavigate('about');
        onClose();
      },
    },
    {
      id: 'cmd-skills',
      category: 'Navigation',
      label: 'Skills & Tech Stack',
      detail: 'TypeScript, C++, Swift, React, PostgreSQL & Git',
      action: () => {
        onNavigate('skills');
        onClose();
      },
    },
    {
      id: 'cmd-projects',
      category: 'Navigation',
      label: 'Featured Projects',
      detail: 'Personal and college projects (MetroFlow & CampusPulse)',
      action: () => {
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'cmd-journey',
      category: 'Navigation',
      label: 'Journey & Timeline',
      detail: 'CS degree, hackathons, club roles & roadmap',
      action: () => {
        onNavigate('journey');
        onClose();
      },
    },
    {
      id: 'cmd-beyond',
      category: 'Navigation',
      label: 'Beyond the Resume',
      detail: 'How I think, strengths, growth areas & mindset',
      action: () => {
        onNavigate('beyond');
        onClose();
      },
    },
    {
      id: 'cmd-now',
      category: 'Navigation',
      label: 'Now / Active Focus',
      detail: 'What I am building, learning & exploring right now',
      action: () => {
        onNavigate('now');
        onClose();
      },
    },
    {
      id: 'cmd-contact',
      category: 'Navigation',
      label: 'Contact & Connect',
      detail: 'Reach out for SDE opportunities & collaborations',
      action: () => {
        onNavigate('contact');
        onClose();
      },
    },
    {
      id: 'cmd-proj-metroflow',
      category: 'Projects',
      label: 'MetroFlow — macOS Music Application',
      detail: 'Native macOS music player built with Swift & SwiftUI',
      action: () => {
        onNavigate('projects');
        onOpenProject?.('metroflow');
        onClose();
      },
    },
    {
      id: 'cmd-proj-campuspulse',
      category: 'Projects',
      label: 'CampusPulse — Club Management Platform',
      detail: 'Full-stack college club platform with React, Node.js & PostgreSQL',
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
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.detail.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
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
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#0A0A0C] shadow-2xl overflow-hidden text-zinc-100 divide-y divide-zinc-900"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0D0D11]">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No matching commands found.
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
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white'
                          : 'text-zinc-300 hover:bg-zinc-900/80 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold truncate">{cmd.label}</span>
                          <span
                            className={`text-[10px] font-mono-tabular px-1.5 py-0.2 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {cmd.category}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-zinc-500'
                          }`}
                        >
                          {cmd.detail}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <CornerDownLeft
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-white' : 'text-zinc-600'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Tips */}
            <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-mono-tabular text-zinc-500 bg-[#08080A]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-zinc-400">Divyansh Nayak · Digital Space</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

