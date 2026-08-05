"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LeadershipForm({ leadership = null }) {

    const router = useRouter();
    const [loading, setLoading] = useState(!!leadership?.id && !leadership?.name);
    const [existingImageUrl, setExistingImageUrl] = useState(leadership?.image || "");
    const [formData, setFormData] = useState({

        name: leadership?.name || "",

        position: leadership?.position || "",

        description: leadership?.description || "",

        image: null,

    });

    useEffect(() => {
        if (leadership?.id && !leadership?.name) {
            fetchLeadershipData(leadership.id);
        }
    }, [leadership]);

    const fetchLeadershipData = async (id) => {
        try {
            console.log("Fetching leadership data for ID:", id);
            const res = await fetch(`/api/leadership-team/${id}`);
            const data = await res.json();
            console.log("API Response:", data);
            if (data.success && data.leadership) {
                setFormData({
                    name: data.leadership.name || "",
                    position: data.leadership.position || "",
                    description: data.leadership.description || "",
                    image: null,
                });
                setExistingImageUrl(data.leadership.image || "");
            } else {
                console.error("API returned success=false or no leadership data");
            }
        } catch (error) {
            console.error("Error fetching leadership data:", error);
        } finally {
            setLoading(false);
        }
    };

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

        let imageUrl = existingImageUrl || "";

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

            name: formData.name,

            position: formData.position,

            image: imageUrl,

            description: formData.description,

        };

        const url = leadership

            ? `/api/leadership-team/${leadership.id}`

            : "/api/leadership-team";

        const method = leadership

            ? "PUT"

            : "POST";

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

                leadership

                    ? "Leadership Member Updated Successfully"

                    : "Leadership Member Created Successfully"

            );

            router.push("/dashboard/about/leadership-team");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <div>

            <Link
                href="/dashboard/about/leadership-team"
                className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
                <ArrowLeft size={18} />
                Back
            </Link>

            {loading ? (
                <div className="p-8 text-center">Loading...</div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm"
                >

                    <h2 className="text-2xl font-bold">

                        {leadership?.id ? "Edit Leadership Member" : "Create Leadership Member"}

                    </h2>

                <div>

                    <label className="mb-2 block font-medium">

                        Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Position

                    </label>

                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Image

                    </label>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border p-3"
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Description

                    </label>

                    <textarea
                        rows={6}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                </div>

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                    >

                        {leadership ? "Update Member" : "Create Member"}

                    </button>

                </div>

            </form>
            )}

        </div>

    );

}
