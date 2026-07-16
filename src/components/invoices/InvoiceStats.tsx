"use client";

import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

interface Props {
  invoices: any[];
}

export default function InvoiceStats({
  invoices,
}: Props) {
  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const paid = invoices
    .filter((i) => i.status === "PAID")
    .reduce((sum, i) => sum + i.total, 0);

  const pending = invoices
    .filter(
      (i) =>
        i.status === "SENT" ||
        i.status === "DRAFT"
    )
    .reduce((sum, i) => sum + i.total, 0);

  const overdue = invoices
    .filter((i) => i.status === "OVERDUE")
    .reduce((sum, i) => sum + i.total, 0);

  const cards = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      icon: IndianRupee,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Paid",
      value: paid,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertCircle,
      color: "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-white/10 bg-[#0D1224] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                ₹{card.value.toLocaleString()}
              </h2>
            </div>

            <div
              className={`rounded-2xl bg-gradient-to-r ${card.color} p-4`}
            >
              <card.icon className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}