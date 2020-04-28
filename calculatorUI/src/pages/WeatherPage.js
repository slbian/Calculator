import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Store } from '../state/store';
import { mountWeather } from '../state/actions';
import getWeather from '../api/getWeather';
import history from '../state/history';

const StyledDiv = styled.div`
  background-color: seagreen;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function WeatherPage() {
  const { state, dispatch } = useContext(Store);

  async function mount() {
    const token = window.localStorage.getItem('token');
    if (token) {
    const weatherResponse = await getWeather(40.7128, 74.0060); // weather
    // console.log(weatherResponse);
    
      if (weatherResponse && weatherResponse.data){
        // const weatherData = weatherResponse.data;
        dispatch(mountWeather({
          timezone: weatherResponse.data.timezone,
          temp: weatherResponse.data.current.temp,
          humidity: weatherResponse.data.current.humidity,
          wind_speed: weatherResponse.data.current.wind_speed,
          wind_deg: weatherResponse.data.current.wind_deg,
        }))
      }
      else {
        console.log('WEATHER MOUNTING FAILED')
      }
    }
    else {
      console.log('MOUNT: no token');
      history.push('/login');
    }
  }
  
  useEffect(() => {
    mount();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!state || !state.timeZone) { // || state.timeZone
    return null;
  }

  return (
    <StyledDiv>
      <h1>Welcome to the weather app!</h1>
      {/* <p>From openweatherapi</p> */}
      <p>Temp: {state.temperatureF}</p>
      <p>Humidity: {state.humidity}</p>
      <p>Wind speed: {state.windSpeedK}</p>
      <p>Wind deg: {state.windDeg}</p>
      <p>Timezone: {state.timeZone}</p>
    </StyledDiv>
  );

  // function authToggle(authChoice) {
  //   return authChoice === 'login' ? <Login /> : <Register />;
  // }
}
