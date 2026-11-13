import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi · Hiro Property',
  description: 'Kebijakan privasi dan perlindungan data pribadi sesuai UU No. 27 Tahun 2022 (UU PDP).',
};

export default function PrivasiPage() {
  return (
    <div className="bg-[#F4F1EC] pt-32 pb-40 text-[#14130F]">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#6D675D]">
            <li>
              <Link href="/" className="hover:text-[#14130F] transition-colors">
                Index
              </Link>
            </li>
            <li className="text-[#14130F]/20">/</li>
            <li className="text-[#14130F]">Kebijakan Privasi</li>
          </ol>
        </nav>

        <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] text-[#14130F] mb-6">
          Privasi Anda
        </h1>

        <div className="text-base leading-relaxed text-[#6D675D] space-y-6 mb-12">
          <p className="text-lg text-[#14130F]">
            Kerahasiaan adalah bagian dari cara kami bekerja. Halaman ini menjelaskan data apa yang kami kumpulkan, untuk apa, dan bagaimana Anda dapat mengendalikannya sesuai Undang-Undang Perlindungan Data Pribadi (UU No. 27 Tahun 2022).
          </p>
        </div>

        <div className="border-t border-[#14130F]/15 divide-y divide-[#14130F]/10 text-sm leading-relaxed text-[#6D675D]">
          {/* 1. Data yang Dikumpulkan */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">1. Data yang Dikumpulkan</h3>
            <p>
              Kami hanya mengumpulkan data yang Anda berikan secara sukarela melalui formulir website atau percakapan WhatsApp:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nama lengkap atau nama sapaan.</li>
              <li>Nomor WhatsApp dan/atau alamat email untuk korespondensi.</li>
              <li>Kriteria properti pencarian (kawasan, rentang budget, preferensi tata ruang).</li>
              <li>Informasi properti bagi pemilik yang menitipkan penjualan (kawasan umum, spesifikasi dasar).</li>
            </ul>
          </div>

          {/* 2. Tujuan Penggunaan */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">2. Tujuan Pemrosesan Data</h3>
            <p>
              Data Anda digunakan semata-mata untuk:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Mencarikan portofolio properti yang sesuai dengan kriteria pribadi Anda.</li>
              <li>Menghubungi Anda kembali untuk konfirmasi jadwal kunjungan (*private viewing*).</li>
              <li>Menyampaikan laporan penilaian harga properti tertulis bagi pemilik.</li>
            </ul>
          </div>

          {/* 3. Pemroses Data */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">3. Pemroses &amp; Kerahasiaan Sistem</h3>
            <p>
              Data diproses secara internal oleh tim principal Hiro Property dan infrastruktur asisten digital resmi kami yang terenkripsi. Kami tidak menggunakan broker data pihak ketiga.
            </p>
          </div>

          {/* 4. Pembagian Data */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">4. Pembagian Data ke Pihak Luar</h3>
            <p>
              <strong>Data Anda tidak pernah dijual atau disewakan ke pihak lain.</strong> Informasi hanya diteruskan kepada pemilik rumah atau rekanan notaris/PPAT yang ditunjuk bila Anda secara eksplisit meminta pengajuan penawaran atau pembuatan akta.
            </p>
          </div>

          {/* 5. Hak Pemilik Data */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">5. Hak Anda (Akses &amp; Penghapusan)</h3>
            <p>
              Sesuai UU PDP, Anda berhak sewaktu-waktu meminta salinan data, pembaharuan, atau penghapusan menyeluruh data kontak Anda dari buku catatan kami cukup dengan mengirim pesan ke Private Desk.
            </p>
          </div>

          {/* 6. Kontak Pengelola Data */}
          <div className="py-8">
            <h3 className="font-display text-xl text-[#14130F] mb-3">6. Kontak Pengelola Data</h3>
            <p>
              PT Hiro Properti Indonesia<br />
              Attn: Tim Kepatuhan Privasi (Private Client Desk)<br />
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
