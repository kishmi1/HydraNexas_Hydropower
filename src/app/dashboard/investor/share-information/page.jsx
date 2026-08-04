"use client";

import { useEffect, useState } from "react";

import Link from "next/link";


import DeleteShareInformationButton from "@/components/dashboard/DeleteShareInformationButton";

export default function ShareInformationPage() {

        const [shareInformation, setShareInformation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/share-information")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setShareInformation(data.shares || []);
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
                        Share Information
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage company share information.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/share-information/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Information
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

                        {shareInformation.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={3}
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Share Information Found.
                                </td>

                            </tr>

                        ) : (

                            shareInformation.map((item) => (

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

                                        <Link
                                            href={`/dashboard/investor/share-information/edit/${item.id}`}
                                            className="mr-4 text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <DeleteShareInformationButton id={item.id} />

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
