import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const N8N_WEBHOOK = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL !;
    const resp = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-rezoom-secret": process.env.REZ_SECRET!,
      },
      body: JSON.stringify({ message }),
    });

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { reply: text };
    }

    return NextResponse.json({ reply: data.reply ?? data });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Chatbot error" }, { status: 500 });
  }
}
