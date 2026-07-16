"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
}

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function EditClientModal({
  open,
  onClose,
  client,
}: EditClientModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name ?? "",
        company: client.company ?? "",
        email: client.email ?? "",
        phone: client.phone ?? "",
        country: client.country ?? "",
        notes: client.notes ?? "",
      });
    }
  }, [client]);

  if (!open || !client) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/clients/${client!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to update client");
        return;
      }

      alert("Client updated successfully!");

      onClose();

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111827] p-8 text-white shadow-2xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Edit Client
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <textarea
            rows={4}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none resize-none"
          />

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3 font-semibold transition hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}