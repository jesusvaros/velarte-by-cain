import Image from 'next/image';
import { Container } from '@/components/Container';

export const metadata = {
  title: 'About Us | Candle Velarte',
  description: 'The story behind our artisan hand-poured candles.',
};

export default function AboutPage() {
  return (
    <div className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h1>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Candle Velarte was born out of a simple desire: to create a cleaner, 
              more intentional candle experience. What started as a hobby in a 
              small kitchen has grown into a dedicated studio where every candle 
              is crafted with the same care and attention as the very first one.
            </p>
            <p>
              We believe that the objects we bring into our homes should be 
              both beautiful and sustainable. That&apos;s why we use only 100% natural 
              soy wax, lead-free cotton wicks, and premium fragrance oils that 
              are phthalate-free and never tested on animals.
            </p>
            <p>
              Each scent is carefully curated to evoke a specific mood or memory, 
              from the calming lavender fields of France to the crisp morning air 
              of a pine forest. We hope our candles bring a little more warmth, 
              serenity, and light into your daily rituals.
            </p>
            <div className="mt-12 relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=1200&auto=format&fit=crop"
                alt="Our Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
