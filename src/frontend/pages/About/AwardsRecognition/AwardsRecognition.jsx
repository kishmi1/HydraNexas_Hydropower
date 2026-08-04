"use client";

import "./AwardsRecognition.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

import {
  awardsData,
  certificationsData,
  achievementStats,
} from "../../../data/aboutData";

const heroImage = "/assets/images/hero/about-hero.jpg";

import { motion } from "framer-motion";


export default function AwardsRecognition() {


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


            {awardsData.map((award,index)=>{


              const Icon = award.icon;


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


            })}



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


            {achievementStats.map((item,index)=>(



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



            ))}



          </div>


        </div>


      </section>






      <CTASection />


    </>

  );

}
