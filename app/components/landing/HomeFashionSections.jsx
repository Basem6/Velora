import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categoryImages = [
  {
    label: "Women",
    image: "/photos/women.jpg",
    href: "/products/clothing/?kind=Women",
  },
  {
    label: "Men",
    image: "/photos/man.jpg",
    href: "/products/clothing/?kind=Men",
  },
  {
    label: "Shoes",
    image: "/photos/pexels-elnur-memmednebiyev-125323681-9992898.jpg",
    href: "/products/shoes",
  },
  {
    label: "Bags",
    image: "/photos/bag.jpg",
    href: "/products/accessories?type=bags",
  },
  {
    label: "Accessories",
    image: "/photos/pexels-ron-lach-8706554.jpg",
    href: "/products/accessories",
  },
];

const campaignOffers = [
  {
    id: "weekend-uniform",
    kicker: "Women / 01",
    label: "Private Edit",
    headline: "The Weekend Uniform",
    offer: "Up to 50% Off",
    text: "Soft structure, quiet confidence, and considered layers for a slower rhythm.",
    cta: "Shop Now",
    href: "/products/accessories",
    images: [
      {
        src: "/photos/pexels-vishnu-v-n-184319568-11263067.jpg",
        alt: "Women edit",
        className: "offer-main-image",
      },
      {
        src: "/photos/pexels-jose-martin-segura-benites-1422456152-27113469.jpg",
        alt: "Capsule bag",
        className: "offer-secondary-image-one",
      },
      {
        src: "/photos/pexels-elnur-memmednebiyev-125323681-9992898.jpg",
        alt: "Soft knit shirt",
        className: "offer-secondary-image-two",
      },
    ],
  },
  {
    id: "departure-edit",
    kicker: "Collection 02",
    label: "Seasonal Cut",
    headline: "The Edit: Departure",
    offer: "Up to 40% Off",
    text: "A luminous wardrobe of woven pieces, precise lines, and everyday silhouette.",
    cta: "Explore Offer",
    href: "products/clothing",
    images: [
      {
        src: "/photos/SU25-FAHERTY-MENS-MWS2516-KAI-SsBreezeShirt-MolokaiScenicTropical_OM_EDITORIAL_1.webp",
        alt: "Seasonal shirt",
        className: "offer-main-image",
      },
      {
        src: "/photos/man.jpg",
        alt: "Minimal menswear",
        className: "offer-secondary-image-one",
      },
      {
        src: "/photos/pexels-ron-lach-8706554.jpg",
        alt: "Editorial styling",
        className: "offer-secondary-image-two",
      },
    ],
  },
];

export default function HomeFashionSections() {
  return (
    <>
      <section className="w-full bg-[#f8f7f3] py-12 md:py-9 hidden md:block">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {categoryImages.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="group flex flex-col items-center text-center"
              >
                <div className="category-image-wrap">
                  <div className="category-image-ring">
                    <Image
                      src={category.image}
                      alt={category.label}
                      width={260}
                      height={260}
                      className="category-image"
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 40vw"
                      loading="lazy"
                    />
                  </div>
                </div>
                <span className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-stone-950">
                  {category.label}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-stone-500 transition duration-300 group-hover:text-stone-950">
                  Shop Now
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-campaign-section " id="offers">
        <div className="offer-campaign-wrap">
          <div className="offer-campaign-heading">
            <div>
              <p className="offer-kicker">Private Savings</p>
              <h2 className="offer-title">Exclusive Offers</h2>
              <p className="offer-subtitle">
                Quiet edits and considered pieces at private savings.
              </p>
            </div>
          </div>

          <div className="offer-campaign-grid">
            {campaignOffers.map((campaign) => (
              <Link key={campaign.id} href={campaign.href} className="offer-card-link">
                <article className="offer-card">
                  <div className="offer-card-media">
                    <span className="offer-badge">{campaign.offer}</span>
                    <span className="offer-card-label">{campaign.label}</span>

                    {campaign.images.map((image, imageIndex) => (
  <div
    key={`${campaign.id}-${image.alt}`}
    className={`offer-image-frame ${image.className}`}
  >
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="
        (max-width: 640px) 45vw,
        (max-width: 1100px) 30vw,
        280px
      "
      className={`offer-image ${
        imageIndex === 0
          ? "offer-image-main"
          : "offer-image-secondary"
      }`}
      loading="lazy"
    />
  </div>
))}

                    <span className="offer-card-index">{campaign.kicker}</span>
                  </div>

                  <div className="offer-card-content">
                    <div className="offer-card-copy-top">
                      <span className="offer-card-kicker">{campaign.kicker}</span>
                      <span className="offer-card-line" />
                    </div>
                    <h3 className="offer-card-title">{campaign.headline}</h3>
                    <p className="offer-card-text">{campaign.text}</p>

                    <div className="offer-card-cta">
                      <span className="offer-card-cta-label">{campaign.cta}</span>
                      <span className="offer-card-arrow">
                        <ArrowRight size={15} strokeWidth={1.35} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="offer-view-all-wrap">
            <Link href="/offers" className="offer-view-all">
              <span className="offer-view-all-mask" />
              <span className="offer-view-all-text">View All Offers</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

