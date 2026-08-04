"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import "./ProjectDetails.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";
import ScrollAnimation from "../../../components/common/ScrollAnimation/ScrollAnimation";

const heroImage = "/assets/images/hero/project-hero.jpg";

export default function ProjectDetails({ params }) {

  const id = params.id;

  const [project, setProject] = useState(null);

  useEffect(() => {

    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProject(result.project);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  if (!project) {

    return (
      <h2
        style={{
          textAlign: "center",
          padding: "100px",
        }}
      >
        Loading...
      </h2>
    );

  }

  return (
    <>
      <PageHero
        subtitle="HydraNexa Projects"
        title={project.name}
        description="Detailed information about our hydropower project."
        backgroundImage={heroImage}
      />

      <section className="project-details">

        <div className="project-detail-container">

          <ScrollAnimation direction="left">

            <div className="project-detail-image-wrapper">

              <img
                src={project.image}
                alt={project.name}
                className="project-detail-image"
              />

              <span className={`status ${project.status.toLowerCase()}`}>
                {project.status}
              </span>

            </div>

          </ScrollAnimation>

          <ScrollAnimation direction="right">

            <div className="project-detail-content">

              <h1>{project.name}</h1>

              <div className="project-info">

                <div>
                  <span>📍 Location</span>
                  <strong>{project.location}</strong>
                </div>

                <div>
                  <span>⚡ Capacity</span>
                  <strong>{project.capacity}</strong>
                </div>

                <div>
                  <span>🚧 Status</span>
                  <strong>{project.status}</strong>
                </div>

                <div>
                  <span>📅 Year</span>
                  <strong>{project.year}</strong>
                </div>

              </div>

              <div className="project-description">

                <h3>Project Overview</h3>

                <p>{project.description}</p>

                <p>{project.details}</p>

              </div>

            </div>

          </ScrollAnimation>

        </div>

      </section>

      {/* Technical */}

      <section className="technical-section">

        <ScrollAnimation>

          <div className="container">

            <h2>Technical Specifications</h2>

            <div className="spec-table">

              <table>

                <tbody>

                  <tr>
                    <td>Developer</td>
                    <td>{project.specifications?.developer}</td>
                  </tr>

                  <tr>
                    <td>River</td>
                    <td>{project.specifications?.river}</td>
                  </tr>

                  <tr>
                    <td>Project Type</td>
                    <td>{project.specifications?.projectType}</td>
                  </tr>

                  <tr>
                    <td>Annual Energy</td>
                    <td>{project.specifications?.annualEnergy}</td>
                  </tr>

                  <tr>
                    <td>Investment</td>
                    <td>{project.specifications?.investment}</td>
                  </tr>

                  <tr>
                    <td>Construction Period</td>
                    <td>{project.specifications?.constructionPeriod}</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </ScrollAnimation>

      </section>

      {/* Progress */}

      <section className="progress-section">

        <ScrollAnimation>

          <div className="container">

            <h2>Project Progress</h2>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: project.progress,
                }}
              >
                {project.progress}
              </div>

            </div>

          </div>

        </ScrollAnimation>

      </section>

      {/* Timeline */}

      <section className="timeline-section">

        <div className="container">

          <ScrollAnimation>

            <h2>Project Timeline</h2>

          </ScrollAnimation>

          <div className="timeline">

            {project.timeline?.map((item, index) => (

              <ScrollAnimation
                key={index}
                delay={index * 0.15}
              >

                <div className="timeline-item">

                  <span>{item.year}</span>

                  <p>{item.title}</p>

                </div>

              </ScrollAnimation>

            ))}

          </div>

        </div>

      </section>

      <div className="back-project">

        <Link
          href="/projects"
          className="back-btn"
        >
          ← Back To All Projects
        </Link>

      </div>

      <CTASection />

    </>
  );

}
