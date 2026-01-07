import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { MoveRight } from 'lucide-react';
import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default async function Home() {
  const subdainProducts = (await getProductsByCategory('velas-subdain')).slice(0, 3);
  const velarteProducts = (await getProductsByCategory('velas-velarte')).slice(0, 3);
  const waxMeltsProducts = (await getProductsByCategory('wax-melts')).slice(0, 3);
  const waxSachetsProducts = (await getProductsByCategory('wax-sachets')).slice(0, 3);
  const complementosProducts = (await getProductsByCategory('complementos')).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=2000&auto=format&fit=crop"
            alt="Handcrafted Candles"
            fill
            priority
            className="object-cover brightness-75"
          />
        </div>
        
        <Container className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-md">
            Velarte by Cain
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Velas de soja artesanales diseñadas para aportar calidez y tranquilidad a tu hogar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
            >
              Explorar Colección <MoveRight size={20} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Sección 1: Velas, Wax Melts y Wax Sachets */}
      <section>
        <Container>
          <div className="space-y-24">
            {/* Sección Unificada de Velas */}
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif">Nuestras Velas</h2>
                <p className="text-zinc-500 max-w-xl mx-auto">Dos colecciones únicas, vertidas a mano con cera de soja natural.</p>
              </div>

              <div className="grid gap-16">
                {/* Velas Subdaín */}
                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
                    <div>
                      <h3 className="text-2xl font-serif">Colección Subdaín</h3>
                      <p className="text-zinc-500 mt-1">Fragancias intensas y diseños exclusivos.</p>
                    </div>
                    <Link href="/velas#subdain" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                      Ver colección <MoveRight size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subdainProducts.map(p => <ProductCard key={p.slug} product={p} />)}
                  </div>
                </div>

                {/* Velas Velarte */}
                <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
                    <div>
                      <h3 className="text-2xl font-serif">Colección Velarte</h3>
                      <p className="text-zinc-500 mt-1">Nuestra esencia clásica en cada vertido.</p>
                    </div>
                    <Link href="/velas#velarte" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                      Ver colección <MoveRight size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {velarteProducts.map(p => <ProductCard key={p.slug} product={p} />)}
                  </div>
                </div>
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
                {waxMeltsProducts.map(p => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>

            {/* Wax Sachets */}
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
                <div>
                  <h2 className="text-3xl font-serif">Wax Sachets</h2>
                  <p className="text-zinc-500 mt-2">Ambientadores naturales para tus espacios favoritos.</p>
                </div>
                <Link href="/wax-sachets" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                  Ver todo <MoveRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {waxSachetsProducts.map(p => <ProductCard key={p.slug} product={p} />)}
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
                src="https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=1200&auto=format&fit=crop"
                alt="Proceso Artesanal"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-zinc-900">Nuestra Historia</h2>
              <div className="w-16 h-1 bg-zinc-900"></div>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Velarte by Cain nace de la pasión por crear ambientes únicos a través de fragancias cuidadosamente seleccionadas y cera de soja 100% natural. 
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Cada una de nuestras piezas es vertida a mano artesanalmente, cuidando cada detalle para ofrecerte no solo una vela, sino una experiencia sensorial completa que transforma tu espacio.
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
                <p className="text-zinc-500 mt-2">Todo lo necesario para el cuidado de tus velas.</p>
              </div>
              <Link href="/complementos" className="text-zinc-900 font-medium hover:underline flex items-center gap-1">
                Ver todo <MoveRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {complementosProducts.map(p => <ProductCard key={p.slug} product={p} />)}
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
