import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us · Hiro Property',
  description: 'Small, by design. Private real estate advisory for homes valued above Rp5 Billion.',
};

export default function TentangPage() {
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
            <li className="text-[#14130F]">About Us</li>
          </ol>
        </nav>

        {/* Section 1: Opening */}
        <div className="mb-20 max-w-3xl">
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] text-[#14130F] mb-6">
            Small, by <span className="italic">design</span>.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6D675D]">
            Hiro was founded by practitioners in property development, sales, and technology, who believe that multi-billion-rupiah homes deserve careful stewardship, not mass marketing. We work with a small number of homes and clients at any one time, and we know every property we offer personally.
          </p>
        </div>

        {/* Section 2: What We Handle */}
        <div className="grid gap-8 md:grid-cols-3 border-y border-[#14130F]/15 py-14 mb-20">
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Buying</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Finding the right home for your criteria, including from a private collection not shown in public listings.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Selling</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Valuation based on real transactions, targeted marketing without compromising privacy, and support through to the deed signing.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Areas</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              A deep focus on Jakarta and its surroundings (Menteng, Pondok Indah, Bintaro, BSD) and Bandung (Cigadung &amp; Dago).
            </p>
          </div>
        </div>

        {/* Section 3: How We Work */}
        <div className="mb-24 space-y-6 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl text-[#14130F]">How We Work</h2>
          <div className="space-y-4 text-sm text-[#6D675D]">
            <p>
              <strong className="text-[#14130F]">We explain the price.</strong> Every home comes with a transparent comparison of price per square metre in its area.
            </p>
            <p>
              <strong className="text-[#14130F]">We protect your privacy.</strong> Owner addresses are never published publicly; buyer data is never sold or handed to third parties.
            </p>
            <p>
              <strong className="text-[#14130F]">We're responsive, never rushed.</strong> Questions are answered promptly by our digital assistant and principal, but the final decision always stays with you.
            </p>
          </div>
        </div>

        {/* Section 4: Legal */}
        <div className="rounded-2xl border border-[#14130F]/15 bg-white p-8 md:p-10 mb-24">
          <h3 className="font-display text-2xl text-[#14130F] mb-4">Legal &amp; Corporate</h3>
          <p className="text-sm text-[#6D675D] leading-relaxed mb-6">
            All transactions and brokerage activity operate under a formally registered legal entity:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-xs text-[#14130F]">
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Legal Entity</span>
              <span>PT Hiro Properti Indonesia</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Business ID (NIB)</span>
              <span>1205240098231</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Licensing (SIU-P4)</span>
              <span>Registered Operation</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Notarial Partnership</span>
              <span>Accredited Notary / PPAT Partners</span>
            </div>
          </div>
        </div>

        {/* Section 5: Let's Talk */}
        <div className="border-t border-[#14130F]/15 pt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl text-[#14130F] mb-2">Let's talk.</h2>
            <p className="text-sm text-[#6D675D]">
              About the home you're looking for, or the home you'd like to sell.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6285176828199?text=Hello%20Hiro%20Property,%20I%27d%20like%20to%20speak%20with%20the%20Private%20Desk."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#12110E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#A8814F] transition-all shadow-md"
            >
              Contact Private Desk &rarr;
            </a>
            <Link
              href="/jual"
              className="rounded-full border border-[#14130F]/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14130F] hover:bg-black/5 transition-colors"
            >
              Sell with Hiro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
