'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/store/cart';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Calcular cuántas unidades de este producto hay ya en el carrito
  const cartItemCount = items
    .filter(item => item.slug === product.slug)
    .reduce((acc, item) => acc + item.qty, 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      slug: product.slug,
      name: product.name,
      variantId: product.variants?.[0]?.id,
      variantLabel: product.variants?.[0]?.label,
      unitPrice: product.variants?.[0]?.price || product.priceFrom,
      qty: quantity,
    });
    
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const adjustQuantity = (e: React.MouseEvent, amount: number) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="group relative bg-white rounded-xl p-3 transition-all hover:shadow-md border border-transparent hover:border-zinc-100">
      <Link href={`/p/${product.slug}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Contador de unidades añadidas (arriba derecha) */}
          {cartItemCount > 0 && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10 animate-in zoom-in duration-300">
              {cartItemCount}
            </div>
          )}
          
          {/* Overlay de compra rápida */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
                <button 
                  onClick={(e) => adjustQuantity(e, -1)}
                  className="p-1 hover:text-zinc-500 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium text-black">{quantity}</span>
                <button 
                  onClick={(e) => adjustQuantity(e, 1)}
                  className="p-1 hover:text-zinc-500 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-grow py-2 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  added ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-zinc-100 shadow-sm'
                }`}
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? 'Añadido' : 'Añadir'}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-zinc-600 transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">{product.shortDescription}</p>
          <p className="text-sm font-semibold text-gray-900 pt-1">
            {product.variants ? 'desde ' : ''}{formatPrice(product.priceFrom)}
          </p>
        </div>
      </Link>
    </div>
  );
}
