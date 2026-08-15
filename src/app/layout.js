import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/SEO/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "HydraNexa Energy - Sustainable Hydropower Solutions for Nepal",
    template: "%s | HydraNexa Energy"
  },
  description: "HydraNexa Energy is a leading hydropower company in Nepal, providing sustainable and renewable energy solutions through innovative hydroelectric projects. We are committed to powering Nepal's future with clean, reliable energy.",
  keywords: [
    "hydropower",
    "renewable energy",
    "sustainable energy",
    "Nepal hydropower",
    "clean energy",
    "hydroelectric",
    "green energy",
    "power generation",
    "HydraNexa",
    "energy Nepal",
    "sustainable development",
    "electricity Nepal"
  ],
  authors: [{ name: "HydraNexa Energy" }],
  creator: "HydraNexa Energy",
  publisher: "HydraNexa Energy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hydranexa.com",
    title: "HydraNexa Energy - Sustainable Hydropower Solutions for Nepal",
    description: "Leading hydropower company in Nepal providing sustainable and renewable energy solutions through innovative hydroelectric projects.",
    siteName: "HydraNexa Energy",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "HydraNexa Energy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HydraNexa Energy - Sustainable Hydropower Solutions for Nepal",
    description: "Leading hydropower company in Nepal providing sustainable and renewable energy solutions.",
    images: ["/assets/logo/logo.png"],
    creator: "@hydranexa",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0A2540" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
