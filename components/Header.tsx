'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detail / Catalog pages start with a light cream background (#F4F1EC)
  // whereas Homepage starts with a dark hero photo.
  // When mobile menu is OPEN, background is always dark (#12110E), so header must be white.
  const isDarkPage = pathname === '/';
  const isLightHeader = !isDarkPage && !scrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/properties', label: 'Properties' },
    { href: '/#services', label: 'Services' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#12110E]/95 text-[#F4F1EC] backdrop-blur-xl py-4 shadow-lg shadow-black/10'
            : isLightHeader
            ? 'bg-transparent text-[#14130F] py-6'
            : 'bg-transparent text-[#F4F1EC] py-6'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className={`font-display text-3xl tracking-tight transition-opacity hover:opacity-80 ${
              isLightHeader ? 'text-[#14130F]' : 'text-white'
            }`}
          >
            Hiro <span className="italic font-normal">Property</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-12 text-sm font-medium tracking-wide md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative transition-colors ${
                  isLightHeader
                    ? 'text-[#14130F]/80 hover:text-[#14130F]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    isLightHeader ? 'bg-[#14130F]' : 'bg-white'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/#contact"
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all ${
                isLightHeader
                  ? 'border border-[#14130F]/20 bg-[#14130F]/5 text-[#14130F] hover:bg-[#14130F] hover:text-[#F4F1EC]'
                  : 'border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#12110E]'
              }`}
            >
              Inquire
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`text-xs uppercase tracking-[0.25em] transition-colors md:hidden py-2 px-3.5 border rounded-lg backdrop-blur-sm font-medium ${
              isLightHeader
                ? 'border-[#14130F]/20 bg-[#14130F]/5 text-[#14130F] hover:bg-[#14130F]/10'
                : 'border-white/20 bg-white/10 text-white hover:text-white/80'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-[#12110E] px-6 sm:px-8 pt-28 pb-10 text-[#F4F1EC] md:hidden overflow-y-auto">
          <div className="flex flex-col gap-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6D675D] font-semibold">Navigation</p>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl text-[#F4F1EC] transition-colors hover:text-[#A8814F]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block rounded-full bg-[#F4F1EC] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12110E] hover:bg-white transition-all shadow-lg"
              >
                Inquire With Desk &rarr;
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-8 text-xs text-[#F4F1EC]/60 space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#F4F1EC] font-semibold mb-2">Private Client Desk</p>
            <p>Senopati, Kebayoran Baru, Jakarta Selatan 12190</p>
            <p>WhatsApp: +62 878-2517-4624</p>
            <a href="mailto:private@hiroproperty.com" className="inline-block pt-1 text-xs underline text-[#A8814F]">
              private@hiroproperty.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
