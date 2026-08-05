"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AwardForm({ award = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: award?.title || "",
    year: award?.year || "",
    description: award?.description || "",
    icon: award?.icon || "FaTrophy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const url = award
      ? `/api/awards/${award.id}`
      : "/api/awards";
    const method = award ? "PUT" : "POST";

    try {
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
          award
            ? "Award Updated Successfully"
            : "Award Added Successfully"
        );
        router.push("/dashboard/about/awards");
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save award");
    }
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="e.g., Best Hydropower Company"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="e.g., 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="Describe the award..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Icon (React Icon Name)
          </label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option value="FaTrophy">FaTrophy</option>
            <option value="FaAward">FaAward</option>
            <option value="FaCertificate">FaCertificate</option>
            <option value="FaMedal">FaMedal</option>
            <option value="FaStar">FaStar</option>
            <option value="FaLeaf">FaLeaf</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {award ? "Update Award" : "Add Award"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
