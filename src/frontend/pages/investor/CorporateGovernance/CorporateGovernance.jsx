"use client";

import "./CorporateGovernance.css";

import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/investor/corporate-governance-hero.jpg";

export default function CorporateGovernance() {

  const [governanceData, setGovernanceData] = useState([]);

  useEffect(() => {

    fetch("/api/governance")
      .then((res) => res.json())
      .then((result) => {

        console.log(result);

        setGovernanceData(result.governances || []);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (
    <>
      <PageHero
        subtitle="Investor Relations"
        title="Corporate Governance"
        description="HydraNexa follows strong corporate governance principles to ensure transparency, accountability, and sustainable business growth."
        backgroundImage={heroImage}
      />

      <section className="governance-section">

        <div className="container">

          <div className="section-header">

            <span>Governance</span>

            <h2>Corporate Governance</h2>

            <p>
              Our governance framework ensures ethical leadership,
              effective decision-making, and long-term value creation
              for all stakeholders.
            </p>

          </div>

          <div className="governance-grid">

            {
              governanceData.length > 0 ? (

                governanceData.map((item) => (

                  <div
                    className="governance-card"
                    key={item.id}
                  >

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                  </div>

                ))

              ) : (

                <p>No Corporate Governance Data Available.</p>

              )
            }

          </div>

        </div>

      </section>

    </>
  );
}
