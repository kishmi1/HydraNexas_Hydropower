"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DownloadForm({

    download = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: download?.title || "",
        type: download?.type || "PDF",
        size: download?.size || "",
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

        setFormData((prev) => ({
            ...prev,
            file: e.target.files[0],
        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        let fileUrl = download?.file || "";

        if (formData.file) {

            const uploadData = new FormData();

            uploadData.append("file", formData.file);

            const uploadRes = await fetch("/api/upload", {

    method: "POST",
    body: uploadData,

});

const uploadResult = await uploadRes.json();

console.log("Upload Result:", uploadResult);

if (!uploadResult.success) {

    alert(uploadResult.message);
    return;

}

fileUrl = uploadResult.url;

console.log("File URL:", fileUrl);
}

        const payload = {

            title: formData.title,
            type: formData.type,
            size: formData.size,
            file: fileUrl,

        };
        console.log("Payload:", payload);

        const url = download
            ? `/api/downloads/${download.id}`
            : "/api/downloads";

        const method = download ? "PUT" : "POST";

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
                download
                    ? "Download Updated Successfully"
                    : "Download Added Successfully"
            );

            router.push("/dashboard/investor/downloads");

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
                        placeholder="Annual Report 2025"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        File Type
                    </label>

                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="PDF"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        File Size
                    </label>

                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="4.8 MB"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Upload File
                    </label>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {download ? "Update File" : "Save File"}
                </button>

            </div>

        </form>

    );

}
