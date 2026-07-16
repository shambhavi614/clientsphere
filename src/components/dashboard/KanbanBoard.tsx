"use client";

interface Task {
  id: string;
  title: string;
  status: string;
}

interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({
  tasks,
}: KanbanBoardProps) {
  const todo = tasks.filter(
    (task) => task.status === "TODO"
  );

  const progress = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const done = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* TODO */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-5 text-xl font-bold">
          Todo
        </h2>

        <div className="space-y-3">
          {todo.length > 0 ? (
            todo.map((task) => (
              <div
                key={task.id}
                className="rounded-xl bg-cyan-500/20 p-3"
              >
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No Tasks
            </p>
          )}
        </div>
      </div>

      {/* IN PROGRESS */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-5 text-xl font-bold">
          In Progress
        </h2>

        <div className="space-y-3">
          {progress.length > 0 ? (
            progress.map((task) => (
              <div
                key={task.id}
                className="rounded-xl bg-yellow-500/20 p-3"
              >
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No Tasks
            </p>
          )}
        </div>
      </div>

      {/* COMPLETED */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-5 text-xl font-bold">
          Completed
        </h2>

        <div className="space-y-3">
          {done.length > 0 ? (
            done.map((task) => (
              <div
                key={task.id}
                className="rounded-xl bg-green-500/20 p-3"
              >
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No Tasks
            </p>
          )}
        </div>
      </div>
    </div>
  );
}