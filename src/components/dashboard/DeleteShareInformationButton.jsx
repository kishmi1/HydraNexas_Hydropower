"use client";

import { useRouter } from "next/navigation";

export default function DeleteShareInformationButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = confirm(
            "Are you sure you want to delete this Share Information?"
        );

        if (!confirmed) return;

        const res = await fetch(`/api/share-information/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Share Information Deleted Successfully");

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
