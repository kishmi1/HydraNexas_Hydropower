"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsForm({ setting }) {

    const router = useRouter();

    const [formData, setFormData] = useState({

        companyName: setting?.companyName || "",
        logo: null,

        email: setting?.email || "",
        phone: setting?.phone || "",
        address: setting?.address || "",

        facebook: setting?.facebook || "",
        linkedin: setting?.linkedin || "",
        youtube: setting?.youtube || "",
        instagram: setting?.instagram || "",

        websiteTitle: setting?.websiteTitle || "",
        metaDescription: setting?.metaDescription || "",

        footerText: setting?.footerText || "",

    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    }

    function handleFileChange(e) {

        setFormData(prev => ({
            ...prev,
            logo: e.target.files[0],
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        let logoUrl = setting?.logo || "";

        if (formData.logo) {

            const uploadData = new FormData();

            uploadData.append("file", formData.logo);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const uploadResult = await uploadRes.json();

            logoUrl = uploadResult.url;

        }

        const payload = {

            companyName: formData.companyName,
            logo: logoUrl,

            email: formData.email,
            phone: formData.phone,
            address: formData.address,

            facebook: formData.facebook,
            linkedin: formData.linkedin,
            youtube: formData.youtube,
            instagram: formData.instagram,

            websiteTitle: formData.websiteTitle,
            metaDescription: formData.metaDescription,

            footerText: formData.footerText,

        };

        const res = await fetch("/api/settings", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),

        });

        const data = await res.json();

        if (data.success) {

            alert("Settings Updated Successfully");

            router.refresh();

        } else {

            alert(data.message);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border bg-white p-8 shadow-sm"
        >

            <h2 className="text-2xl font-bold">
                Website Settings
            </h2>

            {/* Company */}

            <div className="grid grid-cols-2 gap-6">

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="col-span-2 rounded-xl border p-3"
                />

            </div>

            {/* Social */}

            <div className="grid grid-cols-2 gap-6">

                <input
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="text"
                    name="youtube"
                    placeholder="YouTube URL"
                    value={formData.youtube}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

                <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                />

            </div>

            {/* SEO */}

            <div className="space-y-4">

                <input
                    type="text"
                    name="websiteTitle"
                    placeholder="Website Title"
                    value={formData.websiteTitle}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                />

                <textarea
                    name="metaDescription"
                    placeholder="Meta Description"
                    rows={4}
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                />

            </div>

            {/* Footer */}

            <textarea
                name="footerText"
                placeholder="Footer Text"
                rows={3}
                value={formData.footerText}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
            />

            <div className="flex justify-end">

                <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-3 text-white"
                >
                    Save Settings
                </button>

            </div>

        </form>

    );

}
