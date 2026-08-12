"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteNewsButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this news?")) return;

        const res = await fetch(`/api/news/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("News Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete news"
            onClick={handleDelete}
        />
    );

}
