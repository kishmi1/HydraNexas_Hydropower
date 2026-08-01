import { ArrowUpRight } from "lucide-react";

export default function DashboardCard({
    title,
    value,
    icon: Icon,
    color = "bg-blue-600",
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h2>

                </div>

                <div className={`${color} rounded-xl p-4 text-white`}>
                    <Icon size={24} />
                </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
                <ArrowUpRight size={16} />
                Updated just now
            </div>

        </div>
    );
}
