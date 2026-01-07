import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export const metadata = {
  title: 'Shop All Candles | Candle Velarte',
  description: 'Explore our full collection of hand-poured artisan candles.',
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="py-16">
      <Container>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Candles</h1>
          <p className="text-gray-600 max-w-2xl">
            From soothing florals to earthy woods, find the perfect scent to transform your space.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
