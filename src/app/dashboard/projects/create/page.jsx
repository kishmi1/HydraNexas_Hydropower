"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProjectForm from "@/components/dashboard/ProjectForm";

export default function CreateProjectPage() {

    const router = useRouter();

    const [timeline, setTimeline] = useState([
        {
            year: "",
            title: "",
        },
    ]);

    const [formData, setFormData] = useState({

        name: "",
        slug: "",

        location: "",
        capacity: "",
        status: "Ongoing",
        year: "",

        image: null,

        description: "",
        details: "",

        developer: "",
        river: "",
        projectType: "",
        annualEnergy: "",
        investment: "",
        constructionPeriod: "",

        progress: "",

        featured: false,

    });

    async function handleSubmit(e) {
    e.preventDefault();

    let imageUrl = "";

    if (formData.image) {

        const imageData = new FormData();
        imageData.append("file", formData.image);

        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: imageData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {
            alert(uploadResult.message);
            return;
        }

        imageUrl = uploadResult.imageUrl;
    }

    const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            ...formData,

            image: imageUrl,

            specifications: {
                developer: formData.developer,
                river: formData.river,
                projectType: formData.projectType,
                annualEnergy: formData.annualEnergy,
                investment: formData.investment,
                constructionPeriod: formData.constructionPeriod,
            },

            timeline,

        }),
    });

    const data = await res.json();

    if (data.success) {
        alert("Project created successfully");
        router.push("/dashboard/projects");
        router.refresh();
    } else {
        alert(data.message);
    }
}

    return (

        <div>

            <Link
                href="/dashboard/projects"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Projects
            </Link>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Add Project
                </h1>

                <p className="text-slate-500">
                    Create a new hydropower project.
                </p>

            </div>

            <ProjectForm
                formData={formData}
                setFormData={setFormData}
                timeline={timeline}
                setTimeline={setTimeline}
                handleSubmit={handleSubmit}
            />

        </div>

    );

}
