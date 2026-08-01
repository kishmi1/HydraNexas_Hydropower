import Image from "next/image";
import { COMPANY } from "@/constants/company";
import LoginForm from "./LoginForm";

export default function LoginCard() {
    return (
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

            {/* Left Section */}
            <div className="hidden flex-col justify-between bg-slate-900 p-12 text-white lg:flex">

                <div>
                    <Image
                        src="/logo.png"
                        alt="HydraNexa Logo"
                        width={90}
                        height={90}
                        priority
                    />

                    <h1 className="mt-6 text-4xl font-bold">{COMPANY.name}
                    </h1>

                    <p className="mt-4 text-slate-300">
                        {COMPANY.tagline}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-400">
                        {COMPANY.copyright}
                    </p>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center p-10">

                <div className="w-full max-w-md">

                    <h2 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Sign in to your Sign in to your {COMPANY.adminPortal}.
                    </p>

                    <div className="mt-8">
                        <LoginForm />
                    </div>

                </div>

            </div>

        </div>
    );
}
