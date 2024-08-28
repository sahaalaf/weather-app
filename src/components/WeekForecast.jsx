import React, { useEffect, useState } from 'react';
import { fetchForecastData } from '../Services/WeatherService';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import haze from '../assets/haze.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const WeekForecast = ({ lat, lon }) => {
  const [weekForecastData, setWeekForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to get the current time in hh:mm format
    const getCurrentTime = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    setCurrentTime(getCurrentTime());

    const getWeekForecastData = async () => {
      try {
        const data = await fetchForecastData(lat, lon);
        const filterData = [];
        const seenDays = new Set();

        // Filter data to show only unique days (up to 5 days)
        data.list.forEach((item) => {
          const date = new Date(item.dt_txt);
          const day = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

          if (!seenDays.has(day) && filterData.length < 5) {
            filterData.push({
              day: date.toLocaleDateString('en-US', { weekday: 'short' }),
              hour: currentTime,
              icon: getWeatherIcon(item.weather[0].main),
              temp: `${Math.round(item.main.temp)}°C`
            });
            seenDays.add(day);
          }
        });

        setWeekForecastData(filterData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    getWeekForecastData();
  }, [lat, lon]);

  // Function to map weather conditions to custom icons
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <img src={clear} alt="Clear" className="w-16 h-16" />;
      case 'Drizzle':
        return <img src={drizzle} alt="Drizzle" className="w-16 h-16" />;
      case 'Clouds':
        return <img src={clouds} alt="Clouds" className="w-16 h-16" />;
      case 'Haze':
        return <img src={haze} alt="Haze" className="w-16 h-16" />;
      case 'Rain':
        return <img src={rain} alt="Rain" className="w-16 h-16" />;
      case 'Snow':
        return <img src={snow} alt="Snow" className="w-16 h-16" />;
      default:
        return <img src={clear} alt="Clear" className="w-16 h-16" />;
    }
  };

  return (
    <div className="bg-[#0E1421] w-[558px] h-[685px] rounded-[30px] ml-4 p-6 mt-4 ">
      <p className="text-lg font-medium text-white mb-4">5 Day's Forecast</p>
      <div className="flex flex-col gap-5">
        {loading ? (
          <p className="text-white">Loading forecast data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : weekForecastData.length > 0 ? (
          weekForecastData.map((dayData, index) => (
            <div
              key={index}
              className="flex items-center justify-around bg-[#192131] w-full h-[105px] rounded-xl px-5 hover:scale-105 transition-all cursor-pointer"
            >
              <p className="text-white text-[25px]">{dayData.day}</p>
              <div className="text-center">
                {dayData.icon}
              </div>
              <p className="text-white text-2xl">{dayData.temp}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No forecast data available for today.</p>
        )}
      </div>
    </div>
  );
};

export default WeekForecast;
