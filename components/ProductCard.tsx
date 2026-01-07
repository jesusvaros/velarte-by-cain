import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { formatPrice } from '@/lib/format';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/candles/${product.slug}`} className="group">
      <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
      <p className="text-sm font-semibold text-gray-900 mt-2">from {formatPrice(product.priceFrom)}</p>
    </Link>
  );
}
