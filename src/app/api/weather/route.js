import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || "27.7172"; // Default: Kathmandu
    const lon = searchParams.get("lon") || "85.3240";
    
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      // Return fallback data if no API key is configured
      return NextResponse.json({
        success: true,
        data: {
          temperature: 24,
          condition: "Cloudy",
          humidity: 65,
          windSpeed: 12,
          description: "No API key configured - using fallback data"
        },
        fallback: true
      });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const weatherData = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        temperature: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        description: weatherData.weather[0].description
      },
      fallback: false
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: {
        temperature: 24,
        condition: "Cloudy",
        humidity: 65,
        windSpeed: 12,
        description: "Error fetching weather - using fallback data"
      },
      fallback: true
    }, { status: 500 });
  }
}
