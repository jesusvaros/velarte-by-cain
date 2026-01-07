import productsData from '@/content/products.json';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  priceFrom: number;
  tags: string[];
  variants?: ProductVariant[];
}

export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return (productsData as Product[]).slice(0, limit);
}
