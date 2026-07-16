"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FolderKanban,
  CheckCircle2,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import RevenueChart from "@/components/dashboard/RevenueChart";
import DashboardChart from "@/components/dashboard/DashboardChart";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentClients from "@/components/dashboard/RecentClients";
import RecentTasks from "@/components/dashboard/RecentTasks";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    tasks: 0,
    revenue: 0,

    statusCounts: {
      Lead: 0,
      "Proposal Sent": 0,
      "In Progress": 0,
      Testing: 0,
      Completed: 0,
    },

    recentProjects: [],
    recentTasks: [],
    recentClients: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard 👋
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome back. Here's what's happening today.
          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-300">
          <TrendingUp className="mr-2 inline" size={18} />
          Business Growing
        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Clients"
          value={stats.clients}
          color="cyan"
          icon={<Users size={28} />}
        />

        <StatCard
          title="Projects"
          value={stats.projects}
          color="purple"
          icon={<FolderKanban size={28} />}
        />

        <StatCard
          title="Tasks"
          value={stats.tasks}
          color="emerald"
          icon={<CheckCircle2 size={28} />}
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue}`}
          color="orange"
          icon={<IndianRupee size={28} />}
        />

      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">

        <DashboardChart
          statusCounts={stats.statusCounts}
        />

        <RevenueChart />

      </div>

      {/* Recent */}

      <div className="grid gap-6 xl:grid-cols-3">

        <RecentProjects
          projects={stats.recentProjects}
        />

        <RecentClients
          clients={stats.recentClients}
        />

        <RecentTasks
          tasks={stats.recentTasks}
        />

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  const bg = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
  }[color];

  return (
    <div
      className={`
      relative
      overflow-hidden
      rounded-3xl
      border
      bg-gradient-to-br
      ${bg}
      p-6
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      `}
    >
      <div className="absolute right-5 top-5 opacity-20 scale-150">
        {icon}
      </div>

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="mt-5 text-5xl font-bold">
        {value}
      </h2>

      <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{ width: "75%" }}
        />

      </div>
    </div>
  );
}