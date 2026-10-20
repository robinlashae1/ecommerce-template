
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeKey || !supabaseUrl || !supabaseKey) {
  throw new Error("Missing server environment variables.");
}

const stripe = new Stripe(stripeKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request: Request) => {
  if (request.method !== "GET") {
    return new Response("Method not allowed.", { status: 405 });
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return Response.json(
      { error: "Invalid checkout session." },
      { status: 400 }
    );
  }

  try {
    // Retrieve payment status directly from Stripe.
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const orderId = session.metadata?.order_id;

    if (!orderId) {
      return Response.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", orderId)
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (error) throw error;

    return Response.json({
      orderId,
      paid:
        session.payment_status === "paid" &&
        order?.status === "paid",
      status: order?.status ?? "pending",
    });
  } catch (error) {
    console.error("Unable to verify order status:", error);

    return Response.json(
      { error: "Unable to verify payment." },
      { status: 500 }
    );
  }
};