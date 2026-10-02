import {
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useCart } from "../hooks/useCart";

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

const sectionTitleClass =
  "text-lg font-semibold tracking-tight text-gray-950";

export function Checkout() {
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

  const isEmpty = items.length === 0;

    const handleSubmit = async (
      event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0]
    ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const checkoutData = {
      contact: {
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      shippingAddress: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        apartment: formData.get("apartment"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
      },
      payment: {
        cardNumber: formData.get("cardNumber"),
        expiration: formData.get("expiration"),
        cvv: formData.get("cvv"),
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

    console.log("Checkout submitted:", checkoutData);

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    navigate("/order-success");
  };

  if (isEmpty) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag size={32} className="text-gray-500" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Checkout
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Add some products to your cart before continuing to checkout.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <Button size="lg" className="w-full">
                Continue Shopping
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Secure checkout
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Checkout
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              Secure checkout
            </span>

            <span className="flex items-center gap-2">
              <Truck size={16} />
              Fast shipping
            </span>

            <span className="flex items-center gap-2">
              <LockKeyhole size={16} />
              Protected payment
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16"
        >
          <div className="space-y-10">
            {/* Contact */}
            <section>
              <div className="mb-6">
                <h2 className={sectionTitleClass}>Contact information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  We'll use this information to send your order confirmation.
                </p>
              </div>

              <div className="grid gap-5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="12345678901"
                    className={fieldClass}
                    required
                    minLength={11}
                    maxLength={11}
                    pattern="[0-9]{11}"
                    title="Enter exactly 11 digits."
                    onInput={(event) => {
                      event.currentTarget.value =
                        event.currentTarget.value
                          .replace(/\D/g, "")
                          .slice(0, 11);
                    }}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Enter exactly 11 digits, including the country code.
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={19} className="text-gray-500" />
                  <h2 className={sectionTitleClass}>
                    Shipping address
                  </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Where should we send your order?
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First name"
                  placeholder="John"
                  autoComplete="given-name"
                  required
                  pattern="[A-Za-zÀ-ÿ' -]+"
                  title="Please enter a valid first name."
                />

                <Input
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  placeholder="Smith"
                  autoComplete="family-name"
                  required
                  pattern="[A-Za-zÀ-ÿ' -]+"
                  title="Please enter a valid last name."
                />

                <div className="sm:col-span-2">
                  <Input
                    id="address"
                    name="address"
                    label="Street address"
                    placeholder="123 Main Street"
                    autoComplete="street-address"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    id="apartment"
                    name="apartment"
                    label="Apartment, suite, etc. (optional)"
                    placeholder="Apt 4B"
                    autoComplete="address-line2"
                    maxLength={50}
                  />
                </div>

                <Input
                  id="city"
                  name="city"
                  label="City"
                  placeholder="Philadelphia"
                  autoComplete="address-level2"
                  required
                  pattern="[A-Za-zÀ-ÿ' -]+"
                  title="Please enter a valid city."
                />

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    State
                  </label>

                  <select
                    id="state"
                    name="state"
                    defaultValue=""
                    autoComplete="address-level1"
                    required
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a state
                    </option>

                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    ZIP code
                  </label>

                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="19103"
                    className={fieldClass}
                    required
                    minLength={5}
                    maxLength={5}
                    pattern="[0-9]{5}"
                    title="Enter a 5-digit ZIP code."
                    onInput={(event) => {
                      event.currentTarget.value =
                        event.currentTarget.value
                          .replace(/\D/g, "")
                          .slice(0, 5);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <CreditCard size={19} className="text-gray-500" />
                  <h2 className={sectionTitleClass}>Payment</h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Payment processing is currently in demo mode.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
                <div className="mb-5 flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Secure payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Connect Stripe, PayPal, or another payment provider
                      before accepting real payments.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Card number
                    </label>

                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      className={fieldClass}
                      required
                      minLength={16}
                      maxLength={16}
                      pattern="[0-9]{16}"
                      title="Enter a 16-digit card number."
                      onInput={(event) => {
                        event.currentTarget.value =
                          event.currentTarget.value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                      }}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="expiration"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Expiration
                      </label>

                      <input
                        id="expiration"
                        name="expiration"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        className={fieldClass}
                        required
                        maxLength={5}
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        title="Enter expiration as MM/YY."
                        onInput={(event) => {
                          const value = event.currentTarget.value
                            .replace(/\D/g, "")
                            .slice(0, 4);

                          event.currentTarget.value =
                            value.length > 2
                              ? `${value.slice(0, 2)}/${value.slice(2)}`
                              : value;
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Security code
                      </label>

                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        className={fieldClass}
                        required
                        minLength={3}
                        maxLength={4}
                        pattern="[0-9]{3,4}"
                        title="Enter a 3 or 4 digit security code."
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Processing order..."
                ) : (
                  <>
                    Place Order
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </Button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                By placing your order, you agree to the store's terms and
                conditions.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  Order summary
                </h2>

                <Link
                  to="/cart"
                  className="text-xs font-medium text-gray-500 underline underline-offset-4 transition-colors hover:text-black"
                >
                  Edit cart
                </Link>
              </div>

              <div className="mt-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag
                            size={18}
                            className="text-gray-300"
                          />
                        </div>
                      )}

                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.product.name}
                      </p>

                      {item.selectedVariants &&
                        Object.keys(item.selectedVariants).length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {Object.entries(
                              item.selectedVariants
                            ).map(([variantId, value]) => {
                              const variant =
                                item.product.variants?.find(
                                  (entry) => entry.id === variantId
                                );

                              const option = variant?.options.find(
                                (entry) => entry.value === value
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

                      <p className="mt-2 text-sm font-medium">
                        $
                        {(
                          item.product.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-700">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {tax > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex gap-3">
                  <LockKeyhole
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <div>
                    <p className="text-xs font-medium">
                      Your information is secure
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      This checkout is currently a frontend demo. No real
                      payment will be processed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
};