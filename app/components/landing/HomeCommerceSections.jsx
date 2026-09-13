import Link from "next/link";

const categories = [
"New Arrivals",
"Best Sellers",
"Clothing",
"Shoes",
"Accessories",
"Bags",
"Watches",
"Jewelry",
"Men",
"Women",
];

const brandNames = [
"VELORA",
"NIKE",
"ADIDAS",
"ZARA",
"PUMA",
"LEVI'S",
"H&M",
"UNIQLO",
];

export default function HomeCommerceSections() {
return (
    <>
    <section className="w-full border-t border-stone-200 bg-[#f8f7f3]">
        <div className="home-marquee">
        <div className="home-marquee-track" aria-label="Shop categories">
            {[...categories, ...categories].map((category, index) => {
            const href = category.toLowerCase().replace(/\s+/g, "-");
            return (
                <div className="home-marquee-item" key={`${category}-${index}`}>
                <Link href={`/products/${href}`} className="home-marquee-link">
                    {category}
                </Link>
                <span className="home-marquee-sep" aria-hidden="true" />
                </div>
            );
            })}
        </div>
        </div>
    </section>

    <section className="w-full border-t border-stone-200 bg-[#f8f7f3]">
        <div className="mx-auto max-w-350 px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 border-t border-stone-300 pt-12 md:grid-cols-[1fr_1fr]">
            <article className="flex min-h-70 flex-col justify-between border-b border-stone-300 pb-10 md:border-b-0 md:border-r md:pr-12 md:pb-0">
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-500">
                About VELORA
                </p>
                <h2 className="mt-8 font-serif text-4xl leading-none tracking-[-0.02em] text-stone-950 md:text-5xl">
                ABOUT VELORA
                </h2>
            </div>

            <div className="mt-10 max-w-xl">
                <p className="text-sm leading-7 text-stone-600 md:text-[15px]">
                Discover carefully selected pieces designed to bring timeless
                style, quality, and simplicity into your everyday wardrobe.
                </p>
                <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 border-b border-stone-950 pb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-950 transition duration-300 hover:opacity-60"
                >
                Read More
                <span aria-hidden="true" className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
                </Link>
            </div>
            </article>

            <article className="flex min-h-70 flex-col justify-between border-b border-stone-300 pb-10 md:border-b-0 md:pl-12 md:pb-0">
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-500">
                Recharge
                </p>
                <h2 className="mt-8 font-serif text-4xl leading-none tracking-[-0.02em] text-stone-950 md:text-5xl">
                RECHARGE YOUR STYLE
                </h2>
            </div>

            <div className="mt-10 max-w-xl">
                <p className="text-sm leading-7 text-stone-600 md:text-[15px]">
                Refresh your wardrobe with pieces made for everyday confidence.
                </p>
                <Link
                href="/products/clothing"
                className="mt-8 inline-flex min-h-11 items-center justify-center border border-stone-950 px-6 text-[11px] font-medium uppercase tracking-[0.24em] text-stone-950 transition duration-300 hover:bg-stone-950 hover:text-white"
                >
                Explore Collection
                </Link>
            </div>
            </article>
        </div>

        <div className="mt-20 border-t border-stone-300 pt-11">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-500">
                Our Brands
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-stone-950 md:text-5xl">
                OUR BRANDS
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4 lg:grid-cols-8">
                {brandNames.map((brand) => (
                <span
                    key={brand}
                    className="border-b border-stone-300 pb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-stone-700 transition duration-300 hover:text-stone-950 hover:border-stone-950"
                >
                    {brand}
                </span>
                ))}
            </div>
            </div>
        </div>
        </div>
    </section>
    </>
);
}
