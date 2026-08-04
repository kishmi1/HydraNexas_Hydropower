"use client";

import "./TenderNotices.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";
import { useEffect, useState } from "react";

import { FaCalendarAlt, FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";

export default function TenderNotices() {
  const [notices, setNotices] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/tender-notices")
    .then((res) => res.json())
    .then((data) => {
      setNotices(data.notices);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}, []);
  return (
    <>
      <PageHero
        subtitle="E-Bidding"
        title="Tender Notices"
        description="Stay informed about the latest tender announcements and procurement opportunities at HydraNexa Energy."
        backgroundImage={heroImage}
      />

      <section className="tender-notices-section">

        <div className="container">

          <div className="section-header">

            <span>Procurement Announcements</span>

            <h2>Latest Tender Notices</h2>

            <p>
              Browse the latest tender notices issued by HydraNexa
              Energy. Interested bidders are encouraged to review
              the notice details before submitting proposals.
            </p>

          </div>

          <div className="notice-grid">

            {loading ? (
  <p>Loading tender notices...</p>
) : (
  notices.map((notice) => (

            <div
  className="notice-card"
  key={notice.id}
>

  <h3>{notice.title}</h3>

  <div className="notice-info">

    <p>
      <FaCalendarAlt />
      {notice.publishDate}
    </p>

    <p>
      <FaMapMarkerAlt />
      {notice.location}
    </p>

  </div>

  <p className="notice-description">
    {notice.description}
  </p>

  <a
    href={notice.file}
    target="_blank"
    rel="noopener noreferrer"
    className="primary-btn"
  >
    <FaFilePdf />
    Download Notice
  </a>

</div>

           ) ))}

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
