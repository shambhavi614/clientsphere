"use client";

import { X } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project?: {
    name: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function ViewTaskModal({
  isOpen,
  onClose,
  task,
}: Props) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8 text-white">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Task Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        <div className="space-y-6">

          <div>
            <p className="text-sm text-slate-400">
              Title
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              {task.title}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Description
            </p>

            <div className="mt-2 rounded-xl bg-white/5 p-4">
              {task.description || "No description"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-400">
                Status
              </p>

              <div className="mt-2 rounded-xl bg-cyan-500/20 p-3 text-center font-semibold text-cyan-400">
                {task.status}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Priority
              </p>

              <div className="mt-2 rounded-xl bg-purple-500/20 p-3 text-center font-semibold text-purple-400">
                {task.priority}
              </div>
            </div>

          </div>

          <div>
            <p className="text-sm text-slate-400">
              Project
            </p>

            <div className="mt-2 rounded-xl bg-white/5 p-4">
              {task.project?.name || "-"}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-semibold transition hover:bg-cyan-600"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}