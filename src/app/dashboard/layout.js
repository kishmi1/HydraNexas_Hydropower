"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import "./dashboard.css";

export default function DashboardLayout({ children }) {


    return (
        <div className="flex min-h-screen dashboard-container">

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
