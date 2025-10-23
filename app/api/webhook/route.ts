import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Payment successful:", session);

      // TODO: Update your database
      // - Mark user as subscribed
      // - Store subscription ID
      // - Grant access to premium features
      // Example:
      // await db.user.update({
      //   where: { email: session.customer_email },
      //   data: {
      //     subscriptionId: session.subscription,
      //     subscriptionStatus: 'active',
      //     plan: session.metadata?.planName,
      //   },
      // });

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log("Subscription updated:", subscription);

      // TODO: Update subscription status in database
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log("Subscription cancelled:", subscription);

      // TODO: Revoke premium access
      // await db.user.update({
      //   where: { subscriptionId: subscription.id },
      //   data: {
      //     subscriptionStatus: 'cancelled',
      //   },
      // });

      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log("Payment failed:", invoice);

      // TODO: Notify user about failed payment
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}