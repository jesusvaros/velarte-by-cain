import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export const metadata = {
  title: 'Todos los productos | Candle Velarte',
  description: 'Explora nuestra colección completa de velas de soja, wax melts y complementos.',
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="py-16 mt-16">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">Todos los productos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nuestra colección completa de velas artesanales, aromas y accesorios.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
