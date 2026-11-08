import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Compass, Target, Headphones, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, BeyondFacet } from '../data/portfolioData';
import { CardTilt } from './CardTilt';

export const BeyondSection: React.FC = () => {
  const { beyondResume } = PORTFOLIO_DATA;
  const [activeFacetId, setActiveFacetId] = useState<BeyondFacet['id']>('principles');
  const [viewFilter, setViewFilter] = useState<'all' | 'strengths' | 'growth'>('all');

  const activeFacet =
    beyondResume.facets.find((f) => f.id === activeFacetId) || beyondResume.facets[0];

  const mentalModels = [
    {
      title: 'Learn by Building Real Projects',
      principle: 'Hands-on execution over passive tutorials',
      description:
        'I understand software architecture and design patterns best when taking a project from an empty folder into a working application with real users.',
      icon: BookOpen,
    },
    {
      title: 'Care for the User Experience',
      principle: 'Clear layouts & responsive feedback',
      description:
        'Even in student projects, I pay close attention to UI details—consistent styling, accessible keyboard shortcuts, and intuitive layouts that make software enjoyable.',
      icon: Sparkles,
    },
    {
      title: 'Curiosity Across the Stack',
      principle: 'Connecting frontend, backend & databases',
      description:
        'I enjoy connecting the pieces—designing clean React and SwiftUI interfaces, structuring REST endpoints with Express, and modeling relational data in PostgreSQL.',
      icon: Layers,
    },
  ];

  return (
    <section
      id="beyond"
      aria-labelledby="beyond-heading"
      className="py-14 sm:py-20 md:py-28 border-b border-zinc-900 relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="font-mono-tabular text-[#2563EB]">06.</span>
            <span>Mindset</span>
            <span aria-hidden="true">·</span>
            <span>Problem Solving & Growth</span>
          </div>
          <h2
            id="beyond-heading"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight [text-wrap:balance]"
          >
            How I think, where I excel, and where I am actively growing.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {beyondResume.intro}
          </p>
        </div>

        {/* Feature 1: How I Think — Mental Models Strip */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-base sm:text-lg font-bold text-white">How I Approach Problem Solving</h3>
            </div>
            <span className="text-xs font-mono-tabular text-zinc-500 hidden sm:inline">
              Core Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {mentalModels.map((model, idx) => {
              const Icon = model.icon;
              return (
                <CardTilt key={model.title} maxTilt={5} className="rounded-xl">
                  <div className="p-4.5 sm:p-6 rounded-xl border border-zinc-800/90 bg-[#0A0A0C] hover:border-zinc-700 transition-colors h-full flex flex-col justify-between space-y-3 sm:space-y-4 shadow-lg">
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono-tabular text-[#2563EB]">0{idx + 1}.</span>
                        <Icon className="w-4 h-4 text-zinc-400" />
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white">{model.title}</h4>
                      <div className="text-xs font-medium text-blue-400 font-mono-tabular">
                        "{model.principle}"
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {model.description}
                      </p>
                    </div>
                  </div>
                </CardTilt>
              );
            })}
          </div>
        </div>

        {/* Feature 2: Dual Column: Strengths & Growth Areas with Interactive Filter */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <h3 className="text-base sm:text-lg font-bold text-white">Self-Assessment & Reflection</h3>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 liquid-glass-pill rounded-lg text-xs w-full sm:w-fit overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setViewFilter('all')}
                className={`px-2.5 sm:px-3 py-1 rounded font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFilter === 'all' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All Perspectives
              </button>
              <button
                type="button"
                onClick={() => setViewFilter('strengths')}
                className={`px-2.5 sm:px-3 py-1 rounded font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFilter === 'strengths' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Strengths (04)
              </button>
              <button
                type="button"
                onClick={() => setViewFilter('growth')}
                className={`px-2.5 sm:px-3 py-1 rounded font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFilter === 'growth' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Growth Areas (03)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Column 1: Core Strengths */}
            {(viewFilter === 'all' || viewFilter === 'strengths') && (
              <div
                className={`p-4.5 sm:p-8 rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] space-y-4 sm:space-y-6 shadow-xl ${
                  viewFilter === 'strengths' ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="border-b border-zinc-900 pb-3 sm:pb-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tabular text-xs text-[#2563EB] font-semibold">
                      Part I
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Strengths I Rely On</h4>
                  </div>
                  <span className="text-xs text-zinc-400 hidden sm:inline">
                    What I bring to an engineering team
                  </span>
                </div>

                <div className="divide-y divide-zinc-900">
                  {beyondResume.strengths.map((str, index) => (
                    <div key={str.id} className="py-4 sm:py-5 first:pt-0 last:pb-0 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="font-mono-tabular text-[#2563EB] font-bold">
                          0{index + 1}.
                        </span>
                        <h5 className="text-sm sm:text-base font-semibold text-white">{str.title}</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{str.description}</p>
                      <div className="pt-1 flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-zinc-200">Demonstrated in:</strong> {str.evidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Column 2: Honest Growth Areas */}
            {(viewFilter === 'all' || viewFilter === 'growth') && (
              <div
                className={`p-4.5 sm:p-8 rounded-2xl border border-zinc-800/90 bg-[#0A0A0C] space-y-4 sm:space-y-6 shadow-xl ${
                  viewFilter === 'growth' ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="border-b border-zinc-900 pb-3 sm:pb-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tabular text-xs text-amber-400 font-semibold">
                      Part II
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Areas of Active Growth</h4>
                  </div>
                  <span className="text-xs text-zinc-400 hidden sm:inline">
                    Honest self-reflection & action plan
                  </span>
                </div>

                <div className="divide-y divide-zinc-900">
                  {beyondResume.growthAreas.map((grw, index) => (
                    <div key={grw.id} className="py-4 sm:py-5 first:pt-0 last:pb-0 space-y-2 sm:space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="font-mono-tabular text-amber-400 font-bold">
                          0{index + 1}.
                        </span>
                        <h5 className="text-sm sm:text-base font-semibold text-white">{grw.title}</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {grw.honestReflection}
                      </p>
                      <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
                        <span className="text-amber-400 font-semibold">Action Plan: </span>
                        {grw.activeActionPlan}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature 3: Interactive Mindset & Facets Explorer */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Beyond Code & Development Mindset
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Explore the habits, principles, interests, and deliberate improvements that shape my perspective.
              </p>
            </div>

            {/* Interactive Facet Segmented Control */}
            <div
              role="tablist"
              aria-label="Personal mindset facets"
              className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 bg-[#0A0A0C] border border-zinc-800/80 rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar"
            >
              {beyondResume.facets.map((facet) => {
                const isSelected = facet.id === activeFacetId;
                return (
                  <button
                    key={facet.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setActiveFacetId(facet.id)}
                    className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                    }`}
                  >
                    {facet.label}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFacet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="p-4.5 sm:p-8 rounded-2xl border border-zinc-800/80 bg-[#0A0A0C] space-y-4 sm:space-y-6 shadow-xl"
            >
              <div className="border-b border-zinc-900 pb-3 sm:pb-4 flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                  <span>{activeFacet.label}</span>
                </h4>
                <p className="text-xs text-zinc-400">{activeFacet.headline}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {activeFacet.items.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-4 sm:p-5 rounded-xl border border-zinc-900 bg-zinc-950/70 hover:border-zinc-800 transition-colors space-y-2"
                  >
                    <div className="font-mono-tabular text-xs text-[#2563EB]">
                      0{idx + 1}
                    </div>
                    <h5 className="text-sm sm:text-base font-semibold text-white">{item.title}</h5>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
