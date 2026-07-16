"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import AddProjectModal from "@/components/dashboard/AddProjectModal";
import ViewProjectModal from "@/components/dashboard/ViewProjectModal";

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  status: string;
  priority: string;
  clientId: string;

  client: {
    name: string;
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] =
    useState(false);

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const [openViewModal, setOpenViewModal] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    const ok = confirm(
      "Delete this project?"
    );

    if (!ok) return;

    try {
      const res = await fetch(
        `/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok)
        throw new Error();

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project.id !== id
        )
      );

      alert("Project Deleted");
    } catch (err) {
      console.log(err);
      alert(
        "Failed to delete project"
      );
    }
  }

  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-slate-400">
              Manage all client projects.
            </p>
          </div>

          <button
            onClick={() =>
              setOpenAddModal(true)
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              px-5
              py-3
              text-white
            "
          >
            <Plus size={18} />
            Add Project
          </button>

        </div>

        {loading ? (

          <div className="text-center py-20">
            Loading...
          </div>

        ) : projects.length === 0 ? (

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-12
              text-center
            "
          >
            No Projects Found
          </div>

        ) : (

          <div className="grid gap-6">

            {projects.map((project) => (

              <div
                key={project.id}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-xl
                "
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold">
                    {project.name}
                  </h2>

                  <span
                    className="
                      rounded-full
                      bg-cyan-500/20
                      px-4
                      py-1
                      text-sm
                    "
                  >
                    {project.status}
                  </span>

                </div>

                <p className="mt-4 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                  <div>
                    <p className="text-slate-500 text-sm">
                      Client
                    </p>

                    <p>
                      {project.client?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-sm">
                      Budget
                    </p>

                    <p>
                      ₹{project.budget}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-sm">
                      Priority
                    </p>

                    <p>
                      {project.priority}
                    </p>
                  </div>

                </div>

                <div className="mt-8 flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedProject(
                        project
                      );
                      setOpenViewModal(
                        true
                      );
                    }}
                    className="
                      rounded-xl
                      bg-cyan-500/20
                      p-3
                      text-cyan-400
                      hover:bg-cyan-500/30
                    "
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProject(
                        project
                      );
                      setOpenEditModal(
                        true
                      );
                    }}
                    className="
                      rounded-xl
                      bg-blue-500/20
                      p-3
                      text-blue-400
                      hover:bg-blue-500/30
                    "
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      deleteProject(
                        project.id
                      )
                    }
                    className="
                      rounded-xl
                      bg-red-500/20
                      p-3
                      text-red-400
                      hover:bg-red-500/30
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <AddProjectModal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          fetchProjects();
        }}
      />

      <AddProjectModal
        isOpen={openEditModal}
        project={selectedProject}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedProject(null);
          fetchProjects();
        }}
      />

      <ViewProjectModal
        open={openViewModal}
        project={selectedProject}
        onClose={() => {
          setOpenViewModal(false);
          setSelectedProject(null);
        }}
      />
    </>
  );
}