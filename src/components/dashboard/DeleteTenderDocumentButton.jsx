"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteTenderDocumentButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this document?")) return;

        const res = await fetch(`/api/tender-documents/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete document"
            onClick={handleDelete}
        />
    );

}
