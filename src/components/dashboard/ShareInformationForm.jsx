"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShareInformationForm({

    share = null,

}) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: share?.title || "",
        value: share?.value || "",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    async function handleSubmit(e) {

        e.preventDefault();

        const url = share
            ? `/api/share-information/${share.id}`
            : "/api/share-information";

        const method = share ? "PUT" : "POST";

        const res = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(formData),

        });

        const data = await res.json();

        if (data.success) {

            alert(

                share
                    ? "Share Information Updated Successfully"
                    : "Share Information Added Successfully"

            );

            router.push("/dashboard/investor/share-information");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
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
                        placeholder="Listed Exchange"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Value
                    </label>

                    <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="Nepal Stock Exchange (NEPSE)"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        required
                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                >
                    {share ? "Update Information" : "Save Information"}
                </button>

            </div>

        </form>

    );

}
