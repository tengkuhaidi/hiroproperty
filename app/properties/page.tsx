'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';

function CatalogContent() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const types = ['All', 'Villa', 'House', 'Penthouse', 'Apartment', 'Estate'];
  const priceRanges = ['All', 'Under $5M', '$5M - $10M', '$10M+'];

  const filtered = PROPERTIES.filter((p) => {
    if (selectedType !== 'All' && p.category !== selectedType) return false;
    if (selectedPrice === 'Under $5M' && p.priceNumeric >= 5000000) return false;
    if (selectedPrice === '$5M - $10M' && (p.priceNumeric < 5000000 || p.priceNumeric > 10000000)) return false;
    if (selectedPrice === '$10M+' && p.priceNumeric < 10000000) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const match =
        p.title.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] mb-3 font-semibold">The Collection</p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-none text-[#14130F]">
            Find your <span className="italic">address</span>.
          </h1>
          <p className="mt-4 text-sm text-[#6D675D] max-w-xl">
            A curated portfolio of architectural estates, villas, and penthouses. Filter by category or explore the entire collection below.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#14130F]/15 pb-6">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  selectedType === t
                    ? 'bg-[#12110E] text-white shadow-md'
                    : 'bg-white/60 text-[#14130F] hover:bg-white border border-[#14130F]/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6D675D] uppercase tracking-wider">Price:</span>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="rounded-lg border border-[#14130F]/20 bg-white px-3 py-1.5 text-xs text-[#14130F] focus:outline-none"
            >
              {priceRanges.map((pr) => (
                <option key={pr} value={pr}>{pr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prop) => (
            <Link
              key={prop.id}
              href={`/properties/${prop.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5 shadow-md">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {prop.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-[#12110E]/85 backdrop-blur-md px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-white border border-white/10">
                    {prop.tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl text-[#14130F] group-hover:text-[#A8814F] transition-colors">
                    {prop.title}
                  </h2>
                  <p className="text-xs text-[#6D675D] mt-0.5 tracking-wide">
                    {prop.location} · {prop.bedrooms} Beds · {prop.bathrooms} Baths · {prop.areaSqFt} sq ft
                  </p>
                </div>
                <p className="font-display text-xl font-normal text-[#14130F] whitespace-nowrap">
                  {prop.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-[#14130F]">No residences found matching your criteria.</p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedPrice('All'); setSearchTerm(''); }}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#A8814F] underline underline-offset-4"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F1EC]" />}>
      <CatalogContent />
    </Suspense>
  );
}
