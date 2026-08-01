import Logo from "./Logo";

export default function Sidebar() {
    return (
        <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">

            {/* Logo */}
            <div className="border-b border-slate-800 p-6">
                <Logo />
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">

                <ul className="space-y-2">

                    <li>
                        <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left font-medium">
                            🏠 Dashboard
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            📰 News
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            ⚡ Projects
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            💰 Investors
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            📄 E-Bidding
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            💼 Careers
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            📸 Gallery
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            📨 Contact
                        </button>
                    </li>

                    <li>
                        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white">
                            ⚙️ Settings
                        </button>
                    </li>

                </ul>

            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4">
                <button className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium hover:bg-red-700">
                    Logout
                </button>
            </div>

        </aside>
    );
}
