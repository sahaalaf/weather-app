import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchWeatherData } from '../Services/WeatherService';
import SearchBar from './SearchBar';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import clouds from '../assets/clouds.png';
import haze from '../assets/haze.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const Map = () => {
    const [cities, setCities] = useState([]);

    const handleSearch = async (cityName) => {
        try {
            const weatherData = await fetchWeatherData(cityName);
            setCities([...cities, {
                name: cityName,
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
                temp: weatherData.main.temp,
                description: weatherData.weather[0].description,
                date: new Date() // Add current date
            }]);
        } catch (error) {
            console.error('Error fetching weather data for city:', error);
        }
    };

    const getWeatherIcon = (description) => {
        const lowerDesc = description.toLowerCase();

        if (lowerDesc.includes('clear')) {
            return clear;
        } else if (lowerDesc.includes('drizzle')) {
            return drizzle;
        } else if (lowerDesc.includes('cloud')) {
            return clouds;
        } else if (lowerDesc.includes('haze')) {
            return haze;
        } else if (lowerDesc.includes('rain')) {
            return rain;
        } else if (lowerDesc.includes('snow')) {
            return snow;
        } else {
            return clear;
        }
    };


    return (
        <div className='flex'>
            <div className='flex-1'>
                <SearchBar onSearch={handleSearch} placeholder='Search for a city...' />
                <div className='mt-4'>
                    <MapContainer center={[0, 0]} zoom={2} className='h-[80vh] w-[100%] rounded-[30px]'>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© OpenStreetMap contributors'
                        />
                        {cities.map((city, index) => (
                            <Marker key={index} position={[city.lat, city.lon]}>
                                <Popup>
                                    <div>
                                        <h3 className='text-black text-sm font-semibold'>{city.name}</h3>
                                        <p>Temperature: {city.temp} °C</p>
                                        <p>Description: {city.description}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
            <div className='w-[30%] ml-4 mt-16 text-white'>
                <ul>
                    {cities.map((city, index) => (
                        <li key={index} className='bg-[#0E1421] p-4 mb-4 rounded-[20px] shadow-md'>
                            <div className='flex flex-row justify-between items-center gap-2'>

                                <div className='flex flex-row items-center gap-4'>
                                    <div>
                                        <img src={getWeatherIcon(city.description)} alt='Weather Icon' className='w-16 h-16' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className='text-lg font-semibold'>{city.name}</h3>
                                        <p className='text-sm'>
                                            {city.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center mt-2'>
                                    <p className='text-[28px]'>{Math.floor(city.temp)} °</p>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Map;
