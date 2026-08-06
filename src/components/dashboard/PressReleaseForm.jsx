"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function PressReleaseForm({ pressRelease = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: pressRelease?.title || "",
        slug: pressRelease?.slug || "",
        summary: pressRelease?.summary || "",
        content: pressRelease?.content || "",
        featuredImage: pressRelease?.featuredImage || "",
        category: pressRelease?.category || "",
        publishedDate: pressRelease?.publishedDate || "",
        author: pressRelease?.author || "",
        pdfUrl: pressRelease?.pdfUrl || "",
        tags: pressRelease?.tags || [],
        status: pressRelease?.status || "Draft",
        pdfFile: null,
        imageFile: null,

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value,

        }));

    }

    function handleTagsChange(e) {

        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setFormData((prev) => ({

            ...prev,
            tags,

        }));

    }

    function handleFileChange(e) {

        setFormData((prev) => ({

            ...prev,
            pdfFile: e.target.files[0],

        }));

    }

    function handleImageChange(e) {

        setFormData((prev) => ({

            ...prev,
            imageFile: e.target.files[0],

        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        let pdfUrl = pressRelease?.pdfUrl || "";
        let featuredImage = pressRelease?.featuredImage || "";

        try {
            if (formData.pdfFile) {

                const uploadData = new FormData();

                uploadData.append("file", formData.pdfFile);

                const uploadRes = await fetch("/api/upload", {

                    method: "POST",
                    body: uploadData,

                });

                if (!uploadRes.ok) {
                    const error = await uploadRes.json();
                    throw new Error(error.message || "Failed to upload PDF");
                }

                const uploadResult = await uploadRes.json();

                pdfUrl = uploadResult.url;

            }

            if (formData.imageFile) {

                const uploadData = new FormData();

                uploadData.append("file", formData.imageFile);

                const uploadRes = await fetch("/api/upload", {

                    method: "POST",
                    body: uploadData,

                });

                if (!uploadRes.ok) {
                    const error = await uploadRes.json();
                    throw new Error(error.message || "Failed to upload image");
                }

                const uploadResult = await uploadRes.json();

                featuredImage = uploadResult.url;

            }

            const payload = {

                title: formData.title,
                slug: formData.slug,
                summary: formData.summary,
                content: formData.content,
                featuredImage: featuredImage || formData.featuredImage || null,
                category: formData.category,
                publishedDate: formData.publishedDate,
                author: formData.author,
                pdfUrl: pdfUrl || formData.pdfUrl || null,
                tags: formData.tags || [],
                status: formData.status,

            };

            const url = pressRelease
                ? `/api/press-releases/${pressRelease.id}`
                : "/api/press-releases";

            const method = pressRelease ? "PUT" : "POST";

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
                    pressRelease
                        ? "Press Release Updated Successfully"
                        : "Press Release Added Successfully"
                );

                router.push("/dashboard/press-releases");

                router.refresh();

            } else {

                throw new Error(data.message || "Failed to save press release");

            }

        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message || "An error occurred while saving the press release");
        }

    }

    return (
          <div>
             <Link
                href="/dashboard/press-releases"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-8 shadow-sm"
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
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Slug
                    </label>

                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="hydranexa-announces-new-investment"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Summary
                    </label>

                    <textarea
                        rows={3}
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Brief summary of the press release"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Content
                    </label>

                    <textarea
                        rows={10}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Full content of the press release"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Featured Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Corporate, Investment, etc."
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Published Date
                    </label>

                    <input
                        type="text"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        placeholder="July 15, 2026"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Author
                    </label>

                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author name"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        PDF Attachment (Optional)
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Tags (comma separated)
                    </label>

                    <input
                        type="text"
                        name="tags"
                        value={formData.tags.join(', ')}
                        onChange={handleTagsChange}
                        placeholder="investment, corporate, energy"
                        className="w-full rounded-xl border px-4 py-3"
                    />

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

                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>

                    </select>

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white"
                >
                    {pressRelease ? "Update Press Release" : "Save Press Release"}
                </button>

            </div>

        </form>
        </div>
    );

}
