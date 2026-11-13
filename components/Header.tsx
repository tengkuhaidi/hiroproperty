'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
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
    dialogRef.current?.close();
  }, [pathname]);

  // Keep mobileMenuOpen (used for header styling) in sync with native dialog open/close events
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => setMobileMenuOpen(false);
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  const openMobileMenu = () => {
    dialogRef.current?.showModal();
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    dialogRef.current?.close();
  };

  const navLinks = [
    { href: '/properties', label: 'Collection' },
    { href: '/properties?intent=rent', label: 'For Rent' },
    { href: '/jual', label: 'Sell with Hiro' },
    { href: '/tentang', label: 'About' },
    { href: '/articles', label: 'Journal' },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#12110E]/95 text-[#F4F1EC] backdrop-blur-md py-4 shadow-lg shadow-black/10'
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
            <a
              href="https://wa.me/6285176828199?text=Hello%20Hiro%20Property,%20I%20would%20like%20to%20connect%20with%20the%20Private%20Desk."
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all ${
                isLightHeader
                  ? 'border border-[#14130F]/20 bg-[#14130F]/5 text-[#14130F] hover:bg-[#14130F] hover:text-[#F4F1EC]'
                  : 'border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#12110E]'
              }`}
            >
              Private Desk
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={openMobileMenu}
            className={`text-xs uppercase tracking-[0.25em] transition-colors md:hidden py-2 px-3.5 border rounded-lg backdrop-blur-sm font-medium ${
              isLightHeader
                ? 'border-[#14130F]/20 bg-[#14130F]/5 text-[#14130F] hover:bg-[#14130F]/10'
                : 'border-white/20 bg-white/10 text-white hover:text-white/80'
            }`}
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer (native <dialog>: browser provides inert page, focus trap, top layer, Esc/back-gesture dismissal) */}
      <dialog
        ref={dialogRef}
        aria-label="Navigation menu"
        className="m-0 max-w-none w-full h-full max-h-none md:hidden p-0 bg-[#12110E] text-[#F4F1EC]"
      >
        <div className="flex h-full flex-col justify-between px-6 sm:px-8 pt-28 pb-10 overflow-y-auto">
          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 text-xs uppercase tracking-[0.25em] py-2 px-3.5 border border-white/20 bg-white/10 rounded-lg text-white hover:text-white/80 transition-colors"
            aria-label="Close menu"
          >
            CLOSE
          </button>
          <div className="flex flex-col gap-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6D675D] font-semibold">Navigation</p>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="font-display text-3xl sm:text-4xl hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/6285176828199?text=Hello%20Hiro%20Property,%20I%20would%20like%20to%20connect%20with%20the%20Private%20Desk."
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="font-display text-3xl sm:text-4xl text-[#A8814F] hover:text-[#D4AF37] transition-colors"
              >
                Private Desk &rarr;
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="inline-block rounded-full bg-[#F4F1EC] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12110E] hover:bg-white transition-all shadow-lg"
              >
                Inquire With Desk &rarr;
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-8 text-xs text-[#F4F1EC]/60 space-y-1">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#F4F1EC] font-semibold mb-2">Private Client Desk</p>
            <p>Senopati, Kebayoran Baru, Jakarta Selatan 12190</p>
            <p>WhatsApp: +62 851-7682-8199</p>
            <a href="mailto:private@hiroproperty.com" className="inline-block pt-1 text-xs underline text-[#A8814F]">
              private@hiroproperty.com
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
