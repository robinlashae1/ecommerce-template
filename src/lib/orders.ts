import type { Order } from "../types/order";

const ORDER_STORAGE_KEY = "ecommerce-last-order";

export function createOrderNumber(): string {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `TM-${randomNumber}`;
}

export function createOrderId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `order_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 11)}`;
}

export function saveOrder(order: Order): void {
  try {
    localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(order)
    );
  } catch (error) {
    console.error("Failed to save order:", error);
  }
}

export function getLastOrder(): Order | null {
  try {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!savedOrder) {
      return null;
    }

    return JSON.parse(savedOrder) as Order;
  } catch (error) {
    console.error("Failed to load order:", error);
    return null;
  }
}