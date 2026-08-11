"use client";

import "./LatestNews.css";

import Link from "next/link";
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
        <div className="section-header fade-in-up">

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

        </div>

        {/* NEWS CARDS */}
        <div className="news-grid">

          {news.map((item, index) => (

            <article
              className="news-card fade-in-up"
              key={item.id}
              style={{ animationDelay: `${index * 0.15}s` }}
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

            </article>

          ))}

        </div>

      </div>

    </section>

  );

}
