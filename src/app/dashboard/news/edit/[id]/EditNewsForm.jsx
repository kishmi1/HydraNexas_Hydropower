"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function EditNewsForm({ news }) {

    const router = useRouter();

    const [formData, setFormData] = useState({
        title: news.title || "",
        category: news.category || "",
        author: news.author || "",
        date: news.date || "",
        description: news.description || "",
        content: news.content || "",
        tags: Array.isArray(news.tags)
            ? news.tags.join(", ")
            : "",
        highlights: Array.isArray(news.highlights)
            ? news.highlights.join(", ")
            : "",
        status: news.status || "Draft",
        featured: news.featured || false,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        let imageUrl = news.image;

        // नयाँ image upload गरिएको छ भने
        if (formData.image) {

            const imageData = new FormData();
            imageData.append("file", formData.image);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: imageData,
            });

            const uploadResult = await uploadRes.json();

            if (!uploadResult.success) {
                alert(uploadResult.message);
                return;
            }

            imageUrl = uploadResult.imageUrl;
        }

        const res = await fetch(`/api/news/${news.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                image: imageUrl,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim()),
                highlights: formData.highlights
                    .split(",")
                    .map((item) => item.trim()),
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("News updated successfully!");
            router.push("/dashboard/news");
            router.refresh();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
};

    return (
        <div>
                <Link
            href="/dashboard/news"
            className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
            <ArrowLeft size={18} />
            Back to News
        </Link>
            <h1 className="mb-8 text-3xl font-bold">
                Edit News
            </h1>


             <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Title */}

                    <div className="md:col-span-2">
                        <label className="mb-2 block font-medium">
                            News Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter news title"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Category */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Project Update"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Author */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Author
                        </label>

                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="HydraNexa Communications Team"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Date */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Image */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Featured Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                        {formData.image && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Preview"
                                    className="h-40 w-full rounded-xl border object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}

                    <div className="md:col-span-2">
                        <label className="mb-2 block font-medium">
                            Short Description
                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write short description..."
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Content */}

                    <div className="md:col-span-2">
                        <label className="mb-2 block font-medium">
                            Content
                        </label>

                        <textarea
                            rows="10"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write full news content..."
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Tags */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Hydropower, Renewable Energy"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Highlights */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Highlights
                        </label>

                        <input
                            type="text"
                            name="highlights"
                            value={formData.highlights}
                            onChange={handleChange}
                            placeholder="148 MW, Lamjung"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
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
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>

                    {/* Featured */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Featured
                        </label>

                        <select
                            value={formData.featured ? "Yes" : "No"}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    featured: e.target.value === "Yes",
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-4">

                    <button
                        type="reset"
                        className="rounded-xl border border-slate-300 px-6 py-3"
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Update News
                    </button>

                </div>

            </form>
        </div>
    );
}
