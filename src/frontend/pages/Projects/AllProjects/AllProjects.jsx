"use client";

import "./AllProjects.css";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";


const heroImage = "/assets/images/hero/project-hero.jpg";





export default function AllProjects() {
   const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch("/api/projects")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((result) => {

        console.log("API result:", result);

        setProjects(result.projects || []);

      })
      .catch((error) => {

        console.error("API error:", error);

      });

  }, []);


  return (

    <>

      <PageHero

        subtitle="HydraNexa Projects"

        title="Our Projects"

        description="Explore our hydropower projects that are powering Nepal with clean, reliable and sustainable energy."

        backgroundImage={heroImage}

      />




      <section className="projects-section">


        <div className="container">

          {/* Header */}



          <motion.div

            className="section-header"

            initial={{
              opacity:0,
              y:50
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true,
              amount:0.3
            }}

            transition={{
              duration:0.7
            }}

          >


            <span>
              Projects
            </span>



            <h2>
              Delivering Clean Energy
              <br />
              Across Nepal
            </h2>



            <p>
              HydraNexa develops innovative hydropower projects
              that contribute to Nepal's sustainable future.
            </p>



          </motion.div>

          {/* Projects */}



          <div className="projects-grid">

{projects.length > 0 ? (

  projects.map((project, index) => (

    <motion.div
      className="project-card"
      key={project.id}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >

      <div className="project-image">

        <img
          src={project.image}
          alt={project.name}
        />

        <span
          className={`status ${project.status.toLowerCase()}`}
        >
          {project.status}
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
          View Details
        </Link>

      </div>

    </motion.div>

  ))

) : (

  <p>No Projects Available.</p>

)}



          </div>



        </div>


      </section>





      <CTASection />



    </>

  );

}
