import { getProductBySlug } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ scent?: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado | Velarte by Cain',
    };
  }

  return {
    title: `${product.name} | Velarte by Cain`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Velarte by Cain`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { scent } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Velarte by Cain',
    },
    offers: {
      '@type': 'Offer',
      price: product.priceFrom,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://velartebycain.com/p/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} initialScentId={scent} />
    </>
  );
}
