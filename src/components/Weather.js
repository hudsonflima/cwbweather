import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCards from './WeatherCards'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fazer a solicitação à API
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=-25.5026&longitude=-49.2908&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=America%2FSao_Paulo&forecast_days=16'
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do clima:', error);
      });
  }, []);

  if (!weatherData) {
    return <div className="text-center mt-8">Carregando...</div>;
  }

  return (
    <div className="bg-slate-500">
      <WeatherCards />
    </div>
  );
};

export default Weather;
