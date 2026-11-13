import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy · Hiro Property',
  description: 'Privacy policy and personal data protection in accordance with Law No. 27 of 2022 (Indonesian PDP Law).',
};

export default function PrivasiPage() {
  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6D675D]">
            <li>
              <Link href="/" className="hover:text-[#14130F] transition-colors">
                Index
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li className="text-[#14130F]">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] text-[#14130F] mb-6">
          Your Privacy
        </h1>

        <div className="text-base leading-relaxed text-[#6D675D] space-y-6 mb-12">
          <p className="text-lg text-[#14130F]">
            Discretion is part of how we work. This page explains what data we collect, why, and how you can control it, in accordance with Indonesia's Personal Data Protection Law (Law No. 27 of 2022).
          </p>
        </div>

        <div className="border-t border-[#14130F]/15 divide-y divide-[#14130F]/10 text-sm leading-relaxed text-[#6D675D]">
          {/* 1. Data Collected */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">1. Data We Collect</h3>
            <p>
              We only collect data you provide voluntarily through our website form or WhatsApp conversations:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full name or preferred name.</li>
              <li>WhatsApp number and/or email address for correspondence.</li>
              <li>Property search criteria (area, budget range, layout preferences).</li>
              <li>Property information for owners listing a home for sale (general area, basic specifications).</li>
            </ul>
          </div>

          {/* 2. Purpose of Use */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">2. Purpose of Data Processing</h3>
            <p>
              Your data is used solely to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Find properties from our portfolio matching your personal criteria.</li>
              <li>Contact you to confirm private viewing appointments.</li>
              <li>Deliver written property valuation reports to owners.</li>
            </ul>
          </div>

          {/* 3. Data Processors */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">3. Data Processors &amp; System Confidentiality</h3>
            <p>
              Data is processed internally by the Hiro Property principal team and our encrypted official digital assistant infrastructure. We do not use third-party data brokers.
            </p>
          </div>

          {/* 4. Data Sharing */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">4. Sharing Data with External Parties</h3>
            <p>
              <strong>Your data is never sold or rented to any other party.</strong> Information is only passed on to a homeowner or an appointed notary/PPAT partner when you explicitly request an offer submission or deed preparation.
            </p>
          </div>

          {/* 5. Data Subject Rights */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">5. Your Rights (Access &amp; Deletion)</h3>
            <p>
              Under the PDP Law, you may at any time request a copy of your data, request an update, or request complete deletion of your contact data from our records simply by messaging the Private Desk.
            </p>
          </div>

          {/* 6. Data Controller Contact */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">6. Data Controller Contact</h3>
            <p>
              PT Hiro Properti Indonesia<br />
              Attn: Privacy Compliance Team (Private Client Desk)<br />
              Email:{' '}
              <a href="mailto:private@hiroproperty.com" className="text-[#A8814F] underline">
                private@hiroproperty.com
              </a><br />
              WhatsApp: +62 851-7682-8199
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
