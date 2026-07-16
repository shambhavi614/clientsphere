"use client";

import { useEffect, useState } from "react";
import ViewClientModal from "@/components/dashboard/ViewClientModal";
import EditClientModal from "@/components/dashboard/EditClientModal";
import {
  Plus,
  Users,
  DollarSign,
  Globe,
  Mail,
  Phone,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import AddClientModal from "@/components/dashboard/AddClientModal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import SearchBar from "@/components/ui/SearchBar";

interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] =
  useState<Client | null>(null);

const [viewOpen, setViewOpen] =
  useState(false);

const [editOpen, setEditOpen] =
  useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteClient(id: string) {
    if (!confirm("Delete this client?")) return;

    await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    });

    setClients((prev) =>
      prev.filter((client) => client.id !== id)
    );
  }

  const filteredClients = Array.isArray(clients)
  ? clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
      );
    })
  : [];

  return (
    <>
      <div className="space-y-8">

        <PageHeader
          title="Clients"
          subtitle="Manage all your clients efficiently."
          action={
            <Button onClick={() => setOpenModal(true)}>
              <Plus size={18} />
              Add Client
            </Button>
          }
        />

        <div className="grid gap-6 md:grid-cols-3">

          <StatCard
            title="Total Clients"
            value={clients.length}
            icon={<Users />}
          />

          <StatCard
            title="Countries"
            value={
              new Set(
                clients.map((c) => c.country)
              ).size
            }
            icon={<Globe />}
          />

          <StatCard
            title="Companies"
            value={
              new Set(
                clients.map((c) => c.company)
              ).size
            }
            icon={<DollarSign />}
          />

        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : filteredClients.length === 0 ? (

          <GlassCard className="py-20 text-center">

            <Users
              size={80}
              className="mx-auto text-cyan-400"
            />

            <h2 className="mt-6 text-3xl font-bold">
              No Clients Found
            </h2>

            <p className="mt-2 text-slate-400">
              Add your first client.
            </p>

          </GlassCard>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredClients.map((client) => (

              <GlassCard key={client.id}>

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {client.name}
                    </h2>

                    <p className="mt-1 text-cyan-400">
                      {client.company || "No Company"}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-500
                      to-purple-600
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {client.name.charAt(0).toUpperCase()}
                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3">

                    <Mail size={16} />

                    <span>{client.email}</span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Phone size={16} />

                    <span>{client.phone || "-"}</span>

                  </div>

                  <div className="text-slate-400">

                    🌍 {client.country || "-"}

                  </div>

                </div>

                <p className="mt-5 text-sm text-slate-500 line-clamp-2">

                  {client.notes || "No notes available."}

                </p>

                <div className="mt-8 flex items-center justify-between">

                  <button
  onClick={() => {
    setSelectedClient(client);
    setViewOpen(true);
  }}
  className="
  rounded-full
  bg-cyan-500/20
  p-3
  text-cyan-400
  transition
  hover:bg-cyan-500
  hover:text-white
"
>
  <Eye size={18} />
</button>

                  <button
  onClick={() => {
    setSelectedClient(client);
    setEditOpen(true);
  }}
  className="
  rounded-full
  bg-blue-500/20
  p-3
  text-blue-400
  transition
  hover:bg-blue-500
  hover:text-white
"
>
  <Pencil size={18} />
</button>

                  <button
                    onClick={() =>
                      deleteClient(client.id)
                    }
                    className="
                    rounded-full
                    bg-red-500/20
                    p-3
                    text-red-400
                    transition
                    hover:bg-red-500
                    hover:text-white
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </GlassCard>

            ))}

          </div>

        )}

      </div>

      <AddClientModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchClients();
        }}
      />
      <ViewClientModal
  open={viewOpen}
  client={selectedClient}
  onClose={() => setViewOpen(false)}
/>

<EditClientModal
  open={editOpen}
  client={selectedClient}
  onClose={() => {
    setEditOpen(false);
    fetchClients();
  }}
/>
    </>
  );
}