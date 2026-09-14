'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useMemo, useState } from 'react';
import { Minus, Plus, Trash2, Lock, ShoppingBag } from 'lucide-react';
import { CartContext, getPriceAfterDiscount } from '@/app/context/CartContext';
import ConfirmDialog from '@/app/components/ui/ConfirmDialog';

export default function CartPage() {
    const { state, dispatch } = useContext(CartContext) || { state: { items: [] }, dispatch: () => {} };
    const [promoCode, setPromoCode] = useState('');
    const [removeIndex, setRemoveIndex] = useState(null);

    const items = useMemo(() => {
        return Array.isArray(state.items) ? state.items.filter((item) => item?.addtocard === true) : [];
    }, [state.items]);

    const subtotal = useMemo(() => {
        return items.reduce((sum, item) => {
            const unitPrice = getPriceAfterDiscount(item.price, item.Discount);
            return sum + unitPrice * Number(item.countincart || 1);
        }, 0);
    }, [items]);

    const shipping = subtotal > 100 ? 0 : 12;
    const total = subtotal + shipping;

    const removeItem = (index) => {
        setRemoveIndex(index);
    };

    const confirmRemove = () => {
        if (removeIndex !== null) {
            dispatch({ type: 'romvefromcart', payload: removeIndex });
        }
        setRemoveIndex(null);
    };

    const updateQuantity = (type, index) => {
        if (type === 'plus') {
            dispatch({ type: 'plusItem', payload: index });
        }

        if (type === 'minus') {
            dispatch({ type: 'minusItem', payload: index });
        }
    };

    if (!items.length) {
        return (
            <section className="min-h-screen px-5 py-24 text-stone-950 md:px-12">
                <div className="mx-auto max-w-4xl border border-stone-200 bg-white px-8 py-16 text-center md:px-14">
                    <div className="mb-6 flex justify-center">
                        <ShoppingBag size={42} strokeWidth={1} className="text-stone-500" />
                    </div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-stone-500">Your Bag</p>
                    <h1 className="font-serif text-5xl leading-none md:text-6xl">Shopping Bag</h1>
                    <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-stone-500">
                        Your bag is currently empty. Continue shopping for considered pieces.
                    </p>
                    <Link
                        href="/products/clothing"
                        className="mt-8 inline-flex min-h-11 items-center justify-center border border-stone-950 bg-stone-950 px-8 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-stone-950"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
        <ConfirmDialog
            open={removeIndex !== null}
            title="Remove item"
            message="Are you sure you want to remove this item from your bag?"
            cancelLabel="Keep item"
            confirmLabel="Remove"
            onCancel={() => setRemoveIndex(null)}
            onConfirm={confirmRemove}
        />

        <section className="min-h-screen px-5 max-w-full py-18 text-stone-950 md:px-12 md:py-26 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 border-b border-stone-200 pb-10">
                    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-stone-500">The edit</p>
                    <h1 className="font-serif text-5xl leading-none md:text-7xl">Shopping Bag</h1>
                    <p className="mt-5 max-w-md text-sm leading-6 text-stone-500">
                        Review your selected pieces before checkout.
                    </p>
                </header>

                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] max-w-full">
                    <div className="min-w-full">
                        <div className="divide-y divide-stone-200 border border-stone-200">
                            {items.map((item, index) => {
                                const discountedPrice = getPriceAfterDiscount(item.price, item.Discount);
                                return (
                                    <article key={`${item.name}-${index}`} className="flex items-center gap-5 px-4 py-8 md:gap-8 md:px-7">
                                        <div className="relative h-28 w-24 flex-none overflow-hidden border border-stone-200 bg-stone-50 md:h-36 md:w-28">
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                sizes="112px"
                                                className="object-cover transition duration-700 hover:scale-105"
                                                style={{ objectPosition: item.position }}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">{item.category}</p>
                                                    <h2 className="font-medium text-stone-950 md:text-lg">{item.name}</h2>
                                                    <p className="mt-2 text-sm text-stone-500">
                                                        ${discountedPrice.toFixed(2)} each
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-3">
                                                    <div className="flex items-center border border-stone-300">
                                                        <button
                                                            type="button"
                                                            aria-label="Decrease quantity"
                                                            disabled={Number(item.countincart) <= 1}
                                                            onClick={() => updateQuantity('minus', index)}
                                                            className="flex h-10 w-10 items-center justify-center text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                                                        >
                                                            <Minus size={14} strokeWidth={1.5} />
                                                        </button>
                                                        <span className="flex h-10 min-w-12 items-center justify-center border-x border-stone-300 px-4 text-sm text-stone-950">
                                                            {item.countincart}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label="Increase quantity"
                                                            onClick={() => updateQuantity('plus', index)}
                                                            className="flex h-10 w-10 items-center justify-center text-stone-700 transition hover:bg-stone-100"
                                                        >
                                                            <Plus size={14} strokeWidth={1.5} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-950"
                                                    >
                                                        <Trash2 size={14} strokeWidth={1.2} />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-8 border-t border-stone-200 pt-4">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
                                Free shipping on orders over $100
                            </p>
                        </div>
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="border border-stone-200 bg-white p-8">
                            <div className="mb-8">
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">Order Summary</p>
                            </div>

                            <div className="space-y-5 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-stone-500">Subtotal</span>
                                    <span className="font-medium text-stone-950">${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                                    <span className="text-stone-500">Shipping</span>
                                    <span className="font-medium text-stone-950">
                                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                                    <span className="text-stone-500">Total</span>
                                    <span className="font-medium text-stone-950">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <Link
                                    href="/checkout"
                                    className="flex min-h-12 w-full items-center justify-center border border-stone-950 bg-stone-950 px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-stone-950 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
                                >
                                    <Lock size={14} strokeWidth={1.5} className="mr-2" />
                                    Proceed to Checkout
                                </Link>

                                <button
                                    type="button"
                                    className="flex min-h-12 w-full items-center justify-center border border-stone-300 bg-white px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950 transition hover:border-stone-950"
                                >
                                    Apple Pay
                                </button>
                            </div>

                            <div className="mt-8 border-t border-stone-200 pt-5">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">Secure Checkout</p>
                                <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                                    <Lock size={14} strokeWidth={1.4} />
                                    SSL protected payment
                                </div>
                            </div>

                            <div className="mt-8 border-t border-stone-200 pt-6">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(event) => setPromoCode(event.target.value)}
                                        placeholder="Promo code"
                                        className="min-h-11 flex-1 border border-stone-300 bg-white px-4 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-stone-950"
                                    />
                                    <button
                                        type="button"
                                        className="min-h-11 border border-stone-950 bg-white px-5 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-950 hover:text-white"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
        </>
    );
}
