"use client";

import { useEffect, useState } from "react";


import UpdateApplicationStatus from "@/components/dashboard/UpdateApplicationStatus";

export default function JobApplicationsPage() {

        const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetch("/api/job-applications")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    setJobApplications(data.applications || []);
                } else {
                    console.error("API Error:", data.message);
                    alert(`Error: ${data.message}`);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(`Failed to load job applications: ${error.message}`);
                setLoading(false);
            });
    }, []);

    const handleViewCV = (application) => {
        setSelectedApplication(application);
    };

    const closeCVModal = () => {
        setSelectedApplication(null);
    };

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

            {/* CV View Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-sm">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Application Details</h2>
                            <button
                                onClick={closeCVModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-4">
                            {/* Applicant Information */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Full Name</h3>
                                    <p className="text-sm">{selectedApplication.fullName}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Email</h3>
                                    <p className="text-sm">{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Phone</h3>
                                    <p className="text-sm">{selectedApplication.phone}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Address</h3>
                                    <p className="text-sm">{selectedApplication.address}</p>
                                </div>
                            </div>

                            {/* Position Details */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Position Applied</h3>
                                    <p className="text-sm">{selectedApplication.position}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Qualification</h3>
                                    <p className="text-sm">{selectedApplication.qualification}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Experience</h3>
                                    <p className="text-sm">{selectedApplication.experience}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Current Company</h3>
                                    <p className="text-sm">{selectedApplication.company || 'N/A'}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Expected Salary</h3>
                                    <p className="text-sm">{selectedApplication.salary || 'N/A'}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Status</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        selectedApplication.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        selectedApplication.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        selectedApplication.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {selectedApplication.status}
                                    </span>
                                </div>
                            </div>

                            {/* Cover Letter */}
                            {selectedApplication.coverLetter && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-slate-600 mb-1 text-xs">Cover Letter</h3>
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                        <p className="text-slate-700 whitespace-pre-wrap text-xs">{selectedApplication.coverLetter}</p>
                                    </div>
                                </div>
                            )}

                            {/* CV Preview */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-slate-600 mb-1 text-xs">CV/Resume</h3>
                                {selectedApplication.cv ? (
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <a
                                                href={selectedApplication.cv}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-xs"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View CV
                                            </a>
                                        </div>

                                        {/* CV Preview iframe */}
                                        <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
                                            <iframe
                                                src={selectedApplication.cv}
                                                className="w-full h-full"
                                                title="CV Preview"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-xs">No CV uploaded</p>
                                )}
                            </div>

                            {/* Application Actions */}
                            <div className="flex gap-4 pt-4 border-t">
                                <UpdateApplicationStatus
                                    id={selectedApplication.id}
                                    status={selectedApplication.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

                                    <button
                                        onClick={() => handleViewCV(application)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View CV
                                    </button>

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
