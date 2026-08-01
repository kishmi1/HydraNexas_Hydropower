"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function EventForm({ event = null }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: event?.title || "",
        date: event?.date || "",
        location: event?.location || "",
        description: event?.description || "",
        image: null,

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,
            [name]: value,

        }));

    }

    function handleFileChange(e) {

        setFormData((prev) => ({

            ...prev,
            image: e.target.files[0],

        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        let imageUrl = event?.image || "";

        if (formData.image) {

            const uploadData = new FormData();

            uploadData.append("file", formData.image);

            const uploadRes = await fetch("/api/upload", {

                method: "POST",
                body: uploadData,

            });

            const uploadResult = await uploadRes.json();

            imageUrl = uploadResult.url;

        }

        const payload = {

            title: formData.title,
            date: formData.date,
            location: formData.location,
            description: formData.description,
            image: imageUrl,

        };

        const url = event
            ? `/api/events/${event.id}`
            : "/api/events";

        const method = event ? "PUT" : "POST";

        const res = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(payload),

        });

        const data = await res.json();

        if (data.success) {

            alert(
                event
                    ? "Event Updated Successfully"
                    : "Event Added Successfully"
            );

            router.push("/dashboard/events");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (
          <div>
             <Link
                href="/dashboard/events"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-8 shadow-sm"
        >

            <div className="grid gap-6">

                <div>

                    <label className="mb-2 block font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Date
                    </label>

                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="15 August 2026"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Location
                    </label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Event Image
                    </label>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white"
                >
                    {event ? "Update Event" : "Save Event"}
                </button>

            </div>

        </form>
        </div>
    );

}
