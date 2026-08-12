"use client";

import "./PressReleases.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, FileText, ChevronDown, ChevronUp } from "lucide-react";

const heroImage = "/assets/images/news/press-hero.jpg";

export default function PressReleases() {

  const [pressReleases, setPressReleases] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

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

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

        {item.featuredImage && (
          <img
            src={item.featuredImage}
            alt={item.title}
            className="press-image"
          />
        )}

        <p className={`press-summary ${expandedCards[item.id] ? 'expanded' : ''}`}>
          {expandedCards[item.id] ? item.content : item.summary}
        </p>

        <p className="press-author">
          By {item.author}
        </p>

      </div>

      <div className="press-actions">
        <button 
          onClick={() => toggleExpand(item.id)}
          className="read-more-btn"
        >
          {expandedCards[item.id] ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Read More <ChevronDown size={16} />
            </>
          )}
        </button>

        {item.pdfUrl && (
          <div className="pdf-actions">
            <Link
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="read-pdf-btn"
            >
              <FileText size={16} />
              Read PDF
            </Link>

            <Link
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="download-btn"
            >
              <Download size={16} />
              Download
            </Link>
          </div>
        )}

      </div>

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
