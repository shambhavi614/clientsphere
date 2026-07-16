"use client";

import { useEffect, useState } from "react";

import AddInvoiceModal from "@/components/invoices/AddInvoiceModal";
import InvoiceStats from "@/components/invoices/InvoiceStats";
import InvoiceSearch from "@/components/invoices/InvoiceSearch";
import InvoiceStatusFilter from "@/components/invoices/InvoiceStatusFilter";
import InvoiceTable from "@/components/invoices/InvoiceTable";

export default function InvoicePage() {
  const [open, setOpen] = useState(false);

  const [invoices, setInvoices] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  useEffect(() => {
    async function loadInvoices() {
      const res = await fetch(
        "/api/invoices"
      );

      const data = await res.json();

      setInvoices(data);
    }

    loadInvoices();
  }, []);

  const filtered = invoices.filter(
    (invoice: any) => {
      const searchMatch =
        invoice.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        invoice.invoiceNo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        invoice.client.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const statusMatch =
        status === "ALL"
          ? true
          : invoice.status === status;

      return (
        searchMatch && statusMatch
      );
    }
  );

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Invoices
          </h1>

          <p className="mt-2 text-slate-400">
            Create and manage invoices.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            px-6
            py-3
            font-semibold
          "
        >
          + Add Invoice
        </button>

      </div>

      <InvoiceStats invoices={filtered} />

      <div className="flex flex-wrap gap-4">

        <InvoiceSearch
          value={search}
          onChange={setSearch}
        />

        <InvoiceStatusFilter
          value={status}
          onChange={setStatus}
        />

      </div>

      <InvoiceTable invoices={filtered} />

      <AddInvoiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}