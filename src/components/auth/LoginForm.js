"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                setLoading(false);
                return;
            }

            router.push("/dashboard");
            router.refresh();

        } catch (err) {
            setError("Something went wrong.");
        }

        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <AuthInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="admin@hydranexa.com"
                value={formData.email}
                onChange={handleChange}
            />

            <PasswordInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
            />

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" />
                    Remember Me
                </label>
            </div>

            {error && (
                <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <SubmitButton
                text="Sign In"
                loading={loading}
            />
        </form>
    );
}
