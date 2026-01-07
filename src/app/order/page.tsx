'use client';

import { useState } from 'react';
import { useCart } from '@/store/cart';
import { Container } from '@/components/Container';
import { formatPrice } from '@/lib/format';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Trash2, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const { items, total, setQty, removeItem, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
    honeypot: '',
  });

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
          total: total,
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
      <Container className="py-24 text-center">
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
      <Container className="py-24 text-center">
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
    <div className="py-16">
      <Container>
        <h1 className="text-3xl font-serif mb-12">Revisar Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-6">Productos</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.slug}-${item.variantId}`} className="flex justify-between items-start pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.variantLabel && (
                      <p className="text-sm text-gray-500">{item.variantLabel}</p>
                    )}
                    <p className="text-sm text-gray-900 mt-1">{formatPrice(item.unitPrice)}</p>
                    <div className="mt-4">
                      <QuantitySelector
                        quantity={item.qty}
                        onChange={(qty) => setQty(item.slug, qty, item.variantId)}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(item.unitPrice * item.qty)}</p>
                    <button
                      onClick={() => removeItem(item.slug, item.variantId)}
                      className="mt-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center text-xl font-bold">
              <span>Total Estimado</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              * Esto es una solicitud de pedido, no una compra final. Nos pondremos en contacto contigo para confirmar el envío y el pago.
            </p>
          </div>

          {/* Customer Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6">Tus Datos</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
