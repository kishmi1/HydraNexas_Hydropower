"use client";

import "./FeaturedProjects.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        // Get first 3 featured projects
        const featured = data.projects
          .filter(p => p.featured)
          .slice(0, 3);
        setProjects(featured);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <section className="featured-projects">

      <div className="container">

        <div className="section-header">

          <span>Featured Projects</span>

          <h2>
            Powering Nepal Through
            <br />
            Innovative Hydropower Projects
          </h2>

          <p>
            Discover our flagship hydropower developments driving clean,
            reliable and sustainable energy across Nepal.
          </p>

        </div>

        <div className="projects-grid">

{projects.map((project, index) => (
            <motion.article

  className="project-card"

  key={project.id}

  initial={{
    opacity: 0,
    y: 80
  }}

  whileInView={{
    opacity: 1,
    y: 0
  }}

  viewport={{
    once: true,
    amount: 0.3
  }}

  transition={{
    duration: 0.8,
    delay: index * 0.25
  }}

>

              <div className="project-image">

                <img
                  src={project.image}
                  alt={project.name}
                />

                <div className="capacity-badge">
                  {project.capacity}
                </div>

              </div>

              <div className="project-content">

                <h3>{project.name}</h3>

                <p className="location">
                  📍 {project.location}
                </p>

                <p className="description">
                  {project.description}
                </p>

                <Link
                  href={`/projects/${project.id}`}
                  className="project-btn"
                >
                  View Project →
                </Link>

              </div>

            </motion.article>

          ))}

        </div>

      </div>

    </section>
  );
}
