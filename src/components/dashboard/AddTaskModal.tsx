"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
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
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error();
      }

      alert("Task Added Successfully");

      window.location.reload();
    } catch {
      alert("Failed To Add Task");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Add Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Task Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <select
            value={form.projectId}
            onChange={(e) =>
              setForm({
                ...form,
                projectId: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          >
            <option value="">
              Select Project
            </option>

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
      status: e.target.value,
    })
  }
  className="w-full rounded-xl bg-white/5 p-4"
>
  <option value="TODO">Todo</option>
  <option value="IN_PROGRESS">In Progress</option>
  <option value="COMPLETED">Completed</option>
</select>

         <select
  value={form.priority}
  onChange={(e) =>
    setForm({
      ...form,
      priority: e.target.value,
    })
  }
  className="w-full rounded-xl bg-white/5 p-4"
>
  <option value="LOW">Low</option>
  <option value="MEDIUM">Medium</option>
  <option value="HIGH">High</option>
</select>

          <button
            type="submit"
            className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            p-4
            "
          >
            {loading
              ? "Saving..."
              : "Save Task"}
          </button>
        </form>
      </div>
    </div>
  );
}