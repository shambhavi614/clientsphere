"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    projectId: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        projectId: task.projectId,
      });
    }
  }, [task]);

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!task) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update Failed");
        return;
      }

      alert("Task Updated Successfully");

      onClose();

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Edit Task
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X className="text-white" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Task Title"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            required
          />

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            placeholder="Description"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <select
            value={form.projectId}
            onChange={(e) =>
              setForm({
                ...form,
                projectId:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
          >
            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
          >
            <option value="TODO">
              Todo
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
          >
            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>
          </select>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 text-white hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3 font-semibold text-white"
            >
              {loading
                ? "Updating..."
                : "Update Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}