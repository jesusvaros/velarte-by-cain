'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { Product } from '@/lib/products';
import { Check, ShoppingBag } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      variantId: selectedVariant?.id,
      variantLabel: selectedVariant?.label,
      unitPrice: selectedVariant?.price || product.priceFrom,
      qty: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-2xl">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-gray-900">
                {formatPrice(selectedVariant?.price || product.priceFrom)}
              </p>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Order</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Order Request</span>
                </>
              )}
            </button>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
