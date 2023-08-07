/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import weatherDescKo from "../utils/weatherDescKo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface WeatherModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const { REACT_APP_WEATHER_KEY } = process.env;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function WeatherModal({ setIsModal }: WeatherModalProps) {
  const [weather, setWeather] = useState({
    description: "",
    cityName: "",
    temp: 0,
    icon: "",
  });

  const handleCloseWeatherModal = () => {
    setIsModal(false);
  };

  // 모달 바깥 영역 클릭했을 때 모달 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    const modalElement = document.getElementById("weather-modal");

    // 모달 바깥 영역을 클릭하면 모달을 닫음
    if (modalElement && !modalElement.contains(event.target as Node)) {
      setIsModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    // 위도, 경도 가져오기
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // console.log(`현재 위도 및 경도 : $${lat}, ${lon} `);
      try {
        const weatherData = await getWeatherData(lat, lon);
        // console.log("Weather data", weatherData);
        const weatherId: keyof typeof weatherDescKo = weatherData.weather[0].id;
        const weatherKo = weatherDescKo[weatherId];
        const weatherIcon = weatherData.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const temp = Math.round(weatherData.main.temp);

        setWeather({
          description: weatherKo,
          cityName: weatherData.name,
          temp: temp,
          icon: weatherIconAdrs,
        });
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  async function getWeatherData(lat: number, lon: number) {
    const lang = "kr";
    const units = "metric"; // 섭씨
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${REACT_APP_WEATHER_KEY}`;
    // console.log(url);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      id="weather-modal"
      className="w-98 h-98 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black z-50 opacity-80 rounded-lg"
    >
      <button
        className="absolute top-3 right-3 text-white text-3xl"
        onClick={handleCloseWeatherModal}
      >
        X
      </button>
      <div className="text-white flex flex-col justify-center items-center mt-12">
        <div className="">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ color: "#ffffff" }}
            size="2xl"
            className="mr-3"
          />
          <span className="text-4xl font-bold align-middle ">
            {weather.cityName}
          </span>
        </div>
        <img
          src={weather.icon}
          alt={weather.description}
          className="text-4xl font-bold w-40 h-40"
        />
        <span className="mt-3 text-2xl font-bold">{weather.temp}º</span>
        <span className="mt-3 text-2xl font-bold">{weather.description}</span>
      </div>
    </div>
  );
}

export default WeatherModal;
