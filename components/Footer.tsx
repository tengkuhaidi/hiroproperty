import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#12110E] text-[#F4F1EC]">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 md:grid-cols-4 md:px-12">
        {/* Brand Col */}
        <div className="md:col-span-2">
          <Link href="/" className="font-display text-3xl tracking-tight text-white inline-block mb-4">
            Hiro <span className="italic">Property</span>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-[#F4F1EC]/60">
            Private-client real estate advisory for exceptional homes across Jakarta, Bali, and premier international destinations.
          </p>
        </div>

        {/* Explore Links */}
        <div className="text-sm leading-7 text-[#F4F1EC]/60">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#F4F1EC]">Explore</p>
          <ul className="space-y-2">
            <li>
              <Link href="/properties" className="hover:text-white transition-colors">
                All properties
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Office Contact */}
        <div className="text-sm leading-7 text-[#F4F1EC]/60">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#F4F1EC]">Office</p>
          <p>Senopati, Kebayoran Baru</p>
          <p>Jakarta Selatan 12190</p>
          <p className="mt-2">
            <a href="mailto:private@hiroproperty.com" className="text-[#A8814F] hover:text-white transition-colors">
              private@hiroproperty.com
            </a>
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto max-w-[1600px] border-t border-[#F4F1EC]/10 px-6 py-6 text-xs text-[#F4F1EC]/50 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Hiro Property. All rights reserved.</p>
        <p className="tracking-widest uppercase text-[10px] text-[#6D675D]">PT Hiro Properti Indonesia</p>
      </div>
    </footer>
  );
}
