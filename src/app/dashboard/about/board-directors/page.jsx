"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoardDirectorsPage() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    loadBoardDirectors();
  }, []);

  async function loadBoardDirectors() {
    const res = await fetch("/api/board-directors");
    const data = await res.json();

    if (data.success) {
      setDirectors(data.boardDirectors);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this board director?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/board-directors/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("Deleted Successfully");
      loadBoardDirectors();
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Board of Directors
        </h1>

        <Link
          href="/dashboard/about/board-directors/create"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Director
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {directors.map((director) => (

              <tr key={director.id} className="border-t">

                <td className="p-4">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  {director.name}
                </td>

                <td className="p-4">
                  {director.position}
                </td>

                <td className="p-4 max-w-sm">
                  {director.description}
                </td>

                <td className="p-4 text-center space-x-3">

                  <Link
                    href={`/dashboard/about/board-directors/edit/${director.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(director.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
