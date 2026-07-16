"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClientModal({
  isOpen,
  onClose,
}: AddClientModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    console.log("FORM DATA:", form);

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (!res.ok) {
      alert(data.error || "Failed to add client");
      return;
    }

    alert("Client Added Successfully");

    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      notes: "",
    });

    onClose();

    window.location.reload();
  } catch (error) {
    console.log("CLIENT ERROR:", error);

    alert("Error adding client");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] p-8 text-white">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Add New Client
            </h2>

            <p className="mt-2 text-slate-400">
              Create a new client profile.
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
          className="space-y-4"
        >
          <input
            placeholder="Client Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <textarea
            rows={4}
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 font-semibold"
          >
            {loading
              ? "Saving..."
              : "Save Client"}
          </button>
        </form>
      </div>
    </div>
  );
}