import React, { useState, useEffect } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';

import { locale, loadMessages } from 'devextreme/localization';
import ptMessages from 'devextreme/localization/messages/pt.json';
loadMessages(ptMessages);
locale(sessionStorage.getItem('locale') || 'pt');

const GridForecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterPastHours = (data) => {
    const currentHour = new Date().getHours();
    return data.hourly.time
      .map((time, index) => ({
        time,
        temperature: data.hourly.temperature_2m[index],
        humidity: data.hourly.relativehumidity_2m[index],
        rain: data.hourly.rain[index],
        windspeed: data.hourly.windspeed_10m[index],
      }))
      .filter((entry) => {
        const weatherHour = new Date(entry.time).getHours();
        return weatherHour >= currentHour;
      });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&hourly=temperature_2m,relativehumidity_2m,rain,windspeed_10m&current_weather=true&forecast_days=1&timezone=America%2FSao_Paulo'
        );
        const data = await response.json();
        const filteredData = filterPastHours(data);
        setWeatherData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <DataGrid
      dataSource={weatherData}
      showBorders={true}
    >
      <Column 
        dataField="time" 
        caption="Hora" 
        cellRender={({ value }) => {
          const date = new Date(value);
          return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }}
      />
      <Column dataField="temperature" caption="Temperatura" dataType="number" cellRender={({ value }) => `${value}ºC`} />
      <Column dataField="humidity" caption="Umidade Relativa" dataType="number" cellRender={({ value }) => `${value}%`}/>
      <Column dataField="rain" caption="Chuva" dataType="number" cellRender={({ value }) => `${value}mm`}/>
      <Column dataField="windspeed" caption="Velocidade do Vento" dataType="number" cellRender={({ value }) => `${value}Km/h`}/>
    </DataGrid>
  );
};

export default GridForecast;
