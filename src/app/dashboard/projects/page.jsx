"use client";
import DeleteProjectButton from "@/components/dashboard/DeleteProjectButton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {

                if (data.success) {
                    setProjects(data.projects);
                }

                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);


    return (
        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Project Management
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage all hydropower projects.
                    </p>
                </div>


                <Link
                    href="/dashboard/projects/create"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    + Add Project
                </Link>

            </div>


            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Project
                            </th>

                            <th className="px-6 py-4 text-left">
                                Location
                            </th>

                            <th className="px-6 py-4 text-left">
                                Capacity
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left">
                                Year
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>


                    {
                        loading ? (

                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>


                        ) : projects.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 text-center text-slate-500"
                                >
                                    No projects available.
                                </td>
                            </tr>


                        ) : (


                            projects.map((project) => (

                                <tr
                                    key={project.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 font-medium">
                                        {project.name}
                                    </td>


                                    <td className="px-6 py-4">
                                        {project.location}
                                    </td>


                                    <td className="px-6 py-4">
                                        {project.capacity}
                                    </td>


                                    <td className="px-6 py-4">
                                        {project.status}
                                    </td>


                                    <td className="px-6 py-4">
                                        {project.year}
                                    </td>


                                <td className="px-6 py-4 text-center space-x-3">

    <Link
        href={`/dashboard/projects/edit/${project.id}`}
        className="text-blue-600 hover:underline"
    >
        Edit
    </Link>

    <DeleteProjectButton id={project.id} />

</td>


                                </tr>

                            ))

                        )
                    }


                    </tbody>

                </table>

            </div>


        </div>
    );
}
