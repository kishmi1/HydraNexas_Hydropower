"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil, Trash2 } from "lucide-react";

export default function PressReleasesPage() {

        const [pressReleases, setPressReleases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/press-releases")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPressReleases(data.pressReleases || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this press release?")) {
            return;
        }

        try {
            const response = await fetch(`/api/press-releases/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                setPressReleases(pressReleases.filter((item) => item.id !== id));
            } else {
                alert("Failed to delete press release");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete press release");
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }



    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Press Releases
                    </h1>

                    <p className="text-slate-500">
                        Manage Company Press Releases
                    </p>

                </div>

                <Link
                    href="/dashboard/press-releases/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Press Release
                </Link>

            </div>

          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
                <table className="w-full">

                    <thead className="bg-slate-100">

<tr>

<th className="p-4 text-left">Title</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Author</th>
<th className="p-4 text-left">Published Date</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">PDF</th>
<th className="p-4 text-center">Actions</th>

</tr>

</thead>

                    <tbody>

                        {pressReleases.map((item) => (

                           <tr
    key={item.id}
    className="border-b hover:bg-slate-50 transition"
>

                                <td className="p-4">
                                    {item.title}
                                </td>

                                <td className="p-4">
                                    {item.category}
                                </td>

                                <td className="p-4">
                                    {item.author}
                                </td>

                                <td className="p-4">
                                    {item.publishedDate}
                                </td>

                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        item.status === 'Published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {item.pdfUrl && (
                                        <a
                                            href={item.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View PDF
                                        </a>
                                    )}
                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/press-releases/edit/${item.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
