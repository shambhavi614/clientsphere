"use client";

interface Props {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
}