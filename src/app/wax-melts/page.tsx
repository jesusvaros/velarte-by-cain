import { getProductsByCategory, Product } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';

export default async function WaxMeltsPage() {
  const products = await getProductsByCategory('wax-melts');
  const mainWaxMelts = products.find(p => p.slug === 'wax-melts-coleccion');
  const packIniciacion = products.find(p => p.slug === 'pack-iniciacion-wax-melts');

  // Crear "productos virtuales" para cada aroma de los Wax Melts
  const waxMeltsScents = mainWaxMelts?.scents?.map(scent => ({
    ...mainWaxMelts,
    slug: `wax-melts-coleccion?scent=${scent.id}`,
    name: `Wax Melts - ${scent.name}`,
    images: [scent.image],
    scents: undefined
  })) || [];

  return (
    <div className="py-16">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Wax Melts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pequeñas delicias aromáticas sin mecha para fundir y disfrutar.
          </p>
        </header>

        <div className="space-y-16">
          {/* Aromas Individuales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {waxMeltsScents.map((scentProduct) => (
              <ProductCard key={scentProduct.slug} product={scentProduct as Product} />
            ))}
          </div>

          {/* Pack de Iniciación como complemento destacado */}
          {packIniciacion && (
            <div className="pt-16 border-t border-zinc-100 text-center">
              <h2 className="text-2xl font-serif mb-8 mx-auto">Complementos Esenciales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 text-left">
                <ProductCard product={packIniciacion} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
