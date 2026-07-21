"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-8 pt-24 pb-32">

        {/* Badge */}

        <div className="mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300">
          🚀 AI Powered Roblox Development
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-center text-6xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          Build Roblox Games
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            10× Faster with AI
          </span>
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-center text-xl leading-9 text-zinc-400">
          Generate Roblox Lua scripts, complete game systems,
          UI, debugging help, mechanics, and game ideas—
          all from a single AI workspace built specifically for Roblox developers.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            href="/sign-up"
            className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500"
          >
            Start Building →
          </Link>

          <a
            href="#features"
            className="rounded-2xl border border-zinc-700 px-8 py-4 text-lg font-semibold text-white transition hover:border-blue-500 hover:bg-zinc-900"
          >
            Explore Features
          </a>

        </div>

        {/* Dashboard Preview */}

        <div className="relative mt-24 w-full max-w-6xl">

          {/* Blue Glow */}

          <div className="absolute inset-0 rounded-[36px] bg-blue-500/20 blur-3xl" />

          {/* Browser Window */}

          <div className="relative overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">

            {/* Browser Top Bar */}

            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6 py-4">

              {/* Traffic Lights */}

              <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-red-500" />

                <div className="h-3 w-3 rounded-full bg-yellow-500" />

                <div className="h-3 w-3 rounded-full bg-green-500" />

              </div>

              {/* Fake URL Bar */}

              <div className="mx-8 flex-1">

                <div className="mx-auto max-w-md rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2 text-center text-sm text-zinc-400">
                  buildblox.ai/dashboard
                </div>

              </div>

              {/* Window Controls */}

              <div className="w-16" />

            </div>

            {/* Screenshot */}

            <img
              src="/images/dashboard.png"
              alt="BuildBlox Dashboard"
              className="block w-full transition duration-700 hover:scale-[1.01]"
            />

          </div>

        </div>

      </div>
    </section>
  );
}