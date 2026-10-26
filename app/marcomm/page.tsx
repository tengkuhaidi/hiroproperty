'use client';

import React, { useState, useEffect } from 'react';

interface Expense {
  id: string;
  expense_date: string;
  category: string;
  title: string;
  amount_idr: number;
  receipt_url: string | null;
  paid_by: string;
  payment_method: string;
  lpj_status: string;
  notes: string | null;
}

export default function MarcommWalletPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    expense_date: new Date().toISOString().split('T')[0],
    category: 'Meta Ads',
    title: '',
    amount_idr: '',
    receipt_url: '',
    paid_by: 'Jendro (Marcomm Lead)',
    payment_method: 'Corporate BCA',
    notes: '',
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/marcomm').then((r) => r.json()),
      fetch('/api/marcomm?mode=summary').then((r) => r.json()),
    ])
      .then(([expData, sumData]: [any, any]) => {
        if (expData && expData.expenses) setExpenses(expData.expenses);
        if (sumData) setSummary(sumData);
      })
      .catch((err) => console.error('Error loading marcomm wallet:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/marcomm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({
          expense_date: new Date().toISOString().split('T')[0],
          category: 'Meta Ads',
          title: '',
          amount_idr: '',
          receipt_url: '',
          paid_by: 'Jendro (Marcomm Lead)',
          payment_method: 'Corporate BCA',
          notes: '',
        });
        loadData();
      } else {
        const err = await res.json() as any;
        alert(err.error || 'Gagal menyimpan pengeluaran');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] pt-32 pb-24 text-[#14130F]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#14130F]/15 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#14130F]/60">
                Cashflow & LPJ Budget Marcomm · Cloudflare R2 & D1
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Marcomm Wallet & <span className="italic font-normal">Realisasi Anggaran</span>
            </h1>
            <p className="mt-2 text-sm text-[#14130F]/70">
              Input pengeluaran harian iklan & event lewat HP, simpan struk ke Cloudflare R2, auto-rekap laporan pertanggungjawaban (LPJ).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-full bg-[#14130F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F4F1EC] shadow-md transition hover:bg-[#14130F]/80"
          >
            + Catat Pengeluaran / Struk
          </button>
        </div>

        {/* Financial KPI Cards */}
        {summary && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Total Realisasi Anggaran</span>
              <div className="mt-2 font-display text-3xl font-bold text-[#14130F]">
                {formatIDR(summary.total_spend || 0)}
              </div>
              <span className="mt-2 block text-xs text-purple-700 font-medium">Bulan Berjalan (Q4 2026)</span>
            </div>

            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Alokasi Terbesar</span>
              <div className="mt-2 font-display text-2xl font-bold text-[#14130F]">
                {summary.by_category?.[0]?.category || 'Meta Ads'}
              </div>
              <span className="mt-2 block text-xs text-[#14130F]/60">
                {formatIDR(summary.by_category?.[0]?.total || 0)}
              </span>
            </div>

            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Status Verifikasi LPJ</span>
              <div className="mt-2 font-display text-2xl font-bold text-emerald-700">
                100% On-Track
              </div>
              <span className="mt-2 block text-xs text-[#14130F]/60">
                Siap export PDF lampiran bukti bayar
              </span>
            </div>
          </div>
        )}

        {/* Expenses List */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#14130F]/10 bg-white shadow-sm">
          <div className="border-b border-[#14130F]/10 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-[#14130F]">
              Buku Kas Pengeluaran Promosi & Event
            </h3>
            <span className="text-xs text-[#14130F]/60">
              Bukti bayar terenkripsi di Cloudflare R2
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#14130F]/10 bg-[#14130F]/5 text-[11px] font-bold uppercase tracking-wider text-[#14130F]/70">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Kategori & Keterangan</th>
                  <th className="px-6 py-4">Nominal</th>
                  <th className="px-6 py-4">Metode Bayar</th>
                  <th className="px-6 py-4">PIC (Paid By)</th>
                  <th className="px-6 py-4">Bukti Struk (R2)</th>
                  <th className="px-6 py-4">Status LPJ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14130F]/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs uppercase tracking-widest text-[#14130F]/50">
                      Memuat data cashflow...
                    </td>
                  </tr>
                ) : expenses.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-[#F4F1EC]/40">
                    <td className="px-6 py-4 text-xs font-semibold text-[#14130F]">
                      {item.expense_date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#14130F]">{item.title}</div>
                      <span className="inline-block rounded bg-[#14130F]/5 px-2 py-0.5 text-[11px] font-medium text-[#14130F]/70 mt-1">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display font-bold text-[#14130F]">
                      {formatIDR(item.amount_idr)}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#14130F]/80">
                      {item.payment_method}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-[#14130F]">
                      {item.paid_by}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {item.receipt_url ? (
                        <a
                          href={item.receipt_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-purple-700 hover:underline"
                        >
                          Lihat Struk ↗
                        </a>
                      ) : (
                        <span className="text-[#14130F]/40 italic">Tanpa Struk</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-purple-800">
                        {item.lpj_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Catat Pengeluaran */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-[#14130F]">
                Input Pengeluaran Marcomm
              </h3>
              <p className="mt-1 text-xs text-[#14130F]/60">
                Pencatatan realisasi budget langsung dari HP ke edge D1.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Judul Pengeluaran *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    placeholder="Contoh: Cetak Brosur A4 500 lembar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Kategori Anggaran</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    >
                      <option value="Meta Ads">Meta Ads (FB/IG)</option>
                      <option value="Billboard/OOH">Billboard / OOH</option>
                      <option value="Event & Gathering">Event & Gathering VIP</option>
                      <option value="Influencer/KOL">Influencer / KOL</option>
                      <option value="Print & Merchandise">Print & Merchandise</option>
                      <option value="Misc">Operasional Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Nominal (IDR) *</label>
                    <input
                      required
                      type="number"
                      value={formData.amount_idr}
                      onChange={(e) => setFormData({ ...formData, amount_idr: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                      placeholder="2500000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Tanggal Transaksi</label>
                    <input
                      type="date"
                      value={formData.expense_date}
                      onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Metode Bayar</label>
                    <select
                      value={formData.payment_method}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    >
                      <option value="Corporate BCA">Corporate BCA</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Petty Cash">Petty Cash</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">URL / Link Struk Bukti Bayar</label>
                  <input
                    type="url"
                    value={formData.receipt_url}
                    onChange={(e) => setFormData({ ...formData, receipt_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    placeholder="https://.../receipt.jpg"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-lg border border-[#14130F]/20 px-5 py-2.5 font-semibold text-[#14130F]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#14130F] px-5 py-2.5 font-semibold text-white shadow-md hover:bg-black"
                  >
                    Catat ke Kas
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
