import { Mail } from "lucide-react";

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
                className="block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={20} />
                </div>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          pl-12
          pr-4
          py-3
          text-slate-900
          placeholder-slate-400
          outline-none
          transition
          duration-200
          focus:border-blue-900
          focus:ring-2
          focus:ring-blue-900/10
        "
                />
            </div>
        </div>
    );
}
