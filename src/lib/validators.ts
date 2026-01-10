import { z } from 'zod';

export const CartItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: z.string().optional(),
  variantId: z.string().optional(),
  variantLabel: z.string().optional(),
  scentId: z.string().optional(),
  scentName: z.string().optional(),
  unitPrice: z.number().positive(),
  qty: z.number().int().min(1).max(99),
});

export const OrderFormSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio').max(100),
  email: z.string().email('Dirección de correo electrónico no válida'),
  phone: z.string().max(20).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  note: z.string().max(500).optional(),
  honeypot: z.string().max(0, 'Spam detectado').optional(),
});

export const ShippingSchema = z.object({
  method: z.string(),
  price: z.number(),
});

export const OrderRequestSchema = z.object({
  customer: OrderFormSchema,
  items: z.array(CartItemSchema).min(1, 'El carrito está vacío'),
  shipping: ShippingSchema,
  total: z.number().positive(),
}).refine((data) => {
  // Si el método no es recogida, la dirección es obligatoria
  if (data.shipping.method !== 'Recogida gratuita en Mairena del Aljarafe (Sevilla)') {
    return (
      data.customer.address && data.customer.address.length >= 5 &&
      data.customer.city && data.customer.city.length >= 2 &&
      data.customer.postalCode && data.customer.postalCode.length >= 5
    );
  }
  return true;
}, {
  message: "La dirección, ciudad y código postal son obligatorios para el envío a domicilio",
  path: ["customer", "address"]
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type OrderForm = z.infer<typeof OrderFormSchema>;
export type Shipping = z.infer<typeof ShippingSchema>;
export type OrderRequest = z.infer<typeof OrderRequestSchema>;
