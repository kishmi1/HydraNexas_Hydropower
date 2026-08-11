"use client";

import "./CompanyOverview.css";

const overviewImage = "/assets/images/company/company.jpg";

import { useTranslation } from "react-i18next";

import Link from "next/link";

import { useState, useEffect } from "react";

export default function CompanyOverview() {

  const { t } = useTranslation();
  const [overview, setOverview] = useState({
    subtitle: "About HydraNexa",
    title: "Building Nepal's Sustainable Energy Future",
    description: "HydraNexa Energy is a modern hydropower company dedicated to delivering reliable, clean, and sustainable electricity through innovative engineering and responsible environmental practices.",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/home-content");
      const data = await res.json();
      if (data.success && data.content.companyOverview) {
        setOverview(data.content.companyOverview);
      }
    } catch (error) {
      console.error("Error fetching company overview:", error);
    }
  };

  return (
    <section className="company-overview">

      <div className="container company-grid">

        {/* LEFT IMAGE */}
        <div className="company-image fade-in-up">
          <img
            src={overviewImage}
            alt="HydraNexa"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="company-content fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span>
            {overview.subtitle}
          </span>

          <h2>
            {overview.title}
          </h2>

          <p>
            {overview.description}
          </p>

          <ul>
            <li>
              ✓ {t("company.feature1")}
            </li>
            <li>
              ✓ {t("company.feature2")}
            </li>
            <li>
              ✓ {t("company.feature3")}
            </li>
          </ul>

          <Link
            href="/about/company-overview"
            className="company-btn"
          >
            {t("company.button")}
          </Link>
        </div>

      </div>

    </section>

  );

}
