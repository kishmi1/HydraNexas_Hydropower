"use client";

import "./CompanyHistory.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

import { companyHistory } from "../../../data/aboutData";

const heroImage = "/assets/images/hero/about-hero.jpg";

const history1 = "/assets/images/about/history/history1.jpg";
const history2 = "/assets/images/about/history/history2.jpg";
const history3 = "/assets/images/about/history/history3.jpg";
const history4 = "/assets/images/about/history/history4.jpg";
const history5 = "/assets/images/about/history/history5.jpg";

import { motion } from "framer-motion";


const images = {
  history1,
  history2,
  history3,
  history4,
  history5,
};



export default function CompanyHistory() {


  return (

    <>


      <PageHero

        subtitle="About HydraNexa"

        title="Company History"

        description="Discover the journey of HydraNexa and the milestones that shaped our commitment to Nepal's sustainable energy future."

        backgroundImage={heroImage}

      />






      <section className="history-section">


        <div className="container">





          {/* HEADER */}



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
              Our Journey
            </span>



            <h2>
              Building a Sustainable
              <br />
              Energy Future
            </h2>



            <p>
              From our foundation to becoming a trusted renewable
              energy company, every milestone reflects our
              dedication to innovation, sustainability and growth.
            </p>



          </motion.div>









          {/* TIMELINE */}



          <div className="timeline">


            {companyHistory.map((item,index)=>(



              <motion.div



                className={`timeline-item ${
                  index % 2 === 0 ? "left" : "right"
                }`}



                key={item.id}



                initial={{

                  opacity:0,

                  x:index % 2 === 0 ? -80 : 80

                }}



                whileInView={{


                  opacity:1,

                  x:0


                }}



                viewport={{


                  once:true,

                  amount:0.25


                }}



                transition={{


                  duration:0.8,

                  delay:index * 0.15


                }}



              >




                <div className="timeline-image">


                  <img

                    src={images[item.image]}

                    alt={item.title}

                  />


                </div>







                <div className="timeline-content">


                  <span>
                    {item.year}
                  </span>



                  <h3>
                    {item.title}
                  </h3>



                  <p>
                    {item.description}
                  </p>



                </div>





              </motion.div>



            ))}



          </div>



        </div>


      </section>





      <CTASection />



    </>

  );

}
