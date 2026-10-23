'use client';

import React from 'react';
import { motion } from 'motion/react';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export default function FadeInView({
  children,
  delay = 0,
  duration = 0.7,
  y = 20,
  className = '',
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
