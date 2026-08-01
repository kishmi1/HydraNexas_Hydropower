"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteTenderNoticeButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Are you sure you want to delete this Tender Notice?")) {

            return;

        }

        const res = await fetch(`/api/tender-notices/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Tender Notice Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <button onClick={handleDelete}>

            <Trash2
                size={18}
                className="text-red-600 hover:text-red-700"
            />

        </button>

    );

}
