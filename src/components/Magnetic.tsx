import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { isReducedMotion, SPRING } from '../utils/motionVariants';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default: 0.3)
  radius?: number;   // Activation radius in px (default: 70)
  maxOffset?: number; // Clamped max offset in px (default: 10)
  className?: string;
  disabled?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.3,
  radius = 70,
  maxOffset = 10,
  className = '',
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = SPRING.magnetic;
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReduced(isReducedMotion());
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReduced || isTouchDevice) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      // Calculate bounded magnetic pull
      const clampedX = Math.max(-maxOffset, Math.min(maxOffset, distanceX * strength));
      const clampedY = Math.max(-maxOffset, Math.min(maxOffset, distanceY * strength));
      x.set(clampedX);
      y.set(clampedY);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (disabled || prefersReduced) return;
    x.set(0);
    y.set(0);
  };

  if (disabled || prefersReduced) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={isTouchDevice ? { scale: 0.96 } : undefined}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

