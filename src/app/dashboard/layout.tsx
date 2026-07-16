import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <Topbar />

          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}