'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'Villa' | 'House' | 'Penthouse' | 'Apartment' | 'Estate'>('Villa');
  
  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formBudget, setFormBudget] = useState('IDR 6 - 15 M');
  const [formNotes, setFormNotes] = useState('');
  const [formSent, setFormSent] = useState(false);

  const categories = ['Villa', 'House', 'Penthouse', 'Apartment', 'Estate'] as const;
  const featuredProperties = PROPERTIES.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?type=${activeCategory.toLowerCase()}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Halo Private Advisory Desk Hiro Property, nama saya ${formName || 'Klien'} (${formEmail}). Saya tertarik berdiskusi mengenai portofolio properti (Budget: ${formBudget}). Catatan: ${formNotes}`
    );
    window.open(`https://wa.me/6287825174624?text=${msg}`, '_blank');
    setFormSent(true);
  };

  return (
    <div className="bg-[#F4F1EC] text-[#14130F]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#12110E] p-3 md:p-4">
        <div className="relative h-full overflow-hidden rounded-[18px]">
          {/* Villa Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/villa.jpg"
              alt="Modern villa with infinity pool at dusk"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110E]/85 via-[#12110E]/15 to-[#12110E]/30" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 text-[#F4F1EC] md:px-12 md:pb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#F4F1EC]/80">
              Private client real estate
            </p>
            <h1 className="font-display max-w-4xl text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[0.95] tracking-tight text-white mb-8">
              Homes that feel like arrival.
            </h1>

            {/* Floating Search Filter Bar */}
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-[#12110E]/60 p-2 backdrop-blur-xl border border-white/10 sm:flex-row sm:items-center sm:justify-between shadow-2xl"
            >
              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-1.5 px-2 py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-white text-[#12110E] shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="rounded-xl bg-[#F4F1EC] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#12110E] transition-all hover:bg-white hover:shadow-lg active:scale-95"
              >
                Search {activeCategory.toLowerCase()}s &rarr;
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. ABOUT STATEMENT SECTION */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 items-baseline">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] md:col-span-4 font-semibold">
            About Us
          </p>
          <div className="md:col-span-8">
            <h2 className="font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.15] text-[#14130F]">
              We represent a small number of extraordinary homes — and the people who will love living in them.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-6 text-sm leading-relaxed text-[#6D675D] max-w-2xl">
              <p>
                From architectural estates in South Jakarta to discreet cliffside sanctuaries in Bali and global trophy assets, we advise private clients on properties of lasting significance.
              </p>
              <p>
                Every engagement is governed by absolute confidentiality, forensic legal due diligence, and an uncompromising eye for architectural caliber.
              </p>
            </div>

            {/* Metrics */}
            <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[#14130F]/15 pt-10 sm:grid-cols-4">
              <div>
                <p className="font-display text-5xl md:text-6xl text-[#14130F]">98%</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#6D675D]">Off-market privacy</p>
              </div>
              <div>
                <p className="font-display text-5xl md:text-6xl text-[#14130F]">IDR 6B+</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#6D675D]">Target asset value</p>
              </div>
              <div>
                <p className="font-display text-5xl md:text-6xl text-[#14130F]">100%</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#6D675D]">Legal compliance</p>
              </div>
              <div>
                <p className="font-display text-5xl md:text-6xl text-[#14130F]">1 : 1</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#6D675D]">Dedicated partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED RESIDENCES */}
      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-12 md:pb-40">
        <div className="mb-14 flex items-end justify-between border-b border-[#14130F]/15 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#6D675D] mb-2 font-semibold">Curated Portfolio</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#14130F]">
              Featured <span className="italic">residences</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="group flex items-center gap-2 text-sm font-medium tracking-wide text-[#14130F] hover:text-[#A8814F] transition-colors"
          >
            <span>View all 8 properties</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {featuredProperties.map((prop, idx) => (
            <Link
              key={prop.id}
              href={`/properties/${prop.slug}`}
              className={`group block ${idx === 1 ? 'md:mt-12' : idx === 2 ? 'md:mt-24' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5 shadow-md">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {prop.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-[#12110E]/80 backdrop-blur-md px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-white border border-white/10">
                    {prop.tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-[#14130F] group-hover:text-[#A8814F] transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#6D675D] mt-0.5 tracking-wide">
                    {prop.location} · {prop.bedrooms} Beds · {prop.areaSqFt} sq ft
                  </p>
                </div>
                <p className="font-display text-xl font-normal text-[#14130F]">
                  {prop.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. ARCHITECTURE STATEMENT FULL-BLEED BANNER */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden bg-[#12110E]">
        <Image
          src="/images/night.jpg"
          alt="Architectural pavilion at twilight"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12110E] via-transparent to-[#12110E]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-[#F4F1EC]">
          <p className="text-xs uppercase tracking-[0.4em] text-white/80 mb-6 font-semibold">
            Architecture First
          </p>
          <h2 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.1] text-white">
            Design that earns its place on the <span className="italic">skyline</span>.
          </h2>
          <div className="mt-10">
            <Link
              href="/properties"
              className="rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12110E] hover:bg-[#F4F1EC] transition-all"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="bg-[#12110E] py-28 text-[#F4F1EC] md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-20 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#A8814F] mb-3 font-semibold">Advisory Capabilities</p>
            <h2 className="font-display text-5xl md:text-6xl text-white">
              One advisor, <span className="italic">every step</span>.
            </h2>
          </div>

          <div className="border-t border-white/15 divide-y divide-white/10">
            {/* 01 Buy */}
            <div className="group grid items-baseline gap-6 py-12 md:grid-cols-12 hover:bg-white/[0.02] transition-colors px-4">
              <span className="font-display text-4xl text-[#6D675D] md:col-span-2">01</span>
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-[#A8814F] transition-colors">
                  Buy
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#6D675D] mt-1">Discreet Acquisition</p>
              </div>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70 md:col-span-6">
                Direct access to off-market residences not visible on public portals. Complete due diligence on land zoning (RDTR DKI Jakarta), SHM legitimacy, and architectural appraisal before negotiation.
              </p>
            </div>

            {/* 02 Sell */}
            <div className="group grid items-baseline gap-6 py-12 md:grid-cols-12 hover:bg-white/[0.02] transition-colors px-4">
              <span className="font-display text-4xl text-[#6D675D] md:col-span-2">02</span>
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-[#A8814F] transition-colors">
                  Sell
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#6D675D] mt-1">Private Representation</p>
              </div>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70 md:col-span-6">
                Targeted introductions to qualified private investors and family offices. We craft museum-grade visual stories while protecting the owner’s anonymity throughout the entire sales lifecycle.
              </p>
            </div>

            {/* 03 Invest */}
            <div className="group grid items-baseline gap-6 py-12 md:grid-cols-12 hover:bg-white/[0.02] transition-colors px-4">
              <span className="font-display text-4xl text-[#6D675D] md:col-span-2">03</span>
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-[#A8814F] transition-colors">
                  Invest
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#6D675D] mt-1">Capital Strategy</p>
              </div>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70 md:col-span-6">
                Strategic counsel on yield-generating prime assets in Bali, heritage restoration in Menteng, and portfolio diversification into high-performing international tier-one markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] mb-3 font-semibold">Inquiries</p>
          <h2 className="font-display text-5xl md:text-7xl text-[#14130F] leading-tight">
            Let’s find your <span className="italic">next address</span>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[#6D675D] max-w-md">
            Whether inquiring about an active listing or commissioning a confidential acquisition search, our senior partners are available for discreet consultation.
          </p>

          <div className="mt-12 space-y-3 text-sm text-[#14130F]">
            <p className="font-semibold text-xs uppercase tracking-widest text-[#6D675D]">Direct Desk</p>
            <p>WhatsApp: +62 878-2517-4624</p>
            <p>Email: private@hiroproperty.com</p>
          </div>
        </div>

        <div className="md:col-span-6">
          {formSent ? (
            <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-lg">
              <h3 className="font-display text-3xl text-[#14130F]">Inquiry Prepared</h3>
              <p className="mt-3 text-sm text-[#6D675D]">
                Connecting you directly to our Private Advisory WhatsApp Desk...
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Alexander Pratama"
                  className="w-full border-b border-[#14130F]/20 bg-transparent py-3 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-1">Email / Phone</label>
                <input
                  type="text"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. client@familyoffice.com"
                  className="w-full border-b border-[#14130F]/20 bg-transparent py-3 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-1">Investment Budget</label>
                <select
                  value={formBudget}
                  onChange={(e) => setFormBudget(e.target.value)}
                  className="w-full border-b border-[#14130F]/20 bg-transparent py-3 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                >
                  <option value="IDR 6 - 15 M">IDR 6 - 15 Miliar</option>
                  <option value="IDR 15 - 35 M">IDR 15 - 35 Miliar</option>
                  <option value="IDR 35 - 75 M">IDR 35 - 75 Miliar</option>
                  <option value="> IDR 75 M (Trophy Asset)">&gt; IDR 75 Miliar (Trophy Asset)</option>
                  <option value="International / Overseas Portfolio">International / Overseas Portfolio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-1">Message / Requirements</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className="w-full border-b border-[#14130F]/20 bg-transparent py-3 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#12110E] py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#A8814F] hover:shadow-lg"
              >
                Send Confidential Inquiry &rarr;
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
