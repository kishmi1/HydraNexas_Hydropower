"use client";

import { useEffect, useState } from "react";

import SettingsForm from "@/components/dashboard/SettingsForm";

export default function SettingsPage() {
    const [setting, setSetting] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSetting(data.setting);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching settings:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Website Settings
                </h1>
                <p className="mt-2 text-slate-500">
                    Manage company information, contact details, social media,
                    SEO and footer settings.
                </p>
            </div>
            <SettingsForm setting={setting} />
        </div>
    );
}
