"use client";

import { useEffect, useState } from "react";

import AddTaskModal from "@/components/dashboard/AddTaskModal";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import ViewTaskModal from "@/components/dashboard/ViewTaskModal";
import EditTaskModal from "@/components/dashboard/EditTaskModal";
import { Eye, Pencil, Trash2, Plus, CheckCircle2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;

  project: {
    id: string;
    name: string;
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);

const [addOpen, setAddOpen] = useState(false);

const [viewOpen, setViewOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);

const [selectedTask, setSelectedTask] =
  useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: string) {
    if (!confirm("Delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      alert("Failed to delete task");
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Tasks</h1>

            <p className="mt-2 text-slate-400">
              Manage all project tasks.
            </p>
          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>

        {/* KANBAN BOARD */}

        {!loading && tasks.length > 0 && (
          <KanbanBoard tasks={tasks} />
        )}

        {/* Loading */}

        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5">
            <CheckCircle2
              size={60}
              className="text-cyan-400"
            />

            <h2 className="mt-6 text-3xl font-bold">
              No Tasks Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Create your first task.
            </p>

            <button
              onClick={() => setAddOpen(true)}
              className="mt-8 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3"
            >
              Add Task
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm">
                    {task.status}
                  </span>
                </div>

                <p className="mt-3 text-slate-400">
                  {task.description}
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Project
                    </p>

                    <p>{task.project?.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Priority
                    </p>

                    <p>{task.priority}</p>
                  </div>
                </div>

               <div className="mt-6 flex gap-3">

  <button
    onClick={() => {
      setSelectedTask(task);
      setViewOpen(true);
    }}
    className="flex items-center gap-2 rounded-xl bg-cyan-500/20 px-4 py-2 text-cyan-400 hover:bg-cyan-500/30"
  >
    <Eye size={16} />
    View
  </button>

  <button
    onClick={() => {
      setSelectedTask(task);
      setEditOpen(true);
    }}
    className="flex items-center gap-2 rounded-xl bg-blue-500/20 px-4 py-2 text-blue-400 hover:bg-blue-500/30"
  >
    <Pencil size={16} />
    Edit
  </button>

  <button
    onClick={() => deleteTask(task.id)}
    className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-red-400 hover:bg-red-500/30"
  >
    <Trash2 size={16} />
    Delete
  </button>

</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddTaskModal
  isOpen={addOpen}
  onClose={() => {
    setAddOpen(false);
    fetchTasks();
  }}
/>

<ViewTaskModal
  isOpen={viewOpen}
  onClose={() => setViewOpen(false)}
  task={selectedTask}
/>

<EditTaskModal
  isOpen={editOpen}
  onClose={() => {
    setEditOpen(false);
    fetchTasks();
  }}
  task={selectedTask}
/>
    </>
  );
}