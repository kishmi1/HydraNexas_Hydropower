"use client";

import { useRouter } from "next/navigation";

export default function VendorStatusButtons({ id, status }) {

    const router = useRouter();

    async function updateStatus(newStatus) {

        const res = await fetch(`/api/vendor-registrations/${id}`, {

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

            alert(`Vendor ${newStatus}`);

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <div className="flex gap-4">

            <button
                onClick={() => updateStatus("Approved")}
                disabled={status === "Approved"}
                className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
            >
                Approve
            </button>

            <button
                onClick={() => updateStatus("Rejected")}
                disabled={status === "Rejected"}
                className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
            >
                Reject
            </button>

        </div>

    );

}
