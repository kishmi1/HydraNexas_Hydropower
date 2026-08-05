"use client";

import "./CTASection.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CTASection() {
  const [cta, setCta] = useState({
    subtitle: "Let's Build the Future Together",
    title: "Partner With HydraNexa For A Sustainable Tomorrow",
    description: "Join us in transforming Nepal's energy future through innovative hydropower projects, responsible investment, and sustainable development.",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/home-content");
      const data = await res.json();
      if (data.success && data.content.cta) {
        setCta(data.content.cta);
      }
    } catch (error) {
      console.error("Error fetching CTA content:", error);
    }
  };

  return (
    <section className="cta-section">

      <div className="container">

        <div className="cta-content">

          <span>{cta.subtitle}</span>

          <h2>
            {cta.title}
          </h2>

          <p>
            {cta.description}
          </p>

          <div className="cta-buttons">

            <Link
              href="/contact"
              className="primary-btn"
            >
              Contact Us
            </Link>

            <Link
              href="/projects"
              className="secondary-btn"
            >
              Explore Projects
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
