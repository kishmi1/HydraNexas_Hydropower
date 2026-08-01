export default function AuthInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
}) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-900
          outline-none
          transition
          duration-200
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
            />
        </div>
    );
}
