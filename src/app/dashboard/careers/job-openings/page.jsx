"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil } from "lucide-react";

import DeleteJobOpeningButton from "@/components/dashboard/DeleteJobOpeningButton";

export default function JobOpeningsPage() {

        const [jobOpenings, setJobOpenings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/job-openings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setJobOpenings(data.jobOpenings || data.jobOpening || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
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
                        Job Openings
                    </h1>

                    <p className="text-slate-500">
                        Manage Job Openings
                    </p>

                </div>

                <Link
                    href="/dashboard/careers/job-openings/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Job
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Position</th>
                            <th className="p-4 text-left">Department</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-left">Type</th>
                            <th className="p-4 text-left">Deadline</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {jobs.map((job) => (

                            <tr
                                key={job.id}
                                className="border-t"
                            >

                                <td className="p-4">{job.position}</td>
                                <td className="p-4">{job.department}</td>
                                <td className="p-4">{job.location}</td>
                                <td className="p-4">{job.type}</td>
                                <td className="p-4">{job.deadline}</td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/careers/job-openings/edit/${job.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteJobOpeningButton id={job.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
