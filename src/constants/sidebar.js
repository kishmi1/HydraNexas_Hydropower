import {
    LayoutDashboard,
    Newspaper,
    FolderKanban,
    LineChart,
    FileText,
    Briefcase,
    Image,
    CalendarDays,
    Users,
    Settings,
    LogOut,
    BarChart3,
    Landmark,
    Download,
    GraduationCap,
    Mail,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "News",
        href: "/dashboard/news",
        icon: Newspaper,
    },
    {
        title: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
    },
    {
        title: "Investor Management",
        icon: LineChart,

        children: [

            {
                title: "Financial Highlights",
                href: "/dashboard/investor/financial-highlights",
                icon: BarChart3,
            },

            {
                title: "Financial Ratios",
                href: "/dashboard/investor/financial-ratios",
                icon: LineChart,
            },

            {
                title: "Annual Reports",
                href: "/dashboard/investor/annual-reports",
                icon: FileText,
            },

            {
                title: "Share Information",
                href: "/dashboard/investor/share-information",
                icon: Landmark,
            },

            {
                title: "Dividend History",
                href: "/dashboard/investor/dividend-history",
                icon: BarChart3,
            },

            {
                title: "Corporate Governance",
                href: "/dashboard/investor/governance",
                icon: Users,
            },

            {
                title: "Downloads",
                href: "/dashboard/investor/downloads",
                icon: Download,
            },

        ],

    },
    {
        title: "E-Bidding",
        icon: FileText,

        children: [

            {
                title: "Active Tenders",
                href: "/dashboard/ebidding/active-tenders",
                icon: FileText,
            },

            {
                title: "Tender Notices",
                href: "/dashboard/ebidding/tender-notices",
                icon: Newspaper,
            },

            {
                title: "Tender Documents",
                href: "/dashboard/ebidding/tender-documents",
                icon: Download,
            },

            {
                title: "Award Notices",
                href: "/dashboard/ebidding/award-notices",
                icon: Landmark,
            },

            {
                title: "Vendor Registrations",
                href: "/dashboard/ebidding/vendor-registrations",
                icon: Briefcase,
            },

        ],

    },
    {
        title: "Careers",
        icon: Briefcase,

        children: [

            {
                title: "Job Openings",
                href: "/dashboard/careers/job-openings",
                icon: Briefcase,
            },

            {
                title: "Internships",
                href: "/dashboard/careers/internships",
                icon: GraduationCap,
            },

            {
                title: "Job Applications",
                href: "/dashboard/careers/job-applications",
                icon: Users,
            },

        ],

    },
    {
        title: "Media Gallery",
        href: "/dashboard/gallery",
        icon: Image,
    },
    {
        title: "About Management",
        icon: Users,

        children: [

            {
                title: "Leadership Team",
                href: "/dashboard/about/leadership-team",
                icon: Users,
            },

            {
                title: "Board of Directors",
                href: "/dashboard/about/board-directors",
                icon: Users,
            },

            {
                title: "Awards",
                href: "/dashboard/about/awards",
                icon: BarChart3,
            },

            {
                title: "Notices",
                href: "/dashboard/about/notices",
                icon: Newspaper,
            },

        ],

    },
    {
        title: "Events",
        href: "/dashboard/events",
        icon: CalendarDays,
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Contact Messages",
        href: "/dashboard/contact",
        icon: Mail,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Logout",
        action: "logout",
        icon: LogOut,
    },
];
