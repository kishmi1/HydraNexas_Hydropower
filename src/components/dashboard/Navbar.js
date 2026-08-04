"use client";

import { Bell, Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            if (data.success) {
                setNotifications(data.notifications);
                setUnreadCount(data.unreadCount);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markAsRead = async (ids) => {
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });
            fetchNotifications();
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    const handleNotificationClick = () => {
        setShowDropdown(!showDropdown);
        if (showDropdown) {
            const unreadIds = notifications
                .filter((n) => !n.isRead)
                .map((n) => n.id);
            if (unreadIds.length > 0) {
                markAsRead(unreadIds);
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/dashboard/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                <form onSubmit={handleSearch} className="relative hidden md:block">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-10 outline-none transition focus:border-blue-600"
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}

                </form>

                {/* Notification */}

                <div className="relative" ref={dropdownRef}>

                    <button
                        onClick={handleNotificationClick}
                        className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200"
                    >

                        <Bell size={20} />

                        {unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}

                    </button>

                    {/* Notification Dropdown */}

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50">

                            <div className="border-b border-slate-200 p-4">

                                <h3 className="font-semibold text-slate-800">
                                    Notifications
                                </h3>

                            </div>

                            <div className="max-h-96 overflow-y-auto">

                                {notifications.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500">
                                        No notifications
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`border-b border-slate-100 p-4 hover:bg-slate-50 cursor-pointer ${
                                                !notification.isRead ? "bg-blue-50" : ""
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">

                                                <div className={`h-2 w-2 mt-2 rounded-full ${
                                                    notification.type === "vendor" ? "bg-green-500" : "bg-blue-500"
                                                }`} />

                                                <div className="flex-1">

                                                    <p className="font-medium text-slate-800 text-sm">
                                                        {notification.title}
                                                    </p>

                                                    <p className="text-slate-600 text-xs mt-1">
                                                        {notification.message}
                                                    </p>

                                                    <p className="text-slate-400 text-xs mt-2">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>
                    )}

                </div>

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
