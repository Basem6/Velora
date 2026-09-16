'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { WishlistContext } from '@/app/context/WishlistContext';
import { ToastContext } from '@/app/context/ToastContext';

export default function WishlistPage() {
  const { items, removeItem } = useContext(WishlistContext) || { items: [], removeItem: () => {} };
  const { showToast } = useContext(ToastContext) || { showToast: () => {} };

  return (
    <section className="min-h-screen px-5 py-18 text-stone-950 md:px-12 md:py-26">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 border-b border-stone-200 pb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-stone-500">The edit</p>
          <h1 className="font-serif text-5xl leading-none md:text-7xl">Wishlist</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-stone-500">
            Objects you have saved for later.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="border  border-stone-200 bg-white px-8 py-16 text-center">
            <div className="mb-5 flex justify-center">
              <Heart size={40} strokeWidth={1} className="text-stone-500" />
            </div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Your list is empty</p>
            <Link href="/products/clothing" className="inline-flex min-h-11 items-center justify-center border border-stone-950 px-6 text-[11px] uppercase tracking-[0.2em] text-stone-950 transition hover:bg-stone-950 hover:text-white">
              Discover pieces
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="border border-stone-200 bg-white">
                <div className="relative aspect-3/4 overflow-hidden border-b border-stone-200 bg-stone-50">
                  <Image src={item.image || item.img} alt={item.name} fill sizes="33vw" className="object-cover transition duration-700 hover:scale-105" style={{ objectPosition: item.position }} />
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => {
                      removeItem(item.id);
                      showToast('Removed from wishlist');
                    }}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white bg-white text-stone-700 transition hover:bg-stone-950 hover:text-white"
                  >
                    <X size={14} strokeWidth={1.4} />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">{item.category}</p>
                      <h2 className="font-medium text-stone-950">{item.name}</h2>
                    </div>
                    <span className="shrink-0 text-sm text-stone-950">${item.price}</span>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link href={`/products/${item.category?.toLowerCase()}/${item.id}`} className="flex-1 border border-stone-950 bg-stone-950 px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-stone-950">
                      View
                    </Link>
                    <button type="button" className="flex min-h-12 items-center justify-center border border-stone-300 px-4 text-stone-950 transition hover:border-stone-950">
                      <ShoppingBag size={16} strokeWidth={1.2} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
