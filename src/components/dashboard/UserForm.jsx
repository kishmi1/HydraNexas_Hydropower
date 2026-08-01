"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function UserForm({ user = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        name: user?.name || "",
        email: user?.email || "",
        password: "",
        role: user?.role || "Admin",
        status: user?.status || "Active",

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value,

        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const url = user
            ? `/api/users/${user.id}`
            : "/api/users";

        const method = user ? "PUT" : "POST";

        const res = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(formData),

        });

        const data = await res.json();

        if (data.success) {

            alert(

                user
                    ? "User Updated Successfully"
                    : "User Created Successfully"

            );

            router.push("/dashboard/users");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
         <div>
             <Link
                href="/dashboard/users"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-8 shadow-sm"
        >

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <label className="mb-2 block font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={
                            user
                                ? "Leave blank to keep current password"
                                : "Enter Password"
                        }
                        className="w-full rounded-xl border px-4 py-3"
                        required={!user}
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Role
                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                    >

                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Editor</option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                    >

                        <option>Active</option>
                        <option>Inactive</option>

                    </select>

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white"
                >

                    {user ? "Update User" : "Create User"}

                </button>

            </div>

        </form>
     </div>
    );

}
