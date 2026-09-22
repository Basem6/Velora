'use client';

import Image from 'next/image';

import { Heart, ShoppingBag, Plus } from 'lucide-react';
import { CartContext } from '@/app/context/CartContext';
import {  ToastContext } from '@/app/context/ToastContext';
import {  WishlistContext } from '@/app/context/WishlistContext';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function ProductDetailClient({ product }) {
const { dispatch } = useContext(CartContext) || { dispatch: () => {} };
const { addItem: addWishlistItem,removeItem, isInWishlist } = useContext(WishlistContext) || { addItem: () => {}, removeItem:()=>{} ,isInWishlist: () => false };
const { showToast } = useContext(ToastContext) || { showToast: () => {} };
const [ activeSize , setActiveSize] = useState(0)

const handleAddToCart = () => {
    dispatch({ type: 'addItem', payload: { ...product, countincart: 1 } });
    showToast('Added to bag');
};
const handlechoiseSize = (e)=>{
    if(activeSize===e){
        return;
    }
    setActiveSize(e)
}
const handleWishlist = () => {
    const statue = isInWishlist(product.id)
    if(!statue){
        addWishlistItem(product);
        showToast('Saved to wishlist');
    }
    else{
        removeItem(product.id);
        showToast('Removed from wishlist');
    }
    
};
console.log(product)
return (
    <section className="min-h-screen px-5 py-18 text-stone-950 md:px-12 md:py-26">
    <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(540px,1.08fr)_minmax(420px,0.92fr)]">
        <div className="grid gap-4">
            <div className="relative aspect-square overflow-hidden border border-stone-200 bg-stone-50">
            <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
                style={{ objectPosition: product.position }}
            />
            </div>
        </div>

        <article className="flex flex-col justify-center">
            <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500">{product.category}</span>
            <button
                type="button"
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={handleWishlist}
                className={`flex size-10 items-center justify-center border transition ${isInWishlist(product.id) ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 text-stone-600 hover:border-stone-950 hover:text-stone-950'}`}
            >
                <Heart size={16} strokeWidth={1.2} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
            </div>

            <div className="space-y-6">
            <div>
                <h1 className="font-serif text-5xl leading-none md:text-6xl">{product.name}</h1>
                <div className="mt-5 flex items-center gap-4">
                <span className="text-2xl font-medium text-stone-950">${product.price}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500">{product.color}</span>
                </div>
            </div>

            <p className="max-w-xl text-sm leading-6 text-stone-500">
                {product.description}
            </p>

            <div>
                <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Size</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{product.sizes.join(' / ')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                {product.sizes.map((size , ind) => (
                    <button
                    key={size}
                    type="button"
                    onClick={(e)=>{handlechoiseSize(ind)}}
                    className={`min-h-11 min-w-11 border border-stone-300 px-4 text-[11px] uppercase tracking-[0.16em] ${ind===activeSize?"bg-black text-gray-100":"text-stone-700 bg-transparent"}  transition  hover:text-gray-100 hover:bg-black`}
                    >
                    {size}
                    </button>
                ))}
                
                </div>
            </div>

            <div className="flex flex-wrap items-center  justify-between">
                <div className='flex flex-wrap gap-3'>
                <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-12 items-center justify-center border border-stone-950 bg-stone-950 px-5 md:px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-stone-950"
                >
                <ShoppingBag size={15} strokeWidth={1.4} className="mr-2" />
                Add to Bag
                </button>
                <Link href={"/checkout"}>
                <button type="button" onClick={()=>{dispatch({ type: 'addItem', payload: { ...product, countincart: 1 } }); }}   className="inline-flex min-h-12 items-center justify-center border border-stone-300 px-5 md:px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950 transition hover:border-stone-950">
                <Plus size={14} strokeWidth={1.4} className="mr-2" />
                Quick Add
                </button>
                </Link>
                </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
                <div className="grid gap-4 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span>Free delivery</span>
                    <span>2-5 days</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span>Returns</span>
                    <span>30 days</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Material</span>
                    <span>Natural cotton</span>
                </div>
                </div>
            </div>
            </div>
        </article>
        </div>
    </div>
    </section>
);
}
