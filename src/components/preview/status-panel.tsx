export default function StatusPanel() {
  return (
    <aside className="w-80 border-l border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold">
        Live Build
      </h2>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>

          <span className="text-sm">
            Ready
          </span>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          Waiting for generation...
        </div>
      </div>
    </aside>
  );
}