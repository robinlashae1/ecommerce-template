export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags?: string[];
  variants?: ProductVariant[];
  inStock: boolean;
  featured?: boolean;
}

export interface ProductVariantOption {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: ProductVariantOption[];
}

export interface CartItem {
  lineId: string;
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}