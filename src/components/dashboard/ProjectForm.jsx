"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function ProjectForm({ project = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        name: project?.name || "",
        slug: project?.slug || "",

        location: project?.location || "",
        capacity: project?.capacity || "",

        status: project?.status || "Ongoing",
        year: project?.year || "",

        image: null,

        description: project?.description || "",
        details: project?.details || "",

        specifications: project?.specifications
            ? JSON.stringify(project.specifications, null, 2)
            : "",

        timeline: project?.timeline
            ? JSON.stringify(project.timeline, null, 2)
            : "",

        progress: project?.progress || "",

        featured: project?.featured || false,

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

        let imageUrl = project?.image || "";

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

            name: formData.name,
            slug: formData.slug,

            location: formData.location,
            capacity: formData.capacity,

            status: formData.status,
            year: formData.year,

            image: imageUrl,

            description: formData.description,
            details: formData.details,

            specifications: formData.specifications
                ? JSON.parse(formData.specifications)
                : {},

            timeline: formData.timeline
                ? JSON.parse(formData.timeline)
                : {},

            progress: formData.progress,

            featured: formData.featured,

        };

        const url = project

            ? `/api/projects/${project.id}`

            : "/api/projects";

        const method = project

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

                project

                    ? "Project Updated Successfully"

                    : "Project Created Successfully"

            );

            router.push("/dashboard/projects");

            router.refresh();

        } else {

            alert(data.message);

        }

    }
    return (

         <div>
             <Link
                href="/dashboard/projects"
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

            {project ? "Edit Project" : "Create Project"}

        </h2>

        {/* Basic Information */}

        <div className="grid grid-cols-2 gap-6">

            <div>

                <label className="mb-2 block font-medium">
                    Project Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
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
                    className="w-full rounded-xl border p-3"
                    required
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Location
                </label>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Capacity
                </label>

                <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
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
                    className="w-full rounded-xl border p-3"
                >

                    <option>Ongoing</option>
                    <option>Upcoming</option>
                    <option>Completed</option>

                </select>

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Year
                </label>

                <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                />

            </div>

        </div>

        {/* Image */}

        <div>

            <label className="mb-2 block font-medium">
                Project Image
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
                Description
            </label>

            <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Details */}

        <div>

            <label className="mb-2 block font-medium">
                Details
            </label>

            <textarea
                rows={6}
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Specifications */}

        <div>

            <label className="mb-2 block font-medium">
                Specifications (JSON)
            </label>

            <textarea
                rows={6}
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 font-mono"
            />

        </div>

        {/* Timeline */}

        <div>

            <label className="mb-2 block font-medium">
                Timeline (JSON)
            </label>

            <textarea
                rows={6}
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 font-mono"
            />

        </div>

        {/* Progress */}

        <div>

            <label className="mb-2 block font-medium">
                Progress
            </label>

            <input
                type="text"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

        </div>

        {/* Featured */}

        <div className="flex items-center gap-3">

            <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
            />

            <label>
                Featured Project
            </label>

        </div>

        <div className="flex justify-end">

            <button
                type="submit"
                className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >

                {project ? "Update Project" : "Create Project"}

            </button>

        </div>

    </form>
</div>
);
}
