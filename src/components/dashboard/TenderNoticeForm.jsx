"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function TenderNoticeForm({

    notice = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: notice?.title || "",
        publishDate: notice?.publishDate || "",
        location: notice?.location || "",
        description: notice?.description || "",

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

        const url = notice
            ? `/api/tender-notices/${notice.id}`
            : "/api/tender-notices";

        const method = notice ? "PUT" : "POST";

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
                notice
                    ? "Tender Notice Updated Successfully"
                    : "Tender Notice Added Successfully"
            );

            router.push("/dashboard/ebidding/tender-notices");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <div>

        <Link
            href="/dashboard/ebidding/tender-notices"
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

                <input
                    type="text"
                    name="title"
                    placeholder="Tender Notice Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="publishDate"
                    placeholder="Publish Date"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <textarea
                    name="description"
                    rows={5}
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {notice ? "Update Notice" : "Save Notice"}
                </button>

            </div>

        </form>
        </div>

    );

}
