import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      planName: session.metadata?.planName,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    console.error("Session verification error:", errMsg, error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}