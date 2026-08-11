"use client";

import "./Sustainability.css";
import { sustainabilityData } from "../../../data/homeData";
import { useState, useEffect } from "react";

export default function Sustainability() {

  const [sustainability, setSustainability] = useState({
    title: "Creating Lasting Value Through Clean Energy",
    description: "Sustainability is at the heart of HydraNexa. Every project is designed to generate renewable energy while protecting the environment and empowering local communities.",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/home-content");
      const data = await res.json();
      if (data.success && data.content.sustainability) {
        setSustainability(data.content.sustainability);
      }
    } catch (error) {
      console.error("Error fetching sustainability content:", error);
    }
  };

  return (

    <section className="sustainability">

      <div className="container">

        {/* SECTION HEADER */}
        <div className="section-header light fade-in-up">

          <span>
            Sustainability
          </span>

          <h2>
            {sustainability.title}
          </h2>

          <p>
            {sustainability.description}
          </p>

        </div>

        {/* CARDS */}
        <div className="sustainability-grid">

          {sustainabilityData.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                className="sustainability-card fade-in-up"
                key={item.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >

                <div className="icon">
                  <Icon />
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>

            );
          })}

        </div>

      </div>

    </section>

  );

}
