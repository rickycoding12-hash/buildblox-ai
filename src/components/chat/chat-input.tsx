"use client";

import { useRef, useState } from "react";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }

  function handleSend() {
    const trimmed = message.trim();

    if (!trimmed) return;

    onSend(trimmed);
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  }

  return (
    <div className="border-t border-zinc-800 bg-[#0b0b0d] px-8 py-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-end gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
          <textarea
            ref={textareaRef}
            value={message}
            rows={1}
            placeholder="Describe your Roblox game..."
            onChange={(e) => {
              setMessage(e.target.value);

              requestAnimationFrame(() => {
                resize();
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="max-h-[180px] min-h-[56px] flex-1 resize-none overflow-y-auto bg-transparent text-[16px] leading-7 text-white placeholder:text-zinc-500 outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate →
          </button>
        </div>

        <div className="mt-3 flex justify-between px-2 text-sm text-zinc-500">
          <span>Press Enter to send</span>
          <span>Shift + Enter for a new line</span>
        </div>
      </div>
    </div>
  );
}