"use client";

import "./Downloads.css";
import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/investor/downloads-hero.jpg";

export default function Downloads() {

  const [downloadFiles, setDownloadFiles] = useState([]);

  useEffect(() => {

    fetch("/api/downloads")
      .then((res) => res.json())
      .then((result) => {

        console.log(result);

        setDownloadFiles(result.downloads || []);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (
    <>
      <PageHero
        subtitle="Investor Relations"
        title="Downloads"
        description="Download annual reports, financial statements, company profile, and other important investor documents."
        backgroundImage={heroImage}
      />

      <section className="downloads-section">

        <div className="container">

          <div className="section-header">

            <span>Resources</span>

            <h2>Downloads</h2>

            <p>
              Access important company documents including annual
              reports, financial statements, prospectus, corporate
              governance reports and investor presentations.
            </p>

          </div>

          <div className="downloads-grid">

            {
              downloadFiles.length > 0 ? (

                downloadFiles.map((file) => (

                  <div
                    className="download-card"
                    key={file.id}
                  >

                    <div className="download-icon">
                      📄
                    </div>

                    <div className="download-content">

                      <h3>{file.title}</h3>

                      <span>
                        {file.type} • {file.size}
                      </span>

                    </div>

                    <a
                      href={file.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="download-btn"
                    >
                      Download
                    </a>

                  </div>

                ))

              ) : (

                <p>No downloads available.</p>

              )
            }

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
