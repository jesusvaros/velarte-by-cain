'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/cart';
import { Container } from '@/components/Container';
import { formatPrice } from '@/lib/format';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Trash2, Send, CheckCircle2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const { items, total, setQty, removeItem, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shippingMethod, setShippingMethod] = useState<string>('correos_econ');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    note: '',
    honeypot: '',
  });

  const shippingOptions = [
    { id: 'correos_econ', label: 'Económico Correos', price: 3.90, description: 'Sin seguimiento, no podemos asumir el costo en el improbable caso de pérdida.' },
    { id: 'inpost', label: 'InPost', price: 4.90, description: 'Con seguimiento, recogida en un punto cercano.' },
    { id: 'correos_dom', label: 'Domicilio Correos', price: 7.50, description: 'Con seguimiento, entrega directamente en su hogar.' },
    { id: 'recogida', label: 'Recogida gratuita en Mairena del Aljarafe (Sevilla)', price: 0.00, description: '' },
  ];

  const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const shippingPrice = selectedShipping?.price || 0;
  const finalTotal = total + shippingPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          shipping: {
            method: selectedShipping?.label,
            price: shippingPrice
          },
          total: finalTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send order request');
      }

      setIsSuccess(true);
      clearCart();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Container className="py-32 text-center mt-16">
        <div className="max-w-md mx-auto">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif mb-4">¡Solicitud Enviada!</h1>
          <p className="text-gray-600 mb-8">
            Gracias por tu interés. Hemos recibido tu solicitud y nos pondremos en contacto contigo por correo electrónico muy pronto para finalizar tu pedido.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Volver a la Tienda
          </Link>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-32 text-center mt-8">
        <h1 className="text-3xl font-serif mb-6">Tu Pedido</h1>
        <p className="text-gray-600 mb-8">Tu carrito está vacío actualmente.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          Volver a la Tienda
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-24 mt-8">
      <Container>
        <h1 className="text-3xl font-serif mb-12">Revisar Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-6">Productos</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.slug}-${item.variantId}-${item.scentId || ''}`} className="flex gap-4 pb-6 border-b border-gray-100 items-center">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      {item.scentName && (
                        <p className="text-sm text-gray-600">Aroma: {item.scentName}</p>
                      )}
                      {item.variantLabel && (
                        <p className="text-sm text-gray-500">{item.variantLabel}</p>
                      )}
                      <p className="text-sm text-gray-900 mt-1">{formatPrice(item.unitPrice)}</p>
                      <div className="mt-4">
                        <QuantitySelector
                          quantity={item.qty}
                          onChange={(qty) => setQty(item.slug, qty, item.variantId, item.scentId)}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(item.unitPrice * item.qty)}</p>
                      <button
                        onClick={() => removeItem(item.slug, item.variantId, item.scentId)}
                        className="mt-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Envío ({selectedShipping?.label})</span>
                <span>{formatPrice(shippingPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold pt-4">
                <span>Total Estimado</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-sm text-zinc-600 font-medium mb-1">Entrega: 7-10 días hábiles.</p>
              <p className="text-xs text-zinc-500 italic leading-relaxed">
                Actualmente solo hacemos envíos a España - península. Estamos en crecimiento y esperamos poder expandirnos pronto 💫.
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              * Esto es una solicitud de pedido, no una compra final. Nos pondremos en contacto contigo para confirmar el pago.
            </p>
          </div>

          {/* Customer Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6">Envío y Datos</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Método de Envío</label>
                {shippingOptions.map((opt) => (
                  <label 
                    key={opt.id} 
                    className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      shippingMethod === opt.id 
                        ? 'border-black bg-white shadow-sm' 
                        : 'border-transparent bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={shippingMethod === opt.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{opt.label}</p>
                          {opt.description && (
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {opt.price === 0 ? 'Gratis' : formatPrice(opt.price)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Dirección de Entrega</h3>
              </div>

              {shippingMethod !== 'recogida' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calle y número</label>
                    <input
                      type="text"
                      required={shippingMethod !== 'recogida'}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                    <input
                      type="text"
                      required={shippingMethod !== 'recogida'}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                    <input
                      type="text"
                      required={shippingMethod !== 'recogida'}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {shippingMethod === 'recogida' && (
                <div className="p-4 bg-zinc-100 rounded-lg text-sm text-zinc-600 italic">
                  Has seleccionado recogida local. No es necesario introducir dirección de envío.
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Datos de Contacto</h3>
              </div>
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas (Opcional)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                  placeholder="¿Alguna petición especial o pregunta?"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <span>Procesando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Solicitud de Pedido</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
