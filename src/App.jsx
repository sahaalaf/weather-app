import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { fetchWeatherData } from './Services/WeatherService';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import SideBar from './components/SideBar';
import TodayHighlights from './components/TodayHighlights';
import WeekForecast from './components/WeekForecast';
import Map from './components/Map';
import OtherCitiesWeather from './components/OtherCitiesWeather';

const AppContent = ({ city, setCity, weatherData, coordinates }) => {
  const location = useLocation();

  const handleSearch = (cityName) => {
    setCity(cityName);
  };

  if (!weatherData || !coordinates.lat || !coordinates.lon) return <div></div>;

  return (
    <div className="w-[78%] h-[95vh] bg-[#2a2929] rounded-[20px] shadow-custom-white flex">
      <SideBar />
      <div className="flex-grow p-4">
        {location.pathname !== '/map' && <SearchBar onSearch={handleSearch} />}
        <Routes>
          <Route path="/" element={
            <div className="flex flex-row">
              <div className="flex flex-col gap-4">
                <Weather city={city} weatherData={weatherData} />
                <Forecast lat={coordinates.lat} lon={coordinates.lon} />
                <TodayHighlights
                  pressure={weatherData.main.pressure}
                  windSpeed={weatherData.wind.speed}
                  humidity={weatherData.main.humidity}
                  cloudcoverage={weatherData.clouds.all}
                />
              </div>
              <div>
                <WeekForecast lat={coordinates.lat} lon={coordinates.lon} />
              </div>
            </div>
          } />
          <Route path="/cities" element={<OtherCitiesWeather />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [city, setCity] = useState('Kamra');
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setCoordinates({
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();
  }, [city]);

  if (!weatherData || !coordinates.lat || !coordinates.lon) return <div></div>;

  return (
    <Router>
      <div className="bg-[#242323] flex justify-center items-center min-h-screen overflow-hidden">
        <AppContent city={city} setCity={setCity} weatherData={weatherData} coordinates={coordinates} />
      </div>
    </Router>
  );
};

export default App;
