'use client';

import React, { useState, useEffect } from 'react';

interface Unit {
  id: string;
  cluster: string;
  unit_number: string;
  type_name: string;
  land_area_sqm: number;
  building_area_sqm: number;
  price_idr: number;
  status: 'AVAILABLE' | 'HOLD' | 'BOOKED' | 'SOLD';
  held_by_sales: string | null;
  buyer_name: string | null;
}

export default function MasterstockPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [summary, setSummary] = useState<{ status: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState('All');
  const [actingId, setActingId] = useState<string | null>(null);
  const [salesName, setSalesName] = useState('Sales Internal');

  const loadUnits = () => {
    setLoading(true);
    fetch('/api/units')
      .then((res) => res.json())
      .then((data: any) => {
        if (data && data.units) setUnits(data.units);
        if (data && data.summary) setSummary(data.summary);
      })
      .catch((err) => console.error('Failed to load masterstock:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUnits();
  }, []);

  const handleAction = async (unit_id: string, action: 'HOLD' | 'RELEASE' | 'BOOK' | 'SELL') => {
    setActingId(unit_id);
    try {
      const res = await fetch('/api/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_id,
          action,
          sales_name: salesName,
          buyer_name: action === 'HOLD' ? 'Prospek Sales' : undefined,
        }),
      });
      const result = await res.json() as any;
      if (!res.ok) {
        alert(result.error || 'Aksi gagal dieksekusi.');
      } else {
        loadUnits();
      }
    } catch (err: any) {
      alert('Network error: ' + err.message);
    } finally {
      setActingId(null);
    }
  };

  const clusters = ['All', ...Array.from(new Set(units.map((u) => u.cluster)))];
  const filteredUnits = selectedCluster === 'All'
    ? units
    : units.filter((u) => u.cluster === selectedCluster);

  const formatIDR = (val: number) => {
    return 'Rp ' + (val / 1000000000).toFixed(2) + ' M';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500/15 text-emerald-800 border-emerald-300';
      case 'HOLD':
        return 'bg-amber-500/15 text-amber-800 border-amber-300';
      case 'BOOKED':
        return 'bg-indigo-500/15 text-indigo-800 border-indigo-300';
      case 'SOLD':
        return 'bg-rose-500/15 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] pt-32 pb-24 text-[#14130F]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#14130F]/15 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#14130F]/60">
                Masterstock Online · Cloudflare D1 Real-Time Sync
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Unit Inventory & <span className="italic font-normal">Atomic Lock</span>
            </h1>
            <p className="mt-2 text-sm text-[#14130F]/70">
              Menggantikan PDF denah & grup WhatsApp. Sales admin mengunci status unit tanpa risiko double-booking.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex flex-wrap items-center gap-3">
            {summary.map((s) => (
              <div
                key={s.status}
                className="flex items-center gap-2 rounded-xl border border-[#14130F]/10 bg-white px-4 py-2.5 shadow-sm"
              >
                <span className="text-xs uppercase font-semibold tracking-wider text-[#14130F]/60">
                  {s.status}:
                </span>
                <span className="font-display text-lg font-bold text-[#14130F]">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-[#14130F]/10 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#14130F]/60 mr-2">
              Cluster:
            </span>
            {clusters.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCluster(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCluster === c
                    ? 'bg-[#14130F] text-[#F4F1EC]'
                    : 'bg-[#14130F]/5 text-[#14130F] hover:bg-[#14130F]/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#14130F]/60">
              Sales Operator:
            </label>
            <input
              type="text"
              value={salesName}
              onChange={(e) => setSalesName(e.target.value)}
              className="rounded-lg border border-[#14130F]/20 bg-[#F4F1EC]/50 px-3 py-1.5 text-xs font-semibold text-[#14130F] focus:border-[#14130F] focus:outline-none"
            />
          </div>
        </div>

        {/* Masterstock Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#14130F]/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#14130F]/10 bg-[#14130F]/5 text-[11px] font-bold uppercase tracking-wider text-[#14130F]/70">
                <tr>
                  <th className="px-6 py-4">Unit No.</th>
                  <th className="px-6 py-4">Cluster & Tipe</th>
                  <th className="px-6 py-4">LT / LB</th>
                  <th className="px-6 py-4">Harga Unit</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Keterangan Sales / Buyer</th>
                  <th className="px-6 py-4 text-right">Aksi Operasional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14130F]/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs uppercase tracking-widest text-[#14130F]/50">
                      Memuat Masterstock D1 Edge...
                    </td>
                  </tr>
                ) : filteredUnits.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-[#F4F1EC]/40">
                    <td className="px-6 py-4 font-display text-base font-bold text-[#14130F]">
                      {u.unit_number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#14130F]">{u.type_name}</div>
                      <div className="text-xs text-[#14130F]/60">{u.cluster}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-[#14130F]/80">
                      {u.land_area_sqm} m² / {u.building_area_sqm} m²
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#14130F]">
                      {formatIDR(u.price_idr)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${getStatusBadge(u.status)}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#14130F]/70">
                      {u.held_by_sales ? (
                        <span>
                          Locked by: <strong className="text-[#14130F]">{u.held_by_sales}</strong>
                          {u.buyer_name && <span className="block text-[#14130F]/60">({u.buyer_name})</span>}
                        </span>
                      ) : (
                        <span className="text-[#14130F]/40 italic">Open for lock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {u.status === 'AVAILABLE' && (
                          <button
                            disabled={actingId === u.id}
                            onClick={() => handleAction(u.id, 'HOLD')}
                            className="rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-50"
                          >
                            Lock (Hold)
                          </button>
                        )}
                        {u.status === 'HOLD' && (
                          <>
                            <button
                              disabled={actingId === u.id}
                              onClick={() => handleAction(u.id, 'BOOK')}
                              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
                            >
                              Book
                            </button>
                            <button
                              disabled={actingId === u.id}
                              onClick={() => handleAction(u.id, 'RELEASE')}
                              className="rounded-lg border border-[#14130F]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#14130F] shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                            >
                              Release
                            </button>
                          </>
                        )}
                        {u.status === 'BOOKED' && (
                          <button
                            disabled={actingId === u.id}
                            onClick={() => handleAction(u.id, 'SELL')}
                            className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-50"
                          >
                            Mark Sold (AJB)
                          </button>
                        )}
                        {u.status === 'SOLD' && (
                          <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                            Closed / Akta
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
