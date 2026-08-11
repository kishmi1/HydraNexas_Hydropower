"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./TenderDetails.css";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileContract,
  FaHashtag,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaDownload,
  FaArrowLeft,
} from "react-icons/fa";

export default function TenderDetails({ id }) {

  const [tender, setTender] = useState(null);

  useEffect(() => {
    fetch(`/api/active-tenders/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTender(result.tender);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!tender) {
    return (
      <h2
        style={{
          textAlign: "center",
          padding: "120px 0",
        }}
      >
        Tender Not Found
      </h2>
    );
  }

  return (
    <>
      <PageHero
        subtitle="E-Bidding"
        title={tender.title}
        description={tender.description}
        backgroundImage={heroImage}
      />
    <div className="container">

<Link
  href="/ebidding/active-tenders"
  className="back-btn"
>
  <FaArrowLeft />
  Back to Active Tenders
</Link>

</div>
      <section className="tender-details">

        <div className="container">

          {/* LEFT */}

          <div className="tender-sidebar">

            <div className="tender-card">

              <h3>Tender Information</h3>

              <div className="info-item">
                <FaHashtag />
                <span>{tender.tenderNo || "N/A"}</span>
              </div>

              <div className="info-item">
                <FaCalendarAlt />
                <span>{tender.closingDate || "TBD"}</span>
              </div>

              <div className="info-item">
                <FaFileContract />
                <span>{tender.type || "General"}</span>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{tender.location || "Various"}</span>
              </div>

              <div className="status open">
                {tender.status || "Open"}
              </div>

              <button className="primary-btn">
                <FaDownload />
                Download Tender
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="tender-content">

            <h2>{tender.title || "Tender Details"}</h2>

            <p>
              {tender.content || "No detailed content available for this tender."}
            </p>

            {/* Scope */}

            <div className="content-card">

              <h3>Scope of Work</h3>

              <ul>

                {tender.scope?.map((item, index) => (

                  <li key={index}>
                    <FaCheckCircle />
                    {item}
                  </li>

                )) || <li>No scope information available</li>}

              </ul>

            </div>

            {/* Eligibility */}

            <div className="content-card">

              <h3>Eligibility Criteria</h3>

              <ul>

                {tender.eligibility?.map((item, index) => (

                  <li key={index}>
                    <FaCheckCircle />
                    {item}
                  </li>

                )) || <li>No eligibility criteria available</li>}

              </ul>

            </div>

            {/* Contact */}

            <div className="content-card">

              <h3>Procurement Contact</h3>

              <div className="contact-item">

                <FaUserTie />

                <span>
                  {tender.contact?.officer || "Contact Officer"}
                </span>

              </div>

              <div className="contact-item">

                <FaEnvelope />

                <span>
                  {tender.contact?.email || "contact@hydranexa.com"}
                </span>

              </div>

              <div className="contact-item">

                <FaPhone />

                <span>
                  {tender.contact?.phone || "+977-1-1234567"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );

}
