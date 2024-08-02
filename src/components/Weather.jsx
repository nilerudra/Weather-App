import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "./Weather.css";
import search_icon from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import sunrise_icon from "../assets/sunrise.png";
import drizzle_icon from "../assets/drizzle.png";
import wind_icon from "../assets/wind.png";
import sun_icon from "../assets/sun.png";
import cloud_icon from "../assets/cloudy.png";
import snow_icon from "../assets/snow.png";
import night_icon from "../assets/night.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": sun_icon,
    "01n": night_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const convertUnixToTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  const searchByCoordinates = async (latitude, longitude) => {
    const api_key = "45feacf1deb072ce27105c2d9c87ac0c";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          sunrise: convertUnixToTime(data.sys.sunrise),
        });
      } else {
        showErrorAlert(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      showErrorAlert("An error occurred while fetching the data");
      setWeatherData(null);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          searchByCoordinates(latitude, longitude);
        },
        (error) => {
          showErrorAlert("Unable to retrieve your location", error);
          search("Pune");
        }
      );
    } else {
      showErrorAlert("Geolocation is not supported by this browser");
      search("Pune");
    }
  };

  const search = async (city, fallback = false) => {
    const api_key = "45feacf1deb072ce27105c2d9c87ac0c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          sunrise: convertUnixToTime(data.sys.sunrise),
        });
      } else {
        if (!fallback) {
          search("Pune", true);
          showErrorAlert(data.message);
        } else {
          setWeatherData(null);
        }
      }
    } catch (error) {
      if (!fallback) {
        search("Pune", true);
      } else {
        showErrorAlert("An error occurred while fetching the data");
        setWeatherData(null);
      }
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="weather">
      <div className="searchBar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => {
            const city = inputRef.current.value.trim();
            if (city === "") {
              search("Pune");
            } else {
              search(city);
            }
          }}
        />
      </div>

      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
            <div className="col">
              <img src={sunrise_icon} alt="Sunrise" />
              <div>
                <p>{weatherData.sunrise}</p>
                <span>Sunrise</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
