"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckCircle2,
  Receipt,
  StickyNote,
  Sparkles,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckCircle2,
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Receipt,
  },
  {
    name: "Notes",
    href: "/dashboard/notes",
    icon: StickyNote,
  },
  {
    name: "AI Workspace",
    href: "/dashboard/ai",
    icon: Sparkles,
  },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function MobileSidebar({
  open,
  setOpen,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#050816] border-r border-white/10 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ClientSphere
          </h1>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="p-5 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                  pathname === item.href
                    ? "bg-cyan-500 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}