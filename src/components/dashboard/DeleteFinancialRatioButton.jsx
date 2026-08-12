"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

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
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete financial ratio"
            onClick={handleDelete}
        />
    );

}
