import React, { useState, useEffect } from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import axios from 'axios';

const Header = () => {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentApparentTemperature, setCurrentApparentTemperature] = useState(null);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=-25.4278&longitude=-49.2731&timezone=America%2FSao_Paulo&hourly=temperature_2m,apparent_temperature&start_date=${formattedDate}&end_date=${formattedDate}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const currentHourlyData = data.hourly;
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentHourIndex = currentHour;
        const currentTemp = currentHourlyData.temperature_2m[currentHourIndex];
        const currentAppTemp = currentHourlyData.apparent_temperature[currentHourIndex];
        setCurrentTemperature(currentTemp);
        setCurrentApparentTemperature(currentAppTemp);
      } catch (error) {
        console.error('Erro ao buscar dados de temperatura e sensação térmica:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="bg-slate-800 p-4 text-white">
      <div className="container mx-auto flex items-end text-justify justify-between">
        <div>
        <span className="text-2xl font-semibold mx-full mx-6">Previsão do Tempo em Curitiba</span>
        </div>
        {currentTemperature !== null && currentApparentTemperature !== null && (
          <div className="text-right mr-10">
            <span className="text-lg font-extralight">
              Temp. atual: {currentTemperature}°C | Sens. térmica: {currentApparentTemperature}°C
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
