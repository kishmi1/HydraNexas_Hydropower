"use client";

import "./Stats.css";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Stats() {

  const { t } = useTranslation();
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/achievement-stats");
      const data = await res.json();
      if (data.success) {
        setStatsData(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback to default data
      setStatsData([
        { id: 1, value: "850", label: "Installed Capacity" },
        { id: 2, value: "12+", label: "Hydropower Projects" },
        { id: 3, value: "30+", label: "Years of Experience" },
        { id: 4, value: "1200000+", label: "Homes Powered" },
      ]);
    }
  };

  return (

    <section className="stats">

      <div className="container">

        <div className="stats-grid">

          {statsData.map((item) => {

            const translatedLabel = t(`stats.${item.key || item.id}`, item.label);

            return (

            <div
              className="stat-card"
              key={item.id}
            >

              <h2>
                {item.value}
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
