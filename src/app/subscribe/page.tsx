import Link from "next/link";

export default function SubscribePage() {
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
            BuildBlox AI gives you everything you need to create professional
            Roblox experiences using the latest AI models.
          </p>

        </div>

        {/* Pricing */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {/* AI */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 backdrop-blur">

            <h2 className="text-3xl font-bold">
              BuildBlox AI
            </h2>

            <p className="mt-2 text-zinc-400">
              Perfect for solo Roblox developers.
            </p>

            <div className="mt-8">
              <span className="text-6xl font-bold">
                $9.99
              </span>

              <span className="ml-2 text-zinc-500">
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

            <button className="mt-12 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-500">
              Subscribe
            </button>

          </div>

          {/* AI+ */}

          <div className="relative overflow-hidden rounded-3xl border border-blue-500 bg-gradient-to-br from-blue-600/20 to-zinc-900 p-10 shadow-[0_0_60px_rgba(37,99,235,0.35)]">

            <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold">
              BuildBlox AI+
            </h2>

            <p className="mt-2 text-zinc-300">
              For studios and serious developers.
            </p>

            <div className="mt-8">
              <span className="text-6xl font-bold">
                $19.99
              </span>

              <span className="ml-2 text-zinc-300">
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
              className="mt-12 w-full cursor-not-allowed rounded-2xl border border-blue-500 py-4 text-lg font-semibold opacity-80"
            >
              Coming Soon
            </button>

          </div>

        </div>

        {/* Trust */}

        <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">

          <h3 className="text-2xl font-semibold">
            Why BuildBlox AI?
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-3">

            <div>
              <div className="text-4xl">⚡</div>

              <h4 className="mt-4 font-semibold">
                Fast Generation
              </h4>

              <p className="mt-2 text-sm text-zinc-400">
                Generate Roblox scripts, UI, mechanics, and systems in seconds.
              </p>
            </div>

            <div>
              <div className="text-4xl">🔒</div>

              <h4 className="mt-4 font-semibold">
                Secure Payments
              </h4>

              <p className="mt-2 text-sm text-zinc-400">
                Payments will be securely processed through Stripe.
              </p>
            </div>

            <div>
              <div className="text-4xl">🚀</div>

              <h4 className="mt-4 font-semibold">
                Constant Updates
              </h4>

              <p className="mt-2 text-sm text-zinc-400">
                New AI models and Roblox tools are added regularly.
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-16 text-center">

          <p className="text-zinc-500">
            Cancel anytime. No long-term contracts.
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