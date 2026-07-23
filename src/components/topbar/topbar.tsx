"use client";

import { useUser } from "@clerk/nextjs";

interface TopBarProps {
  onSettings: () => void;
}

export default function TopBar({ onSettings }: TopBarProps) {
  const { user } = useUser();

  const userLetter =
    user?.firstName?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    user?.emailAddresses?.[0]?.emailAddress?.charAt(0).toUpperCase() ||
    "U";

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6 py-4">
      <div>
        <h1 className="text-3xl font-bold text-white">
          AI Builder
        </h1>

        <p className="text-sm text-zinc-400">
          Build Roblox games with AI
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onSettings}
          className="rounded-xl border border-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-800"
        >
          Settings
        </button>

        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-blue-600">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-bold text-white">
              {userLetter}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}