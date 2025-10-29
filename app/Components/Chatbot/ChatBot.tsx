"use client";
import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Luna 🌙 - your Rezoom AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e: FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMsg: Message = { role: "user", content: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const apiUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '/api/chat';
    
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API response:", data);

    let reply = "Sorry, I didn't understand that.";

    // Handle the specific malformed response structure
    if (data && typeof data === 'object') {
      // Case 1: Check if the response text is a key in the object
      const keys = Object.keys(data);
      
      // Look for text content in the object keys
      for (const key of keys) {
        if (key.includes('You\'re welcome') || key.includes('Have a great day') || key.length > 10) {
          reply = key;
          break;
        }
      }

      // Case 2: If no meaningful key found, try nested structures
      if (reply === "Sorry, I didn't understand that.") {
        // Check for reply array with text
        if (data.reply && Array.isArray(data.reply) && data.reply[0]?.text) {
          reply = data.reply[0].text;
        }
        // Check for direct text property
        else if (data.text) {
          reply = data.text;
        }
        // Check for nested object with text as keys
        else if (data.reply && typeof data.reply === 'object') {
          const replyKeys = Object.keys(data.reply);
          if (replyKeys.length > 0) {
            reply = replyKeys[0];
          }
        }
      }
    }

    // Clean up the response
    reply = reply.replace(/\\n/g, '\n').replace(/\\"/g, '"');

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

  } catch (error) {
    console.error("Error:", error);
    setMessages((prev) => [...prev, { 
      role: "assistant", 
      content: "Sorry, there was an error connecting to the server." 
    }]);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gray-700 text-white rounded-full p-4 shadow-lg hover:bg-gray-900 transition-all"
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed sm:bottom-5 md:bottom-20 top-20 right-6 w-80 sm:w-96 bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-gray-700 text-white p-3 text-center font-semibold">
            Luna 🌙 — Rezoom AI Assistant
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-[420px] space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                    m.role === "assistant"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <p className="text-gray-400 text-sm italic">Luna is typing...</p>}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-gray-200 flex items-center">
            <input
              className="flex-1 p-2 text-gray-500 outline-0 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-600 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-900 disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}


