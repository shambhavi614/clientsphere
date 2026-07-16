interface Task {
  id: string;
  title: string;
  status: string;
}

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",

  "In Progress":
    "bg-cyan-500/20 text-cyan-400",

  Completed:
    "bg-emerald-500/20 text-emerald-400",
};

export default function RecentTasks({
  tasks,
}: {
  tasks: Task[];
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      "
    >
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Recent Tasks
          </h2>

          <p className="text-slate-400 text-sm">
            Latest assigned tasks
          </p>
        </div>

        <span className="text-cyan-400 text-sm font-semibold">
          {tasks.length} Tasks
        </span>

      </div>

      {tasks.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No Tasks Found
        </div>
      ) : (
        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-white/5
              bg-white/5
              p-4
              transition
              hover:bg-white/10
              hover:border-cyan-500/30
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-cyan-500
                  font-bold
                  "
                >
                  ✓
                </div>

                <div>

                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    Task ID • {task.id.slice(0, 6)}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  statusColor[task.status] ||
                  "bg-slate-500/20 text-slate-300"
                }`}
              >
                {task.status}
              </span>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}