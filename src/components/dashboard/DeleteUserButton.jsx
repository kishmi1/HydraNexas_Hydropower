"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this user?")) return;

        const res = await fetch(`/api/users/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("User Deleted Successfully");

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
