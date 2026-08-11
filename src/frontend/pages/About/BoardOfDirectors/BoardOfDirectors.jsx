"use client";

import "./BoardOfDirectors.css";

import PageHero from "../../../components/common/PageHero/PageHero";

import { useState, useEffect } from "react";
const heroImage = "/assets/images/hero/about-hero.jpg";

export default function BoardOfDirectors() {

const [boardMembers, setBoardMembers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

  fetch("/api/board-directors")
    .then(res => {
      console.log("Board directors response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Board directors data:", data);
      if(data.success){
        setBoardMembers(data.boardDirectors);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error("Board directors error:", error);
      setLoading(false);
    });

}, []);


if(loading){
  return <p>Loading...</p>;
}

if(boardMembers.length === 0){
  return <p>No board members available.</p>;
}


const chairperson = boardMembers[0];
const directors = boardMembers.slice(1);


  return (

    <>

      <PageHero
        subtitle="About HydraNexa"
        title="Board of Directors"
        description="Meet the experienced leaders guiding HydraNexa's strategic vision and sustainable growth."
        backgroundImage={heroImage}
      />

      <section className="board-section">

        <div className="container">

          {/* HEADER */}
          <div className="section-header fade-in-up">
            <span>
              Leadership
            </span>

            <h2>
              Meet Our
              <br />
              Board of Directors
            </h2>

            <p>
              Our Board provides strategic direction, governance and
              leadership to ensure long-term sustainable success.
            </p>
          </div>

          {/* CHAIRPERSON */}
          <div className="chairperson-card fade-in-up">

            <div className="chairperson-image">
              <img
                src={chairperson.image}
                alt={chairperson.name}
              />
            </div>

            <div className="chairperson-content">
              <span>
                {chairperson.position}
              </span>

              <h3>
                {chairperson.name}
              </h3>

              <p>
                {chairperson.description}
              </p>

            </div>

          </div>

          {/* DIRECTORS */}
          <div className="directors-grid">
            {directors.map((member, index) => (
              <div
                className="director-card fade-in-up"
                key={member.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                />

                <h3>
                  {member.name}
                </h3>

                <span>
                  {member.position}
                </span>

                <p>
                  {member.description}
                </p>

              </div>
            ))}
          </div>

        </div>

      </section>

    </>

  );

}
