"use client";

import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface Props {
  invoice: any;
  open: boolean;
  onClose: () => void;
}

export default function ViewInvoiceModal({
  invoice,
  open,
  onClose,
}: Props) {
  if (!open || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0B1120] p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Invoice Details
            </h2>

            <p className="mt-2 text-slate-400">
              {invoice.invoiceNo}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-8">

          <Info
            title="Client"
            value={invoice.client.name}
          />

          <Info
            title="Status"
            value={
              <StatusBadge
                status={invoice.status}
              />
            }
          />

          <Info
            title="Title"
            value={invoice.title}
          />

          <Info
            title="Due Date"
            value={new Date(
              invoice.dueDate
            ).toLocaleDateString()}
          />

          <Info
            title="Amount"
            value={`₹${invoice.amount}`}
          />

          <Info
            title="Tax"
            value={`${invoice.tax}%`}
          />

          <Info
            title="Discount"
            value={`${invoice.discount}%`}
          />

          <Info
            title="Total"
            value={`₹${invoice.total}`}
          />

        </div>

        {invoice.notes && (
          <div className="mt-8 rounded-2xl bg-white/5 p-5">

            <h3 className="mb-3 text-lg font-semibold">
              Notes
            </h3>

            <p className="text-slate-300">
              {invoice.notes}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div>

      <p className="mb-2 text-sm text-slate-400">
        {title}
      </p>

      <div className="font-semibold">
        {value}
      </div>

    </div>
  );
}