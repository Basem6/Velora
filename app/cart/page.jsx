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

        <section className="min-h-screen w-full max-w-full overflow-x-hidden px-4 py-16 text-stone-950 sm:px-5 md:px-12 md:py-26">
            <div className="mx-auto w-full max-w-7xl min-w-0">

                <header className="mb-12 border-b border-stone-200 pb-10">
                    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-stone-500">
                        The edit
                    </p>

                    <h1 className="font-serif text-5xl leading-none md:text-7xl">
                        Shopping Bag
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-6 text-stone-500">
                        Review your selected pieces before checkout.
                    </p>
                </header>

                <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">

                    {/* Cart Items */}
                    <div className="w-full min-w-0">

                        <div className="w-full min-w-0 divide-y divide-stone-200 border border-stone-200">

                            {items.map((item, index) => {
                                const discountedPrice = getPriceAfterDiscount(
                                    item.price,
                                    item.Discount
                                );

                                return (
                                    <article
                                        key={`${item.name}-${index}`}
                                        className="flex w-full min-w-0 items-start gap-3 px-3 py-6 sm:gap-5 sm:px-4 md:items-center md:gap-8 md:px-7 md:py-8"
                                    >

                                        {/* Product Image */}
                                        <div className="relative h-24 w-20 flex-none overflow-hidden border border-stone-200 bg-stone-50 sm:h-28 sm:w-24 md:h-36 md:w-28">
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                                                className="object-cover transition duration-700 hover:scale-105"
                                                style={{
                                                    objectPosition: item.position
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="min-w-0 flex-1">

                                            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                                <div className="min-w-0">
                                                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                                                        {item.category}
                                                    </p>

                                                    <h2 className="break-words font-medium text-stone-950 md:text-lg">
                                                        {item.name}
                                                    </h2>

                                                    <p className="mt-2 text-sm text-stone-500">
                                                        ${discountedPrice.toFixed(2)} each
                                                    </p>
                                                </div>

                                                {/* Quantity + Remove */}
                                                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">

                                                    <div className="flex items-center border border-stone-300">

                                                        <button
                                                            type="button"
                                                            aria-label="Decrease quantity"
                                                            disabled={Number(item.countincart) <= 1}
                                                            onClick={() =>
                                                                updateQuantity("minus", index)
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                                                        >
                                                            <Minus
                                                                size={14}
                                                                strokeWidth={1.5}
                                                            />
                                                        </button>

                                                        <span className="flex h-10 min-w-12 items-center justify-center border-x border-stone-300 px-4 text-sm text-stone-950">
                                                            {item.countincart}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            aria-label="Increase quantity"
                                                            onClick={() =>
                                                                updateQuantity("plus", index)
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center text-stone-700 transition hover:bg-stone-100"
                                                        >
                                                            <Plus
                                                                size={14}
                                                                strokeWidth={1.5}
                                                            />
                                                        </button>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-950"
                                                    >
                                                        <Trash2
                                                            size={14}
                                                            strokeWidth={1.2}
                                                        />

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

                    {/* Order Summary */}
                    <aside className="w-full min-w-0 md:sticky md:top-24 lg:h-fit">

                        <div className="border border-stone-200 bg-white p-5 sm:p-6 md:p-8">

                            <div className="mb-8">
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
                                    Order Summary
                                </p>
                            </div>

                            <div className="space-y-5 text-sm">

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-stone-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-stone-950">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                                    <span className="text-stone-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium text-stone-950">
                                        {shipping === 0
                                            ? "Free"
                                            : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                                    <span className="text-stone-500">
                                        Total
                                    </span>

                                    <span className="font-medium text-stone-950">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                            </div>

                            {/* Checkout */}
                            <div className="mt-8 space-y-3">

                                <Link
                                    href="/checkout"
                                    className="flex min-h-12 w-full items-center justify-center border border-stone-950 bg-stone-950 px-4 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-stone-950 sm:px-5 sm:text-[11px] sm:tracking-[0.2em]"
                                >
                                    <Lock
                                        size={14}
                                        strokeWidth={1.5}
                                        className="mr-2 shrink-0"
                                    />

                                    Proceed to Checkout
                                </Link>

                                <button
                                    type="button"
                                    className="flex min-h-12 w-full items-center justify-center border border-stone-300 bg-white px-4 text-[10px] font-medium uppercase tracking-[0.15em] text-stone-950 transition hover:border-stone-950 sm:px-5 sm:text-[11px] sm:tracking-[0.2em]"
                                >
                                    Apple Pay
                                </button>

                            </div>

                            {/* Secure Checkout */}
                            <div className="mt-8 border-t border-stone-200 pt-5">

                                <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">
                                    Secure Checkout
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                                    <Lock
                                        size={14}
                                        strokeWidth={1.4}
                                    />

                                    SSL protected payment
                                </div>

                            </div>

                            {/* Promo Code */}
                            <div className="mt-8 border-t border-stone-200 pt-6">

                                <div className="flex w-full min-w-0 items-center gap-2">

                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(event) =>
                                            setPromoCode(event.target.value)
                                        }
                                        placeholder="Promo code"
                                        className="min-h-11 min-w-0 flex-1 border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-stone-950 sm:px-4"
                                    />

                                    <button
                                        type="button"
                                        className="min-h-11 shrink-0 border border-stone-950 bg-white px-3 text-[9px] font-medium uppercase tracking-[0.14em] text-stone-950 transition hover:bg-stone-950 hover:text-white sm:px-5 sm:text-[10px] sm:tracking-[0.18em]"
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
