"use client";

import { useEffect, useState } from "react";


import UpdateApplicationStatus from "@/components/dashboard/UpdateApplicationStatus";

export default function JobApplicationsPage() {

        const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/job-applications")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setJobApplications(data.applications || []);
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

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Job Applications
                </h1>

                <p className="text-slate-500">
                    Manage Job Applications
                </p>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-white">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Position</th>
                            <th className="p-4 text-left">Qualification</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">CV</th>
                            <th className="p-4 text-left">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {jobApplications.map((application) => (

                            <tr
                                key={application.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {application.fullName}
                                </td>

                                <td className="p-4">
                                    {application.position}
                                </td>

                                <td className="p-4">
                                    {application.qualification}
                                </td>

                                <td className="p-4">
                                    {application.phone}
                                </td>

                                <td className="p-4">

                                    <a
                                        href={application.cv}
                                        target="_blank"
                                        className="text-blue-600 underline"
                                    >
                                        View CV
                                    </a>

                                </td>

                                <td className="p-4">

                                    <UpdateApplicationStatus
                                        id={application.id}
                                        status={application.status}
                                    />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
