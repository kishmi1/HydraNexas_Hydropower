export const navItems = [
    {
        key: "home",
        path: "/",
    },

    {
        key: "about",
        children: [
            {
                key: "companyOverview",
                path: "/about/company-overview",
            },
            {
                key: "visionMission",
                path: "/about/vision-mission",
            },
            {
                key: "boardOfDirectors",
                path: "/about/board-of-directors",
            },
            {
                key: "leadershipTeam",
                path: "/about/leadership-team",
            },
            {
                key: "companyHistory",
                path: "/about/company-history",
            },
            {
                key: "awardsRecognition",
                path: "/about/awards-recognition",
            },
        ],
    },

    {
        key: "projects",
        children: [
            {
                key: "allProjects",
                path: "/projects",
            },
            {
                key: "ongoingProjects",
                path: "/projects/ongoing",
            },
            {
                key: "completedProjects",
                path: "/projects/completed",
            },
            {
                key: "upcomingProjects",
                path: "/projects/upcoming",
            },
            {
                key: "projectMap",
                path: "/projects/project-map",
            },
        ],
    },

    {
        key: "investors",
        children: [
            {
                key: "financialHighlights",
                path: "/investor/financial-highlights",
            },
            {
                key: "annualReports",
                path: "/investor/annual-reports",
            },
            {
                key: "shareInformation",
                path: "/investor/share-information",
            },
            {
                key: "corporateGovernance",
                path: "/investor/corporate-governance",
            },
            {
                key: "downloads",
                path: "/investor/downloads",
            },
        ],
    },

    {
        key: "news",
        children: [
            {
                key: "latestNews",
                path: "/news/latest-news",
            },
            {
                key: "events",
                path: "/news/events",
            },
            {
                key: "pressReleases",
                path: "/news/press-releases",
            },
            {
                key: "mediaGallery",
                path: "/news/media-gallery",
            },
        ],
    },

    {
        key: "ebidding",
        children: [
            {
                key: "activeTenders",
                path: "/ebidding/active-tenders",
            },
            {
                key: "tenderNotices",
                path: "/ebidding/tender-notices",
            },
            {
                key: "tenderDocuments",
                path: "/ebidding/tender-documents",
            },
            {
                key: "vendorRegistration",
                path: "/ebidding/vendor-registration",
            },
            {
                key: "awardNotices",
                path: "/ebidding/award-notices",
            },
        ],
    },

    {
        key: "careers",
        children: [
            {
                key: "lifeAtHydraNexa",
                path: "/careers/life-at-hydranexa",
            },
            {
                key: "currentOpenings",
                path: "/careers/current-openings",
            },
            {
                key: "internshipProgram",
                path: "/careers/internship",
            },
            {
                key: "applyNow",
                path: "/careers/apply-now",
            },
        ],
    },

    {
        key: "contact",
        path: "/contact",
    },
];
