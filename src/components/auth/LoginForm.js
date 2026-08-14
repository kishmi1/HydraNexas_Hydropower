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
            console.log("Attempting login with:", formData.email);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status);
            
            if (!response.ok) {
                const data = await response.json();
                console.log("Error response:", data);
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log("Response data:", data);

            console.log("Login successful, redirecting to dashboard");
            // Force a full page navigation to ensure middleware runs with the new cookie
            window.location.href = "/dashboard";

        } catch (err) {
            console.error("Login error:", err);
            setError("Network error. Please check your connection and try again.");
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
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

            <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-900 focus:ring-blue-900/10" />
                    Remember Me
                </label>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
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
