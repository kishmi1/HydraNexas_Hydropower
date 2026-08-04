"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil } from "lucide-react";

import DeleteTenderNoticeButton from "@/components/dashboard/DeleteTenderNoticeButton";

export default function TenderNoticesPage() {

        const [tenderNotices, setTenderNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/tender-notices")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTenderNotices(data.tenderNotices || data.tenderNotice || []);
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
                        Tender Notices
                    </h1>

                    <p className="text-slate-500">
                        Manage Tender Notices
                    </p>

                </div>

                <Link
                    href="/dashboard/ebidding/tender-notices/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Notice
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Publish Date</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {notices.map((notice) => (

                            <tr
                                key={notice.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {notice.title}
                                </td>

                                <td className="p-4">
                                    {notice.publishDate}
                                </td>

                                <td className="p-4">
                                    {notice.location}
                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/ebidding/tender-notices/edit/${notice.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteTenderNoticeButton id={notice.id} />

                                </td>

                            </tr>

                        ))}

                        {notices.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="p-8 text-center text-slate-500"
                                >
                                    No Tender Notices Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
