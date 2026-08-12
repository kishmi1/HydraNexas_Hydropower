"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteGovernanceButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = confirm(
            "Are you sure you want to delete this governance record?"
        );

        if (!confirmed) return;

        const res = await fetch(`/api/governance/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Governance Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete governance"
            onClick={handleDelete}
        />
    );

}
