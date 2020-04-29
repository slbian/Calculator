import axios from 'axios';

const APIkey = '5a70e8ca8717ce8cf66c7ee0288f6cfa';

export default async function getWeather(city) {
  try {
    // const response = await axios.post(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${APIkey}`);
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`);
    return response;
  } catch (error) {
    return { errorCode: error.response ? error.response.status : 500 };
  }
}