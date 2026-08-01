"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import ProjectForm from "@/components/dashboard/ProjectForm";

export default function EditProjectForm({ project }) {

    const router = useRouter();

    const [timeline, setTimeline] = useState(project.timeline);

    const [formData, setFormData] = useState({

        name: project.name,
        slug: project.slug,

        location: project.location,
        capacity: project.capacity,
        status: project.status,
        year: project.year,

        image: null,

        description: project.description,
        details: project.details,

        developer: project.specifications.developer,
        river: project.specifications.river,
        projectType: project.specifications.projectType,
        annualEnergy: project.specifications.annualEnergy,
        investment: project.specifications.investment,
        constructionPeriod: project.specifications.constructionPeriod,

        progress: project.progress,

        featured: project.featured,

    });
    console.log(project.id);
    async function handleSubmit(e) {

        e.preventDefault();

        let imageUrl = project.image;

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

        const res = await fetch(`/api/projects/${project.id}`, {

            method: "PUT",

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

            alert("Project updated successfully");

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
                    Edit Project
                </h1>

                <p className="text-slate-500">
                    Update project information.
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
