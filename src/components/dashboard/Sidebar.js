"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ChevronDown, ChevronRight, X, Menu } from "lucide-react";

import { COMPANY } from "@/constants/company";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";

export default function Sidebar() {

    const pathname = usePathname();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    async function handleLogout() {

        const res = await fetch("/api/auth/logout", {
            method: "POST",
        });

        const data = await res.json();

        if (data.success) {
            router.push("/login");
            router.refresh();
        }

    }

    const [openMenus, setOpenMenus] = useState(() => {

        const state = {};

        SIDEBAR_ITEMS.forEach((item) => {

            if (item.children) {

                state[item.title] = item.children.some((child) =>
                    pathname.startsWith(child.href)
                );

            }

        });

        return state;

    });

    const toggleMenu = (title) => {

        setOpenMenus((prev) => ({

            ...prev,

            [title]: !prev[title],

        }));

    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex-col bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:flex`}>
                
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                {/* Logo */}

                <div className="border-b border-slate-800 p-6 mt-12 lg:mt-0">

                    <div className="flex items-center gap-4">

                        <Image
                            src="/logo.png"
                            alt="HydraNexa"
                            width={50}
                            height={50}
                        />

                        <div>
<h2 className="text-xl font-bold text-white drop-shadow-sm">
    {COMPANY.shortName}
</h2>

                            <p className="text-xs text-slate-400">
                                Admin Panel
                            </p>

                        </div>

                    </div>

                </div>

                {/* Sidebar */}

                <nav className="flex-1 overflow-y-auto p-4">

                    <ul className="space-y-2">

                        {SIDEBAR_ITEMS.map((item) => {

                            const Icon = item.icon;

                            // Dropdown Menu

                            if (item.children) {

                                const parentActive = item.children.some((child) =>
                                    pathname.startsWith(child.href)
                                );

                                return (

                                    <li key={item.title}>

                                        <button
                                            type="button"
                                            onClick={() => toggleMenu(item.title)}
                                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition
                                                ${parentActive
                                                    ? "bg-slate-800 text-white"
                                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                                }`}
                                        >

                                            <div className="flex items-center gap-3">

                                                <Icon size={20} />

                                                <span>{item.title}</span>

                                            </div>

                                            {openMenus[item.title]
                                                ? <ChevronDown size={18} />
                                                : <ChevronRight size={18} />}

                                        </button>

                                        {openMenus[item.title] && (

                                            <ul className="mt-2 ml-6 space-y-1">

                                                {item.children.map((child) => {

                                                    const ChildIcon = child.icon;

                                                    const active = pathname === child.href;

                                                    return (

                                                        <li key={child.title}>

                                                            <Link
                                                                href={child.href}
                                                                onClick={() => setIsMobileOpen(false)}
                                                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                                                                    ${active
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                                    }`}
                                                            >

                                                                <ChildIcon size={16} />

                                                                <span>{child.title}</span>

                                                            </Link>

                                                        </li>

                                                    );

                                                })}

                                            </ul>

                                        )}

                                    </li>

                                );

                            }

                            // Logout Menu

                            if (item.action === "logout") {

                                return (

                                    <li key={item.title}>

                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
                                        >

                                            <Icon size={20} />

                                            <span>{item.title}</span>

                                        </button>

                                    </li>

                                );

                            }

                            // Normal Menu

                            const active = pathname === item.href;

                            return (

                                <li key={item.title}>

                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                                            ${active
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                            }`}
                                    >

                                        <Icon size={20} />

                                        <span>{item.title}</span>

                                    </Link>

                                </li>

                            );

                        })}

                    </ul>

                </nav>

                {/* Footer */}

                <div className="border-t border-slate-800 p-5 text-center text-xs text-slate-500">

                    {COMPANY.copyright}

                </div>

            </aside>
        </>
    );

}
