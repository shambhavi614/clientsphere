interface Project {
  id: string;
  name: string;
  status: string;
  client: {
    name: string;
  };
}

const statusColor: Record<string, string> = {
  Lead: "bg-blue-500/20 text-blue-400",

  "Proposal Sent":
    "bg-yellow-500/20 text-yellow-400",

  "In Progress":
    "bg-cyan-500/20 text-cyan-400",

  Testing:
    "bg-purple-500/20 text-purple-400",

  Completed:
    "bg-emerald-500/20 text-emerald-400",
};

export default function RecentProjects({
  projects,
}: {
  projects: Project[];
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
            Recent Projects
          </h2>

          <p className="text-slate-400 text-sm">
            Latest client work
          </p>
        </div>

        <span className="text-cyan-400 text-sm font-semibold">
          {projects.length} Active
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No Projects Found
        </div>
      ) : (
        <div className="space-y-4">

          {projects.map((project) => (

            <div
              key={project.id}
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
              hover:border-cyan-500/30
              hover:bg-white/10
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  font-bold
                  "
                >
                  {project.name.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {project.client.name}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  statusColor[
                    project.status
                  ] ||
                  "bg-slate-500/20 text-slate-300"
                }`}
              >
                {project.status}
              </span>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}