"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function GalleryForm({

    gallery = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: gallery?.title || "",
        category: gallery?.category || "Projects",
        type: gallery?.type || "Image",

        description: gallery?.description || "",

        image: null,
        video: null,

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value,

        }));

    }

    function handleFileChange(e) {

        const file = e.target.files[0];

        if (formData.type === "Image") {

            setFormData((prev) => ({
                ...prev,
                image: file,
            }));

        } else {

            setFormData((prev) => ({
                ...prev,
                video: file,
            }));

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        let imageUrl = gallery?.image || "";
        let videoUrl = gallery?.video || "";

        if (formData.image) {

            const uploadData = new FormData();

            uploadData.append("file", formData.image);

            const uploadRes = await fetch("/api/upload", {

                method: "POST",
                body: uploadData,

            });

            const uploadResult = await uploadRes.json();

            imageUrl = uploadResult.url || uploadResult.Url;

        }

        if (formData.video) {

            const uploadData = new FormData();

            uploadData.append("file", formData.video);

            const uploadRes = await fetch("/api/upload", {

                method: "POST",
                body: uploadData,

            });

            const uploadResult = await uploadRes.json();

            videoUrl = uploadResult.url || uploadResult.Url;

        }

        const payload = {

            title: formData.title,
            category: formData.category,
            type: formData.type,

            image: imageUrl,
            video: videoUrl,

            description: formData.description,

        };

        const url = gallery
            ? `/api/gallery/${gallery.id}`
            : "/api/gallery";

        const method = gallery ? "PUT" : "POST";

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
                gallery
                    ? "Gallery Updated Successfully"
                    : "Gallery Added Successfully"
            );

            router.push("/dashboard/gallery");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
             <div>

        <Link
            href="/dashboard/gallery"
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
        />

    </div>

    <div>

        <label className="mb-2 block font-medium">
            Category
        </label>

        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >

            <option>Projects</option>
            <option>Events</option>
            <option>News</option>
            <option>CSR</option>
            <option>Office</option>

        </select>

    </div>

    <div>

        <label className="mb-2 block font-medium">
            Media Type
        </label>

        <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >

            <option>Image</option>
            <option>Video</option>

        </select>

    </div>

    <div>

        <label className="mb-2 block font-medium">

            {formData.type === "Image"
                ? "Upload Image"
                : "Upload Video"}

        </label>

        <input
            type="file"
            onChange={handleFileChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
        />

    </div>

</div>

<div className="mt-8 flex justify-end">

    <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
    >
        {gallery ? "Update Media" : "Save Media"}
    </button>

</div>

        </form>
</div>
    );

}
