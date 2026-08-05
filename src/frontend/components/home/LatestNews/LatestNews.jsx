"use client";

import "./LatestNews.css";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LatestNews() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        // Get first 3 latest news
        const latestNews = data.news
          .filter(n => n.status === "Published")
          .slice(0, 3);
        setNews(latestNews);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

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


          {news.map((item, index) => (


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

                  src={item.image}

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

                  href={`/news/${item.id}`}

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
