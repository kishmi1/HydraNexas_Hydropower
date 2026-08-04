"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Eye, Trash2 } from "lucide-react";

import DeleteVendorButton from "@/components/dashboard/DeleteVendorButton";

export default function VendorRegistrationsPage() {

        const [vendorRegistrations, setVendorRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/vendor-registrations")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setVendorRegistrations(data.vendors || []);
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

                        {vendorRegistrations.map((vendor) => (

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
