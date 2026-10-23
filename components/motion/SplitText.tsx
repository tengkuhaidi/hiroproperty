'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({
  text,
  className = '',
  delay = 0.2,
  stagger = 0.05,
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
