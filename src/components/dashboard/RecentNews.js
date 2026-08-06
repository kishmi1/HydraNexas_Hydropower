"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setNews((data.news || []).slice(0, 5));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recent news:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">Loading...</div>;
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold text-slate-600">
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
    <h3 className="text-base font-semibold text-slate-800">
        {item.title}
    </h3>

    <p className="mt-1 text-xs text-slate-500">
        {item.category}
    </p>
</div>
                               <span

  className={`rounded-full px-3 py-1 text-[10px] font-medium ${
    item.status === "Published"
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
