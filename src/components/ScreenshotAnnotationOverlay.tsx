import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenshotAnnotation } from '../data/portfolioData';
import { easeEditorial } from '../utils/motionVariants';
import { Eye, EyeOff, Layers } from 'lucide-react';

interface ScreenshotAnnotationOverlayProps {
  annotations?: ScreenshotAnnotation[];
  projectName: string;
  className?: string;
}

export const ScreenshotAnnotationOverlay: React.FC<ScreenshotAnnotationOverlayProps> = ({
  annotations,
  projectName,
  className = '',
}) => {
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const mediaListener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', mediaListener);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      media.removeEventListener('change', mediaListener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reset active pin on annotation changes
  useEffect(() => {
    if (annotations && annotations.length > 0) {
      setActivePinId(annotations[0].id);
    } else {
      setActivePinId(null);
    }
  }, [annotations]);

  if (!annotations || annotations.length === 0) return null;

  const currentActiveAnnotation =
    annotations.find((a) => a.id === activePinId) || annotations[0];

  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-20 ${className}`}>
      {/* Top Toggle Control Button */}
      <div className="absolute top-3 right-3 pointer-events-auto z-30">
        <button
          type="button"
          onClick={() => setShowAnnotations((prev) => !prev)}
          aria-label={showAnnotations ? 'Hide screenshot feature annotations' : 'Show screenshot feature annotations'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono-tabular transition-all cursor-pointer backdrop-blur-md border ${
            showAnnotations
              ? 'bg-[#090A0E]/90 text-[#F4EFEA] border-[#FF4D26]/40 shadow-lg'
              : 'bg-[#090A0E]/75 text-[#8E8B85] border-[#262A36] hover:text-[#F4EFEA]'
          }`}
          title="Toggle architectural feature annotations"
        >
          {showAnnotations ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[#FF4D26]" />
              <span>ANNOTATIONS [{annotations.length}]</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-[#8E8B85]" />
              <span>SHOW ANNOTATIONS</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showAnnotations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {/* Desktop Full Architectural Leader Lines & Pins */}
            {!isMobile && (
              <>
                {/* SVG Canvas with normalized 0-100 coordinate space for W3C-compliant path drawing */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="leader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4D26" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>

                  {annotations.map((ann) => {
                    const isSelected = ann.id === currentActiveAnnotation?.id;
                    const dir = ann.leaderDirection || 'bottom-right';

                    // Compute vector leader elbow points in normalized 0-100 viewBox space
                    const dx = dir.includes('right') ? 5 : -5;
                    const dy = dir.includes('bottom') ? 4 : -4;
                    const elbowX = ann.xPercent + dx;
                    const elbowY = ann.yPercent + dy;
                    const endX = dir.includes('right') ? elbowX + 4 : elbowX - 4;
                    const endY = elbowY;

                    return (
                      <g key={`leader-${ann.id}`}>
                        {/* Architectural Leader Line Path */}
                        <motion.path
                          d={`M ${ann.xPercent} ${ann.yPercent} L ${elbowX} ${elbowY} L ${endX} ${endY}`}
                          fill="none"
                          stroke={isSelected ? 'url(#leader-grad)' : 'rgba(142, 139, 133, 0.45)'}
                          strokeWidth={isSelected ? 1.8 : 1.1}
                          strokeDasharray={isSelected ? 'none' : '3 3'}
                          vectorEffect="non-scaling-stroke"
                          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.65, delay: ann.number * 0.12, ease: easeEditorial }}
                        />

                        {/* Pin Anchor Dot */}
                        <circle
                          cx={ann.xPercent}
                          cy={ann.yPercent}
                          r={isSelected ? 1.6 : 1.1}
                          fill={isSelected ? '#FF4D26' : '#8E8B85'}
                          vectorEffect="non-scaling-stroke"
                          className="transition-all"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Interactive Pins & Cards */}
                {annotations.map((ann) => {
                  const isSelected = ann.id === currentActiveAnnotation?.id;
                  const isRightSide = ann.xPercent > 55;
                  const isBottomSide = ann.yPercent > 55;

                  // Intelligent bounds clamping prevents overflow off the screenshot viewport
                  const cardOffsetClass = `${isBottomSide ? 'bottom-8' : 'top-8'} ${isRightSide ? 'right-4' : 'left-4'}`;

                  return (
                    <div
                      key={ann.id}
                      style={{
                        left: `${ann.xPercent}%`,
                        top: `${ann.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      {/* Numbered Pin Button */}
                      <button
                        type="button"
                        onClick={() => setActivePinId(ann.id)}
                        onMouseEnter={() => setActivePinId(ann.id)}
                        aria-label={`Feature 0${ann.number}: ${ann.label}`}
                        aria-expanded={isSelected}
                        className={`relative group flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-mono-tabular font-bold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FF4D26] text-white ring-4 ring-[#FF4D26]/30 shadow-[0_0_16px_rgba(255,77,38,0.7)] scale-110 z-30'
                            : 'bg-[#090A0E] text-[#F4EFEA] border border-[#38BDF8]/60 hover:border-[#FF4D26] hover:scale-105 z-20'
                        }`}
                      >
                        {isSelected && !prefersReduced && (
                          <span className="absolute -inset-1 rounded-full bg-[#FF4D26]/20 animate-ping pointer-events-none" />
                        )}
                        <span>0{ann.number}</span>
                      </button>

                      {/* Desktop Callout Detail Card */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={prefersReduced ? false : { opacity: 0, scale: 0.95, y: isBottomSide ? -4 : 4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: easeEditorial }}
                            className={`absolute ${cardOffsetClass} w-64 p-3.5 rounded-xl bg-[#090A0E]/95 border border-[#262A36] text-[#F4EFEA] shadow-2xl backdrop-blur-md pointer-events-auto z-40 space-y-1.5`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono-tabular border-b border-[#262A36] pb-1.5">
                              <span className="text-[#FF4D26] font-bold">
                                FEATURE 0{ann.number} //
                              </span>
                              <span className="text-[#8E8B85] uppercase tracking-wider text-[9px] truncate max-w-[120px]">
                                {projectName}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-[#F4EFEA] tracking-tight">
                              {ann.label}
                            </h4>

                            <p className="text-[11px] text-[#D6CFC7] leading-relaxed">
                              {ann.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </>
            )}

            {/* Mobile View: Compact Touch Pins + Docked Bottom Telemetry Drawer */}
            {isMobile && (
              <>
                {/* Mobile Touch Pins on Screenshot */}
                {annotations.map((ann) => {
                  const isSelected = ann.id === currentActiveAnnotation?.id;
                  return (
                    <button
                      key={`mob-pin-${ann.id}`}
                      type="button"
                      onClick={() => setActivePinId(ann.id)}
                      style={{
                        left: `${ann.xPercent}%`,
                        top: `${ann.yPercent}%`,
                      }}
                      aria-label={`Select feature 0${ann.number}: ${ann.label}`}
                      aria-pressed={isSelected}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono-tabular font-bold shadow-lg transition-transform ${
                        isSelected
                          ? 'bg-[#FF4D26] text-white ring-4 ring-[#FF4D26]/40 scale-110 z-30'
                          : 'bg-[#090A0E]/90 text-[#F4EFEA] border border-[#38BDF8]/60 z-20'
                      }`}
                    >
                      <span>0{ann.number}</span>
                    </button>
                  );
                })}

                {/* Mobile Docked Annotation Drawer at bottom of frame */}
                {currentActiveAnnotation && (
                  <motion.div
                    key={`mob-card-${currentActiveAnnotation.id}`}
                    initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-2 inset-x-2 p-3 rounded-xl bg-[#090A0E]/95 border border-[#FF4D26]/40 shadow-2xl backdrop-blur-md pointer-events-auto z-40 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#FF4D26] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#FF4D26]" />
                        <span>FEATURE 0{currentActiveAnnotation.number} // {currentActiveAnnotation.label}</span>
                      </span>
                      <span className="text-[#8E8B85] text-[9px]">TAP PIN TO SWITCH</span>
                    </div>
                    <p className="text-[11px] text-[#D6CFC7] leading-snug">
                      {currentActiveAnnotation.description}
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
