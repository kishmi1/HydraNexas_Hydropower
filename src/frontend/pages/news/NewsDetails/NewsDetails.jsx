"use client";

import Link from "next/link";
import { useEffect, useState } from "react";import "./NewsDetails.css";

import PageHero from "../../../components/common/PageHero/PageHero";
import CTASection from "../../../components/home/CTASection/CTASection";

const heroImage = "/assets/images/news/news-hero.jpg";

import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function NewsDetails({ id }) {

 console.log("NewsDetails id:", id);
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

 useEffect(() => {
      console.log("Fetching:", `/api/news/${id}`);
    fetch(`/api/news/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Single News:", result);
        setNews(result.news);
      });

    fetch("/api/news")
      .then((res) => res.json())
      .then((result) => {
        setRelatedNews(result.news || []);
      })
 .catch((err) => console.log(err));
  }, [id]);

  if (!news) {
    return (
      <h2
        style={{
          textAlign: "center",
          padding: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <PageHero
        subtitle="News & Events"
        title={news.title}
        description={news.description}
        backgroundImage={heroImage}
      />

      <section className="news-details">

        <div className="container">

          <div className="news-layout">

            <div className="news-left">

              <div className="news-details-image">

                <img
                  src={news.image}
                  alt={news.title}
                />

              </div>

            </div>

            <div className="news-right">

              <div className="news-meta">

                <span className="news-category">
                  {news.category}
                </span>

                <span>
                  <FaCalendarAlt />
                  {news.date}
                </span>

                <span>
                  <FaUser />
                  {news.author}
                </span>

                {news.readingTime && (
                  <span>
                    <FaClock />
                    {news.readingTime}
                  </span>
                )}

              </div>

              <h2 className="news-title">
                {news.title}
              </h2>

              <div className="news-content">

                {news.content && (
                  <div dangerouslySetInnerHTML={{ __html: news.content }} />
                )}

                {news.highlights?.length > 0 && (
                  <>
                    <h3 className="highlight-title">
                      Key Highlights
                    </h3>

                    <ul className="highlight-list">

                      {news.highlights.map((item, index) => (

                        <li key={index}>
                          {item}
                        </li>

                      ))}

                    </ul>
                  </>
                )}

              </div>

              <div className="news-info-box">

                <h3>Article Information</h3>

                <div className="info-grid">

                  <div>

                    <strong>Category</strong>

                    <p>{news.category}</p>

                  </div>

                  <div>

                    <strong>Author</strong>

                    <p>{news.author}</p>

                  </div>

                  <div>

                    <strong>Published Date</strong>

                    <p>{news.date}</p>

                  </div>

                  <div>

                    <strong>Status</strong>

                    <p>{news.status}</p>

                  </div>

                </div>

              </div>

              <div className="news-bottom">

                <div className="news-share">

                  <span>Share:</span>

                  <a href="#">
                    <FaFacebookF />
                  </a>

                  <a href="#">
                    <FaLinkedinIn />
                  </a>

                  <a href="#">
                    <FaTwitter />
                  </a>

                </div>

                <Link
                  href="/news/latest-news"
                  className="back-news-btn"
                >
                  ← Back to News
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="related-news">

        <div className="container">

          <h3>Related News</h3>

          <div className="related-grid">

            {relatedNews
              .filter((item) => item.id !== news.id)
              .slice(0, 3)
              .map((item) => (

                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="related-card"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div>

                    <span>{item.date}</span>

                    <h4>{item.title}</h4>

                  </div>

                </Link>

              ))}

          </div>

        </div>

      </section>

      <CTASection />

    </>
  );
}
