"use client";

import "./AnnualReports.css";

import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/investor/annual-reports-hero.jpg";

export default function AnnualReports() {

  const [annualReports, setAnnualReports] = useState([]);

  useEffect(() => {
    fetch("/api/annual-reports")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAnnualReports(result.reports || []);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <>
      <PageHero
        subtitle="Investor Relations"
        title="Annual Reports"
        description="Access HydraNexa's annual reports, financial statements, and corporate performance summaries."
        backgroundImage={heroImage}
      />

      <section className="reports-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>Reports & Publications</span>

            <h2>
              Annual
              <br />
              Reports
            </h2>

            <p>
              Download our annual reports to explore HydraNexa's
              financial performance, operational milestones,
              sustainability initiatives, and future growth strategy.
            </p>
          </div>

          <div className="reports-grid">
            {
              annualReports.length > 0 ? (
                annualReports.map((report, index) => (
                  <div
                    className="report-card fade-in-up"
                    key={report.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="report-year">
                      {report.year}
                    </div>

                    <h3>{report.title}</h3>

                    <p>{report.description}</p>

                    <a
                      href={report.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="primary-btn"
                    >
                      Download Report
                    </a>

                  </div>
                ))
              ) : (
                <p>No Annual Reports Available.</p>
              )
            }
          </div>

        </div>

      </section>

    </>
  );
}
