
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { message } = req.body;
    const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL; 
    const resp = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rezoom-secret": process.env.REZ_SECRET // optional
      },
      body: JSON.stringify({ message }),
    });
    const data = await resp.json();
    return res.status(200).json({ reply: data.reply ?? data });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Chatbot error" });
  }
}
