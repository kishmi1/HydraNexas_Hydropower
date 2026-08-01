import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteNewsButton from "@/components/dashboard/DeleteNewsButton";
export default async function NewsPage() {
    const news = await prisma.news.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        News Management
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage all published news.
                    </p>
                </div>

                <Link
                    href="/dashboard/news/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add News
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full">

                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left">Title</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Featured</th>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {news.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-slate-50"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4">
                                    {item.category}
                                </td>

                                <td className="px-6 py-4">
                                    {item.status}
                                </td>

                                <td className="px-6 py-4">
                                    {item.featured ? "Yes" : "No"}
                                </td>

                                <td className="px-6 py-4">
                                    {item.date}
                                </td>

                                <td className="px-6 py-4 text-center space-x-3">

                                    <Link
                                        href={`/dashboard/news/edit/${item.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteNewsButton id={item.id} />

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
