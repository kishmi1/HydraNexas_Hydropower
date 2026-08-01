"use client";
import DeleteFinancialHighlightButton from "@/components/dashboard/DeleteFinancialHighlightButton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FinancialHighlightsPage() {

    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("/api/financial-highlights")
            .then((res) => res.json())
            .then((data) => {

                if (data.success) {
                    setHighlights(data.financialHighlights);
                }

                setLoading(false);

            })
            .catch((error) => {

                console.log(error);

                setLoading(false);

            });

    }, []);

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Financial Highlights
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage financial highlights.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/financial-highlights/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Highlight
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

                            <th className="px-6 py-4 text-left">
                                Description
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loading ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="py-16 text-center"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : highlights.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="py-16 text-center text-slate-500"
                                    >
                                        No Financial Highlights Found.
                                    </td>

                                </tr>

                            ) : (

                                highlights.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-t"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {item.title}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.value}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.description}
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <Link
                                                href={`/dashboard/investor/financial-highlights/edit/${item.id}`}
                                                className="mr-4 text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>

                                           <DeleteFinancialHighlightButton id={item.id} />

                                        </td>

                                    </tr>

                                ))

                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}
