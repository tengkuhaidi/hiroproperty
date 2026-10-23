import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HIRO PROPERTY | Private Luxury Real Estate Advisory',
  description: 'Curated prime properties (>IDR 6 Billion) across South Jakarta, Menteng, and Bali. Discreet acquisition, valuation, and architectural estate advisory.',
  keywords: ['luxury real estate jakarta', 'pondok indah luxury homes', 'menteng estates', 'bali luxury villas', 'hiro property'],
  openGraph: {
    title: 'HIRO PROPERTY | Private Luxury Real Estate Advisory',
    description: 'Curated prime properties (>IDR 6 Billion) in South Jakarta & Bali. Private off-market portfolio.',
    url: 'https://hiroproperty.com',
    siteName: 'HIRO PROPERTY',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#d4af37]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
