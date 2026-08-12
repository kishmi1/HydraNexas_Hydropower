"use client";

import { useEffect, useState } from "react";
import {
  FaBolt,
  FaWater,
  FaCogs,
  FaLeaf,
  FaChartLine,
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

const icons = [FaBolt, FaWater, FaCogs, FaLeaf];

export default function LiveDashboard() {
  const [time, setTime] = useState(null);
  const [generation, setGeneration] = useState(180);
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

  const dashboardData = [
    {
      id: 1,
      title: "Power Generation",
      value: generation,
      suffix: "MW",
      status: "Active",
      icon: FaBolt
    },
    {
      id: 2,
      title: "Reservoir Level",
      value: reservoirLevel,
      suffix: "%",
      status: "Normal",
      icon: FaWater
    },
    {
      id: 3,
      title: "Turbine Efficiency",
      value: turbineEfficiency,
      suffix: "%",
      status: "Optimal",
      icon: FaCogs
    },
    {
      id: 4,
      title: "Environmental Impact",
      value: "CO₂",
      suffix: "Reduced",
      status: "Compliant",
      icon: FaLeaf
    }
  ];

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
        const res = await fetch("/api/weather?lat=27.7172&lon=85.3240");
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
    
    const weatherInterval = setInterval(fetchWeather, 600000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Realistic Live Generation with day/night pattern
  useEffect(() => {
    const timer = setInterval(() => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour <= 18;
      
      setGeneration((prev) => {
        const baseChange = isDayTime ? 2 : -1;
        const randomChange = Math.floor(Math.random() * 3) - 1;
        const newGeneration = prev + baseChange + randomChange;
        
        return Math.max(150, Math.min(220, newGeneration));
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Water inflow simulation
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
    <div className="admin-live-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="live-status">
            <span className="live-dot"></span>
            LIVE MONITORING
          </div>
          <h2>Real-Time Generation Dashboard</h2>
          <p>Monitor HydraNexa hydropower generation and plant performance</p>
        </div>
        <div className="dashboard-time">
          🕒 Last Updated: {time ? time.toLocaleTimeString() : 'Loading...'}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        {dashboardData.map((item) => {
          const Icon = item.icon;
          return (
            <div className="dashboard-card" key={item.id}>
              <div className="card-icon">
                <Icon />
              </div>
              <div className="card-content">
                <h3>
                  {item.title === "Power Generation" ? Math.round(generation) : 
                   item.title === "Reservoir Level" ? Math.round(reservoirLevel) : 
                   item.title === "Turbine Efficiency" ? Math.round(turbineEfficiency) :
                   item.value}
                  {item.suffix}
                </h3>
                <p>{item.title}</p>
                <span className="status-badge">
                  {item.status}
                </span>
              </div>
              {item.title === "Reservoir Level" && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${reservoirLevel}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Extra Information */}
      <div className="extra-info">
        <div className="info-card">
          <h4>🌤 Weather</h4>
          <span>{weather.temperature}°C | {weather.condition}</span>
          <small>{isWeatherLoading ? "Loading..." : weather.description}</small>
        </div>

        <div className="info-card">
          <h4>💧 Water Inflow</h4>
          <span>{waterInflow} m³/s</span>
        </div>

        <div className="info-card">
          <h4>⚡ Grid Status</h4>
          <span>Connected</span>
        </div>

        <div className="info-card">
          <h4>🏭 Plant Status</h4>
          <span>Operational</span>
        </div>
      </div>

      {/* Power Generation Chart */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>📈 Power Generation Trend</h3>
          <FaChartLine />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="generation"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <h3>🔔 System Alerts</h3>
        <div className="alerts-list">
          <div className="alert-item info">
            <span>ℹ️</span>
            <p>Routine maintenance scheduled for next week</p>
          </div>
          <div className="alert-item success">
            <span>✅</span>
            <p>All systems operating within normal parameters</p>
          </div>
          <div className="alert-item warning">
            <span>⚠️</span>
            <p>Water level monitoring - attention required</p>
          </div>
        </div>
      </div>
    </div>
  );
}