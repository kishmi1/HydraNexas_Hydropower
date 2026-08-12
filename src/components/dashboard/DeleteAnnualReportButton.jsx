"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DeleteAnnualReportButton({ id }) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = confirm(
            "Are you sure you want to delete this Annual Report?"
        );

        if (!confirmed) return;

        const res = await fetch(`/api/annual-reports/${id}`, {

            method: "DELETE",

        });

        const data = await res.json();

        if (data.success) {

            alert("Annual Report Deleted Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
        <IconButton 
            icon={Trash2} 
            variant="delete" 
            tooltip="Delete annual report"
            onClick={handleDelete}
        />
    );

}
