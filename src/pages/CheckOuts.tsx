
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function CheckOuts() {
  const { items } = useCart();
  const [searchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Keep this rule in sync with the server-side shipping calculation.
  const estimatedShipping =
    subtotal === 0 || subtotal >= 100 ? 0 : 5;

  const estimatedTotal = subtotal + estimatedShipping;
  const wasCanceled = searchParams.get("canceled") === "1";

  async function handleStripeCheckout() {
    if (isSubmitting || items.length === 0) return;

    setIsSubmitting(true);
    setCheckoutError("");

    try {
      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              selectedVariants: item.selectedVariants ?? {},
            })),
          }),
        }
      );

      const data: { url?: string; error?: string } =
        await response.json();

      if (!response.ok || !data.url) {
        throw new Error(
          data.error || "We couldn't start checkout. Please try again."
        );
      }

      // Redirect to Stripe-hosted Checkout.
      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--theme-background,#f8f7f4)] text-[var(--theme-text,#242424)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <Link
            to="/cart"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <span aria-hidden="true">←</span>
            Back to cart
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Almost yours
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                Review your order, then continue to our secure payment
                page to complete your purchase.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span aria-hidden="true">🔒</span>
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>

        {/* Canceled Stripe session */}
        {wasCanceled && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
          >
            Your checkout wasn't completed. Your cart is still here
            whenever you're ready.
          </div>
        )}

        {items.length === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mb-4 text-4xl" aria-hidden="true">
              🛍️
            </div>

            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Find something you love and come back when you're ready
              to check out.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Explore the shop
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            {/* Order items */}
            <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  Your order
                </h2>

                <span className="text-sm text-gray-500">
                  {items.reduce(
                    (count, item) => count + item.quantity,
                    0
                  )}{" "}
                  items
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => {
                  const image = item.product.images?.[0];

                  return (
                    <div
                      key={item.lineId}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-24">
                        {image ? (
                          <img
                            src={image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row">
                        <div className="min-w-0">
                          <h3 className="font-medium leading-6">
                            {item.product.name}
                          </h3>

                          {item.selectedVariants &&
                            Object.entries(item.selectedVariants).map(
                              ([name, value]) => (
                                <p
                                  key={name}
                                  className="mt-1 text-sm text-gray-500"
                                >
                                  {name}: {value}
                                </p>
                              )
                            )}

                          <p className="mt-2 text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 font-medium">
                          {formatPrice(
                            item.product.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-gray-200 pt-5">
                <Link
                  to="/cart"
                  className="text-sm font-medium underline underline-offset-4 transition hover:opacity-70"
                >
                  Edit cart
                </Link>
              </div>
            </section>

            {/* Order totals and payment redirect */}
            <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-8">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Estimated shipping
                  </span>

                  <span>
                    {estimatedShipping === 0
                      ? "Free"
                      : formatPrice(estimatedShipping)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-gray-500">
                  Final shipping options and any applicable taxes are
                  shown during secure checkout.
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">Estimated total</p>
                      <p className="mt-1 text-xs text-gray-500">
                        USD
                      </p>
                    </div>

                    <p className="text-xl font-semibold tracking-tight">
                      {formatPrice(estimatedTotal)}
                    </p>
                  </div>
                </div>
              </div>

              {checkoutError && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {checkoutError}
                </div>
              )}

              <button
                type="button"
                onClick={handleStripeCheckout}
                disabled={isSubmitting || items.length === 0}
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                    Redirecting to Stripe…
                  </>
                ) : (
                  <>
                    Continue to secure payment
                    <span aria-hidden="true">↗</span>
                  </>
                )}
              </button>

              <div className="mt-5 flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                <span className="mt-0.5" aria-hidden="true">
                  🔐
                </span>

                <p className="text-xs leading-5 text-gray-600">
                  Your payment details are entered on Stripe's secure
                  payment page. This store does not collect or store
                  your card number or security code.
                </p>
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-gray-500">
                By continuing, you agree to the store's applicable
                terms, shipping policy, and return policy.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}