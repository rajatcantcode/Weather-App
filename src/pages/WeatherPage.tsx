import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface WeatherData {
  temperature: number;
  description: string;
}

const WeatherPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        console.log(cityId);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=c624a1b68c482efec200eda655c98cca`
        );
        const data = response.data;
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [cityId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Weather Information</h2>
      <div className="p-4 bg-gray-100 rounded-md">
        {weather ? (
          <>
            <p className="text-lg">Temperature: {weather.temperature} °C</p>
            <p className="text-lg">Description: {weather.description}</p>
          </>
        ) : (
          <p>No weather data available</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
