"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { CartContext,  getPriceAfterDiscount } from "@/app/context/CartContext";
import { ToastContext } from "@/app/context/ToastContext";
import { products } from "@/app/data/products";

const campaignDeals = [
{
    label: "The Soft Edit",
    title: "Private Savings",
    copy: "Soft structure for a considered wardrobe.",
    discount: "Up to 50% Off",
    href: "/products/women",
    className: "deal-card--wide",
    images: [
    "/photos/pexels-vishnu-v-n-184319568-11263067.jpg",
    "/photos/women.jpg",
    ],
},
{
    label: "The Weekend Edit",
    title: "Edition 03",
    copy: "Layered pieces and useful accessories.",
    discount: "30% Storewide",
    href: "/products",
    className: "deal-card--compact",
    images: [
    "/photos/FA25-FAHERTY-Mens-MXF2400-RNF-CoastlineKnitShirt-RedstoneForestPlaid-X_FRONT_OM_WS_1.webp",
    "/photos/premium_photo-1727942419794-aa6412e45686.avif",
    ],
},
];

export default function OffersPageClient() {
const { showToast } = useContext(ToastContext) || { showToast: () => {} };
const { dispatch }= useContext(CartContext) || { dispatch: null };


const discountedProducts = products.filter((product) => Number(product.Discount) > 0);

const handleAddToCart = (product) => {
    dispatch({ type: 'addItem', payload: { ...product, countincart: 1 } });
    showToast('Added to bag');
};

return (
    <main className="offers-page">
    <section className="offers-hero">
        <div className="offers-hero__inner">
        <div className="offers-hero__content">
            <div className="offers-hero__top">
            <span className="offers-hero__kicker">VELORA / Private Savings</span>
            <span className="offers-hero__line" />
            </div>

            <div className="offers-hero__title-wrap">
            <h1 className="offers-hero__title">Special Offers</h1>
            <p className="offers-hero__subtitle">
                A considered edit of reduced wardrobe essentials.
            </p>
            </div>

            <div className="offers-hero__meta">
            <span className="offers-hero__meta-count">
                {discountedProducts.length} private edits
            </span>
            <span className="offers-hero__meta-label">Ends 30 Jun</span>
            </div>

            <div className="offers-hero__actions">
            <a className="offers-hero__cta" href="#offers-grid">
                <span className="offers-hero__cta-text">Shop The Edit</span>
                <ArrowRight size={15} strokeWidth={1.4} />
            </a>

            <Link className="offers-hero__simple-link" href="/products/clothing">
                View Collection
            </Link>
            </div>
        </div>

        <div className="offers-hero__visual">
            <div className="offers-hero__image-stack">
            <div className="offers-hero__image-frame offers-hero__image-frame--main">
                <Image
                src="/photos/pexels-vishnu-v-n-184319568-11263067.jpg"
                alt="Campaign offer"
                fill
                sizes="(min-width: 1100px) 44vw, 100vw"
                className="offers-hero__image"
                priority
                />
            </div>
            <div className="offers-hero__image-frame offers-hero__image-frame--secondary">
                <Image
                src="/photos/premium_photo-1727942419794-aa6412e45686.avif"
                alt="Campaign bag"
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="offers-hero__image"
                loading="lazy"
                />
            </div>
            <div className="offers-hero__note">
                <span className="offers-hero__note-value">40%</span>
                <span className="offers-hero__note-label">seasonal edit</span>
            </div>
            </div>
        </div>
        </div>
    </section>

    <section className="offers-featured">
        <div className="offers-featured__heading">
        <div>
            <span className="offers-section__kicker">Campaign Selection</span>
            <h2 className="offers-section__title">Featured Deals</h2>
        </div>
        <Link className="offers-view-all" href="/products">
            <span className="offers-view-all__text">Shop All</span>
            <ArrowRight size={14} strokeWidth={1.4} />
        </Link>
        </div>

        <div className="offers-featured__grid">
        {campaignDeals.map((deal) => (
            <Link key={deal.title} href={deal.href} className={`offers-deal-card ${deal.className}` }>
            <div className="offers-deal-card__media">
                <span className="offers-deal-card__badge">{deal.discount}</span>
                <span className="offers-deal-card__label">{deal.label}</span>
                {deal.images.slice(0, 2).map((image, imageIndex) => (
                <Image
                    key={`${deal.title}-${image}`}
                    src={image}
                    alt={deal.title}
                    fill
                    sizes="(min-width: 1100px) 50vw, 100vw"
                    className={`offers-deal-card__image ${imageIndex === 0 ? "offers-deal-card__image--main" : "offers-deal-card__image--secondary"}`}
                    loading="lazy"
                />
                ))}
            </div>
            <div className="offers-deal-card__content">
                <span className="offers-deal-card__kicker">{deal.label}</span>
                <h3 className="offers-deal-card__title">{deal.title}</h3>
                <p className="offers-deal-card__copy">{deal.copy}</p>
                <div className="offers-deal-card__cta">
                <span className="offers-deal-card__cta-text">Explore Offer</span>
                <ArrowRight size={14} strokeWidth={1.4} />
                </div>
            </div>
            </Link>
        ))}
        </div>
    </section>

    <section className="offers-grid-section" id="offers-grid">
        <div className="offers-grid-section__heading">
        <div>
            <span className="offers-section__kicker">The Private Edit</span>
            <h2 className="offers-section__title">Sale Collection</h2>
        </div>
        
        </div>

        <div className="offers-product-grid">
        {discountedProducts.slice(0, 8).map((product) => {
            const originalPrice = Number(product.price);
            const discountPercent = Number(product.Discount) || 0;
            const discounted = getPriceAfterDiscount(originalPrice, discountPercent);
            const discountAmount = Math.round(((originalPrice - discounted) / originalPrice) * 100);
            return (
            <article key={product.id} className="offers-product-card">
                <div className="offers-product-card__image-wrap">
                <Link href={`/products/${product.category.toLowerCase()}/${product.id}`} className="offers-product-card__image-link">
                    <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1100px) 15vw, (min-width: 768px) 25vw, 50vw"
                    className="offers-product-card__image"
                    loading="lazy"
                    />
                </Link>

                <span className="offers-product-card__badge">
                    {discountPercent >= 20 ? "SALE" : "OFFER"}
                </span>

                </div>

                <div className="offers-product-card__content">
                <div className="offers-product-card__top">
                    <span className="offers-product-card__category">{product.category}</span>
                    <span className="offers-product-card__discount">-{discountAmount}%</span>
                </div>

                <Link href={`/products/${product.category.toLowerCase()}/${product.id}`} className="offers-product-card__name">
                    {product.name}
                </Link>

                <div className="offers-product-card__price-row">
                    <span className="offers-product-card__price-original">${originalPrice}</span>
                    <span className="offers-product-card__price-sale">${discounted}</span>
                </div>

                <button type="button" className="offers-product-card__add" onClick={() => handleAddToCart(product)}>
                    <ShoppingBag size={14} strokeWidth={1.4} />
                    <span>Add to Cart</span>
                </button>
                </div>
            </article>
            );
        })}
        </div>
    </section>
    </main>
);
}
