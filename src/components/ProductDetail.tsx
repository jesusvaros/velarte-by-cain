'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { Product, Scent } from '@/lib/products';
import { Check, ShoppingBag, X, Plus } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  initialScentId?: string;
}

export default function ProductDetail({ product, initialScentId }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  
  // Inicializar con el aroma de la URL si existe
  const [selectedScents, setSelectedScents] = useState<{ scent: Scent; count: number }[]>(() => {
    if (initialScentId && product.scents) {
      const scent = product.scents.find(s => s.id === initialScentId);
      if (scent) {
        return [{ scent, count: 1 }];
      }
    }
    return [];
  });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Obtener el número total de cajas/aromas permitidos según la variante
  const getMaxScents = () => {
    if (!selectedVariant) return 1;
    if (selectedVariant.id === 'pack-2') return 2;
    if (selectedVariant.id === 'pack-4') return 4;
    return 1; // Para cajas individuales o caja grande
  };

  const maxScents = getMaxScents();
  const currentTotalScents = selectedScents.reduce((acc, s) => acc + s.count, 0);

  // Calcular el precio total de la selección actual
  const currentTotalPrice = (() => {
    if (product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts') {
      return (selectedVariant?.price || product.priceFrom) * quantity;
    }
    return selectedScents.reduce((acc, selection) => acc + (selectedVariant?.price || product.priceFrom) * selection.count, 0);
  })();

  const handleScentUpdate = (scent: Scent, delta: number) => {
    const existing = selectedScents.find(s => s.scent.id === scent.id);
    const isWaxMeltPack = product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts';
    
    if (existing) {
      const newCount = existing.count + delta;
      if (newCount <= 0) {
        setSelectedScents(selectedScents.filter(s => s.scent.id !== scent.id));
      } else {
        if (!isWaxMeltPack || currentTotalScents + delta <= maxScents) {
          setSelectedScents(selectedScents.map(s => 
            s.scent.id === scent.id ? { ...s, count: newCount } : s
          ));
        }
      }
    } else if (delta > 0) {
      if (!isWaxMeltPack || currentTotalScents < maxScents) {
        setSelectedScents([...selectedScents, { scent, count: 1 }]);
      }
    }
  };

  const handleAddToCart = () => {
    if (product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts') {
      const scentLabel = selectedScents.length > 0 
        ? selectedScents.map(s => `${s.count}x ${s.scent.name}`).join(', ')
        : 'Sin aroma seleccionado';

      addItem({
        slug: product.slug,
        name: product.name,
        variantId: selectedVariant?.id,
        variantLabel: `${selectedVariant?.label ? selectedVariant.label : ''} - ${scentLabel}`,
        unitPrice: selectedVariant?.price || product.priceFrom,
        qty: quantity,
      });
    } else {
      selectedScents.forEach((selection) => {
        addItem({
          slug: product.slug,
          name: `${product.name} - ${selection.scent.name}`,
          variantId: selectedVariant?.id,
          variantLabel: selectedVariant?.label,
          unitPrice: selectedVariant?.price || product.priceFrom,
          qty: selection.count,
        });
      });
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const mainImage = activeImage || (selectedScents.length > 0 
    ? selectedScents[selectedScents.length - 1].scent.image 
    : product.images[0]);

  return (
    <div className="py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-2xl shadow-sm">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover object-center transition-opacity duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {(product.scents || product.gallery) && (
              <div className="grid grid-cols-3 gap-2">
                {[...(product.images || []), ...(product.gallery || [])].map((img, idx) => (
                  <button
                    key={`gallery-${idx}`}
                    onClick={() => setActiveImage(img)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} gallery ${idx}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </button>
                ))}
                
                {product.scents?.map((scent) => {
                  const selection = selectedScents.find(s => s.scent.id === scent.id);
                  const isSelected = !!selection;
                  return (
                    <button
                      key={scent.id}
                      onClick={() => {
                        setActiveImage(scent.image);
                        if (product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts') {
                          handleScentUpdate(scent, 1);
                        }
                      }}
                      disabled={product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && currentTotalScents >= maxScents && !isSelected}
                      className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === scent.image ? 'border-black' : (isSelected ? 'border-zinc-400' : 'border-transparent opacity-70 hover:opacity-100')
                      }`}
                    >
                      <Image src={scent.image} alt={scent.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-[10px] text-white text-center">
                        {scent.name}
                      </div>
                      {isSelected && selection.count > 0 && (
                        <div className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {selection.count}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl font-serif text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">{product.category.replace('-', ' ')}</p>
              <p className="text-3xl font-medium text-gray-900">
                {formatPrice(selectedVariant?.price || product.priceFrom)}
              </p>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
              <p className="leading-relaxed">{product.description}</p>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Seleccionar Formato
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setSelectedScents([]);
                      }}
                      className={`px-6 py-3 text-sm font-medium rounded-xl border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-100 text-gray-600 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.scents && product.scents.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Elegir Aroma{product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && maxScents > 1 ? `s (${currentTotalScents}/${maxScents} cajas)` : ' (múltiples disponibles)'}
                  </label>
                  {selectedScents.length > 0 && (
                    <button 
                      onClick={() => {
                        setSelectedScents([]);
                        setActiveImage(null);
                      }}
                      className="text-xs text-red-500 hover:underline flex items-center gap-1"
                    >
                      <X size={12} /> Limpiar Selección
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {product.scents.map((scent) => {
                    const selection = selectedScents.find(s => s.scent.id === scent.id);
                    const count = selection?.count || 0;
                    const isWaxMeltPack = product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts';
                    
                    return (
                      <div
                        key={scent.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          count > 0 ? 'border-black bg-zinc-50' : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                        onClick={() => setActiveImage(scent.image)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-md overflow-hidden">
                            <Image src={scent.image} alt={scent.name} fill className="object-cover" />
                          </div>
                          <span className="text-sm font-medium">{scent.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleScentUpdate(scent, -1)}
                            disabled={count === 0}
                            className="p-1 rounded-full hover:bg-zinc-200 disabled:opacity-30"
                          >
                            <X size={16} className="text-gray-500" />
                          </button>
                          <span className="w-4 text-center font-bold text-sm">{count}</span>
                          <button
                            onClick={() => handleScentUpdate(scent, 1)}
                            disabled={isWaxMeltPack && currentTotalScents >= maxScents}
                            className="p-1 rounded-full hover:bg-zinc-200 disabled:opacity-30"
                          >
                            <Plus size={16} className="text-black" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && maxScents > 1 ? (
                  <p className="text-[11px] text-zinc-500 mt-3 italic">
                    * Tienes {maxScents} cajas disponibles para este pack. Puedes repetir aromas o elegir diferentes.
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-500 mt-3 italic">
                    * Selecciona la cantidad que desees de cada aroma para añadir al carrito.
                  </p>
                )}
              </div>
            )}

            <div className="mt-auto space-y-6">
              {product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && (
                <div className="flex items-center gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">Cantidad de Packs</label>
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={added || (product.scents && currentTotalScents === 0) || (product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && currentTotalScents < maxScents)}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-lg transition-all active:scale-[0.98] ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-900 text-white hover:bg-black disabled:bg-zinc-300 disabled:shadow-none'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>¡Añadido al Pedido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6" />
                    <span>
                      {product.scents && currentTotalScents === 0
                        ? 'Selecciona al menos un aroma' 
                        : (product.category === 'wax-melts' && product.slug !== 'pack-iniciacion-wax-melts' && currentTotalScents < maxScents)
                          ? `Faltan ${maxScents - currentTotalScents} aromas` 
                          : `Añadir a la Cesta • ${formatPrice(currentTotalPrice)}`}
                    </span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl">
                  <span className="text-xl">🌿</span>
                  <p className="text-xs font-medium text-zinc-600 leading-tight">100% Cera de Soja Natural</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl">
                  <span className="text-xl">🤲</span>
                  <p className="text-xs font-medium text-zinc-600 leading-tight">Hecho a Mano con Cariño</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
