"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteTenderButton from "@/components/dashboard/DeleteTenderButton";
export default function ActiveTendersPage() {

        const [activeTenders, setActiveTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/active-tenders")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setActiveTenders(data.activeTenders || data.activeTender || []);
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
                        Active Tenders
                    </h1>

                    <p className="text-slate-500">
                        Manage Active Tenders
                    </p>

                </div>

                <Link
                    href="/dashboard/ebidding/active-tenders/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Tender
                </Link>

            </div>

            <div className="mb-6 flex items-center justify-between">

    <input
        type="text"
        placeholder="Search Tender..."
        className="w-80 rounded-xl border border-slate-300 px-4 py-3"
    />

    <select className="rounded-xl border border-slate-300 px-4 py-3">

        <option>All Status</option>
        <option>Open</option>
        <option>Closed</option>
        <option>Awarded</option>

    </select>

</div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Tender No</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {activeTenders.map((tender) => (

                            <tr
                                key={tender.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {tender.title}
                                </td>

                                <td className="p-4">
                                    {tender.tenderNo}
                                </td>

                                <td className="p-4">
                                    {tender.location}
                                </td>

                                <td className="p-4">
<span
    className={`rounded-full px-3 py-1 text-sm font-medium

    ${
        tender.status === "Open"
            ? "bg-green-100 text-green-700"

            : tender.status === "Closed"
            ? "bg-red-100 text-red-700"

            : "bg-blue-100 text-blue-700"

    }`}
>

    {tender.status}

</span>

                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/ebidding/active-tenders/edit/${tender.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                  <DeleteTenderButton id={tender.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
