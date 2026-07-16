"use client";

import { X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  status: string;
  priority: string;
  client?: {
    name: string;
  };
}

interface Props {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ViewProjectModal({
  open,
  onClose,
  project,
}: Props) {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B1120] p-8 text-white">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Project Details
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
              Project Name
            </p>

            <p className="mt-1 text-xl font-semibold">
              {project.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Client
            </p>

            <p className="mt-1">
              {project.client?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Description
            </p>

            <p className="mt-1 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">

            <div>

              <p className="text-sm text-slate-400">
                Budget
              </p>

              <p className="mt-1 font-semibold text-cyan-400">
                ₹{project.budget.toLocaleString()}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Status
              </p>

              <span
                className="
                  mt-1
                  inline-block
                  rounded-full
                  bg-cyan-500/20
                  px-3
                  py-1
                  text-cyan-400
                "
              >
                {project.status}
              </span>

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Priority
              </p>

              <span
                className="
                  mt-1
                  inline-block
                  rounded-full
                  bg-purple-500/20
                  px-3
                  py-1
                  text-purple-400
                "
              >
                {project.priority}
              </span>

            </div>

          </div>

          <div className="pt-6 flex justify-end">

            <button
              onClick={onClose}
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                px-6
                py-3
                font-semibold
              "
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}