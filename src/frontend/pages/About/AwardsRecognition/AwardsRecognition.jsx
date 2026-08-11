"use client";

import "./AwardsRecognition.css";

import PageHero from "../../../components/common/PageHero/PageHero";

import {
  certificationsData,
} from "../../../data/aboutData";

const heroImage = "/assets/images/hero/about-hero.jpg";

import { useState, useEffect } from "react";
import { FaTrophy, FaAward, FaCertificate, FaMedal, FaStar, FaLeaf } from "react-icons/fa";

const iconMap = {
  FaTrophy,
  FaAward,
  FaCertificate,
  FaMedal,
  FaStar,
  FaLeaf,
};

export default function AwardsRecognition() {
  const [awards, setAwards] = useState([]);
  const [achievementStats, setAchievementStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards();
    fetchAchievementStats();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await fetch("/api/awards");
      const data = await res.json();
      if (data.success) {
        setAwards(data.awards);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching awards:", error);
      setLoading(false);
    }
  };

  const fetchAchievementStats = async () => {
    try {
      const res = await fetch("/api/achievement-stats");
      const data = await res.json();
      if (data.success) {
        setAchievementStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching achievement stats:", error);
    }
  };

  return (

    <>

      <PageHero
        subtitle="About HydraNexa"
        title="Awards & Recognition"
        description="Celebrating our achievements, certifications and commitment to excellence in renewable energy."
        backgroundImage={heroImage}
      />

      {/* Awards */}
      <section className="awards-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Achievements
            </span>

            <h2>
              Awards &
              <br />
              Recognition
            </h2>

            <p>
              Our achievements reflect our commitment to innovation,
              sustainability and excellence in hydropower development.
            </p>
          </div>

          <div className="awards-grid">
            {loading ? (
              <div className="text-center py-12">Loading awards...</div>
            ) : awards.length === 0 ? (
              <div className="text-center py-12">No awards found</div>
            ) : (
              awards.map((award, index) => {
                const Icon = iconMap[award.icon] || FaTrophy;

                return (
                  <div
                    className="award-card fade-in-up"
                    key={award.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="award-icon">
                      <Icon />
                    </div>

                    <span>
                      {award.year}
                    </span>

                    <h3>
                      {award.title}
                    </h3>

                    <p>
                      {award.description}
                    </p>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </section>

      {/* Certifications */}
      <section className="certifications-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Certifications
            </span>

            <h2>
              International Standards
            </h2>
          </div>

          <div className="certifications-grid">
            {certificationsData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="certificate-card fade-in-up"
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="certificate-icon">
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

      {/* Statistics */}
      <section className="achievement-section">

        <div className="container">
          <div className="achievement-grid">
            {achievementStats.length === 0 ? (
              <div className="text-center py-12">Loading stats...</div>
            ) : (
              achievementStats.map((item, index) => (
                <div
                  className="achievement-card fade-in-up"
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h2>
                    {item.value}
                  </h2>

                  <p>
                    {item.label}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </section>

    </>

  );

}
