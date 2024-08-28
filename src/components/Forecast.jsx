import React, { useState, useEffect } from 'react';
import { fetchForecastData } from '../Services/WeatherService';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import haze from '../assets/haze.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const Forecast = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const data = await fetchForecastData(lat, lon);
        const now = new Date();
        const today = now.toLocaleDateString('en-US');

        let filteredData = data.list
          .filter((item) => {
            const forecastDate = new Date(item.dt_txt);
            return forecastDate >= now;
          })
          .map((item) => ({
            hour: new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            icon: getWeatherIcon(item.weather[0].main),
            temp: `${Math.round(item.main.temp)}°C`,
          }));

        if (filteredData.length < 5) {
          const extraData = data.list
            .filter((item) => {
              const forecastDate = new Date(item.dt_txt);
              return forecastDate > new Date(today + ' 23:59:59');
            })
            .map((item) => ({
              hour: new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              icon: getWeatherIcon(item.weather[0].main),
              temp: `${Math.round(item.main.temp)}°C`,
            }));

          filteredData = [...filteredData, ...extraData].slice(0, 5);
        } else {
          filteredData = filteredData.slice(0, 5);
        }

        setForecastData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setLoading(false);
      }
    };

    getForecast();
  }, [lat, lon]);

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <img src={clear} alt="Clear" className="w-12 h-12" />;
      case 'Drizzle':
        return <img src={drizzle} alt="Drizzle" className="w-12 h-12" />;
      case 'Clouds':
        return <img src={clouds} alt="Clouds" className="w-12 h-12" />;
      case 'Haze':
        return <img src={haze} alt="Haze" className="w-12 h-12" />;
      case 'Rain':
        return <img src={rain} alt="Rain" className="w-12 h-12" />;
      case 'Snow':
        return <img src={snow} alt="Snow" className="w-12 h-12" />;
      default:
        return <img src={clear} alt="Clear" className="w-12 h-12" />;
    }
  };

  return (
    <div className="bg-[#0E1421] w-[615px] h-[220px] rounded-[30px] ml-4 p-4 ">
      <p className="text-md text-white mb-4">Today's Forecast</p>
      <div className="flex justify-between">
        {loading ? (
          <p className="text-white">Loading forecast data...</p>
        ) : (
          forecastData.length > 0 ? (
            forecastData.map((hourData, index) => (
              <div key={index} className="flex flex-col items-center justify-center bg-[#192131] w-[100px] h-[150px] rounded-xl p-3 hover:scale-105 transition-all cursor-pointer">
                <p className="text-white text-sm">{hourData.hour}</p>
                {hourData.icon}
                <p className="text-white text-[22px] mt-2">{hourData.temp}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No forecast data available for today.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Forecast;
