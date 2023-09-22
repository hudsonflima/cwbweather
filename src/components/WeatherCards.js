import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiTempHigh } from 'react-icons/ci'
import { BsSun, BsMoon, BsCloudRainHeavy } from 'react-icons/bs'

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fazer a solicitação à API
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=-25.5026&longitude=-49.2908&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=America%2FSao_Paulo&forecast_days=1'
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

  // Função para formatar a hora no formato "hh:mm"
  function formatarHora(horaISO) {
    const dataHora = new Date(horaISO);
    const horas = dataHora.getHours().toString().padStart(2, '0');
    const minutos = dataHora.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  return (
    <div className="">
      {weatherData.daily.time.map((date, index) => (
        <div key={index} className="pt-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4 px-8">
            {/* Card 01 - Temperatura */}
            <div className="bg-slate-800 rounded-xl p-4 transition-all shadow-lg shadow-slate-800">
              <div className="text-xl text-gray-50 font-semibold mb-4 flex items-center">
                <span className="mr-2">Temperatura</span> <CiTempHigh size={30} color='orange'/>
              </div>
              <div>
                <p className="text-gray-50 text-xl">Máxima: <span className='text-green-300 font-semibold'>{weatherData.daily.temperature_2m_max[index]}°C</span></p>
              </div>
              <div>
                <p className="text-gray-50 text-xl">Mínima: <span className='text-blue-300 font-semibold'>{weatherData.daily.temperature_2m_min[index]}°C</span></p>
              </div>
            </div>

            {/* Card 02 - Nascente-Poente */}
            <div className="bg-slate-800 rounded-xl p-4 transition-all shadow-lg shadow-slate-800">
              <h2 className="text-xl text-gray-50 font-semibold mb-4">Nascer / Pôr do Sol</h2>
              <div>
                <p className="text-gray-50 mr-4 flex"><BsSun size={30} color='gold'/> <span className="ml-4 text-lg">{formatarHora(weatherData.daily.sunrise[index])}h</span></p>
              </div>
              <div>
                <p className="text-gray-50 mr-4 flex"><BsMoon size={30} color='lightblue'/> <span className="ml-4 text-lg">{formatarHora(weatherData.daily.sunset[index])}h</span></p>
              </div>
            </div>

            {/* Card 03 - Chuva */}
            <div className="bg-slate-800 rounded-xl p-4 transition-all shadow-lg shadow-slate-800">
              <h2 className="text-xl text-gray-50 font-semibold mb-4 flex items-center"><span className="mr-2">Chuva</span> <BsCloudRainHeavy size={30} color='gray'/></h2>
              <div>
                <p className="text-gray-50 text-xl">Volume: <span className="ml-4 text-lg">{weatherData.daily.rain_sum[index]}mm</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
