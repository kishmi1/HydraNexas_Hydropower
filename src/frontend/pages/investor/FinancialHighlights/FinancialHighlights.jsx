"use client";

import "./FinancialHighlights.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import ScrollAnimation from "../../../components/common/ScrollAnimation/ScrollAnimation";
import { useEffect, useState } from "react";

const heroImage = "/assets/images/investor/financial-hero.jpg";

export default function FinancialHighlights() {
  const [financialHighlights, setFinancialHighlights] = useState([]);
const [financialRatios, setFinancialRatios] = useState([]);

useEffect(() => {

  fetch("/api/financial-highlights")
    .then((res) => res.json())
    .then((result) => {

      console.log(result);

      setFinancialHighlights(result.financialHighlights || []);

    });

  fetch("/api/financial-ratios")
    .then((res) => res.json())
    .then((result) => {

      console.log(result);

      setFinancialRatios(result.ratios || []);

    });

}, []);
  return (
    <>
      <PageHero
        subtitle="Investor Relations"
        title="Financial Highlights"
        description="Explore HydraNexa's key financial performance, operational achievements, and long-term value creation through our financial highlights."
        backgroundImage={heroImage}
      />

      <section className="financial-section">

        <div className="container">

          <div className="section-header">

            <span>Financial Performance</span>

            <h2>
              Key Financial
              <br />
              Highlights
            </h2>

            <p>
              Our financial performance reflects sustainable growth,
              operational excellence, and a strong commitment to
              delivering long-term value to shareholders.
            </p>

          </div>

          {/* Financial Cards */}
           <ScrollAnimation direction="left">
          <div className="financial-grid">

            {financialHighlights.map((item) => (

              <div
                className="financial-card"
                key={item.id}
              >

                <h3>{item.value}</h3>

                <h4>{item.title}</h4>

                <p>{item.description}</p>

              </div>


            ))}

          </div>

</ScrollAnimation>
          {/* Performance Summary */}

          <div className="performance-summary">

            <div className="summary-content">

              <span>Company Performance</span>

              <h2>
                Sustainable Growth
                <br />
                Through Renewable Energy
              </h2>

              <p>
                HydraNexa continues to strengthen its financial
                position through efficient hydropower operations,
                responsible investments, and sustainable business
                strategies. Our focus remains on creating long-term
                value for investors while supporting Nepal's clean
                energy future.
              </p>

            </div>

          </div>

          {/* Financial Ratios */}

          <div className="ratios-section">

            <h2>Key Financial Ratios</h2>
            <ScrollAnimation direction="left">
            <div className="ratios-grid">

              {financialRatios.map((ratio, index) => (

                <div
                  className="ratio-card"
                  key={index}
                >

                  <h3>{ratio.value}</h3>

                  <span>{ratio.title}</span>

                </div>

              ))}

            </div>
</ScrollAnimation>
          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
