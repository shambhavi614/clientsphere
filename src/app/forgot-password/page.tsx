"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

console.log("API Response:", data);

if (!data.token) {
  alert("Token was not returned.");
  setLoading(false);
  return;
}

window.location.href = `/reset-password/${data.token}`;

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-gray-900 dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <h1 className="text-3xl font-bold">Forgot Password</h1>

        <p className="mt-2 text-gray-400">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-4 font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </main>
  );
}