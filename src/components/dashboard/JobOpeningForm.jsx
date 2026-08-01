"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobOpeningForm({ job = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        position: job?.position || "",
        department: job?.department || "",
        location: job?.location || "",
        type: job?.type || "Full Time",
        deadline: job?.deadline || "",

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const url = job
            ? `/api/job-openings/${job.id}`
            : "/api/job-openings";

        const method = job ? "PUT" : "POST";

        const res = await fetch(url, {

            method,

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),

        });

        const data = await res.json();

        if (data.success) {

            alert(
                job
                    ? "Job Updated Successfully"
                    : "Job Added Successfully"
            );

            router.push("/dashboard/careers/job-openings");

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
                        Position
                    </label>

                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Department
                    </label>

                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Job Type
                    </label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                    </select>

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Application Deadline
                    </label>

                    <input
                        type="text"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="30 September 2026"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {job ? "Update Job" : "Save Job"}
                </button>

            </div>

        </form>

    );

}
