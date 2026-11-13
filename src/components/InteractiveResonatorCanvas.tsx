import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  speed: number;
  orbitRadius: number;
  accent: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
}

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const InteractiveResonatorCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const targetMouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const smoothMouseRef = useRef<{ x: number; y: number; impulse: number }>({
    x: -1000,
    y: -1000,
    impulse: 0,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(0);

  const triggerImpulse = useCallback((clientX?: number, clientY?: number) => {
    const canvas = canvasRef.current;
    let x = canvas ? canvas.clientWidth * 0.5 : 200;
    let y = canvas ? canvas.clientHeight * 0.5 : 120;

    if (clientX !== undefined && clientY !== undefined && canvas) {
      const rect = canvas.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
    }

    smoothMouseRef.current.impulse = 1.0;
    shockwavesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(canvas?.clientWidth || 400, canvas?.clientHeight || 200) * 0.9,
      intensity: 1.0,
    });

    setPulseCount((prev) => prev + 1);
  }, []);

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
    let particles: Particle[] = [];
    let dustMotes: DustMote[] = [];

    const isMobile =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 640);

    const initParticles = () => {
      particles = [];
      const count = isMobile
        ? Math.min(Math.floor(width / 44), 16)
        : Math.min(Math.floor(width / 26), 32);

      for (let i = 0; i < count; i++) {
        const x = (width / (count + 1)) * (i + 1);
        const y = height * 0.5;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1.5 + (i % 3) * 0.6,
          phase: (i * Math.PI) / (count * 0.45),
          speed: 0.014 + (i % 3) * 0.007,
          orbitRadius: 4 + (i % 4) * 2.5,
          accent: i % 4 === 0,
        });
      }

      // Ambient dust motes for atmospheric depth
      dustMotes = [];
      const dustCount = isMobile ? 8 : 18;
      for (let d = 0; d < dustCount; d++) {
        dustMotes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.3,
          size: 0.75 + Math.random() * 0.75,
          alpha: 0.15 + Math.random() * 0.25,
        });
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause rendering when element is not in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
      targetMouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.active = false;
      targetMouseRef.current.x = -1000;
      targetMouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseRef.current.x = e.touches[0].clientX - rect.left;
        targetMouseRef.current.y = e.touches[0].clientY - rect.top;
        targetMouseRef.current.active = true;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave);

    let time = 0;
    let entranceT = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      time += 0.011;

      // Deliberate power-up ease (~1.8s to fully bloom)
      if (entranceT < 1) {
        entranceT = Math.min(1, entranceT + 0.009);
      }
      const powerUp = 1 - Math.pow(1 - entranceT, 3);

      // Smooth inertia mouse tracking (viscous fluid feel)
      const targetMouse = targetMouseRef.current;
      const smoothMouse = smoothMouseRef.current;

      if (targetMouse.active) {
        smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.10;
        smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.10;
      } else {
        smoothMouse.x += (-1000 - smoothMouse.x) * 0.08;
        smoothMouse.y += (-1000 - smoothMouse.y) * 0.08;
      }
      smoothMouse.impulse *= 0.96;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Architectural Grid Reticle
      ctx.fillStyle = 'rgba(244, 239, 234, 0.04)';
      const stepX = 36;
      const stepY = 36;
      for (let x = stepX; x < width; x += stepX) {
        for (let y = stepY; y < height; y += stepY) {
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }

      // 2. Ambient Floating Dust Motes (depth layer)
      if (!prefersReducedMotion) {
        dustMotes.forEach((m) => {
          m.x += m.vx;
          m.y += m.vy;
          if (m.y < 0) {
            m.y = height;
            m.x = Math.random() * width;
          }
          if (m.x < 0) m.x = width;
          if (m.x > width) m.x = 0;

          ctx.beginPath();
          ctx.fillStyle = `rgba(244, 239, 234, ${m.alpha * powerUp * 0.45})`;
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 3. Shockwave Propagation with Deliberate Double-Ring Echelon (~2.0s propagation)
      const activeShockwaves = shockwavesRef.current;
      for (let s = activeShockwaves.length - 1; s >= 0; s--) {
        const sw = activeShockwaves[s];
        sw.radius += 3.8;
        sw.intensity *= 0.968;

        if (sw.radius > sw.maxRadius || sw.intensity < 0.015) {
          activeShockwaves.splice(s, 1);
          continue;
        }

        // Primary shockwave ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 77, 38, ${sw.intensity * 0.45})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        // Echo secondary trailing ring
        if (sw.radius > 22) {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 20), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 99, 235, ${sw.intensity * 0.3})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // 4. Multi-frequency Harmonic Waves
      const waveConfigs = [
        // Wave 0: Primary Vermilion Harmonic
        {
          color: (alpha: number) => `rgba(255, 77, 38, ${Math.min(1, alpha + smoothMouse.impulse * 0.4)})`,
          baseAmp: 22 * powerUp,
          lineWidth: 1.75,
          freq1: 0.008,
          freq2: 0.02,
          speedMult: 1.5,
          hasFill: true,
        },
        // Wave 1: Cobalt Blue Counter-Harmonic
        {
          color: (alpha: number) => `rgba(37, 99, 235, ${alpha * 0.85})`,
          baseAmp: 16 * powerUp,
          lineWidth: 1.0,
          freq1: 0.012,
          freq2: 0.028,
          speedMult: -1.1,
          hasFill: false,
        },
        // Wave 2: Architectural Translucent Bone Carrier
        {
          color: (alpha: number) => `rgba(244, 239, 234, ${alpha * 0.45})`,
          baseAmp: 26 * powerUp,
          lineWidth: 0.75,
          freq1: 0.005,
          freq2: 0.014,
          speedMult: 0.8,
          hasFill: false,
        },
      ];

      waveConfigs.forEach((cfg, wIdx) => {
        ctx.beginPath();
        const alpha = (0.24 + (2 - wIdx) * 0.12) * powerUp;
        ctx.strokeStyle = cfg.color(alpha);
        ctx.lineWidth = cfg.lineWidth;

        for (let x = 0; x <= width; x += 4) {
          // Pointer lift & repulsion
          const dx = x - smoothMouse.x;
          const mouseDist = Math.abs(dx);
          const mouseDistFactor = Math.max(0, 1 - mouseDist / 220);
          const mouseLift = targetMouse.active
            ? Math.sin((x - smoothMouse.x) * 0.025) * mouseDistFactor * 32
            : 0;

          // Shockwave perturbation
          let shockDisturbance = 0;
          for (let s = 0; s < activeShockwaves.length; s++) {
            const sw = activeShockwaves[s];
            const distFromShock = Math.abs(x - sw.x);
            const delta = Math.abs(distFromShock - sw.radius);
            if (delta < 70) {
              shockDisturbance +=
                Math.sin((distFromShock - sw.radius) * 0.1) *
                Math.exp(-delta / 35) *
                sw.intensity *
                32;
            }
          }

          const impulseLift = Math.sin((x + time * 45) * 0.035) * smoothMouse.impulse * 30;

          const y =
            height * 0.5 +
            Math.sin(x * cfg.freq1 + time * cfg.speedMult + wIdx * 1.5) * cfg.baseAmp +
            Math.cos(x * cfg.freq2 - time * 0.8) * (7 * powerUp) +
            mouseLift +
            shockDisturbance +
            impulseLift;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Elegant gradient wash under primary wave
        if (cfg.hasFill && !isMobile) {
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          const grad = ctx.createLinearGradient(0, height * 0.35, 0, height);
          grad.addColorStop(0, 'rgba(255, 77, 38, 0.045)');
          grad.addColorStop(1, 'rgba(255, 77, 38, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // 5. Nodal Particles & Dynamic Harmonic Constellation
      particles.forEach((p, idx) => {
        if (!prefersReducedMotion) {
          const waveY =
            height * 0.5 +
            Math.sin(p.baseX * 0.008 + time * 1.5) * (22 * powerUp);

          // Lissajous figure oscillation around equilibrium
          const orbitAngle = time * 1.4 + p.phase;
          p.x = p.baseX + Math.cos(orbitAngle) * p.orbitRadius;
          p.y = waveY + Math.sin(orbitAngle * 1.2) * p.orbitRadius;

          // Smooth pointer elastic reaction
          if (targetMouse.active) {
            const dx = p.x - smoothMouse.x;
            const dy = p.y - smoothMouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150 && dist > 0) {
              const pull = (1 - dist / 150) * 18;
              p.x -= (dx / dist) * pull;
              p.y -= (dy / dist) * pull;
            }
          }
        }

        // Geometric connecting vector hairlines between proximate nodes
        if (idx < particles.length - 1 && !isMobile) {
          const nextP = particles[idx + 1];
          const dist = Math.hypot(nextP.x - p.x, nextP.y - p.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(244, 239, 234, ${(1 - dist / 85) * 0.14 * powerUp})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          }
        }

        // Particle circle
        ctx.beginPath();
        ctx.fillStyle = p.accent
          ? '#FF4D26'
          : `rgba(244, 239, 234, ${0.75 * powerUp})`;
        ctx.arc(p.x, p.y, p.accent ? p.size + 1.25 : p.size, 0, Math.PI * 2);
        ctx.fill();

        // Architectural crosshair ring on accent nodes
        if (p.accent && !isMobile) {
          ctx.strokeStyle = 'rgba(255, 77, 38, 0.45)';
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl arch-surface overflow-hidden group select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onClick={(e) => triggerImpulse(e.clientX, e.clientY)}
        className="block w-full h-full cursor-crosshair"
        title="Interactive Engineering Canvas — click or move pointer to propagate harmonic shockwave"
      />

      {/* Editorial Identity & Telemetry Block (Priority 2) */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-[10px] font-mono-tabular tracking-wider text-[#A8A39D] pointer-events-none">
        {/* Primary & Secondary Editorial Telemetry */}
        <div className="space-y-0.5 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26] animate-pulse" aria-hidden="true" />
            <span className="text-[#F4EFEA] font-semibold text-[11px] tracking-wide">
              ENGINEERING / INDORE, INDIA
            </span>
          </div>
          <div className="text-[10px] text-[#A8A39D] pl-3.5 tracking-normal">
            B.Tech Computer Science Engineering
          </div>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-[9px] text-[#8E8B85]">CANVAS ACTIVE</span>
          <span className="px-2 py-0.5 rounded bg-[#141721]/80 backdrop-blur-xs text-[#F4EFEA] border border-[#262A36] text-[10px]">
            {pulseCount > 0 ? `SHOCKWAVE x${pulseCount}` : 'LIVE HARMONIC'}
          </span>
        </div>
      </div>

      {/* Bottom Editorial Details & Action */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tabular tracking-wider text-[#8E8B85] pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[#D6CFC7]">INDEPENDENT SOFTWARE PROJECTS</span>
          <span className="opacity-40 hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline text-[#A8A39D]">FULL-STACK &amp; DESKTOP</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerImpulse();
          }}
          className="font-mono-tabular text-[10px] font-medium text-[#A8A39D] hover:text-[#FF4D26] transition-colors pointer-events-auto cursor-pointer focus-visible:outline-none bg-[#090A0E]/70 backdrop-blur-xs px-2.5 py-1 rounded border border-[#262A36]"
        >
          [ CLICK TO PERTURB ]
        </button>
      </div>
    </div>
  );
};
