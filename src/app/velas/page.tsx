import { getProductsByCategory, Product } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export default async function VelasPage() {
  const subdainProducts = await getProductsByCategory('velas-subdain');
  const mainSubdain = subdainProducts.find(p => p.slug === 'sundain-candles');

  // Si tenemos el producto principal de Subdaín, creamos "productos virtuales" para cada aroma
  const subdainScents = mainSubdain?.scents?.map(scent => ({
    ...mainSubdain,
    slug: `sundain-candles?scent=${scent.id}`,
    name: `Vela Subdaín - ${scent.name}`,
    images: [scent.image],
    scents: undefined // Evitamos que la tarjeta intente renderizar el selector de nuevo
  })) || [];

  return (
    <div className="py-16 space-y-24">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">Nuestras Velas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Descubre nuestras colecciones exclusivas, diseñadas para crear momentos inolvidables.
          </p>
        </header>

        <div className="space-y-24">
          {/* Sección Subdaín */}
          <section id="subdain" className="scroll-mt-24">
            <div className="border-b border-zinc-100 pb-6 mb-8">
              <h2 className="text-3xl font-serif text-gray-900">Colección Subdaín</h2>
              <p className="text-zinc-500 mt-2">Fragancias intensas y diseños únicos que transforman cualquier espacio.</p>
            </div>
            {subdainScents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {subdainScents.map((scentProduct) => (
                  <ProductCard key={scentProduct.slug} product={scentProduct as Product} />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 italic text-center py-12 bg-zinc-50 rounded-xl">Próximamente nuevos productos.</p>
            )}
          </section>

          {/* Sección Velarte */}
          <section id="velarte" className="scroll-mt-24">
            <div className="border-b border-zinc-100 pb-6 mb-8">
              <h2 className="text-3xl font-serif text-gray-900">Colección Velarte</h2>
              <p className="text-zinc-500 mt-2">Nuestra esencia clásica, elegante y atemporal.</p>
            </div>
            <div className="text-center py-20 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
              <p className="text-xl text-zinc-600 font-medium italic">&ldquo;Estamos trabajando en ello para sorprenderos pronto&rdquo;</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
