import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=2000&auto=format&fit=crop"
            alt="Candle Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Artisan Candles for <br /> Your Sacred Space
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200">
            Hand-poured in small batches using 100% natural soy wax and premium botanical oils.
          </p>
          <Link
            href="/candles"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            View candles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
              <p className="text-gray-600">Our most loved scents, curated for you.</p>
            </div>
            <Link
              href="/candles"
              className="hidden md:flex items-center text-sm font-semibold text-black hover:underline"
            >
              Shop All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/candles"
              className="inline-flex items-center px-6 py-3 border-2 border-black font-semibold rounded-full hover:bg-black hover:text-white transition-all"
            >
              Shop All
            </Link>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Crafted with Intention</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Candle Velarte, we believe that lighting a candle is a ritual. It&apos;s a moment of pause, 
              a breath of fresh air, or a warm embrace at the end of the day. Every candle is 
              hand-poured in our studio with meticulous attention to detail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div>
                <div className="text-xl font-bold mb-2">100% Soy Wax</div>
                <p className="text-sm text-gray-500">Clean burning and eco-friendly</p>
              </div>
              <div>
                <div className="text-xl font-bold mb-2">Cotton Wicks</div>
                <p className="text-sm text-gray-500">Lead-free for a steady flame</p>
              </div>
              <div>
                <div className="text-xl font-bold mb-2">Pure Essential Oils</div>
                <p className="text-sm text-gray-500">Therapeutic and phthalate-free</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
