import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const RainChart = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [rainSeries, setRainSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&daily=temperature_2m_max,temperature_2m_min,rain_sum&timeformat=unixtime&forecast_days=16&timezone=America%2FSao_Paulo'
        );
        const data = await response.json();
        const daily = data.daily;
        const dates = daily.time.map((timestamp) => {
          const date = new Date(timestamp * 1000);
          return date.toLocaleDateString();
        });
        const rainData = daily.rain_sum;

        setChartOptions({
          chart: {
            id: 'rain',
            height: 300,
            toolbar: {
              show: true,
            },
            type: 'bar',
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
              seriesName: 'Chuva (mm)',
              opposite: false,
              title: {
                text: 'Chuva (mm)',
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
                    return value + ' mm';
                  },
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + " mm";
            },
            offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
              }
          },
        });

        setRainSeries([
          {
            name: 'Chuva (mm)',
            data: rainData,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReactApexChart options={chartOptions} series={rainSeries} type="bar" height={200} />
  );
};

export default RainChart;
