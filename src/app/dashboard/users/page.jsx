import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";

import DeleteUserButton from "@/components/dashboard/DeleteUserButton";

export default async function UsersPage() {

    const users = await prisma.user.findMany({

        orderBy: {

            createdAt: "desc",

        },

    });

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Users Management
                    </h1>

                    <p className="text-slate-500">
                        Manage System Users
                    </p>

                </div>

                <Link
                    href="/dashboard/users/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >

                    <Plus size={18} />

                    Add User

                </Link>

            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    {user.role}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm ${
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {user.status}
                                    </span>

                                </td>

                                <td className="p-4 text-center">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            href={`/dashboard/users/edit/${user.id}`}
                                        >

                                            <Pencil
                                                size={18}
                                                className="text-blue-600"
                                            />

                                        </Link>

                                        <DeleteUserButton id={user.id} />

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
