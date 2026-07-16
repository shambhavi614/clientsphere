"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", revenue: 20000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 70000 },
  { month: "Apr", revenue: 115000 },
  { month: "May", revenue: 135000 },
  { month: "Jun", revenue: 182000 },
];

export default function RevenueChart() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#101827] p-7">

      {/* Glow */}
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Revenue Analytics
            </h2>

            <p className="mt-1 text-slate-400">
              Monthly revenue growth
            </p>

          </div>

          <div className="rounded-2xl bg-emerald-500/15 px-5 py-3">

            <div className="flex items-center gap-2">

              <TrendingUp
                size={18}
                className="text-emerald-400"
              />

              <span className="font-semibold text-emerald-400">
                +28%
              </span>

            </div>

            <p className="text-xs text-slate-400">
              vs last month
            </p>

          </div>

        </div>

        <div className="mt-8 h-[320px]">

          <ResponsiveContainer>

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#06B6D4"
                    stopOpacity={0.7}
                  />

                  <stop
                    offset="100%"
                    stopColor="#06B6D4"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1E293B"
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  borderRadius: 16,
                  border: "1px solid #334155",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#06B6D4"
                strokeWidth={4}
                fill="url(#colorRevenue)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}