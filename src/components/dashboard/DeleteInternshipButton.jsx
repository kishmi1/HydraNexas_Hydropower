"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteInternshipButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this internship?")) return;

        const res = await fetch(`/api/internships/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Internship Deleted Successfully");

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
