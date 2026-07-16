"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-4 text-slate-500"
        size={18}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search..."
        className="
w-full
rounded-2xl
border
border-white/10
bg-white/5
px-5
py-4
text-white
placeholder:text-slate-500
transition-all
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-400/20
outline-none
"
      />
    </div>
  );
}