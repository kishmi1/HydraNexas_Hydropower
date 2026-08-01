"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DividendHistoryForm({ dividend = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        year: dividend?.year || "",
        dividend: dividend?.dividend || "",
        bonus: dividend?.bonus || "",

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

        const url = dividend
            ? `/api/dividend-history/${dividend.id}`
            : "/api/dividend-history";

        const method = dividend ? "PUT" : "POST";

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
                dividend
                    ? "Dividend History Updated Successfully"
                    : "Dividend History Added Successfully"
            );

            router.push("/dashboard/investor/dividend-history");
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

                <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2025"
                    className="rounded-xl border px-4 py-3"
                    required
                />

                <input
                    type="text"
                    name="dividend"
                    value={formData.dividend}
                    onChange={handleChange}
                    placeholder="12%"
                    className="rounded-xl border px-4 py-3"
                    required
                />

                <input
                    type="text"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleChange}
                    placeholder="5%"
                    className="rounded-xl border px-4 py-3"
                    required
                />

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white"
                >
                    {dividend ? "Update Dividend" : "Save Dividend"}
                </button>

            </div>

        </form>

    );

}
