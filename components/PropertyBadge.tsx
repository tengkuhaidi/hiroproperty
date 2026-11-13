import React from 'react';

/**
 * Transaction badge (FOR SALE / FOR RENT) and category badge shown over
 * property photos. Shared so all four call sites (home, catalog, detail)
 * use one definition instead of four copy-pasted class strings.
 * Both use the same neutral treatment - the text says what matters,
 * not an arbitrary accent color on one tag over the other.
 */
const BADGE_CLASS =
  'rounded-md bg-[#090A0B]/80 px-2.5 py-1 text-[10px] tracking-wide uppercase text-white/90 border border-white/10';

export function TransactionBadge({ tag }: { tag?: string }) {
  return <span className={BADGE_CLASS}>{tag || 'FOR SALE'}</span>;
}

export function CategoryBadge({ category }: { category: string }) {
  return <span className={BADGE_CLASS}>{category}</span>;
}
