import axios from 'axios';

export default async function postUser(username, password) {
  try {
    const response = await axios.post(`http://localhost:3002/register`, {
      username,
      password
    });
    return response;
  } catch (error) {
    return { errorCode: error.response ? error.response.status : 500 };
  }
}
