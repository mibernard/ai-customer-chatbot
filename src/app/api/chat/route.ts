import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Correct import

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is stored in your .env file
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      // Correct method for creating a chat completion
      model: 'gpt-4', // Use the GPT-4 model
      messages: [
        { role: 'system', content: 'You are a helpful customer support agent.' },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botReply = completion.choices[0].message.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: botReply });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return NextResponse.json({ error: 'Failed to generate a response' }, { status: 500 });
  }
}
