import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Candle Velarte`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
