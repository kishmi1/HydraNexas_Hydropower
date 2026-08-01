import Link from "next/link";
import { prisma } from "@/lib/prisma";

import DeleteFinancialRatioButton from "@/components/dashboard/DeleteFinancialRatioButton";

export default async function FinancialRatiosPage() {

    const ratios = await prisma.financialRatio.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

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

                        {ratios.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={3}
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Financial Ratios Found.
                                </td>

                            </tr>

                        ) : (

                            ratios.map((item) => (

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
                                            href={`/dashboard/investor/financial-ratios/edit/${item.id}`}
                                            className="mr-4 text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <DeleteFinancialRatioButton id={item.id} />

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
