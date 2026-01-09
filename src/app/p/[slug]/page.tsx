import { getProductBySlug } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ scent?: string }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { scent } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} initialScentId={scent} />;
}
