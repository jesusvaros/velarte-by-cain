import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export default async function VelasPage() {
  const subdainProducts = await getProductsByCategory('velas-subdain');
  const velarteProducts = await getProductsByCategory('velas-velarte');

  return (
    <div className="py-16 space-y-24">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">Nuestras Velas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Descubre nuestras dos colecciones exclusivas, cada una con su propia personalidad y esencia.
          </p>
        </header>

        <div className="space-y-24">
          {/* Sección Subdaín */}
          <section id="subdain" className="scroll-mt-24">
            <div className="border-b border-zinc-100 pb-6 mb-8">
              <h2 className="text-3xl font-serif text-gray-900">Colección Subdaín</h2>
              <p className="text-zinc-500 mt-2">Fragancias intensas y diseños únicos que transforman cualquier espacio.</p>
            </div>
            {subdainProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {subdainProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 italic">Próximamente nuevos productos.</p>
            )}
          </section>

          {/* Sección Velarte */}
          <section id="velarte" className="scroll-mt-24">
            <div className="border-b border-zinc-100 pb-6 mb-8">
              <h2 className="text-3xl font-serif text-gray-900">Colección Velarte</h2>
              <p className="text-zinc-500 mt-2">Nuestra esencia clásica, elegante y atemporal.</p>
            </div>
            {velarteProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {velarteProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 italic">Próximamente nuevos productos.</p>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
}
