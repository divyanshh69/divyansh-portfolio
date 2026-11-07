import React, { useRef, useState, useCallback, useEffect } from 'react';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  spotlight?: boolean;
  spotlightColor?: string;
  onClick?: () => void;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = '',
  maxTilt = 5,
  spotlight = true,
  spotlightColor = 'rgba(37, 99, 235, 0.12)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.08s ease-out',
      });

      if (spotlight) {
        setSpotlightPos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 1,
        });
      }
    },
    [isReduced, maxTilt, spotlight]
  );

  const handleMouseLeave = useCallback(() => {
    if (isReduced) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  }, [isReduced]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative will-change-transform ${className}`}
    >
      {spotlight && !isReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

