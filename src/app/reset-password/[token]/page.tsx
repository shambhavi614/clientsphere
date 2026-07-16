"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ResetPassword() {
  const params = useParams();

  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function resetPassword() {
    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);

    setLoading(false);

    if (res.ok) {
      window.location.href = "/";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-[400px] rounded-3xl bg-white/10 p-8">
        <h1 className="text-3xl font-bold">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="mt-6 w-full rounded-xl p-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-cyan-500 p-4"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </main>
  );
}