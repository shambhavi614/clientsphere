"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Client {
  id: string;
  name: string;
}

export default function AddInvoiceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    title: "",
    amount: "",
    tax: "",
    discount: "",
    dueDate: "",
    notes: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    async function loadClients() {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    }

    loadClients();
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const text = await res.text();

console.log(text);

const data = text ? JSON.parse(text) : {};

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Invoice Created");

    onClose();

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl bg-[#0B1120] p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Create Invoice
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            required
            value={form.clientId}
            onChange={(e) =>
              setForm({
                ...form,
                clientId: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          >
            <option value="">
              Select Client
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Invoice Title"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Tax %"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                tax: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Discount %"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                discount: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            placeholder="Notes"
            className="w-full rounded-xl bg-white/5 p-4"
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

          <button
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              py-4
              font-bold
            "
          >
            {loading
              ? "Creating..."
              : "Create Invoice"}
          </button>

        </form>

      </div>

    </div>
  );
}