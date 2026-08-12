"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteDividendHistoryButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this dividend history?")) return;

        const res = await fetch(`/api/dividend-history/${id}`, {

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
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete dividend history"
            onClick={handleDelete}
        />
    );

}
