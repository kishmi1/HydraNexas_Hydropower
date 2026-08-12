"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Pencil } from "lucide-react";
import IconButton from "@/components/dashboard/IconButton";

import DeleteFinancialRatioButton from "@/components/dashboard/DeleteFinancialRatioButton";

export default function FinancialRatiosPage() {

        const [financialRatios, setFinancialRatios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/financial-ratios")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setFinancialRatios(data.ratios || []);
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

                    <h1 className="text-3xl font-bold text-slate-800">
                        Financial Ratios
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage financial ratios.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/financial-ratios/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Ratio
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-left">
                                Value
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {financialRatios.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={3}
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Financial Ratios Found.
                                </td>

                            </tr>

                        ) : (

                            financialRatios.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {item.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.value}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <div className="flex items-center justify-center gap-2">

                                            <Link href={`/dashboard/investor/financial-ratios/edit/${item.id}`}>
                                                <IconButton icon={Pencil} variant="edit" tooltip="Edit" />
                                            </Link>

                                            <DeleteFinancialRatioButton id={item.id} />

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
