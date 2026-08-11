"use client";

import "./UpcomingProjects.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";
import ScrollAnimation from "../../../components/common/ScrollAnimation/ScrollAnimation";

const heroImage = "/assets/images/hero/project-hero.jpg";

export default function UpcomingProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch("/api/projects")
      .then((res) => res.json())
      .then((result) => {

        setProjects(result.projects || []);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const upcomingProjects = projects.filter(
    (project) => project.status === "Upcoming"
  );

  return (

    <>

      <PageHero
        subtitle="HydraNexa Projects"
        title="Upcoming Projects"
        description="Discover our upcoming hydropower projects planned to strengthen Nepal's renewable energy future."
        backgroundImage={heroImage}
      />

      <section className="projects-section">

        <div className="container">

          <ScrollAnimation>

            <div className="section-header">

              <span>Upcoming Projects</span>

              <h2>Future Hydropower Developments</h2>

              <p>
                These projects are currently under planning,
                feasibility study, or pre-construction and will
                contribute to Nepal's renewable energy future.
              </p>

            </div>

          </ScrollAnimation>

          <div className="projects-grid">

            {upcomingProjects.length > 0 ? (

              upcomingProjects.map((project, index) => (

                <ScrollAnimation
                  key={project.id}
                  delay={index * 0.15}
                >

                  <div className="project-card">

                    <div className="project-image">

                      <img
                        src={project.image}
                        alt={project.name}
                      />

                      <span className="status upcoming">
                        Upcoming
                      </span>

                    </div>

                    <div className="project-content">

                      <h3>{project.name}</h3>

                      <p>{project.description}</p>

                      <div className="project-info">

                        <span>📍 {project.location}</span>

                        <span>⚡ {project.capacity}</span>

                        <span>📅 {project.year}</span>

                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="primary-btn"
                      >
                        View Details →
                      </Link>

                    </div>

                  </div>

                </ScrollAnimation>

              ))

            ) : (

              <p>No upcoming projects available.</p>

            )}

          </div>

        </div>

      </section>

    </>

  );

}
