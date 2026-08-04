import "./PressReleases.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import { useEffect, useState } from "react";
import { pressReleases } from "../../../data/newsData";

const heroImage = "/assets/images/news/press-hero.jpg";

export default function PressReleases() {
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

  {pressReleases.map((item) => (

    <div
      className="press-item"
      key={item.id}
    >

      <div className="press-info">

        <span className="press-date">
          {item.date}
        </span>

        <h3>{item.title}</h3>

      </div>

      <button className="read-btn">
        Read PDF →
      </button>

    </div>

  ))}

</div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
