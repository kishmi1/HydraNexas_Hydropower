"use client";

import "./ShareInformation.css";

import { useEffect, useState } from "react";

import PageHero from "../../../components/common/PageHero/PageHero";

const heroImage = "/assets/images/investor/share-information-hero.jpg";

export default function ShareInformation() {

  const [shareInformation, setShareInformation] = useState([]);
  const [dividendHistory, setDividendHistory] = useState([]);

  useEffect(() => {

    fetch("/api/share-information")
      .then((res) => res.json())
      .then((result) => {

        console.log(result);

        setShareInformation(result.shares|| []);

      });

    fetch("/api/dividend-history")
      .then((res) => res.json())
      .then((result) => {

        console.log(result);

        setDividendHistory(result.dividends || []);

      });

  }, []);

  return (
    <>
      <PageHero
        subtitle="Investor Relations"
        title="Share Information"
        description="Explore HydraNexa's share structure, ownership details, and dividend history."
        backgroundImage={heroImage}
      />

      <section className="share-section">

        <div className="container">

          <div className="section-header">

            <span>Share Details</span>

            <h2>Share Information</h2>

            <p>
              HydraNexa maintains transparency by providing updated
              information regarding shareholding, ownership structure,
              and dividend history.
            </p>

          </div>

          <div className="share-grid">

            {
              shareInformation.length > 0 ? (

                shareInformation.map((item) => (

                  <div
                    className="share-card"
                    key={item.id}
                  >

                    <h3>{item.value}</h3>

                    <span>{item.title}</span>

                  </div>

                ))

              ) : (

                <p>No Share Information Available.</p>

              )
            }

          </div>

          <div className="dividend-section">

            <h2>Dividend History</h2>

            <table className="dividend-table">

              <thead>

                <tr>
                  <th>Year</th>
                  <th>Cash Dividend</th>
                  <th>Bonus Shares</th>
                </tr>

              </thead>

              <tbody>

                {
                  dividendHistory.length > 0 ? (

                    dividendHistory.map((item) => (

                      <tr key={item.id}>

                        <td>{item.year}</td>

                        <td>{item.dividend}</td>

                        <td>{item.bonus}</td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="3">
                        No Dividend History Available.
                      </td>
                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </>
  );
}
