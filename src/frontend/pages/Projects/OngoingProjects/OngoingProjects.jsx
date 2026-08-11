"use client";

import "./OngoingProjects.css";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHero from "../../../components/common/PageHero/PageHero";


const heroImage = "/assets/images/hero/project-hero.jpg";




export default function OngoingProjects() {

  const [ongoingProjects, setOngoingProjects] = useState([]);

  useEffect(() => {

    fetch("/api/projects")
      .then((res) => res.json())
      .then((result) => {

        const ongoing = (result.projects || []).filter(
          (project) => project.status === "Ongoing"
        );

        setOngoingProjects(ongoing);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);


  return (

    <>


      <PageHero

        subtitle="HydraNexa Projects"

        title="Ongoing Projects"

        description="Explore our ongoing hydropower projects currently under construction across Nepal."

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
              Ongoing Projects
            </span>



            <h2>
              Projects Under Construction
            </h2>



            <p>
              These projects are currently being developed to
              increase Nepal's clean energy production.
            </p>



          </motion.div>









          {/* Project Cards */}



         <div className="projects-grid">

  {
    ongoingProjects.length > 0 ? (

      ongoingProjects.map((project, index) => (

        <motion.div
          className="project-card"
          key={project.id}
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: index * 0.15,
          }}
        >

          <div className="project-image">

            <img
              src={project.image}
              alt={project.name}
            />

            <span className="status ongoing">
              Ongoing
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

      <p>No Ongoing Projects Available.</p>

    )
  }

</div>


        </div>


      </section>










    </>

  );

}
