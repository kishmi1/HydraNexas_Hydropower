"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LeadershipPage() {

    const [leaders, setLeaders] = useState([]);

    async function fetchLeadership() {

        const res = await fetch("/api/leadership-team");
        const data = await res.json();

        setLeaders(data.leadership || []);

    }

    useEffect(() => {

        fetchLeadership();

    }, []);

    async function handleDelete(id) {

        if (!confirm("Delete this member?")) return;

        await fetch(`/api/leadership-team/${id}`, {
            method: "DELETE",
        });

        fetchLeadership();

    }

    return (

        <div>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Leadership Team
                </h1>

                <Link
                    href="/dashboard/about/leadership-team/create"
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Add Member
                </Link>

            </div>

            <table className="w-full border">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Position</th>
                        <th>Image</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {leaders.map((leader) => (

                        <tr key={leader.id}>

                            <td>{leader.name}</td>

                            <td>{leader.position}</td>

                            <td>

                                <img
                                    src={leader.image}
                                    className="h-16 w-16 rounded object-cover"
                                />

                            </td>

                            <td>

                                <Link
                                    href={`/dashboard/about/leadership-team/edit/${leader.id}`}
                                    className="mr-3 text-blue-600"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(leader.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}
