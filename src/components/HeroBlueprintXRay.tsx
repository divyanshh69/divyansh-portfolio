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

    // Observe intersection so mousemove listeners pause when Hero is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    if (touch || media.matches) {
      return () => {
        media.removeEventListener('change', mediaListener);
        observer.disconnect();
      };
    }

    // Direct DOM CSS variable manipulation for 60fps GPU-composited mask with 0 React re-renders
    const handlePointerMove = (e: MouseEvent) => {
      if (!isIntersectingRef.current || !container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--xray-x', `${Math.round(x)}px`);
      container.style.setProperty('--xray-y', `${Math.round(y)}px`);
      container.style.setProperty('--xray-active', '1');
    };

    const handlePointerLeave = () => {
      if (!container) return;
      container.style.setProperty('--xray-x', '-2000px');
      container.style.setProperty('--xray-y', '-2000px');
      container.style.setProperty('--xray-active', '0');
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      media.removeEventListener('change', mediaListener);
      observer.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, [containerRef]);

  // Reduced motion: static subtle blueprint layer without dynamic cursor masking
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

  // Touch devices: gentle static centered ambient blueprint layer
  if (isTouchDevice) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08] select-none z-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] ${className}`}
      >
        <BlueprintSvgContent />
      </div>
    );
  }

  // Desktop: Dynamic GPU-composited circular X-ray mask bound to cursor position
  return (
    <div
      aria-hidden="true"
      style={{
        maskImage:
          'radial-gradient(circle 280px at var(--xray-x, -2000px) var(--xray-y, -2000px), black 15%, rgba(0,0,0,0.45) 55%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(circle 280px at var(--xray-x, -2000px) var(--xray-y, -2000px), black 15%, rgba(0,0,0,0.45) 55%, transparent 100%)',
      }}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 opacity-85 transition-opacity duration-300 ${className}`}
    >
      <BlueprintSvgContent />
    </div>
  );
};

// Rich, authentic engineering blueprint vector schematics
const BlueprintSvgContent: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="none"
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
        <line x1="0" y1="24" x2="100%" y2="24" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`rtick-${i}`}
            x1={`${(i / 24) * 100}%`}
            y1="18"
            x2={`${(i / 24) * 100}%`}
            y2="24"
          />
        ))}
      </g>

      {/* Left Axis Ruler */}
      <g stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8">
        <line x1="36" y1="0" x2="36" y2="100%" />
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`ltick-${i}`}
            x1="30"
            y1={`${(i / 16) * 100}%`}
            x2="36"
            y2={`${(i / 16) * 100}%`}
          />
        ))}
      </g>

      {/* Concentric Engineering Calibration Calipers (Center-Right composition) */}
      <g transform="translate(780, 290)">
        <circle r="70" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
        <circle r="140" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="6 4" />
        <circle r="220" stroke="rgba(255, 77, 38, 0.22)" strokeWidth="1" strokeDasharray="10 5" />
        {/* Crosshair Caliper Axes */}
        <line x1="-250" y1="0" x2="250" y2="0" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        <line x1="0" y1="-250" x2="0" y2="250" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        {/* Angular markings */}
        <line x1="-120" y1="-120" x2="120" y2="120" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.7" strokeDasharray="2 4" />
        <line x1="-120" y1="120" x2="120" y2="-120" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.7" strokeDasharray="2 4" />
        <text x="145" y="-6" fill="rgba(56, 189, 248, 0.45)" fontSize="9" fontFamily="monospace">R=140px // ORBIT</text>
        <text x="225" y="-6" fill="rgba(255, 77, 38, 0.55)" fontSize="9" fontFamily="monospace">R=220px // RADIAL HORIZON</text>
      </g>

      {/* Authentic Waveform Construction Vectors (MetroFlow libmpv audio engine) */}
      <g transform="translate(140, 460)">
        {/* Envelope Bounding Box */}
        <rect x="0" y="-45" width="480" height="90" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="0" y1="0" x2="480" y2="0" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        {/* Audio Waveform Curve with Peak Harmonics */}
        <path
          d="M 0 0 C 40 -40, 80 40, 120 0 C 160 -36, 200 36, 240 0 C 280 -28, 320 28, 360 0 C 400 -18, 440 18, 480 0"
          fill="none"
          stroke="rgba(255, 77, 38, 0.5)"
          strokeWidth="1.8"
        />
        {/* Discrete PCM Sampling Impulses */}
        {[30, 60, 90, 150, 180, 210, 270, 300, 330, 390, 420, 450].map((pos, idx) => (
          <line
            key={`samp-${idx}`}
            x1={pos}
            y1="-22"
            x2={pos}
            y2="22"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="0.75"
            strokeDasharray="1 2"
          />
        ))}
        <text x="0" y="-52" fill="rgba(255, 77, 38, 0.65)" fontSize="9" fontFamily="monospace" fontWeight="bold">
          [AUDIO ENGINE] CoreAudio PCM Buffer // 48000Hz 32-bit Float
        </text>
        <text x="320" y="60" fill="rgba(56, 189, 248, 0.45)" fontSize="8.5" fontFamily="monospace">
          Nyquist Limit = 24.0kHz &bull; 512 Samples
        </text>
      </g>

      {/* Relational Schema Vector Diagram (SkillSync & CampusPulse Prisma Architecture) */}
      <g transform="translate(820, 490)">
        {/* Table 1: USER */}
        <rect x="0" y="0" width="150" height="64" rx="4" fill="rgba(14, 16, 23, 0.6)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.9" />
        <rect x="0" y="0" width="150" height="18" fill="rgba(56, 189, 248, 0.12)" />
        <text x="8" y="13" fill="#38BDF8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">ENTITY: User</text>
        <text x="8" y="32" fill="rgba(244, 239, 234, 0.5)" fontSize="8" fontFamily="monospace">id: String [PK]</text>
        <text x="8" y="46" fill="rgba(244, 239, 234, 0.5)" fontSize="8" fontFamily="monospace">email: String [UQ]</text>

        {/* Join Line with Arrow */}
        <path d="M 150 32 L 210 32" stroke="rgba(255, 77, 38, 0.5)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="210" cy="32" r="3" fill="#FF4D26" />

        {/* Table 2: USER_SKILL (Join Table) */}
        <rect x="216" y="0" width="170" height="74" rx="4" fill="rgba(14, 16, 23, 0.6)" stroke="rgba(255, 77, 38, 0.3)" strokeWidth="0.9" />
        <rect x="216" y="0" width="170" height="18" fill="rgba(255, 77, 38, 0.12)" />
        <text x="224" y="13" fill="#FF4D26" fontSize="8.5" fontFamily="monospace" fontWeight="bold">JOIN: UserSkill</text>
        <text x="224" y="32" fill="rgba(244, 239, 234, 0.5)" fontSize="8" fontFamily="monospace">userId: String [FK]</text>
        <text x="224" y="46" fill="rgba(244, 239, 234, 0.5)" fontSize="8" fontFamily="monospace">skillId: String [FK]</text>
        <text x="224" y="60" fill="rgba(244, 239, 234, 0.5)" fontSize="8" fontFamily="monospace">@@unique([user, skill])</text>
      </g>

      {/* Engineering Annotation Badges & Coordinate Ticks */}
      <g fill="rgba(56, 189, 248, 0.45)" fontSize="9" fontFamily="monospace">
        <text x="60" y="55">SYS // SPEC 2026.11 &bull; APPLE SILICON ARM64</text>
        <text x="60" y="70">FRAMEWORK // REACT 19 &bull; ELECTRON &bull; PRISMA ORM</text>
        <text x="60" y="85">LOCAL BRIDGE // PORT 8765 &bull; STRICT TYPESCRIPT</text>
      </g>
    </svg>
  );
};
