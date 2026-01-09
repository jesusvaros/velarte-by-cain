import { z } from 'zod';

export const CartItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  variantId: z.string().optional(),
  variantLabel: z.string().optional(),
  unitPrice: z.number().positive(),
  qty: z.number().int().min(1).max(99),
});

export const OrderFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  note: z.string().max(500).optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export const ShippingSchema = z.object({
  method: z.string(),
  price: z.number(),
});

export const OrderRequestSchema = z.object({
  customer: OrderFormSchema,
  items: z.array(CartItemSchema).min(1, 'Cart is empty'),
  shipping: ShippingSchema,
  total: z.number().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type OrderForm = z.infer<typeof OrderFormSchema>;
export type Shipping = z.infer<typeof ShippingSchema>;
export type OrderRequest = z.infer<typeof OrderRequestSchema>;
