import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { MoveRight, ChevronDown } from 'lucide-react';
import { getProductsByCategory, Product } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default async function Home() {
  const subdainProducts = await getProductsByCategory('velas-subdain');
  const mainSubdain = subdainProducts.find(p => p.slug === 'sundain-candles');

  // Crear "productos virtuales" para cada aroma de Subdaín para el feed (limitado a 3)
  const subdainScents = (mainSubdain?.scents?.map(scent => ({
    ...mainSubdain,
    slug: `sundain-candles?scent=${scent.id}`,
    name: `Vela Subdaín - ${scent.name}`,
    images: [scent.image],
    scents: undefined
  })) || []).slice(0, 3);

  const mainWaxMelts = (await getProductsByCategory('wax-melts')).find(p => p.slug === 'wax-melts-coleccion');
  
  // Crear "productos virtuales" para cada aroma de Wax Melts para el feed
  const waxMeltsScents = (mainWaxMelts?.scents?.map(scent => ({
    ...mainWaxMelts,
    slug: `wax-melts-coleccion?scent=${scent.id}`,
    name: `Wax Melts - ${scent.name}`,
    images: [scent.image],
    scents: undefined
  })) || []);

  const packIniciacion = (await getProductsByCategory('wax-melts')).find(p => p.slug === 'pack-iniciacion-wax-melts');

  // Combinar aromas y pack de iniciación, luego limitar a 3 en total
  const combinedWaxMeltsFeed = [
    ...waxMeltsScents,
    ...(packIniciacion ? [packIniciacion] : [])
  ].slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/sundain/velas-encabezado.png"
              alt="Velarte by Caín Collection Desktop"
              fill
              priority
              className="object-cover"
            />
            {/* Gradient Overlay to improve readability with transparent navbar */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/sundain/foto-todos-los-sundae-no-ia.jpg"
              alt="Velarte by Caín Collection Mobile"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Mobile Logo Overlay with Circle Background */}
        <div className="relative z-10 block md:hidden">
          <div className="bg-zinc-100/80 backdrop-blur-sm rounded-full p-0  w-[240px] h-[232px] flex items-center justify-center shadow-xl border border-white/20 shadow-xl">
            <Image
              src="/Logo_velarte_transparente-removebg-preview.png"
              alt="Velarte by Caín Logo"
              width={200}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce flex flex-col items-center gap-2 text-white drop-shadow-md">
          <span className="text-xs font-medium uppercase tracking-widest">Descubre</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Sección Principal de Productos */}
      <section>
        <Container>
          <div className="space-y-24">
          {/* Velas */}
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
              <div>
                <h2 className="text-3xl font-serif">Velas</h2>
                <p className="text-zinc-500 mt-2">Fragancias intensas y diseños exclusivos.</p>
              </div>
              <Link href="/velas" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                Ver todo <MoveRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subdainScents.map(p => <ProductCard key={p.slug} product={p as Product} />)}
            </div>
          </div>

            {/* Wax Melts */}
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
                <div>
                  <h2 className="text-3xl font-serif">Wax Melts</h2>
                  <p className="text-zinc-500 mt-2">Pequeñas delicias aromáticas sin mecha.</p>
                </div>
                <Link href="/wax-melts" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                  Ver todo <MoveRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {combinedWaxMeltsFeed.map(p => <ProductCard key={p.slug} product={p as Product} />)}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sobre Nosotros Banner */}
      <section className="bg-zinc-100 py-20 overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/sundain/foto-todos-los-sundae-no-ia.jpg"
                alt="Velarte by Caín"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-zinc-900">Sobre nosotros</h2>
              <div className="w-16 h-1 bg-zinc-900"></div>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Somos un matrimonio sevillano que crea velas y wax melts artesanales, hechos a mano con calma y mucho cariño.
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Trabajamos con cera de soja y esencias aptas para velas, creando productos veganos y cruelty-free pensados para llenar tu hogar de aroma, calma y pequeños momentos de bienestar. En Velarte by Caín creemos en lo artesanal, en los detalles y en disfrutar del momento.
              </p>
              <Link 
                href="/eventos" 
                className="inline-block border-b-2 border-zinc-900 pb-1 font-medium text-zinc-900 hover:text-zinc-600 hover:border-zinc-600 transition-all"
              >
                Servicios para Eventos
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Sección 2: Complementos */}
      <section>
        <Container>
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
              <div>
                <h2 className="text-3xl font-serif">Complementos</h2>
                <p className="text-zinc-500 mt-2">Estamos trabajando en ello para sorprenderos pronto.</p>
              </div>
              <Link href="/complementos" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                Ver más <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy/Value Prop */}
      <section className="bg-zinc-50 py-20 border-y border-zinc-100">
        <Container>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xl">🌿</span>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-4 text-zinc-900">Cera de Soja Natural</h3>
              <p className="text-zinc-600 leading-relaxed">Ecológica, renovable y proporciona una quemada más limpia y duradera.</p>
            </div>
            <div>
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xl">✨</span>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-4 text-zinc-900">Fragancias Premium</h3>
              <p className="text-zinc-600 leading-relaxed">Aromas complejos y sofisticados formulados con aceites de alta calidad.</p>
            </div>
            <div>
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xl">🤲</span>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-4 text-zinc-900">Hecho a Mano</h3>
              <p className="text-zinc-600 leading-relaxed">Cada vela es elaborada individualmente en pequeños lotes para asegurar la perfección.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
