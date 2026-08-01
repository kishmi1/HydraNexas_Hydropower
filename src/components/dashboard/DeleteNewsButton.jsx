"use client";

export default function DeleteNewsButton({ id }) {
    async function handleDelete() {
        const ok = confirm("Are you sure you want to delete this news?");

        if (!ok) return;

        const res = await fetch(`/api/news/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (data.success) {
            alert("News deleted successfully");
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
