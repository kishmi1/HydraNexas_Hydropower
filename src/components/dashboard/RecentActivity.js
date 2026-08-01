import { prisma } from "@/lib/prisma";
import { FilePlus } from "lucide-react";

export default async function RecentActivity() {

    const activities = await prisma.news.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-slate-800">
                Recent Activity
            </h2>

            <div className="space-y-5">

                {activities.length === 0 ? (

                    <p className="text-slate-500">
                        No recent activity.
                    </p>

                ) : (

                    activities.map((item) => (

                        <div
                            key={item.id}
                            className="flex items-start gap-4"
                        >

                            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                                <FilePlus size={20} />
                            </div>

                            <div>

                                <p className="font-medium text-slate-800">
                                    {item.title}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {item.status} • {item.date}
                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}
