"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note?: Note | null;
}

export default function AddNoteModal({
  isOpen,
  onClose,
  note,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title,
        content: note.content,
      });
    } else {
      setForm({
        title: "",
        content: "",
      });
    }
  }, [note]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const url = note
        ? `/api/notes/${note.id}`
        : "/api/notes";

      const method = note
        ? "PUT"
        : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert(
        note
          ? "Note Updated Successfully!"
          : "Note Added Successfully!"
      );

      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-white">
              {note ? "Edit Note" : "Add New Note"}
            </h2>

            <p className="mt-2 text-slate-400">
              Save your important thoughts and reminders.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Note Title
            </label>

            <input
              required
              type="text"
              placeholder="Enter note title..."
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Content */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Note Content
            </label>

            <textarea
              required
              rows={8}
              placeholder="Write your notes here..."
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3 font-semibold text-white transition hover:scale-105"
            >
              {loading
                ? "Saving..."
                : note
                ? "Update Note"
                : "Save Note"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}