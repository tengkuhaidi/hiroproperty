'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  cover_image: string;
  author: string;
  views: number;
  created_at: number;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: any) => {
        if (data && data.articles) setArticles(data.articles);
      })
      .catch((err) => console.error('Failed to load articles:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Market Insight', 'Legal & Advisory', 'Architecture'];

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F4F1EC] pt-32 pb-24 text-[#14130F]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 border-b border-[#14130F]/15 pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#14130F]/60">
            Hiro Editorial Desk · Cloudflare D1 Live
          </span>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Journal & <span className="italic font-normal">Market Insights</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#14130F]/70">
            Publikasi berkala analisis properti privat, kepatuhan tata kota BPN, dan tren arsitektur residensial bernilai tinggi.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#14130F] text-[#F4F1EC]'
                    : 'border border-[#14130F]/20 bg-white/50 text-[#14130F]/80 hover:bg-[#14130F]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm uppercase tracking-widest text-[#14130F]/50">
            Mengambil data dari Cloudflare D1 Edge...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#14130F]/60">
            Belum ada artikel pada kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#14130F]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#14130F]/60">
                    <span className="rounded-full bg-[#14130F]/5 px-3 py-1 font-semibold text-[#14130F]">
                      {item.category}
                    </span>
                    <span>{item.views} Reads</span>
                  </div>

                  <h2 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight transition-colors group-hover:text-[#B39359]">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-[#14130F]/75">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#14130F]/10 pt-4 flex items-center justify-between text-xs text-[#14130F]/60">
                  <span>Oleh <strong className="text-[#14130F]">{item.author}</strong></span>
                  <span className="font-semibold text-[#14130F] group-hover:underline">
                    Baca Analisis Lengkap →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
