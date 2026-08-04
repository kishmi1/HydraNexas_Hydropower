"use client";

import "./LatestNews.css";

import Link from "next/link";
import { motion } from "framer-motion";

import { latestNews } from "../../../data/homeData";

const news1 = "/assets/images/news/news1.jpg";
const news2 = "/assets/images/news/news2.jpg";
const news3 = "/assets/images/news/news3.jpg";


const newsImages = {
  news1,
  news2,
  news3,
};


export default function LatestNews() {

  return (

    <section className="latest-news">


      <div className="container">


        {/* SECTION HEADER */}

        <motion.div

          className="section-header"

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
            News & Events
          </span>


          <h2>
            Latest News &
            <br />
            Company Updates
          </h2>


          <p>
            Stay informed with the latest developments, sustainability
            initiatives and corporate announcements from HydraNexa.
          </p>


        </motion.div>



        {/* NEWS CARDS */}

        <div className="news-grid">


          {latestNews.map((item, index) => (


            <motion.article

              className="news-card"

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


              <div className="news-image">


                <img

                  src={newsImages[item.image]}

                  alt={item.title}

                />


                <span className="news-category">

                  {item.category}

                </span>


              </div>



              <div className="news-content">


                <small>
                  {item.date}
                </small>



                <h3>
                  {item.title}
                </h3>



                <p>
                  {item.description}
                </p>



                <Link

                  href="/news/latest-news"

                  className="news-btn"

                >

                  Read More →

                </Link>


              </div>



            </motion.article>


          ))}


        </div>


      </div>


    </section>

  );

}
