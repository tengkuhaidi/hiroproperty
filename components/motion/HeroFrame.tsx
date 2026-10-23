'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HeroFrameProps {
  children: React.ReactNode;
}

export default function HeroFrame({ children }: HeroFrameProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(22% 22% 22% 22% round 28px)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
      transition={{
        duration: 1.6,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="relative h-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
