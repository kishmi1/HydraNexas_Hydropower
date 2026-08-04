"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, Pencil } from "lucide-react";

import DeleteEventButton from "@/components/dashboard/DeleteEventButton";

export default function EventsPage() {

        const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setEvents(data.events || data.event || []);
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
                        Events
                    </h1>

                    <p className="text-slate-500">
                        Manage Company Events
                    </p>

                </div>

                <Link
                    href="/dashboard/events/create"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                    <Plus size={18} />
                    Add Event
                </Link>

            </div>

          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
                <table className="w-full">

                    <thead className="bg-slate-100">

<tr>

<th className="p-4 text-left">Image</th>
<th className="p-4 text-left">Title</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Location</th>
<th className="p-4 text-center">Actions</th>

</tr>

</thead>

                    <tbody>

                        {events.map((event) => (

                           <tr
    key={event.id}
    className="border-b hover:bg-slate-50 transition"
>

                                <td className="p-4">

                                   <img
    src={event.image}
    alt={event.title}
    className="h-16 w-24 rounded-lg object-cover border"
/>

                                </td>

                                <td className="p-4">
                                    {event.title}
                                </td>

                                <td className="p-4">
                                    {event.date}
                                </td>

                                <td className="p-4">
                                    {event.location}
                                </td>

                                <td className="flex justify-center gap-3 p-4">

                                    <Link
                                        href={`/dashboard/events/edit/${event.id}`}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </Link>

                                    <DeleteEventButton id={event.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}
