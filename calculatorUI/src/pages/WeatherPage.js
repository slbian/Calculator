import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Store } from '../state/store';
import { setWeather } from '../state/actions';
import getWeatherCurrent from '../api/getWeatherCurrent';
import getWeatherForecast from '../api/getWeatherForecast';
import history from '../state/history';
import Search from '../components/weather/Search'


const StyledDiv = styled.div`
  background-color: skyblue;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    border-radius: 20px 20px 20px 20px;
    background-color: goldenrod;
    border: none;
    height: auto;
    color: white;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    outline: none;
    width: 200px;
    margin: 5px;

    :active {
      box-shadow: none;
    }
    ::selection {
      background: transparent;
    }
  }
`;

export default function WeatherPage() {
  const { state, dispatch } = useContext(Store);

  async function mount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const weatherCurrentResponse = await getWeatherCurrent('New York'); 
      const weatherForecastResponse = await getWeatherForecast('New York'); 
      console.log(weatherCurrentResponse)
      if (weatherCurrentResponse && weatherForecastResponse && weatherCurrentResponse.data && weatherForecastResponse.data){
        dispatch(setWeather({ // also cord, sunrise, sunset
          city: weatherCurrentResponse.data.name,
          country: weatherCurrentResponse.data.sys.country,
          description: weatherCurrentResponse.data.weather[0].description,
          descriptionid: weatherCurrentResponse.data.weather[0].id,
          temp: weatherCurrentResponse.data.main.temp,
          highestTemp: weatherCurrentResponse.data.main.temp_max,
          lowestTemp: weatherCurrentResponse.data.main.temp_min,
          humidity: weatherCurrentResponse.data.main.humidity,
          wind: weatherCurrentResponse.data.wind.speed,
          forecast: weatherForecastResponse.data.list,
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
  
  if (!state || !state.temp || !state.forecast) { 
    return null;
  }

  function handleCalculatorRequest(event) {
    event.preventDefault();
    history.push('/');
  }

  return (
    <StyledDiv>
      <button type="submit" onClick={handleCalculatorRequest}>
            Let's do math
      </button>
      <Search />
      <h1>Today is a nice day in {state.city}, {state.country} with a {state.description}</h1>
      <h2>Using openweatherapi</h2>
      <p>Temp: {state.temp} F</p>
      <p>High: {state.highestTemp} F</p>
      <p>Low: {state.lowestTemp} F</p>
      <p>Humidity: {state.humidity} %</p>
      <p>Wind speed: {state.windSpeed} mph</p>
      {/* <p>Forecast: {state.forecast[0].dt}</p> */}
    </StyledDiv>
  );

  // function authToggle(authChoice) {
  //   return authChoice === 'login' ? <Login /> : <Register />;
  // }
}
