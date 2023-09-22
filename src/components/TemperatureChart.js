import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const TemperatureChart = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [temperatureSeries, setTemperatureSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&daily=temperature_2m_max,temperature_2m_min&timeformat=unixtime&forecast_days=16&timezone=America%2FSao_Paulo'
        );
        const data = await response.json();
        const daily = data.daily;
        const dates = daily.time.map((timestamp) => {
          const date = new Date(timestamp * 1000);
          return date.toLocaleDateString();
        });
        const maxTemps = daily.temperature_2m_max;
        const minTemps = daily.temperature_2m_min;

        setChartOptions({
          chart: {
            height: 280,
            type: "area",

            id: 'temperature',
            toolbar: {
              show: true,
            },
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                colors: 'gray',
              },
            },
          },
          yaxis: [
            {
              title: {
                text: 'Temperatura (°C)',
                style: {
                  color: 'gray',
                },
              },
              labels: {
                style: {
                  colors: 'gray',
                },
              },
              tooltip: {
                enabled: true,
                style: {
                  fontSize: '12px',
                  fontFamily: 'Arial, sans-serif',
                },
                y: {
                  formatter: function (value) {
                    return value + ' °C';
                  },
                },
              },
            },
          ],
          dataLabels: {
            enabled: true
          },
          legend: {
            labels: {
              colors: '#000',
            },
          },
          stroke: {
            curve: 'smooth',
          },
        });

        setTemperatureSeries([
          {
            name: 'Máxima',
            data: maxTemps,
          },
          {
            name: 'Mínima',
            data: minTemps,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReactApexChart options={chartOptions} series={temperatureSeries} type="line" height={300} />
  );
};

export default TemperatureChart;
