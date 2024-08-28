import React, { useEffect, useState } from 'react';
import { fetchWeatherData, fetchForecastData } from '../Services/WeatherService';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import haze from '../assets/haze.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const cities = [
  { name: 'Attock', timezone: 'Asia/Karachi' },
  { name: 'Lahore', timezone: 'Asia/Karachi' },
  { name: 'Peshawar', timezone: 'Asia/Karachi' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Berlin', timezone: 'Europe/Berlin' },
];

const OtherCitiesWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        const data = await Promise.all(cities.map(city => fetchWeatherData(city.name)));
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchAllWeatherData();
  }, []);

  useEffect(() => {
    if (selectedCity !== null) {
      const fetchCityForecast = async () => {
        const { lat, lon } = weatherData[selectedCity].coord;
        try {
          const data = await fetchForecastData(lat, lon);
          setForecastData(data.list);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      };

      fetchCityForecast();
    }
  }, [selectedCity, weatherData]);

  const getWeatherIcon = (weather) => {
    const condition = weather.toLowerCase(); 

    if (condition.includes('clear')) {
      return clear;
    } else if (condition.includes('drizzle')) {
      return drizzle;
    } else if (condition.includes('clouds')) {
      return clouds;
    } else if (condition.includes('haze')) {
      return haze;
    } else if (condition.includes('rain')) {
      return rain;
    } else if (condition.includes('snow')) {
      return snow;
    } else {
      return clear; 
    }
  };


  const getLocalTime = (timezone) => {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: timezone };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  };

  const handleCardClick = (index) => {
    setSelectedCity(index);
  };

  const getTodayForecast = () => {
    if (!forecastData.length) return [];
    const today = new Date().toISOString().slice(0, 10);
    return forecastData
      .filter(entry => entry.dt_txt.startsWith(today))
      .slice(0, 4);
  };

  const get3DayForecast = () => {
    if (!forecastData.length) return [];
    const groupedByDay = forecastData.reduce((acc, entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!acc[date]) acc[date] = entry;
      return acc;
    }, {});

    const days = Object.keys(groupedByDay).slice(0, 3);
    return days.map(day => groupedByDay[day]);
  };

  return (
    <div className='flex'>
      {/* Weather Cards */}
      <div className='w-[75%] h-[290px] mr-[20px] mt-7'>
        <div className='flex flex-col gap-4'>
          {weatherData.map((weather, index) => {
            const city = cities[index];
            const localTime = getLocalTime(city.timezone);
            const cardClasses = selectedCity === index
              ? 'w-full h-[122px] bg-[#0E1421] rounded-[25px] flex items-center cursor-pointer shadow-custom-blue'
              : 'w-full h-[122px] bg-[#0E1421] rounded-[25px] flex items-center cursor-pointer';

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={cardClasses}
              >
                <div className='flex flex-row items-center w-full'>
                  <img
                    className='w-[60px] h-[60px] ml-8'
                    src={getWeatherIcon(weather.weather[0].main)}
                    alt={weather.weather[0].main}
                  />
                  <div className='flex flex-col gap-1 ml-5'>
                    <p className='text-white text-lg font-semibold'>{city.name}</p>
                    <span className='text-sm text-gray-400'>{localTime}</span>
                  </div>
                  <div className='ml-auto text-white text-[25px] font-medium mr-8'>
                    {Math.round(weather.main.temp)}°
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Weather Info */}
      <div className='w-[50%] h-[83vh] mt-4'>
        {selectedCity !== null && (
          <div className='w-full h-full bg-[#0E1421] rounded-[25px] p-4'>
            <div className='flex items-center'>
              <div>
                <h2 className='text-white text-3xl font-bold mt-8 ml-8'>{cities[selectedCity].name}</h2>
                <p className='text-gray-300 font-light text-sm mt-1 ml-8'>{getLocalTime(cities[selectedCity].timezone)}</p>
                <p className='text-white text-[45px] font-medium ml-8 mt-4'>{Math.round(weatherData[selectedCity].main.temp)}°</p>
              </div>
              <div className='ml-auto flex items-center'>
                <img
                  className='w-[100px] h-[100px] mr-28'
                  src={getWeatherIcon(weatherData[selectedCity].weather[0].main)}
                  alt={weatherData[selectedCity].weather[0].main}
                />
              </div>
            </div>

            <hr className='w-[80%] ml-12 mt-4 border-gray-600 mb-8' />

            <h3 className='text-gray-400 text-xs font-semibold mt-4'>TODAY'S FORECAST</h3>
            <div className='flex flex-row items-center justify-evenly mt-4'>
              {getTodayForecast().map((entry, index) => (
                <div key={index} className='flex flex-col mb-2'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='text-sm text-gray-300 mr-2 mb-2'>
                      {new Date(entry.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <img
                      className='w-[50px] h-[50px] mb-2'
                      src={getWeatherIcon(entry.weather[0].main)}
                      alt={entry.weather[0].main}
                    />
                    <p className='text-xl text-white ml-2 mb-2'>
                      {Math.round(entry.main.temp)}°
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className='w-[80%] ml-12 mt-4 border-gray-600 mb-8' />
            <h3 className='text-gray-400 text-xs font-semibold mt-4'>3-DAY FORECAST</h3>
            <div className='flex flex-col'>
              {get3DayForecast().map((entry, index) => (
                <div key={index} className='flex flex-row justify-around items-center mb-2'>
                  <p className='text-gray-400 font-medium'>{new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <img
                    className='w-[50px] h-[50px] ml-2'
                    src={getWeatherIcon(entry.weather[0].main)}
                    alt={entry.weather[0].main}
                  />
                  <div className='ml-2 text-white'>
                    <p className='text-lg'>{Math.round(entry.main.temp)}°</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherCitiesWeather;
