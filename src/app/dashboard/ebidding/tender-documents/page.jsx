"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil } from "lucide-react";

import DeleteTenderDocumentButton from "@/components/dashboard/DeleteTenderDocumentButton";

export default function TenderDocumentsPage() {

        const [tenderDocuments, setTenderDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/tender-documents")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTenderDocuments(data.documents || []);
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
                        Tender Documents
                    </h1>

                    <p className="text-slate-500">
                        Manage Tender Documents
                    </p>

                </div>

                <Link
                    href="/dashboard/ebidding/tender-documents/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Document
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Type</th>
                            <th className="p-4 text-left">Size</th>
                            <th className="p-4 text-left">Upload Date</th>
                            <th className="p-4 text-left">File</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {tenderDocuments.map((document) => (

                            <tr
                                key={document.id}
                                className="border-t"
                            >

                                <td className="p-4">{document.title}</td>
                                <td className="p-4">{document.type}</td>
                                <td className="p-4">{document.size}</td>
                                <td className="p-4">{document.uploadDate}</td>
                                <td className="p-4">
                                    {document.file && (
                                        <a
                                            href={document.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="text-blue-600 hover:underline"
                                        >
                                            View File
                                        </a>
                                    )}
                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/ebidding/tender-documents/edit/${document.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteTenderDocumentButton id={document.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
