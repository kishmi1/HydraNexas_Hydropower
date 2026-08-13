import Link from "next/link";
import {
    Newspaper,
    FolderKanban,
    Briefcase,
    FileText,
    Image,
    CalendarDays,
} from "lucide-react";

const actions = [
    {
        title: "Add News",
        subtitle: "Create news article",
        href: "/dashboard/news/create",
        icon: Newspaper,
    },
    {
        title: "Add Project",
        subtitle: "Create project",
        href: "/dashboard/projects/create",
        icon: FolderKanban,
    },
    {
        title: "Add Tender",
        subtitle: "Create tender",
        href: "/dashboard/ebidding/tender-notices/create",
        icon: FileText,
    },
    {
        title: "Add Career",
        subtitle: "Create vacancy",
        href: "/dashboard/careers/job-openings/create",
        icon: Briefcase,
    },
    {
        title: "Add Gallery",
        subtitle: "Upload images",
        href: "/dashboard/gallery/create",
        icon: Image,
    },
    {
        title: "Add Event",
        subtitle: "Create event",
        href: "/dashboard/events/create",
        icon: CalendarDays,
    },
];

export default function QuickActions() {
    return (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Frequently used shortcuts
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-white hover:shadow-lg"
                        >
                            <div className="rounded-xl bg-blue-600 p-4 text-white transition group-hover:scale-110">
                                <Icon size={24} />
                            </div>

                         <div>
    <h3 className="text-sm font-semibold text-slate-800">
        {action.title}
    </h3>

    <p className="mt-1 text-xs text-slate-500">
        {action.subtitle}
    </p>
</div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
