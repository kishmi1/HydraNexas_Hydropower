"use client";

import { Bell, Search, X, LogOut, FolderKanban, Newspaper, Calendar, FileText, Users, Loader2, FileText as PressIcon, User as LeadershipIcon, Building2 as BoardIcon, Briefcase as JobIcon, FileText as ActiveTenderIcon, Image as MediaIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const searchTimeoutRef = useRef(null);

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
            router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
            setShowSearchDropdown(false);
        }
    };

    const handleSearchInputChange = (value) => {
        setSearchQuery(value);
        
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.trim().length >= 2) {
            // Debounce search with 300ms delay
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(value);
            }, 300);
        } else {
            setSearchResults(null);
            setShowSearchDropdown(false);
        }
    };

    const performSearch = async (query) => {
        setSearchLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data.success) {
                setSearchResults(data.results);
                setShowSearchDropdown(true);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSearchResultClick = (route) => {
        router.push(route);
        setShowSearchDropdown(false);
        setSearchQuery("");
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults(null);
        setShowSearchDropdown(false);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });
            const data = await res.json();
            if (data.success) {
                router.push("/login");
                router.refresh();
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex h-16 lg:h-20 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">

            {/* Left - Mobile only */}
            <div className="lg:hidden">
                <span className="text-lg font-bold text-slate-800">Dashboard</span>
            </div>

            {/* Center - Desktop */}
            <div className="hidden lg:block">
                <h1 className="text-xl lg:text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                    Welcome back, Admin
                </p>
            </div>

            {/* Right */}

            <div className="flex items-center gap-3 lg:gap-6">

                {/* Search - Desktop */}
                <div className="relative hidden md:block" ref={searchRef}>
                    <form onSubmit={handleSearch} className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search everything..."
                            value={searchQuery}
                            onChange={(e) => handleSearchInputChange(e.target.value)}
                            className="w-48 lg:w-64 rounded-xl border border-slate-300 bg-slate-50 py-2 lg:py-2 pl-11 pr-10 outline-none transition focus:border-blue-600 text-sm"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        )}

                    </form>

                    {/* Search Results Dropdown */}
                    {showSearchDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50 max-h-80 overflow-y-auto">
                            
                            {searchLoading ? (
                                <div className="flex items-center justify-center p-6">
                                    <Loader2 className="animate-spin text-blue-600" size={24} />
                                </div>
                            ) : searchResults ? (
                                <div>
                                    {/* Projects */}
                                    {searchResults.projects.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <FolderKanban size={12} className="text-blue-600" />
                                                    PROJECTS
                                                </span>
                                            </div>
                                            {searchResults.projects.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <FolderKanban size={14} className="text-blue-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* News */}
                                    {searchResults.news.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <Newspaper size={12} className="text-green-600" />
                                                    NEWS
                                                </span>
                                            </div>
                                            {searchResults.news.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Newspaper size={14} className="text-green-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Events */}
                                    {searchResults.events.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <Calendar size={12} className="text-purple-600" />
                                                    EVENTS
                                                </span>
                                            </div>
                                            {searchResults.events.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Calendar size={14} className="text-purple-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tender Notices */}
                                    {searchResults.tenderNotices.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <FileText size={12} className="text-orange-600" />
                                                    TENDER NOTICES
                                                </span>
                                            </div>
                                            {searchResults.tenderNotices.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <FileText size={14} className="text-orange-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Users */}
                                    {searchResults.users.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <Users size={12} className="text-indigo-600" />
                                                    USERS
                                                </span>
                                            </div>
                                            {searchResults.users.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Users size={14} className="text-indigo-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Press Releases */}
                                    {searchResults.pressReleases && searchResults.pressReleases.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <PressIcon size={12} className="text-cyan-600" />
                                                    PRESS RELEASES
                                                </span>
                                            </div>
                                            {searchResults.pressReleases.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <PressIcon size={14} className="text-cyan-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Leadership Team */}
                                    {searchResults.leadershipTeam && searchResults.leadershipTeam.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <LeadershipIcon size={12} className="text-teal-600" />
                                                    LEADERSHIP TEAM
                                                </span>
                                            </div>
                                            {searchResults.leadershipTeam.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <LeadershipIcon size={14} className="text-teal-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Board Directors */}
                                    {searchResults.boardDirectors && searchResults.boardDirectors.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <BoardIcon size={12} className="text-amber-600" />
                                                    BOARD DIRECTORS
                                                </span>
                                            </div>
                                            {searchResults.boardDirectors.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <BoardIcon size={14} className="text-amber-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Job Openings */}
                                    {searchResults.jobOpenings && searchResults.jobOpenings.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <JobIcon size={12} className="text-rose-600" />
                                                    JOB OPENINGS
                                                </span>
                                            </div>
                                            {searchResults.jobOpenings.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <JobIcon size={14} className="text-rose-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Active Tenders */}
                                    {searchResults.activeTenders && searchResults.activeTenders.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <ActiveTenderIcon size={12} className="text-lime-600" />
                                                    ACTIVE TENDERS
                                                </span>
                                            </div>
                                            {searchResults.activeTenders.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <ActiveTenderIcon size={14} className="text-lime-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Media Gallery */}
                                    {searchResults.mediaGallery && searchResults.mediaGallery.length > 0 && (
                                        <div className="border-b border-slate-100">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                                                    <MediaIcon size={12} className="text-pink-600" />
                                                    MEDIA GALLERY
                                                </span>
                                            </div>
                                            {searchResults.mediaGallery.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSearchResultClick(item.route)}
                                                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <MediaIcon size={14} className="text-pink-600 mt-1 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-800 text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-xs text-slate-500 mt-1 truncate">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* No Results */}
                                    {!searchResults.projects.length && 
                                     !searchResults.news.length && 
                                     !searchResults.events.length && 
                                     !searchResults.tenderNotices.length && 
                                     !searchResults.users.length &&
                                     (!searchResults.pressReleases || searchResults.pressReleases.length === 0) &&
                                     (!searchResults.leadershipTeam || searchResults.leadershipTeam.length === 0) &&
                                     (!searchResults.boardDirectors || searchResults.boardDirectors.length === 0) &&
                                     (!searchResults.jobOpenings || searchResults.jobOpenings.length === 0) &&
                                     (!searchResults.activeTenders || searchResults.activeTenders.length === 0) &&
                                     (!searchResults.mediaGallery || searchResults.mediaGallery.length === 0) && (
                                        <div className="p-6 text-center text-slate-500 text-sm">
                                            No results found
                                        </div>
                                    )}

                                    {/* View All Results */}
                                    <div className="border-t border-slate-100 p-3">
                                        <button
                                            onClick={handleSearch}
                                            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View all results
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Notification */}

                <div className="relative" ref={dropdownRef}>

                    <button
                        onClick={handleNotificationClick}
                        className="relative rounded-xl bg-slate-100 p-2 lg:p-3 transition hover:bg-slate-200"
                    >

                        <Bell size={18} />

                        {unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 lg:h-5 lg:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] lg:text-xs text-white">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}

                    </button>

                    {/* Notification Dropdown */}

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-72 lg:w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50">

                            <div className="border-b border-slate-200 p-4">

                                <h3 className="font-semibold text-slate-800 text-sm">
                                    Notifications
                                </h3>

                            </div>

                            <div className="max-h-80 lg:max-h-96 overflow-y-auto">

                                {notifications.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500 text-sm">
                                        No notifications
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`border-b border-slate-100 p-3 lg:p-4 hover:bg-slate-50 cursor-pointer transition ${
                                                !notification.isRead ? "bg-blue-50" : ""
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">

                                                <div className={`h-2 w-2 mt-2 rounded-full flex-shrink-0 ${
                                                    notification.type === "vendor" ? "bg-green-500" : "bg-blue-500"
                                                }`} />

                                                <div className="flex-1 min-w-0">

                                                    <p className="font-medium text-slate-800 text-sm truncate">
                                                        {notification.title}
                                                    </p>

                                                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">
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

                {/* Profile & Logout */}

                <div className="flex items-center gap-2 lg:gap-3">

                    <div className="flex h-9 w-9 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-blue-600 text-sm lg:text-lg font-bold text-white">
                        A
                    </div>

                    <div className="hidden lg:block">

<h3 className="text-sm font-semibold text-slate-600">
    Super Admin
</h3>

                        <p className="text-xs text-slate-500">
                            admin@hydranexa.com
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="hidden lg:flex p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>

                </div>

            </div>

        </header>
    );
}
