export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                H
            </div>

            <div>
                <h1 className="text-lg font-bold text-white">
                    HydraNexa
                </h1>

                <p className="text-xs text-slate-400">
                    Admin Panel
                </p>
            </div>
        </div>
    );
}
