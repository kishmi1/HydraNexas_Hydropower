"use client";

import Link from "next/link";
import { activeTenders } from "../../../data/tenderData";

import "./TenderDetails.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

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

export default function TenderDetails({ params }) {

  const tender = activeTenders.find(
    item => item.id === Number(params.id)
  );

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
                <span>{tender.tenderNo}</span>
              </div>

              <div className="info-item">
                <FaCalendarAlt />
                <span>{tender.closingDate}</span>
              </div>

              <div className="info-item">
                <FaFileContract />
                <span>{tender.type}</span>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{tender.location}</span>
              </div>

              <div className="status open">
                {tender.status}
              </div>

              <button className="primary-btn">
                <FaDownload />
                Download Tender
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="tender-content">

            <h2>{tender.title}</h2>

            <p>
              {tender.content}
            </p>

            {/* Scope */}

            <div className="content-card">

              <h3>Scope of Work</h3>

              <ul>

                {tender.scope.map((item, index) => (

                  <li key={index}>
                    <FaCheckCircle />
                    {item}
                  </li>

                ))}

              </ul>

            </div>

            {/* Eligibility */}

            <div className="content-card">

              <h3>Eligibility Criteria</h3>

              <ul>

                {tender.eligibility.map((item, index) => (

                  <li key={index}>
                    <FaCheckCircle />
                    {item}
                  </li>

                ))}

              </ul>

            </div>

            {/* Contact */}

            <div className="content-card">

              <h3>Procurement Contact</h3>

              <div className="contact-item">

                <FaUserTie />

                <span>
                  {tender.contact.officer}
                </span>

              </div>

              <div className="contact-item">

                <FaEnvelope />

                <span>
                  {tender.contact.email}
                </span>

              </div>

              <div className="contact-item">

                <FaPhone />

                <span>
                  {tender.contact.phone}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );

}
