"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Client {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  invoice: any;
  onClose: () => void;
}

export default function EditInvoiceModal({
  open,
  invoice,
  onClose,
}: Props) {
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
    if (!open || !invoice) return;

    async function loadClients() {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    }

    loadClients();

    setForm({
      clientId: invoice.clientId,
      title: invoice.title,
      amount: invoice.amount.toString(),
      tax: invoice.tax.toString(),
      discount: invoice.discount.toString(),
      dueDate: invoice.dueDate.slice(0, 10),
      notes: invoice.notes || "",
    });
  }, [open, invoice]);

  if (!open || !invoice) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const amount = Number(form.amount);
    const tax = Number(form.tax);
    const discount = Number(form.discount);

    const total =
      amount +
      amount * (tax / 100) -
      amount * (discount / 100);

    const res = await fetch(
      `/api/invoices/${invoice.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount,
          tax,
          discount,
          total,
        }),
      }
    );

    setLoading(false);

    const data = await res.json();

if (!res.ok) {
  console.log(data);
  alert(data.error || "Failed to update invoice");
  return;
}
    alert("Invoice Updated");

    onClose();

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl bg-[#0B1120] p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Edit Invoice
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
            value={form.clientId}
            onChange={(e) =>
              setForm({
                ...form,
                clientId: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          >
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
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <input
            type="number"
            value={form.tax}
            onChange={(e) =>
              setForm({
                ...form,
                tax: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <input
            type="number"
            value={form.discount}
            onChange={(e) =>
              setForm({
                ...form,
                discount: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
          />

          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/5 p-4"
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
              ? "Updating..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}