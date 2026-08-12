"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import IconButton from "@/components/dashboard/IconButton";

export default function AwardsPage() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAwards();
  }, []);

  async function loadAwards() {
    try {
      const res = await fetch("/api/awards");
      const data = await res.json();

      if (data.success) {
        setAwards(data.awards);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading awards:", error);
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this award?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/awards/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Deleted Successfully");
        loadAwards();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting award:", error);
      alert("Failed to delete award");
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Awards & Recognition
          </h1>
          <p className="text-slate-500">
            Manage company awards and recognition
          </p>
        </div>

        <Link
          href="/dashboard/about/awards/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Award
        </Link>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Icon</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {awards.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No Awards Found.
                </td>
              </tr>
            ) : (
              awards.map((award) => (

                <tr key={award.id} className="border-t">

                  <td className="p-4 font-medium">
                    {award.title}
                  </td>

                  <td className="p-4">
                    {award.year}
                  </td>

                  <td className="p-4 max-w-sm">
                    {award.description}
                  </td>

                  <td className="p-4">
                    {award.icon}
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link href={`/dashboard/about/awards/edit/${award.id}`}>
                        <IconButton icon={Pencil} variant="edit" tooltip="Edit" />
                      </Link>
                      <IconButton
                        onClick={() => handleDelete(award.id)}
                        variant="delete"
                        tooltip="Delete"
                      />
                    </div>
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
