"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteVendorButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        const confirmDelete = confirm(
            "Are you sure you want to delete this vendor?"
        );

        if (!confirmDelete) return;

        const res = await fetch(`/api/vendor-registrations/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Vendor deleted successfully.");

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
