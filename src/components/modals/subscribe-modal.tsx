"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SubscribeModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">

        <div className="text-center">

          <div className="text-6xl">
            🔒
          </div>

          <h2 className="mt-6 text-4xl font-bold">
            Unlock BuildBlox AI
          </h2>

          <p className="mt-4 text-zinc-400">
            You need an active subscription to continue generating Roblox code.
          </p>

        </div>

        <div className="mt-10 space-y-4">

          <Feature text="Unlimited AI generations" />
          <Feature text="GPT-5 mini access" />
          <Feature text="Unlimited Roblox projects" />
          <Feature text="Future updates included" />

        </div>

        <div className="mt-10 space-y-4">

          <button
            onClick={() => {
              window.location.href = "/subscribe";
            }}
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-500"
          >
            Subscribe Now
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-zinc-700 py-4"
          >
            Maybe Later
          </button>

        </div>

      </div>

    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-green-400">
        ✓
      </div>

      <span>{text}</span>

    </div>
  );
}