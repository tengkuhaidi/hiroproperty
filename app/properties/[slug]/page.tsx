import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';

// Generate static params for all properties (SSG Best Practice)
export function generateStaticParams() {
  return PROPERTIES.map((prop) => ({
    slug: prop.slug,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const similarProperties = PROPERTIES.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Breadcrumb */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#6D675D] hover:text-[#14130F] transition-colors mb-8"
        >
          <span>&larr;</span>
          <span>All properties</span>
        </Link>

        {/* Hero Title & Price Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#14130F]/15 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A8814F] block mb-2">
              {property.category} · {property.location}
            </span>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-none text-[#14130F]">
              {property.title}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs uppercase tracking-wider text-[#6D675D] block mb-1">Asking Valuation</span>
            <p className="font-display text-4xl md:text-5xl text-[#14130F]">{property.price}</p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-12 mb-16">
          {/* Main Hero Shot */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/5 md:col-span-8 shadow-lg">
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>

          {/* Secondary Stack */}
          <div className="grid gap-6 md:col-span-4">
            {property.gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden rounded-2xl bg-black/5 shadow-md">
                <Image
                  src={img}
                  alt={`${property.title} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-[#14130F]/15 mb-16">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Bedrooms</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.bedrooms}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Bathrooms</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.bathrooms}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Living Area</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.areaSqFt} <span className="text-base font-normal">sq ft</span></p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Year Built</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.yearBuilt}</p>
          </div>
        </div>

        {/* 2-Column: Content & Sticky Sidebar */}
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Main Description & Amenities */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="font-display text-3xl text-[#14130F] mb-4">Architectural Overview</h2>
              <p className="text-base leading-relaxed text-[#6D675D]">{property.description}</p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-[#14130F] mb-6">Key Specifications &amp; Amenities</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.amenities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#14130F] py-2 border-b border-[#14130F]/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A8814F]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Inquiry Card */}
          <div className="lg:col-span-4 sticky top-28 rounded-2xl border border-[#14130F]/15 bg-white p-8 shadow-xl">
            <p className="text-xs uppercase tracking-widest text-[#6D675D] mb-1 font-semibold">Private Advisory Desk</p>
            <h3 className="font-display text-2xl text-[#14130F] mb-4">Inquire About This Property</h3>
            <p className="text-xs text-[#6D675D] leading-relaxed mb-6">
              Contact our senior partner handling the {property.title} portfolio for verified documentation, title deeds, and private viewings.
            </p>

            <a
              href={`https://wa.me/6287825174624?text=Halo%20Hiro%20Property,%20saya%20tertarik%20dengan%20properti%20${encodeURIComponent(property.title)}%20(${encodeURIComponent(property.location)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-xl bg-[#12110E] py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#A8814F] shadow-lg mb-3"
            >
              Schedule Private Viewing &rarr;
            </a>

            <a
              href="mailto:private@hiroproperty.com"
              className="block w-full text-center rounded-xl border border-[#14130F]/20 py-3 text-xs font-semibold uppercase tracking-wider text-[#14130F] hover:bg-black/5 transition-colors"
            >
              Request Dossier via Email
            </a>
          </div>
        </div>

        {/* Similar Curated Residences */}
        <div className="mt-32 border-t border-[#14130F]/15 pt-16">
          <h2 className="font-display text-4xl text-[#14130F] mb-12">
            Similar <span className="italic">curated residences</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {similarProperties.map((sp) => (
              <Link key={sp.id} href={`/properties/${sp.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5 shadow-md">
                  <Image
                    src={sp.image}
                    alt={sp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-[#14130F] group-hover:text-[#A8814F] transition-colors">{sp.title}</h3>
                    <p className="text-xs text-[#6D675D]">{sp.location}</p>
                  </div>
                  <p className="font-display text-lg text-[#14130F]">{sp.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
