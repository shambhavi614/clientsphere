"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import ViewInvoiceModal from "./ViewInvoiceModal";
import EditInvoiceModal from "./EditInvoiceModal";
import { Download } from "lucide-react";
import { generateInvoicePDF } from "@/lib/generateInvoicePDF";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  invoices: any[];
}

export default function InvoiceTable({
  invoices,
}: Props) {

  const [selectedInvoice, setSelectedInvoice] =
    useState<any>(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);  

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1224]">

        <table className="w-full">

          <thead className="border-b border-white/10 bg-white/5">

            <tr>

              <th className="px-6 py-5 text-left">
                Invoice
              </th>

              <th className="text-left">
                Client
              </th>

              <th className="text-left">
                Amount
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Due Date
              </th>

              <th className="pr-6 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length > 0 ? (

              invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="
                    border-b
                    border-white/5
                    transition
                    hover:bg-white/5
                  "
                >

                  <td className="px-6 py-5">

                    <div>

                      <p className="font-semibold">
                        {invoice.invoiceNo}
                      </p>

                      <p className="text-sm text-slate-400">
                        {invoice.title}
                      </p>

                    </div>

                  </td>

                  <td>
                    {invoice.client.name}
                  </td>

                  <td>

                    <span className="font-semibold text-cyan-400">
                      ₹{invoice.total}
                    </span>

                  </td>

                  <td>

                    <StatusBadge
                      status={invoice.status}
                    />

                  </td>

                  <td>

                    {new Date(
                      invoice.dueDate
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    <div className="flex justify-end gap-2 pr-6">

                      {/* View */}
                      <button
  onClick={() => {
    setSelectedInvoice(invoice);
    setViewOpen(true);
  }}
  className="
    rounded-lg
    p-2
    hover:bg-cyan-500/20
    transition
  "
>
  <Eye size={18} />
</button>
{/*pdf*/}
<button
  onClick={() =>
    generateInvoicePDF(invoice)
  }
  className="
    rounded-lg
    p-2
    hover:bg-green-500/20
  "
>
  <Download size={18} />
</button>

                      {/* Edit */}
                      <button
  onClick={() => {
    setSelectedInvoice(invoice);
    setEditOpen(true);
  }}
  className="
    rounded-lg
    p-2
    hover:bg-yellow-500/20
    transition
  "
>
  <Pencil size={18} />
</button>

                      {/* Delete */}
                      <button
  onClick={async () => {
    const ok = confirm(
      "Delete this invoice?"
    );

    if (!ok) return;

    const res = await fetch(
      `/api/invoices/${invoice.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete invoice");
    }
  }}
  className="
    rounded-lg
    p-2
    text-red-400
    hover:bg-red-500/20
    transition
  "
>
  <Trash2 size={18} />
</button>
                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="py-20 text-center"
                >

                  <div className="space-y-3">

                    <h2 className="text-2xl font-semibold">
                      No Invoices Found
                    </h2>

                    <p className="text-slate-400">
                      Create your first invoice to get started.
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* View Invoice Modal */}
      <ViewInvoiceModal
        invoice={selectedInvoice}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
      <ViewInvoiceModal
  invoice={selectedInvoice}
  open={viewOpen}
  onClose={() => setViewOpen(false)}
/>

<EditInvoiceModal
  invoice={selectedInvoice}
  open={editOpen}
  onClose={() => setEditOpen(false)}
/>
    </>
  );
}