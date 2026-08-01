"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteGalleryButton({

    id,

}) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this media?")) return;

        const res = await fetch(`/api/gallery/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Media Deleted Successfully");

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
