"use client";

import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, StickyNote } from "lucide-react";

import AddNoteModal from "@/components/dashboard/AddNoteModal";
import ViewNoteModal from "@/components/dashboard/ViewNoteModal";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();

      setNotes(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: string) {
    if (!confirm("Delete this note?")) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setNotes((prev) =>
        prev.filter((note) => note.id !== id)
      );

      alert("Note Deleted");
    } catch {
      alert("Failed To Delete");
    }
  }

  return (
    <>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Notes
            </h1>

            <p className="mt-2 text-slate-400">
              Save ideas, client discussions and reminders.
            </p>

          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3"
          >
            <Plus size={18} />
            Add Note
          </button>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-slate-400">
            Loading...
          </div>
        ) : notes.length === 0 ? (

          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5">

            <StickyNote
              size={60}
              className="text-cyan-400"
            />

            <h2 className="mt-6 text-3xl font-bold">
              No Notes Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Create your first note.
            </p>

            <button
              onClick={() => setAddOpen(true)}
              className="mt-8 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3"
            >
              Add Note
            </button>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {notes.map((note) => (

              <div
                key={note.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >

                <h2 className="text-2xl font-bold">
                  {note.title}
                </h2>

                <p className="mt-4 line-clamp-5 text-slate-400">
                  {note.content}
                </p>

                <div className="mt-6 text-sm text-slate-500">
                  Created :
                  {" "}
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </div>

                <div className="mt-6 flex gap-3">

                  {/* View */}

                  <button
                    onClick={() => {
                      setSelectedNote(note);
                      setViewOpen(true);
                    }}
                    className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400 hover:bg-cyan-500/30"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}

                  <button
                    onClick={() => {
                      setSelectedNote(note);
                      setEditOpen(true);
                    }}
                    className="rounded-xl bg-blue-500/20 p-3 text-blue-400 hover:bg-blue-500/30"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    className="rounded-xl bg-red-500/20 p-3 text-red-400 hover:bg-red-500/30"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Add */}

      <AddNoteModal
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          fetchNotes();
        }}
      />

      {/* Edit */}

      <AddNoteModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedNote(null);
          fetchNotes();
        }}
        note={selectedNote}
      />

      {/* View */}

      <ViewNoteModal
        isOpen={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedNote(null);
        }}
        note={selectedNote}
      />
    </>
  );
}