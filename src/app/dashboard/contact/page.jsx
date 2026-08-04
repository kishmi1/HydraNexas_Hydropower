"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Eye, Trash2 } from "lucide-react";

import DeleteContactButton from "@/components/dashboard/DeleteContactButton";

export default function ContactPage() {

        const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/contact")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setContacts(data.contacts || data.contact || []);
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
                    Contact Messages
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage messages received from the website.
                </p>

            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Subject</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Date</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {contacts.map((contact) => (

                            <tr
                                key={contact.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="p-4 font-medium">
                                    {contact.name}
                                </td>

                                <td className="p-4">
                                    {contact.email}
                                </td>

                                <td className="p-4">
                                    {contact.phone || "-"}
                                </td>

                                <td className="p-4">
                                    {contact.subject}
                                </td>

                                <td className="p-4 text-center">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            contact.status === "Read"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {contact.status}
                                    </span>

                                </td>

                                <td className="p-4 text-center">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-4">

                                        <Link
                                            href={`/dashboard/contact/${contact.id}`}
                                        >

                                            <Eye
                                                size={18}
                                                className="text-blue-600"
                                            />

                                        </Link>

                                        <DeleteContactButton
                                            id={contact.id}
                                        />

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
