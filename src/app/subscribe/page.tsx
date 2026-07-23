"use client";

import Link from "next/link";

export default function SubscribePage() {
  async function handleCheckout() {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090b] via-[#0b1120] to-[#09090b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Header */}

        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-5xl shadow-[0_0_60px_rgba(37,99,235,0.45)]">
              🤖
            </div>
          </div>

          <h1 className="text-5xl font-bold md:text-6xl">
            Choose Your Plan
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Unlock the full power of BuildBlox AI and build Roblox games
            faster than ever.
          </p>
        </div>

        {/* Pricing */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* AI */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 backdrop-blur transition hover:border-blue-500">
            <h2 className="text-3xl font-bold">
              BuildBlox AI
            </h2>

            <p className="mt-2 text-zinc-400">
              Perfect for solo Roblox developers.
            </p>

            <div className="mt-8 flex items-end">
              <span className="text-6xl font-bold">
                $9.99
              </span>

              <span className="ml-2 mb-2 text-zinc-500">
                /month
              </span>
            </div>

            <div className="mt-10 space-y-5">
              <Feature text="Unlimited AI generations" />
              <Feature text="Unlimited Roblox projects" />
              <Feature text="GPT-5 mini" />
              <Feature text="Advanced Luau scripting" />
              <Feature text="UI generation" />
              <Feature text="Debugging assistance" />
              <Feature text="Future updates included" />
            </div>

            <button
              onClick={handleCheckout}
              className="mt-12 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold transition hover:scale-[1.02] hover:bg-blue-500 active:scale-100"
            >
              Subscribe with Stripe
            </button>
          </div>

          {/* AI+ */}

          <div className="relative overflow-hidden rounded-3xl border border-blue-500 bg-gradient-to-br from-blue-600/20 to-zinc-900 p-10 shadow-[0_0_60px_rgba(37,99,235,0.35)]">
            <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
              COMING SOON
            </div>

            <h2 className="text-3xl font-bold">
              BuildBlox AI+
            </h2>

            <p className="mt-2 text-zinc-300">
              Built for studios and professional developers.
            </p>

            <div className="mt-8 flex items-end">
              <span className="text-6xl font-bold">
                $19.99
              </span>

              <span className="ml-2 mb-2 text-zinc-300">
                /month
              </span>
            </div>

            <div className="mt-10 space-y-5">
              <Feature text="Everything in BuildBlox AI" />
              <Feature text="GPT-5" />
              <Feature text="Priority AI responses" />
              <Feature text="AI Agents" />
              <Feature text="Complete game generation" />
              <Feature text="Early access features" />
              <Feature text="Premium future models" />
            </div>

            <button
              disabled
              className="mt-12 w-full cursor-not-allowed rounded-2xl border border-blue-500 py-4 text-lg font-semibold opacity-70"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* Trust Section */}

        <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10">
          <h3 className="text-center text-2xl font-semibold">
            Why developers choose BuildBlox AI
          </h3>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <TrustCard
              icon="⚡"
              title="Lightning Fast"
              text="Generate Roblox scripts, systems, mechanics and UI in seconds."
            />

            <TrustCard
              icon="🔒"
              title="Secure Payments"
              text="Powered by Stripe with encrypted and secure checkout."
            />

            <TrustCard
              icon="🚀"
              title="Always Improving"
              text="New AI models and Roblox features are added regularly."
            />
          </div>
        </div>

        {/* Footer */}

        <div className="mt-16 text-center">
          <p className="text-zinc-500">
            Cancel anytime • No contracts • Secure Stripe Checkout
          </p>

          <Link
            href="/"
            className="mt-6 inline-block text-blue-400 transition hover:text-blue-300"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 text-green-400">
        ✓
      </div>

      <span>{text}</span>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-center">
      <div className="text-4xl">{icon}</div>

      <h4 className="mt-4 text-lg font-semibold">
        {title}
      </h4>

      <p className="mt-2 text-sm text-zinc-400">
        {text}
      </p>
    </div>
  );
}