"use client";

import "./TenderDocuments.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/ebidding/ebidding-hero.jpg";

import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaDownload,
  FaCalendarAlt,
} from "react-icons/fa";

export default function TenderDocuments() {

  const [documents, setDocuments] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/tender-documents")
    .then((res) => res.json())
    .then((data) => {
      setDocuments(data.documents);
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
        title="Tender Documents"
        description="Download official tender documents, specifications and procurement files."
        backgroundImage={heroImage}
      />

      <section className="documents-section">

        <div className="container">

          <div className="section-header">

            <span>Procurement Files</span>

            <h2>Tender Documents</h2>

            <p>

              Download official tender documents,
              technical specifications and bidding forms.

            </p>

          </div>

          <div className="documents-grid">

            {loading ? (
  <p>Loading documents...</p>
) : (
  documents.map((doc) => (

      <div
  className="document-card"
  key={doc.id}
>

  <div className="pdf-icon">
    <FaFilePdf />
  </div>

  <h3>{doc.title}</h3>

  <p>
    <strong>Type:</strong> {doc.type}
  </p>

  <p>
    <strong>Size:</strong> {doc.size}
  </p>

  <p className="upload-date">
    <FaCalendarAlt />
    {doc.uploadDate}
  </p>

  <a
    href={doc.file}
    target="_blank"
    rel="noopener noreferrer"
    download
    className="primary-btn"
  >
    <FaDownload />
    Download
  </a>

</div>

           ) ))}

          </div>

        </div>

      </section>

      <CTASection/>

    </>
  );
}
