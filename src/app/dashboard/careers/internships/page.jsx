"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteInternshipButton from "@/components/dashboard/DeleteInternshipButton";

export default function InternshipsPage() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/internships")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setInternships(data.internships || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching internships:", error);
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
                        Internship Programs
                    </h1>
                    <p className="text-slate-500">
                        Manage Internship Programs
                    </p>
                </div>
                <Link
                    href="/dashboard/careers/internships/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Internship
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Duration</th>
                            <th className="p-4 text-left">Description</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {internships.map((internship) => (
                            <tr
                                key={internship.id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    {internship.title}
                                </td>
                                <td className="p-4">
                                    {internship.duration}
                                </td>
                                <td className="p-4">
                                    {internship.description}
                                </td>
                                <td className="flex justify-center gap-3 p-4">
                                    <Link
                                        href={`/dashboard/careers/internships/edit/${internship.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>
                                    <DeleteInternshipButton id={internship.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
