import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/Button";
import { getLastOrder } from "../lib/orders";

export function Success() {
  const order = getLastOrder();

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <section className="w-full max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag size={36} className="text-gray-500" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Order
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Order not found
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500">
            We couldn't find a recent order for this session.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <Button size="lg">
                Continue Shopping
                <ArrowRight size={17} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(order.createdAt));

  return (
    <main>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Order confirmed
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500">
            Your order has been received successfully. We'll send a
            confirmation to{" "}
            <span className="font-medium text-gray-900">
              {order.contact.email}
            </span>
            .
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span>
              Order{" "}
              <strong className="font-semibold text-gray-900">
                #{order.orderNumber}
              </strong>
            </span>

            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Order details */}
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold">
                Items in your order
              </h2>

              <div className="mt-5 divide-y divide-gray-200 border-y border-gray-200">
                {order.items.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex gap-4 py-5"
                  >
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag
                            size={20}
                            className="text-gray-300"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-gray-950">
                            {item.product.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          $
                          {(
                            item.product.price *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>

                      {item.selectedVariants &&
                        Object.keys(item.selectedVariants).length > 0 && (
                          <div className="mt-2 space-y-1">
                            {Object.entries(
                              item.selectedVariants
                            ).map(([variantId, value]) => {
                              const variant =
                                item.product.variants?.find(
                                  (entry) =>
                                    entry.id === variantId
                                );

                              const option = variant?.options.find(
                                (entry) =>
                                  entry.value === value
                              );

                              return (
                                <p
                                  key={variantId}
                                  className="text-xs text-gray-500"
                                >
                                  {variant?.name ?? variantId}:{" "}
                                  {option?.label ?? value}
                                </p>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping address */}
            <section>
              <div className="flex items-center gap-2">
                <MapPin size={19} className="text-gray-500" />
                <h2 className="text-lg font-semibold">
                  Shipping address
                </h2>
              </div>

              <div className="mt-4 rounded-2xl border border-gray-200 p-5">
                <p className="text-sm font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {order.shippingAddress.address}
                  {order.shippingAddress.apartment && (
                    <>
                      <br />
                      {order.shippingAddress.apartment}
                    </>
                  )}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <div className="rounded-2xl bg-gray-50 p-6">
                <div className="flex gap-4">
                  <Truck
                    size={21}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <div>
                    <h2 className="font-semibold">
                      Estimated delivery
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Your order should arrive within{" "}
                      <span className="font-medium text-gray-900">
                        {order.estimatedShipping}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside>
            <div className="rounded-2xl bg-gray-50 p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>
                  <span className="font-medium">
                    ${order.totals.subtotal.toFixed(2)}
                  </span>
                </div>

                {order.totals.discount > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Discount
                    </span>
                    <span className="font-medium text-green-700">
                      -${order.totals.discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>
                  <span className="font-medium">
                    {order.totals.shipping === 0
                      ? "Free"
                      : `$${order.totals.shipping.toFixed(2)}`}
                  </span>
                </div>

                {order.totals.tax > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Tax
                    </span>
                    <span className="font-medium">
                      ${order.totals.tax.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-semibold">
                  ${order.totals.total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    A confirmation has been prepared for{" "}
                    <span className="font-medium text-gray-900">
                      {order.contact.email}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <Link to="/shop" className="mt-6 block">
                <Button size="lg" className="w-full">
                  Continue Shopping
                  <ArrowRight size={17} className="ml-2" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}