# Live Monitoring Setup Instructions

## Overview
The Live Dashboard now uses a hybrid approach:
- **Real Weather Data**: From OpenWeatherMap API (Option B)
- **Improved Simulated Data**: For generation, reservoir level, turbine efficiency, etc. (Option C)

## Setup OpenWeatherMap API

### 1. Get API Key
1. Go to [OpenWeatherMap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key

### 2. Add API Key to Environment Variables

Create or update your `.env` file in the project root:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
After adding the API key, restart your development server:
```bash
npm run dev
```

## Features Implemented

### Real Weather Data
- Live temperature updates
- Weather conditions (Sunny, Cloudy, Rainy, etc.)
- Humidity levels
- Wind speed
- Automatic refresh every 10 minutes
- Fallback to simulated data if API fails

### Improved Simulated Data
- **Power Generation**: Day/night pattern with realistic fluctuations
- **Reservoir Level**: Gradual changes with bounds checking
- **Turbine Efficiency**: Small realistic variations
- **Water Inflow**: Natural flow patterns
- **Dynamic Alerts**: System status based on actual values

### Dynamic Alerts System
- **Green Alerts**: Normal operation
- **Yellow Alerts**: Warning states (low generation, abnormal reservoir levels)
- Automatic status updates based on real-time values

## API Endpoint

The weather API is available at: `/api/weather`

### Parameters:
- `lat`: Latitude (default: 27.7172 for Kathmandu)
- `lon`: Longitude (default: 85.3240 for Kathmandu)

### Example:
```
GET /api/weather?lat=27.7172&lon=85.3240
```

## Troubleshooting

### Weather data not updating:
1. Check if API key is correctly set in `.env`
2. Verify the API key is valid at OpenWeatherMap
3. Check browser console for API errors
4. The system will fallback to simulated data if API fails

### All data shows fallback values:
- API key might be missing or invalid
- OpenWeatherMap service might be down
- Network connectivity issues

## Customization

### Change Location:
Edit the coordinates in `LiveDashboard.jsx`:
```javascript
const res = await fetch("/api/weather?lat=YOUR_LAT&lon=YOUR_LON");
```

### Adjust Update Intervals:
In `LiveDashboard.jsx`, modify the setInterval values:
- Weather: `600000` (10 minutes)
- Generation: `3000` (3 seconds)
- Water Inflow: `5000` (5 seconds)
- Turbine Efficiency: `8000` (8 seconds)
- Reservoir Level: `12000` (12 seconds)

### Modify Data Ranges:
Adjust the min/max values in the useEffect hooks to match your requirements.
