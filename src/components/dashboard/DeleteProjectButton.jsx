"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteProjectButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        if (!confirm("Delete this project?")) return;

        const res = await fetch(`/api/projects/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Project Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete project"
            onClick={handleDelete}
        />
    );

}
