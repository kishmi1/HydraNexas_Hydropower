"use client";

import "./PressReleases.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImage = "/assets/images/news/press-hero.jpg";

export default function PressReleases() {

  const [pressReleases, setPressReleases] = useState([]);

  useEffect(() => {

    fetch("/api/press-releases")
      .then((res) => res.json())
      .then((result) => {

        console.log("PRESS RELEASES:", result);

        // Only show published press releases
        setPressReleases((result.pressReleases || []).filter(item => item.status === 'Published'));

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (
    <>
      <PageHero
        subtitle="News & Events"
        title="Press Releases"
        description="Read HydraNexa's official announcements, corporate updates, and important company releases."
        backgroundImage={heroImage}
      />

      <section className="press-section">

        <div className="container">

          <div className="section-header">

            <span>Official Announcements</span>

            <h2>Press Releases</h2>

            <p>
              Stay informed with our latest press releases,
              corporate announcements and official updates.
            </p>

          </div>

          <div className="press-list">

  {pressReleases.length > 0 ? (
    pressReleases.map((item) => (

    <div
      className="press-item"
      key={item.id}
    >

      <div className="press-info">

        <span className="press-date">
          {item.publishedDate}
        </span>

        <span className="press-category">
          {item.category}
        </span>

        <h3>{item.title}</h3>

        <p className="press-summary">
          {item.summary}
        </p>

        <p className="press-author">
          By {item.author}
        </p>

      </div>

      {item.pdfUrl && (
        <Link
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="read-btn"
        >
          Read PDF →
        </Link>
      )}

    </div>

  ))
  ) : (
    <p>No press releases available.</p>
  )}

</div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
