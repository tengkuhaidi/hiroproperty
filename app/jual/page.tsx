import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Jual Bersama Hiro · Hiro Property',
  description: 'Rumah Anda, dijual dengan cara yang pantas. Kerahasiaan penuh, penilaian jujur, dan komisi transparan.',
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
            <li className="text-[#14130F]">Jual Bersama Hiro</li>
          </ol>
        </nav>

        {/* Section 1: Hero */}
        <div className="mb-20 max-w-3xl">
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] text-[#14130F] mb-6">
            Rumah Anda, dijual dengan cara yang <span className="italic">pantas</span>.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6D675D]">
            Kami bekerja dengan sedikit pemilik dalam satu waktu, supaya setiap rumah mendapat perhatian penuh, harga yang tepat, dan pembeli yang serius.
          </p>
        </div>

        {/* Section 2: Yang Anda Dapatkan */}
        <div className="grid gap-8 md:grid-cols-3 border-y border-[#14130F]/15 py-14 mb-20">
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Penilaian yang jujur.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Harga ditentukan dari pembanding transaksi di kawasan Anda, bukan dari angka yang ingin didengar.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Pemasaran yang terarah.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Foto dan film profesional, ditunjukkan kepada pembeli dan agen mitra yang sudah kami saring.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-[#14130F] mb-2">Kerahasiaan penuh.</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Alamat tidak pernah dipublikasikan. Kunjungan hanya dengan janji temu dan pendampingan kami.
            </p>
          </div>
        </div>

        {/* Section 3 & 4: Proses & Biaya */}
        <div className="grid gap-16 md:grid-cols-12 mb-24">
          <div className="md:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-[#14130F]">
              Prosesnya
            </h2>
            <ol className="space-y-4 border-l border-[#14130F]/15 pl-6 text-sm text-[#6D675D]">
              <li>
                <strong className="text-[#14130F] block">1. Percakapan awal</strong>
                Di rumah Anda atau di tempat pilihan Anda secara santai dan rahasia.
              </li>
              <li>
                <strong className="text-[#14130F] block">2. Penilaian &amp; strategi harga</strong>
                Tertulis, didasarkan pada perbandingan transaksi riil di sekitarnya.
              </li>
              <li>
                <strong className="text-[#14130F] block">3. Perjanjian kerja sama</strong>
                Jangka waktu dan komisi disepakati secara transparan di atas kertas.
              </li>
              <li>
                <strong className="text-[#14130F] block">4. Pemasaran pribadi</strong>
                Kurasi pembeli terpilih hingga penandatanganan akta jual beli di hadapan notaris.
              </li>
            </ol>
          </div>

          <div className="md:col-span-6 rounded-2xl border border-[#14130F]/15 bg-white p-8 space-y-4">
            <h3 className="font-display text-2xl text-[#14130F]">Soal Biaya &amp; Komisi</h3>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              <strong>Tidak ada biaya di muka.</strong> Komisi hanya dibayarkan saat rumah Anda resmi berpindah tangan, sesuai perjanjian tertulis.
            </p>
            <p className="text-sm leading-relaxed text-[#6D675D]">
              Besaran komisi standar adalah <strong>2,5%</strong> setelah disepakati bersama (mengikuti kelaziman industri Permendag 51/2017 rentang 2–5%).
            </p>
            <div className="pt-4 border-t border-[#14130F]/10">
              <a
                href="https://wa.me/6285176828199?text=Selamat%20siang%20Hiro%20Property,%20saya%20pemilik%20dan%20ingin%20berdiskusi%20titip%20jual%20rumah."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#12110E] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#A8814F] transition-all"
              >
                Minta Penilaian Pribadi via WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Section 6: FAQ */}
        <div className="border-t border-[#14130F]/15 pt-16">
          <h2 className="font-display text-3xl text-[#14130F] mb-10">Pertanyaan Umum</h2>
          <div className="grid gap-8 md:grid-cols-2 text-sm text-[#6D675D]">
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Apakah harus eksklusif?</h4>
              <p>Tidak wajib. Namun titip jual eksklusif memungkinkan kami berinvestasi optimal pada produksi foto, film sinematik, dan kurasi pembeli premium.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Apakah alamat rumah saya akan ditayangkan?</h4>
              <p>Tidak pernah. Website hanya menampilkan kawasan umum. Alamat persis hanya diberikan kepada pembeli yang jadwal kunjungannya sudah diverifikasi.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Berapa lama hingga terjual?</h4>
              <p>Bergantung pada ketepatan harga dan daya serap kawasan. Kami sampaikan perkiraan yang jujur setelah meninjau rumah Anda.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#14130F] mb-1">Bagaimana bila saya berubah pikiran?</h4>
              <p>Ketentuannya tertulis jelas di perjanjian awal, termasuk tata cara mengakhirinya tanpa komplikasi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
