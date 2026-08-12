"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function NewsForm({ news = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: news?.title || "",

        category: news?.category || "",

        author: news?.author || "",

        date: news?.date || "",

        image: null,

        description: news?.description || "",

        content: news?.content || "",

        highlights: news?.highlights
            ? news.highlights.join(", ")
            : "",

        tags: news?.tags
            ? news.tags.join(", ")
            : "",

        featured: news?.featured || false,

        status: news?.status || "Draft",

    });

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    }

    function handleFileChange(e) {

        setFormData((prev) => ({

            ...prev,

            image: e.target.files[0],

        }));

    }
async function handleSubmit(e) {

    e.preventDefault();

    let imageUrl = news?.image || "";

    if (formData.image) {

        const uploadData = new FormData();

        uploadData.append("file", formData.image);

        const uploadRes = await fetch("/api/upload", {

            method: "POST",
            body: uploadData,

        });

        const uploadResult = await uploadRes.json();

        imageUrl = uploadResult.url;

    }

    const payload = {

        title: formData.title,

        category: formData.category,

        author: formData.author,

        date: formData.date,

        image: imageUrl,

        description: formData.description,

        content: formData.content,

        highlights: formData.highlights
            ? formData.highlights
                .split(",")
                .map((item) => item.trim())
            : [],

        tags: formData.tags
            ? formData.tags
                .split(",")
                .map((item) => item.trim())
            : [],

        featured: formData.featured,

        status: formData.status,

    };

    const url = news

        ? `/api/news/${news.id}`

        : "/api/news";

    const method = news

        ? "PUT"

        : "POST";

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

            news

                ? "News Updated Successfully"

                : "News Created Successfully"

        );

        router.push("/dashboard/news");

        router.refresh();

    } else {

        alert(data.message);

    }

}


return (

<div>
     <Link
                href="/dashboard/news"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

    <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm"
    >

        <h2 className="text-2xl font-bold">

            {news ? "Edit News" : "Create News"}

        </h2>

        {/* Basic Information */}

        <div className="grid grid-cols-2 gap-6">

            <div>

                <label className="mb-2 block font-medium">
                    News Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                    required
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
                    className="w-full rounded-xl border p-3"
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
                    className="w-full rounded-xl border p-3"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Date
                </label>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                />

            </div>

        </div>

        {/* Image */}

        <div>

            <label className="mb-2 block font-medium">
                Featured Image
            </label>

            <input
                type="file"
                onChange={handleFileChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Description */}

        <div>

            <label className="mb-2 block font-medium">
                Short Description
            </label>

            <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Content */}

        <div>

            <label className="mb-2 block font-medium">
                Full Content
            </label>

            <textarea
                rows={10}
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Highlights */}

        <div>

            <label className="mb-2 block font-medium">
                Highlights (comma separated)
            </label>

            <input
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Hydropower, Investment, Renewable Energy"
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Tags */}

        <div>

            <label className="mb-2 block font-medium">
                Tags (comma separated)
            </label>

            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="energy, nepal, hydro"
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Status */}

        <div>

            <label className="mb-2 block font-medium">
                Status
            </label>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            >

                <option>Draft</option>
                <option>Published</option>

            </select>

        </div>

        {/* Featured */}

        <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors bg-slate-50">

            <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
            />

            <label className="text-sm font-medium text-slate-700 cursor-pointer">
                Featured News
            </label>

        </div>

        <div className="flex justify-end">

            <button
                type="submit"
                className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >

                {news ? "Update News" : "Create News"}

            </button>

        </div>

    </form>
</div>
);
}
