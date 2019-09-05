import axios from 'axios';

export default async function getToken(username, password) {
  try {
    const newToken = await axios.post(`http://localhost:3002/token`, {
      username,
      password
    });
    return { newToken };
  } catch (error) {
    return { errorCode: error.response ? error.response.status : 500 };
  }
}
