"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteAwardNoticeButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this award notice?")) return;

        const res = await fetch(`/api/award-notices/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Award Notice Deleted Successfully");

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
