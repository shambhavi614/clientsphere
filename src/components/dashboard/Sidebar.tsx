"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardCheck,
 Receipt,
  NotebookPen,
  Sparkles,
  Settings,
  BarChart3,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import UserMenu from "./UserMenu";

const sections = [
  {
    title: "WORKSPACE",
    items: [
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
        icon: ClipboardCheck,
      },
      {
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: Receipt,
      },
      {
        name: "Notes",
        href: "/dashboard/notes",
        icon: NotebookPen,
      },
      {
        name: "AI Workspace",
        href: "/dashboard/ai",
        icon: Sparkles,
      },
    ],
  },

  {
    title: "BUSINESS",
    items: [
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-[#070B18]">

      {/* Logo */}

      <div className="border-b border-slate-800 px-7 py-7">

        <Link
          href="/dashboard"
          className="flex items-center gap-4"
        >

          <div
            className="
            h-14
            w-14
            rounded-2xl
            bg-gradient-to-br
            from-cyan-400
            via-blue-500
            to-purple-600
            flex
            items-center
            justify-center
            text-white
            font-black
            text-xl
            shadow-lg
            shadow-cyan-500/25
            "
            >
            C
          </div>

          <div>

            <h1
              className="
                bg-gradient-to-r
                from-cyan-400
                via-blue-400
                to-purple-500
                bg-clip-text
                text-3xl
                font-bold
                tracking-tight
                text-transparent
              "
            >
              ClientSphere
            </h1>

            <p className="text-sm text-slate-400">
              AI Freelancer CRM
            </p>

          </div>

        </Link>

      </div>

      {/* Navigation */}

      <div
        className="
          flex-1
          overflow-y-auto
          scrollbar-hide
          px-5
          py-8
        "
      >

        {sections.map((section) => (

          <div
            key={section.title}
            className="mb-10"
          >

            <p
              className="
                mb-4
                px-3
                text-xs
                font-semibold
                tracking-[0.30em]
                text-slate-500
              "
            >
              {section.title}
            </p>

            <div className="space-y-2">

              {section.items.map((item) => (

                <SidebarItem
                  key={item.name}
                  {...item}
                  active={pathname === item.href}
                />

              ))}

            </div>

          </div>

        ))}

      </div>

      <UserMenu />

    </aside>
  );
}