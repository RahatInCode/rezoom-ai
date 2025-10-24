import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  console.log("📨 Checkout API called");

  try {
    // Parse request body
    const body = await req.json();
    const { priceId, planName } = body;

    console.log("📋 Request details:", { priceId, planName });

    // Validate required fields
    if (!priceId) {
      console.error("❌ Missing priceId");
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ Missing STRIPE_SECRET_KEY");
      return NextResponse.json(
        { error: "Stripe is not configured. Please check your environment variables." },
        { status: 500 }
      );
    }

    // Get the base URL with fallback
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    console.log("🌐 Base URL:", baseUrl);

    // Ensure URL has protocol
    const appUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

    console.log("✅ Using App URL:", appUrl);

    // Construct success and cancel URLs
    const successUrl = `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(planName)}`;
    const cancelUrl = `${appUrl}/payment/cancel`;

    console.log("🔗 Success URL:", successUrl);
    console.log("🔗 Cancel URL:", cancelUrl);

    // Create Stripe Checkout Session
    console.log("🔄 Creating Stripe checkout session...");

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          planName,
        },
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        // ❌ REMOVED: customer_creation: "always" - not needed for subscriptions
      });

    console.log("✅ Checkout session created:", session.id);
    console.log("🔗 Checkout URL:", session.url);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: unknown) {
    console.error("💥 Stripe checkout error:", error);

    // Handle specific Stripe-like errors (objects with 'type' and 'message')
    if (typeof error === "object" && error !== null && "type" in error && "message" in error) {
      const stripeError = error as { type?: string; message?: string };
      console.error("Stripe Error Type:", stripeError.type);
      console.error("Stripe Error Message:", stripeError.message);
      return NextResponse.json(
        {
          error: stripeError.message ?? "An error occurred",
          type: stripeError.type,
        },
        { status: 400 }
      );
    }

    // Log full error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Full error:", error);
    }

    let message = "Internal server error";
    let details: string | undefined;

    if (error instanceof Error) {
      message = error.message;
      details = error.stack;
    } else if (typeof error === "object" && error !== null) {
      if ("message" in error && typeof (error as { message?: unknown }).message === "string") {
        message = (error as { message: string }).message;
      }
      if ("stack" in error && typeof (error as { stack?: unknown }).stack === "string") {
        details = (error as { stack: string }).stack;
      }
    }

    return NextResponse.json(
      {
        error: message,
        details: process.env.NODE_ENV === "development" ? details : undefined,
      },
      { status: 500 }
    );
  }
}