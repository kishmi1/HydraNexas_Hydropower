"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeadershipPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        position: "",
        image: "",
        description: "",
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch("/api/leadership-team", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                setLoading(false);

                return;

            }

            router.push("/dashboard/about/leadership-team");
            router.refresh();

        } catch (error) {

            alert("Something went wrong.");

        }

        setLoading(false);

    }

    return (

        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

            <h1 className="mb-8 text-3xl font-bold">
                Add Leadership Member
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded border p-3"
                        required
                    />

                </div>

                <div>

                    <label>Position</label>

                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="mt-2 w-full rounded border p-3"
                        required
                    />

                </div>

                <div>

                    <label>Image URL</label>

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-2 w-full rounded border p-3"
                        placeholder="https://..."
                        required
                    />

                </div>

                <div>

                    <label>Description</label>

                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-2 w-full rounded border p-3"
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-blue-600 px-6 py-3 text-white"
                >

                    {loading ? "Saving..." : "Save Member"}

                </button>

            </form>

        </div>

    );

}
