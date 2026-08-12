"use client";

import "./Events.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";
import ScrollAnimation from "../../../components/common/ScrollAnimation/ScrollAnimation";

const heroImage = "/assets/images/news/events-hero.jpg";

export default function Events() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    fetch("/api/events")
      .then((res) => res.json())
      .then((result) => {

        console.log("EVENTS:", result);

        setEvents(result.events || []);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  return (

    <>

      <PageHero
        subtitle="News & Events"
        title="Events"
        description="Explore our upcoming events, corporate meetings, community programs, and renewable energy initiatives."
        backgroundImage={heroImage}
      />

      <section className="events-section">

        <div className="container">

          <div className="section-header">

            <span>Upcoming Events</span>

            <h2>Our Events</h2>

            <p>
              Join HydraNexa's important corporate events,
              sustainability initiatives and community engagement
              programs.
            </p>

          </div>

          <ScrollAnimation direction="left">

            <div className="events-grid">

              {

                events.length > 0 ? (

                  events.map((item) => (

                    <div
                      className="event-card"
                      key={item.id}
                    >

                      <div className="event-image">

                        <img
                          src={item.image}
                          alt={item.title}
                        />

                      </div>

                      <div className="event-content">

                        <span className="event-date">
                          📅 {item.date}
                        </span>

                        <span className="event-location">
                          📍 {item.location}
                        </span>

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.description}
                        </p>

                        <Link
                          href={`/news/events/${item.id}`}
                          className="primary-btn"
                        >
                          View Details
                        </Link>

                      </div>

                    </div>

                  ))

                ) : (

                  <p>No events available.</p>

                )

              }

            </div>

          </ScrollAnimation>

        </div>

      </section>

    </>

  );

}
