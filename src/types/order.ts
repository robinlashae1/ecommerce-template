import type { CartItem } from "./ecommerce";

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;

  contact: {
    email: string;
    phone: string;
  };

  shippingAddress: ShippingAddress;

  items: CartItem[];

  totals: OrderTotals;

  estimatedShipping: string;
}