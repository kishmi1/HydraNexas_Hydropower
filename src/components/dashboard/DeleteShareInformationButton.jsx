"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

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
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete share information"
            onClick={handleDelete}
        />
    );

}
