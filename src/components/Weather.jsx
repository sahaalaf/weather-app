import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../Services/WeatherService';
import TemperatureToggle from './TemperatureToggle';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import haze from '../assets/haze.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const weatherImages = {
  clear: clear,
  drizzle: drizzle,
  clouds: clouds,
  haze: haze,
  rain: rain,
  snow: snow,
};

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeather(data);
        toast.success(`${city}: weather data is fetched.`);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        toast.error('Error while fetching weather data.');
      }
    };

    getWeatherData();
  }, [city]);

  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  if (!weather) return <div>Loading...</div>;

  const weatherCondition = weather.weather[0].main.toLowerCase();
  const weatherImage = weatherImages[weatherCondition] || clear;

  return (
    <div className='bg-[#0E1421] w-[615px] h-[220px] rounded-[30px] mt-4 ml-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className="bg-[#742BEC] text-sm text-white rounded-[30px] inline-flex items-center h-[27px] px-4 mt-4 ml-4 cursor-pointer">
          <FaMapMarkerAlt className="mr-1 text-white" />
          {weather.name}
        </div>
        <div className='mr-4 mt-2'>
          <TemperatureToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        </div>
      </div>

      <div className='flex flex-row items-center justify-between mt-2'>
        <div className='flex flex-col gap-2'>
          <div className='ml-4'>
            <p className='text-white text-[30px] font-medium'>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <span className='text-white text-[16px] font-light'>{new Date().toLocaleDateString()}</span>
          </div>
          <div className='ml-4'>
            <p className='text-white text-[30px] font-medium'>{Math.round(convertTemperature(weather.main.temp))}°{isCelsius ? 'C' : 'F'}</p>
            <span className='text-white text-[15px] font-light'>High: {Math.round(convertTemperature(weather.main.temp_max))}°{isCelsius ? 'C' : 'F'} Low: {Math.round(convertTemperature(weather.main.temp_min))}°{isCelsius ? 'C' : 'F'}</span>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mr-10'>
          <img src={weatherImage} className='w-[100px] h-[100px] mr-4' alt={weatherCondition} />
          <p className='text-[28px] text-white font-medium'>{weather.weather[0].description}</p>
          <span className='text-xs text-white'>Feels Like {Math.round(convertTemperature(weather.main.feels_like))}°{isCelsius ? 'C' : 'F'}</span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Weather;
