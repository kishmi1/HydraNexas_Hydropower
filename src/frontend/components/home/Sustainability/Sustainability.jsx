"use client";

import "./Sustainability.css";
import { sustainabilityData } from "../../../data/homeData";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


export default function Sustainability() {

  const [sustainability, setSustainability] = useState({
    title: "Creating Lasting Value Through Clean Energy",
    description: "Sustainability is at the heart of HydraNexa. Every project is designed to generate renewable energy while protecting the environment and empowering local communities.",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/home-content");
      const data = await res.json();
      if (data.success && data.content.sustainability) {
        setSustainability(data.content.sustainability);
      }
    } catch (error) {
      console.error("Error fetching sustainability content:", error);
    }
  };

  return (

    <section className="sustainability">

      <div className="container">


        {/* SECTION HEADER */}

        <motion.div

          className="section-header light"

          initial={{
            opacity: 0,
            y: 50
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          viewport={{
            once: true,
            amount: 0.3
          }}

          transition={{
            duration: 0.8
          }}

        >

          <span>
            Sustainability
          </span>


          <h2>
            {sustainability.title}
          </h2>


          <p>
            {sustainability.description}
          </p>


        </motion.div>



        {/* CARDS */}

        <div className="sustainability-grid">


          {sustainabilityData.map((item, index) => {

            const Icon = item.icon;


            return (

              <motion.div

                className="sustainability-card"

                key={item.id}


                initial={{
                  opacity: 0,
                  y: 60
                }}


                whileInView={{
                  opacity: 1,
                  y: 0
                }}


                viewport={{
                  once: true,
                  amount: 0.2
                }}


                transition={{
                  duration: 0.6,
                  delay: index * 0.2
                }}


              >


                <div className="icon">

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

  );

}
