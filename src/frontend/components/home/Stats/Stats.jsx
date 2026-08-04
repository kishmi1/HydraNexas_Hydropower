"use client";

import "./Stats.css";
import { useTranslation } from "react-i18next";
import { statsData } from "../../../data/homeData";

export default function Stats() {

  const { t } = useTranslation();

  return (

    <section className="stats">

      <div className="container">

        <div className="stats-grid">

          {statsData.map((item) => {

            const translatedLabel = t(`stats.${item.key}`, item.label);

            return (

            <div
              className="stat-card"
              key={item.id}
            >

              <h2>
                {item.value}
                {item.suffix}
              </h2>

              <p>
                {translatedLabel}
              </p>

            </div>

            );
          })}

        </div>

      </div>

    </section>

  );

}
