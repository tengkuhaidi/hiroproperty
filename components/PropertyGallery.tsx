'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  title: string;
  image: string;
  gallery: string[];
  video?: string;
}

export default function PropertyGallery({ title, image, gallery, video }: PropertyGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const allImages = gallery && gallery.length > 0 ? gallery : [image];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, offsetWidth } = mobileScrollRef.current;
    if (offsetWidth > 0) {
      const idx = Math.round(scrollLeft / offsetWidth);
      setMobileIndex(Math.min(Math.max(idx, 0), allImages.length - 1));
    }
  };

  // Arrow key navigation only; Esc, focus trap and scroll lock are native to <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };
    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length]);

  return (
    <>
      {/* 1. MOBILE VIEW (< md): The Modern House / Inigo Full-Bleed Swipe Carousel */}
      <div className="md:hidden relative -mx-6 sm:-mx-12 mb-10 overflow-hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain'
          }}
        >
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative w-full flex-shrink-0 aspect-[4/5] bg-[#14130F]/5 snap-center cursor-pointer"
              style={{ scrollSnapStop: 'always' }}
            >
              <Image
                src={img}
                alt={`${title} frame ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover pointer-events-none select-none"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Quiet Minimal Floating Counter (The Modern House signature) */}
        <div className="absolute bottom-4 right-5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#090A0B]/80 backdrop-blur-sm px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase text-white border border-white/10 shadow-sm">
            <span>{String(mobileIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{String(allImages.length).padStart(2, '0')}</span>
          </span>
        </div>

        {/* Fullscreen Expand Button */}
        <button
          type="button"
          onClick={() => openLightbox(mobileIndex)}
          className="absolute bottom-4 left-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#090A0B]/75 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-wider text-white/90 border border-white/10"
        >
          <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>Fullscreen</span>
        </button>
      </div>

      {/* 2. DESKTOP VIEW (>= md): Pure Architectural 1-Hero + 2-Detail Grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-12 mb-16 relative">
        {/* Main Hero Shot */}
        <div
          onClick={() => openLightbox(0)}
          className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#14130F]/5 md:col-span-8 cursor-pointer group"
        >
          <Image
            src={allImages[0] || image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02]"
            sizes="66vw"
          />
          <div className="absolute inset-0 bg-[#090A0B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#090A0B]/80 backdrop-blur-md px-4 py-2 text-xs font-medium tracking-wide text-white border border-white/10">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Expand View
            </span>
          </div>
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(0);
              }}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-[#090A0B]/85 backdrop-blur-md px-3.5 py-2 text-xs font-medium tracking-wide text-white border border-white/15 hover:bg-[#090A0B] transition-all"
            >
              <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>View Gallery ({allImages.length})</span>
            </button>
          )}
        </div>

        {/* Secondary Stack */}
        <div className="grid gap-4 md:gap-6 md:col-span-4">
          {allImages.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-xl bg-[#14130F]/5 cursor-pointer group"
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02]"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-[#090A0B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Property Walkthrough Video */}
      {video && (
        <div className="mb-16 rounded-xl overflow-hidden bg-[#14130F]/5">
          <video
            src={video}
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video"
          />
        </div>
      )}

      {/* 3. FULLSCREEN LIGHTBOX MODAL (native <dialog>: browser provides inert page, focus trap, top layer, Esc/back-gesture dismissal) */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-label={`${title} photo gallery`}
        className="m-0 max-w-none w-full h-full max-h-none bg-[#090A0B]/95 backdrop-blur-md p-4 sm:p-8 open:flex open:items-center open:justify-center"
      >
        {/* Top Controls */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between text-white z-10">
          <span className="text-xs tracking-widest uppercase font-mono text-[#D4AF37]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')} · {title}
          </span>
          <button
            type="button"
            onClick={closeLightbox}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current Active Image */}
        <div className="relative w-full max-w-5xl max-h-[80vh] h-[75vh] flex items-center justify-center">
          <Image
            src={allImages[currentIndex]}
            alt={`${title} fullscreen frame ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Prev / Next Controls */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Bottom Thumbnails Strip */}
        <div className="absolute bottom-4 inset-x-4 flex justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {allImages.map((img, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded border transition-all ${
                currentIndex === idx ? 'border-[#D4AF37] opacity-100' : 'border-white/10 opacity-40 hover:opacity-80'
              }`}
            >
              <Image src={img} alt={`thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
}
