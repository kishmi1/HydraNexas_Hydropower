"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteProjectButton from "@/components/dashboard/DeleteProjectButton";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.projects || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (

        <div>



            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Project Management
                    </h1>

                    <p className="text-slate-500">
                        Manage Hydropower Projects
                    </p>

                </div>

                <Link
                    href="/dashboard/projects/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >

                    <Plus size={18} />

                    Add Project

                </Link>

            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Project</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Capacity</th>
                            <th className="p-4 text-center">Featured</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {projects.map((project) => (

                            <tr
                                key={project.id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="p-4">

                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="h-16 w-24 rounded-lg object-cover"
                                    />

                                </td>

                                <td className="p-4 font-medium">
                                    {project.name}
                                </td>

                                <td className="p-4">
                                    {project.location}
                                </td>

                                <td className="p-4">
                                    {project.status}
                                </td>

                                <td className="p-4">
                                    {project.capacity}
                                </td>
<td className="p-4 text-center">

    <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            project.featured
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
        }`}
    >
        {project.featured ? "Featured" : "Normal"}
    </span>

</td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            href={`/dashboard/projects/edit/${project.id}`}
                                        >

                                            <Pencil
                                                size={18}
                                                className="text-blue-600"
                                            />

                                        </Link>

                                        <DeleteProjectButton id={project.id} />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
