import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

import { useCart } from "../hooks/useCart.ts";
import { Button } from "../ui/Button";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const checkoutData = {
        customer: {
          email: formData.get("email")?.toString() ?? "",
          phone: formData.get("phone")?.toString() ?? "",
          firstName:
            formData.get("firstName")?.toString() ?? "",
          lastName:
            formData.get("lastName")?.toString() ?? "",
        },

        shipping: {
          address:
            formData.get("address")?.toString() ?? "",
          apartment:
            formData.get("apartment")?.toString() ?? "",
          city: formData.get("city")?.toString() ?? "",
          state: formData.get("state")?.toString() ?? "",
          zip: formData.get("zip")?.toString() ?? "",
          country:
            formData.get("country")?.toString() ?? "",
        },

        items,

        totals: {
          subtotal,
          discount,
          shipping,
          tax,
          total,
        },
      };

      console.log("Checkout data:", checkoutData);

      /*
       * TODO:
       * Send checkoutData to your backend/payment provider.
       *
       * Example:
       * await createCheckoutSession(checkoutData);
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      navigate("/order-success");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * Prevent checkout when the cart is empty.
   */
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to cart
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Checkout
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Checkout form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Contact information */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">
                Contact information
              </h2>

              <div className="mt-6 space-y-5">
                <FormField
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

                <FormField
                  label="Phone number"
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* Shipping address */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">
                Shipping address
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FormField
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                  required
                />

                <FormField
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  required
                />

                <div className="sm:col-span-2">
                  <FormField
                    label="Address"
                    name="address"
                    placeholder="123 Main Street"
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    autoComplete="address-line2"
                  />
                </div>

                <FormField
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  required
                />

                <FormField
                  label="State"
                  name="state"
                  autoComplete="address-level1"
                  required
                />

                <FormField
                  label="ZIP code"
                  name="zip"
                  autoComplete="postal-code"
                  required
                />

                <FormField
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                  defaultValue="United States"
                  required
                />
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">
                Payment
              </h2>

              <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <Lock
                  size={20}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 text-sm font-medium">
                  Secure payment
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Payment processing will be connected here.
                </p>
              </div>
            </section>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : `Place order — $${total.toFixed(2)}`}
            </Button>

            <p className="text-center text-xs text-gray-500">
              By placing your order, you agree to our terms
              and conditions.
            </p>
          </form>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-8">
            <h2 className="text-lg font-semibold">
              Order summary
            </h2>

            <div className="mt-6 space-y-5">
              {items.map((item) => (
                <div
                  key={item.lineId}
                  className="flex gap-4"
                >
                  {/* Product image */}
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                      {item.quantity}
                    </span>
                  </div>

                  {/* Product info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.product.name}
                    </p>

                    {item.selectedVariants &&
                      Object.entries(
                        item.selectedVariants
                      ).map(([name, value]) => (
                        <p
                          key={name}
                          className="mt-1 text-xs text-gray-500"
                        >
                          {name}: {value}
                        </p>
                      ))}
                  </div>

                  {/* Item total */}
                  <p className="text-sm font-medium">
                    $
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-200" />

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <SummaryRow
                label="Subtotal"
                value={`$${subtotal.toFixed(2)}`}
              />

              {discount > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`-$${discount.toFixed(2)}`}
                />
              )}

              <SummaryRow
                label="Shipping"
                value={
                  shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`
                }
              />

              {tax > 0 && (
                <SummaryRow
                  label="Tax"
                  value={`$${tax.toFixed(2)}`}
                />
              )}
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="font-semibold">
                Total
              </span>

              <span className="text-xl font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* --------------------------------
   Form field
--------------------------------- */

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

/* --------------------------------
   Summary row
--------------------------------- */

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}