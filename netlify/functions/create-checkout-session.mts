
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { products } from "../../src/data/products";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.SITE_URL;

if (!stripeKey || !supabaseUrl || !supabaseKey || !siteUrl) {
  throw new Error("Missing server environment variables.");
}

const stripe = new Stripe(stripeKey);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed." },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  let orderId: string | undefined;

  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("items" in body) ||
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      body.items.length > 50
    ) {
      return Response.json(
        { error: "Your cart is empty or invalid." },
        { status: 400 }
      );
    }

    const cart = body.items as Array<{
      productId: string;
      quantity: number;
      selectedVariants?: Record<string, string>;
    }>;

    const orderItems: Array<{
      productId: string;
      name: string;
      unitPrice: number;
      quantity: number;
      selectedVariants: Record<string, string>;
    }> = [];

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    let subtotal = 0;
    const seenProducts = new Set<string>();

    for (const item of cart) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 10 ||
        seenProducts.has(item.productId)
      ) {
        return Response.json(
          { error: "One or more cart items are invalid." },
          { status: 400 }
        );
      }

      seenProducts.add(item.productId);

      // The price and availability come from the server's catalog.
      const product = products.find(
        (entry) => entry.id === item.productId
      );

      if (!product || !product.inStock) {
        return Response.json(
          { error: "A product is unavailable. Please update your cart." },
          { status: 400 }
        );
      }

      const selectedVariants = item.selectedVariants ?? {};
      const variantEntries = product.variants ?? [];

      // Validate variant names and values against the catalog.
      const validVariantIds = new Set(
        variantEntries.map((variant) => variant.id)
      );

      if (
        Object.keys(selectedVariants).some(
          (key) => !validVariantIds.has(key)
        ) ||
        variantEntries.some((variant) => {
          const selected = selectedVariants[variant.id];

          return (
            !selected ||
            !variant.options.some(
              (option) => option.value === selected
            )
          );
        })
      ) {
        return Response.json(
          { error: `Please select valid options for ${product.name}.` },
          { status: 400 }
        );
      }

      const unitPrice = Math.round(product.price * 100);

      if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) {
        throw new Error("Invalid product price in server catalog.");
      }

      subtotal += unitPrice * item.quantity;

      const variantDescription = variantEntries
        .map((variant) => {
          const option = variant.options.find(
            (entry) => entry.value === selectedVariants[variant.id]
          );

          return option
            ? `${variant.name}: ${option.label}`
            : "";
        })
        .filter(Boolean)
        .join(", ");

      const checkoutName = variantDescription
        ? `${product.name} (${variantDescription})`
        : product.name;

      orderItems.push({
        productId: product.id,
        name: checkoutName,
        unitPrice,
        quantity: item.quantity,
        selectedVariants,
      });

      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: unitPrice,
          product_data: {
            name: checkoutName,
          },
        },
      });
    }

    if (!Number.isSafeInteger(subtotal)) {
      return Response.json(
        { error: "Your cart total is invalid." },
        { status: 400 }
      );
    }

    // Example policy: free shipping at $100, otherwise $5.
    // Change this to match the store's actual shipping policy.
    const shippingAmount = subtotal >= 10000 ? 0 : 500;

    orderId = crypto.randomUUID();

    const { error: insertError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        status: "pending",
        items: orderItems,
        subtotal,
        shipping_amount: shippingAmount,
        currency: "usd",
      });

    if (insertError) {
      throw insertError;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?canceled=1`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingAmount,
              currency: "usd",
            },
            display_name:
              shippingAmount === 0 ? "Free shipping" : "Standard shipping",
          },
        },
      ],
      metadata: {
        order_id: orderId,
      },
    });

    const { error: updateError } = await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", orderId);

    if (updateError) {
      // Avoid leaving a usable Checkout Session without its order link.
      await stripe.checkout.sessions.expire(session.id);
      throw updateError;
    }

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session creation failed:", error);

    return Response.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
};