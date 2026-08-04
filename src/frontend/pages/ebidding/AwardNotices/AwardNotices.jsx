"use client";

import "./AwardNotices.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import { useEffect, useState } from "react";
const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";


import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

export default function AwardNotices() {
  const [awards, setAwards] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/award-notices")
    .then((res) => res.json())
    .then((data) => {
      setAwards(data.awards);
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
        title="Award Notices"
        description="Official contract award announcements published by HydraNexa Energy."
        backgroundImage={heroImage}
      />

      <section className="award-section">

        <div className="container">

          <div className="section-header">

            <span>Procurement Results</span>

            <h2>Award Notices</h2>

            <p>
              View officially awarded contracts and procurement decisions
              announced by HydraNexa Energy.
            </p>

          </div>

          <div className="award-grid">

           {loading ? (
  <p>Loading award notices...</p>
) : (
  awards.map((item) => (

             <div
  className="award-card"
  key={item.id}
>

  <h3>{item.project}</h3>

  <p>
    <FaBuilding />
    <strong> Contractor:</strong> {item.contractor}
  </p>

  <p>
    <FaCalendarAlt />
    <strong> Award Date:</strong> {item.awardDate}
  </p>

  <p>
    <FaMoneyBillWave />
    <strong> Contract Value:</strong> {item.value}
  </p>

  <span className="status">
    <FaCheckCircle />
    {item.status}
  </span>

</div>
            )))}

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
