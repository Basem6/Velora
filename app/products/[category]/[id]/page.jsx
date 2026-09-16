import Link from 'next/link';
import ProductDetailClient from './pageclient';
import { findProduct } from '@/app/data/products';

export async function generateMetadata({ params }) {
  const { category, id } = await params;
  const product = findProduct(category, id);

  if (!product) {
    return {
      title: 'Product not found | VELORA',
      description: 'The requested VELORA product is not available.',
      alternates: {
        canonical: `/products/${category}/${id}`,
      },
    };
  }

  return {
    title: `${product.name} | VELORA`,
    description: product.description,
    keywords: [
      product.name,
      product.category,
      'VELORA',
      'shopping',
      'fashion boutique',
      product.color,
    ],
    alternates: {
      canonical: `/products/${category}/${id}`,
    },
    openGraph: {
      title: `${product.name} | VELORA`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | VELORA`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { category, id } = await params;
  const product = findProduct(category, id);

  if (!product) {
    return (
      <section className="min-h-screen px-5 py-24 text-stone-950 md:px-12">
        <div className="mx-auto max-w-4xl border border-stone-200 bg-white px-8 py-16 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-stone-500">Product not found</p>
          <h1 className="font-serif text-5xl leading-none md:text-6xl">Collection</h1>
          <Link href="/products/clothing" className="mt-8 inline-flex min-h-11 items-center justify-center border border-stone-950 px-5 text-[11px] uppercase tracking-[0.2em] text-stone-950 transition hover:bg-stone-950 hover:text-white">
            Return to Shop
          </Link>
        </div>
      </section>
    );
  }

  return <ProductDetailClient product={product} category={category} />;
}
