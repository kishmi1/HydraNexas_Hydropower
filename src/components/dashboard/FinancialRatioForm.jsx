"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function FinancialRatioForm({

    ratio = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: ratio?.title || "",
        value: ratio?.value || "",

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

        const url = ratio
            ? `/api/financial-ratios/${ratio.id}`
            : "/api/financial-ratios";

        const method = ratio ? "PUT" : "POST";

        console.log("Ratio:", ratio);
console.log("URL:", url);
console.log("Method:", method);
console.log("FormData:", formData);

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
                ratio
                    ? "Financial Ratio Updated Successfully"
                    : "Financial Ratio Added Successfully"
            );

            router.push("/dashboard/investor/financial-ratios");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <div>

        <Link
            href="/dashboard/investor/financial-ratios"
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
            <ArrowLeft size={18} />
            Back to Dashboard
        </Link>


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
                        placeholder="Return on Equity"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
                        placeholder="14.8%"
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
                    {ratio ? "Update Ratio" : "Save Ratio"}
                </button>

            </div>

        </form>
        </div>

    );

}
