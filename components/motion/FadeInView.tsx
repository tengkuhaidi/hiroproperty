import React from 'react';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reveals children on scroll using native CSS scroll-driven animation
 * (animation-timeline: view()) - zero JS, runs on the compositor thread.
 * No fallback for browsers without support: the reveal is purely decorative,
 * so content is simply visible immediately there (progressive enhancement).
 */
export default function FadeInView({ children, delay = 0, className = '' }: FadeInViewProps) {
  return (
    <div
      className={`reveal-on-scroll ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
