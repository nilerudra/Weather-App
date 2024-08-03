import NavigationBar from "./NavigationBar";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { indianCities } from "../utils/indianCities";
import axios from "axios";
import rain_icon from "../assets/rain.png";
import drizzle_icon from "../assets/drizzle.png";
import sun_icon from "../assets/sun.png";
import cloud_icon from "../assets/cloudy.png";
import snow_icon from "../assets/snow.png";
import night_icon from "../assets/night.png";

const api_key = "b51f3e4f54b8725b78c799e07330733f";

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

export default function Home() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chanceOfRain, setChanceOfRain] = useState(0);
  const [city, setCityName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherDataByCity(selectedCity);
    } else if (latitude && longitude) {
      fetchWeatherDataByLocation();
    }
  }, [selectedCity, latitude, longitude]);

  useEffect(() => {
    if (searchInput) {
      const filteredSuggestions = indianCities.filter((city) =>
        city.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSuggestionClick = (city) => {
    setSearchInput(""); // Clear the search input
    setSelectedCity(city);
    setSuggestions([]);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (searchInput) {
        // Check if the city is in suggestions
        const cityFound = suggestions.includes(searchInput);
        if (cityFound) {
          setSelectedCity(searchInput);
        } else {
          // If the city is not in suggestions, still fetch data for it
          setSelectedCity(searchInput);
          await fetchWeatherDataByCity(searchInput);
        }
        setSearchInput(""); // Clear the search input
      } else {
        getLocation();
      }
      setSuggestions([]); // Clear suggestions
    }
  };

  const fetchWeatherDataByCity = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`
      );
      setCityName(response.data.city.name);
      const forecasts = response.data.list;
      processWeatherData(forecasts);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataByLocation = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`
      );
      setCityName(response.data.city.name);
      const forecasts = response.data.list;
      processWeatherData(forecasts);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const processWeatherData = (forecasts) => {
    const now = new Date();
    const todayDate = now.toISOString().split("T")[0];
    const tomorrowDate = new Date(now.setDate(now.getDate() + 1))
      .toISOString()
      .split("T")[0];

    // Filter data for today and tomorrow
    const relevantForecasts = forecasts.filter((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      const forecastDateStr = forecastDate.toISOString().split("T")[0];
      return forecastDateStr === todayDate || forecastDateStr === tomorrowDate;
    });

    // Ensure we have exactly 6 forecasts
    const limitedForecasts = relevantForecasts.slice(0, 6);
    setForecast(limitedForecasts);

    // Set chance of rain for the first forecasted data point
    const chanceOfRain = limitedForecasts[0]?.pop || 0;
    setChanceOfRain(chanceOfRain);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!latitude && !longitude) return <p>Unable to get location.</p>;

  const textStyle = {
    color: "white",
    letterSpacing: "2px",
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "flex-start",
      overflowX: "auto",
      padding: "10px",
      gap: "25px",
      whiteSpace: "nowrap",
    },
    card: {
      textAlign: "center",
      margin: "0 10px",
      flex: "0 0 auto",
    },
    icon: {
      width: "60px",
      height: "60px",
      margin: "10px 0",
    },
    time: {
      margin: "5px 0",
      fontSize: "12px",
      color: "#dde0e4",
    },
    temp: {
      fontSize: "14px",
      fontWeight: "bold",
    },
    weatherStatus: {
      fontSize: "12px",
      color: "#dde0e4",
    },
    suggestionBox: {
      marginTop: "5%",
      position: "absolute",
      backgroundColor: "#202b3b",
      color: "#fff",
      width: "100%",
      maxWidth: "1200px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
      maxHeight: "200px",
      overflowY: "auto",
    },
    suggestionItem: {
      padding: "10px",
      cursor: "pointer",
    },
  };

  const handleLocationClick = () => {
    getLocation();
  };

  const currentWeatherIcon = chanceOfRain > 0 ? rain_icon : sun_icon;

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          padding: "20px",
          backgroundColor: "#0b131e",
          position: "relative",
        }}
      >
        <NavigationBar onLocationClick={handleLocationClick} />
        <div
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            margin: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                maxWidth: "1200px",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "#202b3b",
                color: "#fff",
                border: "none",
                outline: "none",
                fontSize: "16px",
              }}
            />
            {suggestions.length > 0 && (
              <div style={styles.suggestionBox}>
                {suggestions.map((city, index) => (
                  <div
                    key={index}
                    style={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              paddingLeft: "8%",
              paddingRight: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  ...textStyle,
                  fontSize: "50px",
                  marginBottom: "10px",
                  fontWeight: "500",
                  color: "#dde0e4",
                }}
              >
                {city}
              </p>
              <p
                style={{
                  ...textStyle,
                  fontSize: "12px",
                  color: "#ccc",
                }}
              >
                Chance of rain - {chanceOfRain}%
              </p>
              <p
                style={{
                  fontSize: "60px",
                  fontWeight: "400",
                  marginTop: "20px",
                  marginBottom: "0",
                  color: "#dde0e4",
                }}
              >
                {forecast[0].main.temp}°
              </p>
            </div>
            <img
              src={currentWeatherIcon}
              alt="Weather Icon"
              style={{
                width: "100px",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#202b3b",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            <h5 style={{ marginBottom: "10px" }}>TODAY'S FORECAST</h5>
            <div style={styles.container}>
              {forecast.map((data, index) => {
                const date = new Date(data.dt * 1000);
                const weatherIcon =
                  allIcons[data.weather[0].icon] || allIcons["01d"];
                const weatherStatus = data.weather[0].description;

                return (
                  <div key={index} style={styles.card}>
                    <p style={styles.time}>
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <img
                      src={weatherIcon}
                      alt={weatherStatus}
                      style={styles.icon}
                    />
                    <p style={styles.temp}>{data.main.temp}°</p>
                    <p style={styles.weatherStatus}>{weatherStatus}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#202b3b",
            borderRadius: "10px",
            padding: "20px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            fontSize: "12px",
          }}
        >
          <p style={{ fontSize: "15px" }}>7 - DAY FORECAST</p>
          <div>
            <p>Today</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Tuesday</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Wednesday</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Thursday</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Friday</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Saturday</p>
          </div>
          <Divider sx={{ borderColor: "#666" }} />
          <div>
            <p>Sunday</p>
          </div>
        </div>
      </div>
    </>
  );
}
