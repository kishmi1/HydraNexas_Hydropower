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
import LiveDashboard from "@/components/dashboard/LiveDashboard";
import LoadingState from "@/components/dashboard/LoadingState";

export default function DashboardPage() {
    const [totalNews, setTotalNews] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const [totalCareers, setTotalCareers] = useState(0);
    const [totalTenderNotices, setTotalTenderNotices] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stats from APIs
        Promise.all([
            fetch("/api/news").then(res => res.json()).catch(() => ({ success: false })),
            fetch("/api/projects").then(res => res.json()).catch(() => ({ success: false })),
            fetch("/api/job-openings").then(res => res.json()).catch(() => ({ success: false })),
            fetch("/api/tender-notices").then(res => res.json()).catch(() => ({ success: false }))
        ])
        .then(([newsData, projectsData, careersData, tenderNoticesData]) => {
            if (newsData.success) {
                setTotalNews(newsData.news?.length || 0);
            }
            if (projectsData.success) {
                setTotalProjects(projectsData.projects?.length || 0);
            }
            if (careersData.success) {
                setTotalCareers(careersData.jobOpenings?.length || 0);
            }
            if (tenderNoticesData.success) {
                setTotalTenderNotices(tenderNoticesData.notices?.length || 0);
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching dashboard stats:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <LoadingState message="Loading dashboard..." />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Welcome to HydraNexa Admin Panel.
            </p>

            {/* Live Dashboard */}
            <LiveDashboard />

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
                    value={totalCareers}
                    icon={Briefcase}
                    color="bg-orange-500"
                />

                <DashboardCard
                    title="Tender Notices"
                    value={totalTenderNotices}
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
