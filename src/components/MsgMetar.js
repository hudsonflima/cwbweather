import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MsgMetar = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Fazer a solicitação à API
        axios
            .get(
                'https://api-redemet.decea.mil.br/mensagens/metar/SBCT?api_key=2Yp4xRy3MgqX8rAtSAoFOQPM1gd2ZYSAcmGMbE1d'
            )
            .then((response) => {
                const metarMessage = response.data.data[0].mens; // Acessa a mensagem METAR
                setWeatherData(metarMessage);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do clima:', error);
            });
    }, []);

    return <div>METAR: {metarMessage}</div>;
};

export default MsgMetar;
