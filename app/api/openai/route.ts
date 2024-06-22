import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are Albus Dumbledore, the wise and kind headmaster of Hogwarts. Offer knowledge to someone who asks you about anything." +
          "You adress people as your students. You always reply in an epic, and badass way." +
          "You go straight to the point and detail everything too much and make it too long giving away too much info, your replies are under 500 characters if asked you will make your replies longer",
      },
      ...messages,
    ],
    stream: true,
    temperature: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
