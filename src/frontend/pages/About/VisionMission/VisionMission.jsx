"use client";

import "./VisionMission.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/hero/about-hero.jpg";
const visionImage = "/assets/images/about/vision.jpg";
const missionImage = "/assets/images/about/mission.jpg";

import { coreValues } from "../../../data/aboutData";

import { motion } from "framer-motion";


export default function VisionMission() {

  return (

    <>

      <PageHero

        subtitle="About HydraNexa"

        title="Vision & Mission"

        description="Guided by innovation, sustainability and excellence to power Nepal's future."

        backgroundImage={heroImage}

      />



      {/* ================= Vision ================= */}


      <section className="vision-section">


        <div className="container vision-grid">



          {/* Image */}


          <motion.div

            className="vision-image"

            initial={{
              opacity:0,
              x:-80
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true,
              amount:0.3
            }}

            transition={{
              duration:0.8
            }}

          >

            <img

              src={visionImage}

              alt="Vision"

            />

          </motion.div>


          {/* Content */}


          <motion.div

            className="vision-content"

            initial={{
              opacity:0,
              x:80
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true,
              amount:0.3
            }}

            transition={{
              duration:0.8,
              delay:0.3
            }}

          >


            <span>
              OUR VISION
            </span>


            <h2>
              Powering Nepal Through
              Sustainable Hydropower
            </h2>



            <p>
              Our vision is to become one of Nepal's leading
              renewable energy companies by delivering innovative
              hydropower solutions that create lasting
              environmental, economic and social value.
            </p>



            <ul>

              <li>
                Clean & Renewable Energy
              </li>

              <li>
                Innovation Driven Development
              </li>

              <li>
                Environmental Sustainability
              </li>

              <li>
                Long-term National Growth
              </li>

            </ul>


          </motion.div>



        </div>


      </section>

      {/* ================= Mission ================= */}


      <section className="mission-section">


        <div className="container mission-grid">



          {/* Content */}


          <motion.div

            className="mission-content"

            initial={{
              opacity:0,
              x:-80
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true,
              amount:0.3
            }}

            transition={{
              duration:0.8
            }}

          >


            <span>
              OUR MISSION
            </span>


            <h2>
              Delivering Reliable Energy
              For Every Generation
            </h2>



            <p>
              Our mission is to generate reliable electricity
              while protecting nature, empowering communities,
              and supporting Nepal's sustainable economic
              development through responsible hydropower projects.
            </p>



            <ul>

              <li>
                Reliable Power Generation
              </li>

              <li>
                Community Development
              </li>

              <li>
                Safety & Operational Excellence
              </li>

              <li>
                Responsible Resource Management
              </li>

            </ul>



          </motion.div>

          {/* Image */}


          <motion.div

            className="mission-image"

            initial={{
              opacity:0,
              x:80
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true,
              amount:0.3
            }}

            transition={{
              duration:0.8,
              delay:0.3
            }}

          >


            <img

              src={missionImage}

              alt="Mission"

            />


          </motion.div>



        </div>


      </section>
      {/* ================= Core Values ================= */}


      <section className="values-section">


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
              Core Values
            </span>



            <h2>
              Our Guiding Principles
            </h2>



            <p>
              These values define who we are and guide every
              decision we make.
            </p>



          </motion.div>

          <div className="values-grid">


            {coreValues.map((item,index)=>(


              <motion.div


                className="value-card"

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
                  delay:index * 0.2
                }}



              >


                <h3>
                  {item.title}
                </h3>


                <p>
                  {item.description}
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
