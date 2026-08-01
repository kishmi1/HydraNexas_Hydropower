import Link from "next/link";
import { prisma } from "@/lib/prisma";

import DeleteAnnualReportButton from "@/components/dashboard/DeleteAnnualReportButton";

export default async function AnnualReportsPage() {

    const reports = await prisma.annualReport.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Annual Reports
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage company annual reports.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/annual-reports/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Report
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Year
                            </th>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-left">
                                PDF
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {reports.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Annual Reports Found.
                                </td>

                            </tr>

                        ) : (

                            reports.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {item.year}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.title}
                                    </td>

                                    <td className="px-6 py-4">

                                        <a
                                            href={item.file}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View PDF
                                        </a>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <Link
                                            href={`/dashboard/investor/annual-reports/edit/${item.id}`}
                                            className="mr-4 text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <DeleteAnnualReportButton id={item.id} />

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
