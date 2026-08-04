"use client";

import {
    Newspaper,
    FolderKanban,
    Briefcase,
    FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentNews from "@/components/dashboard/RecentNews";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
    const [totalNews, setTotalNews] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stats from APIs
        Promise.all([
            fetch("/api/news").then(res => res.json()),
            fetch("/api/projects").then(res => res.json())
        ])
        .then(([newsData, projectsData]) => {
            if (newsData.success) {
                setTotalNews(newsData.news?.length || 0);
            }
            if (projectsData.success) {
                setTotalProjects(projectsData.projects?.length || 0);
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching dashboard stats:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div>

            <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Welcome to HydraNexa Admin Panel.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <DashboardCard
                    title="Total News"
                    value={totalNews}
                    icon={Newspaper}
                />

                <DashboardCard
                    title="Projects"
                    value={totalProjects}
                    icon={FolderKanban}
                    color="bg-green-600"
                />

                <DashboardCard
                    title="Careers"
                    value="0"
                    icon={Briefcase}
                    color="bg-orange-500"
                />

                <DashboardCard
                    title="Tender Notices"
                    value="0"
                    icon={FileText}
                    color="bg-purple-600"
                />

            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* News + Activity */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">

                <div className="lg:col-span-2">
                    <RecentNews />
                </div>

                <RecentActivity />

            </div>
        </div>


    );
}
