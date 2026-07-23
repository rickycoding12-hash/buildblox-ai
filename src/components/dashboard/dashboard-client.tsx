"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topbar";
import ChatWindow from "@/components/chat/chat-window";
import ChatInput from "@/components/chat/chat-input";
import StatusPanel from "@/components/preview/status-panel";
import SubscribeModal from "@/components/modals/subscribe-modal";

type ThinkingType = "default" | "script" | "debug" | "ideas";

type Message = {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  thinkingType?: ThinkingType;
};

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  messages: Message[];
};

function getThinkingType(message: string): ThinkingType {
  const text = message.toLowerCase();

  if (
    text.includes("script") ||
    text.includes("lua") ||
    text.includes("code") ||
    text.includes("localscript") ||
    text.includes("serverscript") ||
    text.includes("module") ||
    text.includes("function")
  ) {
    return "script";
  }

  if (
    text.includes("bug") ||
    text.includes("fix") ||
    text.includes("error") ||
    text.includes("issue")
  ) {
    return "debug";
  }

  if (
    text.includes("idea") ||
    text.includes("genre") ||
    text.includes("concept")
  ) {
    return "ideas";
  }

  return "default";
}

export default function DashboardClient() {
 // ===============================
// Projects
// ===============================

const [projects, setProjects] = useState<Project[]>([]);

const [currentProjectId, setCurrentProjectId] =
  useState<string | null>(null);


  useEffect(() => {
  async function syncUser() {
    try {
      await fetch("/api/sync-user", {
        method: "POST",
      });
    } catch (err) {
      console.error("Failed to sync user:", err);
    }
  }

  syncUser();
}, []);

  useEffect(() => {
  const savedProjects = localStorage.getItem("buildblox-projects");
  const savedCurrentProject = localStorage.getItem("buildblox-current");

  if (savedProjects) {
    setProjects(JSON.parse(savedProjects));
  }

  if (savedCurrentProject) {
    setCurrentProjectId(savedCurrentProject);
  }
  
}, []);

useEffect(() => {
  localStorage.setItem(
    "buildblox-projects",
    JSON.stringify(projects)
  );

  localStorage.setItem(
    "buildblox-current",
    currentProjectId ?? ""
  );
}, [projects, currentProjectId]);

const currentProject =
  projects.find(project => project.id === currentProjectId) || null;

const messages = currentProject?.messages || [];

  // UI
  const [showSettings, setShowSettings] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  // Modal Inputs
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

 // ===============================
// Create Project
// ===============================

function createProject() {
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: projectName.trim(),
    description: projectDescription.trim(),
    createdAt: Date.now(),
    messages: [],
  };
setTimeout(() => {
  const textarea = document.querySelector("textarea");
  if (textarea instanceof HTMLTextAreaElement) {
    textarea.focus();
  }
}, 0);
  setProjects((prev) => [newProject, ...prev]);

  setCurrentProjectId(newProject.id);

  setProjectName("");
  setProjectDescription("");

  setShowNewProject(false);
}

// ===============================
// Select Project
// ===============================

function selectProject(id: string) {
  setCurrentProjectId(id);
}

// ===============================
// Delete Project
// ===============================
function deleteProject(id: string) {
  const project = projects.find((p) => p.id === id);

  if (!project) return;

  const confirmed = window.confirm(
    `Delete "${project.name}"?\n\nThis cannot be undone.`
  );

  if (!confirmed) return;

  const updatedProjects = projects.filter((p) => p.id !== id);

  let nextProjectId: string | null = currentProjectId;

  if (currentProjectId === id) {
    nextProjectId =
      updatedProjects.length > 0
        ? updatedProjects[0].id
        : null;
  }

  setProjects(updatedProjects);
  setCurrentProjectId(nextProjectId);

  // Give React time to render the new project, then focus the chat
  requestAnimationFrame(() => {
    const textarea = document.querySelector("textarea");

    if (textarea instanceof HTMLTextAreaElement) {
      textarea.focus();
    }
  });
}
// ===============================
// Send Message
// ===============================

async function sendMessage(message: string) {
  if (!currentProjectId) {
    alert("Please create a project first.");
    return;
  }

  const thinkingType = getThinkingType(message);

  // Add user message + loading message
  setProjects((prev) =>
    prev.map((project) => {
      if (project.id !== currentProjectId) return project;

      return {
        ...project,
        messages: [
          ...project.messages,
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content: "",
            loading: true,
            thinkingType,
          },
        ],
      };
    })
  );

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    // ===========================
    // Subscription Required
    // ===========================
    if (response.status === 403) {
      const data = await response.json();

      setProjects((prev) =>
        prev.map((project) => {
          if (project.id !== currentProjectId) return project;

          const updatedMessages = [...project.messages];

          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: data.reply,
          };

          return {
            ...project,
            messages: updatedMessages,
          };
        })
      );

      setShowSubscribeModal(true);
      return;
    }

    // Other API errors
    if (!response.ok) {
      throw new Error();
    }

    // Successful AI response
    const data = await response.json();

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== currentProjectId) return project;

        const updatedMessages = [...project.messages];

        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: data.reply ?? "No response received.",
        };

        return {
          ...project,
          messages: updatedMessages,
        };
      })
    );
  } catch (err) {
    console.error(err);

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== currentProjectId) return project;

        const updatedMessages = [...project.messages];

        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content:
            "❌ Something went wrong while contacting BuildBlox AI.",
        };

        return {
          ...project,
          messages: updatedMessages,
        };
      })
    );
  }
}

  return (
  <>
    <main className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Sidebar */}

      <aside className="w-72 border-r border-zinc-800 bg-zinc-900/60 backdrop-blur">
        <Sidebar
      projects={projects}
      currentProjectId={currentProjectId}
      onSelectProject={selectProject}
      onDeleteProject={deleteProject}
       onNewProject={() => setShowNewProject(true)}
/>
      </aside>

      {/* Main */}

      <section className="flex min-w-0 flex-1 flex-col">
        <TopBar onSettings={() => setShowSettings(true)} />

        <div className="flex flex-1 justify-center overflow-hidden">
          <div className="flex w-full max-w-5xl flex-col">
            <ChatWindow messages={messages} />

            <div className="border-t border-zinc-800 bg-zinc-950/90 px-6 py-5 backdrop-blur">
              <ChatInput
                onSend={sendMessage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Status */}

      <aside className="w-80 border-l border-zinc-800 bg-zinc-900/60 backdrop-blur">
        <StatusPanel />
      </aside>
    </main>

    {/* ========================= */}
    {/* NEW PROJECT */}
    {/* ========================= */}

    {showNewProject && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => setShowNewProject(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[520px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
        >
          <h2 className="mb-2 text-2xl font-bold text-white">
            Create New Project
          </h2>

          <p className="mb-6 text-zinc-400">
            Start a fresh BuildBlox AI workspace.
          </p>

          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name..."
            className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
          />

          <textarea
            value={projectDescription}
            onChange={(e) =>
              setProjectDescription(e.target.value)
            }
            rows={5}
            placeholder="Describe your Roblox game..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
          />

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowNewProject(false)}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-white hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              onClick={createProject}
              disabled={!projectName.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    )}

    {/* END OF PART 2A */}
        {/* ========================= */}
    {/* SETTINGS */}
    {/* ========================= */}

    {showSettings && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => setShowSettings(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[520px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">
            Settings
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between text-white">
              <span>Dark Theme</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex items-center justify-between text-white">
              <span>Enable Thinking Animation</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex items-center justify-between text-white">
              <span>Auto Save Projects</span>
              <input type="checkbox" defaultChecked />
            </div>

          </div>

          <div className="mt-8 flex justify-end">

            <button
              onClick={() => setShowSettings(false)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
            >
              Done
            </button>
<SubscribeModal
  open={showSubscribeModal}
  onClose={() => setShowSubscribeModal(false)}
/>
          </div>
        </div>
      </div>
  
   )}
  
  </>
);
}