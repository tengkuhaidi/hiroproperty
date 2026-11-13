import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PROPERTIES } from '@/data/properties';
import PropertyGallery from '@/components/PropertyGallery';
import MobileFloatingCTA from '@/components/MobileFloatingCTA';
import { TransactionBadge, CategoryBadge } from '@/components/PropertyBadge';

const BASE_URL = 'https://hiroproperty.com';

// Generate static params for all properties (SSG Best Practice)
export function generateStaticParams() {
  return PROPERTIES.map((prop) => ({
    slug: prop.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);
  if (!property) return {};

  const title = `${property.title} — ${property.location}`;
  const description =
    property.curatorNote ||
    `${property.title} di ${property.location}. ${property.bedrooms} kamar tidur, ${property.bathrooms} kamar mandi, ${property.buildingArea || property.areaSqFt}. Harga: ${property.price}.`;
  const url = `${BASE_URL}/properties/${property.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [{ url: property.image, width: 1200, height: 750, alt: property.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.image],
    },
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.curatorNote || property.description,
    url: `${BASE_URL}/properties/${property.slug}`,
    image: property.gallery && property.gallery.length > 0 ? property.gallery : [property.image],
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressCountry: 'ID',
    },
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.buildingArea || property.areaSqFt,
    },
    offers: {
      '@type': 'Offer',
      price: property.priceNumeric,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      {/* JSON-LD structured data: safe, serializes only our own static PROPERTIES data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Refined Hierarchical Breadcrumbs (The Modern House / Inigo standard) */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6D675D]">
            <li>
              <Link href="/" className="hover:text-[#14130F] transition-colors">
                Index
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li>
              <Link href="/properties" className="hover:text-[#14130F] transition-colors">
                Properties
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li>
              <Link
                href={`/properties?type=${encodeURIComponent(property.category)}`}
                className="hover:text-[#A8814F] transition-colors text-[#14130F]"
              >
                {property.category}
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li>
              <Link
                href={`/properties?q=${encodeURIComponent(property.location.split(',')[0].trim())}`}
                className="hover:text-[#A8814F] transition-colors"
              >
                {property.location.split(',')[0].trim()}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Hero Title & Price Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#14130F]/15 mb-10">
          <div>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-none text-[#14130F]">
              {property.title}
            </h1>
            <p className="mt-2 text-xs tracking-widest text-[#6D675D] uppercase">
              {property.code || 'HP-001'} · {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs uppercase tracking-wider text-[#6D675D] block mb-1">Asking Price</span>
            <p className="font-display text-4xl md:text-5xl text-[#14130F]">{property.price}</p>
          </div>
        </div>

        {/* Gallery with Fullscreen Lightbox */}
        <PropertyGallery
          title={property.title}
          image={property.image}
          video={property.video}
          gallery={property.gallery}
        />

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 py-8 border-y border-[#14130F]/15 mb-16">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Bedrooms</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.bedrooms}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Bathrooms</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.bathrooms}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Floor Area</p>
            <p className="font-display text-3xl md:text-4xl text-[#14130F] mt-1">{property.buildingArea || property.areaSqFt}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Land / Title</p>
            <p className="font-display text-2xl md:text-3xl text-[#14130F] mt-1">{property.landArea || 'Private'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#6D675D]">Certificate</p>
            <p className="font-display text-2xl md:text-3xl text-[#14130F] mt-1">{property.certificate || 'SHM'}</p>
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
            {property.curatorNote && (
              <div className="rounded-xl border border-[#A8814F]/30 bg-[#A8814F]/5 p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#A8814F] font-semibold mb-2">
                  Curator Note · Catatan Kurator
                </p>
                <p className="font-display text-lg md:text-xl text-[#14130F] leading-snug">
                  &ldquo;{property.curatorNote}&rdquo;
                </p>
              </div>
            )}

            <div>
              <h2 className="font-display text-3xl text-[#14130F] mb-4">Architectural Overview</h2>
              <div className="text-base leading-relaxed text-[#6D675D] space-y-4">
                {property.description.includes('\n\n') ? (
                  property.description.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Set within the premier Kota Kasablanka enclave, this residence balances understated contemporary finishes with expansive urban outlooks. Designed with generous natural light, cross-ventilation, and an efficient floor plan tailored for sophisticated city living.
                    </p>
                    <p>
                      Direct integrated access to prime retail, lifestyle amenities, and the central business districts of Rasuna Said and Mega Kuningan provides effortless connectivity while maintaining quiet residential privacy.
                    </p>
                  </>
                )}
              </div>
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
          <div className="lg:col-span-4 sticky top-28 rounded-xl border border-[#14130F]/15 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#6D675D] mb-1 font-semibold">Private Advisory Desk</p>
            <h3 className="font-display text-2xl text-[#14130F] mb-4">Inquire About This Property</h3>
            <p className="text-xs text-[#6D675D] leading-relaxed mb-6">
              Contact our senior partner handling the {property.title} portfolio for verified documentation, title deeds, and private viewings.
            </p>

            <a
              href={`https://wa.me/6285176828199?text=${encodeURIComponent(`Selamat siang Hiro Property, saya tertarik dengan ${property.code || 'HP-001'}, ${property.title} (${property.location}). Mohon info jadwal kunjungan pribadi.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-xl bg-[#12110E] py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#A8814F] shadow-lg mb-3"
            >
              Arrange Private Viewing &rarr;
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
                  {/* Transaction & Category Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                    <TransactionBadge tag={sp.tag} />
                    <CategoryBadge category={sp.category} />
                  </div>
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
        {/* Mobile Floating Sticky CTA */}
        <MobileFloatingCTA
          title={property.title}
          price={property.price}
          location={property.location}
          code={property.code}
        />
      </div>
    </div>
  );
}
