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
  AreaChart,
  Area,
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
  const [dailyGeneration, setDailyGeneration] = useState(4320);
  const [co2Saved, setCo2Saved] = useState(2840);
  const [homesPowered, setHomesPowered] = useState(28500);

  const dashboardData = [
    {
      id: 1,
      title: "Current Generation",
      value: generation,
      suffix: "MW",
      status: "Active",
      icon: FaBolt,
      trend: "+2.4%"
    },
    {
      id: 2,
      title: "Reservoir Level",
      value: reservoirLevel,
      suffix: "%",
      status: "Normal",
      icon: FaWater,
      trend: "+0.8%"
    },
    {
      id: 3,
      title: "Turbine Efficiency",
      value: turbineEfficiency,
      suffix: "%",
      status: "Optimal",
      icon: FaCogs,
      showGauge: true,
      trend: "+0.3%"
    },
    {
      id: 4,
      title: "Daily Generation",
      value: dailyGeneration,
      suffix: "MWh",
      status: "On Track",
      icon: FaChartLine,
      trend: "+5.2%"
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

  // Daily generation simulation
  useEffect(() => {
    const dailyTimer = setInterval(() => {
      setDailyGeneration((prev) => {
        const change = Math.floor(Math.random() * 20) - 8;
        return Math.max(4000, Math.min(4800, prev + change));
      });
    }, 15000);

    return () => clearInterval(dailyTimer);
  }, []);

  // CO2 saved simulation
  useEffect(() => {
    const co2Timer = setInterval(() => {
      setCo2Saved((prev) => {
        const change = Math.floor(Math.random() * 15) - 5;
        return Math.max(2500, Math.min(3200, prev + change));
      });
    }, 20000);

    return () => clearInterval(co2Timer);
  }, []);

  // Homes powered simulation
  useEffect(() => {
    const homesTimer = setInterval(() => {
      setHomesPowered((prev) => {
        const change = Math.floor(Math.random() * 200) - 80;
        return Math.max(25000, Math.min(32000, prev + change));
      });
    }, 25000);

    return () => clearInterval(homesTimer);
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
          const displayValue = item.title === "Current Generation" ? Math.round(generation) : 
                              item.title === "Reservoir Level" ? Math.round(reservoirLevel) : 
                              item.title === "Turbine Efficiency" ? Math.round(turbineEfficiency) :
                              item.title === "Daily Generation" ? Math.round(dailyGeneration) :
                              item.value;
          
          return (
            <div className="dashboard-card" key={item.id}>
              <div className="card-icon">
                <Icon />
              </div>
              <div className="card-content">
                <h3>
                  {displayValue}
                  {item.suffix}
                </h3>
                <p>{item.title}</p>
                {item.trend && (
                  <span className="trend-badge">
                    {item.trend}
                  </span>
                )}
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
              {item.showGauge && (
                <div className="gauge-container">
                  <svg className="gauge" viewBox="0 0 100 100">
                    <circle
                      className="gauge-bg"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="8"
                    />
                    <circle
                      className="gauge-fill"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="8"
                      strokeDasharray={`${(displayValue / 100) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
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
          <div className="mini-indicator">
            <div className="indicator-fill" style={{ width: `${weather.humidity}%` }}></div>
          </div>
          <small>Humidity: {weather.humidity}%</small>
        </div>

        <div className="info-card">
          <h4>💧 Water Inflow</h4>
          <span>{waterInflow} m³/s</span>
          <div className="mini-indicator">
            <div className="indicator-fill" style={{ width: `${((waterInflow - 200) / 100) * 100}%` }}></div>
          </div>
          <small>Flow Rate</small>
        </div>

        <div className="info-card">
          <h4>🌱 CO₂ Saved</h4>
          <span>{co2Saved.toLocaleString()} tons</span>
          <div className="mini-indicator">
            <div className="indicator-fill green" style={{ width: `${((co2Saved - 2500) / 700) * 100}%` }}></div>
          </div>
          <small>Environmental Impact</small>
        </div>

        <div className="info-card">
          <h4>� Homes Powered</h4>
          <span>{homesPowered.toLocaleString()}</span>
          <div className="mini-indicator">
            <div className="indicator-fill blue" style={{ width: `${((homesPowered - 25000) / 7000) * 100}%` }}></div>
          </div>
          <small>Community Impact</small>
        </div>
      </div>

      {/* Power Generation Chart */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>📈 Power Generation Trend</h3>
          <FaChartLine />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'MW', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              itemStyle={{ color: 'white' }}
              labelStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="generation"
              stroke="#1e3a8a"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGeneration)"
              dot={{ r: 4, fill: '#1e3a8a', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#1e3a8a', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <h3>🔔 System Alerts</h3>
        <div className="alerts-list">
          <div className="alert-item info">
            <span>ℹ️</span>
            <div className="alert-content">
              <p>Routine maintenance scheduled for next week</p>
              <small>Information</small>
            </div>
          </div>
          <div className="alert-item success">
            <span>✅</span>
            <div className="alert-content">
              <p>All systems operating within normal parameters</p>
              <small>System Normal</small>
            </div>
          </div>
          <div className="alert-item warning">
            <span>⚠️</span>
            <div className="alert-content">
              <p>Water level monitoring - attention required</p>
              <small>Attention Required</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}