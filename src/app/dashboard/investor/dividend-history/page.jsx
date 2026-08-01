import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteDividendHistoryButton from "@/components/dashboard/DeleteDividendHistoryButton";

export default async function DividendHistoryPage() {

    const dividends = await prisma.dividendHistory.findMany({

        orderBy: {
            year: "desc",
        },

    });

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Dividend History
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage company dividend history.
                    </p>

                </div>

                <Link
                    href="/dashboard/investor/dividend-history/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Dividend
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">Year</th>

                            <th className="px-6 py-4 text-left">Dividend</th>

                            <th className="px-6 py-4 text-left">Bonus</th>

                            <th className="px-6 py-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dividends.map((item) => (

                            <tr key={item.id} className="border-t">

                                <td className="px-6 py-4">
                                    {item.year}
                                </td>

                                <td className="px-6 py-4">
                                    {item.dividend}
                                </td>

                                <td className="px-6 py-4">
                                    {item.bonus}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <Link
                                        href={`/dashboard/investor/dividend-history/edit/${item.id}`}
                                        className="mr-4 text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>

                                    <DeleteDividendHistoryButton id={item.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
