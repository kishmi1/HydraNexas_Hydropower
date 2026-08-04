"use client";

import "./FeaturedProjects.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredProjects } from "../../../data/homeData";

const project1 = "/assets/images/projects/project1.jpg";
const project2 = "/assets/images/projects/project2.jpg";
const project3 = "/assets/images/projects/project3.jpg";

const projectImages = {
  project1,
  project2,
  project3,
};

export default function FeaturedProjects() {
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

{featuredProjects.map((project, index) => (
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
                  src={projectImages[project.image]}
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
                  href="/projects"
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
