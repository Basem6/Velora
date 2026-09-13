import CategoryPage from './pageclient';
import { products } from '@/app/data/products';

export async function generateMetadata({ params }) {
  const { category } = await params;
  const humanCategory = String(category || 'products')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${humanCategory} Collection | VELORA`,
    description: `Shop VELORA ${humanCategory} collection with elevated everyday pieces for a modern wardrobe.`,
    keywords: [
      `VELORA ${humanCategory}`,
      'fashion collection',
      'women',
      'men',
      'bags',
      'accessories',
      'shop modern style',
    ],
    alternates: {
      canonical: `/products/${category}`,
    },
  };
}

export default async function page({ params }) {
  const { category } = await params;
  const filterd=products.filter((pro)=>{
    return pro.category.toLocaleLowerCase()===category.toLocaleLowerCase()
  })
  return <CategoryPage category={category} products={filterd} />;
}