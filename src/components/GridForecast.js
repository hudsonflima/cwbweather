import React, { useState, useEffect } from "react";
import moment from "moment";

function GridWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&hourly=temperature_2m,relativehumidity_2m,rain,windspeed_10m&current_weather=true&forecast_days=1&timezone=America%2FSao_Paulo"
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWeather();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="relative text-center items-center shadow-lg ml-5 border border-slate-200 overflow-x-auto">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full text-sm bg-slate-50 text-left pb-10 text-gray-500 shadow-2xl border border-slate-100 rounded-lg">
          <thead className="text-xs text-slate-100 uppercase bg-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Data
              </th>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Hora
              </th>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Temperatura
              </th>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Umidade Relativa
              </th>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Chuva
              </th>
              <th scope="col" className="px-6 py-3 lg:px-8 lg:py-4">
                Velocidade do Vento
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-50 text-gray-600 hover:text-gray-50 hover:bg-slate-400 transition-all">
            {weather.hourly.time.map((time, index) => (
              <tr
                key={index}
                className="bg-slate-50 text-gray-600 hover:text-gray-50 hover:bg-slate-300 transition-all"
              >
                <td className="px-6 py-4 lg:px-8 lg:py-6 font-medium whitespace-nowrap text-gray-800 hover:text-gray-50">
                  {moment(time).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4 lg:px-8 lg:py-6 text-gray-500">
                  {moment(time).format("HH:mm")}
                </td>
                <td className="px-6 py-4 lg:px-8 lg:py-6 text-gray-500">
                  {weather.hourly.temperature_2m[index]}
                  {weather.hourly_units.temperature_2m}
                </td>
                <td className="px-6 py-4 lg:px-8 lg:py-6 text-gray-500">
                  {weather.hourly.relativehumidity_2m[index]}
                  {weather.hourly_units.relativehumidity_2m}
                </td>
                <td className="px-6 py-4 lg:px-8 lg:py-6 text-gray-500">
                  {weather.hourly.rain[index]}
                  {weather.hourly_units.rain}
                </td>
                <td className="px-6 py-4 lg:px-8 lg:py-6 text-gray-500">
                  {weather.hourly.windspeed_10m[index]}
                  {weather.hourly_units.windspeed_10m}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GridWeather;
