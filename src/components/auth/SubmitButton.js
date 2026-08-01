export default function SubmitButton({
    text,
    loading = false,
    type = "submit",
}) {
    return (
        <button
            type={type}
            disabled={loading}
            className="
        flex
        w-full
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        px-4
        py-3
        text-sm
        font-semibold
        text-white
        transition
        duration-200
        hover:bg-blue-700
        focus:outline-none
        focus:ring-4
        focus:ring-blue-200
        disabled:cursor-not-allowed
        disabled:bg-blue-400
      "
        >
            {loading ? "Signing In..." : text}
        </button>
    );
}
