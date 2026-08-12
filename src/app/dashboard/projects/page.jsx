"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteProjectButton from "@/components/dashboard/DeleteProjectButton";
import PageHeader from "@/components/dashboard/PageHeader";
import Table from "@/components/dashboard/Table";
import StatusBadge from "@/components/dashboard/StatusBadge";
import IconButton from "@/components/dashboard/IconButton";
import LoadingState from "@/components/dashboard/LoadingState";
import { TableEmpty } from "@/components/dashboard/EmptyState";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => {
                console.log("Projects API response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Projects API data:", data);
                if (data.success) {
                    setProjects(data.projects || []);
                } else {
                    console.error("Projects API error:", data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingState message="Loading projects..." />;
    }

    return (
        <div>
            <PageHeader
                title="Project Management"
                description="Manage Hydropower Projects"
                action={
                    <Link href="/dashboard/projects/create" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                        <Plus size={18} />
                        Add Project
                    </Link>
                }
            />

            <Table.Container>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Image</Table.Head>
                            <Table.Head>Project</Table.Head>
                            <Table.Head>Location</Table.Head>
                            <Table.Head>Status</Table.Head>
                            <Table.Head>Capacity</Table.Head>
                            <Table.Head align="center">Featured</Table.Head>
                            <Table.Head align="center">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {projects.length === 0 ? (
                            <Table.TableEmpty colSpan={7} message="No projects found" description="Create your first project to get started" />
                        ) : (
                            projects.map((project) => (
                                <Table.Row key={project.id}>
                                    <Table.Cell>
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-16 w-24 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                                                No Image
                                            </div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium">
                                        {project.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {project.location}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {project.status}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {project.capacity}
                                    </Table.Cell>
                                    <Table.Cell align="center">
                                        {project.featured ? "Yes" : "No"}
                                    </Table.Cell>
                                    <Table.Cell align="center">
                                        <div className="flex justify-center gap-2">
                                            <Link href={`/dashboard/projects/edit/${project.id}`}>
                                                <IconButton icon={Pencil} variant="edit" tooltip="Edit project" />
                                            </Link>
                                            <DeleteProjectButton id={project.id} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </Table.Container>
        </div>
    );
}
