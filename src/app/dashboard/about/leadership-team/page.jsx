"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function LeadershipPage() {

    const [members, setMembers] = useState([]);

    async function loadMembers() {

        const res = await fetch("/api/leadership-team");

        const data = await res.json();

        if (data.success) {

            setMembers(data.leadershipTeam);

        }

    }

    useEffect(() => {

        loadMembers();

    }, []);

    async function handleDelete(id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this member?"
        );

        if (!confirmDelete) return;

        const res = await fetch(`/api/leadership-team/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Deleted Successfully");

            loadMembers();

        } else {

            alert(data.message);

        }

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Leadership Team

                    </h1>

                    <p className="text-gray-500">

                        Manage Leadership Team Members

                    </p>

                </div>

                <Link
                    href="/dashboard/about/leadership-team/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Member
                </Link>

            </div>

            <div className="overflow-hidden rounded-xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Image</th>

                            <th className="p-4 text-left">Name</th>

                            <th className="p-4 text-left">Position</th>

                            <th className="p-4 text-left">Description</th>

                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {members.map((member) => (

                            <tr
                                key={member.id}
                                className="border-t"
                            >

                                <td className="p-4">

                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />

                                </td>

                                <td className="p-4 font-medium">

                                    {member.name}

                                </td>

                                <td className="p-4">

                                    {member.position}

                                </td>

                                <td className="p-4 max-w-md">

                                    {member.description}

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            href={`/dashboard/about/leadership-team/edit/${member.id}`}
                                            className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                                        >
                                            <Pencil size={18} />
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>

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
