import { Request, Response } from "express";
import { openai } from "../config/OpenAI";


export const generateCoverLetter = async (req: Request, res: Response) => {
  try {
    const { jobTitle, companyName, skills, experience, highlights } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY in .env");
      return res.status(500).json({ error: "Server misconfigured. Missing API key." });
    }

    const prompt = `
      Write a professional cover letter for a ${jobTitle} at ${companyName}.
      The candidate has ${experience} years of experience and skills in ${skills}.
      Career highlights include: ${highlights}.
      Tone: formal, confident, and engaging.
    `; 

    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4-fast:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const coverLetter = completion.choices[0]?.message?.content?.trim();
    res.json({ coverLetter });
  } catch (err: any) {
    console.error("🔥 Error generating cover letter:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
};
