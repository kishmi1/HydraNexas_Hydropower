

export const statsData = [
    {
        id: 1,
        value: 850,
        suffix: " MW",
        key: "installedCapacity",
        label: "Installed Capacity",
    },
    {
        id: 2,
        value: 12,
        suffix: "+",
        key: "hydropowerProjects",
        label: "Hydropower Projects",
    },
    {
        id: 3,
        value: 30,
        suffix: "+",
        key: "yearsExperience",
        label: "Years of Experience",
    },
    {
        id: 4,
        value: 1200000,
        suffix: "+",
        key: "homesPowered",
        label: "Homes Powered",
    },
];


export const companyOverview = {
    subtitle: "About HydraNexa",

    title: "Building Nepal's Sustainable Energy Future",

    description:
        "HydraNexa Energy is a modern hydropower company dedicated to delivering reliable, clean, and sustainable electricity through innovative engineering and responsible environmental practices.",

    features: [
        "Renewable Hydropower Solutions",
        "Environmental Responsibility",
        "Community Development",
    ],

    button: "Learn More",
};


export const featuredProjects = [
    {
        id: 1,
        name: "Upper Trishuli Hydropower",
        capacity: "216 MW",
        location: "Rasuwa, Nepal",
        image: "project1",
        description:
            "A high-capacity hydropower project designed to deliver reliable renewable energy.",
    },
    {
        id: 2,
        name: "Marsyangdi River Project",
        capacity: "148 MW",
        location: "Lamjung, Nepal",
        image: "project2",
        description:
            "Harnessing river resources through sustainable engineering and innovation.",
    },
    {
        id: 3,
        name: "Karnali Energy Project",
        capacity: "400 MW",
        location: "Karnali Province",
        image: "project3",
        description:
            "One of the future flagship clean-energy projects powering Nepal.",
    },
];


export const liveDashboardData = [

    {
        id: 1,
        value: 186,
        suffix: " MW",
        title: "Current Generation",
        status: "Running"
    },

    {
        id: 2,
        value: 78,
        suffix: "%",
        title: "Reservoir Level",
        status: "Normal"
    },

    {
        id: 3,
        value: 450000,
        suffix: "+",
        title: "Homes Powered",
        status: "Active"
    },

    {
        id: 4,
        value: 1200,
        suffix: " Tons",
        title: "CO₂ Saved",
        status: "Eco Friendly"
    }

];
export const dashboardInfo = {

    efficiency: "96%",

    weather: "24°C | Cloudy",

    inflow: "245 m³/s",

    outflow: "218 m³/s",

    grid: "Connected",

    frequency: "50 Hz",

    voltage: "132 kV"

};
import { FaLeaf, FaWater } from "react-icons/fa";
import { MdBolt } from "react-icons/md";
import { GiVillage } from "react-icons/gi";

export const sustainabilityData = [
    {
        id: 1,
        icon: MdBolt,
        title: "Clean Energy",
        description:
            "Producing renewable electricity through sustainable hydropower generation.",
    },
    {
        id: 2,
        icon: FaWater,
        title: "Environmental Protection",
        description:
            "Protecting rivers, biodiversity and ecosystems through responsible practices.",
    },
    {
        id: 3,
        icon: GiVillage,
        title: "Community Development",
        description:
            "Supporting education, healthcare and local infrastructure around project areas.",
    },
    {
        id: 4,
        icon: FaLeaf,
        title: "Carbon Reduction",
        description:
            "Reducing carbon emissions by replacing fossil fuel-based electricity generation.",
    },
];


import {
    FaChartLine,
    FaFileAlt,
    FaCoins,
    FaBalanceScale,
} from "react-icons/fa";

export const investorHighlights = [
    {
        id: 1,
        icon: FaChartLine,
        title: "Financial Highlights",
        description:
            "View our annual performance, revenue growth and key financial indicators.",
    },
    {
        id: 2,
        icon: FaFileAlt,
        title: "Annual Reports",
        description:
            "Access annual reports, sustainability reports and shareholder documents.",
    },
    {
        id: 3,
        icon: FaCoins,
        title: "Share Information",
        description:
            "Stay updated with share information and investor notices.",
    },
    {
        id: 4,
        icon: FaBalanceScale,
        title: "Corporate Governance",
        description:
            "Ensuring transparency, accountability and ethical business practices.",
    },
];

export const latestNews = [
    {
        id: 1,
        image: "news1",
        category: "Company News",
        date: "July 20, 2026",
        title: "HydraNexa Begins Construction of New Hydropower Project",
        description:
            "Construction has officially started on our latest renewable energy project aimed at increasing Nepal's clean electricity generation.",
    },
    {
        id: 2,
        image: "news2",
        category: "Sustainability",
        date: "July 15, 2026",
        title: "Community Tree Plantation Program Successfully Completed",
        description:
            "More than 5,000 trees were planted with local communities as part of our environmental conservation initiative.",
    },
    {
        id: 3,
        image: "news3",
        category: "Investor Relations",
        date: "July 10, 2026",
        title: "Annual Financial Report 2026 Released",
        description:
            "HydraNexa publishes its annual financial report highlighting stable growth and long-term investment opportunities.",
    },
];
