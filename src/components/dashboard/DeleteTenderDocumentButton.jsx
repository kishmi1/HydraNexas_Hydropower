"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

        <button onClick={handleDelete}>

            <Trash2
                size={18}
                className="text-red-600"
            />

        </button>

    );

}
