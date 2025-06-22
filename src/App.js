import React, { useState } from 'react';
import './index.css';

const API_KEY = '51c5880f06f3689f1ccba6b8ab86ec6f'; // Your actual OpenWeather API key

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log('API Response:', data); // Debug output
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      console.error('Network error:', err); // Debug output
      setError('Failed to fetch weather data.');
    }
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Weather Dashboard
      </h1>
      <div className="weather-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
          <div className="weather-details">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p style={{ fontSize: '24px' }}>{weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
