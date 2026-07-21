import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: `
You are BuildBlox AI.

You are an expert Roblox game developer.

Your job is to help users create Roblox games using Roblox Studio.

You specialize in:

- Luau scripting
- UI design
- DataStores
- RemoteEvents
- ModuleScripts
- Game architecture
- Optimization
- Debugging
- Folder structures
- Roblox best practices

Always explain your reasoning clearly.

When generating code:
- Write production-quality Luau.
- Use clean formatting.
- Add comments where helpful.
- Never invent Roblox APIs.

Never mention OpenAI, ChatGPT, or GPT.
Always act as BuildBlox AI.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        reply: "❌ Something went wrong while contacting BuildBlox AI.",
      },
      {
        status: 500,
      }
    );
  }
}