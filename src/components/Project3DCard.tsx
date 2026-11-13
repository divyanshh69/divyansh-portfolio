import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { isReducedMotion, SPRING } from '../utils/motionVariants';

interface Project3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default: 6)
  borderAccent?: string; // hex border accent
}

export const Project3DCard: React.FC<Project3DCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  borderAccent = '#FF4D26',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coords (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = SPRING.card3D;
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springMouseY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springMouseX, [-1, 1], [-maxTilt, maxTilt]);

  // Specular sheen highlight coordinates
  const glareX = useTransform(springMouseX, [-1, 1], ['0%', '100%']);
  const glareY = useTransform(springMouseY, [-1, 1], ['0%', '100%']);

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
    if (prefersReduced || isTouchDevice) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = (e.clientX - rect.left) / width; // 0 to 1
    const y = (e.clientY - rect.top) / height; // 0 to 1

    mouseX.set(x * 2 - 1); // -1 to 1
    mouseY.set(y * 2 - 1); // -1 to 1
  };

  const handleMouseEnter = () => {
    if (prefersReduced || isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (prefersReduced || isTouchDevice) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (prefersReduced || isTouchDevice) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative will-change-transform transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic Specular Sheen (Subtle light reflection moving across surface) */}
        <motion.div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 350px at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.06), transparent 70%)`,
          }}
          className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Micro-glow corner accent */}
        <div
          aria-hidden="true"
          style={{
            borderColor: isHovered ? `${borderAccent}40` : 'transparent',
          }}
          className="pointer-events-none absolute inset-0 rounded-3xl border transition-colors duration-300 z-20"
        />
      </motion.div>
    </div>
  );
};

