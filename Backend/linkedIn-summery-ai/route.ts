import { Request, Response } from "express";
import { openai } from "../config/OpenAI";

export const generateLinkedInSummary = async (req: Request, res: Response) => {
  try {
    const { profession, skills, experience, goals } = req.body;

    const prompt = `
      Write a compelling LinkedIn summary for a ${profession}.
      Highlight key skills: ${skills}, experience: ${experience}, and career goals: ${goals}.
      Tone should be professional yet approachable, optimized for LinkedIn, around 150-200 words.
    `;

    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4-fast:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    res.json({ summary });
  } catch (error) {
    console.error("LinkedIn Summary Error:", error);
    res.status(500).json({ error: "Failed to generate LinkedIn summary" });
  }
};
