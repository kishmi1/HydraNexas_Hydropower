"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Pencil } from "lucide-react";
import IconButton from "@/components/dashboard/IconButton";

import DeleteDividendHistoryButton from "@/components/dashboard/DeleteDividendHistoryButton";

export default function DividendHistoryPage() {

        const [dividendHistory, setDividendHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/dividend-history")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setDividendHistory(data.dividends || []);
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
                        Dividend History
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage company dividend history.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/dividend-history/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Dividend
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">Year</th>

                            <th className="px-6 py-4 text-left">Dividend</th>

                            <th className="px-6 py-4 text-left">Bonus</th>

                            <th className="px-6 py-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dividendHistory.map((item) => (

                            <tr key={item.id} className="border-t">

                                <td className="px-6 py-4">
                                    {item.year}
                                </td>

                                <td className="px-6 py-4">
                                    {item.dividend}
                                </td>

                                <td className="px-6 py-4">
                                    {item.bonus}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <div className="flex items-center justify-center gap-2">

                                        <Link href={`/dashboard/investor/dividend-history/edit/${item.id}`}>
                                            <IconButton icon={Pencil} variant="edit" tooltip="Edit" />
                                        </Link>

                                        <DeleteDividendHistoryButton id={item.id} />

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
