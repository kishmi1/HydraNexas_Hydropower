"use client";

import "./LeadershipTeam.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import { useState, useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
const heroImage = "/assets/images/hero/about-hero.jpg";

export default function LeadershipTeam() {
  const [leadershipTeam, setLeadershipTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const ceoMember = leadershipTeam[0];
  const teamMembers = leadershipTeam.slice(1);

useEffect(() => {

  fetch("/api/leadership-team")
    .then((res) => {
      console.log("Leadership team response status:", res.status);
      return res.json();
    })
    .then((result) => {

      console.log("Leadership team data:", result);

      setLeadershipTeam(result.leadershipTeam || []);
      setLoading(false);

    })
    .catch((error) => {

      console.error("Leadership team error:", error);
      setLoading(false);

    });

}, []);

if (loading) {
  return <div className="text-center py-10">Loading...</div>;
}

if (leadershipTeam.length === 0) {
  return <div className="text-center py-10">No leadership team members available.</div>;
}

  return (

    <>

      <PageHero
        subtitle="About HydraNexa"
        title="Leadership Team"
        description="Meet the passionate professionals leading HydraNexa's operations, innovation and long-term growth."
        backgroundImage={heroImage}
      />

      <section className="leadership-section">

        <div className="container">

          {/* HEADER */}
          <div className="section-header fade-in-up">

            <span>
              Leadership
            </span>

            <h2>
              Meet Our
              <br />
              Leadership Team
            </h2>

            <p>
              Our leadership team combines technical excellence,
              strategic vision and operational expertise to
              deliver sustainable hydropower solutions.
            </p>

          </div>

          {/* CEO CARD */}
          <div className="ceo-card fade-in-up">

            <div className="ceo-image">
              {ceoMember.image && (
                <img
                  src={ceoMember.image}
                  alt={ceoMember.name}
                />
              )}
            </div>

            <div className="ceo-content">
              <span>
                {ceoMember.position}
              </span>

              <h3>
                {ceoMember.name}
              </h3>

              <p>
                {ceoMember.description}
              </p>

              <div className="social-icons">
                <a href="#">
                  <FaLinkedinIn />
                </a>
              </div>

            </div>

          </div>

          {/* TEAM MEMBERS */}
          <div className="leadership-grid">
            {teamMembers.map((member, index) => (
              <div
                className="leader-card fade-in-up"
                key={member.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="leader-image">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                    />
                  )}
                </div>

                <div className="leader-content">
                  <h3>
                    {member.name}
                  </h3>

                  <span>
                    {member.position}
                  </span>

                  <p>
                    {member.description}
                  </p>

                  <div className="social-icons">
                    <a href="#">
                      <FaLinkedinIn />
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

    </>

  );

}
