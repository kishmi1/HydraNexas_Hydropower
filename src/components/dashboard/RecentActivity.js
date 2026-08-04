"use client";

import { FilePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function RecentActivity() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setActivities((data.news || []).slice(0, 5));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recent activity:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">Loading...</div>;
    }

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
