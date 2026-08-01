import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RecentNews() {

    const news = await prisma.news.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold text-slate-800">
                    Recent News
                </h2>

                <Link
                    href="/dashboard/news"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    View All
                </Link>

            </div>

            <div className="mt-6">

                {news.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                        <p className="text-slate-500">
                            No news available.
                        </p>
                    </div>

                ) : (

                    <div className="space-y-4">

                        {news.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                            >

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {item.category}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}
