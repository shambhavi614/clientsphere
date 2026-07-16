"use client";

import AnimatedCard from "./AnimatedCard";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatedCard
      className={`p-6 ${className}`}
    >
      {children}
    </AnimatedCard>
  );
}