"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActiveTenderForm({ tender = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: tender?.title || "",
        tenderNo: tender?.tenderNo || "",
        closingDate: tender?.closingDate || "",
        type: tender?.type || "",
        location: tender?.location || "",
        status: tender?.status || "Open",

        description: tender?.description || "",
        content: tender?.content || "",

        scope: tender?.scope?.join("\n") || "",
        eligibility: tender?.eligibility?.join("\n") || "",

        contactOfficer: tender?.contactOfficer || "",
        contactEmail: tender?.contactEmail || "",
        contactPhone: tender?.contactPhone || "",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        const payload = {

            ...formData,

            scope: formData.scope
                .split("\n")
                .filter(item => item.trim() !== ""),

            eligibility: formData.eligibility
                .split("\n")
                .filter(item => item.trim() !== ""),

        };

        const url = tender
            ? `/api/active-tenders/${tender.id}`
            : "/api/active-tenders";

        const method = tender ? "PUT" : "POST";

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
                tender
                    ? "Tender Updated Successfully"
                    : "Tender Added Successfully"
            );

            router.push("/dashboard/ebidding/active-tenders");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <form onSubmit={handleSubmit}>
           <div className="grid gap-6">

    <input
        type="text"
        name="title"
        placeholder="Tender Title"
        value={formData.title}
        onChange={handleChange}
        className="rounded-xl border p-3"
        required
    />

    <input
        type="text"
        name="tenderNo"
        placeholder="Tender Number"
        value={formData.tenderNo}
        onChange={handleChange}
        className="rounded-xl border p-3"
        required
    />

    <input
        type="text"
        name="closingDate"
        placeholder="Closing Date"
        value={formData.closingDate}
        onChange={handleChange}
        className="rounded-xl border p-3"
        required
    />

    <input
        type="text"
        name="type"
        placeholder="Tender Type"
        value={formData.type}
        onChange={handleChange}
        className="rounded-xl border p-3"
        required
    />

    <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
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
        <option>Open</option>
        <option>Closed</option>
        <option>Awarded</option>
    </select>

    <textarea
        name="description"
        placeholder="Short Description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <textarea
        name="content"
        placeholder="Tender Content"
        rows={6}
        value={formData.content}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <textarea
        name="scope"
        placeholder="One scope per line"
        rows={5}
        value={formData.scope}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <textarea
        name="eligibility"
        placeholder="One eligibility requirement per line"
        rows={5}
        value={formData.eligibility}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <input
        type="text"
        name="contactOfficer"
        placeholder="Contact Officer"
        value={formData.contactOfficer}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <input
        type="email"
        name="contactEmail"
        placeholder="Contact Email"
        value={formData.contactEmail}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

    <input
        type="text"
        name="contactPhone"
        placeholder="Contact Phone"
        value={formData.contactPhone}
        onChange={handleChange}
        className="rounded-xl border p-3"
    />

</div>

<div className="mt-8 flex justify-end">

    <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
    >
        {tender ? "Update Tender" : "Save Tender"}
    </button>

</div>
        </form>
    );

}
