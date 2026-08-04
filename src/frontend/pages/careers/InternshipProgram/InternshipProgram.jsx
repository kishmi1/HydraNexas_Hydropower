"use client";

import "./InternshipProgram.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import { useEffect, useState } from "react";
const heroImage = "/assets/images/careers/internship-hero.jpg";


import {
  FaClock,
  FaUserGraduate,
  FaArrowRight,
  FaLaptopCode,
} from "react-icons/fa";

import Link from "next/link";

export default function InternshipProgram() {

  const [internships, setInternships] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/internships")
    .then((res) => res.json())
    .then((data) => {
      setInternships(data.internships);
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
        subtitle="Careers"
        title="Internship Program"
        description="Kickstart your career with practical experience and professional mentorship at HydraNexa Energy."
        backgroundImage={heroImage}
      />

      <section className="internship-section">

        <div className="container">

          <div className="section-header">

            <span>Students & Graduates</span>

            <h2>Internship Opportunities</h2>

            <p>
              Gain hands-on experience by working with industry professionals
              and contributing to real-world hydropower and technology projects.
            </p>

          </div>

          <div className="internship-grid">

            {loading ? (
  <p>Loading internships...</p>
) : (
  internships.map((item) => (

             <div
  className="internship-card"
  key={item.id}
>

  <div className="internship-icon">
    <FaLaptopCode />
  </div>

  <h3>{item.title}</h3>

  <p>{item.description}</p>

  <div className="internship-duration">
    <FaClock />
    <span>{item.duration}</span>
  </div>

  <Link
    href={`/careers/apply-now?internship=${item.id}`}
    className="primary-btn"
  >
    Apply Internship
    <FaArrowRight />
  </Link>

</div>

            )))}

          </div>

        </div>

      </section>

      <section className="mentor-section">

        <div className="container mentor-wrapper">

          <div className="mentor-content">

            <span>Professional Mentorship</span>

            <h2>Learn From Industry Experts</h2>

            <p>

              Every intern at HydraNexa works alongside experienced
              engineers and professionals. Our internship program
              focuses on practical learning, innovation and
              career development.

            </p>

            <ul>

              <li>✔ Real Project Experience</li>

              <li>✔ Technical Mentorship</li>

              <li>✔ Team Collaboration</li>

              <li>✔ Certificate Upon Completion</li>

            </ul>

          </div>

          <div className="mentor-image">

            <img
              src={heroImage}
              alt="Internship"
            />

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );

}
