"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
export default function ProjectForm({ project = null }) {

    const router = useRouter();

    // Parse existing specifications for the form
    const parseSpecifications = (specs) => {
        if (!specs) return [{ label: "", value: "" }];
        if (typeof specs === 'string') {
            try {
                const parsed = JSON.parse(specs);
                if (typeof parsed === 'object' && !Array.isArray(parsed)) {
                    return Object.entries(parsed).map(([label, value]) => ({ label, value: String(value) }));
                }
            } catch (e) {
                return [{ label: "", value: "" }];
            }
        }
        if (typeof specs === 'object' && !Array.isArray(specs)) {
            return Object.entries(specs).map(([label, value]) => ({ label, value: String(value) }));
        }
        return [{ label: "", value: "" }];
    };

    // Parse existing timeline for the form
    const parseTimeline = (timelineData) => {
        if (!timelineData) return [{ year: "", title: "", description: "" }];
        if (typeof timelineData === 'string') {
            try {
                const parsed = JSON.parse(timelineData);
                if (Array.isArray(parsed)) {
                    return parsed.map(item => ({
                        year: item.year || "",
                        title: item.title || "",
                        description: item.description || ""
                    }));
                }
            } catch (e) {
                return [{ year: "", title: "", description: "" }];
            }
        }
        if (Array.isArray(timelineData)) {
            return timelineData.map(item => ({
                year: item.year || "",
                title: item.title || "",
                description: item.description || ""
            }));
        }
        return [{ year: "", title: "", description: "" }];
    };

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

        specifications: parseSpecifications(project?.specifications),
        timeline: parseTimeline(project?.timeline),

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

    function handleSpecificationChange(index, field, value) {
        setFormData((prev) => {
            const newSpecs = [...prev.specifications];
            newSpecs[index] = { ...newSpecs[index], [field]: value };
            return { ...prev, specifications: newSpecs };
        });
    }

    function addSpecification() {
        setFormData((prev) => ({
            ...prev,
            specifications: [...prev.specifications, { label: "", value: "" }]
        }));
    }

    function removeSpecification(index) {
        setFormData((prev) => {
            const newSpecs = prev.specifications.filter((_, i) => i !== index);
            return { ...prev, specifications: newSpecs.length > 0 ? newSpecs : [{ label: "", value: "" }] };
        });
    }

    function handleTimelineChange(index, field, value) {
        setFormData((prev) => {
            const newTimeline = [...prev.timeline];
            newTimeline[index] = { ...newTimeline[index], [field]: value };
            return { ...prev, timeline: newTimeline };
        });
    }

    function addTimelineEvent() {
        setFormData((prev) => ({
            ...prev,
            timeline: [...prev.timeline, { year: "", title: "", description: "" }]
        }));
    }

    function removeTimelineEvent(index) {
        setFormData((prev) => {
            const newTimeline = prev.timeline.filter((_, i) => i !== index);
            return { ...prev, timeline: newTimeline.length > 0 ? newTimeline : [{ year: "", title: "", description: "" }] };
        });
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

        // Convert specifications array back to object for database
        const specificationsObject = formData.specifications.reduce((acc, spec) => {
            if (spec.label && spec.value) {
                acc[spec.label] = spec.value;
            }
            return acc;
        }, {});

        // Filter timeline to only include items with at least a year or title
        const timelineArray = formData.timeline.filter(item => item.year || item.title);

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

            specifications: specificationsObject,
            timeline: timelineArray,

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
                Specifications
            </label>

            <div className="space-y-3">
                {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-3 items-center">
                        <input
                            type="text"
                            placeholder="Label"
                            value={spec.label}
                            onChange={(e) => handleSpecificationChange(index, 'label', e.target.value)}
                            className="flex-1 rounded-xl border p-3"
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={spec.value}
                            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                            className="flex-1 rounded-xl border p-3"
                        />
                        <button
                            type="button"
                            onClick={() => removeSpecification(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl border border-red-200"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                    <Plus size={18} />
                    Add Specification
                </button>
            </div>

        </div>

        {/* Timeline */}

        <div>

            <label className="mb-2 block font-medium">
                Project Timeline
            </label>

            <div className="space-y-3">
                {formData.timeline.map((item, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 space-y-3">
                        <div className="flex gap-3 items-start">
                            <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium text-slate-600">Year</label>
                                <input
                                    type="text"
                                    placeholder="2025"
                                    value={item.year}
                                    onChange={(e) => handleTimelineChange(index, 'year', e.target.value)}
                                    className="w-full rounded-xl border p-3"
                                />
                            </div>
                            <div className="flex-2">
                                <label className="mb-1 block text-sm font-medium text-slate-600">Title</label>
                                <input
                                    type="text"
                                    placeholder="Construction Started"
                                    value={item.title}
                                    onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                                    className="w-full rounded-xl border p-3"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeTimelineEvent(index)}
                                className="mt-6 p-3 text-red-600 hover:bg-red-50 rounded-xl border border-red-200"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-600">Description</label>
                            <textarea
                                rows={2}
                                placeholder="Construction work started..."
                                value={item.description}
                                onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                                className="w-full rounded-xl border p-3"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTimelineEvent}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                    <Plus size={18} />
                    Add Timeline Event
                </button>
            </div>

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

        <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors bg-slate-50">

            <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
            />

            <label className="text-sm font-medium text-slate-700 cursor-pointer">
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
