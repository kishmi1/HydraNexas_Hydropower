"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BoardDirectorForm({ director = null }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: director?.name || "",
    position: director?.position || "",
    image: null,
    description: director?.description || "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileChange(e) {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageUrl = director?.image || "";

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

    const url = director
      ? `/api/board-directors/${director.id}`
      : "/api/board-directors";

    const method = director ? "PUT" : "POST";

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
        director
          ? "Board Director Updated Successfully"
          : "Board Director Created Successfully"
      );

      router.push("/dashboard/about/board-directors");
      router.refresh();
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/about/board-directors"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold">
          {director ? "Edit Board Director" : "Add Board Director"}
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
            rows={5}
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
            {director ? "Update Director" : "Create Director"}
          </button>
        </div>
      </form>
    </div>
  );
}
