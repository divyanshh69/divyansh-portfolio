import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ConstellationNode {
  id: string;
  name: string;
  cluster: string;
  normX: number;
  normY: number;
  isHub: boolean;
  color: string;
}

interface ConstellationEdge {
  source: string;
  target: string;
  color: string;
}

const NODES: ConstellationNode[] = [
  // Cluster 1: Systems & Desktop Core (Vermilion)
  { id: 'desktop-hub', name: 'macOS Systems', cluster: 'Systems', normX: 0.22, normY: 0.38, isHub: true, color: '#FF4D26' },
  { id: 'electron', name: 'Electron', cluster: 'Systems', normX: 0.12, normY: 0.24, isHub: false, color: '#FF4D26' },
  { id: 'libmpv', name: 'libmpv CoreAudio', cluster: 'Systems', normX: 0.10, normY: 0.52, isHub: false, color: '#FF4D26' },
  { id: 'cpp', name: 'C++ Systems', cluster: 'Systems', normX: 0.26, normY: 0.18, isHub: false, color: '#FF4D26' },
  { id: 'python', name: 'Python IPC Bridge', cluster: 'Systems', normX: 0.30, normY: 0.54, isHub: false, color: '#FF4D26' },

  // Cluster 2: Full-Stack Web & Runtime (Cobalt/Cyan)
  { id: 'web-hub', name: 'Full-Stack Runtime', cluster: 'Web', normX: 0.76, normY: 0.35, isHub: true, color: '#38BDF8' },
  { id: 'react', name: 'React', cluster: 'Web', normX: 0.64, normY: 0.22, isHub: false, color: '#38BDF8' },
  { id: 'typescript', name: 'TypeScript', cluster: 'Web', normX: 0.88, normY: 0.22, isHub: false, color: '#38BDF8' },
  { id: 'nodejs', name: 'Node.js & Express', cluster: 'Web', normX: 0.88, normY: 0.50, isHub: false, color: '#38BDF8' },
  { id: 'tailwind', name: 'Tailwind CSS', cluster: 'Web', normX: 0.66, normY: 0.52, isHub: false, color: '#38BDF8' },

  // Cluster 3: Relational Architecture & Storage (Emerald)
  { id: 'db-hub', name: 'Relational Schemas', cluster: 'Database', normX: 0.50, normY: 0.65, isHub: true, color: '#10B981' },
  { id: 'postgres', name: 'PostgreSQL 16', cluster: 'Database', normX: 0.40, normY: 0.82, isHub: false, color: '#10B981' },
  { id: 'prisma', name: 'Prisma ORM', cluster: 'Database', normX: 0.60, normY: 0.82, isHub: false, color: '#10B981' },
  { id: 'git', name: 'Git & Linux CI', cluster: 'Database', normX: 0.50, normY: 0.45, isHub: false, color: '#10B981' },
];

const EDGES: ConstellationEdge[] = [
  // Desktop
  { source: 'desktop-hub', target: 'electron', color: '#FF4D26' },
  { source: 'desktop-hub', target: 'libmpv', color: '#FF4D26' },
  { source: 'desktop-hub', target: 'cpp', color: '#FF4D26' },
  { source: 'desktop-hub', target: 'python', color: '#FF4D26' },

  // Web
  { source: 'web-hub', target: 'react', color: '#38BDF8' },
  { source: 'web-hub', target: 'typescript', color: '#38BDF8' },
  { source: 'web-hub', target: 'nodejs', color: '#38BDF8' },
  { source: 'web-hub', target: 'tailwind', color: '#38BDF8' },

  // Database
  { source: 'db-hub', target: 'postgres', color: '#10B981' },
  { source: 'db-hub', target: 'prisma', color: '#10B981' },
  { source: 'db-hub', target: 'git', color: '#10B981' },

  // Inter-cluster bridges
  { source: 'desktop-hub', target: 'db-hub', color: 'rgba(244, 239, 234, 0.2)' },
  { source: 'web-hub', target: 'db-hub', color: 'rgba(244, 239, 234, 0.2)' },
  { source: 'react', target: 'desktop-hub', color: 'rgba(255, 77, 38, 0.25)' },
  { source: 'typescript', target: 'prisma', color: 'rgba(16, 185, 129, 0.25)' },
];

interface SkillConstellationCanvasProps {
  onSelectSkill?: (skillName: string) => void;
  className?: string;
}

export const SkillConstellationCanvas: React.FC<SkillConstellationCanvasProps> = ({
  onSelectSkill,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const [activeCluster, setActiveCluster] = useState<string>('All');
  const hoveredNodeIdRef = useRef<string | null>(null);
  const activeClusterRef = useRef<string>('All');

  useEffect(() => {
    activeClusterRef.current = activeCluster;
  }, [activeCluster]);

  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isLoopRunning = false;

    const startLoop = () => {
      if (isLoopRunning || prefersReducedMotion) return;
      isLoopRunning = true;
      animationFrameId.current = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      isLoopRunning = false;
    };

    // Truly pause rendering loop when element is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisibleRef.current = e.isIntersecting;
          if (e.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current = { x, y, active: true };

      let matched: string | null = null;
      for (const node of NODES) {
        const nx = node.normX * width;
        const ny = node.normY * height;
        if (Math.hypot(x - nx, y - ny) < (node.isHub ? 36 : 24)) {
          matched = node.id;
          break;
        }
      }
      hoveredNodeIdRef.current = matched;
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000, active: false };
      hoveredNodeIdRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      mousePosRef.current = { x, y, active: true };

      let matched: string | null = null;
      for (const node of NODES) {
        const nx = node.normX * width;
        const ny = node.normY * height;
        if (Math.hypot(x - nx, y - ny) < (node.isHub ? 36 : 24)) {
          matched = node.id;
          break;
        }
      }
      hoveredNodeIdRef.current = matched;
    };

    const handleTouchEnd = () => {
      mousePosRef.current = { x: -1000, y: -1000, active: false };
      hoveredNodeIdRef.current = null;
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (const node of NODES) {
        const nx = node.normX * width;
        const ny = node.normY * height;
        if (Math.hypot(clickX - nx, clickY - ny) < (node.isHub ? 38 : 26)) {
          onSelectSkill?.(node.name);
          setActiveCluster(node.cluster);
          break;
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    let time = 0;
    let drawProgress = 0;

    const nodeMap = new Map<string, ConstellationNode>();
    NODES.forEach((n) => nodeMap.set(n.id, n));

    const render = () => {
      if (!isVisibleRef.current) {
        isLoopRunning = false;
        return;
      }

      time += 0.012;
      if (drawProgress < 1) {
        drawProgress = Math.min(1, drawProgress + 0.015);
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Architectural Coordinate Grid Dots
      ctx.fillStyle = 'rgba(244, 239, 234, 0.035)';
      const step = isMobile ? 32 : 44;
      for (let gx = step; gx < width; gx += step) {
        for (let gy = step; gy < height; gy += step) {
          ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
        }
      }

      const activeHov = hoveredNodeIdRef.current;
      const activeClust = activeClusterRef.current;

      // 2. Draw Vector Connections between Nodes
      EDGES.forEach((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) return;

        const sx = source.normX * width;
        const sy = source.normY * height;
        const tx = target.normX * width;
        const ty = target.normY * height;

        const isHighlighted =
          activeHov === source.id ||
          activeHov === target.id ||
          activeClust === source.cluster;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        // Animate line draw progress
        const currTx = sx + (tx - sx) * drawProgress;
        const currTy = sy + (ty - sy) * drawProgress;
        ctx.lineTo(currTx, currTy);

        if (isHighlighted) {
          ctx.strokeStyle = edge.color.startsWith('#')
            ? edge.color
            : 'rgba(255, 77, 38, 0.6)';
          ctx.lineWidth = isMobile ? 1.25 : 1.75;
        } else {
          ctx.strokeStyle = edge.color.startsWith('#')
            ? `${edge.color}26`
            : 'rgba(244, 239, 234, 0.08)';
          ctx.lineWidth = 0.85;
        }
        ctx.stroke();
      });

      // 3. Draw Nodes with Dynamic Elastic Proximity Response
      NODES.forEach((node) => {
        let nx = node.normX * width;
        let ny = node.normY * height;

        // Subtle organic float
        if (!prefersReducedMotion) {
          nx += Math.sin(time + node.normX * 10) * (node.isHub ? 2.5 : 4);
          ny += Math.cos(time + node.normY * 10) * (node.isHub ? 2.5 : 4);

          // Subtle pointer repulsion / attraction
          if (mousePosRef.current.active) {
            const dx = nx - mousePosRef.current.x;
            const dy = ny - mousePosRef.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) {
              const force = (1 - dist / 120) * 12;
              nx += (dx / dist) * force;
              ny += (dy / dist) * force;
            }
          }
        }

        const isHovered = activeHov === node.id;
        const isClusterActive = activeClust === node.cluster || activeClust === 'All';

        // Outer Reticle Ring on Hubs
        if (node.isHub) {
          ctx.beginPath();
          ctx.arc(nx, ny, isHovered ? 16 : 13, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}55`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Core Node Circle
        ctx.beginPath();
        const nodeRadius = node.isHub ? (isHovered ? 7.5 : 6) : (isHovered ? 5.5 : 4);
        ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isClusterActive || isHovered ? node.color : 'rgba(168, 163, 157, 0.5)';
        ctx.fill();

        // Node Label with Architectural Background Pill
        const fontSize = node.isHub ? (isMobile ? 10 : 11) : (isMobile ? 9 : 10);
        ctx.font = `${node.isHub ? '600' : '500'} ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        const labelText = node.name;
        const textMetrics = ctx.measureText(labelText);
        const textWidth = textMetrics.width;
        const labelX = nx + nodeRadius + 6;
        const labelY = ny;

        // Label Pill
        ctx.fillStyle = isHovered ? '#141721' : 'rgba(9, 10, 14, 0.75)';
        ctx.fillRect(labelX - 3, labelY - 7, textWidth + 6, 14);

        ctx.strokeStyle = isHovered ? node.color : 'rgba(244, 239, 234, 0.12)';
        ctx.lineWidth = 0.75;
        ctx.strokeRect(labelX - 3, labelY - 7, textWidth + 6, 14);

        // Label Text
        ctx.fillStyle = isHovered || isClusterActive ? '#F4EFEA' : '#A8A39D';
        ctx.fillText(labelText, labelX, labelY);
      });

      if (!prefersReducedMotion && isVisibleRef.current) {
        animationFrameId.current = requestAnimationFrame(render);
      } else {
        isLoopRunning = false;
      }
    };

    startLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
      stopLoop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl arch-surface overflow-hidden group select-none border border-[#262A36] ${className}`}
    >
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;

          for (const node of NODES) {
            const nx = node.normX * rect.width;
            const ny = node.normY * rect.height;
            if (Math.hypot(clickX - nx, clickY - ny) < (node.isHub ? 38 : 26)) {
              onSelectSkill?.(node.name);
              setActiveCluster(node.cluster);
              break;
            }
          }
        }}
        className="block w-full h-[280px] sm:h-[340px] md:h-[400px] cursor-crosshair"
        title="Interactive Technical Topology — Hover nodes or click to inspect stack relationships"
      />

      {/* Top Topology Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tabular tracking-wider text-[#A8A39D] pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#F4EFEA] font-semibold">SKILL CONSTELLATION MAP</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#8E8B85]">TOPOLOGICAL SYSTEM CLUSTERS</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {['All', 'Systems', 'Web', 'Database'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCluster(c)}
              className={`px-2.5 sm:px-2 py-1 sm:py-0.5 min-h-[32px] sm:min-h-0 rounded text-[10px] font-mono-tabular transition-colors cursor-pointer flex items-center ${
                activeCluster === c
                  ? 'bg-[#FF4D26] text-white font-semibold'
                  : 'bg-[#141721] text-[#A8A39D] hover:text-white border border-[#262A36]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] sm:text-[10px] font-mono-tabular tracking-wider text-[#8E8B85] pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26]" />
            <span>SYSTEMS</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>RUNTIME</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>RELATIONAL</span>
          </span>
        </div>

        <span className="hidden sm:inline text-[#A8A39D]">
          [ HOVER TO DEFLECT NODES &bull; CLICK TO FILTER ]
        </span>
      </div>
    </div>
  );
};
