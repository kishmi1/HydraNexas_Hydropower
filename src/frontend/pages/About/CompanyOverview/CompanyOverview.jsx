"use client";

import "./CompanyOverview.css";

import { purposeData } from "../../../data/aboutData";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/hero/about-hero.jpg";
const companyImage = "/assets/images/about/company-overview.jpg";

import { useState, useEffect } from "react";

export default function CompanyOverview() {

  const [companyStats, setCompanyStats] = useState([
    {
      id: 1,
      value: "850 MW",
      title: "Installed Capacity",
    },
    {
      id: 2,
      value: "12+",
      title: "Hydropower Projects",
    },
    {
      id: 3,
      value: "30+",
      title: "Years of Experience",
    },
    {
      id: 4,
      value: "1.2M+",
      title: "Homes Powered",
    },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/achievement-stats");
      const data = await res.json();
      
      if (data.success) {
        // Map API response to match our component structure
        const mappedStats = data.stats.map((stat, index) => ({
          id: index + 1,
          value: stat.value,
          title: stat.label,
        }));
        
        setCompanyStats(mappedStats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (

    <>

      {/* Page Hero */}

      <PageHero
        subtitle="About HydraNexa"
        title="Company Overview"
        description="Delivering reliable renewable energy through innovation, sustainability, and responsible hydropower development."
        backgroundImage={heroImage}
      />

      {/* Company Introduction */}

      <section className="company-intro">

        <div className="container intro-grid">

          {/* Image */}
          <div className="intro-image fade-in-up">
            <img
              src={companyImage}
              alt="HydraNexa Company Overview"
            />
          </div>

          {/* Content */}
          <div className="intro-content fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span>
              WHO WE ARE
            </span>

            <h2>
              Building Nepal's Sustainable
              <br />
              Energy Future
            </h2>

            <p>
              HydraNexa Energy is a modern hydropower company
              committed to generating clean, reliable and
              sustainable electricity for Nepal through
              innovative engineering and responsible
              environmental practices.
            </p>

            <p>
              We believe renewable energy is the foundation of
              a sustainable future. Our projects are designed
              to create long-term value for communities,
              investors and the nation while protecting
              natural resources.
            </p>

            <ul>
              <li>
                Renewable Hydropower Solutions
              </li>
              <li>
                Environmental Responsibility
              </li>
              <li>
                Community Development
              </li>
              <li>
                Reliable Energy Infrastructure
              </li>
            </ul>

            <a
              href="/projects"
              className="primary-btn"
            >
              Explore Projects
            </a>

          </div>

        </div>

      </section>

      {/* Our Purpose */}

      <section className="our-purpose">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Our Purpose
            </span>

            <h2>
              Driven by Innovation,
              <br />
              Powered by Sustainability
            </h2>

            <p>
              Our purpose is to generate clean energy while
              creating long-term value for communities,
              the environment and future generations.
            </p>
          </div>

          <div className="purpose-grid">
            {purposeData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="purpose-card fade-in-up"
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="purpose-icon">
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

      {/* Company Statistics */}

      <section className="company-stats">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Our Impact
            </span>

            <h2>
              Key Achievements
            </h2>

            <p>
              Measuring our success through tangible
              contributions to Nepal's energy landscape.
            </p>
          </div>

          <div className="stats-grid">
            {companyStats.map((stat, index) => (
              <div
                className="stat-card fade-in-up"
                key={stat.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3>
                  {stat.value}
                </h3>

                <p>
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

    </>

  );

}
