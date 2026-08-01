"use client";

import { useRouter } from "next/navigation";

export default function DeleteFinancialRatioButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        const confirmDelete = confirm(
            "Are you sure you want to delete this Financial Ratio?"
        );

        if (!confirmDelete) return;

        const res = await fetch(`/api/financial-ratios/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Financial Ratio Deleted Successfully");

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
