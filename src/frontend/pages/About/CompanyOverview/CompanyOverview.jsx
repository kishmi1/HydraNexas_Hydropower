"use client";

import "./CompanyOverview.css";

import { purposeData } from "../../../data/aboutData";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/hero/about-hero.jpg";
const companyImage = "/assets/images/about/company-overview.jpg";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";


export default function CompanyOverview() {

  const [companyStats, setCompanyStats] = useState([
    {
      id: 1,
      value: "850 MW",
      title: "Installed Capacity",
    },
    {
      id: 2,
      value: "12+",
      title: "Hydropower Projects",
    },
    {
      id: 3,
      value: "30+",
      title: "Years of Experience",
    },
    {
      id: 4,
      value: "1.2M+",
      title: "Homes Powered",
    },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/achievement-stats");
      const data = await res.json();
      
      if (data.success) {
        // Map API response to match our component structure
        const mappedStats = data.stats.map((stat, index) => ({
          id: index + 1,
          value: stat.value,
          title: stat.label,
        }));
        
        setCompanyStats(mappedStats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (

    <>

      {/* Page Hero */}

      <PageHero

        subtitle="About HydraNexa"

        title="Company Overview"

        description="Delivering reliable renewable energy through innovation, sustainability, and responsible hydropower development."

        backgroundImage={heroImage}

      />




      {/* Company Introduction */}


      <section className="company-intro">


        <div className="container intro-grid">



          {/* Image */}


          <motion.div

            className="intro-image"

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

              src={companyImage}

              alt="HydraNexa Company Overview"

            />


          </motion.div>






          {/* Content */}


          <motion.div

            className="intro-content"


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
              WHO WE ARE
            </span>


            <h2>
              Building Nepal's Sustainable
              <br />
              Energy Future
            </h2>



            <p>
              HydraNexa Energy is a modern hydropower company
              committed to generating clean, reliable and
              sustainable electricity for Nepal through
              innovative engineering and responsible
              environmental practices.
            </p>



            <p>
              We believe renewable energy is the foundation of
              a sustainable future. Our projects are designed
              to create long-term value for communities,
              investors and the nation while protecting
              natural resources.
            </p>



            <ul>

              <li>
                Renewable Hydropower Solutions
              </li>

              <li>
                Environmental Responsibility
              </li>

              <li>
                Community Development
              </li>

              <li>
                Reliable Energy Infrastructure
              </li>


            </ul>




            <a

              href="/projects"

              className="primary-btn"

            >

              Explore Projects

            </a>



          </motion.div>



        </div>


      </section>








      {/* Our Purpose */}


      <section className="our-purpose">


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
              Our Purpose
            </span>


            <h2>
              Driven by Innovation,
              <br />
              Powered by Sustainability
            </h2>



            <p>
              Our purpose is to generate clean energy while
              creating long-term value for communities,
              the environment and future generations.
            </p>



          </motion.div>





          <div className="purpose-grid">


            {purposeData.map((item,index)=>{


              const Icon = item.icon;


              return (


                <motion.div


                  className="purpose-card"

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



                  <div className="purpose-icon">

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









      {/* Company Statistics */}



      <section className="company-stats">


        <div className="container">



          <motion.div


            className="section-header"


            initial={{
              opacity:0,
              y:40
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
              Company Statistics
            </span>



            <h2>
              Our Growth at a Glance
            </h2>



            <p>
              Numbers that reflect our commitment to delivering clean,
              reliable and sustainable energy.
            </p>



          </motion.div>






          <div className="stats-grid">


            {companyStats.map((item,index)=>(


              <motion.div


                className="stats-card"

                key={item.id}



                initial={{
                  opacity:0,
                  y:40,
                  scale:0.95
                }}



                whileInView={{
                  opacity:1,
                  y:0,
                  scale:1
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



                <h3>
                  {item.value}
                </h3>



                <p>
                  {item.title}
                </p>



              </motion.div>



            ))}


          </div>



        </div>


      </section>







      {/* CTA */}


      <CTASection />



    </>

  );

}
