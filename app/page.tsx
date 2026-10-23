'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Compass, 
  ShieldCheck, 
  KeyRound, 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  Sparkles,
  PhoneCall,
  Mail,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface TeaserListing {
  id: string;
  code: string;
  title: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  val: string;
  tag: string;
  image: string;
}

const TEASER_LISTINGS: TeaserListing[] = [
  {
    id: 'hp-01',
    code: 'HP/PI-88',
    title: 'Modern Classic Residence',
    location: 'Bukit Golf, Pondok Indah',
    area: 'LT 680 m² · LB 850 m²',
    beds: 5,
    baths: 6,
    val: 'IDR 38.000.000.000',
    tag: 'Private Listing',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hp-02',
    code: 'HP/CG-14',
    title: 'Architectural Tropical Sanctuary',
    location: 'Pererenan / Canggu, Bali',
    area: 'LT 1.200 m² · LB 720 m²',
    beds: 4,
    baths: 5,
    val: 'IDR 24.500.000.000',
    tag: 'Off-Market',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hp-03',
    code: 'HP/MT-09',
    title: 'Heritage Colonial Manor',
    location: 'Taman Suropati, Menteng',
    area: 'LT 950 m² · LB 620 m²',
    beds: 6,
    baths: 7,
    val: 'IDR 75.000.000.000',
    tag: 'Trophy Asset',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function UnderConstructionPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryBudget, setInquiryBudget] = useState('> IDR 10 - 25 M');
  const [submitted, setSubmitted] = useState(false);

  // Time in Jakarta
  const [timeStr, setTimeStr] = useState('00:00:00 WIB');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Halo Tim Hiro Property, saya ${inquiryName || 'Klien'} tertarik dengan portofolio properti (Budget: ${inquiryBudget}). Mohon informasi privat katalog properti Anda.`
    );
    window.open(`https://wa.me/6287825174624?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#090a0b] text-[#eaeaea] relative overflow-hidden architect-grid">
      
      {/* Ambient subtle glow for luxury focal point */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Status & Brand Bar */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-[#090a0b]/80">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* Logo Hiro Property */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#d4af37]/60 flex items-center justify-center bg-[#121316]">
              <span className="font-serif-luxury font-bold text-lg tracking-wider text-[#f5d485]">H</span>
            </div>
            <div>
              <div className="font-serif-luxury font-bold text-xl tracking-[0.22em] text-white">HIRO</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-[#a0a5ad] uppercase -mt-0.5">PROPERTY · PRIVATE REAL ESTATE</div>
            </div>
          </div>

          {/* Time & Telemetry */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#a0a5ad]">JAKARTA HQ:</span>
              <span className="text-white font-semibold">{timeStr}</span>
            </div>
            <div className="h-3 w-px bg-white/15" />
            <div className="text-[#d4af37] border border-[#d4af37]/30 px-2.5 py-1 rounded bg-[#d4af37]/5">
              SECTOR: PRIME &gt; IDR 6B
            </div>
          </div>

          {/* Direct Private Line CTA */}
          <a 
            href="https://wa.me/6287825174624?text=Halo%20Hiro%20Property,%20saya%20ingin%20konsultasi%20private%20portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white text-black hover:bg-[#f5d485] transition-all duration-300 rounded shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Private Advisory Desk</span>
          </a>

        </div>
      </header>

      {/* Hero Curated Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20">
        
        {/* Under Construction Monogram Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 rounded-full bg-white/[0.03] mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs font-mono tracking-wider uppercase text-[#c3c7cf]">
            Curated Portal In Development · Launching Q4 2026
          </span>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white">
              The Art of <br />
              <span className="italic gold-gradient-text font-serif">Discreet Acquisition</span> <br />
              &amp; Trophy Estates.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#9da3ad] max-w-2xl leading-relaxed font-light">
              Kami memegang kurasi properti berkarakter kuat bernilai di atas <span className="text-white font-medium">Rp 6 Miliar</span>. Menghubungkan pembeli selektif dengan pemilik hunian terkemuka di Pondok Indah, Menteng, Senopati, hingga luxury sanctuary di Bali secara tertutup.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <div className="p-6 border border-white/10 bg-[#121316]/80 rounded-xl backdrop-blur-md">
              <div className="text-[11px] font-mono text-[#8a919e] uppercase tracking-wider mb-1">Status Akuisisi</div>
              <div className="text-2xl font-serif-luxury font-bold text-white">100% Off-Market</div>
              <p className="text-xs text-[#8a919e] mt-2 leading-relaxed">
                Menjaga privasi keluarga dan data transaksi. Tidak ada papan spanduk, tidak ada publikasi terbuka tanpa NDA.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg hover:border-[#d4af37]/40 transition-colors">
            <ShieldCheck className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">Strict Due Diligence</h3>
            <p className="text-xs text-[#8a919e] leading-relaxed">
              Validasi yuridis tuntas: sertifikat SHM bersih, tata ruang zonasi tata kota (RDTR), dan bebas sengketa sebelum masuk meja negosiasi.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg hover:border-[#d4af37]/40 transition-colors">
            <Compass className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">Architectural Rigor</h3>
            <p className="text-xs text-[#8a919e] leading-relaxed">
              Setiap aset dipilih berdasarkan kelayakan rancang bangun, pencahayaan alami, sirkulasi tropis, serta material bernilai jangka panjang.
            </p>
          </div>

          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg hover:border-[#d4af37]/40 transition-colors">
            <Lock className="w-6 h-6 text-[#d4af37] mb-4" />
            <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">Private Family Desk</h3>
            <p className="text-xs text-[#8a919e] leading-relaxed">
              Konsultan senior berdedikasi mendampingi transaksi end-to-end hingga balik nama notaris otentik dan pelaporan pajak aset.
            </p>
          </div>
        </div>

      </section>

      {/* Sneak Peek Curated Portfolio Carousel/Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">Sneak Peek Portofolio</div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-white">Contoh Kurasi Properti Kami</h2>
          </div>
          <div className="text-xs font-mono text-[#8a919e]">
            Katalog lengkap diluncurkan bertahap khusus investor terdaftar.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEASER_LISTINGS.map((item) => (
            <div 
              key={item.id}
              className="group border border-white/10 bg-[#121316] rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded text-[10px] font-mono text-white">
                  {item.code}
                </div>
                <div className="absolute top-3 right-3 bg-[#d4af37] text-black font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8a919e] mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif-luxury mb-2 group-hover:text-[#f5d485] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#8a919e] font-mono mb-4">
                    {item.area} · {item.beds} KT · {item.baths} KM
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="font-serif-luxury font-bold text-white text-sm">
                    {item.val}
                  </div>
                  <a
                    href={`https://wa.me/6287825174624?text=Halo%20Hiro%20Property,%20saya%20ingin%20info%20listing%20${encodeURIComponent(item.code)}%20(${encodeURIComponent(item.title)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
                  >
                    <span>Detail Privat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Private Investor Registration / Direct Desk */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="border border-[#d4af37]/30 bg-[#121316]/90 p-8 sm:p-12 rounded-2xl backdrop-blur-xl relative shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] inline-block mb-2" />
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
              VIP Investor &amp; Owner Registration
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury text-white mt-2">
              Dapatkan Akses Portofolio Privat
            </h2>
            <p className="text-xs sm:text-sm text-[#9da3ad] mt-3 leading-relaxed">
              Daftarkan diri Anda untuk menerima kurasi properti *off-market* sebelum dirilis secara umum, atau titipkan aset hunian Anda untuk dipasarkan ke jaringan HNWI kami.
            </p>
          </div>

          <form onSubmit={handleWhatsApp} className="space-y-4 max-w-lg mx-auto">
            <div>
              <label className="block text-xs font-mono text-[#a0a5ad] mb-1.5 uppercase">Nama Lengkap</label>
              <input 
                type="text" 
                required
                placeholder="cth. Bapak Hendra / Ibu Linda" 
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#a0a5ad] mb-1.5 uppercase">No. WhatsApp / Kontak Pribadi</label>
              <input 
                type="text" 
                required
                placeholder="0812xxxxxxx" 
                value={inquiryContact}
                onChange={(e) => setInquiryContact(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#a0a5ad] mb-1.5 uppercase">Kisaran Nilai Aset / Budget</label>
              <select 
                value={inquiryBudget}
                onChange={(e) => setInquiryBudget(e.target.value)}
                className="w-full bg-[#1c1d22] border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="IDR 6 - 10 Miliar">IDR 6 - 10 Miliar</option>
                <option value="IDR 10 - 25 Miliar">IDR 10 - 25 Miliar</option>
                <option value="IDR 25 - 50 Miliar">IDR 25 - 50 Miliar</option>
                <option value="> IDR 50 Miliar (Trophy Asset)">&gt; IDR 50 Miliar (Trophy Asset)</option>
                <option value="Saya Ingin Menjual Properti Mewah">Saya Ingin Menjual Properti Mewah</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full mt-6 bg-[#d4af37] hover:bg-[#e4be4a] text-black font-bold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#d4af37]/10"
            >
              <span>Hubungi Private Advisory Desk via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#787f8c] font-mono pt-2">
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span>Privasi data Anda dijamin 100% rahasia sesuai etika perbankan &amp; hukum.</span>
            </div>
          </form>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 bg-[#060708]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#787f8c]">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury font-bold text-white text-base tracking-widest">HIRO</span>
            <span className="font-mono">· PT HIRO PROPERTI INDONESIA</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>JAKARTA SELATAN</span>
            <span>·</span>
            <span>BALI</span>
            <span>·</span>
            <span>INSTAGRAM: @HIROPROPERTY</span>
          </div>

          <div className="font-mono text-[10px] text-[#555a64]">
            &copy; 2026 HIRO PROPERTY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </main>
  );
}
