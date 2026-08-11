"use client";

import "./InvestorHighlights.css";
import Link from "next/link";
import { investorHighlights } from "../../../data/homeData";

export default function InvestorHighlights() {
  return (
    <section className="investor-highlights">

      <div className="container">

        <div className="section-header">

          <span>Investor Relations</span>

          <h2>
            Building Trust Through
            <br />
            Transparency
          </h2>

          <p>
            We are committed to maintaining transparency, strong corporate
            governance and long-term value creation for our investors.
          </p>

        </div>

        <div className="investor-grid">

          {investorHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="investor-card fade-in-up" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>

                <div className="investor-icon">
                  <Icon />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>
            );
          })}

        </div>

        <div className="investor-btn-wrapper">

          <Link
            href="/investor/financial-highlights"
            className="primary-btn"
          >
            View Investor Relations
          </Link>

        </div>

      </div>

    </section>
  );
}
