import React from 'react';

const TemperatureToggle = ({ isCelsius, setIsCelsius }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white rounded-full p-1 inline-flex w-[88px] h-[32px]">
        <button
          onClick={() => setIsCelsius(true)}
          className={`${
            isCelsius ? 'bg-black text-white' : 'bg-white text-black'
          } flex-1 rounded-full focus:outline-none`}
        >
          °C
        </button>
        <button
          onClick={() => setIsCelsius(false)}
          className={`${
            !isCelsius ? 'bg-black text-white' : 'bg-white text-black'
          } flex-1 rounded-full focus:outline-none`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default TemperatureToggle;
