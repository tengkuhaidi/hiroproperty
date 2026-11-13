import React from 'react';

/**
 * Transaction badge (FOR SALE / FOR RENT) and category badge shown over
 * property photos. Shared so all four call sites (home, catalog, detail)
 * use one definition instead of four copy-pasted class strings.
 */
export function TransactionBadge({ tag }: { tag?: string }) {
  const isRent = tag === 'FOR RENT';
  return (
    <span
      className={`rounded-md px-2.5 py-1 text-[10px] tracking-wide uppercase border ${
        isRent
          ? 'bg-[#090A0B]/80 text-white/90 border-white/10'
          : 'bg-[#090A0B]/80 text-[#D4AF37] border-[#D4AF37]/30'
      }`}
    >
      {tag || 'FOR SALE'}
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="rounded-md bg-[#090A0B]/80 px-2.5 py-1 text-[10px] tracking-wide uppercase text-white/90 border border-white/10">
      {category}
    </span>
  );
}
