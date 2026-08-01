"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

        <button onClick={handleDelete}>

            <Trash2
                size={18}
                className="text-red-600 hover:text-red-800"
            />

        </button>

    );

}
