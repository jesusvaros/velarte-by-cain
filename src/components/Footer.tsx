import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">CANDLE VELARTE</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hand-poured artisan candles crafted with love and natural ingredients. 
              Bringing warmth and serenity to your home.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/candles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Shop All</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/order" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Order Request</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-sm text-gray-600">
              Questions about our candles?<br />
              Email us at hello@candlevelarte.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Candle Velarte Cain. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
