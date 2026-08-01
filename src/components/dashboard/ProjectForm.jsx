"use client";

export default function ProjectForm({
    formData,
    setFormData,
    timeline,
    setTimeline,
    handleSubmit,
}) {

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

    const handleTimelineChange = (index, field, value) => {

        const updated = [...timeline];

        updated[index][field] = value;

        setTimeline(updated);

    };

    const addTimeline = () => {

        setTimeline([
            ...timeline,
            {
                year: "",
                title: "",
            },
        ]);

    };

    const removeTimeline = (index) => {

        const updated = timeline.filter((_, i) => i !== index);

        setTimeline(updated);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >

            <h2 className="mb-6 text-xl font-semibold">
                Basic Information
            </h2>

<div>

    <label className="mb-2 block font-medium">
        Project Name
    </label>

    <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
    />

</div>



            <div className="grid gap-6 md:grid-cols-2">
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
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
        <option value="Upcoming">Upcoming</option>
    </select>
</div>

{/* Year */}

<div>
    <label className="mb-2 block font-medium">
        Year
    </label>

    <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="2026"
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
    />
</div>

{/* Featured Image */}

<div className="md:col-span-2">

    <label className="mb-2 block font-medium">
        Featured Image
    </label>

    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
    />

</div>

{formData.image && (

    <div className="md:col-span-2">

        <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="h-56 w-full rounded-xl border object-cover"
        />

    </div>

)}

</div>

{/* Description */}

<div className="mt-10">

    <h2 className="mb-6 text-xl font-semibold">
        Project Description
    </h2>

    <div className="grid gap-6">

        <div>

            <label className="mb-2 block font-medium">
                Short Description
            </label>

            <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

        </div>

        <div>

            <label className="mb-2 block font-medium">
                Project Details
            </label>

            <textarea
                rows={8}
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

        </div>

    </div>

</div>

{/* Specifications */}

<div className="mt-10">

    <h2 className="mb-6 text-xl font-semibold">
        Project Specifications
    </h2>

    <div className="grid gap-6 md:grid-cols-2">

        <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            placeholder="Developer"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
            type="text"
            name="river"
            value={formData.river}
            onChange={handleChange}
            placeholder="River"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
            type="text"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            placeholder="Project Type"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
            type="text"
            name="annualEnergy"
            value={formData.annualEnergy}
            onChange={handleChange}
            placeholder="Annual Energy"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
            type="text"
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            placeholder="Investment"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <input
            type="text"
            name="constructionPeriod"
            value={formData.constructionPeriod}
            onChange={handleChange}
            placeholder="Construction Period"
            className="rounded-xl border border-slate-300 px-4 py-3"
        />

    </div>

</div>
{/* Project Settings */}

<div className="mt-10">

    <h2 className="mb-6 text-xl font-semibold">
        Project Settings
    </h2>

    <div className="grid gap-6 md:grid-cols-2">

        <div>

            <label className="mb-2 block font-medium">
                Progress
            </label>

            <input
                type="text"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                placeholder="75%"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

        </div>

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

</div>

{/* Timeline */}

<div className="mt-10">

    <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
            Timeline
        </h2>

        <button
            type="button"
            onClick={addTimeline}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
            + Add Timeline
        </button>

    </div>

    {timeline.map((item, index) => (

        <div
            key={index}
            className="mb-4 grid gap-4 rounded-xl border p-4 md:grid-cols-2"
        >

            <input
                type="text"
                placeholder="Year"
                value={item.year}
                onChange={(e) =>
                    handleTimelineChange(index, "year", e.target.value)
                }
                className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                    handleTimelineChange(index, "title", e.target.value)
                }
                className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <button
                type="button"
                onClick={() => removeTimeline(index)}
                className="text-left text-red-600 hover:underline"
            >
                Remove
            </button>

        </div>

    ))}

</div>

<div className="mt-10 flex justify-end">

    <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
    >
        Save Project
    </button>

</div>

</form>

);
}
