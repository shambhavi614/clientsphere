"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Briefcase,
  Send,
  Loader2,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";

const COLORS = [
  "#06B6D4",
  "#8B5CF6",
  "#F59E0B",
  "#F43F5E",
  "#22C55E",
];

export default function DashboardChart({
  statusCounts,
}: {
  statusCounts: {
    Lead: number;
    "Proposal Sent": number;
    "In Progress": number;
    Testing: number;
    Completed: number;
  };
}) {
  const data = [
    {
      name: "Lead",
      value: statusCounts.Lead,
      icon: Briefcase,
      color: COLORS[0],
    },
    {
      name: "Proposal",
      value: statusCounts["Proposal Sent"],
      icon: Send,
      color: COLORS[1],
    },
    {
      name: "Progress",
      value: statusCounts["In Progress"],
      icon: Loader2,
      color: COLORS[2],
    },
    {
      name: "Testing",
      value: statusCounts.Testing,
      icon: FlaskConical,
      color: COLORS[3],
    },
    {
      name: "Completed",
      value: statusCounts.Completed,
      icon: CheckCircle2,
      color: COLORS[4],
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101827] via-[#0f172a] to-[#111827] p-7">

      {/* Glow */}
      <div className="absolute -top-24 -right-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Project Analytics
            </h2>

            <p className="mt-1 text-slate-400">
              Live project distribution
            </p>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 px-5 py-3">
            <p className="text-xs text-slate-400">
              Total Projects
            </p>

            <h2 className="text-3xl font-bold text-cyan-400">
              {total}
            </h2>
          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Chart */}

          <div className="relative h-[350px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={90}
                  outerRadius={125}
                  cornerRadius={15}
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #334155",
                    borderRadius: 18,
                    color: "#fff",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* Center */}

            <div className="absolute inset-0 flex items-center justify-center">

              <div className="text-center">

                <p className="text-sm text-slate-400">
                  Active
                </p>

                <h1 className="text-5xl font-bold">
                  {total}
                </h1>

                <div className="mt-3 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  +12% this month
                </div>

              </div>

            </div>

          </div>

          {/* Status Cards */}

          <div className="space-y-4">

            {data.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.04] px-5 py-4 transition hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-4">

                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: `${item.color}20`,
                      }}
                    >
                      <Icon
                        size={22}
                        color={item.color}
                      />
                    </div>

                    <div>

                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-400">
                        Project Status
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <h2
                      className="text-3xl font-bold"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </h2>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}