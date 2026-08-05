"use client";

import "./AwardsRecognition.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

import {
  certificationsData,
} from "../../../data/aboutData";

const heroImage = "/assets/images/hero/about-hero.jpg";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTrophy, FaAward, FaCertificate, FaMedal, FaStar, FaLeaf } from "react-icons/fa";

const iconMap = {
  FaTrophy,
  FaAward,
  FaCertificate,
  FaMedal,
  FaStar,
  FaLeaf,
};

export default function AwardsRecognition() {
  const [awards, setAwards] = useState([]);
  const [achievementStats, setAchievementStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards();
    fetchAchievementStats();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await fetch("/api/awards");
      const data = await res.json();
      if (data.success) {
        setAwards(data.awards);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching awards:", error);
      setLoading(false);
    }
  };

  const fetchAchievementStats = async () => {
    try {
      const res = await fetch("/api/achievement-stats");
      const data = await res.json();
      if (data.success) {
        setAchievementStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching achievement stats:", error);
    }
  };

  return (

    <>


      <PageHero

        subtitle="About HydraNexa"

        title="Awards & Recognition"

        description="Celebrating our achievements, certifications and commitment to excellence in renewable energy."

        backgroundImage={heroImage}

      />






      {/* Awards */}



      <section className="awards-section">


        <div className="container">





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
              Achievements
            </span>



            <h2>
              Awards &
              <br />
              Recognition
            </h2>



            <p>
              Our achievements reflect our commitment to innovation,
              sustainability and excellence in hydropower development.
            </p>



          </motion.div>







          <div className="awards-grid">


            {loading ? (
              <div className="text-center py-12">Loading awards...</div>
            ) : awards.length === 0 ? (
              <div className="text-center py-12">No awards found</div>
            ) : (
              awards.map((award,index)=>{


                const Icon = iconMap[award.icon] || FaTrophy;


                return (



                  <motion.div


                    className="award-card"


                    key={award.id}


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
                      amount:0.2
                    }}



                    transition={{
                      duration:0.6,
                      delay:index * 0.15
                    }}



                  >


                    <div className="award-icon">
                      <Icon />
                    </div>


                    <span>
                      {award.year}
                    </span>


                    <h3>
                      {award.title}
                    </h3>


                    <p>
                      {award.description}
                    </p>


                  </motion.div>


                );
              })
            )}


          </div>


        </div>


      </section>









      {/* Certifications */}



      <section className="certifications-section">


        <div className="container">





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
              Certifications
            </span>



            <h2>
              International Standards
            </h2>



          </motion.div>









          <div className="certifications-grid">


            {certificationsData.map((item,index)=>{


              const Icon = item.icon;



              return (



                <motion.div


                  className="certificate-card"


                  key={item.id}



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
                    amount:0.2
                  }}



                  transition={{
                    duration:0.6,
                    delay:index * 0.15
                  }}



                >


                  <div className="certificate-icon">
                    <Icon />
                  </div>



                  <h3>
                    {item.title}
                  </h3>



                  <p>
                    {item.description}
                  </p>



                </motion.div>



              );


            })}



          </div>



        </div>


      </section>









      {/* Statistics */}



      <section className="achievement-section">


        <div className="container">


          <div className="achievement-grid">


            {achievementStats.length === 0 ? (
              <div className="text-center py-12">Loading stats...</div>
            ) : (
              achievementStats.map((item,index)=>(



                <motion.div


                  className="achievement-card"


                  key={item.id}



                  initial={{
                    opacity:0,
                    scale:0.8
                  }}



                  whileInView={{
                    opacity:1,
                    scale:1
                  }}



                  viewport={{
                    once:true,
                    amount:0.3
                  }}



                  transition={{
                    duration:0.6,
                    delay:index * 0.15
                  }}



                >


                  <h2>
                    {item.value}
                  </h2>



                  <p>
                    {item.label}
                  </p>



                </motion.div>



              ))
            )}



          </div>


        </div>


      </section>






      <CTASection />


    </>

  );

}
