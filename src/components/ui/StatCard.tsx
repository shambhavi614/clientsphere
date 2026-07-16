"use client";

import GlassCard from "./GlassCard";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <GlassCard>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-cyan-500/20 p-4">
        <div
className="
mb-6
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-purple-600
text-gray-900 dark:text-white
shadow-lg
"
>
          {icon}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}