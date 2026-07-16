"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  name: string;
  href: string;
  icon: any;
  active: boolean;
}

export default function SidebarItem({
  name,
  href,
  icon: Icon,
  active,
}: Props) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Link
        href={href}
        className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-4">

          <Icon size={20} />

          <span className="font-medium">
            {name}
          </span>

        </div>

        <ChevronRight
          size={16}
          className={`transition ${
            active
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </Link>
    </motion.div>
  );
}