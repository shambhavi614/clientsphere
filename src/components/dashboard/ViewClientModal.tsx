"use client";

import {
  X,
  Mail,
  Phone,
  Globe,
  Building2,
  FileText,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function ViewClientModal({
  open,
  onClose,
  client,
}: Props) {
  if (!open || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111827] p-8 text-white shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Client Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        <div className="mb-8 flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-3xl font-bold">

            {client.name.charAt(0).toUpperCase()}

          </div>

          <div>

            <h3 className="text-2xl font-bold">
              {client.name}
            </h3>

            <p className="text-cyan-400">
              {client.company || "No Company"}
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <Mail className="text-cyan-400" />

            <span>{client.email}</span>

          </div>

          <div className="flex items-center gap-3">

            <Phone className="text-cyan-400" />

            <span>{client.phone || "-"}</span>

          </div>

          <div className="flex items-center gap-3">

            <Globe className="text-cyan-400" />

            <span>{client.country || "-"}</span>

          </div>

          <div className="flex items-center gap-3">

            <Building2 className="text-cyan-400" />

            <span>{client.company || "-"}</span>

          </div>

          <div className="flex items-start gap-3">

            <FileText className="mt-1 text-cyan-400" />

            <span>
              {client.notes || "No Notes"}
            </span>

          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-10 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-semibold"
        >
          Close
        </button>

      </div>

    </div>
  );
}