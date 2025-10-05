import { NextRequest, NextResponse } from "next/server";
import { openai } from "../../utils/OpenAI"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profession, skills, experience, goals } = body;

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY in .env");
      return NextResponse.json(
        { error: "Server misconfigured. Missing API key." },
        { status: 500 }
      );
    }

    const prompt = `
      Write a compelling LinkedIn summary for a ${profession}.
      Highlight key skills: ${skills}, experience: ${experience}, and career goals: ${goals}.
      Tone should be professional yet approachable, optimized for LinkedIn, around 150-200 words.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("LinkedIn Summary Error:", error);
    return NextResponse.json(
      { error: error.response?.data || "Failed to generate LinkedIn summary" },
      { status: 500 }
    );
  }
}
