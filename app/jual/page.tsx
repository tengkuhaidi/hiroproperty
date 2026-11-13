import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Sell with Hiro · Hiro Property',
  description: 'Your home, sold the right way. Full discretion, honest valuation, and transparent commission.',
};

export default function JualPage() {
  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6D675D]">
            <li>
              <Link href="/" className="hover:text-[#14130F] transition-colors">
                Index
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li className="text-[#14130F]">Sell with Hiro</li>
          </ol>
        </nav>

        {/* Section 1: Hero */}
        <div className="mb-20 max-w-3xl">
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] text-[#14130F] mb-6">
            Your home, sold the <span className="italic">right way</span>.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6D675D]">
            We work with a small number of owners at any one time, so every home gets full attention, the right price, and serious buyers.
          </p>
        </div>

        {/* Section 2: What You Get */}
        <div className="grid gap-8 md:grid-cols-3 border-y border-[#14130F]/15 py-14 mb-20">
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">An honest valuation.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Price is set from comparable transactions in your area, not from a number you'd like to hear.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Targeted marketing.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Professional photography and film, shown to pre-screened buyers and partner agents.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Full discretion.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Your address is never published. Viewings only happen by appointment, with us present.
            </p>
          </div>
        </div>

        {/* Section 3 & 4: Process & Fees */}
        <div className="grid gap-16 md:grid-cols-12 mb-24">
          <div className="md:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-[#14130F]">
              The Process
            </h2>
            <ol className="space-y-4 border-l border-[#14130F]/15 pl-6 text-sm text-[#6D675D]">
              <li>
                <strong className="text-[#14130F] block">1. Initial conversation</strong>
                At your home or a place of your choosing, informal and confidential.
              </li>
              <li>
                <strong className="text-[#14130F] block">2. Valuation &amp; pricing strategy</strong>
                In writing, based on comparable real transactions nearby.
              </li>
              <li>
                <strong className="text-[#14130F] block">3. Working agreement</strong>
                Term and commission agreed transparently, on paper.
              </li>
              <li>
                <strong className="text-[#14130F] block">4. Private marketing</strong>
                Curated buyer outreach through to signing the deed before a notary.
              </li>
            </ol>
          </div>

          <div className="md:col-span-6 rounded-2xl border border-[#14130F]/15 bg-white p-8 space-y-4">
            <h3 className="font-display text-2xl text-[#14130F]">On Fees &amp; Commission</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              <strong>No upfront fees.</strong> Commission is only paid once your home officially changes hands, per our written agreement.
            </p>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Our standard commission is <strong>2.5%</strong> once agreed (in line with the industry norm under Permendag 51/2017's 2–5% range).
            </p>
            <div className="pt-4 border-t border-[#14130F]/10">
              <a
                href="https://wa.me/6285176828199?text=Hello%20Hiro%20Property,%20I%27m%20a%20homeowner%20and%20would%20like%20to%20discuss%20selling%20my%20property."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#12110E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#A8814F] transition-all"
              >
                Request a Private Valuation via WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Section 6: FAQ */}
        <div className="border-t border-[#14130F]/15 pt-16">
          <h2 className="font-display text-3xl text-[#14130F] mb-10">Frequently Asked Questions</h2>
          <div className="grid gap-8 md:grid-cols-2 text-sm text-[#6D675D]">
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Does it have to be exclusive?</h4>
              <p>Not necessarily. But an exclusive listing lets us invest fully in professional photography, cinematic film, and premium buyer curation.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Will my home's address be shown publicly?</h4>
              <p>Never. The website only shows the general area. The exact address is only shared with buyers whose viewing appointment has been confirmed.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">How long does it take to sell?</h4>
              <p>It depends on pricing accuracy and demand in your area. We give you an honest estimate after reviewing your home.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">What if I change my mind?</h4>
              <p>The terms are set out clearly in the initial agreement, including a straightforward way to end it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
