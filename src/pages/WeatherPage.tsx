import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { LiaWindSolid } from "react-icons/lia";
import { WiRaindrops } from "react-icons/wi";
import { motion } from "framer-motion";

interface WeatherData {
  name: string;
  temperature: number;
  description: string;
  type: string;
  wind: number;
  humidity: number;
  country: string;
}

const WeatherPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(false);

  const nav = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=c624a1b68c482efec200eda655c98cca`
        );
        const data = response.data;
        console.log(data);
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          type: data.weather[0].main,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          name: data.name,
          country: data.sys.country,
        });
        console.log(weather);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
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
    <div className="container px-4 py-8 mx-auto sm:px-10 sm:w-1/2">
      {error ? (
        <div className="text-center">
          <img
            className="w-full h-full "
            src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
            alt=""
          />
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              nav("/");
            }}
            className="px-3 py-2 text-white bg-green-500 rounded-lg animate-bounce "
          >
            Go Back
          </motion.button>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-md">
          {weather ? (
            <div className="flex flex-col gap-6">
              <div className="text-center ">
                <h1 className="text-2xl font-extrabold ">{weather.name}</h1>
                <h2 className="mt-2 font-bold ">{weather.country}</h2>

                <div className="flex flex-col items-center justify-center text-[20vh] sm:my-12 my-5">
                  {weather.type === "Clear" && (
                    <BsFillSunFill className="text-yellow-500" />
                  )}
                  {weather.type === "Clouds" && (
                    <BsCloudyFill className="text-gray-300" />
                  )}
                  {weather.type === "Rain" && (
                    <BsFillCloudRainFill className="text-blue-300" />
                  )}
                  {weather.type === "Drizzle" && (
                    <BsFillCloudRainFill className="text-blue-300" />
                  )}
                  {weather.type === "Thunderstorm" && (
                    <BsCloudFog2Fill className="text-blue-300" />
                  )}
                  {weather.type === "Mist" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Fog" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Haze" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Smoke" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Dust" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Sand" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Ash" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Squall" && (
                    <BsCloudFog2Fill className="text-blue-800" />
                  )}
                  {weather.type === "Tornado" && (
                    <BsCloudFog2Fill className="text-zinc-600" />
                  )}
                  {weather.type === "Snow" && (
                    <TiWeatherPartlySunny className="text-zinc-200" />
                  )}
                </div>
                <p
                  onClick={() => {
                    setIsCelsius(!isCelsius);
                  }}
                  className="text-lg font-semibold cursor-pointer"
                >
                  {!isCelsius && (
                    <div className="">{weather.temperature} °F</div>
                  )}
                  {isCelsius && (
                    <div className="">
                      {((weather.temperature - 32) / 1.8).toFixed(1)} °C{" "}
                    </div>
                  )}
                </p>
                <p className="text-lg"> {weather.description}</p>
              </div>

              <div className="flex justify-between px-5 bg-zinc-300 sm:gap-20 sm:px-1 sm:justify-around rounded-2xl">
                <p className="flex items-center text-lg">
                  <WiRaindrops className="text-[20vw]  sm:text-[8vw] " />
                  {weather.humidity}%
                </p>
                <p className="flex items-center gap-5 text-lg">
                  <LiaWindSolid className="text-[10vw] sm:text-[5vw] " />{" "}
                  {weather.wind} m/s
                </p>
              </div>
            </div>
          ) : (
            <p>No weather data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
