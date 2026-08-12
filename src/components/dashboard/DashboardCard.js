import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function DashboardCard({
    title,
    value,
    icon: Icon,
    color = "bg-blue-600",
    trend = null,
    trendValue = "",
}) {
    const getTrendIcon = () => {
        if (trend === "up") return TrendingUp;
        if (trend === "down") return TrendingDown;
        return Minus;
    };

    const getTrendColor = () => {
        if (trend === "up") return "text-green-600";
        if (trend === "down") return "text-red-600";
        return "text-slate-500";
    };

    const TrendIcon = getTrendIcon();

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:transform hover:-translate-y-1">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h2>

                </div>

                <div className={`${color} rounded-xl p-4 text-white shadow-sm`}>
                    <Icon size={24} />
                </div>

            </div>

            {trend && (
                <div className="mt-6 flex items-center gap-2 text-sm">
                    <TrendIcon size={16} className={getTrendColor()} />
                    <span className={getTrendColor()}>
                        {trendValue}
                    </span>
                    <span className="text-slate-500">
                        from last month
                    </span>
                </div>
            )}

            {!trend && (
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight size={16} />
                    Updated just now
                </div>
            )}

        </div>
    );
}
