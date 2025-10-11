import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Without NEXT_PUBLIC prefix

export async function POST(request: Request) {
  const { messages, type } = await request.json();

  if (type === 'chat') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.8,
        max_tokens: 300
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  }

  if (type === 'tts') {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        voice: 'nova',
        input: messages,
        speed: 0.95
      })
    });

    const blob = await response.blob();
    return new NextResponse(blob);
  }
}