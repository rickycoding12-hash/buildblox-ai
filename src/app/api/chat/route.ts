import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  console.log("1 - API started");
  try {
    const { userId } = await auth();
console.log("2 - userId:", userId);

    if (!userId) {
      return NextResponse.json(
        {
          reply: "Please sign in first.",
        },
        {
          status: 401,
        }
      );
    }
console.log("3 - querying supabase");
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("subscription_status")
      .eq("clerk_user_id", userId)
      .single();
console.log("4 - supabase returned", user, error);
    if (error || !user) {
      return NextResponse.json(
        {
          reply: "Unable to verify your subscription.",
        },
        {
          status: 403,
        }
      );
    }

    if (user.subscription_status !== "active") {
      return NextResponse.json(
        {
          reply:
            "🔒 BuildBlox AI requires an active subscription. Visit the Subscribe page to unlock unlimited AI generations.",
        },
        {
          status: 403,
        }
      );
    }
console.log("5 - calling OpenAI");
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
console.log("6 - OpenAI finished");
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