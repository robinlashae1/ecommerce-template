import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/Button";

export function Success() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <section className="w-full max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={40}
            className="text-green-600"
          />
        </div>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Order confirmed
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Thank you for your order!
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500">
          Your order has been received successfully. We’ll
          send a confirmation email with your order details
          and shipping information.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-gray-50 p-6 text-left">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={20}
              className="text-gray-500"
            />

            <div>
              <p className="text-sm font-medium">
                Order received
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Your order is now being processed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop">
            <Button
              size="lg"
              className="w-full sm:w-auto"
            >
              Continue Shopping
              <ArrowRight size={17} className="ml-2" />
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}