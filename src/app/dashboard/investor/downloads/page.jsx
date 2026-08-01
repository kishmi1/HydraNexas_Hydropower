import Link from "next/link";
import { prisma } from "@/lib/prisma";

import DeleteDownloadButton from "@/components/dashboard/DeleteDownloadButton";

export default async function DownloadsPage() {

    const downloads = await prisma.download.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

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
