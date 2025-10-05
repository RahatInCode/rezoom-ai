import { NextRequest, NextResponse } from "next/server";
import { openai } from "../../utils/OpenAI"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, companyName, skills, experience, highlights } = body;

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY in .env");
      return NextResponse.json(
        { error: "Server misconfigured. Missing API key." },
        { status: 500 }
      );
    }

    const prompt = `
      Write a professional cover letter for a ${jobTitle} at ${companyName}.
      The candidate has ${experience} years of experience and skills in ${skills}.
      Career highlights include: ${highlights}.
      Tone: formal, confident, and engaging.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

const coverLetter = completion.choices[0]?.message?.content?.trim();
return NextResponse.json({ coverLetter });
} catch (error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as { response?: { data?: unknown } };
    console.error("Cover Letter Error:", err.response);
    return NextResponse.json(
      { error: err.response?.data || "Failed to generate cover letter" },
      { status: 500 }
    );
  }

  console.error("Unexpected Cover Letter Error:", error);
  return NextResponse.json(
    { error: "Failed to generate cover letter" },
    { status: 500 }
  );
}

}
