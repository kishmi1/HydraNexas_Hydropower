"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteJobOpeningButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this job opening?")) return;

        const res = await fetch(`/api/job-openings/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Job deleted successfully.");

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
