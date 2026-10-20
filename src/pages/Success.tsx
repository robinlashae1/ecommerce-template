
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";


type OrderStatusResponse = {
  orderId?: string;
  paid: boolean;
  status: "pending" | "paid" | "payment_failed" | string;
  error?: string;
};

type ViewState =
  | "checking"
  | "paid"
  | "pending"
  | "invalid"
  | "error";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [viewState, setViewState] = useState<ViewState>(
    sessionId ? "checking" : "invalid"
  );
  const [orderId, setOrderId] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!sessionId || !sessionId.startsWith("cs_")) {
      setViewState("invalid");
      return;
    }

    let cancelled = false;

    async function checkPayment() {
      try {
        const response = await fetch(
          `/.netlify/functions/order-status?session_id=${encodeURIComponent(
            sessionId!
          )}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Unable to verify payment.");
        }

        const data: OrderStatusResponse = await response.json();

        if (cancelled) return;

        if (data.orderId) {
          setOrderId(data.orderId);
        }

        if (data.paid === true && data.status === "paid") {
          setViewState("paid");
          clearCart();
        } else if (data.status === "payment_failed") {
          setViewState("error");
        } else {
          setViewState("pending");
        }
      } catch {
        if (!cancelled) {
          setViewState("error");
        }
      }
    }

    checkPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId, retryCount]);

  const retryVerification = () => {
    setViewState("checking");
    setRetryCount((count) => count + 1);
  };

  return (
    <main className="min-h-screen bg-[var(--theme-background,#f8f7f4)] px-4 py-16 text-[var(--theme-text,#242424)] sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
          {viewState === "checking" && (
            <>
              <div
                className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800"
                aria-hidden="true"
              />
              <h1 className="text-2xl font-semibold sm:text-3xl">
                Verifying your payment
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600">
                Please wait while we check your order status. Don't
                refresh or submit another payment just yet.
              </p>
            </>
          )}

          {viewState === "paid" && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-800">
                ✓
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Order confirmed
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Thank you for your order.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600">
                Your payment was confirmed. We appreciate your purchase
                and will take it from here.
              </p>

              {orderId && (
                <p className="mt-6 text-sm text-gray-500">
                  Order reference:{" "}
                  <span className="font-mono text-gray-800">
                    {orderId}
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Continue shopping
                </Link>

                <Link
                  to="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-50"
                >
                  Back to home
                </Link>
              </div>
            </>
          )}

          {viewState === "pending" && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
                …
              </div>

              <h1 className="text-2xl font-semibold sm:text-3xl">
                We're confirming your order.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600">
                Your payment may still be processing. This page will
                not mark your order as paid until our server confirms
                it.
              </p>

              <button
                type="button"
                onClick={retryVerification}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Check payment status
              </button>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                If you were charged but the status doesn't update,
                contact the store before trying to pay again.
              </p>
            </>
          )}

          {viewState === "invalid" && (
            <>
              <h1 className="text-2xl font-semibold">
                No order to confirm
              </h1>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                We couldn't find a valid checkout session in this
                link.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-6 py-3 text-sm font-semibold text-white"
              >
                Return to shop
              </Link>
            </>
          )}

          {viewState === "error" && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-700">
                !
              </div>

              <h1 className="text-2xl font-semibold">
                We couldn't verify your order yet.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600">
                This doesn't necessarily mean your payment failed.
                Please check again or contact the store if you believe
                you were charged.
              </p>

              <button
                type="button"
                onClick={retryVerification}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--theme-radius-md,0.5rem)] bg-[var(--theme-primary,#242424)] px-6 py-3 text-sm font-semibold text-white"
              >
                Try again
              </button>

              <div className="mt-5">
                <Link
                  to="/"
                  className="text-sm text-gray-600 underline underline-offset-4"
                >
                  Back to home
                </Link>
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          Need help? Contact the store using the contact information
          listed on its website.
        </p>
      </div>
    </main>
  );
}