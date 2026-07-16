"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Mail,
  Phone,
  Globe,
  Building2,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
}

interface Project {
  id: string;
  name: string;
  budget: number;
  status: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
}

export default function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);

  const [client, setClient] = useState<Client | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  async function fetchClient() {
    try {
      const res = await fetch(`/api/clients/${id}`);

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();

      setClient(data.client);
      setProjects(data.projects);
      setTasks(data.tasks);
      setRevenue(data.revenue);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-red-400">
        Client not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Client Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-4xl font-bold">
          {client.name}
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Building2 />
            <span>{client.company}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail />
            <span>{client.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone />
            <span>{client.phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe />
            <span>{client.country}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white/5 p-6">
          <p className="text-slate-400">
            Projects
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {projects.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white/5 p-6">
          <p className="text-slate-400">
            Revenue
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            ₹{revenue}
          </h2>
        </div>

        <div className="rounded-3xl bg-white/5 p-6">
          <p className="text-slate-400">
            Tasks
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {tasks.length}
          </h2>
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-3xl bg-white/5 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p>No Projects</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl bg-white/5 p-4"
              >
                <div className="flex justify-between">
                  <h3>{project.name}</h3>

                  <span>{project.status}</span>
                </div>

                <p className="mt-2">
                  ₹{project.budget}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tasks */}
      <div className="rounded-3xl bg-white/5 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Tasks
        </h2>

        {tasks.length === 0 ? (
          <p>No Tasks</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between rounded-xl bg-white/5 p-4"
              >
                <span>{task.title}</span>

                <span>{task.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}