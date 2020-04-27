import axios from 'axios';
const APIkey = '5a70e8ca8717ce8cf66c7ee0288f6cfa';
const time = '1588011775';

export default async function getWeather(username, password) {
  try {
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${APIkey}`);
    return response;
  } catch (error) {
    return { errorCode: error.response ? error.response.status : 500 };
  }
}