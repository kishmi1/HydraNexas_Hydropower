import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#F4F7FB]">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Navbar />

                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}
