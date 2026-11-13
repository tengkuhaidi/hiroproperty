'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalFloatingWA() {
  const pathname = usePathname();
  const waUrl = 'https://wa.me/6285176828199?text=Hello%20Hiro%20Property,%20I%20would%20like%20to%20inquire%20about%20your%20curated%20property%20portfolio.';

  // Check if current page is property detail (e.g. /properties/xyz)
  const isPropertyDetail = pathname?.startsWith('/properties/') && pathname !== '/properties';

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed bottom-6 right-6 z-50 flex items-center md:bottom-6 md:right-8 ${
        isPropertyDetail ? 'hidden md:flex' : 'flex'
      }`}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hiro Property on WhatsApp"
        className="group relative flex items-center gap-3 rounded-full bg-[#12110E] p-3 text-[#F4F1EC] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.03] hover:ring-[#A8814F]/50 md:py-2.5 md:pl-4 md:pr-4"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-transform duration-300 group-hover:scale-110">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29" />
          </svg>
        </span>

        <span className="hidden flex-col items-start leading-none md:flex">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#6D675D]">
            Private Desk
          </span>
          <span className="mt-1 font-mono text-xs tracking-wider text-[#F4F1EC]">
            0851-7682-8199
          </span>
        </span>
      </a>
    </aside>
  );
}
