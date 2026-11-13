import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalFloatingWA from '@/components/GlobalFloatingWA';
import SmoothScrollProvider from '@/components/motion/SmoothScrollProvider';

const BASE_URL = 'https://hiroproperty.com';
const DEFAULT_TITLE = 'Hiro Property — Luxury Real Estate';
const DEFAULT_DESCRIPTION = 'Private-client real estate advisory for exceptional architectural homes across Jakarta, Bali, and premier international destinations.';
const DEFAULT_OG_IMAGE = '/images/valley-house/02-exterior-dusk.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Hiro Property',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['Luxury real estate', 'Hiro Property', 'Off-market properties', 'Jakarta luxury home', 'Bali architectural villa'],
  openGraph: {
    type: 'website',
    siteName: 'Hiro Property',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 750, alt: DEFAULT_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#F4F1EC] text-[#14130F] font-body selection:bg-[#14130F] selection:text-[#F4F1EC]">
        <SmoothScrollProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <GlobalFloatingWA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
