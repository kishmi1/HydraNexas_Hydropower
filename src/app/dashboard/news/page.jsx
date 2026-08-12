"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteNewsButton from "@/components/dashboard/DeleteNewsButton";
import PageHeader from "@/components/dashboard/PageHeader";
import Table from "@/components/dashboard/Table";
import StatusBadge from "@/components/dashboard/StatusBadge";
import IconButton from "@/components/dashboard/IconButton";
import LoadingState from "@/components/dashboard/LoadingState";
import { TableEmpty } from "@/components/dashboard/EmptyState";

export default function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => {
                console.log("News API response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("News API data:", data);
                if (data.success) {
                    setNewsList(data.news || []);
                } else {
                    console.error("News API error:", data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingState message="Loading news..." />;
    }

    return (
        <div>
            <PageHeader
                title="News Management"
                description="Manage Company News"
                action={
                    <Link href="/dashboard/news/create" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                        <Plus size={18} />
                        Add News
                    </Link>
                }
            />

            <Table.Container>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Image</Table.Head>
                            <Table.Head>Title</Table.Head>
                            <Table.Head>Category</Table.Head>
                            <Table.Head>Author</Table.Head>
                            <Table.Head align="center">Status</Table.Head>
                            <Table.Head align="center">Featured</Table.Head>
                            <Table.Head align="center">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {newsList.length === 0 ? (
                            <TableEmpty colSpan={7} message="No news found" description="Create your first news article to get started" />
                        ) : (
                            newsList.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-16 w-24 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                                                No Image
                                            </div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="font-medium">
                                        {item.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.category}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.author}
                                    </Table.Cell>
                                    <Table.Cell align="center">
                                        {item.status}
                                    </Table.Cell>
                                    <Table.Cell align="center">
                                        {item.featured ? "Yes" : "No"}
                                    </Table.Cell>
                                    <Table.Cell align="center">
                                        <div className="flex justify-center gap-2">
                                            <Link href={`/dashboard/news/edit/${item.id}`}>
                                                <IconButton icon={Pencil} variant="edit" tooltip="Edit news" />
                                            </Link>
                                            <DeleteNewsButton id={item.id} />
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
