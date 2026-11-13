'use client';

import React, { useState, useEffect } from 'react';

interface MobileFloatingCTAProps {
  title: string;
  price: string;
  location: string;
  code?: string;
}

export default function MobileFloatingCTA({ title, price, location, code }: MobileFloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const waMsg = `Selamat siang Hiro Property, saya tertarik dengan ${code || 'HP-001'}, ${title} (${location}). Mohon info jadwal kunjungan pribadi.`;
  const waLink = `https://wa.me/6285176828199?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#090A0B]/95 backdrop-blur-md border-t border-white/10 px-6 py-3.5 shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[10px] uppercase tracking-widest text-[#A8814F] block font-mono">Asking Price</span>
          <p className="font-display text-lg text-white font-normal truncate">{price}</p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#090A0B] hover:bg-[#F5D485] transition-colors"
        >
          <span>Inquire Desk</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
