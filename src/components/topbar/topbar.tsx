"use client";

interface TopBarProps {
  onSettings: () => void;
}

export default function TopBar({ onSettings }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          AI Builder
        </h2>

        <p className="text-xs text-zinc-400">
          Build Roblox games with AI
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onSettings}
          className="rounded-lg border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800"
        >
          Settings
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
          R
        </div>
      </div>
    </header>
  );
}