import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Eye, Trash2 } from "lucide-react";

import DeleteVendorButton from "@/components/dashboard/DeleteVendorButton";

export default async function VendorRegistrationsPage() {

    const vendors = await prisma.vendorRegistration.findMany({

        orderBy: {
            createdAt: "desc",
        },

    });

    return (

        <div>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Vendor Registrations
                </h1>

                <p className="text-slate-500">
                    Manage Vendor Registration Requests
                </p>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Company</th>
                            <th className="p-4 text-left">Contact Person</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {vendors.map((vendor) => (

                            <tr
                                key={vendor.id}
                                className="border-t"
                            >

                                <td className="p-4">{vendor.companyName}</td>

                                <td className="p-4">{vendor.contactPerson}</td>

                                <td className="p-4">{vendor.email}</td>

                                <td className="p-4">{vendor.phone}</td>

                                <td className="p-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm
                                        ${
                                            vendor.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : vendor.status === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {vendor.status}
                                    </span>

                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/ebidding/vendor-registrations/view/${vendor.id}`}
                                    >
                                        <Eye
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteVendorButton id={vendor.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
