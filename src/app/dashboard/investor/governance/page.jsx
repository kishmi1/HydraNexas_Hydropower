"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Pencil } from "lucide-react";
import IconButton from "@/components/dashboard/IconButton";

import DeleteGovernanceButton from "@/components/dashboard/DeleteGovernanceButton";

export default function GovernancePage() {

        const [governance, setGovernance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/governance")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setGovernance(data.governances || data.governance || []);
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
                        Corporate Governance
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage governance information.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/governance/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Governance
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-left">
                                Description
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {governance.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4">
                                    {item.description}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <div className="flex items-center justify-center gap-2">

                                        <Link href={`/dashboard/investor/governance/edit/${item.id}`}>
                                            <IconButton icon={Pencil} variant="edit" tooltip="Edit" />
                                        </Link>

                                        <DeleteGovernanceButton id={item.id} />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
