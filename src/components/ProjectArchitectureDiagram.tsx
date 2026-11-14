import React from 'react';
import { ArrowRight, ArrowDown, Database, Cpu, Globe, Server, Radio, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';

interface ProjectArchitectureDiagramProps {
  projectId: string;
}

export const ProjectArchitectureDiagram: React.FC<ProjectArchitectureDiagramProps> = ({ projectId }) => {
  if (projectId === 'metroflow') {
    return (
      <div className="p-4 sm:p-5 rounded-2xl border border-[#262A36] bg-[#07080C] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262A36]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF4D26]" />
            <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-[#F4EFEA] font-bold">
              Verified Runtime Architecture // MetroFlow
            </h5>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#8E8B85]">
            APPLE SILICON ARM64 &bull; HYBRID DESKTOP RUNTIME
          </span>
        </div>

        {/* Pipeline Architecture Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch relative">
          {/* Block 1: Electron Main */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-semibold">
                <span>TIER 01 // DESKTOP</span>
                <span>MAIN</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">Electron Shell</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                Frameless macOS windowing, dockable mini-player mode, and global keyboard shortcuts.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Runtime: Electron + macOS API
            </div>
          </div>

          {/* Block 2: React Renderer */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#38BDF8] font-semibold">
                <span>TIER 02 // UI</span>
                <span>RENDERER</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">React 18 + TypeScript</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                Album artwork, discovery queue, interactive synchronized lyrics parser, and millisecond scrubber.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              IPC: preload.js Context Bridge
            </div>
          </div>

          {/* Block 3: Python Microservice */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#10B981] font-semibold">
                <span>TIER 03 // SERVICES</span>
                <span>PORT 8765</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">Local Python Bridge</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                Lightweight HTTP daemon running ytmusicapi for fast catalogue search, metadata, and time-coded lyrics.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Protocol: Localhost REST / JSON
            </div>
          </div>

          {/* Block 4: Audio Engine */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#FF4D26]/40 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-semibold">
                <span>TIER 04 // AUDIO</span>
                <span>COREAUDIO</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">libmpv Audio Engine</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                Apple Silicon ARM64 libmpv.2.dylib outputting directly to macOS CoreAudio buffers with low latency.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Pipeline: 48kHz 32-bit Float Audio
            </div>
          </div>
        </div>

        {/* Data Flow Legend */}
        <div className="p-2.5 rounded-xl bg-[#090A0E] border border-[#1C202E] flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono-tabular text-[#8E8B85]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF4D26] font-bold">DATA FLOW:</span>
            <span>UI Action &rarr; Electron IPC &rarr; Localhost :8765 &rarr; CoreAudio Output Buffer</span>
          </div>
          <span className="text-[#38BDF8]">ZERO REMOTE CLOUD DEPENDENCIES FOR CORE PLAYBACK</span>
        </div>
      </div>
    );
  }

  if (projectId === 'skillsync') {
    return (
      <div className="p-4 sm:p-5 rounded-2xl border border-[#262A36] bg-[#07080C] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262A36]">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#38BDF8]" />
            <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-[#F4EFEA] font-bold">
              Verified Full-Stack Architecture // SkillSync
            </h5>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#8E8B85]">
            NORMALIZED 7-MODEL RELATIONAL SYSTEM
          </span>
        </div>

        {/* Pipeline Architecture Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch relative">
          {/* Block 1: Client */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#38BDF8] font-semibold">
                <span>TIER 01 // FRONTEND</span>
                <span>SPA</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">React 18 + Vite</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                5-phase milestone roadmap view, project evidence cards, and optimistic UI updates for task checklists.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Client State: Custom React Hooks
            </div>
          </div>

          {/* Block 2: Backend API */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-semibold">
                <span>TIER 02 // BACKEND</span>
                <span>API</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">Node.js + Express</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                REST controllers, input validation middleware, phase transition gates, and readiness score aggregator.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Readiness: utils/readiness.ts
            </div>
          </div>

          {/* Block 3: ORM */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#10B981] font-semibold">
                <span>TIER 03 // ORM</span>
                <span>PRISMA</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">Prisma ORM Client</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                Type-safe database client, schema migrations, composite unique constraints, and relational query consolidation.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Parameterized SQL Generation
            </div>
          </div>

          {/* Block 4: PostgreSQL */}
          <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#10B981]/40 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#10B981] font-semibold">
                <span>TIER 04 // STORAGE</span>
                <span>POSTGRES</span>
              </div>
              <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">PostgreSQL 16</h6>
              <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
                7 normalized models: User, Skill, UserSkill, Project, ProjectSkill, RoadmapPhase, PhaseSkill with cascade rules.
              </p>
            </div>
            <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
              Schema: Composite Foreign Keys
            </div>
          </div>
        </div>

        {/* Data Flow Legend */}
        <div className="p-2.5 rounded-xl bg-[#090A0E] border border-[#1C202E] flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono-tabular text-[#8E8B85]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#38BDF8] font-bold">DATA FLOW:</span>
            <span>Client &rarr; REST API &rarr; Readiness Algorithm &rarr; Prisma ORM &rarr; PostgreSQL 16</span>
          </div>
          <span className="text-[#10B981]">DETERMINISTIC WEIGHTING: 1.5x EVIDENCED &bull; 0.8x THEORY</span>
        </div>
      </div>
    );
  }

  // CampusPulse
  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[#262A36] bg-[#07080C] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262A36]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#FF4D26]" />
          <h5 className="text-xs font-mono-tabular uppercase tracking-wider text-[#F4EFEA] font-bold">
            Verified Full-Stack Architecture // CampusPulse
          </h5>
        </div>
        <span className="text-[10px] font-mono-tabular text-[#8E8B85]">
          ROLE-BASED PERMISSIONS &bull; CONFLICT VALIDATION LOGIC
        </span>
      </div>

      {/* Pipeline Architecture Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch relative">
        {/* Block 1: Client */}
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-semibold">
              <span>TIER 01 // CLIENT</span>
              <span>SPA</span>
            </div>
            <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">React + TypeScript</h6>
            <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
              Club operations dashboard, event schedule calendar, member management directory, and RSVP flow.
            </p>
          </div>
          <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
            Styling: Tailwind CSS Responsive
          </div>
        </div>

        {/* Block 2: Security & RBAC */}
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#38BDF8] font-semibold">
              <span>TIER 02 // SECURITY</span>
              <span>ROLES</span>
            </div>
            <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">JWT Middleware</h6>
            <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
              Role-based authorization separating privileges between club organizers and student members.
            </p>
          </div>
          <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
            Stateless Claim Verification
          </div>
        </div>

        {/* Block 3: Conflict Validation Logic */}
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#262A36] flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#10B981] font-semibold">
              <span>TIER 03 // LOGIC</span>
              <span>CALENDAR</span>
            </div>
            <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">Conflict Detection Logic</h6>
            <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
              Validates event dates and campus locations against existing schedules to prevent event overlap.
            </p>
          </div>
          <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
            Validation: SQL Time-Range Overlap
          </div>
        </div>

        {/* Block 4: PostgreSQL Database */}
        <div className="p-3.5 rounded-xl bg-[#0E1017] border border-[#FF4D26]/40 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-semibold">
              <span>TIER 04 // STORAGE</span>
              <span>POSTGRES</span>
            </div>
            <h6 className="text-xs font-bold text-[#F4EFEA] mt-1">PostgreSQL Database</h6>
            <p className="text-[11px] text-[#A8A39D] mt-1 leading-snug">
              Normalized relational schema connecting student clubs, event dates, member rosters, and student registrations.
            </p>
          </div>
          <div className="text-[9.5px] font-mono-tabular text-[#8E8B85] pt-2 border-t border-[#1C202E]">
            Relational Integrity &amp; Foreign Keys
          </div>
        </div>
      </div>

      {/* Data Flow Legend */}
      <div className="p-2.5 rounded-xl bg-[#090A0E] border border-[#1C202E] flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono-tabular text-[#8E8B85]">
        <div className="flex items-center gap-1.5">
          <span className="text-[#FF4D26] font-bold">DATA FLOW:</span>
          <span>Client Event Submission &rarr; Role-Based Auth &rarr; Schedule Conflict Query &rarr; PostgreSQL Persistence</span>
        </div>
        <span className="text-[#38BDF8]">PREVENTS SCHEDULE CLASHES ACROSS CAMPUS CLUBS</span>
      </div>
    </div>
  );
};
