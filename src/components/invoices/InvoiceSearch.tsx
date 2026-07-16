"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InvoiceSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full md:w-96">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search invoice..."
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[#0D1224]
          py-3
          pl-11
          pr-4
          outline-none
          focus:border-cyan-500
        "
      />
    </div>
  );
}