import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export default async function CategoryPage() {
  const category = 'wax-melts';
  const products = await getProductsByCategory(category);

  return (
    <div className="py-16">
      <Container>
        <header className="mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Wax Melts</h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Pequeñas delicias aromáticas sin mecha para fundir y disfrutar.
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 rounded-xl">
            <p className="text-zinc-500">Próximamente nuevos productos en esta categoría.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
