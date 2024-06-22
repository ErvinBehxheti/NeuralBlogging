import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ message: "Text is required" }, { status: 400 });
  }

  try {
    const sentences = text.split(". ").slice(-2).join(". ");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or 'gpt-4' if you have access
        messages: [{ role: "user", content: sentences }],
        max_tokens: 30, // Adjust based on desired suggestion length
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Filter out error messages
    const filteredChoices = data.choices.filter(
      (choice: any) =>
        !choice.message.content.includes("Cannot provide info for this one")
    );
    if (filteredChoices.length > 0) {
      return NextResponse.json({ choices: filteredChoices });
    } else {
      return NextResponse.json(
        { message: "No valid suggestions available" },
        { status: 204 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
