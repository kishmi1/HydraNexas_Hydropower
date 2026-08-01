"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnnualReportForm({

    report = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        year: report?.year || "",
        title: report?.title || "",
        description: report?.description || "",

        file: null,

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setFormData((prev) => ({
                ...prev,
                file,
            }));

        }

    };
async function handleSubmit(e) {

    e.preventDefault();

    let fileUrl = report?.file || "";

    if (formData.file) {

        const uploadData = new FormData();

        uploadData.append("file", formData.file);
        uploadData.append("folder", "hydranexa/annual-reports");

        const uploadRes = await fetch("/api/upload", {

            method: "POST",
            body: uploadData,

        });

        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {

            alert(uploadResult.message);
            return;

        }

        fileUrl = uploadResult.imageUrl;

    }

    const url = report
        ? `/api/annual-reports/${report.id}`
        : "/api/annual-reports";

    const method = report ? "PUT" : "POST";

    const res = await fetch(url, {

        method,

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({

            year: formData.year,
            title: formData.title,
            description: formData.description,
            file: fileUrl,

        }),

    });

    const data = await res.json();

    if (data.success) {

        alert(
            report
                ? "Annual Report Updated Successfully"
                : "Annual Report Added Successfully"
        );

        router.push("/dashboard/investor/annual-reports");
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
                        Year
                    </label>

                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="2025"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Annual Report 2025"
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

                <div>

                    <label className="mb-2 block font-medium">
                        PDF File
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {report ? "Update Report" : "Save Report"}
                </button>

            </div>

        </form>

    );

}
