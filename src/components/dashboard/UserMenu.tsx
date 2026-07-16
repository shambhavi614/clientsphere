"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import {
  LogOut,
  Settings,
  User,
  CreditCard,
  ChevronUp,
} from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-slate-800 p-5">

      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-5 text-left transition hover:border-cyan-500/50"
      >
        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-bold">
            S
          </div>

          <div className="flex-1">

            <h3 className="font-semibold">
              Shambhavi Jha
            </h3>

            <p className="text-sm text-slate-400">
              AI Engineer
            </p>

            <div className="mt-1 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-xs text-green-400">
                Online
              </span>

            </div>

          </div>

          <ChevronUp
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
            size={18}
          />

        </div>
      </button>

      {open && (

        <div className="mt-4 space-y-2 rounded-2xl bg-slate-900 p-3">

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800">
            <User size={18} />
            Profile
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800">
            <CreditCard size={18} />
            Billing
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800">
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      )}

    </div>
  );
}