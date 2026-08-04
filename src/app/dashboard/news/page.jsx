"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteNewsButton from "@/components/dashboard/DeleteNewsButton";

export default function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => {
                console.log("News API response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("News API data:", data);
                if (data.success) {
                    setNewsList(data.news || []);
                } else {
                    console.error("News API error:", data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
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
                        News Management
                    </h1>

                    <p className="text-slate-500">
                        Manage Company News
                    </p>

                </div>

                <Link
                    href="/dashboard/news/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >

                    <Plus size={18} />

                    Add News

                </Link>

            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Author</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Featured</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {newsList.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="p-4">

                                    {item.image ? (

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-16 w-24 rounded-lg object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                                            No Image
                                        </div>

                                    )}

                                </td>

                                <td className="p-4 font-medium">
                                    {item.title}
                                </td>

                                <td className="p-4">
                                    {item.category}
                                </td>

                                <td className="p-4">
                                    {item.author}
                                </td>

                                <td className="p-4 text-center">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.status === "Published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td className="p-4 text-center">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.featured
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {item.featured ? "Featured" : "Normal"}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            href={`/dashboard/news/edit/${item.id}`}
                                        >

                                            <Pencil
                                                size={18}
                                                className="text-blue-600"
                                            />

                                        </Link>

                                        <DeleteNewsButton id={item.id} />

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
