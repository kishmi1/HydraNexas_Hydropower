"use client";

export default function DeleteProjectButton({ id }) {

    async function handleDelete() {

        const ok = confirm(
            "Are you sure you want to delete this project?"
        );

        if (!ok) return;

        const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {

            alert("Project deleted successfully");

            window.location.reload();

        } else {

            alert(data.message);

        }

    }

    return (

        <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
        >
            Delete
        </button>

    );

}
