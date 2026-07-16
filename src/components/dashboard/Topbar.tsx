"use client";

import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import {
  Search,
  Bell,
  Menu,
  LogOut,
  Settings,
  FolderKanban,
  Users,
} from "lucide-react";

import MobileSidebar from "./MobileSidebar";

interface SearchResult {
  clients: any[];
  projects: any[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [results, setResults] =
    useState<SearchResult | null>(null);

  const [loading, setLoading] = useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  // ------------------------
  // SEARCH DROPDOWN CLOSE
  // ------------------------

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target as Node
        )
      ) {
        setResults(null);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          e.target as Node
        )
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  // ------------------------
  // SEARCH
  // ------------------------

  async function handleSearch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setResults(null);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(
          value
        )}`
      );

      const data = await res.json();

      setResults(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  // ------------------------
  // NOTIFICATIONS
  // ------------------------

  async function fetchNotifications() {
    try {
      const res = await fetch(
        "/api/notifications"
      );

      const data = await res.json();

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  async function markRead(id: string) {
    await fetch(`/api/notifications/${id}`, {
      method: "PUT",
    });

    fetchNotifications();
  }

  async function deleteNotification(
    id: string
  ) {
    await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
    });

    fetchNotifications();
  }

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <>
  <MobileSidebar open={open} setOpen={setOpen} />

  <header
    className="
      sticky
      top-0
      z-40
      flex
      h-20
      items-center
      justify-between
      border-b
      border-white/10
      bg-[#050816]/80
      backdrop-blur-xl
      px-5
      lg:px-8
    "
  >
    {/* LEFT */}

    <div className="flex items-center gap-4">

      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-white/5 p-3 hover:bg-white/10 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* SEARCH */}

      <div
        ref={searchRef}
        className="relative hidden lg:block"
      >
        <div
          className="
            flex
            w-[420px]
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-3
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search clients, projects..."
            className="
              w-full
              bg-transparent
              outline-none
              placeholder:text-slate-500
            "
          />
        </div>

        {/* SEARCH RESULTS */}

        {results && (
          <div
            className="
              absolute
              mt-3
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#0E1323]
              shadow-2xl
            "
          >

            {loading && (
              <div className="p-4 text-slate-400">
                Searching...
              </div>
            )}

            {!loading &&
              results.clients.length === 0 &&
              results.projects.length === 0 && (
                <div className="p-4 text-slate-400">
                  No Results
                </div>
              )}

            {results.clients.map((client: any) => (
              <Link
                key={client.id}
                href="/dashboard/clients"
                onClick={() => {
                  setSearch("");
                  setResults(null);
                }}
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-white/5
                  p-4
                  hover:bg-white/5
                "
              >
                <Users
                  size={18}
                  className="text-cyan-400"
                />

                <div>
                  <p>{client.name}</p>

                  <p className="text-xs text-slate-400">
                    Client
                  </p>
                </div>
              </Link>
            ))}

            {results.projects.map((project: any) => (
              <Link
                key={project.id}
                href="/dashboard/projects"
                onClick={() => {
                  setSearch("");
                  setResults(null);
                }}
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-white/5
                  p-4
                  hover:bg-white/5
                "
              >
                <FolderKanban
                  size={18}
                  className="text-purple-400"
                />

                <div>
                  <p>{project.name}</p>

                  <p className="text-xs text-slate-400">
                    Project
                  </p>
                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>

    {/* RIGHT */}

    <div className="flex items-center gap-3">
          {/* Notification */}

      <div
        ref={notificationRef}
        className="relative"
      >
        <button
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
          className="relative rounded-xl bg-white/5 p-3 hover:bg-white/10 transition"
        >
          <Bell size={20} />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-xs
                font-bold
                text-white
              "
            >
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div
            className="
              absolute
              right-0
              mt-3
              w-[380px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#0E1323]
              shadow-2xl
            "
          >
            <div className="border-b border-white/10 p-4">
              <h2 className="text-lg font-bold">
                Notifications
              </h2>
            </div>

            <div className="max-h-[400px] overflow-y-auto">

              {notifications.length === 0 && (
                <div className="p-6 text-center text-slate-400">
                  No Notifications Yet
                </div>
              )}

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`border-b border-white/10 p-4 transition ${
                    item.isRead
                      ? "opacity-60"
                      : "bg-cyan-500/5"
                  }`}
                >
                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 flex gap-5">

                    {!item.isRead && (
                      <button
                        onClick={() =>
                          markRead(item.id)
                        }
                        className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteNotification(item.id)
                      }
                      className="text-sm font-medium text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* Settings */}

      <Link
        href="/dashboard/settings"
        className="rounded-xl bg-white/5 p-3 hover:bg-white/10 transition"
      >
        <Settings size={20} />
      </Link>

      {/* Logout */}

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-red-500
          px-4
          py-3
          font-medium
          text-white
          transition
          hover:bg-red-600
        "
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  </header>
</>
);
}