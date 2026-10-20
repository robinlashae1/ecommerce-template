
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseKey) {
  throw new Error("Missing webhook environment variables.");
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
    return new Response("Method not allowed.", { status: 405 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature.", { status: 400 });
  }

  // Do not call request.json() before verifying the signature.
  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Invalid Stripe webhook signature:", error);

    return new Response("Invalid signature.", { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;

      // A completed Checkout Session is not always paid when delayed
      // payment methods are enabled. Check the actual payment status.
      if (session.payment_status !== "paid") {
        return Response.json({ received: true });
      }

      const orderId = session.metadata?.order_id;

      if (!orderId) {
        console.error("Stripe session has no order_id metadata.");
        return new Response("Order reference missing.", { status: 500 });
      }

      const { data: order, error: findError } = await supabase
        .from("orders")
        .select("id, stripe_session_id, status")
        .eq("id", orderId)
        .maybeSingle();

      if (findError) throw findError;

      if (!order || order.stripe_session_id !== session.id) {
        console.error("No matching order for Stripe session:", session.id);
        return new Response("Order not found.", { status: 500 });
      }

      // Idempotent update: repeated webhook deliveries must not
      // create a second order or trigger fulfillment twice.
      if (order.status !== "paid") {
        const { error: updateError } = await supabase
          .from("orders")
          .update({
            status: "paid",
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            customer_email:
              session.customer_details?.email ?? null,
            shipping_details: session.shipping_details ?? null,
            paid_at: new Date().toISOString(),
          })
          .eq("id", orderId)
          .eq("stripe_session_id", session.id);

        if (updateError) throw updateError;
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);

    // Non-2xx tells Stripe to retry the event.
    return new Response("Webhook processing failed.", { status: 500 });
  }
};