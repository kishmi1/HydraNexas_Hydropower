import "./ProjectMap.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/hero/project-hero.jpg";

import { projects } from "../../../data/projectData";

export default function ProjectMap() {

  const totalProjects = projects.length;

  const ongoing = projects.filter(
    (project) => project.status === "Ongoing"
  ).length;

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const upcoming = projects.filter(
    (project) => project.status === "Upcoming"
  ).length;

  return (
    <>
      <PageHero
        subtitle="HydraNexa Projects"
        title="Project Map"
        description="Explore HydraNexa's hydropower projects located across Nepal."
        backgroundImage={heroImage}
      />

      <section className="project-map-section">

        <div className="container">

          <div className="section-header">

            <span>Project Locations</span>

            <h2>
              Our Hydropower Projects
              <br />
              Across Nepal
            </h2>

            <p>
              HydraNexa is committed to delivering clean energy
              through strategically located hydropower projects.
            </p>

          </div>

          <div className="map-wrapper">

  <div className="map-image">

    <iframe
      title="Nepal Map"
      src="https://www.google.com/maps?q=Nepal&output=embed"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

  </div>

  <div className="project-list">

    <h3>Project Locations</h3>

    {projects.map((project) => (

      <div
        key={project.id}
        className="project-location"
      >

        <h4>{project.name}</h4>

        <p>📍 {project.location}</p>

      <span
  className={`status ${project.status.toLowerCase()}`}
>
  {project.status}
</span>

      </div>

    ))}

  </div>

</div>

          <div className="stats-grid">

            <div className="stat-card">

              <h3>{totalProjects}</h3>

              <p>Total Projects</p>

            </div>

            <div className="stat-card">

              <h3>{ongoing}</h3>

              <p>Ongoing</p>

            </div>

            <div className="stat-card">

              <h3>{completed}</h3>

              <p>Completed</p>

            </div>

            <div className="stat-card">

              <h3>{upcoming}</h3>

              <p>Upcoming</p>

            </div>

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
