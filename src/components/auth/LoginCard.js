import Image from "next/image";
import { COMPANY } from "@/constants/company";
import LoginForm from "./LoginForm";

export default function LoginCard() {
    return (
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">

            {/* Logo Section */}
            <div className="flex flex-col items-center pt-10 pb-6 px-8">
                <Image
                    src="/logo.png"
                    alt="HydraNexa Logo"
                    width={100}
                    height={100}
                    priority
                    className="mb-4"
                />

                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {COMPANY.name}
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                    {COMPANY.tagline}
                </p>
            </div>

            {/* Form Section */}
            <div className="px-8 pb-8">
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-slate-900">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to your {COMPANY.adminPortal}.
                    </p>
                </div>

                <LoginForm />
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center">
                    {COMPANY.copyright}
                </p>
            </div>

        </div>
    );
}
