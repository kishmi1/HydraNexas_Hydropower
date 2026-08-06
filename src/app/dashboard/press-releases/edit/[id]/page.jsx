"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PressReleaseForm from "@/components/dashboard/PressReleaseForm";

export default function EditPressReleasePage() {

    const params = useParams();
    const [pressRelease, setPressRelease] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/press-releases/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPressRelease(data.pressRelease);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return <PressReleaseForm pressRelease={pressRelease} />;

}
