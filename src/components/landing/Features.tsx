"use client";

const features = [
  {
    title: "Generate Lua Scripts",
    description:
      "Create production-ready Roblox Lua scripts in seconds with AI assistance.",
    icon: "⚡",
  },
  {
    title: "Complete Game Systems",
    description:
      "Generate inventories, combat systems, pets, tycoons, simulators, and more.",
    icon: "🎮",
  },
  {
    title: "Debug Faster",
    description:
      "Paste broken Roblox code and let BuildBlox explain and fix it instantly.",
    icon: "🛠️",
  },
  {
    title: "Smart UI Creation",
    description:
      "Design modern Roblox interfaces without starting from scratch.",
    icon: "🎨",
  },
  {
    title: "Project Organization",
    description:
      "Keep every game organized into separate AI workspaces and conversations.",
    icon: "📂",
  },
  {
    title: "Built for Roblox",
    description:
      "Every response is optimized specifically for Roblox Studio development.",
    icon: "🤖",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-8 py-32"
    >
      <div className="text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-blue-400">
          Features
        </p>

        <h2 className="mt-4 text-5xl font-bold text-white">
          Everything You Need
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          BuildBlox gives Roblox developers everything needed to
          create games faster with AI.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              group
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900/60
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-blue-500/50
              hover:bg-zinc-900
            "
          >
            <div className="mb-6 text-5xl">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {feature.title}
            </h3>

            <p className="mt-4 leading-8 text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}