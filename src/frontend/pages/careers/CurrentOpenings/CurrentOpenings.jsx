"use client";

import "./CurrentOpenings.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import { useState, useEffect } from "react";const heroImage = "/assets/images/careers/current-openings-hero.jpg";

import Link from "next/link";

import {
  FaMapMarkerAlt,
  FaBuilding,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";


export default function CurrentOpenings(){
 const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/job-openings")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero
        subtitle="Careers"
        title="Current Openings"
        description="Explore exciting career opportunities and become part of HydraNexa Energy's growing team."
        backgroundImage={heroImage}
      />

      <section className="jobs-section">

        <div className="container">

          <div className="section-header">

            <span>We're Hiring</span>

            <h2>Current Job Openings</h2>

            <p>
              Join our talented team and contribute to Nepal's clean energy
              future through innovation and excellence.
            </p>

          </div>

          <div className="jobs-grid">

           {loading ? (
  <p>Loading current openings...</p>
) : (
  jobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >
<span className="job-status">
  Open
</span>

<h3>{job.position}</h3>

<div className="job-info">

  <p>
    <FaBuilding />
    {job.department}
  </p>

  <p>
    <FaMapMarkerAlt />
    {job.location}
  </p>

  <p>
    <FaClock />
    {job.type}
  </p>

  <p>
    <FaCalendarAlt />
    Apply Before: {job.deadline}
  </p>

</div>

<Link
  href={`/careers/apply-now?id=${job.id}`}
  className="primary-btn"
>
  Apply Now
  <FaArrowRight />
</Link>

              </div>

            )))}

          </div>

        </div>

      </section>

      {/* Hiring Process */}

      <section className="hiring-section">

        <div className="container">

          <div className="section-header">

            <span>Hiring Process</span>

            <h2>Our Recruitment Journey</h2>

          </div>

          <div className="hiring-grid">

            <div className="step">

              <span>01</span>

              <h3>Apply</h3>

              <p>Submit your application online.</p>

            </div>

            <div className="step">

              <span>02</span>

              <h3>Shortlisting</h3>

              <p>Applications are reviewed by our HR team.</p>

            </div>

            <div className="step">

              <span>03</span>

              <h3>Interview</h3>

              <p>Qualified candidates attend interviews.</p>

            </div>

            <div className="step">

              <span>04</span>

              <h3>Offer</h3>

              <p>Successful candidates receive an offer.</p>

            </div>

            <div className="step">

              <span>05</span>

              <h3>Join HydraNexa</h3>

              <p>Start your journey with our team.</p>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
