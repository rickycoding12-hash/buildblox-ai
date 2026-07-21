import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import ThinkingIndicator from "./thinking-indicator";

import "highlight.js/styles/github-dark.css";

type ThinkingType = "default" | "script" | "debug" | "ideas";

type Message = {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  thinkingType?: ThinkingType;
};

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0b0b0d] px-8 py-10">
      <div className="mx-auto w-full max-w-5xl">

        {messages.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl">
                🤖
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome to BuildBlox AI
                </h2>

                <p className="mt-2 leading-7 text-zinc-400">
                  Describe your Roblox game and I'll generate scripts,
                  systems, UI, mechanics, debugging help, and complete game
                  architecture.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-10">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-4 ${
                  message.role === "user"
                    ? "max-w-[70%] flex-row-reverse"
                    : "w-full max-w-[900px]"
                }`}
              >
                {/* Avatar */}

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-white ${
                    message.role === "user"
                      ? "bg-blue-600"
                      : "bg-zinc-700"
                  }`}
                >
                  {message.role === "user" ? "R" : "🤖"}
                </div>

                {/* Bubble */}

                <div
                  className={`min-w-0 rounded-3xl shadow-lg ${
                    message.role === "user"
                      ? "bg-blue-600 px-6 py-5 text-white"
                      : "w-full border border-zinc-800 bg-zinc-900 px-8 py-7"
                  }`}
                >
                  <div className="mb-4 text-sm font-semibold text-zinc-400">
                    {message.role === "user" ? "You" : "BuildBlox AI"}
                  </div>

                  {message.role === "assistant" ? (
                    message.loading ? (
                      <ThinkingIndicator
                        type={message.thinkingType}
                      />
                    ) : (
                      <div
                        className="
                          prose
                          prose-invert
                          prose-lg
                          max-w-none

                          prose-headings:text-white
                          prose-headings:font-bold

                          prose-p:text-zinc-200
                          prose-p:leading-8

                          prose-li:text-zinc-300

                          prose-strong:text-white

                          prose-code:text-blue-300
                          prose-code:before:content-none
                          prose-code:after:content-none

                          prose-pre:bg-[#0d1117]
                          prose-pre:border
                          prose-pre:border-zinc-700
                          prose-pre:rounded-2xl
                          prose-pre:p-5
                          prose-pre:overflow-x-auto

                          prose-table:block
                          prose-table:w-full
                          prose-table:overflow-x-auto

                          prose-th:border
                          prose-td:border

                          prose-th:border-zinc-700
                          prose-td:border-zinc-700

                          prose-img:rounded-xl
                        "
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )
                  ) : (
                    <p className="whitespace-pre-wrap text-[16px] leading-8">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}