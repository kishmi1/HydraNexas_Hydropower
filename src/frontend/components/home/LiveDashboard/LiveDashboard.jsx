"use client";

import { useEffect, useState } from "react";
import { liveDashboardData } from "../../../data/homeData";
import {
  FaBolt,
  FaWater,
  FaHome,
  FaLeaf,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./LiveDashboard.css";

const icons = [
  FaBolt,
  FaWater,
  FaHome,
  FaLeaf,
];

export default function LiveDashboard() {

  const [time, setTime] = useState(null);

  const [generation, setGeneration] = useState(
    liveDashboardData[0].value
  );

  // Live Clock
  useEffect(() => {
    setTime(new Date());
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  // Fake Live Generation
  useEffect(() => {
    const timer = setInterval(() => {
      setGeneration((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Chart Data
  const chartData = [
    { time: "08:00", generation: 170 },
    { time: "09:00", generation: 174 },
    { time: "10:00", generation: 179 },
    { time: "11:00", generation: 183 },
    { time: "12:00", generation: generation },
    { time: "13:00", generation: generation + 2 },
    { time: "14:00", generation: generation + 3 },
  ];

  return (
    <section className="live-dashboard">

      <div className="container">

        {/* Header */}

        <div className="dashboard-header">

          <span>⚡ LIVE MONITORING</span>

          <h2>Real Time Generation Dashboard</h2>

          <p>
            Monitor HydraNexa hydropower generation,
            plant performance and energy statistics.
          </p>

        </div>

        {/* Top */}

        <div className="dashboard-top">

          <div className="live-status">
            🟢 LIVE
          </div>

          <div className="dashboard-time">
            🕒 Last Updated: {time ? time.toLocaleTimeString() : 'Loading...'}
          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-grid">

          {liveDashboardData.map((item, index) => {

            const Icon = icons[index];

            return (

              <div
                className="dashboard-card"
                key={item.id}
              >

                <div className="dashboard-icon">
                  <Icon />
                </div>

                <h3>
                  {index === 0 ? generation : item.value}
                  {item.suffix}
                </h3>

                <p>{item.title}</p>

                <span className="dashboard-status">
                  🟢 {item.status}
                </span>

                {index === 1 && (
                  <div className="dashboard-progress">

                    <div
                      className="dashboard-progress-fill"
                      style={{
                        width: `${item.value}%`
                      }}
                    ></div>

                  </div>
                )}

              </div>

            );

          })}

        </div>

        {/* Extra Information */}

        <div className="extra-dashboard">

          <div className="extra-card">
            <h4>⚙ Turbine Efficiency</h4>
            <span>96%</span>
          </div>

          <div className="extra-card">
            <h4>🌤 Weather</h4>
            <span>24°C | Cloudy</span>
          </div>

          <div className="extra-card">
            <h4>💧 Water Inflow</h4>
            <span>245 m³/s</span>
          </div>

          <div className="extra-card">
            <h4>⚡ Grid Status</h4>
            <span>Connected</span>
          </div>

        </div>

        {/* Line Chart */}

        <div className="chart-card">

          <h3>📈 Power Generation Trend</h3>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="generation"
                stroke="#0ea5e9"
                strokeWidth={4}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Alerts */}

        <div className="alerts">

          <h3>System Alerts</h3>

          <p>🟢 All Turbines Operational</p>

          <p>🟢 Reservoir Level Normal</p>

          <p>🟢 Grid Connected</p>

          <p>🟢 No Active Alarm</p>

        </div>

        {/* Footer */}

        <div className="system-status">

          <div>🟢 Plant Running Normally</div>

          <div>⚡ Grid Connected</div>

          <div>💧 Water Level Stable</div>

          <div>🌱 Eco Friendly Operation</div>

        </div>

      </div>

    </section>
  );
}
