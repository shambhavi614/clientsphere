"use client";

import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`
      group
flex
items-center
justify-center
gap-2
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-purple-600
px-5
py-3
font-semibold
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]
active:scale-95
"
      ${className}
      `}
    >
      {children}
    </button>
  );
}