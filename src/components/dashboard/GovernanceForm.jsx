"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GovernanceForm({ governance = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: governance?.title || "",
        description: governance?.description || "",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        const url = governance
            ? `/api/governance/${governance.id}`
            : "/api/governance";

        const method = governance ? "PUT" : "POST";

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
                governance
                    ? "Governance Updated Successfully"
                    : "Governance Added Successfully"
            );

            router.push("/dashboard/investor/governance");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >

            <div className="grid gap-6">

                <div>

                    <label className="mb-2 block font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {governance ? "Update Governance" : "Save Governance"}
                </button>

            </div>

        </form>

    );

}
