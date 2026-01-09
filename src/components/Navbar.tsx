'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/cart';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Container } from './Container';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'Tienda', href: '/shop' },
    { name: 'Velas', href: '/velas' },
    { name: 'Wax melts', href: '/wax-melts' },
    { name: 'Wax sachets', href: '/wax-sachets' },
    { name: 'Complementos', href: '/complementos' },
    { name: 'Eventos', href: '/eventos' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className={`p-1.5 rounded-full transition-colors duration-300 ${
              isScrolled || !isHome ? 'bg-transparent' : 'bg-zinc-100/90 shadow-sm backdrop-blur-sm'
            }`}>
              <Image
                src="/logo-redondo.png"
                alt="Velarte by Caín"
                width={160}
                height={48}
                className="h-10 w-auto"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled || !isHome ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-white/80 drop-shadow-md'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/order" className="relative group">
              <ShoppingBag className={`w-6 h-6 transition-colors ${
                isScrolled || !isHome ? 'text-gray-600 group-hover:text-gray-900' : 'text-white group-hover:text-white/80 drop-shadow-md'
              }`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <Link href="/order" className="relative group">
              <ShoppingBag className={`w-6 h-6 ${isScrolled || !isHome ? 'text-gray-600' : 'text-white drop-shadow-md'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className={isScrolled || !isHome ? 'text-gray-600' : 'text-white drop-shadow-md'}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-600 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}
