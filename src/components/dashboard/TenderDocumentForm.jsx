"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function TenderDocumentForm({

    document = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: document?.title || "",
        type: document?.type || "PDF",
        size: document?.size || "",
        uploadDate: document?.uploadDate || "",
        file: null,

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleFileChange = (e) => {

        setFormData(prev => ({
            ...prev,
            file: e.target.files[0],
        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        let fileUrl = document?.file || "";

        if (formData.file) {

            const uploadData = new FormData();

            uploadData.append("file", formData.file);

            const uploadRes = await fetch("/api/upload-pdf", {

                method: "POST",
                body: uploadData,

            });

            const uploadResult = await uploadRes.json();

            if (!uploadResult.success) {

                alert(uploadResult.message);
                return;

            }

            fileUrl = uploadResult.url;

        }

        const payload = {

            title: formData.title,
            type: formData.type,
            size: formData.size,
            uploadDate: formData.uploadDate,
            file: fileUrl,

        };

        const url = document
            ? `/api/tender-documents/${document.id}`
            : "/api/tender-documents";

        const method = document ? "PUT" : "POST";

        const res = await fetch(url, {

            method,

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),

        });

        const data = await res.json();

        if (data.success) {

            alert(
                document
                    ? "Tender Document Updated Successfully"
                    : "Tender Document Added Successfully"
            );

            router.push("/dashboard/ebidding/tender-documents");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <div>

        <Link
            href="/dashboard/ebidding/tender-documents"
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
                    placeholder="Document Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="type"
                    placeholder="PDF"
                    value={formData.type}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="size"
                    placeholder="2.5 MB"
                    value={formData.size}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="uploadDate"
                    placeholder="20 July 2026"
                    value={formData.uploadDate}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="rounded-xl border p-3"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {document ? "Update Document" : "Save Document"}
                </button>

            </div>

        </form>
        </div>

    );

}
