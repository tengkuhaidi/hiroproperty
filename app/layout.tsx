import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/motion/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Hiro Property — Luxury Real Estate',
  description: 'Private-client real estate advisory for exceptional architectural homes across Jakarta, Bali, and premier international destinations.',
  keywords: ['Luxury real estate', 'Hiro Property', 'Off-market properties', 'Jakarta luxury home', 'Bali architectural villa'],
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
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
