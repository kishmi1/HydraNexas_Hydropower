"use client";

import { useRouter } from "next/navigation";

export default function UpdateApplicationStatus({

    id,
    status,

}) {

    const router = useRouter();

    async function handleChange(e) {

        const newStatus = e.target.value;

        const res = await fetch(`/api/job-applications/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                status: newStatus,

            }),

        });

        const data = await res.json();

        if (data.success) {

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <select
            value={status}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
        >

            <option value="Pending">
                Pending
            </option>

            <option value="Reviewed">
                Reviewed
            </option>

            <option value="Shortlisted">
                Shortlisted
            </option>

            <option value="Rejected">
                Rejected
            </option>

            <option value="Hired">
                Hired
            </option>

        </select>

    );

}
