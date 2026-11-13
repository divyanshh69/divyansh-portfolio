import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const PALETTE = [
  'rgba(255, 77, 38, ',   // Vermilion
  'rgba(56, 189, 248, ',  // Cobalt / Cyan
  'rgba(244, 239, 234, ', // Warm bone
];

export const ParticleTrailCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isLoopRunning = useRef<boolean>(false);

  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const isTouchRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    isTouchRef.current = isTouch;
    const maxParticles = isTouch ? 14 : 32;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const startLoop = () => {
      if (isLoopRunning.current) return;
      isLoopRunning.current = true;
      render();
    };

    const addParticle = (x: number, y: number, speedX = 0, speedY = 0) => {
      const paletteBase = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const maxLife = isTouch ? 28 : 45;
      const angle = Math.random() * Math.PI * 2;
      const wander = Math.random() * 0.6;

      particlesRef.current.push({
        x,
        y,
        vx: speedX * 0.15 + Math.cos(angle) * wander,
        vy: speedY * 0.15 + Math.sin(angle) * wander,
        radius: Math.random() * 1.4 + 1.1,
        alpha: 0.85,
        life: 0,
        maxLife,
        color: paletteBase,
      });

      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.shift();
      }

      startLoop();
    };

    const addClickRipple = (x: number, y: number) => {
      const color = PALETTE[0]; // Vermilion ripple
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: isTouch ? 35 : 48,
        alpha: 0.65,
        color,
      });

      // Emit 4 micro-burst sparks
      const burstCount = isTouch ? 3 : 5;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + Math.random() * 0.4;
        const vel = Math.random() * 1.5 + 0.8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          radius: 1.5,
          alpha: 0.9,
          life: 0,
          maxLife: 32,
          color: PALETTE[i % PALETTE.length],
        });
      }

      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const last = lastPosRef.current;
      const dist = Math.hypot(x - last.x, y - last.y);

      const threshold = isTouch ? 35 : 18;
      if (dist > threshold) {
        const speedX = (x - last.x) * 0.2;
        const speedY = (y - last.y) * 0.2;
        addParticle(x, y, speedX, speedY);
        lastPosRef.current = { x, y };
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      addClickRipple(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const last = lastPosRef.current;
      const dist = Math.hypot(x - last.x, y - last.y);

      if (dist > 32) {
        addParticle(x, y, (x - last.x) * 0.1, (y - last.y) * 0.1);
        lastPosRef.current = { x, y };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          isLoopRunning.current = false;
        }
      } else if (particlesRef.current.length > 0 || ripplesRef.current.length > 0) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const ripples = ripplesRef.current;

      // Render ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.12;
        r.alpha *= 0.91;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (r.alpha < 0.02 || r.radius >= r.maxRadius - 1) {
          ripples.splice(i, 1);
        }
      }

      // Render particle trail connections (fine lines between neighbors)
      const connectDist = isTouch ? 35 : 55;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * Math.min(particles[i].alpha, particles[j].alpha) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244, 239, 234, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (0.4 + p.alpha * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0 || ripples.length > 0) {
        animationFrameId.current = requestAnimationFrame(render);
      } else {
        isLoopRunning.current = false;
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      isLoopRunning.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[15] block w-full h-full"
    />
  );
};

