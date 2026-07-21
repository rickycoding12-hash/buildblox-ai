"use client";

import { useEffect, useState } from "react";

type ThinkingType = "default" | "script" | "debug" | "ideas";

interface Props {
  type?: ThinkingType;
}

const thinkingMessages: Record<ThinkingType, string[]> = {
  default: [
    "🤖 BuildBlox AI is thinking...",
    "🧠 Understanding your request...",
    "✨ Preparing the best response...",
  ],

  script: [
    "🧠 Understanding your Roblox game...",
    "📜 Writing Lua code...",
    "⚙️ Optimizing the script...",
    "🔍 Checking for errors...",
    "✨ Finalizing everything...",
  ],

  debug: [
    "🔍 Reading your script...",
    "🐞 Finding the issue...",
    "🛠 Building a fix...",
    "✅ Double-checking the solution...",
  ],

  ideas: [
    "💡 Brainstorming ideas...",
    "🎮 Designing gameplay...",
    "🚀 Making it more fun...",
    "✨ Finishing your ideas...",
  ],
};

export default function ThinkingIndicator({
  type = "default",
}: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % thinkingMessages[type].length);
    }, 1800);

    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce" />
        <span
          className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        />
      </div>

      <span className="text-zinc-300 text-[15px]">
        {thinkingMessages[type][step]}
      </span>
    </div>
  );
}