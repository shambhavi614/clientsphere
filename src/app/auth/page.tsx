"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-[#050816] text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex relative w-1/2 overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col justify-center px-16">

          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ClientSphere
          </h1>

          <p className="mt-8 text-2xl text-slate-300">
            AI Powered Freelancer CRM
          </p>

          <div className="mt-12 space-y-6">

            <Feature text="Manage Unlimited Clients" />
            <Feature text="Track Projects Easily" />
            <Feature text="Generate AI Proposals" />
            <Feature text="Invoice & Payments" />

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">

          <div className="flex rounded-xl bg-white/5 p-1">

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-lg py-3 transition ${
                isLogin
                  ? "bg-cyan-500"
                  : ""
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-lg py-3 transition ${
                !isLogin
                  ? "bg-purple-500"
                  : ""
              }`}
            >
              Sign Up
            </button>

          </div>

          <AnimatePresence mode="wait">

            {isLogin ? (

              <motion.div
                key="login"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="mt-8 space-y-5"
              >

                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email"
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Password"
                  type="password"
                />

                <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-semibold">
                  Login
                </button>

              </motion.div>

            ) : (

              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="mt-8 space-y-5"
              >

                <Input
                  icon={<User size={18} />}
                  placeholder="Full Name"
                />

                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email"
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Password"
                  type="password"
                />

                <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 py-3 font-semibold">
                  Create Account
                </button>

              </motion.div>

            )}

          </AnimatePresence>

          <p className="mt-8 text-center text-slate-400">
            Back to{" "}
            <Link
              href="/"
              className="text-cyan-400"
            >
              Home
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      {text}
    </div>
  );
}

function Input({
  icon,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}