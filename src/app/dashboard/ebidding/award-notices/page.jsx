"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil } from "lucide-react";

import DeleteAwardNoticeButton from "@/components/dashboard/DeleteAwardNoticeButton";

export default function AwardNoticesPage() {

        const [awardNotices, setAwardNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/award-notices")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setAwardNotices(data.awardNotices || data.awardNotice || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }



    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Award Notices
                    </h1>

                    <p className="text-slate-500">
                        Manage Award Notices
                    </p>

                </div>

                <Link
                    href="/dashboard/ebidding/award-notices/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Award
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Project</th>
                            <th className="p-4 text-left">Contractor</th>
                            <th className="p-4 text-left">Award Date</th>
                            <th className="p-4 text-left">Value</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {awards.map((award) => (

                            <tr
                                key={award.id}
                                className="border-t"
                            >

                                <td className="p-4">{award.project}</td>
                                <td className="p-4">{award.contractor}</td>
                                <td className="p-4">{award.awardDate}</td>
                                <td className="p-4">{award.value}</td>

                                <td className="p-4">

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

                                        {award.status}

                                    </span>

                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/ebidding/award-notices/edit/${award.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteAwardNoticeButton id={award.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
