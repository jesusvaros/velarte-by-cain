'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Container } from './Container';

export function Navbar() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
            CANDLE VELARTE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/order" className="relative group">
              <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
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
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
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
