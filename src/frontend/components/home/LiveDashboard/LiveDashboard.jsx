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

  const [weather, setWeather] = useState({
    temperature: 24,
    condition: "Cloudy",
    humidity: 65,
    windSpeed: 12,
    description: "Loading weather data..."
  });

  const [waterInflow, setWaterInflow] = useState(245);
  const [turbineEfficiency, setTurbineEfficiency] = useState(96);
  const [reservoirLevel, setReservoirLevel] = useState(78);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  // Live Clock
  useEffect(() => {
    setTime(new Date());
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  // Real Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather?lat=27.7172&lon=85.3240"); // Kathmandu coordinates
        const data = await res.json();
        
        if (data.success) {
          setWeather({
            temperature: data.data.temperature,
            condition: data.data.condition,
            humidity: data.data.humidity,
            windSpeed: data.data.windSpeed,
            description: data.data.description
          });
          setIsWeatherLoading(false);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        setIsWeatherLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Improved Realistic Live Generation with day/night pattern
  useEffect(() => {
    const timer = setInterval(() => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour <= 18;
      
      setGeneration((prev) => {
        const baseChange = isDayTime ? 2 : -1;
        const randomChange = Math.floor(Math.random() * 3) - 1;
        const newGeneration = prev + baseChange + randomChange;
        
        // Keep generation within realistic bounds
        return Math.max(150, Math.min(220, newGeneration));
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Water inflow simulation with realistic patterns
  useEffect(() => {
    const inflowTimer = setInterval(() => {
      setWaterInflow((prev) => {
        const change = Math.floor(Math.random() * 10) - 4;
        return Math.max(200, Math.min(300, prev + change));
      });
    }, 5000);

    return () => clearInterval(inflowTimer);
  }, []);

  // Turbine efficiency simulation
  useEffect(() => {
    const efficiencyTimer = setInterval(() => {
      setTurbineEfficiency((prev) => {
        const change = (Math.random() - 0.5) * 1;
        const newEfficiency = Math.round((prev + change) * 10) / 10;
        return Math.max(92, Math.min(99, newEfficiency));
      });
    }, 8000);

    return () => clearInterval(efficiencyTimer);
  }, []);

  // Reservoir level simulation
  useEffect(() => {
    const reservoirTimer = setInterval(() => {
      setReservoirLevel((prev) => {
        const change = Math.random() > 0.5 ? 0.5 : -0.3;
        const newLevel = Math.round((prev + change) * 10) / 10;
        return Math.max(60, Math.min(95, newLevel));
      });
    }, 12000);

    return () => clearInterval(reservoirTimer);
  }, []);

  // Chart Data with realistic trend
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
                  {index === 0 ? Math.round(generation) : 
                   index === 1 ? Math.round(reservoirLevel) : 
                   item.value}
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
                        width: `${reservoirLevel}%`
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
            <span>{turbineEfficiency}%</span>
          </div>

          <div className="extra-card">
            <h4>🌤 Weather</h4>
            <span>{weather.temperature}°C | {weather.condition}</span>
            <small>{isWeatherLoading ? "Loading..." : weather.description}</small>
          </div>

          <div className="extra-card">
            <h4>💧 Water Inflow</h4>
            <span>{waterInflow} m³/s</span>
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

          <p className={turbineEfficiency >= 94 ? "alert-success" : "alert-warning"}>
            {turbineEfficiency >= 94 ? "🟢" : "🟡"} All Turbines Operational
          </p>

          <p className={reservoirLevel >= 65 && reservoirLevel <= 90 ? "alert-success" : "alert-warning"}>
            {reservoirLevel >= 65 && reservoirLevel <= 90 ? "🟢" : "🟡"} Reservoir Level {reservoirLevel >= 65 && reservoirLevel <= 90 ? "Normal" : reservoirLevel < 65 ? "Low" : "High"}
          </p>

          <p className="alert-success">
            🟢 Grid Connected
          </p>

          <p className={generation >= 160 ? "alert-success" : "alert-warning"}>
            {generation >= 160 ? "🟢" : "🟡"} Generation {generation >= 160 ? "Normal" : "Below Optimal"}
          </p>

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
