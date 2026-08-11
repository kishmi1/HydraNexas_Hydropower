"use client";

import "./CompletedProjects.css";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHero from "../../../components/common/PageHero/PageHero";


const heroImage = "/assets/images/hero/project-hero.jpg";



export default function CompletedProjects() {

  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {

fetch("/api/projects?status=Completed")      .then((res) => res.json())
      .then((result) => {

        const completed = (result.projects || []).filter(
          (project) => project.status === "Completed"
        );

        setCompletedProjects(completed);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);



  return (

    <>


      <PageHero

        subtitle="HydraNexa Projects"

        title="Completed Projects"

        description="Explore our successfully completed hydropower projects delivering clean energy across Nepal."

        backgroundImage={heroImage}

      />





      <section className="projects-section">


        <div className="container">

          {/* Section Header */}



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
              Completed Projects
            </span>



            <h2>
              Successfully Delivered Projects
            </h2>



            <p>
              These hydropower projects have been completed and are
              contributing renewable electricity to Nepal.
            </p>



          </motion.div>


          {/* Project Cards */}



        <div className="projects-grid">

  {
    completedProjects.length > 0 ? (

      completedProjects.map((project, index) => (

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

            <span className="status completed">
              Completed
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

      <p>No Completed Projects Available.</p>

    )
  }

</div>



        </div>


      </section>





    </>

  );

}
