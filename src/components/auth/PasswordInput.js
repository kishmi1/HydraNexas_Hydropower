"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    name,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
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
            pr-12
            text-slate-900
            outline-none
            transition
            duration-200
            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100
          "
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
}
