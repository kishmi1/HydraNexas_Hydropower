"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

            {/* Left */}

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-sm text-slate-500">
                    Welcome back, Admin
                </p>
            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                {/* Search */}

                <div className="relative hidden md:block">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
                    />

                </div>

                {/* Notification */}

                <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                {/* Profile */}

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                        A
                    </div>

                    <div className="hidden lg:block">

                        <h3 className="font-semibold text-slate-800">
                            Super Admin
                        </h3>

                        <p className="text-xs text-slate-500">
                            admin@hydranexa.com
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}
