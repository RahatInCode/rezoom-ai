"use client";

export async function handleStripeCheckout(
  priceId: string,
  planName: string
) {
  try {
    console.log("🚀 Starting checkout for:", planName);
    console.log("Price ID:", priceId);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        planName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Checkout error:", data);
      throw new Error(data.error || "Failed to create checkout session");
    }

    console.log("✅ Checkout session created");

    // Redirect to Stripe Checkout
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (error: unknown) {
    console.error("💥 Checkout error:", error);
    throw error;
  }
}