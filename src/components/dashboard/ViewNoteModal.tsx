"use client";

import { X, CalendarDays } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

export default function ViewNoteModal({
  isOpen,
  onClose,
  note,
}: Props) {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-white">
              {note.title}
            </h2>

            <div className="mt-2 flex items-center gap-5 text-sm text-slate-400">

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                Created :
                {new Date(note.createdAt).toLocaleDateString()}
              </div>

              <div>
                Updated :
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        {/* Content */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <h3 className="mb-4 text-lg font-semibold text-cyan-400">
            Note Content
          </h3>

          <div className="whitespace-pre-wrap leading-8 text-slate-300">
            {note.content}
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}