import Header from './components/Header';
import Weather from './components/Weather'
import Footer from './components/Footer'
import React from 'react';
import TemperatureChart from './components/TemperatureChart';
import RainChart from './components/RainChart';
import MsgMetar from './components/MsgMetar';
import GridForecast from './components/GridForecast';

function App() {

  return (
    <div className="App bg-slate-500">
      <Header />
      <Weather />
      <div className="bg-slate-200 rounded-xl mx-8 p-4 transition-all shadow-lg shadow-slate-800 pb-10">
        <h2 className="text-xl text-gray-800  font-semibold mb-4">Forecast</h2>
        <div className="grid grid-cols-1 gap-2">
          <TemperatureChart />
          <RainChart />
        </div>   
      </div>
      <br />
      <div className="bg-slate-200 rounded-xl mx-8 p-4 transition-all shadow-lg shadow-slate-800">
        <h2 className="text-xl text-gray-800 sm:grid-cols-3 font-semibold mb-4">Temperatura do dia</h2>
        <div className="grid grid-cols-1  gap-2">
          <GridForecast />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
