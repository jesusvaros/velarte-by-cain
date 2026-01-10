import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/logo-redondo.png"
                alt="Velarte by Caín"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Velas y wax melts artesanales hechos a mano con calma y mucho cariño.
              Productos veganos y cruelty-free en Sevilla.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tienda</Link>
              </li>
              <li>
                <Link href="/velas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Velas</Link>
              </li>
              <li>
                <Link href="/wax-melts" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Wax Melts</Link>
              </li>
              <li>
                <Link href="/eventos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Eventos</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contacto</h4>
            <p className="text-sm text-gray-600 mb-4">
              ¿Tienes alguna duda?<br />
              Escríbenos a velartebycain@gmail.com
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/velartebycain/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@velartebycain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.99 0-1.48.18-3.4 2.97-6.28 6.37-6.48 1.06-.06 2.1.2 3.04.7v4.28c-.74-.4-1.59-.58-2.45-.5-.49.05-.95.22-1.38.44-1.51.76-2.27 2.48-1.86 4.1.33 1.15 1.2 2.1 2.35 2.44.88.26 1.85.16 2.66-.28 1.1-.56 1.88-1.63 2.05-2.85.06-1.35.04-2.71.04-4.06 0-4.59.01-9.17-.01-13.76z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Velarte by Caín. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
