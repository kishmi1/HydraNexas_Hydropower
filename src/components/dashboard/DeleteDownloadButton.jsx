"use client";

import { useRouter } from "next/navigation";

export default function DeleteDownloadButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this file?")) return;

        const res = await fetch(`/api/downloads/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
        >
            Delete
        </button>

    );

}
