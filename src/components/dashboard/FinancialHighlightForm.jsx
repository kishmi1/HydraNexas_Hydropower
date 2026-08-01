"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FinancialHighlightForm({

    highlight = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: highlight?.title || "",
        value: highlight?.value || "",
        description: highlight?.description || "",

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

        const url = highlight
            ? `/api/financial-highlights/${highlight.id}`
            : "/api/financial-highlights";

        const method = highlight ? "PUT" : "POST";

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
                highlight
                    ? "Financial Highlight Updated Successfully"
                    : "Financial Highlight Added Successfully"
            );

            router.push("/dashboard/investor/financial-highlights");

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
                        placeholder="Total Revenue"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Value
                    </label>

                    <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="NPR 6.8B"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Annual Revenue"
                        required
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {highlight ? "Update Highlight" : "Save Highlight"}
                </button>

            </div>

        </form>

    );

}
