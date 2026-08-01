"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AwardNoticeForm({

    award = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        project: award?.project || "",
        contractor: award?.contractor || "",
        awardDate: award?.awardDate || "",
        value: award?.value || "",
        status: award?.status || "Awarded",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        const url = award
            ? `/api/award-notices/${award.id}`
            : "/api/award-notices";

        const method = award ? "PUT" : "POST";

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
                award
                    ? "Award Notice Updated Successfully"
                    : "Award Notice Added Successfully"
            );

            router.push("/dashboard/ebidding/award-notices");

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

                <input
                    type="text"
                    name="project"
                    placeholder="Project Name"
                    value={formData.project}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="contractor"
                    placeholder="Contractor Name"
                    value={formData.contractor}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="awardDate"
                    placeholder="Award Date"
                    value={formData.awardDate}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <input
                    type="text"
                    name="value"
                    placeholder="Contract Value"
                    value={formData.value}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                >
                    <option value="Awarded">Awarded</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {award ? "Update Award" : "Save Award"}
                </button>

            </div>

        </form>

    );

}
