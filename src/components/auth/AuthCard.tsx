"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function AuthCard() {
  const [login, setLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);

  try {
    if (!login) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      alert("Account Created Successfully 🎉");

      setLogin(true);

      setName("");
      setEmail("");
      setPassword("");

      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
});

console.log("SIGN IN RESULT:", result);

if (result?.error) {
  alert(result.error);
} else {
  window.location.href = "/dashboard";
}
  } catch (err) {
    console.log(err);
    alert("Something went wrong.");
  }

  setLoading(false);
}

  return (
    <div
      className="
      rounded-[32px]
      border
      border-white/10
      bg-white/10
      backdrop-blur-3xl
      shadow-[0_0_60px_rgba(0,255,255,.12)]
      p-8
      "
    >
      {/* Toggle */}

      <div className="mb-8 flex rounded-2xl bg-white/5 p-1">

        <button
          onClick={() => setLogin(true)}
          className={`flex-1 rounded-xl py-3 transition ${
            login
              ? "bg-gradient-to-r from-cyan-500 to-blue-600"
              : ""
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setLogin(false)}
          className={`flex-1 rounded-xl py-3 transition ${
            !login
              ? "bg-gradient-to-r from-purple-500 to-pink-500"
              : ""
          }`}
        >
          Sign Up
        </button>

      </div>

      <h2 className="text-3xl font-bold">
        {login ? "Welcome Back 👋" : "Create Account"}
      </h2>

      <p className="mt-2 text-slate-400">
        {login
          ? "Continue managing your clients."
          : "Start organizing your freelance business."}
      </p>

      <form
  onSubmit={handleSubmit}
  className="mt-8 space-y-5"
>

        {!login && (
          <Input
  icon={<User size={18} />}
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
        )}

        <Input
          icon={<Mail size={18} />}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">

          <Input
  icon={<Lock size={18} />}
  placeholder="Password"
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {login && (
  <div className="flex justify-end">
    <a
      href="/forgot-password"
      className="text-sm text-cyan-400 hover:text-cyan-300 transition"
    >
      Forgot Password?
    </a>
  </div>
)}

        <button
  type="submit"
  disabled={loading}
  className="
  w-full
  rounded-xl
  bg-gradient-to-r
  from-cyan-500
  to-purple-600
  py-4
  font-semibold
  transition
  hover:scale-[1.02]
  disabled:opacity-50
  disabled:cursor-not-allowed
  "
>
          {loading
  ? "Please Wait..."
  : login
  ? "Login"
  : "Create Account"}
        </button>

      </form>

      <div className="my-8 flex items-center gap-3">

        <div className="h-px flex-1 bg-white/10" />

        <span className="text-slate-500">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />

      </div>

      <button
        onClick={() =>
          signIn("google")
        }
        className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-white/5
        py-4
        hover:bg-white/10
        transition
        "
      >
        Continue with Google
      </button>
    </div>
  );
}

function Input({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-5
      py-4
      "
    >
      {icon}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}