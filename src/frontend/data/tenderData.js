export const activeTenders = [
    {
        id: 1,
        title: "Construction Materials Supply",
        tenderNo: "HNE-2026-001",
        closingDate: "25 August 2026",
        type: "Open Competitive Bidding",
        location: "Lamjung, Nepal",
        status: "Open",

        description:
            "Supply of high-quality construction materials for the Upper Marsyangdi Hydropower Project.",

        content: `
HydraNexa Energy invites qualified suppliers to participate in the supply of construction materials required for the Upper Marsyangdi Hydropower Project.

The selected supplier will provide materials that meet national and international quality standards while ensuring timely delivery to the project site.

The contract includes transportation, quality assurance, unloading, and technical documentation.
`,

        scope: [
            "Cement Supply",
            "Steel Reinforcement Bars",
            "Aggregates and Sand",
            "Construction Chemicals",
            "Transportation to Site",
        ],

        eligibility: [
            "Registered supplier in Nepal",
            "Minimum 3 years of experience",
            "Valid VAT/PAN Certificate",
            "Latest Tax Clearance Certificate",
            "Experience in similar projects",
        ],

        contact: {
            officer: "Procurement Department",
            email: "procurement@hydranexa.com",
            phone: "+977-1-4000000",
        },
    },

    {
        id: 2,
        title: "Electrical Equipment Supply",
        tenderNo: "HNE-2026-002",
        closingDate: "30 August 2026",
        type: "Open Competitive Bidding",
        location: "Kathmandu, Nepal",
        status: "Open",

        description:
            "Supply of electrical equipment for hydropower generation facilities.",

        content: `
HydraNexa Energy seeks qualified suppliers for electrical equipment required in power generation, transmission and plant operation.

The supplier shall ensure all products comply with IEC standards and provide warranty support after installation.
`,

        scope: [
            "Transformers",
            "Switchgear",
            "Power Cables",
            "Control Panels",
            "Protection Systems",
        ],

        eligibility: [
            "Authorized equipment supplier",
            "Minimum 5 years of experience",
            "ISO Certified Company",
            "Warranty Support Available",
            "Previous Hydropower Experience",
        ],

        contact: {
            officer: "Electrical Procurement Division",
            email: "electrical@hydranexa.com",
            phone: "+977-1-4000001",
        },
    },

    {
        id: 3,
        title: "Civil Construction Works",
        tenderNo: "HNE-2026-003",
        closingDate: "10 September 2026",
        type: "National Competitive Bidding",
        location: "Gorkha, Nepal",
        status: "Open",

        description:
            "Civil construction works for dam, tunnel and powerhouse infrastructure.",

        content: `
HydraNexa Energy invites experienced civil contractors to participate in the construction of major infrastructure for the hydropower project.

The successful bidder will carry out excavation, concrete works, access roads, retaining walls and structural construction.
`,

        scope: [
            "Dam Construction",
            "Tunnel Excavation",
            "Powerhouse Building",
            "Access Roads",
            "Concrete Structures",
        ],

        eligibility: [
            "Class A Construction Company",
            "Minimum 5 Similar Projects",
            "Qualified Engineers",
            "Valid Registration",
            "Financial Capability",
        ],

        contact: {
            officer: "Civil Procurement Office",
            email: "civil@hydranexa.com",
            phone: "+977-1-4000002",
        },
    },

    {
        id: 4,
        title: "Engineering Consultancy Services",
        tenderNo: "HNE-2026-004",
        closingDate: "18 September 2026",
        type: "Consultancy",
        location: "Pokhara, Nepal",
        status: "Open",

        description:
            "Consultancy services for engineering design, supervision and technical support.",

        content: `
HydraNexa Energy requires an experienced engineering consultancy firm to provide technical advisory services during project planning, construction and commissioning.

The selected consultant will supervise engineering activities, review designs and ensure compliance with national and international standards.
`,

        scope: [
            "Engineering Design Review",
            "Construction Supervision",
            "Quality Assurance",
            "Technical Reporting",
            "Project Monitoring",
        ],

        eligibility: [
            "Registered Engineering Consultancy",
            "Minimum 10 Years Experience",
            "Hydropower Project Experience",
            "Qualified Professional Engineers",
            "Strong Financial Capacity",
        ],

        contact: {
            officer: "Engineering Division",
            email: "engineering@hydranexa.com",
            phone: "+977-1-4000003",
        },
    },
];


export const tenderNotices = [

    {
        id: 1,
        title: "Supply of Construction Materials",
        publishDate: "20 July 2026",
        location: "Lamjung, Nepal",
        description: "Invitation for sealed bids for the supply of construction materials for the Upper Marsyangdi Hydropower Project."
    },

    {
        id: 2,
        title: "Electrical Equipment Procurement",
        publishDate: "25 July 2026",
        location: "Kathmandu, Nepal",
        description: "Procurement of electrical equipment for power generation and transmission facilities."
    },

    {
        id: 3,
        title: "Civil Construction Works",
        publishDate: "30 July 2026",
        location: "Gorkha, Nepal",
        description: "Tender notice for civil construction works including roads, retaining walls and drainage."
    },

    {
        id: 4,
        title: "Engineering Consultancy Services",
        publishDate: "05 August 2026",
        location: "Pokhara, Nepal",
        description: "Consultancy services for feasibility studies, design review and project supervision."
    }

];

export const tenderDocuments = [

    {
        id: 1,
        title: "Construction Materials Tender Document",
        type: "PDF",
        size: "2.4 MB",
        uploadDate: "20 July 2026",
    },

    {
        id: 2,
        title: "Electrical Equipment Specification",
        type: "PDF",
        size: "3.1 MB",
        uploadDate: "25 July 2026",
    },

    {
        id: 3,
        title: "Civil Construction BOQ",
        type: "PDF",
        size: "5.8 MB",
        uploadDate: "30 July 2026",
    },

    {
        id: 4,
        title: "Consultancy Terms of Reference",
        type: "PDF",
        size: "1.8 MB",
        uploadDate: "05 August 2026",
    }

];

export const registrationBenefits = [

    {
        id: 1,
        title: "Tender Participation",
        description: "Participate in HydraNexa procurement opportunities."
    },

    {
        id: 2,
        title: "Tender Notifications",
        description: "Receive notifications for newly published tenders."
    },

    {
        id: 3,
        title: "Document Access",
        description: "Download official tender documents online."
    },

    {
        id: 4,
        title: "Transparent Process",
        description: "Fair and transparent procurement process."
    }

];

export const eligibilityRequirements = [

    "Valid Company Registration Certificate",

    "VAT/PAN Registration",

    "Latest Tax Clearance Certificate",

    "Relevant Business Experience",

    "Technical Capability",

    "Financial Stability"

];


export const awardNotices = [

    {
        id: 1,
        project: "Upper Marsyangdi Hydropower ",
        contractor: "ABC Construction Pvt. Ltd.",
        awardDate: "15 january 2026",
        value: "NPR 25 Million",
        status: "Awarded",
    },

    {
        id: 2,
        project: "Electrical Equipment Supply",
        contractor: "XYZ Engineering Ltd.",
        awardDate: "22 March 2026",
        value: "NPR 18 Million",
        status: "Awarded",
    },

    {
        id: 3,
        project: "Civil Construction Works",
        contractor: "Himalayan Builders",
        awardDate: "30 July 2026",
        value: "NPR 40 Million",
        status: "Awarded",
    },

    {
        id: 4,
        project: "Engineering Consultancy",
        contractor: "Nepal Engineering Consultants",
        awardDate: "05 June 2026",
        value: "NPR 9 Million",
        status: "Awarded",
    }

];
