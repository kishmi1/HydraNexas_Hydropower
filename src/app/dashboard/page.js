import { prisma } from "@/lib/prisma";
import {
    Newspaper,
    FolderKanban,
    Briefcase,
    FileText,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentNews from "@/components/dashboard/RecentNews";
import RecentActivity from "@/components/dashboard/RecentActivity";
export default async function DashboardPage() {
    const totalNews = await prisma.news.count();
    const totalProjects = await prisma.project.count();
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
