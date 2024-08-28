import React from 'react';
import { WiBarometer, WiStrongWind, WiHumidity, WiCloudy } from 'react-icons/wi';

const TodayHighlights = ({ pressure, windSpeed, humidity, cloudcoverage }) => {
  return (
    <div className="bg-[#0E1421] w-[615px] h-[215px] rounded-[30px] ml-4 p-4 ">
      <p className="text-md text-white mb-4">Today's Highlights</p>
      <div className="flex justify-between ">
        {/* Pressure */}
        <div className="flex flex-col items-center justify-center bg-[#192131] w-[140px] h-[144px] rounded-xl p-3 hover:scale-105 transition-all cursor-pointer">
          <WiBarometer className="text-white text-5xl" />
          <p className="text-sm text-white mt-2">Pressure</p>
          <p className="text-lg text-white">{`${pressure} hPa`}</p>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center justify-center bg-[#192131] w-[140px] h-[144px] rounded-xl p-3 hover:scale-105 transition-all cursor-pointer">
          <WiStrongWind className="text-white text-5xl" />
          <p className="text-sm text-white mt-2">Wind Speed</p>
          <p className="text-lg text-white">{`${windSpeed} km/h`}</p>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center justify-center bg-[#192131] w-[140px] h-[144px] rounded-xl p-3 hover:scale-105 transition-all cursor-pointer">
          <WiHumidity className="text-white text-5xl" />
          <p className="text-sm text-white mt-2">Humidity</p>
          <p className="text-lg text-white">{`${humidity} %`}</p>
        </div>

        {/* Cloud Coverage */}
        <div className="flex flex-col items-center justify-center bg-[#192131] w-[140px] h-[144px] rounded-xl p-3 hover:scale-105 transition-all cursor-pointer">
          <WiCloudy className="text-white text-5xl" />
          <p className="text-sm text-white mt-2">Cloud Coverage</p>
          <p className="text-lg text-white">{`${cloudcoverage} %`}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlights;
