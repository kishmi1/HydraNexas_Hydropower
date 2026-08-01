"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function InternshipForm({

    internship = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: internship?.title || "",
        duration: internship?.duration || "",
        description: internship?.description || "",

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

        const url = internship
            ? `/api/internships/${internship.id}`
            : "/api/internships";

        const method = internship ? "PUT" : "POST";

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
                internship
                    ? "Internship Updated Successfully"
                    : "Internship Added Successfully"
            );

            router.push("/dashboard/careers/internships");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
             <div>

        <Link
            href="/dashboard/careers/internships"
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
                        Internship Title
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
                        Duration
                    </label>

                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="3 Months"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={6}
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
                    {internship ? "Update Internship" : "Save Internship"}
                </button>

            </div>

        </form>
</div>
    );

}
