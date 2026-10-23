'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
            ? 'bg-[#12110E]/90 text-[#F4F1EC] backdrop-blur-xl py-4 shadow-lg shadow-black/10'
            : 'bg-transparent text-[#F4F1EC] py-6'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="font-display text-3xl tracking-tight text-white hover:opacity-90 transition-opacity">
            Hiro <span className="italic font-normal">Property</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-12 text-sm font-medium tracking-wide md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-white/90 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/#contact"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#12110E]"
            >
              Inquire
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-xs uppercase tracking-[0.25em] text-white hover:text-white/80 transition-colors md:hidden py-2 px-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-[#12110E] px-8 pt-32 pb-12 text-[#F4F1EC] md:hidden animate-fade-in">
          <div className="flex flex-col gap-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6D675D]">Navigation</p>
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

          <div className="border-t border-[#14130F]/30 pt-8 text-sm text-[#F4F1EC]/60">
            <p className="text-xs uppercase tracking-[0.25em] text-[#F4F1EC] mb-2">Office</p>
            <p>Senopati, Kebayoran Baru</p>
            <p>Jakarta Selatan 12190</p>
            <a href="mailto:private@hiroproperty.com" className="mt-4 block text-xs underline text-[#A8814F]">
              private@hiroproperty.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
