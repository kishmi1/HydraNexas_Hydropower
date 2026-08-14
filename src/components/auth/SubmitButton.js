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
        rounded-lg
        bg-blue-900
        px-4
        py-3
        text-sm
        font-semibold
        text-white
        transition
        duration-200
        hover:bg-blue-800
        focus:outline-none
        focus:ring-2
        focus:ring-blue-900/10
        disabled:cursor-not-allowed
        disabled:bg-blue-700
      "
        >
            {loading ? "Signing In..." : text}
        </button>
    );
}
