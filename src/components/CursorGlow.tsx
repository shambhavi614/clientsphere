"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[1]"
      style={{
        left: position.x - 150,
        top: position.y - 150,
      }}
    >
      <div
        className="
        h-[300px]
        w-[300px]
        rounded-full
        bg-cyan-400/20
        blur-[100px]
      "
      />
    </div>
  );
}