"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

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
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete download"
            onClick={handleDelete}
        />
    );

}
