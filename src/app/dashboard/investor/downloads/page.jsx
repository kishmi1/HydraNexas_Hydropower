"use client";

import { useEffect, useState } from "react";

import Link from "next/link";


import DeleteDownloadButton from "@/components/dashboard/DeleteDownloadButton";

export default function DownloadsPage() {

        const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/downloads")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setDownloads(data.downloads || data.download || []);
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
                        Downloads
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage downloadable files.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/downloads/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    + Add Download
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
                                Type
                            </th>

                            <th className="px-6 py-4 text-left">
                                File
                            </th>

                            <th className="px-6 py-4 text-left">
                                Size
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {downloads.map((item)=>(

                            <tr key={item.id} className="border-t">

                                <td className="px-6 py-4">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4">
                                    {item.type}
                                </td>

                                <td className="px-6 py-4">
                                    {item.file && (
                                        <a
                                            href={item.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="text-blue-600 hover:underline"
                                        >
                                            View File
                                        </a>
                                    )}
                                </td>

                                <td className="px-6 py-4">
                                    {item.size}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <Link
                                        href={`/dashboard/investor/downloads/edit/${item.id}`}
                                        className="mr-4 text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <DeleteDownloadButton id={item.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
