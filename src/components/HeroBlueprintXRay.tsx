import React, { useEffect, useRef, useState } from 'react';

interface HeroBlueprintXRayProps {
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const HeroBlueprintXRay: React.FC<HeroBlueprintXRayProps> = ({
  containerRef,
  className = '',
}) => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isIntersectingRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const mediaListener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', mediaListener);

    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const container = containerRef.current;
    if (!container) return;

    // Observe intersection so pointer listeners pause when Hero is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    if (media.matches) {
      return () => {
        media.removeEventListener('change', mediaListener);
        observer.disconnect();
      };
    }

    // Direct DOM CSS variable manipulation for 60fps GPU-composited mask with 0 React re-renders
    const updateCoordinates = (clientX: number, clientY: number) => {
      if (!isIntersectingRef.current || !container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      container.style.setProperty('--xray-x', `${Math.round(x)}px`);
      container.style.setProperty('--xray-y', `${Math.round(y)}px`);
      container.style.setProperty('--xray-active', '1');
    };

    const handlePointerMove = (e: MouseEvent) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      if (!container) return;
      container.style.setProperty('--xray-active', '0');
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      if (!container) return;
      container.style.setProperty('--xray-active', '0');
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    container.addEventListener('touchstart', handleTouchMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      media.removeEventListener('change', mediaListener);
      observer.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mouseleave', handlePointerLeave);
        container.removeEventListener('touchstart', handleTouchMove);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [containerRef]);

  // Reduced motion: static subtle blueprint layer with no animated masking
  if (prefersReduced) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden opacity-10 select-none z-0 ${className}`}
      >
        <BlueprintSvgContent />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* Dynamic GPU-composited circular X-ray mask bound to pointer position */}
      <div
        style={{
          maskImage: isTouchDevice
            ? 'radial-gradient(circle 240px at var(--xray-x, 50%) var(--xray-y, 40%), black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)'
            : 'radial-gradient(circle 280px at var(--xray-x, -2000px) var(--xray-y, -2000px), black 18%, rgba(0,0,0,0.45) 58%, transparent 100%)',
          WebkitMaskImage: isTouchDevice
            ? 'radial-gradient(circle 240px at var(--xray-x, 50%) var(--xray-y, 40%), black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)'
            : 'radial-gradient(circle 280px at var(--xray-x, -2000px) var(--xray-y, -2000px), black 18%, rgba(0,0,0,0.45) 58%, transparent 100%)',
        }}
        className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-300"
      >
        <BlueprintSvgContent />
      </div>

      {/* Desktop Physical Loupe Reticle: Follows pointer via CSS transform with 0 re-renders */}
      {!isTouchDevice && (
        <div
          style={{
            transform: 'translate3d(var(--xray-x, -2000px), var(--xray-y, -2000px), 0)',
            opacity: 'var(--xray-active, 0)',
          }}
          className="absolute -top-6 -left-6 w-12 h-12 pointer-events-none transition-opacity duration-200 z-10"
        >
          {/* Outer Loupe Ring */}
          <div className="absolute inset-0 rounded-full border border-[#FF4D26]/40 shadow-[0_0_12px_rgba(255,77,38,0.25)]" />
          {/* Crosshairs */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#FF4D26]/30 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#FF4D26]/30 -translate-x-1/2" />
          {/* Center Target Dot */}
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#FF4D26] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#FF4D26]" />
          {/* Inspection Badge */}
          <div className="absolute top-8 left-6 whitespace-nowrap px-1.5 py-0.5 rounded bg-[#090A0E]/90 border border-[#262A36] text-[8.5px] font-mono-tabular text-[#38BDF8] tracking-widest">
            X-RAY // LOUPE
          </div>
        </div>
      )}
    </div>
  );
};

// Rich, authentic engineering blueprint vector schematics with responsive viewBox
const BlueprintSvgContent: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        {/* Subtle Cyan Blueprint Grid Pattern */}
        <pattern id="bp-small-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.75" />
        </pattern>
        <pattern id="bp-major-grid" width="128" height="128" patternUnits="userSpaceOnUse">
          <rect width="128" height="128" fill="url(#bp-small-grid)" />
          <path d="M 128 0 L 0 0 0 128" fill="none" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" />
          {/* Subtle intersection marks */}
          <circle cx="0" cy="0" r="2.5" fill="rgba(255, 77, 38, 0.45)" />
        </pattern>
      </defs>

      {/* Primary Blueprint Base Grid */}
      <rect width="100%" height="100%" fill="url(#bp-major-grid)" />

      {/* Top Ruler Coordinates Strip */}
      <g stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8">
        <line x1="0" y1="28" x2="1440" y2="28" />
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={`rtick-${i}`}
            x1={i * 40}
            y1={i % 4 === 0 ? "16" : "22"}
            x2={i * 40}
            y2="28"
          />
        ))}
      </g>

      {/* Left Axis Ruler */}
      <g stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8">
        <line x1="36" y1="0" x2="36" y2="900" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`ltick-${i}`}
            x1={i % 4 === 0 ? "24" : "30"}
            y1={i * 38}
            x2="36"
            y2={i * 38}
          />
        ))}
      </g>

      {/* Concentric Engineering Calibration Calipers (Center-Right composition) */}
      <g transform="translate(860, 360)">
        <circle r="70" stroke="rgba(56, 189, 248, 0.28)" strokeWidth="1" strokeDasharray="3 3" />
        <circle r="140" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" strokeDasharray="6 4" />
        <circle r="220" stroke="rgba(255, 77, 38, 0.25)" strokeWidth="1" strokeDasharray="10 5" />
        {/* Crosshair Caliper Axes */}
        <line x1="-250" y1="0" x2="250" y2="0" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
        <line x1="0" y1="-250" x2="0" y2="250" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
        {/* Diagonal markings */}
        <line x1="-150" y1="-150" x2="150" y2="150" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.7" strokeDasharray="2 4" />
        <line x1="-150" y1="150" x2="150" y2="-150" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.7" strokeDasharray="2 4" />
        <text x="145" y="-6" fill="rgba(56, 189, 248, 0.6)" fontSize="9" fontFamily="monospace">R=140px // ORBIT</text>
        <text x="225" y="-6" fill="rgba(255, 77, 38, 0.7)" fontSize="9" fontFamily="monospace">R=220px // RADIAL HORIZON</text>
        <text x="-240" y="-12" fill="rgba(56, 189, 248, 0.45)" fontSize="8.5" fontFamily="monospace">DEG: 000&deg; &bull; 090&deg; &bull; 180&deg; &bull; 270&deg;</text>
      </g>

      {/* Authentic Waveform Construction Vectors (MetroFlow libmpv audio engine) */}
      <g transform="translate(120, 520)">
        {/* Envelope Bounding Box */}
        <rect x="0" y="-45" width="500" height="90" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="0" y1="0" x2="500" y2="0" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        {/* Audio Waveform Curve with Peak Harmonics */}
        <path
          d="M 0 0 C 42 -44, 84 44, 126 0 C 168 -38, 210 38, 252 0 C 294 -30, 336 30, 378 0 C 420 -20, 462 20, 500 0"
          fill="none"
          stroke="rgba(255, 77, 38, 0.6)"
          strokeWidth="1.8"
        />
        {/* Discrete PCM Sampling Impulses */}
        {[30, 60, 90, 150, 180, 210, 270, 300, 330, 390, 420, 450, 480].map((pos, idx) => (
          <line
            key={`samp-${idx}`}
            x1={pos}
            y1="-24"
            x2={pos}
            y2="24"
            stroke="rgba(56, 189, 248, 0.28)"
            strokeWidth="0.75"
            strokeDasharray="1 2"
          />
        ))}
        <text x="0" y="-54" fill="rgba(255, 77, 38, 0.75)" fontSize="9" fontFamily="monospace" fontWeight="bold">
          [AUDIO ENGINE] CoreAudio PCM Buffer // 48000Hz 32-bit Float
        </text>
        <text x="310" y="62" fill="rgba(56, 189, 248, 0.55)" fontSize="8.5" fontFamily="monospace">
          Nyquist Limit = 24.0kHz &bull; 512 Samples
        </text>
      </g>

      {/* Relational Schema Vector Diagram (SkillSync & CampusPulse Prisma Architecture) */}
      <g transform="translate(860, 580)">
        {/* Table 1: USER */}
        <rect x="0" y="0" width="160" height="68" rx="4" fill="rgba(14, 16, 23, 0.75)" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.9" />
        <rect x="0" y="0" width="160" height="18" fill="rgba(56, 189, 248, 0.15)" />
        <text x="8" y="13" fill="#38BDF8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">ENTITY: User</text>
        <text x="8" y="32" fill="rgba(244, 239, 234, 0.6)" fontSize="8" fontFamily="monospace">id: String [PK]</text>
        <text x="8" y="46" fill="rgba(244, 239, 234, 0.6)" fontSize="8" fontFamily="monospace">email: String [UQ]</text>
        <text x="8" y="60" fill="rgba(244, 239, 234, 0.45)" fontSize="7.5" fontFamily="monospace">createdAt: DateTime</text>

        {/* Join Line with Arrow */}
        <path d="M 160 32 L 220 32" stroke="rgba(255, 77, 38, 0.6)" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="220" cy="32" r="3" fill="#FF4D26" />

        {/* Table 2: USER_SKILL (Join Table) */}
        <rect x="226" y="0" width="180" height="78" rx="4" fill="rgba(14, 16, 23, 0.75)" stroke="rgba(255, 77, 38, 0.35)" strokeWidth="0.9" />
        <rect x="226" y="0" width="180" height="18" fill="rgba(255, 77, 38, 0.15)" />
        <text x="234" y="13" fill="#FF4D26" fontSize="8.5" fontFamily="monospace" fontWeight="bold">JOIN: UserSkill</text>
        <text x="234" y="32" fill="rgba(244, 239, 234, 0.6)" fontSize="8" fontFamily="monospace">userId: String [FK]</text>
        <text x="234" y="46" fill="rgba(244, 239, 234, 0.6)" fontSize="8" fontFamily="monospace">skillId: String [FK]</text>
        <text x="234" y="60" fill="rgba(244, 239, 234, 0.6)" fontSize="8" fontFamily="monospace">readinessScore: Float</text>
        <text x="234" y="72" fill="rgba(244, 239, 234, 0.45)" fontSize="7.5" fontFamily="monospace">@@unique([user, skill])</text>
      </g>

      {/* Engineering Annotation Badges & Coordinate Ticks */}
      <g fill="rgba(56, 189, 248, 0.55)" fontSize="9" fontFamily="monospace">
        <text x="60" y="65">SYS // ARCHITECTURAL SPEC 2026.11 &bull; APPLE SILICON ARM64</text>
        <text x="60" y="80">FRAMEWORK // REACT 19 &bull; ELECTRON &bull; PRISMA ORM</text>
        <text x="60" y="95">BRIDGE // LOCALHOST PORT 8765 &bull; STRICT TYPESCRIPT</text>
      </g>
    </svg>
  );
};
