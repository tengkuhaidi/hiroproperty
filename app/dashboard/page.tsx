'use client';

import React, { useState, useEffect } from 'react';

interface Lead {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  source: string;
  campaign_name: string;
  preferred_location: string;
  budget_range: string;
  status: string;
  sales_rep: string;
  guest_age_group: string;
  guest_domicile: string;
  notes: string | null;
  created_at: number;
}

export default function MarketingDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    source: 'Meta Ads',
    campaign_name: 'IG_Luxury_PondokIndah_Q4',
    preferred_location: 'Mayfair Enclave',
    budget_range: 'IDR 15 - 20 M',
    sales_rep: 'Sales Citra',
    guest_age_group: '36-45',
    guest_domicile: 'Jakarta Selatan',
    notes: '',
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/leads').then((r) => r.json()),
      fetch('/api/leads?mode=analytics').then((r) => r.json()),
    ])
      .then(([leadData, analData]: [any, any]) => {
        if (leadData && leadData.leads) setLeads(leadData.leads);
        if (analData) setAnalytics(analData);
      })
      .catch((err) => console.error('Error loading dashboard:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({
          client_name: '',
          client_phone: '',
          client_email: '',
          source: 'Meta Ads',
          campaign_name: 'IG_Luxury_PondokIndah_Q4',
          preferred_location: 'Mayfair Enclave',
          budget_range: 'IDR 15 - 20 M',
          sales_rep: 'Sales Citra',
          guest_age_group: '36-45',
          guest_domicile: 'Jakarta Selatan',
          notes: '',
        });
        loadData();
      } else {
        const err = await res.json() as any;
        alert(err.error || 'Gagal menyimpan leads');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] pt-32 pb-24 text-[#14130F]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#14130F]/15 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#14130F]/60">
                Marketing & Leads Engine · Edge SQL Analytics
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Campaign Analytics & <span className="italic font-normal">Demographics</span>
            </h1>
            <p className="mt-2 text-sm text-[#14130F]/70">
              Menggantikan Google Looker Studio lambat. Kueri cepat sub-5ms di edge untuk rekap visit tamu & konversi sales.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-full bg-[#14130F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F4F1EC] shadow-md transition hover:bg-[#14130F]/80"
          >
            + Input Lead / Walk-in
          </button>
        </div>

        {/* Analytics KPI Cards */}
        {analytics && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Total Prospek / Leads</span>
              <div className="mt-2 font-display text-4xl font-bold text-[#14130F]">
                {analytics.total}
              </div>
              <span className="mt-2 block text-xs text-emerald-600 font-medium">Realtime dari D1 Database</span>
            </div>

            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Top Inbound Channel</span>
              <div className="mt-2 font-display text-2xl font-bold text-[#14130F]">
                {analytics.bySource?.[0]?.source || 'Meta Ads'}
              </div>
              <span className="mt-2 block text-xs text-[#14130F]/60">
                {analytics.bySource?.[0]?.count || 0} prospek masuk
              </span>
            </div>

            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Demografi Usia Tamu</span>
              <div className="mt-2 font-display text-2xl font-bold text-[#14130F]">
                {analytics.byAge?.[0]?.guest_age_group || '36-45'} th
              </div>
              <span className="mt-2 block text-xs text-[#14130F]/60">Segmen pembeli primer HNW</span>
            </div>

            <div className="rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#14130F]/60">Domisili Dominan</span>
              <div className="mt-2 font-display text-2xl font-bold text-[#14130F]">
                {analytics.byDomicile?.[0]?.guest_domicile || 'Jakarta Selatan'}
              </div>
              <span className="mt-2 block text-xs text-[#14130F]/60">Target OOH & Ads Geofence</span>
            </div>
          </div>
        )}

        {/* Leads Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#14130F]/10 bg-white shadow-sm">
          <div className="border-b border-[#14130F]/10 px-6 py-4">
            <h3 className="font-display text-lg font-bold text-[#14130F]">
              Pipeline Rekap Prospek & Follow-Up Sales
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#14130F]/10 bg-[#14130F]/5 text-[11px] font-bold uppercase tracking-wider text-[#14130F]/70">
                <tr>
                  <th className="px-6 py-4">Nama Klien</th>
                  <th className="px-6 py-4">Kontak (WA/Email)</th>
                  <th className="px-6 py-4">Sumber / Kampanye</th>
                  <th className="px-6 py-4">Preferensi Unit & Budget</th>
                  <th className="px-6 py-4">Demografi Tamu</th>
                  <th className="px-6 py-4">Sales Rep</th>
                  <th className="px-6 py-4">Status Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14130F]/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs uppercase tracking-widest text-[#14130F]/50">
                      Memuat data leads...
                    </td>
                  </tr>
                ) : leads.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-[#F4F1EC]/40">
                    <td className="px-6 py-4 font-semibold text-[#14130F]">
                      {l.client_name}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="font-medium text-[#14130F]">{l.client_phone}</div>
                      <div className="text-[#14130F]/60">{l.client_email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="rounded-md bg-[#14130F]/5 px-2 py-1 font-semibold text-[#14130F]">
                        {l.source}
                      </span>
                      <div className="mt-1 text-[11px] text-[#14130F]/60">{l.campaign_name}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="font-medium text-[#14130F]">{l.preferred_location}</div>
                      <div className="text-[#14130F]/70 font-semibold">{l.budget_range}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>Usia: <strong>{l.guest_age_group}</strong></div>
                      <div className="text-[#14130F]/60">Kota: {l.guest_domicile}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#14130F]">
                      {l.sales_rep}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-blue-800">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Input Lead */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-[#14130F]">
                Input Prospek Baru
              </h3>
              <p className="mt-1 text-xs text-[#14130F]/60">
                Data langsung tersimpan di Cloudflare D1 & mengupdate metrik analitik.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Nama Klien *</label>
                  <input
                    required
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    placeholder="Contoh: Bpk. Bambang Soediro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Nomor WhatsApp *</label>
                    <input
                      required
                      type="text"
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                      placeholder="0812xxxx"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Email Klien</label>
                    <input
                      type="email"
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                      placeholder="klien@corp.id"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Sumber Lead</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    >
                      <option value="Meta Ads">Meta Ads (FB/IG)</option>
                      <option value="Walk-in">Walk-in Show Unit</option>
                      <option value="Website Form">Website Form</option>
                      <option value="WhatsApp">WhatsApp Inbound</option>
                      <option value="Agent">Agent Broker</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Sales Penanggung Jawab</label>
                    <input
                      type="text"
                      value={formData.sales_rep}
                      onChange={(e) => setFormData({ ...formData, sales_rep: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Kelompok Usia</label>
                    <select
                      value={formData.guest_age_group}
                      onChange={(e) => setFormData({ ...formData, guest_age_group: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    >
                      <option value="25-35">25 - 35 Tahun</option>
                      <option value="36-45">36 - 45 Tahun</option>
                      <option value="46-60">46 - 60 Tahun</option>
                      <option value=">60">&gt; 60 Tahun</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#14130F]/70">Kota Domisili</label>
                    <input
                      type="text"
                      value={formData.guest_domicile}
                      onChange={(e) => setFormData({ ...formData, guest_domicile: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-[#14130F]/20 p-2.5 text-sm focus:border-[#14130F] focus:outline-none"
                    />
                  </div>
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
                    Simpan ke D1
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
