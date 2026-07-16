"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Client {
  id: string;
  name: string;
}

interface Project {
  id?: string;
  name: string;
  description: string;
  budget: number | string;
  status: string;
  priority: string;
  clientId?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  project,
}: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    budget: "",
    status: "LEAD",
    priority: "MEDIUM",
    clientId: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description,
        budget: String(project.budget),
        status: project.status,
        priority: project.priority,
        clientId: project.clientId || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        budget: "",
        status: "LEAD",
        priority: "MEDIUM",
        clientId: "",
      });
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen]);

  async function fetchClients() {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();

      console.log("Clients:", data);

      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.clientId) {
      alert("Please select a client.");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      budget: Number(form.budget),
      status: form.status,
      priority: form.priority,
      clientId: form.clientId,
    };

    console.log("PROJECT PAYLOAD:", payload);

    try {
      const url = project
        ? `/api/projects/${project.id}`
        : "/api/projects";

      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("SERVER RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Failed to save project");
        return;
      }

      alert(project ? "Project Updated!" : "Project Added!");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
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
            {project ? "Edit Project" : "Add Project"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
            required
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

          <input
            type="number"
            placeholder="Budget"
            value={form.budget}
            onChange={(e) =>
              setForm({
                ...form,
                budget: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
            required
          />

          <select
            value={form.clientId}
            onChange={(e) =>
              setForm({
                ...form,
                clientId: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
            required
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
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
            <option value="LEAD">Lead</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
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
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 p-4 font-semibold"
          >
            {loading
              ? "Saving..."
              : project
              ? "Update Project"
              : "Save Project"}
          </button>

        </form>

      </div>

    </div>
  );
}