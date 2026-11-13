'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { PROPERTIES } from '@/data/properties';
import HeroFrame from '@/components/motion/HeroFrame';
import SplitText from '@/components/motion/SplitText';
import FadeInView from '@/components/motion/FadeInView';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'NEW ESTATES'>('BUY');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formWA, setFormWA] = useState('');
  const [formArea, setFormArea] = useState('Pondok Indah');
  const [formBudget, setFormBudget] = useState('Rp5–10 M');
  const [formBeds, setFormBeds] = useState('4+ Kamar');
  const [formTarget, setFormTarget] = useState('Segera (1–3 Bulan)');
  const [formSent, setFormSent] = useState(false);

  const tabs = [
    { id: 'BUY', label: 'Buy' },
    { id: 'RENT', label: 'Rent' },
    { id: 'NEW ESTATES', label: 'New Developments' },
  ] as const;

  // 1. Baru di Koleksi (6 Kartu)
  const recentCollection = PROPERTIES.slice(0, 6);

  // 2. Pilihan Kurator (3 Kartu Unggulan)
  const curatorPicks = PROPERTIES.slice(0, 3);

  // 3. Kawasan Aktif
  const activeAreas = [
    {
      name: 'Menteng',
      city: 'Jakarta Pusat',
      character: 'Kawasan diplomatik bersejarah, jalan rindang, privasi tinggi.',
      query: 'Menteng',
      image: '/images/night.jpg',
    },
    {
      name: 'Pondok Indah',
      city: 'Jakarta Selatan',
      character: 'Jalan lebar, kavling besar, dekat sekolah internasional & mall.',
      query: 'Kota Kasablanka',
      image: 'https://casagranderesidences.co.id/wp-content/uploads/2026/10/1001001873.jpg',
    },
    {
      name: 'Cigadung & Dago',
      city: 'Bandung',
      character: 'Udara sejuk lereng lembah, pemandangan sawah alami, arsitektur villa kontemporer.',
      query: 'Cigadung',
      image: '/images/valley-house/02-exterior-dusk.jpg',
    },
    {
      name: 'Bintaro & BSD',
      city: 'Tangerang Selatan',
      character: 'Perencanaan kota modern, akses tol langsung, komunitas mandiri tertata.',
      query: 'Jakarta Selatan',
      image: 'https://casagranderesidences.co.id/wp-content/uploads/2026/10/IMG-20261015-WA0010.jpg',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab === 'BUY') params.set('intent', 'buy');
    else if (activeTab === 'RENT') params.set('intent', 'rent');
    else if (activeTab === 'NEW ESTATES') params.set('intent', 'new');
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    router.push(`/properties?${params.toString()}`);
  };

  const handleCriteriaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Private Desk Hiro Property, nama saya ${formName || 'Klien'} (WA: ${formWA}). Saya mencari properti dengan kriteria:\n- Kawasan: ${formArea}\n- Budget: ${formBudget}\n- Kamar: ${formBeds}\n- Target Pindah: ${formTarget}\n\nMohon info kurasi rumah yang sesuai.`;
    window.open(`https://wa.me/6285176828199?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSent(true);
  };

  return (
    <div className="bg-[#F4F1EC] text-[#14130F]">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO (Satu foto rumah riil layar penuh)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[700px] overflow-hidden bg-[#12110E] p-3 md:p-4">
        <HeroFrame>
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/valley-house/02-exterior-dusk.jpg"
              alt="The Valley House Cigadung Bandung"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#12110E]/90 via-[#12110E]/25 to-[#12110E]/35" />

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 text-[#F4F1EC] md:px-14 md:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]"
            >
              Private Real Estate · Jabodetabek &amp; Bandung
            </motion.p>

            <h1 className="font-display max-w-4xl text-[clamp(3.2rem,8.2vw,7.2rem)] leading-[0.95] tracking-tight text-white mb-6">
              <SplitText text="Homes worth staying in." delay={0.4} />
            </h1>

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#F4F1EC]/75 mb-8">
              Hiro advises on buying and selling exceptional homes across Greater Jakarta and Bandung, with the same discretion and care for every client.
            </p>

            {/* Quick Search Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-w-3xl rounded-2xl bg-[#12110E]/80 p-3 sm:p-4 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-1 sm:gap-2 border-b border-white/10 pb-3 mb-3">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2 text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 rounded-lg ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeHeroTabIndicator"
                          className="absolute inset-0 bg-white/15 rounded-lg -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kawasan, jalan, atau kode listing (e.g. Cigadung, Menteng, HP-BDG-001)..."
                  className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-md border border-white/10 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-white px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#12110E] hover:bg-[#F4F1EC] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg whitespace-nowrap"
                >
                  Telusuri Koleksi &rarr;
                </button>
              </form>
            </motion.div>
          </div>
        </HeroFrame>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: BARU DI KOLEKSI (6 Kartu Listing)
         ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#14130F]/15 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] mb-2 font-semibold font-mono">Curated Portfolio</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#14130F]">
              Baru di <span className="italic">Koleksi</span>.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <p className="text-sm text-[#6D675D] max-w-md md:text-right mb-2">
              Rumah yang baru kami terima. Beberapa lainnya hanya kami tunjukkan secara pribadi atas permintaan pemilik.
            </p>
            <Link
              href="/properties"
              className="text-xs font-semibold uppercase tracking-wider text-[#14130F] hover:text-[#A8814F] transition-colors inline-flex items-center gap-2 group"
            >
              Lihat seluruh koleksi <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {recentCollection.map((prop, idx) => (
            <FadeInView key={prop.id} delay={idx * 0.1}>
              <Link href={`/properties/${prop.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5 shadow-md">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className={`rounded-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                      prop.tag === 'FOR RENT'
                        ? 'bg-[#090A0B]/85 text-white/90 border-white/10'
                        : 'bg-[#090A0B]/85 text-[#D4AF37] border-[#D4AF37]/30'
                    }`}>
                      {prop.tag || 'FOR SALE'}
                    </span>
                    <span className="rounded-md bg-[#090A0B]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-white/90 border border-white/10">
                      {prop.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-[#14130F] group-hover:text-[#A8814F] transition-colors leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-[#6D675D] mt-1 tracking-wide">
                      {prop.location} · {prop.bedrooms} Kamar · {prop.areaSqFt}
                    </p>
                  </div>
                  <p className="font-display text-xl font-normal text-[#14130F] whitespace-nowrap">
                    {prop.price}
                  </p>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PILIHAN KURATOR (3 Kartu Besar dengan Alasan Kuratorial)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white/50 border-y border-[#14130F]/10 py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#A8814F] mb-2 font-semibold font-mono">Curator&apos;s Selection</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#14130F]">
              Pilihan <span className="italic">Kurator</span>.
            </h2>
            <p className="mt-4 text-sm text-[#6D675D] leading-relaxed">
              Rumah yang menurut kami paling bernilai saat ini, karena rasio harga terhadap kawasan, lokasi langka, atau karakter arsitekturnya.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {curatorPicks.map((prop, idx) => (
              <FadeInView key={`curator-${prop.id}`} delay={idx * 0.15}>
                <div className="flex flex-col h-full rounded-2xl border border-[#14130F]/15 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/properties/${prop.slug}`} className="group block relative aspect-[16/10] overflow-hidden rounded-xl bg-black/5 mb-5">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md bg-[#090A0B]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/30">
                        {prop.code || 'HP-001'}
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-2xl text-[#14130F]">
                      <Link href={`/properties/${prop.slug}`} className="hover:text-[#A8814F] transition-colors">
                        {prop.title}
                      </Link>
                    </h3>
                    <span className="font-display text-xl text-[#14130F]">{prop.price}</span>
                  </div>

                  <p className="text-xs text-[#6D675D] mb-4">
                    {prop.location} · {prop.areaSqFt}
                  </p>

                  {/* 1 Kalimat Alasan Kurator */}
                  <div className="mt-auto border-t border-[#14130F]/10 pt-4">
                    <p className="text-xs text-[#14130F]/85 italic leading-relaxed">
                      &ldquo;{prop.curatorNote || 'Rasio harga per meter persegi tanah sangat kompetitif terhadap tren transaksi riil di kawasannya.'}&rdquo;
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: UNTUK PEMILIK (Blok Gelap, Foto Interior)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#12110E] text-[#F4F1EC] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-30 pointer-events-none">
          <Image
            src="/images/valley-house/06-living-valley-view.jpg"
            alt="Interior sanctuary"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12110E] via-[#12110E]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#D4AF37] mb-3 font-semibold">
              Sell with Hiro · Jual Bersama Hiro
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6">
              Menjual rumah Anda dengan <span className="italic">tenang</span>.
            </h2>
            <p className="text-base leading-relaxed text-[#F4F1EC]/75 mb-8">
              Kami memasarkan secara terarah, kepada pembeli yang sudah kami kenal kemampuannya. Alamat Anda tidak pernah dipublikasikan; kunjungan hanya dilakukan dengan janji temu dan pendampingan principal.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/jual"
                className="rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12110E] hover:bg-[#F4F1EC] transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Pelajari Titip Jual &rarr;
              </Link>
              <a
                href="https://wa.me/6285176828199?text=Selamat%20siang%20Hiro%20Property,%20saya%20pemilik%20rumah%20dan%20ingin%20berkonsultasi%20penilaian%20harga%20secara%20pribadi."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-all"
              >
                Minta Penilaian Pribadi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: KAWASAN YANG KAMI KENAL DARI DEKAT
         ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] mb-2 font-semibold font-mono">Neighbourhoods</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#14130F]">
            Kawasan yang kami kenal dari <span className="italic">dekat</span>.
          </h2>
          <p className="mt-4 text-sm text-[#6D675D] leading-relaxed">
            Hanya kawasan yang memiliki transaksi dan listing aktif yang kami tampilkan. Setiap kawasan memiliki karakter ruang dan ritme hidup yang berbeda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activeAreas.map((area, idx) => (
            <FadeInView key={area.name} delay={idx * 0.1}>
              <Link
                href={`/properties?q=${encodeURIComponent(area.query)}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-black/5 p-6 shadow-md"
              >
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12110E]/90 via-[#12110E]/40 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end text-[#F4F1EC]">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-1">
                    {area.city}
                  </p>
                  <h3 className="font-display text-3xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#F4F1EC]/75 line-clamp-3">
                    {area.character}
                  </p>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: CARA KAMI BEKERJA (3 Pilar Sesuai Dokumen)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#12110E] py-24 text-[#F4F1EC] md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#D4AF37] mb-3 font-semibold">Our Principles</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white">
              Cara kami <span className="italic">bekerja</span>.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 border-t border-white/15 pt-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-3">01 · Discretion</span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-3">Kerahasiaan sejak awal.</h3>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70">
                Alamat pemilik tidak dipublikasikan ke sembarang orang; kunjungan hanya dilakukan setelah verifikasi jadwal janji temu.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-3">02 · Reasoned Valuation</span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-3">Harga yang bisa dijelaskan.</h3>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70">
                Setiap rumah kami bandingkan secara objektif dengan transaksi riil di sekitarnya, bukan dari klaim sepihak.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] block mb-3">03 · One Point of Contact</span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-3">Satu orang yang mendampingi.</h3>
              <p className="text-sm leading-relaxed text-[#F4F1EC]/70">
                Dari kunjungan pertama hingga penandatanganan akta jual beli di hadapan notaris, Anda didampingi oleh principal yang sama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: PENUTUP (Form Sampaikan Kriteria Anda)
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="mx-auto grid max-w-[1600px] gap-16 px-6 py-24 md:grid-cols-12 md:px-12 md:py-32">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6D675D] mb-3 font-semibold font-mono">Private Search Desk</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#14130F] leading-tight">
            Ceritakan rumah yang <span className="italic">Anda cari</span>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[#6D675D]">
            Kami akan menghubungi Anda secara pribadi, sering kali sebelum rumahnya tampil di website ini. Sebagian portofolio terbaik kami hanya diperlihatkan secara privat.
          </p>

          <div className="mt-10 border-t border-[#14130F]/15 pt-6 space-y-2 text-xs text-[#6D675D]">
            <p className="font-semibold text-[#14130F] uppercase tracking-wider">Direct WhatsApp Desk</p>
            <p className="font-mono text-sm text-[#14130F]">+62 851-7682-8199</p>
            <p>Senin – Sabtu, 09.00 – 18.00 WIB</p>
          </div>
        </div>

        <div className="md:col-span-7">
          {formSent ? (
            <div className="rounded-2xl border border-black/10 bg-white p-10 text-center shadow-lg">
              <h3 className="font-display text-3xl text-[#14130F]">Kriteria Terkirim</h3>
              <p className="mt-3 text-sm text-[#6D675D] max-w-md mx-auto">
                Menghubungkan Anda langsung ke Private Desk WhatsApp Hiro Property untuk pencarian terkurasi...
              </p>
            </div>
          ) : (
            <form onSubmit={handleCriteriaSubmit} className="rounded-2xl border border-[#14130F]/15 bg-white p-8 md:p-10 shadow-sm space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Nama Anda</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Bapak / Ibu..."
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formWA}
                    onChange={(e) => setFormWA(e.target.value)}
                    placeholder="0812..."
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Kawasan Minat</label>
                  <select
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  >
                    <option value="Pondok Indah">Pondok Indah</option>
                    <option value="Menteng">Menteng</option>
                    <option value="Cigadung & Dago Bandung">Cigadung &amp; Dago Bandung</option>
                    <option value="Bintaro & BSD">Bintaro &amp; BSD</option>
                    <option value="Kawasan Lainnya">Kawasan Lainnya di Jabodetabek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Rentang Budget</label>
                  <select
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  >
                    <option value="Rp5–10 M">Rp5 – 10 Miliar</option>
                    <option value="Rp10–20 M">Rp10 – 20 Miliar</option>
                    <option value="Rp20–35 M">Rp20 – 35 Miliar</option>
                    <option value="di atas Rp35 M">di atas Rp35 Miliar</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Kamar Tidur</label>
                  <select
                    value={formBeds}
                    onChange={(e) => setFormBeds(e.target.value)}
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  >
                    <option value="3+ Kamar">3+ Kamar Tidur</option>
                    <option value="4+ Kamar">4+ Kamar Tidur</option>
                    <option value="5+ Kamar">5+ Kamar Tidur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6D675D] mb-2 font-mono">Target Pindah</label>
                  <select
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full border-b border-[#14130F]/20 bg-transparent py-2.5 text-sm text-[#14130F] focus:border-[#14130F] focus:outline-none"
                  >
                    <option value="Segera (1–3 Bulan)">Segera (1–3 Bulan)</option>
                    <option value="3–6 Bulan">3–6 Bulan ke depan</option>
                    <option value="Eksplorasi Santai">Eksplorasi Santai / Investasi</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#12110E] py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#A8814F] hover:shadow-lg"
              >
                Kirim Kriteria ke Private Desk &rarr;
              </button>

              <p className="text-[11px] text-[#6D675D] text-center">
                Data Anda hanya dipakai untuk mencarikan rumah dan tidak pernah dibagikan ke pihak lain.{' '}
                <Link href="/privasi" className="underline hover:text-[#14130F]">
                  Kebijakan Privasi
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
