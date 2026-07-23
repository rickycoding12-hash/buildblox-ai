import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);

    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const clerkUserId = session.metadata?.clerk_user_id;

      if (!clerkUserId) break;

      await supabaseAdmin
        .from("users")
        .update({
          stripe_customer_id: session.customer,
          subscription_status: "active",
          plan: "BuildBlox AI",
        })
        .eq("clerk_user_id", clerkUserId);

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await supabaseAdmin
        .from("users")
        .update({
          subscription_status: "inactive",
          plan: "none",
          stripe_subscription_id: null,
        })
        .eq("stripe_customer_id", subscription.customer);

      break;
    }
  }

  return NextResponse.json({ received: true });
}