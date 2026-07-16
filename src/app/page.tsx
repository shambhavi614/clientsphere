"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Briefcase,
  FileText,
  Bot,
  ArrowRight,
} from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import AuthCard from "@/components/auth/AuthCard";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px]" />

      {/* CURSOR GLOW */}
      <CursorGlow />

      <div className="relative z-10">
        {/* NAVBAR */}
        <nav
          className="
          fixed
          top-5
          left-1/2
          -translate-x-1/2
          w-[92%]
          max-w-7xl
          z-50
          rounded-2xl
          border
          border-white/10
          bg-[#111827]
          px-6
          py-4
          backdrop-blur-2xl
        "
        >
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ClientSphere
            </h1>

            <div className="flex gap-4">
              <div className="flex gap-4">
  <Link
    href="/auth"
    className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 font-semibold transition hover:scale-105"
  >
    Get Started
  </Link>
</div>
            </div>
          </div>
        </nav>

        {/* HERO */}

<section className="min-h-screen px-6 pt-32">

  <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-16 lg:flex-row">

    {/* LEFT SIDE */}

    <div className="flex-1">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl"
      >
        <Sparkles size={16} />
        AI Powered Freelancer CRM
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="mt-8 font-heading text-6xl font-bold leading-tight md:text-8xl"
      >
        Manage Clients.

        <br />

        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Track Projects.
        </span>

        <br />

        Get Paid Faster.
      </motion.h1>

      <p className="mt-8 max-w-2xl text-xl text-slate-300">
        ClientSphere helps freelancers manage clients, projects,
        invoices, communication and AI-powered workflows from one
        beautiful workspace.
      </p>

      <div className="mt-10 flex gap-4">

        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">
          Explore Features
        </button>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-full max-w-md">

      <AuthCard />

    </div>

  </div>

</section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 pb-32">
          <h2 className="text-center font-heading text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
            Built for freelancers, consultants and agencies who want
            everything organized in one place.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Users />}
              title="Client Management"
              text="Store and organize all client information in one place."
            />

            <FeatureCard
              icon={<Briefcase />}
              title="Project Tracking"
              text="Track milestones, deadlines and project progress."
            />

            <FeatureCard
              icon={<FileText />}
              title="Invoices"
              text="Manage payments and outstanding invoices effortlessly."
            />

            <FeatureCard
              icon={<Bot />}
              title="AI Assistant"
              text="Generate proposals, emails and project plans instantly."
            />
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="px-6 pb-32">
          <h2 className="text-center font-heading text-5xl font-bold">
            Everything Connected
          </h2>

          <div className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-center gap-6 text-center">
            <FlowCard text="Client" />
            <ArrowRight />
            <FlowCard text="Project" />
            <ArrowRight />
            <FlowCard text="Tasks" />
            <ArrowRight />
            <FlowCard text="Invoices" />
            <ArrowRight />
            <FlowCard text="AI Insights" />
          </div>
        </section>

        {/* AI SECTION */}
        <section className="mx-auto max-w-7xl px-6 pb-32">
          <h2 className="text-center font-heading text-5xl font-bold">
            AI Powered Productivity
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <FeatureCard
              icon={<Bot />}
              title="AI Proposal Generator"
              text="Create professional proposals within seconds."
            />

            <FeatureCard
              icon={<Bot />}
              title="AI Email Writer"
              text="Generate payment reminders and client emails instantly."
            />

            <FeatureCard
              icon={<Bot />}
              title="Meeting Summaries"
              text="Convert meeting notes into actionable summaries."
            />

            <FeatureCard
              icon={<Bot />}
              title="Project Planner"
              text="Generate project timelines automatically."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-40">
          <div
            className="
            mx-auto
            max-w-5xl
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            p-12
            text-center
            backdrop-blur-2xl
          "
          >
            <h2 className="font-heading text-5xl font-bold">
              Stop Switching Between
              <br />
              WhatsApp, Excel & Email
            </h2>

            <p className="mt-6 text-slate-300">
              Manage everything from one intelligent workspace built
              specifically for freelancers.
            </p>

            <Link
              href="/auth"
              className="
              inline-flex
              items-center
              justify-center
              mt-8
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              px-8
              py-4
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
            "
            >
              Start Building Your Workflow
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="
      rounded-[30px]
      border
      border-white/10
      bg-[#111827]
      p-8
      backdrop-blur-2xl
      transition-all
      duration-500
      hover:border-cyan-400/40
      hover:bg-white/10
    "
    >
      <div className="mb-5 text-cyan-400">{icon}</div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-3 text-slate-300">{text}</p>
    </motion.div>
  );
}

function FlowCard({ text }: { text: string }) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-8
      py-4
      backdrop-blur-xl
    "
    >
      {text}
    </div>
  );
}