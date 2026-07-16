interface Client {
  id: string;
  name: string;
  company: string;
}

export default function RecentClients({
  clients,
}: {
  clients: Client[];
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
            Recent Clients
          </h2>

          <p className="text-slate-400 text-sm">
            Newly added clients
          </p>
        </div>

        <span className="text-cyan-400 text-sm font-semibold">
          {clients.length} Clients
        </span>
      </div>

      {clients.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No Clients Found
        </div>
      ) : (
        <div className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.id}
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
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-cyan-500
                  text-lg
                  font-bold
                  "
                >
                  {client.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {client.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {client.company}
                  </p>
                </div>

              </div>

              <span
                className="
                rounded-full
                bg-cyan-500/20
                px-4
                py-2
                text-xs
                font-semibold
                text-cyan-400
                "
              >
                Active
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}