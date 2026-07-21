"use client";

import {
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";

type Project = {
  id: string;
  name: string;
  description: string;
};

interface SidebarProps {
  projects: Project[];
  currentProjectId: string | null;

  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

export default function Sidebar({
  projects,
  currentProjectId,
  onSelectProject,
  onDeleteProject,
  onNewProject,
}: SidebarProps) {
  const { user } = useUser();

  return (
    <aside className="flex h-full w-72 flex-col border-r border-zinc-800 bg-zinc-900 p-6">

      {/* Logo */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          🤖 BuildBlox AI
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Roblox Development Assistant
        </p>
      </div>

      {/* New Project */}

      <button
        onClick={onNewProject}
        className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500"
      >
        + New Project
      </button>

      {/* Projects */}

      <div className="mt-10 flex-1 overflow-y-auto">

        <h2 className="mb-4 text-sm uppercase tracking-wider text-zinc-500">
          Projects
        </h2>

        {projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-700 p-4 text-sm text-zinc-500">
            No projects yet.
          </div>
        )}

        <div className="space-y-3">

          {projects.map((project) => (
            <div
              key={project.id}
              className={`group flex items-center rounded-xl border transition ${
                currentProjectId === project.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-transparent bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              <button
                onClick={() => onSelectProject(project.id)}
                className="flex-1 px-4 py-3 text-left"
              >
                <div className="font-medium text-white">
                  {project.name}
                </div>

                {project.description && (
                  <div className="mt-1 line-clamp-1 text-xs text-zinc-400">
                    {project.description}
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDeleteProject(project.id);
                }}
                className="mr-2 rounded-lg p-2 text-zinc-500 opacity-0 transition hover:bg-red-500 hover:text-white group-hover:opacity-100"
              >
                🗑️
              </button>
            </div>
          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-zinc-800 pt-5">

        <div className="flex items-center gap-3">

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-11 w-11",
              },
            }}
          />

          <div className="min-w-0 flex-1">

            <div className="truncate font-medium text-white">
              {user?.fullName || user?.firstName || "User"}
            </div>

            <div className="truncate text-sm text-zinc-500">
              {user?.primaryEmailAddress?.emailAddress}
            </div>

          </div>

        </div>

        <div className="mt-4">

          <SignOutButton redirectUrl="/">
            <button className="w-full rounded-xl border border-zinc-700 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500 hover:bg-red-500 hover:text-white">
              Sign Out
            </button>
          </SignOutButton>

        </div>

      </div>

    </aside>
  );
}