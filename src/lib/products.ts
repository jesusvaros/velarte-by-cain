import productsData from '@/content/products.json';

export type Category = 'velas-velarte' | 'velas-subdain' | 'wax-melts' | 'wax-sachets' | 'complementos' | 'eventos';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Scent {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  gallery?: string[];
  priceFrom: number;
  tags: string[];
  category: Category;
  variants?: ProductVariant[];
  scents?: Scent[];
}

export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  return (productsData as Product[]).filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return (productsData as Product[]).slice(0, limit);
}
