"use client";

import "./LatestNews.css";
import Link from "next/link";
import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/news/news-hero.jpg";

export default function LatestNews() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((result) => {
        console.log("FULL RESPONSE:", result);
        console.log("NEWS DATA:", result.news);
        setNews(result.news || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(news);

  return (
    <>

      <PageHero
        subtitle="News & Events"
        title="Latest News"
        description="Stay updated with the latest announcements, project updates, community initiatives, and company achievements."
        backgroundImage={heroImage}
      />

      <section className="news-section">

        <div className="container">

          <div className="section-header fade-in-up">
            <span>
              Latest Updates
            </span>

            <h2>
              Company News
            </h2>

            <p>
              Explore the latest developments, project milestones,
              sustainability initiatives and company announcements.
            </p>
          </div>

          <div className="news-grid">
            {
              news.length > 0 ? (
                news.map((item, index) => (
                  <div
                    className="news-card fade-in-up"
                    key={item.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="news-image">
                      <img
                        src={item.image}
                        alt={item.title}
                      />

                      <div className="news-date">
                        {item.date}
                      </div>
                    </div>

                    <div className="news-content">
                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                      <Link
                        href={`/news/${item.id}`}
                        className="primary-btn"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  No news available.
                </p>
              )
            }
          </div>

        </div>

      </section>

    </>
  );
}
