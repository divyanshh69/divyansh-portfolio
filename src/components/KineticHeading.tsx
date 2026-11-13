import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { easeEditorial, isReducedMotion } from '../utils/motionVariants';

interface KineticHeadingProps {
  id?: string;
  tag?: string;
  firstLine: string;
  secondLine?: string;
  secondLineHighlight?: boolean;
  className?: string;
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  id,
  tag,
  firstLine,
  secondLine,
  secondLineHighlight = true,
  className = '',
}) => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReduced(isReducedMotion());
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const fullLabel = secondLine ? `${firstLine} ${secondLine}` : firstLine;

  const firstWords = firstLine.split(' ');
  const secondWords = secondLine ? secondLine.split(' ') : [];

  return (
    <div className={`space-y-3 ${className}`}>
      {tag && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF4D26] uppercase tracking-widest font-semibold"
        >
          <span>{tag}</span>
        </motion.div>
      )}

      <h2
        id={id}
        aria-label={fullLabel}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4EFEA] tracking-tight leading-tight select-none"
      >
        {/* Line 1 Words */}
        <span className="block">
          {firstWords.map((word, wIdx) => (
            <span
              key={`${word}-${wIdx}`}
              className="inline-block overflow-hidden pb-1.5 mr-[0.28em] align-top"
            >
              <motion.span
                initial={prefersReduced ? false : { y: '115%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  delay: wIdx * 0.05,
                  ease: easeEditorial,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>

        {/* Line 2 Words */}
        {secondLine && (
          <span className={`block pt-0.5 ${secondLineHighlight ? 'font-editorial italic font-normal text-[#FF4D26]' : ''}`}>
            {secondWords.map((word, wIdx) => (
              <span
                key={`${word}-${wIdx}`}
                className="inline-block overflow-hidden pb-2 mr-[0.28em] align-top"
              >
                <motion.span
                  initial={prefersReduced ? false : { y: '115%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + wIdx * 0.06,
                    ease: easeEditorial,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        )}
      </h2>
    </div>
  );
};

