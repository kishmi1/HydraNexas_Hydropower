"use client";

import "./ActiveTenders.css";
import Link from "next/link";
import {
  FaUserPlus,
  FaFileDownload,
  FaPaperPlane,
  FaAward,
} from "react-icons/fa";
import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";
import { useEffect, useState } from "react";

export default function ActiveTenders() {
  const [tenders, setTenders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/active-tenders")
    .then((res) => res.json())
    .then((data) => {
      setTenders(data.tenders);
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
        title="Active Tenders"
        description="Explore current procurement opportunities and participate in HydraNexa Energy's transparent electronic bidding process."
        backgroundImage={heroImage}
      />

      <section className="active-tenders-section">

        <div className="container">

          {/* Header */}

          <div className="section-header">

            <span>Current Opportunities</span>

            <h2>Open Tender Notices</h2>

            <p>
              HydraNexa Energy invites eligible contractors,
              suppliers and consultants to participate in the
              following procurement opportunities.
            </p>

          </div>

          {/* Tender Cards */}

          <div className="tender-grid">

           {loading ? (
  <p>Loading tenders...</p>
) : (
  tenders.map((tender) => (
<div
  className="tender-card"
  key={tender.id}
>

  <span className="status open">
    {tender.status}
  </span>

  <h3>{tender.title}</h3>

  <div className="tender-info">

    <p>
      <strong>Tender No:</strong> {tender.tenderNo}
    </p>

    <p>
      <strong>Closing Date:</strong> {tender.closingDate}
    </p>

    <p>
      <strong>Type:</strong> {tender.type}
    </p>

    <p>
      <strong>Location:</strong> {tender.location}
    </p>

  </div>

  <Link
    href={`/tenders/${tender.id}`}
    className="primary-btn"
  >
    View Details
  </Link>

</div>

            )))}

          </div>

          {/* Procurement Process */}

          <div className="process-section">

            <div className="section-header">

              <span>How It Works</span>

              <h2>Procurement Process</h2>

            </div>

            <div className="process-grid">

              <div className="process-card">
<div className="process-icon">
    <FaUserPlus />
</div>                <h3>Register</h3>
                <p>Create your vendor account.</p>
              </div>

              <div className="process-card">
<div className="process-icon">
    <FaFileDownload />
</div>                <h3>Download</h3>
                <p>Download tender documents.</p>
              </div>

              <div className="process-card">
<div className="process-icon">
    <FaPaperPlane />
</div>                <h3>Submit Bid</h3>
                <p>Submit your proposal before deadline.</p>
              </div>

              <div className="process-card">
<div className="process-icon">
    <FaAward />
</div>                <h3>Award</h3>
                <p>Evaluation and contract award.</p>
              </div>

            </div>

          </div>

          {/* Notice */}

          <div className="important-notice">

            <h3>Important Notice</h3>

            <ul>

              <li>Read all tender documents carefully before submission.</li>

              <li>Late bids will not be accepted.</li>

              <li>HydraNexa reserves the right to accept or reject any bid.</li>

              <li>Only registered vendors are eligible to participate.</li>

            </ul>

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
