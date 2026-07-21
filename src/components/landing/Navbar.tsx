"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            B
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              BuildBlox
            </h1>

            <p className="text-xs text-zinc-500">
              AI Roblox Development
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how" className="transition hover:text-white">
            How It Works
          </a>

          <a href="/subscribe" className="transition hover:text-white">
            Pricing
          </a>
        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-3">

          <Link
  href="/sign-in"
  className="text-zinc-300 transition hover:text-white"
>
  Login
</Link>

          <Link
  href="/sign-up"
  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  Get Started
</Link>

        </div>

      </div>
    </header>
  );
}