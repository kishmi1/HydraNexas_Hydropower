"use client";

import "./VisionMission.css";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/hero/about-hero.jpg";
const visionImage = "/assets/images/about/vision.jpg";
const missionImage = "/assets/images/about/mission.jpg";

import { coreValues } from "../../../data/aboutData";

export default function VisionMission() {

  return (

    <>

      <PageHero
        subtitle="About HydraNexa"
        title="Vision & Mission"
        description="Guided by innovation, sustainability and excellence to power Nepal's future."
        backgroundImage={heroImage}
      />

      {/* ================= Vision ================= */}

      <section className="vision-section">

        <div className="container vision-grid">

          {/* Image */}
          <div className="vision-image fade-in-up">
            <img
              src={visionImage}
              alt="Vision"
            />
          </div>

          {/* Content */}
          <div className="vision-content fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span>
              OUR VISION
            </span>

            <h2>
              Powering Nepal Through
              Sustainable Hydropower
            </h2>

            <p>
              Our vision is to become one of Nepal's leading
              renewable energy companies by delivering innovative
              hydropower solutions that create lasting
              environmental, economic and social value.
            </p>

            <ul>
              <li>
                Clean & Renewable Energy
              </li>
              <li>
                Innovation Driven Development
              </li>
              <li>
                Environmental Sustainability
              </li>
              <li>
                Long-term National Growth
              </li>
            </ul>

          </div>

        </div>

      </section>

      {/* ================= Mission ================= */}

      <section className="mission-section">

        <div className="container mission-grid">

          {/* Content */}
          <div className="mission-content fade-in-up">
            <span>
              OUR MISSION
            </span>

            <h2>
              Delivering Reliable Energy
              For Every Generation
            </h2>

            <p>
              Our mission is to generate reliable electricity
              while protecting nature, empowering communities,
              and supporting Nepal's sustainable economic
              development through responsible hydropower projects.
            </p>

            <ul>
              <li>
                Reliable Power Generation
              </li>
              <li>
                Community Development
              </li>
              <li>
                Safety & Operational Excellence
              </li>
              <li>
                Responsible Resource Management
              </li>
            </ul>

          </div>

          {/* Image */}
          <div className="mission-image fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img
              src={missionImage}
              alt="Mission"
            />
          </div>

        </div>

      </section>

      {/* ================= Core Values ================= */}

      <section className="values-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Core Values
            </span>

            <h2>
              Our Guiding Principles
            </h2>

            <p>
              These values define who we are and guide every
              decision we make.
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((item, index) => (
              <div
                className="value-card fade-in-up"
                key={item.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

    </>

  );

}
