import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami · Hiro Property',
  description: 'Kecil, dengan sengaja. Penasihat transaksi properti privat untuk rumah bernilai di atas Rp5 Miliar.',
};

export default function TentangPage() {
  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#6D675D]">
            <li>
              <Link href="/" className="hover:text-[#14130F] transition-colors">
                Index
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li className="text-[#14130F]">Tentang Kami</li>
          </ol>
        </nav>

        {/* Section 1: Pembuka */}
        <div className="mb-20 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#A8814F] mb-3 font-semibold">
            About Hiro Property
          </p>
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] text-[#14130F] mb-6">
            Kecil, dengan <span className="italic">sengaja</span>.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6D675D]">
            Hiro didirikan oleh para praktisi pengembangan properti, penjualan, dan teknologi, yang percaya bahwa rumah bernilai miliaran layak didampingi dengan teliti, bukan dipasarkan secara massal. Kami bekerja dengan sedikit rumah dan sedikit klien dalam satu waktu, dan kami mengenal setiap rumah yang kami tawarkan.
          </p>
        </div>

        {/* Section 2: Yang Kami Tangani */}
        <div className="grid gap-8 md:grid-cols-3 border-y border-[#14130F]/15 py-14 mb-20">
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Pembelian</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Mencarikan rumah sesuai kriteria Anda, termasuk dari koleksi privat yang tidak tampil di ruang publik.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Penjualan</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Penilaian harga berbasis transaksi riil, pemasaran terarah tanpa mengumbar privasi, dan pendampingan hingga akta jual beli.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Kawasan</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Fokus mendalam pada Jakarta dan sekitarnya (Menteng, Pondok Indah, Bintaro, BSD) serta Bandung (Cigadung &amp; Dago).
            </p>
          </div>
        </div>

        {/* Section 3: Cara Kami Bekerja */}
        <div className="mb-24 space-y-6 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl text-[#14130F]">Cara Kami Bekerja</h2>
          <div className="space-y-4 text-sm text-[#6D675D]">
            <p>
              <strong className="text-[#14130F]">Kami jelaskan harganya.</strong> Setiap rumah disertai perbandingan harga per meter persegi di kawasannya secara transparan.
            </p>
            <p>
              <strong className="text-[#14130F]">Kami jaga privasi Anda.</strong> Alamat pemilik tidak dipublikasikan ke publik; data pencari rumah tidak pernah dijual atau diserahkan ke pihak ketiga.
            </p>
            <p>
              <strong className="text-[#14130F]">Kami cepat, tanpa terburu-buru.</strong> Pertanyaan direspon dengan sigap oleh asisten digital dan principal, namun keputusan akhir selalu di tangan Anda.
            </p>
          </div>
        </div>

        {/* Section 4: Legalitas */}
        <div className="rounded-2xl border border-[#14130F]/15 bg-white p-8 md:p-10 mb-24">
          <h3 className="font-display text-2xl text-[#14130F] mb-4">Legalitas &amp; Kelembagaan</h3>
          <p className="text-sm text-[#6D675D] leading-relaxed mb-6">
            Seluruh transaksi dan aktivitas perantara properti bernaung di bawah entitas resmi berbadan hukum:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-xs font-mono text-[#14130F]">
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Badan Hukum</span>
              <span>PT Hiro Properti Indonesia</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">NIB</span>
              <span>1205240098231</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Perizinan (SIU-P4)</span>
              <span>Operasional Terdaftar</span>
            </div>
            <div className="border-b border-[#14130F]/10 pb-2">
              <span className="text-[#6D675D] block uppercase">Kemitraan Notariat</span>
              <span>Rekan Notaris / PPAT Terakreditasi</span>
            </div>
          </div>
        </div>

        {/* Section 5: Mari Bicara */}
        <div className="border-t border-[#14130F]/15 pt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl text-[#14130F] mb-2">Mari bicara.</h2>
            <p className="text-sm text-[#6D675D]">
              Tentang rumah yang Anda cari, atau rumah yang ingin Anda lepas.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6285176828199?text=Selamat%20siang%20Hiro%20Property,%20saya%20ingin%20berdiskusi%20dengan%20Private%20Desk."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#12110E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#A8814F] transition-all shadow-md"
            >
              Hubungi Private Desk &rarr;
            </a>
            <Link
              href="/jual"
              className="rounded-full border border-[#14130F]/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14130F] hover:bg-black/5 transition-colors"
            >
              Jual Bersama Hiro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
