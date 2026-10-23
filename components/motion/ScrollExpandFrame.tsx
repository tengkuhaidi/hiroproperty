'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollExpandFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollExpandFrame({
  children,
  className = '',
}: ScrollExpandFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(18% 24% 18% 24% round 28px)', 'inset(0% 0% 0% 0% round 0px)']
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        style={{ clipPath }}
        className="relative h-full w-full overflow-hidden"
      >
        <motion.div style={{ scale }} className="h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
