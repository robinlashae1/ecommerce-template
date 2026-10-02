import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  CartItem,
  Product,
} from "../types/ecommerce";

import {
  createCartLineId,
  variantsAreEqual,
} from "../lib/cart";

interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];

  itemCount: number;

  totals: CartTotals;

  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;

  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariants?: Record<string, string>
  ) => void;

  removeFromCart: (
    lineId: string
  ) => void;

  updateQuantity: (
    lineId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

export const CartContext =
  createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "ecommerce-cart";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart =
        localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) {
        return [];
      }

      return JSON.parse(savedCart) as CartItem[];
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });

  /**
   * Persist cart to localStorage.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [items]);

  /**
   * Add product to cart.
   *
   * If the exact product + variants already exists,
   * increase its quantity.
   *
   * Otherwise create a new cart line.
   */
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedVariants?: Record<string, string>
  ) => {
    if (quantity <= 0) {
      return;
    }

    setItems((currentItems) => {
      const existingItemIndex =
        currentItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            variantsAreEqual(
              item.selectedVariants,
              selectedVariants
            )
        );

      /**
       * Existing cart line.
       */
      if (existingItemIndex !== -1) {
        return currentItems.map(
          (item, index) => {
            if (index !== existingItemIndex) {
              return item;
            }

            return {
              ...item,
              quantity:
                item.quantity + quantity,
            };
          }
        );
      }

      /**
       * New cart line.
       */
      const newCartItem: CartItem = {
        lineId: createCartLineId(),
        product,
        quantity,
        selectedVariants,
      };

      return [
        ...currentItems,
        newCartItem,
      ];
    });
  };

  /**
   * Remove one specific cart line.
   */
  const removeFromCart = (
    lineId: string
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.lineId !== lineId
      )
    );
  };

  /**
   * Update quantity for one specific cart line.
   */
  const updateQuantity = (
    lineId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.lineId === lineId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  /**
   * Clear the entire cart.
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Number of individual products.
   *
   * Example:
   *
   * Shirt × 2
   * Hoodie × 1
   *
   * = 3 items
   */
  const itemCount = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [items]);

  /**
   * Product subtotal.
   */
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );
  }, [items]);

  /**
   * Discount.
   *
   * Keep this separate from subtotal because
   * eventually this can come from:
   *
   * - Coupon codes
   * - Automatic promotions
   * - Customer discounts
   * - Backend pricing
   */
  const discount = useMemo(() => {
    return 0;
  }, []);

  /**
   * Shipping.
   *
   * For now shipping is free.
   *
   * Later this can be calculated based on:
   *
   * - Customer address
   * - Shipping method
   * - Cart weight
   * - Backend API
   */
  const shipping = useMemo(() => {
    return 0;
  }, []);

  /**
   * Tax.
   *
   * Do NOT hard-code tax logic here for production.
   *
   * Eventually this should come from your
   * ecommerce/payment backend.
   */
  const tax = useMemo(() => {
    return 0;
  }, []);

  /**
   * Final order total.
   */
  const total = useMemo(() => {
    return (
      subtotal -
      discount +
      shipping +
      tax
    );
  }, [
    subtotal,
    discount,
    shipping,
    tax,
  ]);

  /**
   * Combined totals object.
   */
  const totals = useMemo<CartTotals>(
    () => ({
      subtotal,
      discount,
      shipping,
      tax,
      total,
    }),
    [
      subtotal,
      discount,
      shipping,
      tax,
      total,
    ]
  );

  const value: CartContextType = {
    items,

    itemCount,

    totals,

    subtotal,
    discount,
    shipping,
    tax,
    total,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

